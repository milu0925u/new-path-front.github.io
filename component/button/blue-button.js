import React from "react";
import style from "./button.module.scss";

export default function BlueButton({ text, icon, handleBlueBTN, btnnone }) {
  return (
    <button
      className={`${style.button} ${style.back} ${
        btnnone ? style.btnnone : ""
      }`}
      data-text={text}
      onClick={(e) => {
        handleBlueBTN(e);
      }}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  );
}
