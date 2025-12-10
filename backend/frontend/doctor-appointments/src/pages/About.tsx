import { type FC } from "react";

const About: FC = () => {
  return (
    <section className="min-h-screen  py-16 px-6 md:px-12 ">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4 ">
            About Our Healthcare Service
          </h1>
          <p className="text-lg text-gray-600">
            Providing accessible, reliable, and modern medical appointments for
            everyone.
          </p>
        </div>

        <div className="card bg-white shadow-md p-8 rounded-xl transition-all duration-700 hover:scale-105 cursor-help hover:bg-blue-200">
          <h2 className="text-2xl font-semibold mb-3 text-blue-950">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make the healthcare experience simple and
            stress-free. We connect patients with qualified doctors, allowing
            them to book appointments easily from anywhere at any time. We
            believe in empowering patients with access to trusted healthcare
            professionals.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-3 gap-6 ">
          <div className="card bg-white shadow p-6 rounded-xl text-center transition-all duration-700 hover:scale-105 cursor-help hover:bg-blue-200">
            <h3 className="text-xl font-semibold text-blue-950 mb-2">
              Qualified Doctors
            </h3>
            <p className="text-gray-600">
              Our platform brings together skilled and experienced medical
              professionals.
            </p>
          </div>

          <div className="card bg-white shadow p-6 rounded-xl text-center transition-all duration-700 hover:scale-105 cursor-help hover:bg-blue-200">
            <h3 className="text-xl font-semibold text-blue-950 mb-2">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Book your appointment with just a few clicks — fast, simple, and
              intuitive.
            </p>
          </div>

          <div className="card bg-white shadow p-6 rounded-xl text-center transition-all duration-700 hover:scale-105 cursor-help hover:bg-blue-200">
            <h3 className="text-xl font-semibold text-blue-950 mb-2">
              Secure & Trusted
            </h3>
            <p className="text-gray-600">
              Your health data is fully protected with the highest security
              standards.
            </p>
          </div>
        </div>

        <div className="card bg-white shadow-md p-8 rounded-xl transition-all duration-700 hover:scale-105 cursor-help hover:bg-blue-200">
          <h2 className="text-2xl font-semibold mb-3 text-blue-950">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To create a seamless and technologically advanced healthcare system
            where patients can connect with doctors efficiently and receive the
            quality care they deserve.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
