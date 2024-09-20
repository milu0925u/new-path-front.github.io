import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// 建立這個context
export const Start = createContext([]);

export const StartRobot = ({ children }) => {
  const [start, setStart] = useState({
    path: "",
    method: "",
    param: {},
    eq: {},
    robot: {},
    camera: {},
    csb: [],
    security: {},
    gas: {},
    network: {},
    arm: {},
  });

  const handleAdd = (name, data) => {
    setStart((prev) => {
      const updatedStart = { ...prev, [name]: data };
      sessionStorage.setItem("start", JSON.stringify(updatedStart));
      return updatedStart;
    });
  };
  useEffect(() => {
    const drawData = sessionStorage.getItem("start");
    if (drawData !== null) {
      let data = JSON.parse(drawData);
      setStart(data);
    }
  }, []);

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
