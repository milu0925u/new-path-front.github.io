import React from "react";
import style from "./camera-screen.module.scss";
import { useSelector } from "react-redux";
export default function CameraScreen({ imgurl }) {
  const { camera } = useSelector((state) => state.public);
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  return (
    <>
      {camera == "success" ? (
        <div className={style.success}>
          <div>
            <img src={`${domain}${imgurl}`} />
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
