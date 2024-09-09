import React from "react";
import style from "./info.module.scss";
import { useSelector } from "react-redux";
export default function EqLeftAllExecute() {
  const { create } = useSelector((state) => state.workList);
  // 顯示目前的文字
  const renderTitle = () => {
    switch (create.method) {
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
    <>
      <div className={style.left_info_title}>
        <img src={`/images/work/${create.method}.svg`} />
        <span>{renderTitle()}</span>
      </div>
      <div className={style.left_info_content}>
        {/* <p>使用設備：{eq ? eq.name : "未選擇"}</p>
    <p>機械手臂：{robot ? robot.name : "未選擇"}</p>

    <p>視覺相機：{camera ? camera.name : "未選擇"}</p>

    <p>安全防護設備：{security ? security.name : "未選擇"}</p>

    <p>氣源設備：{gas ? gas.name : "未選擇"}</p>

    <p>網路設備：{network ? network.name : "未選擇"}</p>
    {csb ? csb.map((v) => <p>耗材：{v.name}</p>) : "未選擇"} */}
      </div>
    </>
  );
}
