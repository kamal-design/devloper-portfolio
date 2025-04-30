import React from "react";
import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => (
  <div className="flex-none flex-center marquee-item">
    <img src={icon.imgPath} alt={icon.name} />
  </div>
);

const Logos = () => {
  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge"></div>
      <div className="gradient-edge"></div>

      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((logo, index) => (
            <LogoIcon key={`${logo.name}-${index}`} icon={logo} />
          ))}
          {logoIconsList.map((logo, index) => (
            <LogoIcon key={`${logo.name}-${index}`} icon={logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logos;
