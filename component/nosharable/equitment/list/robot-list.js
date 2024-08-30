import React, { useState } from "react";
import style from "../equitment-set.module.scss";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import Search from "@/component/nosharable/list/model/search";
import WhiteButton from "@/component/button/white-button";

export default function RobotList({ handleNext }) {
  const { datas } = useSelector((state) => state.public);
  const { data } = useSelector((state) => state.eq);
  const [active, setActive] = useState(1);

  return (
    <div className={style.maintainance_list}>
      <div className={style.list}>
        <div className={style.function}>
          <Search />
          <WhiteButton text={datas.delete} icon="icon-delete" />
        </div>
        <div className={style.item}>
          {data
            .filter((item) => item.type === "robot")
            .map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setActive(item.id);
                }}
                className={item.id === active ? style.active : ""}
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
