function Pricing() {
  return (
    <section id="pricing">
      <h2>A Plan for Every Dog's Needs</h2>
      <p>Simple and affordable price plans for you and your dog.</p>

      <div className="row">
        <div className="pricing-column col-lg-4">
          <div className="card">
            <div className="card-header">
              <h3>Donate</h3>
            </div>
            <div className="card-body">
              <p>Be a lifesaver</p>
              <button className="btn btn-outline-dark">GO</button>
            </div>
          </div>
        </div>

        <div className="pricing-column col-lg-4">
          <div className="card">
            <div className="card-header">
              <h3>Volunteer</h3>
            </div>
            <div className="card-body">
              <p>Assist in their journey</p>
              <button className="btn btn-dark">GO</button>
            </div>
          </div>
        </div>

        <div className="pricing-column col-lg-4">
          <div className="card">
            <div className="card-header">
              <h3>Foster</h3>
            </div>
            <div className="card-body">
              <p>Provide a temporary home</p>
              <button className="btn btn-dark">GO</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
