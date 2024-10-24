import React from "react";
import style from "./runscreen.module.scss";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import CameraLine from "@/component/nosharable/model/ff/camera-line";
export default function TestRunScreen({ handleOrangeBTN }) {
  const { datas } = useSelector((state) => state.public);
  return (
    <div className={style.l_run}>
      <div className={style.run_screen}>
        <div className={style.run_screen_vedio}>
          <img alt="test" src="/images/background-image.png" />
        </div>
        <CameraLine />
      </div>
      <div className={style.run_btn}>
        <OrangeButton
          text={datas.confirm}
          icon="icon-ok"
          handleOrangeBTN={handleOrangeBTN}
        />
      </div>
    </div>
  );
}
