import React from "react";
import Hero from "../components/Hero/Hero";
import Feature from "../components/Feature/Feature";
import About from "../components/About/About";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <div>
        <Feature />
      </div>
      <div>
        <About />
      </div>
    </div>
  );
};

export default Homepage;
