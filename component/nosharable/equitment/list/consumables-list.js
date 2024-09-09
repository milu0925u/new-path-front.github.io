import React, { useState } from "react";
import style from "../equitment-set.module.scss";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import Search from "@/component/nosharable/list/model/search";
import WhiteButton from "@/component/button/white-button";

export default function ConsumablesList({
  csbtext,
  handleCSBActive,
  handleNext,
}) {
  const { datas } = useSelector((state) => state.public);
  const { eqdata } = useSelector((state) => state.workList);

  console.log(csbtext);

  return (
    <div className={style.maintainance_list}>
      <div className={style.list}>
        <div className={style.function}>
          <Search />
          <WhiteButton text={datas.delete} icon="icon-delete" />
        </div>
        <div className={style.item}>
          {Array.isArray(eqdata.csb) &&
            eqdata.csb.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  handleCSBActive(item);
                }}
                className={
                  csbtext.some((v) => v.id === item.id) ? style.active : ""
                }
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
      <div className="nextbtn">
        <OrangeButton
          text={datas.confirm}
          icon="icon-ok"
          handleOrangeBTN={handleNext}
        />
      </div>
    </div>
  );
}
