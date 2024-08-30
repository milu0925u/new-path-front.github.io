import React from "react";
import { useSelector } from "react-redux";
import style from "./info.module.scss";
import BlueButton from "@/component/button/blue-button";
import { useRouter } from "next/router";
export default function EqLeftAll() {
  const { datas } = useSelector((state) => state.public);
  const { create } = useSelector((state) => state.workList);
  const router = useRouter();
  const handleBlueBTN = () => {
    router.push("/processing/equitment");
  };

  return (
    <div className={style.l_left_info}>
      <div className={style.left_info_title}>
        <img src={`/images/work/${create.way}.svg`} />
        <span>{datas.weldingprocess}</span>
      </div>
      <div className={style.left_info_content}>
        <p>焊接設備：....選擇的焊接設備</p>
        <p>機械手臂：....選擇的焊接設備</p>

        <p>視覺相機：....選擇的焊接設備</p>

        <p>耗材：....這邊要動態新增</p>

        <p>安全防護設備：....選擇的焊接設備</p>

        <p>氣源設備：....選擇的焊接設備</p>

        <p>網路設備：....選擇的焊接設備</p>
      </div>
    </div>
  );
}
