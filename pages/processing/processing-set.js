import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import RWDTitle from "@/component/layout/rwd-title";

import {
  SaveSetWorkingAction,
  SaveWorkListAction,
  updateWorkListAction,
} from "@/redux/actions/ListAction";
import LeftcontentParam from "@/component/nosharable//info/eq-left-info";
import OrangeButton from "@/component/button/orange-button";
import LayoutMain from "@/component/layout/layout-main";
import toast from "react-hot-toast";
import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";

import ParamSettingWeld from "@/component/nosharable/setting/workway/param-setting-weld";
import EqLeftAllParam from "@/component/nosharable/info/eq-left-all-param";
import ParamSettingDefault from "@/component/nosharable/setting/workway/param-setting-default";
export default function ProcessingSet() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { create } = useSelector((state) => state.workList);
  const { datas } = useSelector((state) => state.public);

  // 確認此頁的加工方式
  const renderCurrentScreen = () => {
    if (create.method === "weld") {
      return <ParamSettingWeld handleSave={handleSave} />;
    } else {
      return <ParamSettingDefault handleSave={handleSave} />;
    }
    // 需要加更多加工方式頁面
  };

  // page
  const handleReturn = () => {
    router.push("/processing/processing-chose");
  };
  const handleSave = async () => {
    const error = checkHasError();
    if (!error) {
      if (create.tag === "edit") {
        dispatch(updateWorkListAction(create));
      } else {
        dispatch(SaveWorkListAction(create)); //儲存設定
      }
      router.push("/processing/processing-list");
    }
  };

  // 錯誤阻擋
  const checkHasError = () => {
    // if (create?.deep === null || create?.deep === undefined) {
    //   toast.error("請填入深度");
    //   return true;
    // } else if (
    //   create?.electric_current === null ||
    //   create?.electric_current === undefined
    // ) {
    //   toast.error("請填入電流");
    //   return true;
    // } else if (create?.voltage === null || create?.voltage === undefined) {
    //   toast.error("請填入電壓");
    //   return true;
    // } else
    if (create?.name === null || create?.name === undefined) {
      toast.error("請填入加工設定名稱");
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="bg-execute"></div>
      <div className="container">
        <RWDTitle
          title={datas.processingsetting}
          icon="icon-armparametersettings"
        >
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <EqLeftAllParam />
          {renderCurrentScreen()}
          <div className="rwd-btn">
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
