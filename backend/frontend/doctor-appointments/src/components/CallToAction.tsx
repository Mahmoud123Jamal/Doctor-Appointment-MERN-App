import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="bg-blue-50 py-12 px-6 text-center mt-4">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl md:text-3xl font-semibold text-blue-950 mb-4">
          In an emergency? Need help now?
        </h3>

        <p className="text-lg text-gray-600 mb-4">
          Our medical team is available 24/7 to provide urgent medical
          assistance.
        </p>

        <Link
          to="/addAppointment"
          className="btn btn-primary rounded-md px-6 border-none"
        >
          Make An Appointment
        </Link>
      </div>
    </section>
  );
}

export default CallToAction;
