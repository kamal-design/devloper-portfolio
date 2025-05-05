import React from "react";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
import NavBar from "./components/NavBar";
import Logos from "./components/Logos";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <main>
      <NavBar />
      {/* Everyone Section components */}
      <Hero />
      <Showcase />
      <Logos />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <Contact />
      {/* Everyone Section components */}
      <Footer />
    </main>
  );
};

export default App;
