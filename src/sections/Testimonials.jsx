import React from "react";
import TitleHeader from "../components/TitleHeader";
import { testimonials } from "../constants";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="size-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="🌟 Client Feedback Highlights"
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16 gap-4">
          {testimonials.map(({ imgPath, name, mentions, review }, index) => (
            <GlowCard card={{ review }} key={`${name}-${index}`}>
              <div className="flex items-center gap-3">
                <div>
                  <img src={imgPath} alt={name} />
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="font-light text-white-50">{mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
