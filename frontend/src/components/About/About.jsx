import React from "react";
import ai from "../../assets/img/robot.png";
import ai2 from "../../assets/img/robot10.png";
import { PlayCircle } from "lucide-react";
const About = () => {
  return (
    <div>
      <section
        id="about"
        className="bg-gradient-to-r from-[#10001f] to-[#200033] text-white py-20 px-6 md:px-16"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center relative">
          <div className="relative w-full">
            <img
              src={ai2}
              alt="Robot"
              className="rounded-xl shadow-lg w-full object-cover h-[600px]"
            />
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md p-3 rounded-full">
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200px]">
              <img src={ai} alt="AI Head" className="rounded-lg shadow-md" />
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <p className="text-sm text-pink-400 font-semibold mb-2">ABOUT US</p>
            <h2 className="text-3xl font-bold leading-snug mb-4">
              Enhance Your Projects With <br /> Ultra-Realistic Voices Agent
            </h2>
            <p className="text-gray-400 mb-6 text-sm font-medium">
              Voice Agent is an AI-powered assistant that listens, understands,
              and responds using speech, enabling seamless human-computer
              interaction.
            </p>
            <div className="">
              <p>
                *Voice Agent is an intelligent conversational system** that uses
                speech recognition and synthesis to enable natural
                human-computer interaction. It listens to user commands,
                processes them using advanced AI models like Gemini, and
                responds in a human-like voice. Designed for tasks such as web
                searching, app launching, or answering questions, it supports
                multilingual responses and continuous listening. Voice Agent
                enhances accessibility and hands-free control, making it ideal
                for productivity, personal assistance, and smart environments.
                Integrated with the browser’s native speech APIs, it delivers
                real-time voice communication in a smooth, responsive interface,
                offering a seamless and engaging user experience.
              </p>
            </div>
            <button className="bg-pink-600 my-3 px-6 py-3 rounded-full hover:bg-pink-700 transition-all">
              EXPLORE MORE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
