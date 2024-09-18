import React, { useState } from "react";
import CameraLine from "@/component/nosharable/model/ff/camera-line";
import CameraScreen from "./ff/camera-screen";
import style from "./camera-create.module.scss";
export default function CameraViewScreen({ imgurl }) {
  return (
    <div className={`${style.l_screen} ${style.bg_screen}`}>
      <CameraScreen imgurl={imgurl} />
      <CameraLine />
    </div>
  );
}
