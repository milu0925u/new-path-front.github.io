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

  console.log(create.csb);

  return (
    <>
      <div className={style.left_info_title}>
        <img src={`/images/work/${create.method}.svg`} />
        <span>{renderTitle()}</span>
      </div>
      <div className={style.left_info_content}>
        <p>
          使用設備：
          {eqdatadefault[create.method]
            ? create.weld
              ? create[create.method].name
              : eqdatadefault[create.method].name
            : "未選擇"}
        </p>
        <p>
          機械手臂：
          {eqdatadefault.robot
            ? create.robot
              ? create.robot.name
              : eqdatadefault.robot.name
            : "未選擇"}
        </p>
        <p>
          視覺相機：
          {eqdatadefault.camera
            ? create.camera
              ? create.camera.name
              : eqdatadefault.camera.name
            : "未選擇"}
        </p>
        <p>
          安全防護設備：
          {eqdatadefault.camera
            ? create.security
              ? create.security.name
              : eqdatadefault.security.name
            : "未選擇"}
        </p>
        <p>
          氣源設備：
          {eqdatadefault.gas
            ? create.gas
              ? create.gas.name
              : eqdatadefault.gas.name
            : "未選擇"}
        </p>
        <p>
          網路設備：
          {eqdatadefault.network
            ? create.network
              ? create.network.name
              : eqdatadefault.network.name
            : "未選擇"}
        </p>
        {eqdatadefault.csb
          ? create.csb
            ? create.csb?.map((d) => <p>耗材：{d.name}</p>)
            : eqdatadefault.csb.map((d) => <p>耗材：{d.name}</p>)
          : "未選擇"}
      </div>
    </>
  );
}
