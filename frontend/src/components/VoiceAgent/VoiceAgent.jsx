import React, { useContext, useRef, useState, useEffect } from "react";
import { Usecontext } from "../../context/UserContext";

import usergif from "../../assets/img/user.gif";
import aigif from "../../assets/img/ai.gif";

const VoiceAgent = () => {
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [AiResponseText, setAiResponseText] = useState("");
  const isSpeakingRef = useRef(false);
  const isrecogantionsRef = useRef(null);
  const isreacorerctions = useRef(null);

  const synth = window.speechSynthesis;

  const { userData, geminiResponse } = useContext(Usecontext);

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
  const speakagent = async (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    const voices = await window.speechSynthesis.getVoices();
    const hindivoice = voices.find((v) => v.lang === "hi-IN");
    if (hindivoice) {
      utterance.lang = hindivoice;
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
    <div className="w-full h-[100vh] bg-gradient-to-r from-[#0b0022] via-[#1a0033] to-[#1a001f]  flex justify-center items-center flex-col sm:h-[100vh] gap-7 relative overflow-hidden ">
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
