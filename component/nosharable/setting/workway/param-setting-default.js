import React from "react";

import { useSelector } from "react-redux";
import style from "@/component/nosharable//setting/setting.module.scss";
import OrangeButton from "@/component/button/orange-button";
import Range from "@/component/nosharable/right-content/work/range";
import WorkNameList from "./work-name-list";
export default function ParamSettingDefault({ handleSave }) {
  const { datas } = useSelector((state) => state.public);
  return (
    <div className={style.l_right_setting}>
      <WorkNameList />
      <h3 className="content-title">{datas.processingparameteradjustment}</h3>
      <div className={style.col_right_setting}>
        <div>
          <div className={style.flex_text}>
            <i className="icon-welddeep"></i>
            <h6>{`${datas.weldingprocess}-${datas.verticaldepthadjustment}`}</h6>
          </div>
          <input type="number" pattern="[0-9]*" disabled />
          <Range />
        </div>
        <div>
          <div className={style.flex_text}>
            <p>{datas.current}</p>
            <input type="number" name="electric_current" pattern="[0-9]*" />
          </div>
          <div className={style.flex_text}>
            <p>{datas.voltage}</p>
            <input type="number" name="voltage" pattern="[0-9]*" />
          </div>
        </div>
      </div>
      <div className="next-btn">
        <OrangeButton
          text={datas.save}
          icon="icon-save"
          handleOrangeBTN={handleSave}
        />
      </div>
    </div>
  );
}
