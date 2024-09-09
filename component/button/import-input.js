import React from "react";
import style from "./button.module.scss";
export default function ImportInput({ text, icon, handleOrangeBTN }) {
  return (
    <div className={style.file}>
      <input
        type="file"
        id="upload"
        name="model"
        accept=".obj,.ply"
        onChange={handleOrangeBTN}
        multiple
      />
      <label htmlFor="upload" className={`${style.button} ${style.next}`}>
        <i className={icon}></i>
        <span>{text}</span>
      </label>
    </div>
  );
}
