import React from "react";
import style from "../equitment-set.module.scss";
import { useSelector } from "react-redux";
import Connect from "@/component/connect";

export default function RobotMaintainance({ text }) {
  const { datas } = useSelector((state) => state.public);

  return (
    <div className={style.maintainance}>
      <div className="content-title">{datas.roboticarm}</div>
      <div>
        <span>{datas.roboticarm}：</span>
        <input type="text" value={text && text.name} disabled />
      </div>
      <div>{datas.maintenanceremindersetting}：</div>
      <div>
        <span>{datas.maintenancefrequency}　</span>
        <input
          type="number"
          value={text && text.maintenance_frequency}
          disabled
        />
        {datas.day}
      </div>
      <div>
        <span>{datas.nextmaintenancedate}：</span>
        <span>{text && text.maintenance_date}</span>
      </div>
      <div className={style.connect}>
        <div>{datas.connectionstatus}：</div>
        <Connect icon="icon-robot" />
      </div>
    </div>
  );
}
