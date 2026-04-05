function CTA({ onGetStarted }) {
  return (
    <section id="cta">
      <h3 className="cta-heading">
        Your new best friend is waiting. Adopt, don’t shop!
      </h3>

      <button
        className="btn btn-dark btn-lg download-button"
        onClick={onGetStarted}
      >
        Get Started
      </button>
    </section>
  );
}

export default CTA;
