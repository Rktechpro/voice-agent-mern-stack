import React, { useState, useContext } from "react";
import { Usecontext } from "../../context/UserContext";
import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Custom = () => {
  const navagate = useNavigate();
  const { userData, serverimage, selectedImageFront, Url, setUserData } =
    useContext(Usecontext);

  const [voiceAgentName, setVoiceAgentName] = useState(
    userData?.voiceAgentName || ""
  );
  const handleUpdatevoiceagent = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", voiceAgentName);
      if (serverimage) {
        formData.append("assistantImage", serverimage);
      } else {
        formData.append("imageUrl", selectedImageFront);
      }
      const response = await axios.post(
        `${Url}/api/user/AgentUpdate`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data);
      setUserData(response.data);
      navagate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0b0022] via-[#1a0033] to-[#1a001f] flex flex-col justify-center items-center relative px-4">
      {/* Back Button */}
      <button
        className="bg-[#227022] hover:bg-green-600 outline-none border-none cursor-pointer px-5 py-2 rounded-2xl absolute top-6 left-6"
        onClick={() => navagate("/customize")}
      >
        <ArrowBigLeft size={30} />
      </button>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl text-red-400 uppercase text-center font-stretch-ultra-condensed">
        Enter Your <span className="text-green-600">Voice Agent Name</span>
      </h1>

      {/* Input */}
      <input
        name="name"
        type="text"
        className="mt-7 w-full max-w-[500px] p-3 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white bg-transparent placeholder-gray-400"
        placeholder="e.g. Jasmine"
        onChange={(e) => setVoiceAgentName(e.target.value)}
        value={voiceAgentName}
        required
      />

      {/* Conditional Submit Button */}
      {voiceAgentName && (
        <button
          className="min-w-[150px] h-[60px] bg-[#44c9ac5f] text-white mt-8 rounded-md hover:bg-[#0C7964] transition duration-200 cursor-pointer"
          onClick={handleUpdatevoiceagent}
        >
          Create Voice Agent
        </button>
      )}
    </div>
  );
};

export default Custom;
