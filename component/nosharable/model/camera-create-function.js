import React, { useRef, useState } from "react";
import style from "./camera-function.module.scss";
import { useSelector } from "react-redux";
import Connect from "@/component/connect";
export default function CameraFunction({
  children,
  handleConnect,
  handleImportData,
}) {
  const { datas } = useSelector((state) => state.public);

  const [active, setActive] = useState(false);
  const fileRef = useRef();
  return (
    <div className={`${style.l_function} ${style.bg_function}`}>
      <h3 className="content-title">{datas.adjustscanningsettings}</h3>
      <div className={style.col_function}>
        <h6>{datas.cameraconnectionstatus}</h6>
        <div>
          <Connect icon="icon-camera" />
          <button onClick={handleConnect}>{datas.reconnect}</button>
        </div>
      </div>

      <div className={style.col_function}>
        <h6>{datas.scancameraparameters}</h6>
        <div className={style.function_param_btn}>
          <button
            className={active == datas.basicsettings ? style.active : ""}
            onClick={() => {
              setActive(datas.basicsettings);
            }}
          >
            {datas.basicsettings}
          </button>

          <input
            id="file"
            type="file"
            accept=".yml, .yaml"
            onChange={handleImportData}
          />
          <label
            htmlFor="file"
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
