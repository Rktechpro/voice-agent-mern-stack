import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Singup from "./components/Singup/Singup";
import Login from "./components/Login/Login";
import Home from "./page/Home";
import Customizetion from "./components/custumaize/Customizetion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { Usecontext } from "./context/UserContext";
import Custom from "./components/custumaize/Custom";
const App = () => {
  const { userData, setUserData } = useContext(Usecontext);
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            userData?.assistantImage && userData?.assistantName ? (
              <Home />
            ) : (
              <Navigate to="/customize" />
            )
          }
        />
        <Route
          path="/singup"
          element={!userData ? <Singup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/customize"
          element={userData ? <Customizetion /> : <Navigate to={"/singup"} />}
        />
        <Route
          path="/custom"
          element={userData ? <Custom /> : <Navigate to={"/singup"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
