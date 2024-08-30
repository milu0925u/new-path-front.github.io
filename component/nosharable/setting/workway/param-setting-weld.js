import React from "react";

import { useDispatch, useSelector } from "react-redux";
import style from "@/component/nosharable//setting/setting.module.scss";
import BlueButton from "@/component/button/blue-button";
import OrangeButton from "@/component/button/orange-button";
import Range from "@/component/nosharable/right-content/work/range";
import { wirteParamWorkingAction } from "@/redux/actions/ListAction";
import WorkNameList from "./work-name-list";
export default function ParamSettingWeld({ handleSave }) {
  const dispatch = useDispatch();

  const { create } = useSelector((state) => state.workList);
  const { datas } = useSelector((state) => state.public);

  const handleParamSetting = (e) => {
    dispatch(wirteParamWorkingAction(e.target.name, e.target.value));
  };

  return (
    <div className={style.l_right_setting}>
      <WorkNameList />
      <h3 className="content-title">{datas.processingparameteradjustment}</h3>
      <div className={style.col_right_setting}>
        <div>
          <div className={style.flex_text}>
            <i className="icon-welddeep"></i>
            <h6>{`${datas.weldingprocess}-${datas.verticaldepthadjustment}`}</h6>
            <input
              type="number"
              value={create?.deep}
              pattern="[0-9]*"
              disabled
            />
          </div>
          <Range handleParamSetting={handleParamSetting} />
        </div>
        <div>
          <div className={style.flex_text}>
            <p>{datas.current}</p>
            <input
              type="number"
              name="electric_current"
              pattern="[0-9]*"
              value={create?.electric_current}
              onChange={handleParamSetting}
            />
          </div>
          <div className={style.flex_text}>
            <p>{datas.voltage}</p>
            <input
              type="number"
              name="voltage"
              pattern="[0-9]*"
              value={create?.voltage}
              onChange={handleParamSetting}
            />
          </div>
        </div>
      </div>
      <div className={`${style.setting_btn} nextbtn`}>
        <OrangeButton
          text={datas.save}
          icon="icon-save"
          handleOrangeBTN={handleSave}
        />
      </div>
    </div>
  );
}
