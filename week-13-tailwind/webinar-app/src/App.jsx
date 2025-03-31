import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WebinarLogo from "./components/icons/WebinarLogo";
import VerifyAge from "./components/verify-age/VerificationComponent";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import VerificationComponent from "./components/verify-age/VerificationComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
function App() {
  const ageHeader = "Verify Your Age";
  const verifyDescription =
    "Please confirm your birth year. This data will not be stored";
  const inputPlaceholder = "Your Birth Year";

  const { lastInput } = useSelector((state) => state.input);

  return (
    <div className="h-screen w-screen bg-blue-800 flex flex-col items-center">
      <div className="flex gap-x-2 my-24">
        <WebinarLogo />
        <div className="flex font-light">
          <h1 className="text-green-400 text-3xl">Webinar</h1>
          <span className="text-white text-3xl">.gg</span>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <VerificationComponent
              header={ageHeader}
              description={verifyDescription}
              placeholderText={inputPlaceholder}
              type={"text"}
              nextRoute={"/get-started"}
              buttonText={"Continue"}
              otpField={false}
            />
          }
        />

        <Route
          path="/get-started"
          element={
            <VerificationComponent
              header={"Let's Get Started"}
              placeholderText={"Email ID"}
              type={"email"}
              nextRoute={"/verify-email"}
              buttonText={"Continue"}
              otpField={false}
            />
          }
        />

        <Route
          path="/verify-email"
          element={
            <VerificationComponent
              header={"Check Your Email For A Code"}
              description={`Please enter the verification code sent to your email id ${lastInput}`}
              placeholderText={"Time Left"}
              type={"number"}
              buttonText={"Verify"}
              otpField={true}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
