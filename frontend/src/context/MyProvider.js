import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [value, setValue] = useState(() => {
    const savedState = localStorage.getItem("myState");

    return savedState ? JSON.parse(savedState) : { email: "", isAuth: false };
  });

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(value));
  }, [value]);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
