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
      navagate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#c11414] to-[#066e49ea] flex justify-center items-center flex-col sm:h-[100vh] relative   ">
      <button
        className="bg-[#227022] hover:bg-[green] outline-none border-none cursor-pointer px-5 py-2 rounded-2xl absolute top-[30px] left-[30px]"
        onClick={() => navagate("/customize")}
      >
        <ArrowBigLeft size={30} />
      </button>
      <h1 className="text-2xl text-red-400 mx-auto uppercase text-shadow-2xl font-stretch-ultra-condensed text-center">
        Enter Your <span className="text-green-600"> voice Agent Name</span>
      </h1>
      <input
        name="name"
        className="mt-7 w-full max-w-[500px] p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10 text-white bg-transparent"
        placeholder="eg.Jasmine"
        onChange={(e) => setVoiceAgentName(e.target.value)}
        value={voiceAgentName}
        required
      />
      {voiceAgentName && (
        <button
          className="min-w-[150px] h-[60px] bg-[#44c9ac5f] text-white  mt-8 rounded-md hover:bg-[#0C7964] transition duration-200 cursor-pointer"
          onClick={() => {
            handleUpdatevoiceagent();
          }}
        >
          create voice agent
        </button>
      )}
    </div>
  );
};

export default Custom;
