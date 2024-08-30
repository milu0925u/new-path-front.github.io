import React from "react";
import { useSelector } from "react-redux";
import style from "./info.module.scss";
import BlueButton from "@/component/button/blue-button";
import { useRouter } from "next/router";
export default function LeftcontentParam() {
  const { datas } = useSelector((state) => state.public);
  const { create } = useSelector((state) => state.workList);
  const { path, method } = useSelector((state) => state.start);
  const router = useRouter();

  return (
    <div className={style.l_left_info}>
      <div className={style.left_info_title}>
        <img src={`/images/work/${method}.svg`} />
        <span>{datas.weldingprocess}</span>
      </div>
      <div className={style.left_info_content}>
        <div className={style.block}>
          <h6>{datas.selectprocessingpath}</h6>
          <p>{path ? path.name : "未選擇"}</p>
        </div>
        <div>
          <h6>{datas.equipmentsetup}</h6>
          <i className="icon-ok"></i>
        </div>
        <div>
          <h6>{datas.processingparam}</h6>
          <i className="icon-ok"></i>
        </div>
        <div>
          <h6>{datas.armparam}</h6>
          <i className="icon-ok"></i>
        </div>
      </div>
    </div>
  );
}
