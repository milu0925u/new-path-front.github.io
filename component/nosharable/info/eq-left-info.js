import React from "react";
import { useSelector } from "react-redux";
import style from "./info.module.scss";
import { StartContext } from "@/hook/startContext";
export default function LeftcontentParam({ setScreen }) {
  const { datas } = useSelector((state) => state.public);
  const { start } = StartContext();

  // 顯示目前的文字
  const renderTitle = () => {
    switch (start.method) {
      case "weld":
        return datas.weldingprocess;
      case "polish":
        return datas.polishingprocessing;
      case "debur":
        return datas.deburringprocessing;
      case "spray":
        return datas.spraypaintingprocessing;
      case "drill":
        return datas.drillingprocessing;
      case "glue":
        return datas.gluingprocessing;
      case "cut":
        return datas.cuttingprocessing;
      default:
        return null;
    }
  };

  return (
    <div className={style.l_left_info}>
      <div className={style.left_info_title}>
        {start.method ? (
          <>
            <img src={`/images/work/${start.method}.svg`} />
            <span>{renderTitle()}</span>
          </>
        ) : (
          ""
        )}
      </div>
      <div className={style.left_info_content}>
        <div
          className={style.block}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setScreen("chosen-path");
          }}
        >
          <h6>{datas.selectprocessingpath}</h6>
          <p>{start.path.name ? start.path.name : "未選擇"}</p>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setScreen("chosen-param");
          }}
        >
          <h6>{datas.processingparam}</h6>
          {Object.keys(start.eq).length === 0 &&
          Object.keys(start.param).length === 0 ? (
            <i className="icon-cancle icon-cancle-bg"></i>
          ) : (
            <i className="icon-ok icon-ok-bg"></i>
          )}
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setScreen("chosen-arm");
          }}
        >
          <h6>{datas.armparam}</h6>
          {Object.keys(start.arm).length === 0 ? (
            <i className="icon-cancle icon-cancle-bg"></i>
          ) : (
            <i className="icon-ok icon-ok-bg"></i>
          )}
        </div>
      </div>
    </div>
  );
}
