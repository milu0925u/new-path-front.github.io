import React from "react";
import style from "./info.module.scss";
import { useSelector } from "react-redux";
export default function EqLeftAllEquitment() {
  const { datas } = useSelector((state) => state.public);
  const { create, eqdatadefault } = useSelector((state) => state.workList);
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

  console.log(eqdatadefault);

  return (
    <>
      <div className={style.left_info_title}>
        <img src={`/images/work/${create.method}.svg`} />
        <span>{renderTitle()}</span>
      </div>
      <div className={style.left_info_content}>
        <p>
          使用設備：
          {create.weld == undefined
            ? eqdatadefault?.weld.name
            : create?.weld.name}
        </p>
        <p>
          機械手臂：
          {create.robot == undefined
            ? eqdatadefault?.robot.name
            : create?.robot.name}
        </p>
        <p>
          視覺相機：
          {create.camera == undefined
            ? eqdatadefault?.camera.name
            : create?.camera.name}
        </p>
        <p>
          安全防護設備：
          {create.security == undefined
            ? eqdatadefault?.security.name
            : create?.security.name}
        </p>
        <p>
          氣源設備：
          {create.gas == undefined ? eqdatadefault?.gas.name : create?.gas.name}
        </p>
        <p>
          網路設備：
          {create.network == undefined
            ? eqdatadefault?.network.name
            : create?.network.name}
        </p>
        <p>耗材：...</p>
      </div>
    </>
  );
}
