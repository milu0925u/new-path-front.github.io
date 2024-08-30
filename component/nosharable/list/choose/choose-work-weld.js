import React from "react";
import style from "../list.module.scss";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
export default function ChooseWorkWeld({ handleOrangeBTN }) {
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.workList);

  console.log(current);

  return (
    <div className={style.chosen_list}>
      <div>
        {current ? (
          <>
            <div className={style.chosen_weld_img}>
              <img alt="weld" src="/images/work/weld.svg" />
              <span>{datas.weldingprocess}</span>
            </div>
            <div>
              <h6>{datas.processingconfigurationname}</h6>
              <span>{current?.name}</span>
            </div>
            <div>
              <div>
                {`${datas.weldingprocessverticaldepthadjustment}`}：
                {current?.deep}
              </div>
              <div>
                {datas.voltage}：{current?.electric_current}V
              </div>
              <div>
                {datas.current}：{current?.voltage}A
              </div>
            </div>
            <div>
              <div>
                {`${datas.roboticarmspeedsetting}`}：{current?.speed}
              </div>
            </div>
          </>
        ) : (
          <div className={style.empty_chosen}>{datas.emptychosen}</div>
        )}
      </div>

      <div className="nextbtn">
        <OrangeButton
          text={datas.executeprocessing}
          icon="icon-execute-work"
          handleOrangeBTN={handleOrangeBTN}
        />
      </div>
    </div>
  );
}
