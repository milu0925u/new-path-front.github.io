import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./camera-function.module.scss";
import styles from "@/component/input/input.module.scss";
export default function CameraViewName({
  children,
  modelName,
  barValue,
  handleBarValue,
  handleNameSet,
  handleScope,
}) {
  const { datas } = useSelector((state) => state.public);

  return (
    <div className={`${style.l_function} ${style.bg_function}`}>
      <h3 className="content-title">{datas.modelsettings}</h3>
      <div className={style.col_function}>
        <h6>{datas.modelcreationnaming}</h6>
        <div>
          <input
            type="text"
            className={style.function_modelname}
            value={modelName}
            onChange={(e) => {
              handleNameSet(e);
            }}
          />
        </div>
      </div>
      <div className={style.col_function}>
        <h6>{datas.scanbackgroundremovalrange}</h6>
        <div>
          <div>
            <input
              type="number"
              className={styles.input_default}
              value={barValue}
              onChange={(e) => {
                handleBarValue(e);
              }}
            />
            mm
          </div>
          <button className={style.function_ok_btn} onClick={handleScope}>
            ok
          </button>
        </div>
      </div>
      <div className="nextbtn">{children}</div>
    </div>
  );
}
