import Slider from "react-slick";
import slide1 from "../assets/images/slide1.png";
import slide2 from "../assets/images/slide2.jpg";
import slide3 from "../assets/images/slide3.png";
import React from "react";
import { heroSliderSettings as settings } from "../config/sliderSettings";
import type { SlideItem } from "../types/slideTypes";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/useToast";
function HeroSlider() {
  const { success } = useToast();
  const showMsg = () => {
    success("Read more about us");
  };
  const slides: SlideItem[] = [
    {
      image: slide1,
      title: "Comprehensive Healthcare Services",
      description: "Your health is our priority.",
    },
    {
      image: slide2,
      title: "Experienced Medical Professionals",
      description: "Our team is ready for you.",
    },
    {
      image: slide3,
      title: "State-of-the-Art Facilities",
      description: "Latest tech for accurate diagnoses.",
    },
  ];

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <Slider {...settings} className="slider-container" style={{ margin: 0 }}>
        {slides.map((slide, index) => (
          <div key={index} className="h-[80vh] w-full relative">
            <img
              src={slide.image}
              alt="slider-image"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-lg md:text-5xl font-bold mb-4 text-center">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl">{slide.description}</p>
              <Link
                to="/about"
                className="btn btn-soft btn-primary mt-4 rounded-sm transition"
                onClick={showMsg}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default React.memo(HeroSlider);
