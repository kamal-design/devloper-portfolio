import React from "react";
import TitleHeader from "../components/TitleHeader";
import { techStackIcons, techStackImgs } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TechIcon from "../components/ThechModels/TechIcons";

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.4,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="size-full md:px-10 px-6">
        <TitleHeader
          title="My Preferred Tech Stack"
          sub="🖥️ The skills i bring to the Table"
        />

        <div className="tech-grid">
          {techStackIcons.map((icon) => (
            <div
              key={icon.name}
              className="card-border relative tech-card overflow-hidden group xl:rounded-2xl rounded-lg"
            >
              <div className="tech-card-animated-bg"></div>
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIcon model={icon} />
                </div>
                <div className="padding-x w-full">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))}

          {/* This is for the img part */}
          {/* {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <img src={techStackIcon.imgPath} alt="" />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
