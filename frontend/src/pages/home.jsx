import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">

      <div className="home-card">

        <h1 className="home-title">
          Know Your River Water Condition
        </h1>

        <p className="home-text">
          Check if your local river water is safe for your needs.
        </p>

        <button className="home-button">
          <Link to="/check">
            Water Quality
          </Link>
        </button>

        <div className="home-features">
          <p>✔ Based on E(P) Rules 1986</p>
          <p>✔ Government Monitoring Data</p>
          <p>✔ For Drinking, Bathing & Agriculture</p>
        </div>

      </div>

    </div>
  );
}

export default Home;