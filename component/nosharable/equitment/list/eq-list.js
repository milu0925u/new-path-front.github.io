import React, { useEffect, useState } from "react";
import style from "../equitment-set.module.scss";
import { useDispatch, useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import Search from "@/component/nosharable/list/model/search";
import WhiteButton from "@/component/button/white-button";
import { useRouter } from "next/router";

export default function EqList({ handleNext, text, handleActive }) {
  const { datas } = useSelector((state) => state.public);
  const { eqdata, create } = useSelector((state) => state.workList);

  const router = useRouter();
  useEffect(() => {
    if (create.method === undefined) {
      router.push("/processing/processing-chose");
    }
  }, [router]);

  return (
    <div className={style.maintainance_list}>
      <div className={style.list}>
        <div className={style.function}>
          <Search />
          <WhiteButton text={datas.delete} icon="icon-delete" />
        </div>
        <div className={style.item}>
          {Array.isArray(eqdata[create.method]) &&
            eqdata.weld.map((item) => (
              <div
                key={item.id}
                data-value={item}
                onClick={() => handleActive(item)}
                className={item.id === text?.id ? style.active : ""}
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
