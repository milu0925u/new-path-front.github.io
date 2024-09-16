import { useRouter } from "next/router";
import style from "@/styles/unity.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useDispatch, useSelector } from "react-redux";
import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";
import Loading from "@/component/loading/loading";
import { unityLeaveAlert } from "@/component/alert/alert";
export default function DrawFix({
  handleAnimated,
  openTool,
  setOpenTool,
  setpointlistcount,
  unityProvider,
  sendMessage,
  addEventListener,
  removeEventListener,
  isLoaded,
  requestFullscreen,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  // unity state
  const { unity } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.pointList);

  useEffect(() => {
    dispatch(unityOpenAction());
  }, []);
  useEffect(() => {
    if (!unity) {
      sendMessage("Model", "CloseUnityApp");
    }
  }, [unity, dispatch, sendMessage]);

  // unity載入時第一個讀取項目
  const [isAbleID, setAbleID] = useState(false);
  const handleID = useCallback(() => {
    setAbleID(true);
  }, []);
  // unity載入時第二個讀取項目
  const [isAbleURL, setAbleURL] = useState(false);
  const handleURL = useCallback(() => {
    setAbleURL(true);
  }, []);

  // 下載圖檔
  const [saveImage, setSaveImage] = useState("");
  const downloadImage = useCallback(() => {
    const byteCharacters = atob(saveImage);
    const byteArrays = [...byteCharacters].map((char) => char.charCodeAt(0));
    const blob = new Blob([new Uint8Array(byteArrays)], { type: "image/png" });

    const downloadLink = document.createElement("a");
    const url = URL.createObjectURL(blob);
    // downloadLink.href = URL.createObjectURL(blob);
    URL.revokeObjectURL(url);
    downloadLink.download = name;

    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
  }, []);
  //下載
  const [isDownload, setIsDownload] = useState(false);
  const handleDownload = useCallback((saveImage) => {
    setSaveImage(saveImage);
    setIsDownload(true);
  }, []);
  // unity畫面上的list跳轉
  const handleTurnToHistory = useCallback(async () => {
    requestFullscreen(false);
    unityLeaveAlert().then((result) => {
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
  useEffect(() => {
    addEventListener("AbleGetURL", handleURL);
    addEventListener("AbleGetData", handleID);
    addEventListener("DownloadPicture", handleDownload);
    addEventListener("TurnToHistory", handleTurnToHistory);
    addEventListener("Uploaded", handleCloseUI);
    addEventListener("SettingClosed", handleCloseUI);
    addEventListener("UIListActive", handleCloseUI);
    addEventListener("AlarmAcitve", handleAnimated);
    return () => {
      removeEventListener("AbleGetURL", handleURL);
      removeEventListener("AbleGetData", handleID);
      removeEventListener("DownloadPicture", handleDownload);
      removeEventListener("TurnToHistory", handleTurnToHistory);
      removeEventListener("Uploaded", handleCloseUI);
      removeEventListener("SettingClosed", handleCloseUI);
      removeEventListener("UIListActive", handleCloseUI);
      removeEventListener("AlarmAcitve", handleAnimated);
    };
  }, [
    addEventListener,
    removeEventListener,
    handleURL,
    handleID,
    handleDownload,
    handleTurnToHistory,
  ]);

  // 讀取unity檔案整串
  useEffect(() => {
    const customURL = `${domain}/point`;
    const urlSwitch = async () => {
      sendMessage("Model", "ChangeURL", customURL);
    };
    // 選中的目標讀取
    const idSelect = async () => {
      let data;
      if (Object.keys(current).length === 0) {
        const showData = localStorage.getItem("point");
        data = JSON.parse(showData);
      } else {
        data = current;
      }
      sendMessage("Model", "WhichID", data.id);
      sendMessage("Canvas_Import", "LoadID", data.id);
      await objDownload(data.model_path);
    };
    //前端讀取顯示
    const objDownload = async (objPath) => {
      try {
        const response = await axios.get(objPath, {
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        // console.log(blob); //{ size: 5123945, type: 'application/octet-stream' }
        const url = URL.createObjectURL(blob);
        // console.log(url); // 'blob:http://localhost:7777/d09525fb-3720-489a-990b-e9f1e05b9bcd'
        sendMessage("Canvas_Import", "LoadPly", url);
        URL.revokeObjectURL(url); //釋放內存
      } catch (error) {
        console.error("Error downloading PLY file:", error);
      }
    };
    if (isDownload) {
      downloadImage();
      setIsDownload(false);
    }
    if (isAbleURL) {
      urlSwitch();
      setAbleURL(false);
    }
    if (isAbleID) {
      idSelect();
      setAbleID(false);
    }
  }, [isDownload, isAbleID, isAbleURL]);
  return (
    <>
      <Unity id="show" unityProvider={unityProvider} tabIndex={1} />
      {isLoaded ? "" : <Loading />}
    </>
  );
}
