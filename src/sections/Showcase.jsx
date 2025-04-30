import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const sectionRef = useRef(null);
  const projectOne = useRef(null);
  const projectTwo = useRef(null);
  const projectThree = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const allProjects = [
      projectOne.current,
      projectTwo.current,
      projectThree.current,
    ];

    allProjects.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* left side */}
          <div ref={projectOne} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="project One" />
            </div>
            <div className="text-content">
              <h2>
                On-Demand Rides Made Simple with a Powerful, User-Friendly App
                called Ryde
              </h2>
              <p className="text-white-50 text-base md:text-xl">
                An app built with React Native, Expo, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>
          {/* right side */}
          <div className="project-list-wrapper overflow-hidden">
            <div ref={projectTwo} className="project">
              <div className="image-wrapper bg-[#ffefdb]">
                <img src="/images/project2.png" alt="project two" />
              </div>
              <h2>The Library Management Platform</h2>
            </div>

            <div ref={projectThree} className="project">
              <div className="image-wrapper bg-[#ffe7eb]">
                <img src="/images/project3.png" alt="project three" />
              </div>
              <h2>YC Directory - A Startup Showcase App</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
