function Testimonials() {
  return (
    <section id="testimonial">
      <div id="testimonial-carousel" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <h2>
              "The moment I saw Luna’s eyes, I knew she was meant to be part of
              my family."
            </h2>
            <img className="testimonial-image" src="/img/doggo.png" alt="" />
            <em>Emma, California</em>
          </div>

          <div className="carousel-item">
            <h2>"I used to dream of belly rubs—now I get them every day!"</h2>
            <img className="testimonial-image" src="/img/corgi.png" alt="" />
            <em>Buddy, Texas</em>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          data-bs-target="#testimonial-carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          data-bs-target="#testimonial-carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
