import React from "react";

const Button = ({ id, text, className }) => {
  return (
    <a
      className={`${className ?? ""} cta-wrapper`}
      onClick={(e) => {
        e.preventDefault();
        const targetBtn = document.getElementById("counter");
        if (targetBtn && id) {
          const scrollOffset = window.innerHeight * 0.15; // Leave a bit of space at the top
          const top =
            targetBtn.getBoundingClientRect().top +
            window.pageYOffset -
            scrollOffset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="./images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
