import React, { useEffect, useRef, useState } from "react";
import { navLinks } from "../constants";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const lastHash = useRef("");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("Hash:", location.hash); // The #fragment
    console.log("window.location.pathname:", window.location.origin);

    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }
    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        lastHash.current = "";
      }, 100);
    }
  }, [location]); // Re-run effect if location changes

  let displayPath = "";
  let pageHost = "";
  if (location.hash) {
    displayPath = location.pathname + location.hash;
    pageHost = window.location.origin;
  }

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href={`${pageHost}/#hero`} className="logo">
          Kamal M
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name, index }) => {
              const isHashLink = link.includes("#");
              if (isHashLink) {
                return (
                  <li key={`${name}_${index}`} className="group">
                    <a
                      href={`${pageHost}/${link}`}
                      className={displayPath === `/${link}` ? "active" : ""}
                    >
                      <span>{name}</span>
                      <span className="underline"></span>
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={`${name}_${index}`} className="group">
                    <NavLink
                      to={link}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <span>{name}</span>
                      <span className="underline"></span>
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
        <a href="/#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
