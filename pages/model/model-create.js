import React, { useRef, useState, useEffect } from "react";
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
import axios from "axios";
import { CameraOpenAction } from "@/redux/actions/publicAction";
import toast from "react-hot-toast";
import { saveModelAction } from "@/redux/actions/ListAction";
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
  // 相機設定檔儲存
  const [settingname, setsettingname] = useState("origin.yml");
  // 重新連接狀態
  const handleConnect = async () => {
    dispatch(CameraOpenAction(null));
    try {
      const { data } = await axios.post(`${aidomain}/connect`);
      setTimeout(() => {
        dispatch(CameraOpenAction(data.status));
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        dispatch(CameraOpenAction("fail"));
        toast.error("connect fail");
      }, 100);
    }
  };
  // 匯入客製檔案
  const handleImportData = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("setting", file);
    if (file) {
      setsettingname(file.name);
    } else {
      toast.error("請選擇檔案");
      return;
    }
    e.target.value = "";
  };
  // 首次進入連接
  useEffect(() => {
    handleConnect();
  }, []);

  /* --------- 第二頁的使用 ------- */
  // 編輯名稱
  const [modelName, setModelName] = useState("");
  const handleNameSet = (e) => {
    const newName = e.target.value;
    setModelName(newName);
  };
  // 掃瞄範圍設定
  const [barValue, setBarValue] = useState(0);
  const handleBarValue = (e) => {
    const value = parseInt(e.target.value);

    if (value >= 0 && value <= 2000) {
      setBarValue(value);
    } else if (value < 0) {
      setBarValue(0);
    } else if (value > 2000) {
      setBarValue(2000);
    } else {
      setBarValue(0);
    }
  };
  // return page
  const handleReturn = () => {
    setPageSet("connect");
  };
  // 設定範圍的確認按鈕
  const handleScope = async () => {
    const newdata = pointData
      .filter((point) => point.click === true)
      .map((point) => point.id);
    try {
      const datas = {
        points: newdata,
        distance: barValue,
      };
      const { data } = await axios.post(`${aidomain}/crop`, datas, {
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === "success") {
        setimgurl(data.image_url);
        toast.success("去背景成功!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 儲存暫時顯示的圖片樣子
  const [imgurl, setimgurl] = useState("");
  // 開始掃描 / 下一頁
  const handleNext = async () => {
    const newdata = pointData
      .filter((point) => point.click === true)
      .map((point) => point.id);

    if (pageset == "connect") {
      try {
        const datas = {
          points: newdata,
          setting: `/ai-use/setting/${settingname}`,
        };
        const { data } = await axios.post(`${aidomain}/scan`, datas, {
          headers: { "Content-Type": "application/json" },
        });
        if (data.status === "success") {
          setimgurl(data.image_url);
          setPageSet("connect-v");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (pageset !== "connect") {
      if (!modelName) {
        toast.error("請輸入名稱");
        return;
      }

      const datas = {
        points: newdata,
        name: modelName,
      };
      try {
        const { data } = await axios.post(`${aidomain}/save`, datas, {
          headers: { "Content-Type": "application/json" },
        });
        if (data.status === "success") {
          //儲存進資料表
          const modelsavedata = {
            name: modelName,
            image_path: `${data.image_url}`,
            model_path: `${data.pcd_url}`,
          };
          dispatch(saveModelAction(modelsavedata));
          router.push("/model/model-list");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {pageset === "connect" ? (
        <>
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
                setsettingname={setsettingname}
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
        </>
      ) : (
        <>
          <div className="bg-clouds"></div>
          <div className="bg-sky"></div>
          <div className="container">
            <RWDTitle title={datas.viewmodel} icon="icon-view-scan" bgcolor="1">
              <ReturnWhiteButton handleReturnBTN={handleReturn} />
              <button className="rwd-display-none-btn"></button>
            </RWDTitle>
            <div className="content content-pd content-blue-full">
              <CameraViewScreen imgurl={imgurl} />
              <CameraViewName
                handleScope={handleScope}
                barValue={barValue}
                handleBarValue={handleBarValue}
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
        </>
      )}
    </>
  );
}
