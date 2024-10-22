import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Unity } from "react-unity-webgl";
import { useDispatch, useSelector } from "react-redux";
import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";
import Loading from "@/component/loading/loading";
import { unityLeaveAlert } from "@/component/alert/alert";
export default function DrawFix({
  setPointName,
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
    const url = URL.createObjectURL(blob);
    URL.revokeObjectURL(url);
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
    const customURL = `${domain}/point/`;
    const urlSwitch = async () => {
      sendMessage("Model", "ChangeURL", customURL);
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
      } catch (error) {
        console.error("Error downloading PLY file:", error);
      }
    };
    // 選中的目標讀取
    const idSelect = async () => {
      let data;
      if (Object.keys(current).length === 0) {
        const showData = sessionStorage.getItem("point");
        data = JSON.parse(showData);
      } else {
        data = current;
      }
      setPointName(data.name);
      sendMessage("Model", "WhichID", data.id); // 這是讀取我後台的標點id
      sendMessage("Canvas_Import", "LoadID", data.id);
      // sendMessage("Canvas_Import", "LoadID", data.model_id);
      await objDownload(data.model_path);
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
      <Unity id="edit" unityProvider={unityProvider} tabIndex={1} />
      {isLoaded ? "" : <Loading />}
    </>
  );
}
