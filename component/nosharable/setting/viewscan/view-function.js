import React, { useState } from "react";
import CameraConnect from "@/component/nosharable/control/connect/camera-connect";
import style from "./view-function.module.scss";
import { useDispatch, useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";

export default function ViewFunction({ children }) {
  const dispatch = useDispatch();
  const { datas } = useSelector((state) => state.public);

  const [active, setActive] = useState(false);

  return (
    <div className={style.content_bg}>
      <div>{datas.adjustcameraparameters}</div>
      <div className={style.scan_block}>
        <h3>{datas.cameraconnectionstatus}</h3>
        <div className={style.connect}>
          <CameraConnect />
          <button>{datas.reconnect}</button>
        </div>
      </div>

      <div className={style.scan_block}>
        <h3>{datas.scancameraparameters}</h3>
        <div>
          <button
            className={active == datas.basicsettings ? style.active : ""}
            onClick={(e) => {
              setActive(datas.basicsettings);
            }}
          >
            {datas.basicsettings}
          </button>
          <button
            className={active == datas.importcustomsettings ? style.active : ""}
            onClick={(e) => {
              setActive(datas.importcustomsettings);
            }}
          >
            +{datas.importcustomsettings}
          </button>
        </div>
      </div>

      <div className="margin-top margin-bottom display-center">
        <OrangeButton
          text={datas.confirm}
          icon="icon-ok"
          handleOrangeBTN={handleOrangeBTN}
        />
      </div>
    </div>
  );
}
