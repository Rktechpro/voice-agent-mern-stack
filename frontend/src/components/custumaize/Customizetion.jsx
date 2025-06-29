import React, { useContext, useRef } from "react";
import avtar1 from "../../assets/img/avtar1.png";
import avtar2 from "../../assets/img/avtar2.png";
import avtar3 from "../../assets/img/avtar3.png";
import avtar4 from "../../assets/img/avtar4.png";
import avtar5 from "../../assets/img/avtar5.png";
import { ArrowBigLeft, ImagePlus } from "lucide-react";

import { Usecontext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Customizetion = () => {
  const navgate = useNavigate();
  const {
    clientimage,
    setClientImage,
    serverimage,
    setServerImage,
    selectedImageFront,
    setSelectedImageFront,
  } = useContext(Usecontext);

  const selectinputimg = useRef();

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    setServerImage(file);
    setClientImage(URL.createObjectURL(file));
  };
  const avtar = [
    {
      img: avtar1,
    },
    {
      img: avtar2,
    },
    {
      img: avtar3,
    },
    {
      img: avtar4,
    },
    {
      img: avtar5,
    },
  ];
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0b0022] via-[#1a0033] to-[#1a001f] flex flex-col justify-center items-center relative px-4">
  {/* Back Button */}
  <button
    className="bg-[#227022] hover:bg-green-600 outline-none border-none cursor-pointer px-5 py-2 rounded-2xl absolute top-6 left-6"
    onClick={() => navgate("/")}
  >
    <ArrowBigLeft size={30} />
  </button>

  {/* Title */}
  <h1 className="text-3xl sm:text-4xl text-red-400 text-center uppercase font-stretch-ultra-condensed mb-6">
    Select your <span className="text-green-600">image voice Agent</span>
  </h1>

  {/* Avatars Grid */}
  <div className="flex flex-wrap justify-center items-center w-full max-w-[900px] gap-4">
    {avtar.map((first, index) => (
      <div
        key={index}
        className={`w-[99px] h-[160px] lg:w-[150px] lg:h-[220px] bg-[#00000030] overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${
          selectedImageFront === first.img
            ? "border-4 border-t-orange-700 border-r-blue-700 border-b-violet-700 border-l-green-700 shadow-2xl"
            : "border border-t-orange-700 border-r-blue-700 border-b-violet-700 border-l-green-700 hover:shadow-2xl hover:shadow-white hover:border-2"
        }`}
        onClick={() => {
          setSelectedImageFront(first.img);
          setServerImage(null);
          setClientImage(null);
        }}
      >
        <img src={first.img} alt="" className="w-full h-full object-cover" />
      </div>
    ))}

    {/* Upload Option */}
    <div
      className={`w-[99px] h-[160px] lg:w-[150px] lg:h-[220px] bg-[#00000030] overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-center text-white ${
        selectedImageFront === "input"
          ? "border-4 border-t-orange-700 border-r-blue-700 border-b-violet-700 border-l-green-700 shadow-2xl"
          : "border border-gray-500 hover:shadow-2xl hover:shadow-white hover:border-2"
      }`}
      onClick={() => {
        selectinputimg.current.click();
        setSelectedImageFront("input");
      }}
    >
      {!clientimage ? (
        <ImagePlus size={40} className="text-white" />
      ) : (
        <img src={clientimage} alt="Uploaded" className="h-full w-full object-cover" />
      )}
    </div>

    <input
      type="file"
      accept="image/*"
      hidden
      ref={selectinputimg}
      onChange={handleImageInput}
    />
  </div>

  {/* Next Button */}
  {selectedImageFront && (
    <button
      className="min-w-[150px] h-[60px] bg-[#44c9ac5f] text-white mt-8 rounded-md hover:bg-[#0C7964] transition duration-200 cursor-pointer"
      onClick={() => navgate("/custom")}
    >
      Next
    </button>
  )}
</div>

  );
};

export default Customizetion;
