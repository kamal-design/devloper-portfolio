import React from "react";
import TrailContainer from "./TrailContainer";

const AnimatedCursorTrail = () => {
  return (
    <div className="-mx-[135px]">
      <section className="cursor-hero">
        <div className="cursor-img">
          <img src="./images/profiles/profile-05.jpg" alt="" />
        </div>
        <h2 className="text-center text-4xl mb-6 text-white opacity-50">
          Cursor Moves Show Images{" "}
        </h2>
        <h4 className="text-white-50 text-xl text-center opacity-40">
          React CSS Animation Experiment <br /> by Kamal
        </h4>

        <TrailContainer />
      </section>
    </div>
  );
};

export default AnimatedCursorTrail;
