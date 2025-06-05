import React, { useEffect, useRef } from "react";
import { MathUtils } from "three/src/math/MathUtils.js";

const TrailContainer = () => {
  const trailContainerRef = useRef(null);
  const animationStateRef = useRef(null);
  const trailRef = useRef([]);
  const currentImageIndexRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const interpolatedMousePosRef = useRef({ x: 0, y: 0 });
  const isDesktopRef = useRef(false);

  useEffect(() => {
    const config = {
      imageLifespan: 1000,
      mouseThreshold: 150,
      inDuration: 750,
      outDuration: 1000,
      straggerIn: 100,
      staggerOut: 25,
      slideDuration: 1000,
      slideEasing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
    };

    const trailImageCount = 8; // folder your images count add more images
    // This creates paths like `profile-01.jpg`, `profile-10.jpg`, etc. `/images/profiles/profile-0${i + 1}.jpg`
    const images = Array.from(
      { length: trailImageCount },
      (_, i) => `/images/profiles/profile-${String(i + 1).padStart(2, "0")}.jpg`
    );

    const trailContainer = trailContainerRef.current;
    if (!trailContainer) return;

    isDesktopRef.current = window.innerWidth > 1000;

    const getMouseDistance = () =>
      Math.hypot(
        mousePosRef.current.x - lastMousePosRef.current.x,
        mousePosRef.current.y - lastMousePosRef.current.y
      );

    const isInTrailContainer = (x, y) => {
      const rect = trailContainer.getBoundingClientRect();
      return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
    };

    const createTrailImage = () => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("cursortrail-img");

      const imgSrc = images[currentImageIndexRef.current];
      currentImageIndexRef.current =
        (currentImageIndexRef.current + 1) % trailImageCount;

      const rect = trailContainer.getBoundingClientRect();
      const startX = interpolatedMousePosRef.current.x - rect.left - 87.5;
      const startY = interpolatedMousePosRef.current.y - rect.top - 87.5;
      const targetX = mousePosRef.current.x - rect.left - 87.5;
      const targetY = mousePosRef.current.y - rect.top - 87.5;

      imgContainer.style.left = `${startX}px`;
      imgContainer.style.top = `${startY}px`;
      imgContainer.style.transition = `left ${config.slideDuration}ms ${config.slideEasing}, top ${config.slideDuration}ms ${config.slideEasing}`;

      const maskLayers = [];
      const imageLayers = [];

      for (let i = 0; i < 10; i++) {
        const layer = document.createElement("div");
        layer.classList.add("mask-layer");

        const imageLayer = document.createElement("div");
        imageLayer.classList.add("image-layer");
        imageLayer.style.backgroundImage = `url(${imgSrc})`;
        imageLayer.style.backgroundSize = "100% 100%";
        imageLayer.style.backgroundPosition = `50% ${-i * 100}%`;

        const startY = i * 10;
        const endY = (i + 1) * 10;

        layer.style.clipPath = `polygon(50% ${startY}%, 50% ${startY}%, 50% ${endY}%, 50% ${endY}%)`;
        layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;
        layer.style.transform = "translateZ(0)";
        layer.style.backfaceVisibility = "hidden";
        layer.appendChild(imageLayer);
        imgContainer.appendChild(layer);
        maskLayers.push(layer);
        imageLayers.push(imageLayer);
      }
      trailContainer.appendChild(imgContainer);

      requestAnimationFrame(() => {
        imgContainer.style.left = `${targetX}px`;
        imgContainer.style.top = `${targetY}px`;

        maskLayers.forEach((layer, i) => {
          const startY = i * 10;
          const endY = (i + 1) * 10;
          const distanceFromMiddle = Math.abs(i - 4.5);
          const delay = distanceFromMiddle * config.straggerIn;

          setTimeout(() => {
            layer.style.clipPath = `polygon(0% ${startY}%, 100% ${startY}%, 100% ${endY}%, 0% ${endY}%)`;
          }, delay);
        });
      });

      trailRef.current.push({
        element: imgContainer,
        maskLayers: maskLayers,
        imageLayers: imageLayers,
        removeTime: Date.now() + config.imageLifespan,
      });
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (trailRef.current.length === 0) return;
      const oldestImage = trailRef.current[0];

      if (now > oldestImage.removeTime) {
        const imgToRemove = trailRef.current.shift();
        imgToRemove.maskLayers.forEach((layer, i) => {
          const startY = i * 10;
          const endY = (i + 1) * 10;
          const distanceFromEdge = 4.5 - Math.abs(i - 4.5);
          const delay = distanceFromEdge * config.staggerOut;

          layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;

          setTimeout(() => {
            layer.style.clipPath = `polygon(50% ${startY}%, 50% ${startY}%, 50% ${endY}%, 50% ${endY}%)`;
          }, delay);
        });

        imgToRemove.imageLayers.forEach((imageLayer) => {
          imageLayer.style.transition = `opacity ${config.outDuration}ms ${config.easing}`;
          imageLayer.style.opacity = "0.25";
        });

        setTimeout(() => {
          if (imgToRemove.element.parentNode) {
            imgToRemove.element.parentNode.removeChild(imgToRemove.element);
          }
        }, config.outDuration + 100);
      }
    };

    const render = () => {
      if (!isDesktopRef.current) return;
      const distance = getMouseDistance();

      interpolatedMousePosRef.current.x = MathUtils.lerp(
        interpolatedMousePosRef.current.x || mousePosRef.current.x,
        mousePosRef.current.x,
        0.1
      );

      interpolatedMousePosRef.current.y = MathUtils.lerp(
        interpolatedMousePosRef.current.y || mousePosRef.current.y,
        mousePosRef.current.y,
        0.1
      );

      if (
        distance > config.mouseThreshold &&
        isInTrailContainer(mousePosRef.current.x, mousePosRef.current.y)
      ) {
        createTrailImage();
        lastMousePosRef.current = { ...mousePosRef.current };
      }

      removeOldImages();
      animationStateRef.current = requestAnimationFrame(render);
    };

    let cleanupMouseListener = null;

    const startAnimation = () => {
      if (!isDesktopRef.current) return;

      const handleMouseMove = (e) => {
        mousePosRef.current = { x: e.clientX, y: e.clientY };
      };

      document.addEventListener("mousemove", handleMouseMove);
      animationStateRef.current = requestAnimationFrame(render);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    };

    const stopAnimation = () => {
      if (animationStateRef.current) {
        cancelAnimationFrame(animationStateRef.current);
        animationStateRef.current = null;
      }

      trailRef.current.forEach((item) => {
        if (item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      });
      trailRef.current.length = 0;
    };

    const handleResize = () => {
      const wasDesktop = isDesktopRef.current;
      isDesktopRef.current = window.innerWidth > 1000;

      // FIX 5: Corrected resize logic.
      if (isDesktopRef.current && !wasDesktop) {
        // Switched from mobile to desktop: start the animation.
        cleanupMouseListener = startAnimation();
      } else if (!isDesktopRef.current && wasDesktop) {
        // Switched from desktop to mobile: stop the animation.
        stopAnimation();
        if (cleanupMouseListener) {
          cleanupMouseListener();
          cleanupMouseListener = null;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    if (isDesktopRef.current) {
      cleanupMouseListener = startAnimation();
    }

    return () => {
      stopAnimation();
      if (cleanupMouseListener) {
        cleanupMouseListener();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={trailContainerRef} className="cursortrail-container group">
      <span className="opacity-0 group-hover:opacity-100 text-amber-400 text-center m-auto">
        Trail Container
      </span>
    </div>
  );
};

export default TrailContainer;
