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
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#0b0b0b] to-[#111212ea] flex justify-center items-center flex-col sm:h-[100vh] relative  ">
      <button
        className="bg-[#227022] hover:bg-[green] outline-none border-none cursor-pointer px-5 py-2 rounded-2xl absolute top-[30px] left-[30px]"
        onClick={() => navgate("/")}
      >
        <ArrowBigLeft size={30} />
      </button>
      <h1 className="text-4xl text-red-400 mx-auto uppercase text-shadow-2xl font-stretch-ultra-condensed text-center">
        Select your <span className="text-green-600">image voice Agent</span>
      </h1>

      <div className="flex justify-center items-center w-full max-w-[900px] flex-wrap">
        {avtar.map((first, index) => (
          <div
            className={`w-[99px] h-[160px] lg:w-[150px] lg:h-[220px] bg-[#00000030] mx-3 gap-1.5 my-2 overflow-hidden border-1 border-t-orange-700 border-r-blue-700 border-b-violet-700 border-l-green-700  cursor-pointer hover:shadow-4xl  hover:shadow-white rounded-2xl hover:border-2 transition-all ${
              selectedImageFront == first.img
                ? "border-4 shadow-4xl border-t-orange-700 border-r-blue-700 border-b-violet-700 border-l-green-700  "
                : null
            }`}
            onClick={() => {
              setSelectedImageFront(first.img);
              setServerImage(null);
              setClientImage(null);
            }}
            key={index}
          >
            <img src={first.img} alt="" className="w-[200px] h-[220px]" />
          </div>
        ))}
        <div
          className={`w-[80px] h-[150px] lg:w-[150px] lg:h-[220px] bg-[#00000030] mx-3 gap-1.5 my-2 overflow-hidden border-1  cursor-pointer hover:shadow-4xl  hover:shadow-white rounded-2xl hover:border-2 transition-all flex items-center justify-center text-white
            ${
              selectedImageFront == "input"
                ? "border-4 shadow-2xl  border-t-orange-700 border-r-blue-700 border-b-violet-700 border-l-green-700"
                : null
            } `}
          onClick={() => {
            selectinputimg.current.click();
            setSelectedImageFront("input");
          }}
        >
          {!clientimage && (
            <ImagePlus size={50} className="w-[40px] h-[40px] text-white" />
          )}
          {clientimage && (
            <img src={clientimage} className="h-full object-cover" />
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
      {selectedImageFront && (
        <button
          className="min-w-[150px] h-[60px] bg-[#44c9ac5f] text-white  mt-8 rounded-md hover:bg-[#0C7964] transition duration-200 cursor-pointer"
          onClick={() => navgate("/custom")}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customizetion;
