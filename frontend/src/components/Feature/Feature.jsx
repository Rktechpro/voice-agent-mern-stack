import React from "react";
import "./antimation.css";
import { Waves, Users, SquarePen, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Feature = () => {
  const navagate = useNavigate();

  const features = [
    {
      icon: <Waves className="w-10 h-10" />,
      title: "Voice Inflections",
      desc: "Voice inflections refer to the variations in pitch, tone, and emphasis.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Multi-Voice Feature",
      desc: "Enables switching between different voices for personalized responses.",
    },
    {
      icon: (
        <History className="w-10 h-10" onClick={() => navagate("/history")} />
      ),
      title: "History Mode",
      desc: "Stores and displays past voice interactions for easy access and reference.",
    },
    {
      icon: <SquarePen className="w-10 h-10" />,
      title: "Customize",
      desc: "Upload image and name to personalize the experience.",
    },
  ];

  return (
    <section id="features" className="px-4 sm:px-10 py-20 bg-[#1a0033]">
      <h3 className="text-center text-sm text-pink-600 font-bold mb-2 uppercase">
        Features
      </h3>
      <h2 className="text-3xl text-center font-bold mb-12 text-gray-200">
        AI Solution For Your Voice Agent
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer hover:border-1 hover:border-red-400 ${
              i === 1 ? "bg-[#6518bd]" : "bg-[#4c206c89]"
            }`}
          >
            <div className="flex justify-center text-pink-400 mb-4 animate-bounce">
              {f.icon}
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">{f.title}</h4>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
