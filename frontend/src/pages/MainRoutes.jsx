import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./Homepage";
import { Formpage } from "./Formpage";
import { AllEventsPage } from "./AllEventsPage";
import { Navbar } from "../Components/Navbar";
import MyContext from "../context/MyContext";

export const MainRoutes = () => {
  const { value, setValue } = useContext(MyContext);
  return (
    <>
      {value.isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/form" element={<Formpage />} />
        <Route path="/events" element={<AllEventsPage />} />
      </Routes>
    </>
  );
};
