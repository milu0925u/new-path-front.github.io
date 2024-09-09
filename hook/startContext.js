import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// 建立這個context
export const Start = createContext([]);

export const StartRobot = ({ children }) => {
  const [start, setStart] = useState({
    path: {},
    method: "",
    param: {},
    eq: {},
    robot: {},
    camera: {},
    csb: [],
    security: {},
    gas: {},
    network: {},
  });

  const handleAdd = (name, data) => {
    setStart((prev) => {
      const updatedStart = { ...prev, [name]: data };
      localStorage.setItem("start", JSON.stringify(updatedStart));
      return updatedStart;
    });
  };

  return (
    <Start.Provider
      value={{
        start,
        setStart,
        handleAdd,
      }}
    >
      {children}
    </Start.Provider>
  );
};

// 輸出
export const StartContext = () => useContext(Start);
