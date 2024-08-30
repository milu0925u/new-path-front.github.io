import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import RWDTitle from "@/component/layout/rwd-title";

import { pageNextAction } from "@/redux/actions/publicAction";
import {
  SaveSetWorkingAction,
  SetWorkingDataAction,
  wirteParamWorkingAction,
} from "@/redux/actions/ListAction";
import RightcontentParam from "@/component/nosharable/info/eq-right-info";
import LeftcontentParam from "@/component/nosharable//info/eq-left-info";
import OrangeButton from "@/component/button/orange-button";
import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";

export default function ParamSettingEdit() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { create } = useSelector((state) => state.workList);
  const { datas } = useSelector((state) => state.public);

  // page
  const handleReturn = () => {
    router.back();
  };
  const handleNext = () => {
    dispatch(pageNextAction("run"));
  };

  // save param
  const handleSave = () => {
    dispatch(SaveSetWorkingAction(create)); //儲存設定
    dispatch(SetWorkingDataAction()); //把正在選擇的清除
    router.push("/processing/processing-list", undefined, { shallow: true });
    dispatch(pageNextAction(""));
  };

  return (
    <>
      <div className="container">
        <RWDTitle
          title={datas.processingsetting}
          icon="icon-armparametersettings"
        >
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <LeftcontentParam />
          <RightcontentParam>
            <OrangeButton
              text={datas.dryrun}
              icon="icon-testrun"
              handleOrangeBTN={handleNext}
            />
            <OrangeButton
              text={datas.save}
              icon="icon-save"
              handleOrangeBTN={handleSave}
            />
          </RightcontentParam>
          <div className="rwd-btn">
            <OrangeButton
              text={datas.dryrun}
              icon="icon-testrun"
              handleOrangeBTN={handleNext}
            />
            <OrangeButton
              text={datas.save}
              icon="icon-save"
              handleOrangeBTN={handleSave}
            />
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </>
  );
}
