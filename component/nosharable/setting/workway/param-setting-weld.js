import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import style from "@/component/nosharable//setting/setting.module.scss";
import OrangeButton from "@/component/button/orange-button";
import Range from "@/component/nosharable/right-content/work/range";
import WorkNameList from "./work-name-list";
import { createWorkListAction } from "@/redux/actions/ListAction";
import toast from "react-hot-toast";
export default function ParamSettingWeld({ handleSave }) {
  const dispatch = useDispatch();

  const { create } = useSelector((state) => state.workList);
  const { datas } = useSelector((state) => state.public);

  // 儲存參數
  const handleParamSetting = (e) => {
    const value = Number(e.target.value);
    const name = e.target.name;
    dispatch(createWorkListAction({ [name]: value }));
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
              value={create.deep ? create?.deep : 0}
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
              value={create.electric_current ? create.electric_current : 0}
              onChange={handleParamSetting}
            />
          </div>
          <div className={style.flex_text}>
            <p>{datas.voltage}</p>
            <input
              type="number"
              name="voltage"
              pattern="[0-9]*"
              value={create.voltage ? create.voltage : 0}
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
