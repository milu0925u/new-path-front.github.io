import React from "react";
import style from "./connect.module.scss";
import { useSelector } from "react-redux";
export default function Connect({ icon }) {
  const { camera } = useSelector((state) => state.public);

  const renderConnetScreen = () => {
    switch (camera) {
      case "success": {
        return (
          <div className={style.line}>
            <div className={style.success}></div>
          </div>
        );
      }
      case "fail": {
        return (
          <div className={style.line}>
            <div className={style.fail}>
              <i className="icon-cancle"></i>
            </div>
          </div>
        );
      }
      default:
        return <div className={style.connect_line}></div>;
    }
  };
  return (
    <div
      className={`${style.image_block} ${
        camera === "success" ? style.success : style.fail
      }`}
    >
      <i className={icon}></i>
      {renderConnetScreen()}
      <i className="icon-screen"></i>
    </div>
  );
}
