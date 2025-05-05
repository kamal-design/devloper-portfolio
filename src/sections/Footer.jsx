import React from "react";
import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center items-center md:items-start">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Visit my code blog{" "}
          </a>
        </div>
        <div className="socials">
          {socialImgs.map((social, index) => (
            <a
              key={`${social.name}-${index}`}
              href={social.url}
              className="icon"
              target="_blank"
            >
              <img src={social.imgPath} alt={social.name} />
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-centet md:text-end text-sm font-light text-white-50">
            &copy; {new Date().getFullYear()} kamal developer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
