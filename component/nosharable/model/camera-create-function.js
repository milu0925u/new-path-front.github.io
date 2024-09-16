import React, { useRef, useState } from "react";
import style from "./camera-function.module.scss";
import { useSelector } from "react-redux";
import Connect from "@/component/connect";
export default function CameraFunction({
  children,
  handleConnect,
  setsettingname,
  handleImportData,
}) {
  const { datas } = useSelector((state) => state.public);

  const [active, setActive] = useState(false);
  return (
    <div className={`${style.l_function} ${style.bg_function}`}>
      <h3 className="content-title">{datas.adjustscanningsettings}</h3>
      <div className={style.col_function}>
        <h6>{datas.cameraconnectionstatus}</h6>
        <div>
          <Connect icon="icon-camera" />
          <button className={style.button} onClick={handleConnect}>
            {datas.reconnect}
          </button>
        </div>
      </div>

      <div className={style.col_function}>
        <h6>{datas.scancameraparameters}</h6>
        <div className={style.function_param_btn}>
          <button
            className={`${style.button} ${
              active == datas.basicsettings ? style.active : ""
            }`}
            onClick={() => {
              setActive(datas.basicsettings);
              setsettingname("origin.yml");
            }}
          >
            {datas.basicsettings}
          </button>

          <input
            id="upload"
            type="file"
            name="setting"
            accept=".yml, .yaml"
            onChange={handleImportData}
            multiple
          />
          <label
            htmlFor="upload"
            onClick={() => {
              setActive(datas.importcustomsettings);
            }}
            className={
              active === datas.importcustomsettings ? style.active : ""
            }
          >
            +{datas.importcustomsettings}
          </label>
        </div>
      </div>
      <div className="nextbtn">{children}</div>
    </div>
  );
}
