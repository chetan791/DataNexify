import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import { CiCalendarDate } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import { SlMenu } from "react-icons/sl";

export const Navbar = () => {
  const { value, setValue } = useContext(MyContext);

  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      id="navbar-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 3%",
        boxSizing: "border-box",
        backgroundColor: "#202938",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Assignment</h1>
        <SlMenu id="SlMenu" onClick={() => setShowOptions((prev) => !prev)} />
      </div>
      <ul
        style={{
          display: showOptions ? "flex" : "",
        }}
        className={showOptions ? "" : "hide-ul"}
      >
        <li
          onClick={() => {
            setShowOptions(false);
            navigate("/events");
          }}
        >
          <CiCalendarDate />
          <p>Events</p>
        </li>
        <li
          onClick={() => {
            setShowOptions(false);
            navigate("/form");
          }}
        >
          <IoAddCircleOutline />
          <p>Create Event</p>
        </li>
        <li
          onClick={() => {
            setValue({ ...value, email: "", isAuth: false });
            navigate("/");
          }}
        >
          <MdLogout />
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
};
