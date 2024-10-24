import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import { Unity } from "react-unity-webgl";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";

import axios from "axios";
import Loading from "@/component/loading/loading";
import { unityLeaveAlert, unityUploadFinish } from "@/component/alert/alert";
import { CurrentCleanAction } from "@/redux/actions/ListAction";
const DrawUnity = ({
  handleAnimated,
  setOpenTool,
  setpointlistcount,
  sendMessage,
  unityProvider,
  isLoaded,
  addEventListener,
  removeEventListener,
  requestFullscreen,
}) => {
  console.log("看一下渲染次數 SSR");

  const dispatch = useDispatch();
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  // unity state
  const { unity, datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.modelList);

  // 首次進入時開啟unity
  useEffect(() => {
    dispatch(unityOpenAction());
  }, []);
  // 關閉unity時要關閉webgl系統
  useEffect(() => {
    if (!unity) {
      sendMessage("Model", "CloseUnityApp");
      console.log("我的離開CloseUnityApp");
    }
  }, [unity, dispatch, sendMessage]);

  // 目前unity使用版本為 Unity 引擎的版本是 2021.3.25f1
  // Initialize engine version: 2021.3.25f1 (68ef2c4f8861)

  // unity載入 先讀取ID step1
  const [isAbleID, setAbleID] = useState(false);
  const handleID = useCallback(() => {
    setAbleID(true);
  }, []);

  // unity載入 在讀取URL step2
  const [isAbleURL, setAbleURL] = useState(false);
  const handleURL = useCallback(() => {
    setAbleURL(true);
  }, []);

  // unity載入時 已經跑完相關的useEffect後最後進入 unity夾帶檔案傳至前端顯示
  const handleByteConvert = useCallback((byteArray) => {
    const blob = new Blob([byteArray], { type: "model/ply" });

    const url = URL.createObjectURL(blob);
    URL.revokeObjectURL(url);
    const formData = new FormData();
    formData.append("blob", blob);
  }, []);

  // 有在內部上傳檔案時觸發
  const [isUpload, setIsUpload] = useState(false);
  const handleNews = useCallback(() => {
    setIsUpload(true);
  }, []);

  // unity畫面上的list跳轉
  const handleTurnToHistory = useCallback(() => {
    requestFullscreen(false);
    unityLeaveAlert(datas).then((result) => {
      if (result.isConfirmed) {
        dispatch(unityCloseAction());
        sendMessage("Model", "CloseUnityApp");
        router.push("/model/point-list");
      }
    });
  }, [requestFullscreen]);

  // 收起介面 打開UNITY畫面
  const handleCloseUI = () => {
    setpointlistcount(true);
    setOpenTool(true);
  };
  // 上傳以後跳通知
  const handleCloseAndAlert = () => {
    setpointlistcount(true);
    setOpenTool(true);
    unityUploadFinish(datas);
    dispatch(CurrentCleanAction());
  };

  // 讀取unity檔案整串
  useEffect(() => {
    addEventListener("AbleGetURL", handleURL);
    addEventListener("AbleGetData", handleID);
    addEventListener("IsUploadData", handleNews);
    addEventListener("DownLoadPLY", handleByteConvert);
    addEventListener("TurnToHistory", handleTurnToHistory);
    addEventListener("Uploaded", handleCloseAndAlert);
    addEventListener("SettingClosed", handleCloseUI);
    addEventListener("UIListActive", handleCloseUI);
    addEventListener("AlarmAcitve", handleAnimated);
    return () => {
      removeEventListener("AbleGetURL", handleURL);
      removeEventListener("AbleGetData", handleID);
      removeEventListener("DownLoadPLY", handleByteConvert);
      removeEventListener("TurnToHistory", handleTurnToHistory);
      removeEventListener("Uploaded", handleCloseAndAlert);
      removeEventListener("SettingClosed", handleCloseUI);
      removeEventListener("UIListActive", handleCloseUI);
      removeEventListener("AlarmAcitve", handleAnimated);
    };
  }, [
    addEventListener,
    removeEventListener,
    handleURL,
    handleID,
    handleByteConvert,
    handleNews,
    handleTurnToHistory,
    handleCloseUI,
    handleAnimated,
  ]);

  useEffect(() => {
    // 連線後端
    const customURL = `${domain}/point/save`;

    const urlSwitch = async () => {
      // 一開始就傳給unity我的儲存資料url
      await sendMessage("Model", "ChangeURL", customURL);
    };
    const idSelect = async () => {
      let data;
      if (
        Object.keys(current).length === 0 &&
        !sessionStorage.getItem("model")
      ) {
        data = { id: 0, model_path: null };
      } else if (
        Object.keys(current).length === 0 &&
        sessionStorage.getItem("model")
      ) {
        const drawData = sessionStorage.getItem("model");
        data = JSON.parse(drawData);
      } else if (Object.keys(current).length > 0) {
        data = current;
      }

      sendMessage("Canvas_Import", "LoadID", Number(data.id));
      sendMessage("Canvas_Import", "LoadPly", data.model_path);
      await objDownload(data.model_path);
    };
    const objDownload = async (objPath) => {
      try {
        const response = await axios.get(objPath, {
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        }); //把buffer轉換成瀏覽器可讀的物件 Blob { size: 34992207, type: 'application/octet-stream' }

        const url = URL.createObjectURL(blob); //'blob:http://localhost:5678/a11830bb-a9d5-4cfb-b2dc-f9d72b080dc9'
        URL.revokeObjectURL(url); //釋放內存
        sendMessage("Canvas", "LoadPly", url);
      } catch (error) {
        console.error("Error downloading PLY file:", error);
      }
    };

    if (isAbleURL) {
      urlSwitch();
      setAbleURL(false);
    }
    if (isAbleID) {
      idSelect();
      setAbleID(false);
    }
  }, [isAbleURL, isAbleID]);

  return (
    <>
      <Unity id="draw" unityProvider={unityProvider} tabIndex={1} />
      {isLoaded ? "" : <Loading />}
    </>
  );
};

export default memo(DrawUnity);
