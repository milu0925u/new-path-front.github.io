import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import OrangeButton from "@/component/button/orange-button";
import RWDTitle from "@/component/layout/rwd-title";

import CameraCreateScreen from "@/component/nosharable/model/camera-create-screen";
import CameraCreateFunction from "@/component/nosharable/model/camera-create-function";
import CameraViewScreen from "@/component/nosharable/model/camera-view-screen";
import CameraViewName from "@/component/nosharable/model/camera-view-name";

import ReturnWhiteButton from "@/component/button/return-white-button";
import ReturnBlueButton from "@/component/button/return-blue-button";
import { uploadYmlData } from "@/js/scripts";
import LayoutMain from "@/component/layout/layout-main";
import axios from "axios";
import { CameraOpenAction } from "@/redux/actions/publicAction";
import toast from "react-hot-toast";
export default function ModelCreate() {
  const aidomain = process.env.NEXT_PUBLIC_AI;
  const dispatch = useDispatch();
  const router = useRouter();

  const { datas } = useSelector((state) => state.public);
  const [pageset, setPageSet] = useState("connect");

  // 選擇要掃描的點位
  const [pointData, setPointData] = useState([
    { id: 1, click: true },
    { id: 2, click: true },
    { id: 3, click: true },
    { id: 4, click: true },
    { id: 5, click: true },
    { id: 6, click: true },
    { id: 7, click: true },
    { id: 8, click: true },
  ]);

  // 設定目前分頁
  useEffect(() => {
    setPageSet("connect");
  }, []);

  // 編輯名稱
  const [modelName, setModelName] = useState(null);
  const handleNameSet = (e) => {
    const newName = e?.target.value;
    setModelName(newName);
  };

  // return page
  const handleReturn = () => {
    setPageSet("connect");
  };

  // 開始掃描
  const handleNext = async () => {
    if (pageset == "connect") {
      try {
        const newdata = pointData
          .filter((point) => point.click === true)
          .map((point) => point.id);
        const datas = {
          points: newdata,
          setting: "",
        };
        const { data } = await axios.post(`${aidomain}/scan`, datas, {
          headers: { "Content-Type": "application/json" },
        });
        if (data.status === "success") {
          setPageSet("connect-v");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (pageset !== "connect") {
      router.push("/model/model-list");
    }
  };
  // 重新連接狀態
  const handleConnect = async () => {
    dispatch(CameraOpenAction(null));
    try {
      const { data } = await axios.post(`${aidomain}/connect`);
      setTimeout(() => {
        dispatch(CameraOpenAction(data.status));
      }, 1000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch(CameraOpenAction("fail"));
        toast.error("connect fail");
      }, 1000);
    }
  };

  // 匯入客製檔案
  const handleImportData = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("setting", file);
    if (file) {
      await uploadYmlData(formData);
      e.target.files = null;
    } else {
      toast.error("請選擇檔案");
    }
  };

  // 首次進入連接
  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <>
      {pageset === "connect" ? (
        <LayoutMain>
          <div className="bg-clouds"></div>
          <div className="bg-sky"></div>
          <div className="container">
            <RWDTitle title={datas.scanningobject} icon="icon-scan" bgcolor="1">
              <button className="rwd-display-none-btn"></button>
              <button className="rwd-display-none-btn"></button>
            </RWDTitle>
            <div className="content content-pd content-blue-full">
              <CameraCreateScreen
                pointData={pointData}
                setPointData={setPointData}
                handleBlueBTN={handleReturn}
              />
              <CameraCreateFunction
                handleImportData={handleImportData}
                handleConnect={handleConnect}
              >
                <OrangeButton
                  text={datas.startscanning}
                  icon="icon-scan"
                  handleOrangeBTN={handleNext}
                />
              </CameraCreateFunction>
              <div className="rwd-btn">
                <OrangeButton
                  text={datas.startscanning}
                  icon="icon-scan"
                  handleOrangeBTN={handleNext}
                />
                <button className="rwd-display-none-btn"></button>
              </div>
            </div>
          </div>
        </LayoutMain>
      ) : (
        <LayoutMain>
          <div className="bg-clouds"></div>
          <div className="bg-sky"></div>
          <div className="container">
            <RWDTitle title={datas.viewmodel} icon="icon-view-scan" bgcolor="1">
              <ReturnWhiteButton handleReturnBTN={handleReturn} />
              <button className="rwd-display-none-btn"></button>
            </RWDTitle>
            <div className="content content-pd content-blue-full">
              <CameraViewScreen />
              <CameraViewName
                modelName={modelName}
                handleNameSet={handleNameSet}
              >
                <OrangeButton
                  text={datas.savemodel}
                  icon="icon-save"
                  handleOrangeBTN={handleNext}
                />
              </CameraViewName>

              <div className="rwd-btn">
                <OrangeButton
                  text={datas.savemodel}
                  icon="icon-save"
                  handleOrangeBTN={handleNext}
                />
                <ReturnBlueButton handleReturnBTN={handleReturn} />
              </div>
            </div>
          </div>
        </LayoutMain>
      )}
    </>
  );
}
