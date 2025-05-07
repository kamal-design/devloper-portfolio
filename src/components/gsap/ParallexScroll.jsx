import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const app_benefits = [
  {
    title: "Explore courses from 600+ universities",
    content:
      "Find, filter and shortlist courses from leading institutes and top study destinations, based on your budget & preferences.",
    imagePath: "./images/project1.png",
  },
  {
    title: "Find your perfect course with Genie",
    content:
      "Genie, our free AI-powered system, scans through 1000s of courses to find the best ones that align with your dreams.",
    imagePath: "./images/project2.png",
  },
  {
    title: "Get all your doubts cleared via video call",
    content:
      "Don't waste time in traffic! Hop on a free remote counselling session with your dedicated counsellor at your convenience.",
    imagePath: "./images/project3.png",
  },
  {
    title: "Chat for expert advice",
    content:
      "Your friendly, dedicated counsellor is also available on chat for immediate help.",
    imagePath: "./images/project1.png",
  },
  {
    title: "Submit documents in a jiffy",
    content:
      "Upload and manage all your application documents directly in the app.",
    imagePath: "./images/project2.png",
  },
  {
    title: "Apply directly via the app",
    content:
      "Track multiple applications and apply to top courses with one tap.",
    imagePath: "./images/project3.png",
  },
  {
    title: "Get an education loan",
    content:
      "Edvoy Funds helps you get loans at the best rates without leaving home.",
    imagePath: "./images/project1.png",
  },
  {
    title: "Find your new home",
    content:
      "Edvoy Stays finds you a perfect home near your university with full support.",
    imagePath: "./images/project2.png",
  },
];

const ParallaxScroll = () => {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const contentRef = useRef(null);
  const titlesRef = useRef([]);
  const mainTitleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Initial Highlight Animation for "One app. Many benefits."
  useEffect(() => {
    if (mainTitleRef.current) {
      const originalColor = getComputedStyle(mainTitleRef.current).color;
      gsap.fromTo(
        mainTitleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        }
      );
      gsap.fromTo(
        mainTitleRef.current,
        { scale: 1, color: originalColor },
        {
          scale: 1.03,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
          delay: 0.6, // Start pulse after initial fade-in
          onComplete: () => {
            gsap.set(mainTitleRef.current, { scale: 1, color: originalColor });
          },
        }
      );
    }
  }, []);

  // GSAP ScrollTrigger setup for pinning, active index, and title reveals
  useEffect(() => {
    const steps = app_benefits.length;
    const vh = window.innerHeight;
    const totalScrollDistance = steps * vh;
    const scrollPerStep = totalScrollDistance / steps;

    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalScrollDistance}`,
      pin: true,
      scrub: 1,
    });

    const activeIndexTriggers = app_benefits.map((_, i) => {
      return ScrollTrigger.create({
        trigger: "body",
        start: `top top-=${scrollPerStep * i}`,
        end: `top top-=${scrollPerStep * (i + 1) - 1}`,
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(i);
          }
        },
      });
    });

    // 2. Scroll-Triggered Animation for App Benefit Titles (Bottom to Top)
    const titleRevealAnimations = titlesRef.current
      .map((titleEl) => {
        if (titleEl) {
          gsap.set(titleEl, { opacity: 0, y: 30 }); // Initial state: hidden and slightly down
          return gsap.to(titleEl, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: titleEl,

              // ---- KEY CHANGE HERE ----
              // Animate when the top of the element is 85% down the viewport
              // (i.e., as it enters the bottom 15% of the screen)
              start: "top 85%",
              // Define end for clarity, though not strictly needed for "play none none none"
              end: "bottom 15%",
              toggleActions: "play none none none", // Play once on enter viewport
              // markers: true // Uncomment for debugging individual title triggers
            },
          });
        }
        return null;
      })
      .filter(Boolean);

    return () => {
      pinTrigger.kill();
      activeIndexTriggers.forEach((st) => st.kill());
      titleRevealAnimations.forEach((anim) => {
        if (anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
        anim.kill();
      });
      if (mainTitleRef.current) gsap.killTweensOf(mainTitleRef.current);
      titlesRef.current.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, [app_benefits.length]);

  // Update phone image and content text when activeIndex changes
  useEffect(() => {
    if (app_benefits[activeIndex]) {
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 0.6, ease: "power4" }
      );
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "sine.in",
        onComplete: () => {
          if (contentRef.current && app_benefits[activeIndex]) {
            // Added null check
            contentRef.current.innerText = app_benefits[activeIndex].content;
            gsap.to(contentRef.current, { opacity: 1, duration: 0.3 });
          }
        },
      });
    }
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="min-h-screen">
      <h2
        ref={mainTitleRef}
        className="text-center text-4xl text-purple-800 font-bold pt-24 pb-8" // Kept pt-24 as per your code
        style={{ opacity: 0 }}
      >
        One app. Many benefits.
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 px-4">
        <div className="w-full md:w-1/3 flex justify-center md:sticky md:top-24 lg:top-1/4 self-start">
          <div
            ref={phoneRef}
            className="inline-flex items-center justify-center relative w-[250px] h-[390px] sm:w-[400px] sm:h-[540px] m-auto"
          >
            <img
              src={
                app_benefits[activeIndex]?.imagePath ||
                "./images/default-project.png"
              }
              alt="App feature illustration"
              className="object-contain max-w-full h-full"
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 py-8">
          <div className="flex items-start justify-end flex-col w-full space-y-5">
            {app_benefits.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => (titlesRef.current[idx] = el)}
                className={`flex items-center gap-3 sec-title cursor-pointer transition-all duration-300 ease-in-out ${
                  activeIndex === idx
                    ? "text-white scale-105 font-bold"
                    : "text-gray-600 scale-100"
                }`}
              >
                <div className="w-8 h-8 flex-shrink-0 bg-purple-700 rounded-full flex items-center justify-center text-white">
                  {idx + 1}
                </div>
                <div className="text-xl">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 p-6 self-start">
          <div className="inline-flex items-center justify-center relative w-full h-[390px] sm:h-[540px]">
            <p
              ref={contentRef}
              className="text-xl/normal font-medium text-white-50"
            >
              {app_benefits[activeIndex]?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
