function CallToAction() {
  return (
    <section className="bg-blue-50 py-12 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl md:text-3xl font-semibold text-blue-700 mb-4">
          In an emergency? Need help now?
        </h3>

        <p className="text-lg text-gray-600 mb-4">
          Our medical team is available 24/7 to provide urgent medical
          assistance.
        </p>

        <button className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 border-none">
          Make An Appointment
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
