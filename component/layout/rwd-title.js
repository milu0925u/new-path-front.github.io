import React from "react";
import style from "./rwd-title.module.scss";

export default function RWDTitle({ children, title, icon, bgcolor, manybtn }) {
  return (
    <div className={style.l_banner}>
      <div> {children[0]}</div>
      <div
        className={`${style.col_banner} ${bgcolor ? style.blue : style.orange}`}
      >
        <i className={icon}></i>
        <div>{title}</div>
      </div>
      <div>
        {" "}
        {children[1]}
        {children[2]}
      </div>
    </div>
  );
}
