import React, { useEffect } from "react";
import style from "../list.module.scss";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
export default function ChooseWorkWeld({ handleOrangeBTN }) {
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.workList);

  return (
    <div className={style.chosen_list}>
      <div className={style.chosen_list_data}>
        {current ? (
          <>
            <div className={style.chosen_list_title}>
              <img alt="weld" src="/images/work/weld.svg" />
              <span>{datas.weldingprocess}</span>
            </div>
            <h6>{datas.processingconfigurationname}</h6>
            <div className={style.chosen_list_name}>{current?.name}</div>
            <div className={style.chosen_list_content}>
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
            <h6>{datas.processingequipment}</h6>
            <div className={style.chosen_list_content}>
              <div>
                {datas.weldingequipment}：{current?.eq_name}
              </div>
              <div>
                {datas.roboticarm}：{current?.robot_name}
              </div>
              <div>
                {datas.visioncamera}：{current?.camera_name}
              </div>
              <div>
                {datas.safetyequipment}：{current?.security_name}
              </div>
              <div>
                {datas.airsupplyequipment}：{current?.gas_name}
              </div>
              <div>
                {datas.networkequipment}：{current?.network_name}
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
