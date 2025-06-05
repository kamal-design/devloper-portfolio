import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

const SectionChanage = () => {
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    autoRaf: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  useGSAP(() => {
    const gallerySec = sectionRef.current;
    if (!gallerySec) return;

    const slider = {
      item: gallerySec.querySelectorAll(".section-col-slider_item"),
      figure: gallerySec.querySelectorAll(".section-col-slider_item figure"),
      title: gallerySec.querySelectorAll(".section-col-slider_item h2"),
      description: gallerySec.querySelectorAll(".section-col-slider_item p"),
    };

    const initSliderLoop = () => {
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
          end: "+=6000 bottom",
          pin: true,
          pinSpacing: true,
          scrub: 3.2,
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

    initSliderLoop();
    window.addEventListener("DOMContentLoaded", () => {
      // condition for handling the responsive

      if (window.innerWidth > 769) initSliderLoop();
    });
  }, []);

  return (
    <div ref={sectionRef} className="section-change">
      <div className="section-change-wrapper">
        <div className="section-col">
          <div className="section-col-text">
            <h2 className="text-2xl font-medium uppercase tracking-wider">
              Still Life
            </h2>
            <h1 className="text-white text-4xl uppercase tracking-widest">
              Change the Developer
            </h1>
          </div>
        </div>

        <div className="section-col">
          <div className="section-col-slider">
            <div className="section-col-slider_item">
              <figure>
                <img src="./images/profiles/profile-01.jpg" alt="" />
              </figure>
              <h2 className="text-2xl font-semibold text-white mb-5">
                1.Frontend Developer
              </h2>
              <p className="text-sm font-normal text-white-50">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                aperiam accusamus odit molestiae dolor molestias magnam
                laudantium dolores deleniti incidunt, ex nesciunt nihil at quam?
                Maxime sapiente deleniti sint aperiam!
              </p>
            </div>

            <div className="section-col-slider_item">
              <figure>
                <img src="./images/profiles/profile-02.jpg" alt="" />
              </figure>
              <h2 className="text-2xl font-semibold text-white mb-5">
                2.Backend Developer
              </h2>
              <p className="text-sm font-normal text-white-50">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                aperiam accusamus odit molestiae dolor molestias magnam
                laudantium dolores deleniti incidunt, ex nesciunt nihil at quam?
                Maxime sapiente deleniti sint aperiam!
              </p>
            </div>

            <div className="section-col-slider_item">
              <figure>
                <img src="./images/profiles/profile-03.jpg" alt="" />
              </figure>
              <h2 className="text-2xl font-semibold text-white mb-5">
                3.Fullstack Developer
              </h2>
              <p className="text-sm font-normal text-white-50">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                aperiam accusamus odit molestiae dolor molestias magnam
                laudantium dolores deleniti incidunt, ex nesciunt nihil at quam?
                Maxime sapiente deleniti sint aperiam!
              </p>
            </div>

            <div className="section-col-slider_item">
              <figure>
                <img src="./images/profiles/profile-04.jpg" alt="" />
              </figure>
              <h2 className="text-2xl font-semibold text-white mb-5">
                4.Product Head
              </h2>
              <p className="text-sm font-normal text-white-50">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                aperiam accusamus odit molestiae dolor molestias magnam
                laudantium dolores deleniti incidunt, ex nesciunt nihil at quam?
                Maxime sapiente deleniti sint aperiam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionChanage;
