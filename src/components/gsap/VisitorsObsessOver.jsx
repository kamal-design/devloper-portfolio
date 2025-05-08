import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

const VisitorsObsessOver = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const profileImageContainer =
      currentContainer.querySelector(".profile-images");
    const profileImages = currentContainer.querySelectorAll(
      ".profile-images .img"
    );

    const nameElements = currentContainer.querySelectorAll(
      ".profile-names .name"
    );
    const nameHeadings = currentContainer.querySelectorAll(
      ".profile-names .name h1"
    );

    if (nameHeadings.length === 0) {
      console.warn(
        "No nameHeadings found. Check your selectors or component structure."
      );
      return;
    }

    nameHeadings.forEach((heading) => {
      const split = new SplitText(heading, { type: "chars" });
      split.chars.forEach((char) => char.classList.add("letter"));
    });

    if (nameElements.length > 0 && nameElements[0]) {
      const defaultLetters = nameElements[0].querySelectorAll(".letter");
      if (defaultLetters.length > 0) {
        gsap.set(defaultLetters, { y: "100%" });
        console.log("GSAP set y:100% on defaultLetters");
      }

      if (window.innerWidth > 900) {
        profileImages.forEach((img, index) => {
          const correspondingName = nameElements[index + 1];
          const letters = correspondingName.querySelectorAll(".letter");

          img.addEventListener("mouseenter", () => {
            gsap.to(img, {
              width: 140,
              height: 140,
              duration: 0.5,
              ease: "power4.out",
            });

            gsap.to(letters, {
              y: "-100%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          });

          img.addEventListener("mouseleave", () => {
            gsap.to(img, {
              width: 80,
              height: 80,
              duration: 0.5,
              ease: "power4.out",
            });

            gsap.to(letters, {
              y: "0%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          });
        });

        profileImageContainer.addEventListener("mouseenter", () => {
          gsap.to(defaultLetters, {
            y: "0%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });
        });

        profileImageContainer.addEventListener("mouseleave", () => {
          gsap.to(defaultLetters, {
            y: "100%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });
        });
      }
    } else {
      console.warn("No nameElements found or the first one is undefined.");
    }

    //TODO: javascript method
    /*
    document.addEventListener("DOMContentLoaded", () => {
      const profileImageContainer = document.querySelector(".profile-images");
      const profileImages = document.querySelectorAll(".profile-images .img");
      const nameElements = document.querySelectorAll(".profile-names .name");
      const nameHeadings = document.querySelectorAll(".profile-names .name h1");

      nameHeadings.forEach((heading) => {
        const split = new SplitText(heading, { type: "chars" });
        split.chars.forEach((char) => char.classList.add("letter"));
      });

      const defaultLetters = nameElements[0].querySelectorAll(".letter");
      console.log("@default", defaultLetters);
      gsap.set(defaultLetters, { y: "100%" });

      if(window.innerwidth > 900){
        profileImages.forEach((img, index) => {
            const correspondingName  = nameElements[index * 1];
            const letters = correspondingName.querySelectorAll(".letter");

             img.addEventListener("mouseenter", () => {
            gsap.to(img, {
              width: 140,
              height: 140,
              duration: 0.5,
              ease: "power4.out",
            });

            gsap.to(letters, {
              y: "-100%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          });

          img.addEventListener("mouseleave", () => {
            gsap.to(img, {
              width: 80,
              height: 80,
              duration: 0.5,
              ease: "power4.out",
            });

            gsap.to(letters, {
              y: "0%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          });

        });

         profileImageContainer.addEventListener("mouseenter", () => {
          gsap.to(defaultLetters, {
            y: "0%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });
        });

        profileImageContainer.addEventListener("mouseleave", () => {
          gsap.to(defaultLetters, {
            y: "100%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });
        });
      }
    });
    */
  }, []);

  return (
    <div className="section-padding">
      <h1 className="text-2xl text-center text-amber-400 mb-10">
        Visitos Obsess Hover
      </h1>
      <div ref={containerRef} className="team-section card-border rounded-xl">
        <div className="profile-images">
          <div className="img">
            <img src="./images/profiles/profile-01.jpg" alt="" />
          </div>
          <div className="img">
            <img src="./images/profiles/profile-02.jpg" alt="" />
          </div>
          <div className="img">
            <img src="./images/profiles/profile-03.jpg" alt="" />
          </div>
          <div className="img">
            <img src="./images/profiles/profile-04.jpg" alt="" />
          </div>
          <div className="img">
            <img src="./images/profiles/profile-05.jpg" alt="" />
          </div>
          <div className="img">
            <img src="./images/profiles/profile-06.jpg" alt="" />
          </div>
          <div className="img">
            <img src="./images/profiles/profile-07.jpg" alt="" />
          </div>
          <div className="img">
            <img src="./images/profiles/profile-08.jpg" alt="" />
          </div>
        </div>
        <div className="profile-names">
          <div className="name default">
            <h1>Kamal M</h1>
          </div>

          <div className="name">
            <h1>Kamal M</h1>
          </div>
          <div className="name">
            <h1>Arun</h1>
          </div>
          <div className="name">
            <h1>John</h1>
          </div>
          <div className="name">
            <h1>Tyson</h1>
          </div>

          <div className="name">
            <h1>Simon</h1>
          </div>
          <div className="name">
            <h1>John Doe</h1>
          </div>
          <div className="name">
            <h1>Benton</h1>
          </div>
          <div className="name">
            <h1>Everest</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsObsessOver;
