import React, { useEffect, useState } from "react";
import style from "../equitment-set.module.scss";
import { useDispatch, useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import Search from "@/component/nosharable/list/model/search";
import WhiteButton from "@/component/button/white-button";
import { SetEqAction } from "@/redux/actions/ListAction";

export default function EqList({ handleNext }) {
  const { datas } = useSelector((state) => state.public);
  const { data, current } = useSelector((state) => state.eq);
  const { method } = useSelector((state) => state.start);

  const [active, setActive] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetEqAction(active));
  }, [active]);

  return (
    <div className={style.maintainance_list}>
      <div className={style.list}>
        <div className={style.function}>
          <Search />
          <WhiteButton text={datas.delete} icon="icon-delete" />
        </div>
        <div className={style.item}>
          {data
            .filter((item) => item.type === method)
            .map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setActive(item);
                }}
                className={item.id === active?.id ? style.active : ""}
              >
                {item.machine_name}
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
