import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

//TODO: below sliderAnimation not working check

const SectionChanage = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    const gallerySec = containerRef.current;
    if (!gallerySec) return;

    const slider = {
      item: gallerySec.querySelector(".section-col-slider_item"),
      figure: gallerySec.querySelector(".section-col-slider_item figure"),
      title: gallerySec.querySelector(".section-col-slider_item h2"),
      description: gallerySec.querySelector(".section-col-slider_item p"),
    };

    const init = () => {
      for (let index = 1; index < slider.item.length; index++) {
        gsap.set(
          [
            slider.figure[index],
            slider.title[index],
            slider.description[index],
          ],
          {
            xPercent: 120,
            y: "10rem",
            rotate: 30,
            autoAlpha: 0,
          }
        );
      }
      sliderAnimation();
    };

    const sliderAnimation = () => {
      const timeline = gsap.timeline({
        defaults: { stagger: 0.1, ease: "expo.inOut" },
        scrollTrigger: {
          trigger: ".section-change",
          start: "top top",
          end: "+=8000 bottom",
          scrub: 3.2,
          pin: true,
        },
      });

      const settingIn = {
        xPercent: 0,
        y: "0rem",
        rotate: 0,
        autoAlpha: 1,
      };

      const settingOut = {
        xPercent: -120,
        y: "-10rem",
        rotate: -30,
        autoAlpha: 0,
      };

      for (let index = 0; index < slider.item.length; index++) {
        if (index === slider.item.length - 1) {
          //last element animation in only  no out animation
          timeline.to(
            [
              slider.figure[index],
              slider.title[index],
              slider.description[index],
            ],
            {
              ...settingIn,
            }
          );
        } else {
          // other elements animate in and out
          timeline
            .to(
              [
                slider.figure[index],
                slider.title[index],
                slider.description[index],
              ],
              { ...settingIn }
            )
            .to(
              [
                slider.figure[index],
                slider.title[index],
                slider.description[index],
              ],
              { ...settingOut }
            );
        }
      }
    };

    window.addEventListener("DOMContentLoaded", () => {
      // condition for handling the responsive
      init();
      //   if (window.innerWidth > 769) init();
    });
  }, []);

  return (
    <>
      <div className="section-change">
        <div className="section-change-wrapper">
          <div className="section-col">
            <div className="section-col-text">
              <h2>Still Life</h2>
              <h1>Change the Developer</h1>
            </div>
          </div>
          <div className="section-col">
            <div ref={containerRef} className="section-col-slider">
              <div className="section-col-slider_item">
                <figure>
                  <img src="./images/profiles/profile-01.jpg" alt="" />
                  <h2>Frontend Developer</h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quos aperiam accusamus odit molestiae dolor molestias magnam
                    laudantium dolores deleniti incidunt, ex nesciunt nihil at
                    quam? Maxime sapiente deleniti sint aperiam!
                  </p>
                </figure>
              </div>
              <div className="section-col-slider_item">
                <figure>
                  <img src="./images/profiles/profile-02.jpg" alt="" />
                  <h2>Backend Developer</h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quos aperiam accusamus odit molestiae dolor molestias magnam
                    laudantium dolores deleniti incidunt, ex nesciunt nihil at
                    quam? Maxime sapiente deleniti sint aperiam!
                  </p>
                </figure>
              </div>
              <div className="section-col-slider_item">
                <figure>
                  <img src="./images/profiles/profile-03.jpg" alt="" />
                  <h2>Fullstack Developer</h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quos aperiam accusamus odit molestiae dolor molestias magnam
                    laudantium dolores deleniti incidunt, ex nesciunt nihil at
                    quam? Maxime sapiente deleniti sint aperiam!
                  </p>
                </figure>
              </div>
              <div className="section-col-slider_item">
                <figure>
                  <img src="./images/profiles/profile-04.jpg" alt="" />
                  <h2>Product Head</h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quos aperiam accusamus odit molestiae dolor molestias magnam
                    laudantium dolores deleniti incidunt, ex nesciunt nihil at
                    quam? Maxime sapiente deleniti sint aperiam!
                  </p>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionChanage;
