import React from "react";
import style from "./range.module.scss";
import { useSelector } from "react-redux";
export default function Range({ handleParamSetting }) {
  const { create } = useSelector((state) => state.workList);
  return (
    <div className={style.connect_box}>
      <i className="icon-spray-backward"></i>
      <div className={style.line}>
        <input
          type="range"
          name="deep"
          className={style.range_bar}
          min="0.0"
          max="100.0"
          step="0.1"
          defaultValue="0.0"
          value={create.deep ? create.deep : 0}
          onChange={handleParamSetting}
        />
      </div>
      <i className="icon-spray-forward"></i>
    </div>
  );
}
