import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const GalleryScrolltrigger = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    let wheel = currentContainer.querySelector(".wheel");
    let images = gsap.utils.toArray(".wheel_card");

    function setup() {
      let radius = wheel?.offsetWidth / 2;
      let center = wheel?.offsetWidth / 2;
      let total = images.length;
      let slice = (2 * Math.PI) / total;

      images.forEach((item, i) => {
        let angle = -i * slice;
        let x = center + radius * Math.sin(angle);
        let y = center + radius * Math.cos(angle);

        gsap.set(item, {
          rotation: `${-(angle + Math.PI)}rad`,
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: y,
        });
      });

    }

    gsap.to(".wheel", {
      rotate: () => -360,
      ease: "none",
      duration: images.length,
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 1,
        snap: 1 / images.length,
        invalidateOnRefresh: true,
      },
    });

    setup();
    window.addEventListener("resize", setup);
  }, []);

  const galleryPath = [
    {
      title: "Software Developer",
      profile: "./images/profiles/profile-01.jpg",
    },
    {
      title: "Frontend Developer",
      profile: "./images/profiles/profile-02.jpg",
    },
    {
      title: "UI Developer",
      profile: "./images/profiles/profile-03.jpg",
    },
    {
      title: "Backend Developer",
      profile: "./images/profiles/profile-04.jpg",
    },
    {
      title: "Product Lead",
      profile: "./images/profiles/profile-05.jpg",
    },
    {
      title: "Product Manager",
      profile: "./images/profiles/profile-06.jpg",
    },
    {
      title: "Product Head",
      profile: "./images/profiles/profile-07.jpg",
    },
    {
      title: "Tesing Lead",
      profile: "./images/profiles/profile-08.jpg",
    },
  ];

  return (
    <div className="human-gallery">
      <div className="gallery-header">
        <h1>
          Human stories <br /> Superhuman audiovisuals
        </h1>
      </div>
      <section ref={containerRef} className="gallery-slider">
        <div className="wheel">
          {galleryPath.map((data, idx) => (
            <div key={`data_${idx}`} className="wheel_card">
              <img src={data.profile} alt={data.title} />
            </div>
          ))}
          {galleryPath.map((item, index) => (
            <div key={`item_${index}`} className="wheel_card">
              <img src={item.profile} alt={item.title} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleryScrolltrigger;
