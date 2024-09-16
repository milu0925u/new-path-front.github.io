import React from "react";
import style from "../equitment-set.module.scss";
import { useSelector } from "react-redux";

export default function ConsumablesMaintainance({ text }) {
  const { datas } = useSelector((state) => state.public);

  return (
    <div className={style.maintainance}>
      <div className="content-title">{datas.consumables}</div>
      {text.length > 0 ? (
        text.map((v) => (
          <>
            <div>
              <span>{datas.consumables}：</span>
              <input type="text" value={v.name} disabled />
            </div>
            <div>
              <span>{datas.remaininglength}：</span>
              <input type="text" value={v.length} disabled />
              {datas.meter}
            </div>
            <div>
              <span>{datas.updatedate}：</span>
              <span>{v.date}</span>
            </div>
          </>
        ))
      ) : (
        <>
          <div>
            <span>{datas.consumables}：</span>
            <input type="text" />
          </div>
          <div>
            <span>{datas.remaininglength}：</span>
            <input type="text" />
            {datas.meter}
          </div>
          <div>
            <span>{datas.updatedate}：</span>
            <span></span>
          </div>
        </>
      )}
    </div>
  );
}
