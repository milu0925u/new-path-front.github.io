import React, { useEffect, useState } from "react";
import style from "./info.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
export default function EqLeftAllParam() {
  const { create } = useSelector((state) => state.workList);
  const { datas } = useSelector((state) => state.public);
  const router = useRouter();

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
  // 路徑名稱
  const [path, setPath] = useState("");
  useEffect(() => {
    const data = sessionStorage.getItem("start");
    if (data) {
      const start = JSON.parse(data);
      setPath(start.path.name);
    }
  }, []);
  return (
    <>
      {router.pathname === "/processing/processing-set" ? null : (
        <div className={`${style.l_left_info} ${style.height}`}>
          <div className={style.left_info_title}>
            <img src={`/images/work/${create.method}.svg`} />
            <span>{renderTitle()}</span>
          </div>
          <div className={style.left_info_content}>
            {/* <div className={style.block}>
          <h6>{datas.selectprocessingpath}</h6>
          <p>{path ? path : datas.notselected}</p>
        </div> */}
            <div>
              <h6>{datas.equipmentsetup}</h6>
              <i className="icon-ok icon-ok-bg"></i>
            </div>
            <div>
              <h6>{datas.processingparam}</h6>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
