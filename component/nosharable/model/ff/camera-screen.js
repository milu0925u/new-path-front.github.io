import React from "react";
import style from "./camera-screen.module.scss";
import { useSelector } from "react-redux";
export default function CameraScreen({ imgurl }) {
  const { camera } = useSelector((state) => state.public);
  const aidomain = process.env.NEXT_PUBLIC_AI;
  return (
    <>
      {camera == "success" ? (
        <div className={style.success}>
          <div>
            <img src={`${aidomain}${imgurl ? imgurl : ""}`} />
          </div>
        </div>
      ) : (
        <div className={style.fail}>
          <img alt="fail" src="/images/connect/fail.svg" />
        </div>
      )}
    </>
  );
}
