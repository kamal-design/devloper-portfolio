import React from "react";
import ParallexScroll from "../components/gsap/ParallexScroll";
import VisitorsObsessOver from "../components/gsap/VisitorsObsessOver";
import GalleryScrolltrigger from "../components/gsap/GalleryScrolltrigger";
import SectionChanage from "../components/gsap/SectionChanage";

const GsapPage = () => {
  return (
    <section className="relative section-padding max-w-7xl mx-auto">
      {/* Below ParallexScroll is some UI break error */}
      {/* <ParallexScroll /> */}
      <SectionChanage />
      {/* <GalleryScrolltrigger /> */}
      <VisitorsObsessOver />

      {/* <div className="py-20">
        <h2 className="text-2xl font-bold text-center mb-4">GSAP Examples</h2>
        <p className="text-base font-light text-white-50 mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum in
          cum ipsam eum unde illo dolore quam, repudiandae eaque voluptatem. Ex
          ad vitae deserunt ut cupiditate beatae repellat, explicabo suscipit!
        </p>
        <p className="text-base font-light text-white-50 mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum in
          cum ipsam eum unde illo dolore quam, repudiandae eaque voluptatem. Ex
          ad vitae deserunt ut cupiditate beatae repellat, explicabo suscipit!
        </p>
        <p className="text-base font-light text-white-50 mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum in
          cum ipsam eum unde illo dolore quam, repudiandae eaque voluptatem. Ex
          ad vitae deserunt ut cupiditate beatae repellat, explicabo suscipit!
        </p>
      </div>
      <div className="py-20">
        <h2 className="text-2xl font-bold text-center mb-4">GSAP Examples</h2>
        <p className="text-base font-light text-white-50 mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum in
          cum ipsam eum unde illo dolore quam, repudiandae eaque voluptatem. Ex
          ad vitae deserunt ut cupiditate beatae repellat, explicabo suscipit!
        </p>
        <p className="text-base font-light text-white-50 mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum in
          cum ipsam eum unde illo dolore quam, repudiandae eaque voluptatem. Ex
          ad vitae deserunt ut cupiditate beatae repellat, explicabo suscipit!
        </p>
        <p className="text-base font-light text-white-50 mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum in
          cum ipsam eum unde illo dolore quam, repudiandae eaque voluptatem. Ex
          ad vitae deserunt ut cupiditate beatae repellat, explicabo suscipit!
        </p>
      </div> */}
    </section>
  );
};

export default GsapPage;
