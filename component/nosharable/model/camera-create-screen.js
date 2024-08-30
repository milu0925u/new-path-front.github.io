import React, { useState } from "react";
import style from "./camera-create.module.scss";
import { useSelector } from "react-redux";

export default function CameraCreate({ pointData, setPointData }) {
  const { datas, camera } = useSelector((state) => state.public);

  // 有選擇的點
  const handleChosenPoint = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    const updatedPointData = pointData.map((v) => {
      if (v.id === id) {
        return { ...v, click: !v.click };
      }
      return v;
    });
    setPointData(updatedPointData);
  };
  return (
    <div className={`${style.l_screen} ${style.bg_screen}`}>
      <div className={style.screen_title}>
        {camera === "success" ? datas.selectscanningobjectrange : ""}
      </div>
      {camera === "success" ? (
        <div className={style.success}>
          {pointData.map((item) => (
            <div
              role="button"
              key={item.id}
              data-id={item.id}
              onClick={handleChosenPoint}
            >
              <span>{item.id}.</span>
              <span>
                <i
                  className={`${
                    item.click ? `icon-point-active` : `icon-point`
                  }`}
                >
                  <i className="path1"></i>
                  <i className="path2"></i>
                </i>
              </span>
            </div>
          ))}
          <span></span>
          <img alt="" src="/images/connect/object.svg" />
        </div>
      ) : (
        <div className={style.fail}>
          <img alt="fail" src="/images/connect/fail.svg" />
        </div>
      )}
    </div>
  );
}
