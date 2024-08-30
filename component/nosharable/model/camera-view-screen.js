import React, { useState } from "react";
import CameraLine from "@/component/nosharable/model/ff/camera-line";
import CameraScreen from "./ff/camera-screen";
import style from "./camera-create.module.scss";
export default function CameraViewScreen() {
  return (
    <div className={`${style.l_screen} ${style.bg_screen}`}>
      {/* <div className={style.screen_title}></div> */}
      <CameraScreen />
      <CameraLine />
    </div>
  );
}
