export default function TwistCTA() {
  return (
    <section className="py-5 px-3 px-md-5 position-relative z-10 transition-colors duration-700" style={{ backgroundColor: "#2C1A1A", color: "#D4AF37" }}>
      <div className="container text-center d-flex flex-column align-items-center gap-4 py-5">
        <span className="text-uppercase small opacity-70" style={{ letterSpacing: "0.3em" }}>The Morning After</span>
        <h2 className="font-serif display-4 display-md-3 fw-normal leading-tight">
          Done with dessert? <br/>
          <span className="text-white opacity-90">Wake up with our Signature Cold Brew.</span>
        </h2>
        
        <button className="mt-4 px-5 py-3 btn btn-outline-warning rounded-0 text-uppercase" style={{ letterSpacing: "0.1em", borderColor: "rgba(212, 175, 55, 0.3)", color: "#D4AF37" }}>
          EXPLORE THE COFFEE COLLECTION
        </button>
      </div>
    </section>
  );
}
