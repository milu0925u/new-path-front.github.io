import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, memo } from "react";
import axios from "axios";
import { Unity } from "react-unity-webgl";
import { useDispatch, useSelector } from "react-redux";
import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";
import Loading from "@/component/loading/loading";
import { unityLeaveAlert } from "@/component/alert/alert";
const DrawShow = ({
  unityProvider,
  addEventListener,
  removeEventListener,
  sendMessage,
  requestFullscreen,
  isLoaded,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  const { current } = useSelector((state) => state.pointList);
  // unity state
  const { unity } = useSelector((state) => state.public);
  useEffect(() => {
    dispatch(unityOpenAction());
  }, []);
  useEffect(() => {
    if (!unity) {
      sendMessage("Model", "CloseUnityApp");
    }
  }, [unity, dispatch, sendMessage]);

  const [saveImage, setSaveImage] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const handleDownload = useCallback((saveImage) => {
    setSaveImage(saveImage);
    setIsDownload(true);
  }, []);
  useEffect(() => {
    addEventListener("DownloadPicture", handleDownload);
    return () => {
      removeEventListener("DownloadPicture", handleDownload);
    };
  }, [addEventListener, removeEventListener, handleDownload]);

  const [isAbleID, setAbleID] = useState(false);
  const handleID = useCallback(() => {
    setAbleID(true);
  }, []);
  useEffect(() => {
    addEventListener("AbleGetData", handleID);
    return () => {
      removeEventListener("AbleGetData", handleID);
    };
  }, [addEventListener, removeEventListener, handleID]);

  const [isAbleURL, setAbleURL] = useState(false);
  const handleURL = useCallback(() => {
    setAbleURL(true);
  }, []);
  useEffect(() => {
    addEventListener("AbleGetURL", handleURL);
    return () => {
      removeEventListener("AbleGetURL", handleURL);
    };
  }, [addEventListener, removeEventListener, handleURL]);

  useEffect(() => {
    const customURL = `${domain}/point/`;
    const urlSwitch = async () => {
      sendMessage("Model", "ChangeURL", customURL);
    };

    //儲存時截圖畫面
    const downloadImage = () => {
      const byteCharacters = atob(saveImage);
      const byteArrays = [...byteCharacters].map((char) => char.charCodeAt(0));
      const blob = new Blob([new Uint8Array(byteArrays)], {
        type: "image/png",
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "output";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    const objDownload = async (objPath) => {
      try {
        const response = await axios.get(objPath, {
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);
        sendMessage("Canvas", "LoadPly", url);

        return url;
      } catch (error) {
        console.error("Error downloading PLY file:", error);
      }
    };

    const idSelect = async () => {
      let data;
      if (Object.keys(current).length === 0) {
        const drawData = sessionStorage.getItem("point");
        data = JSON.parse(drawData);
      } else {
        data = current;
      }

      sendMessage("Model", "WhichID", data.id);
      sendMessage("Canvas", "LoadID", data.id);

      await objDownload(data.model_path);
    };

    if (isDownload) {
      downloadImage();
      setIsDownload(false);
    }
    if (isAbleID) {
      idSelect();
      setAbleID(false);
    }
    if (isAbleURL) {
      urlSwitch();
      setAbleURL(false);
    }
  }, [isDownload, isAbleID, isAbleURL]);

  // 前往編輯
  const handleTurnToFix = useCallback(async () => {
    requestFullscreen(false);
    unityLeaveAlert(datas).then((result) => {
      if (result.isConfirmed) {
        dispatch(unityCloseAction());
        sendMessage("Model", "CloseUnityApp");
        router.push("/draw/edit");
      }
    });
  }, [requestFullscreen]);
  useEffect(() => {
    addEventListener("TurnToFix", handleTurnToFix);
    return () => {
      removeEventListener("TurnToFix", handleTurnToFix);
    };
  }, [addEventListener, removeEventListener, handleTurnToFix]);

  //  前往加工
  const handleTurnToRobot = useCallback(async () => {
    requestFullscreen(false);
    unityLeaveAlert(datas).then((result) => {
      if (result.isConfirmed) {
        dispatch(unityCloseAction());
        sendMessage("Model", "CloseUnityApp");
        router.push("/processing/processing-set");
      }
    });
  }, [requestFullscreen]);
  useEffect(() => {
    addEventListener("TurnToRobot", handleTurnToRobot);
    return () => {
      removeEventListener("TurnToRobot", handleTurnToRobot);
    };
  }, [addEventListener, removeEventListener, handleTurnToRobot]);

  // unity language change
  const [isEnglish, setIsEnglish] = useState(1);
  const languageSwitch = async () => {
    sendMessage("Translator", "Translate", isEnglish === 1 ? 0 : 1);
    isEnglish === 1 ? setIsEnglish(0) : setIsEnglish(1);
  };

  return (
    <>
      <Unity id="show" unityProvider={unityProvider} tabIndex={1} />
      {isLoaded ? "" : <Loading />}
    </>
  );
};

export default memo(DrawShow);
