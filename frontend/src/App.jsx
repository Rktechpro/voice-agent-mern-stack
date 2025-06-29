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
import Homepage from "./page/Homepage";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";
import History from "./components/history/History";

const App = () => {
  const { userData } = useContext(Usecontext);
  return (
    <div className="app">
      <Layout />
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
          path="/homepage"
          element={!userData ? <Homepage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/singup"
          element={!userData ? <Singup /> : <Navigate to={"/customize"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/customize"} />}
        />
        <Route
          path="/customize"
          element={userData ? <Customizetion /> : <Navigate to={"/homepage"} />}
        />
        <Route
          path="/custom"
          element={userData ? <Custom /> : <Navigate to={"/homepage"} />}
        />
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to={"/homepage"} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
