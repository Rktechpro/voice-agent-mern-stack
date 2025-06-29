import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const Usecontext = createContext(null);
const UserContext = ({ children }) => {
  // const Url='http://localhost:3500'
  const Url = import.meta.env.VITE_BACKED_URL_HOST;
  const [userData, setUserData] = useState(null);
  const [clientimage, setClientImage] = useState(null);
  const [serverimage, setServerImage] = useState(null);
  const [selectedImageFront, setSelectedImageFront] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const userresponse = await axios.get(
        `${Url}/api/user/current`,

        {
          withCredentials: true,
        }
      );
      setUserData(userresponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const geminiResponse = async (command) => {
    try {
      const response = await axios.post(
        `${Url}/api/user/geminiagent`,
        { command },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    Url,
    userData,
    setUserData,
    clientimage,
    setClientImage,
    serverimage,
    setServerImage,
    selectedImageFront,
    setSelectedImageFront,
    geminiResponse,
  };
  return (
    <div>
      <Usecontext.Provider value={value}>{children}</Usecontext.Provider>
    </div>
  );
};

export default UserContext;
