import React, { useContext, useRef, useState, useEffect } from "react";
import { Usecontext } from "../../context/UserContext";
import { Cross, LogOutIcon, Menu, SquarePen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import usergif from "../../assets/img/user.gif";
import aigif from "../../assets/img/ai.gif";

const VoiceAgent = () => {
  const navagate = useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [AiResponseText, setAiResponseText] = useState("");
  const isSpeakingRef = useRef(false);
  const isrecogantionsRef = useRef(null);
  const isreacorerctions = useRef(null);
  const [menu, setmenu] = useState(false);
  const synth = window.speechSynthesis;

  const { userData, Url, setUserData, geminiResponse } = useContext(Usecontext);
  const LogoutvoiceAgent = async () => {
    try {
      const response = await axios.get(`${Url}/api/authRouter/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        navagate("/login");
        toast.success(response.data.message);
        setUserData(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };
  // start lestening
  const startRecogntion = () => {
    if (!isSpeakingRef.current && !isrecogantionsRef.current) {
      try {
        isrecogantionsRef.current?.start();
      } catch (error) {
        if (!error.message.includes("start")) {
          console.log("Recogntion error", error);
        }
      }
    }
  };

  //speeck
  const speakagent = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindivoice = voices.find((v) => v.lang === "hi-IN");
    if (hindivoice) {
      utterance.voice = hindivoice;
    }
    isSpeakingRef.current = true;
    utterance.onend = () => {
      setAiResponseText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecogntion();
      }, 900);
    };
    synth.cancel();
    synth.speak(utterance);
  };

  //searching other platform
  const handleSearchCommand = (data) => {
    const { type, userInput, response } = data;
    speakagent(response);
    const query = encodeURIComponent(userInput);

    if (type === "google_search") {
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "youtube_search") {
      window.open(`https://www.youtube.com/search?q=${query}`, "_blank");
    }

    if (type === "youtube_search" || type === "youtube_play") {
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }

    if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    }

    if (type === "google_Chrome_open") {
      window.open("https://www.google.com/chrome/", "_blank");
    }

    if (type === "instgram_open") {
      window.open("https://www.instagram.com", "_blank");
    }

    if (type === "linkedin_open") {
      window.open("https://www.linkedin.com", "_blank");
    }

    if (type === "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    }

    if (type === "weather_show") {
      window.open("https://www.google.com/search?q=weather", "_blank");
    }

    if (type === "github_open") {
      window.open("https://github.com", "_blank");
    }

    if (type === "general") {
      console.log("General response:", response);
    }
  };

  useEffect(() => {
    const recogntionSpeech =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognation = new recogntionSpeech();
    recognation.continuous = true;
    recognation.lang = "en-US";
    recognation.interimResult = false;
    isrecogantionsRef.current = recognation;

    const optimizeRecogantions = () => {
      if (!isSpeakingRef.current && !isreacorerctions.current) {
        try {
          recognation.start();
          console.log("reacognation requested to start");
        } catch (error) {
          if (error.name !== "InvalidStartError") {
            console.log("Start error:" + error);
          }
        }
      }
    };
    recognation.onstart = () => {
      isrecogantionsRef.current = true;
      setListening(true);
    };
    recognation.onend = () => {
      isrecogantionsRef.current = false;
      setListening(false);
    };
    if (!isSpeakingRef.current) {
      setTimeout(() => {
        optimizeRecogantions();
      }, 1000);
    }
    recognation.onerror = (e) => {
      console.warn("Recogantions error:" + e.error);
      isrecogantionsRef.current = false;
      setListening(false);
      if (e.error !== "Aborted" && !isSpeakingRef.current) {
        setTimeout(() => {
          optimizeRecogantions();
        }, 1000);
      }
    };
    recognation.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        setAiResponseText("");
        setUserText(transcript);
        recognation.stop();
        isrecogantionsRef.current = false;
        setListening(false);
        const data = await geminiResponse(transcript);
        handleSearchCommand(data);
        setUserText("");
        setAiResponseText(data.response);
      }
    };
    const callback = setInterval(() => {
      if (!isSpeakingRef.current && !isreacorerctions.current) {
        optimizeRecogantions();
      }
    }, 10000);

    const geeting = new SpeechSynthesisUtterance(
      `Hello${userData.name},What can I Help you with?`
    );
    geeting.lang = "hi-IN";
    window.speechSynthesis.speak(geeting);
    return () => {
      setListening(false);
      recognation.stop();
      isrecogantionsRef.current = false;
      clearInterval(callback);
    };
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#000000] to-[#000000] flex justify-center items-center flex-col sm:h-[100vh] gap-7 relative overflow-hidden ">
      <Menu
        className="lg:hidden absolute text-white top-[20px] right-[20px]"
        onClick={() => setmenu(true)}
      />
      <div
        className={`absolute h-[100%] w-full top-0 bg-[#0000009e]  backdrop-blur-lg p-[20px] lg:hidden flex flex-col gap-[20px] items-start ${
          menu ? " translate-x-0" : "translate-x-full"
        } transition-transform`}
      >
        <X
          className="absolute text-white top-[20px] right-[20px]"
          onClick={() => setmenu(false)}
        />

        <button
          onClick={() => navagate("/customize")}
          className="min-w-[150px] h-[60px] bg-[#44c9ac5f] text-white  rounded-md hover:bg-[#0C7964]    transition duration-200 cursor-pointer "
        >
          <SquarePen className=" absolute  mx-2" /> Customize
        </button>
        <button
          className="min-w-[150px]  h-[60px] bg-[#44c9ac5f] text-white  rounded-md hover:bg-[#0C7964]  text-[19px] px-[20px] py-[10px] transition duration-200 cursor-pointer  top-[100px] "
          onClick={LogoutvoiceAgent}
        >
          <LogOutIcon className=" absolute " /> Logout
        </button>

        <div className="w-full h-[2px] bg-gray-500 "></div>
        <h1 className="text-2xl font-mono text-white">History</h1>
        <div className="w-full h-screen gap-[5px]  overflow-y-auto flex flex-col ">
          {userData.history?.map((item, index) => (
            <span
              key={index}
              className=" text-white text-[17px] font-mono truncate "
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => navagate("/customize")}
        className="min-w-[150px] h-[60px] bg-[#44c9ac5f] text-white  mt-8 rounded-md hover:bg-[#0C7964] absolute transition duration-200 cursor-pointer top-[20px] right-[25px] hidden lg:block"
      >
        customize
      </button>
      <button
        className="min-w-[150px] absolute h-[60px] bg-[#44c9ac5f] text-white  mt-8 rounded-md hover:bg-[#0C7964] top-[100px] right-[25px] transition duration-200 cursor-pointer hidden lg:block"
        onClick={LogoutvoiceAgent}
      >
        <LogOutIcon className=" absolute left-[22px]" /> Logout
      </button>
      <div className="w-[330px] h-[420px] flex justify-center items-center overflow-hidden rounded-3xl shadow">
        <img
          src={userData?.assistantImage}
          alt=""
          className="w-[320px] h-[320px]"
        />
      </div>
      <h1 className="text-2xl text-gray-600 text-center font-bold text-shadow-2xs">
        I am {userData?.assistantName}
      </h1>

      {!AiResponseText && <img src={usergif} className="w-[150px]" />}
      {AiResponseText && <img src={aigif} className="w-[150px]" />}
      <h1 className="text-white text-[20px] font-mono text-wrap">
        {userText ? userText : AiResponseText ? AiResponseText : null}
      </h1>
    </div>
  );
};

export default VoiceAgent;
