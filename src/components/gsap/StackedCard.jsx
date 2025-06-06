import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const StackedCard = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const contents = gsap.utils.toArray(".stacked-content");
    const texts = gsap.utils.toArray(".text");
    const imgWrappers = gsap.utils.toArray(".img-wrapper");

    gsap.set(".stacked-content:first-child .text", { y: -50 });

    const sc = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: ".stacked-container",
        pin: true,
        start: "top top",
        end: `+=${contents.length * 50}%`,
        scrub: 3,
      },
    });

    sc.to(imgWrappers[0], { rotate: -3 }, 0);

    contents.forEach((_, i) => {
      if (i === contents.length - 1) return;

      sc.to(texts[i], { opacity: 0, duration: 2 }, "+=0.5")
        .to(
          imgWrappers[i + 1],
          {
            scale: 1,
            duration: 2,
            y: (i + 1) * 5,
            x: (i + 1) * -5,
            opacity: 1,
            rotate: (i + 1) * 3 * (i % 2 === 0 ? 1 : -1),
          },
          "<"
        )
        .to(texts[i + 1], { opacity: 1, y: -50, duration: 2 }, "<+=0.5");
    });
  }, []);

  const allCards = [
    {
      title: "Software Developer",
      profile: "./images/profiles/profile-01.jpg",
    },
    {
      title: "Frontend Developer",
      profile: "./images/profiles/profile-02.jpg",
    },
    {
      title: "UI Developer",
      profile: "./images/profiles/profile-03.jpg",
    },
    {
      title: "Backend Developer",
      profile: "./images/profiles/profile-04.jpg",
    },
    {
      title: "Product Lead",
      profile: "./images/profiles/profile-05.jpg",
    },
    {
      title: "Product Manager",
      profile: "./images/profiles/profile-06.jpg",
    },
    {
      title: "Product Head",
      profile: "./images/profiles/profile-07.jpg",
    },
    {
      title: "Testing Lead",
      profile: "./images/profiles/profile-08.jpg",
    },
  ];

  return (
    <div className="stacked-container">
      {allCards.map((item, idx) => (
        <div key={idx} className="stacked-content">
          <div className="text pr-10">
            <h3 className="text-3xl font-semibold text-white">{item.title}</h3>
            <p className="text-white-50 text-base font-normal">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic quae
              eaque at quas, aspernatur suscipit deserunt commodi cum eligendi
              officiis assumenda ducimus ipsam accusantium. Vero nemo excepturi
              nihil ipsa assumenda.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={item.profile} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StackedCard;
