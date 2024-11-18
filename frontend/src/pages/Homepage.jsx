import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../css/Homepage.css";
import MyContext from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaArrowRight } from "react-icons/fa";
import { Loader } from "../Components/Loader";

export const Homepage = () => {
  const { value, setValue } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (value.isAuth) navigate("/events");
  }, [value.isAuth, navigate]);

  // the useGoogleLogin hook returns a function that can be called to initiate the login process
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (credentialResponse) => {
      const { code } = credentialResponse;
      try {
        setLoading(true);
        const res = await axios.post(
          "https://datanexify-assignment-7apd.onrender.com/user/create-token",
          { code }
        );

        setLoading(false);
        const data = res.data;

        // we have to store the email in global state
        setValue({ ...value, email: data, isAuth: true });
      } catch (error) {
        setLoading(false);
        alert("Something went wrong");
        console.log(error);
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
    scope: "openid profile email https://www.googleapis.com/auth/calendar",
    accessType: "offline",
    prompt: "consent",
  });

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <div className="card">
          <h1>DataNexify Assignment</h1>
          <p>
            Welcome to the DataNexify assignment. Please sign in with your
            Google account to continue.
          </p>
          <button id="signInButton" onClick={() => login()}>
            <FaGoogle style={{ margin: "0" }} /> <p>Login with google</p>
            <FaArrowRight style={{ margin: "0" }} />
          </button>
        </div>
      )}
    </div>
  );
};
