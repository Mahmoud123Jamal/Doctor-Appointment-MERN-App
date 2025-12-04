import Slider from "react-slick";
import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    arrows: false,
    cssEase: "linear",
  };

  const slides = [
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
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="h-[80vh] relative w-full">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl">{slide.description}</p>
              <button className="text-3xl/tight text-teal-500 bg-white px-6 py-3 mt-12 rounded-sm  hover:bg-gray-200 transition">
                Read more
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default HeroSlider;
