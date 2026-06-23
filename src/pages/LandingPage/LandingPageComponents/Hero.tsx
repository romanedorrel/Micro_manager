import { Leaf } from "lucide-react";
import MountainHero from "../../../assets/MountainHero.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${MountainHero})` }}>
      <h1 className="hero-title">Find your next step</h1>
      <p className="hero-description">
        Sometimes the hardest part isnt motivation, its knowing what to do next.
      </p>
      <p>
        TrueNorth turns overwhelming goals into calm, manageable daily tasks.
      </p>
      <Link to="/signup" className="hero-button">
        Begin
        <Leaf size={18} />
      </Link>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
      {/* <img src={MountainHero} alt="not yet" className="hero-image" /> */}
    </div>
  );
};

export default Hero;
