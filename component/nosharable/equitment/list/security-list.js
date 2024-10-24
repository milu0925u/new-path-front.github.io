import React, { useState, useEffect } from "react";
import style from "../equitment-set.module.scss";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import Search from "@/component/nosharable/list/model/search";
import WhiteButton from "@/component/button/white-button";

export default function SecurityList({ handleNext, text, handleActive }) {
  const { datas } = useSelector((state) => state.public);
  const { eqdata } = useSelector((state) => state.workList);
  // 所有資料 / 顯示資料
  const [alldatasList, setAllDatasList] = useState([]);
  const [datasList, setDatasList] = useState([]);
  useEffect(() => {
    if (eqdata) {
      setDatasList(eqdata.security);
      setAllDatasList(eqdata.security);
    }
  }, [eqdata]);

  return (
    <div className={style.maintainance_list}>
      <div className={style.list}>
        <div className={style.function}>
          <Search alldatasList={alldatasList} setDatasList={setDatasList} />

          <WhiteButton text={datas.delete} icon="icon-delete" />
        </div>
        <div className={style.item}>
          {Array.isArray(eqdata.security) &&
            datasList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleActive(item)}
                className={item.id === text?.id ? style.active : ""}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
      <div className="next-btn">
        <OrangeButton
          text={datas.confirm}
          icon="icon-ok"
          handleOrangeBTN={handleNext}
        />
      </div>
    </div>
  );
}
