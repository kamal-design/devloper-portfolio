import React from "react";
import { words } from "../constants";
import Button from "../components/Button";
import HeroModels from "../components/HeroModels";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedCounter from "../components/AnimatedCounter";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.6,
        duration: 1,
        ease: "power2.inOut",
      }
    );
  });

  return (
    <section id="hero" className="relative outline-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="hero section" />
      </div>

      <div className="hero-layout">
        {/* left content */}
        <div className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-6">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={`${word.text}-${index}`}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white/50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>

              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>
            <p className="text-white-50 md:text-xl font-light relative z-10 pointer-events-none">
              Hi, I’m Kamal, a developer based in Edvoy with a passion for code.
            </p>
            <Button
              id="button"
              className="md:w-80 md:h-16 w-60 h-12"
              text="See my work"
            />
          </div>
        </div>
        {/* right content */}

        <figure>
          <div className="hero-3d-layout">
            <HeroModels />
          </div>
        </figure>
      </div>
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
