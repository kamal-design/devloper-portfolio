import React from "react";
import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  return (
    <section id="contact" className="flex-center section-padding">
      <div className="size-full md:px-10 px-5">
        <TitleHeader
          title="Get In Touch With Me"
          sub="📝 Contact Information"
        />

        <div className="mt-16">
          <p className="text-center">
            Feel free to reach out for collaborations, questions, or just to say
            hi!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
