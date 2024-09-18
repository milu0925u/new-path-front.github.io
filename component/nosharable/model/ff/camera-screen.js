import React from "react";
import style from "../camera-create.module.scss";
import { useSelector } from "react-redux";
export default function CameraScreen({ imgurl }) {
  const { camera } = useSelector((state) => state.public);
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  return (
    <>
      {camera == "success" ? (
        <div className={`${style.success} `}>
          <div className={style.success_img}>
            {/* <img src={`${domain}${imgurl}`} /> */}
            <img src="/images/background-image.png" />
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
