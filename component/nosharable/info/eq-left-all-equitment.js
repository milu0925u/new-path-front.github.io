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

  return (
    <>
      <div className={style.left_info_title}>
        <img src={`/images/work/${create.method}.svg`} />
        <span>{renderTitle()}</span>
      </div>
      <div className={style.left_info_content}>
        <p>
          {datas.useEquitment}：
          <br />
          {eqdatadefault[create.method]
            ? create.weld
              ? create[create.method].name
              : eqdatadefault[create.method].name
            : datas.notselected}
        </p>
        <p>
          {datas.roboticarm}：
          <br />
          {eqdatadefault.robot
            ? create.robot
              ? create.robot.name
              : eqdatadefault.robot.name
            : datas.notselected}
        </p>
        <p>
          {datas.visioncamera}：
          <br />
          {eqdatadefault.camera
            ? create.camera
              ? create.camera.name
              : eqdatadefault.camera.name
            : datas.notselected}
        </p>
        <p>
          {datas.safetyequipment}：
          <br />
          {eqdatadefault.camera
            ? create.security
              ? create.security.name
              : eqdatadefault.security.name
            : datas.notselected}
        </p>
        <p>
          {datas.airsupplyequipment}：
          <br />
          {eqdatadefault.gas
            ? create.gas
              ? create.gas.name
              : eqdatadefault.gas.name
            : datas.notselected}
        </p>
        <p>
          {datas.networkequipment}：
          <br />
          {eqdatadefault.network
            ? create.network
              ? create.network.name
              : eqdatadefault.network.name
            : datas.notselected}
        </p>
        {eqdatadefault.csb
          ? create.csb
            ? create.csb?.map((d) => (
                <p>
                  {datas.consumables}：<br />
                  {d.name}
                </p>
              ))
            : eqdatadefault.csb.map((d) => (
                <p>
                  {datas.consumables}：<br />
                  {d.name}
                </p>
              ))
          : datas.notselected}
      </div>
    </>
  );
}
