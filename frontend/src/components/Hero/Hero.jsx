import React from "react";
import ro from "../../assets/img/ro.png";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-6 md:px-20 bg-gradient-to-r from-[#0b0022] via-[#1a0033] to-[#1a001f]"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your  intelligent<br /> Generative Voice Agent. <br /> 
            </h1>
            <p className="text-gray-300 mb-8 max-w-md text-sm">
              A voice agent is an AI-powered assistant that uses speech
              recognition and synthesis to understand user input, respond
              naturally, and perform tasks through voice commands.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/singup")}
                className="bg-pink-600 px-6 py-3 rounded-full cursor-pointer hover:bg-pink-700"
              >
                GET STARTED
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={ro}
              alt="AI Head"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
