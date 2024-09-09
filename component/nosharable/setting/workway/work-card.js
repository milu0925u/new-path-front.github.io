import React from "react";
import style from "./work-card.module.scss";
export default function WorkCard({ item, method }) {
  return (
    <button value={item.id} className={style.card}>
      <div>
        <img src={`/images/work/${item.image}.svg`} alt={item.image} />
      </div>
      <div className={style.bar}>
        {method == item.image ? <div className={style.mouse}></div> : ""}
      </div>
      <div>{item.name}</div>
    </button>
  );
}
