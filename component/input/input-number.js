import React from "react";
import style from "./input.module.scss";
export default function InputNumber({ handleInputValue, textvalue }) {
  return (
    <input
      type="number"
      className={style.input_default}
      value={textvalue}
      onChange={(e) => {
        handleInputValue(e);
      }}
    />
  );
}
