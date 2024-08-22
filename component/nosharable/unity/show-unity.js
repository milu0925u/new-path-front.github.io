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
import FullScreen from "@/component/nosharable/unity/full-screen";
import LangSwitch from "@/component/nosharable/unity/language-switch";
import Loading from "@/component/loading/loading";
import { unityLeaveAlert } from "@/component/alert/alert";
export default function DrawShow() {
  const dispatch = useDispatch();
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    sendMessage,
    isLoaded,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "/unity/ShowScene/Build/ShowScene_0801.loader.js",
    dataUrl: "/unity/ShowScene/Build/ShowScene_0801.data",
    frameworkUrl: "/unity/ShowScene/Build/ShowScene_0801.framework.js",
    codeUrl: "/unity/ShowScene/Build/ShowScene_0801.wasm",
  });
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
    const customURL = `${domain}/point`;
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

    const idSelect = async () => {
      let data;
      if (Object.keys(current).length === 0) {
        const drawData = localStorage.getItem("point");
        data = JSON.parse(drawData);
      } else {
        data = current;
      }
      sendMessage("Model", "WhichID", Number(data.id));
      sendMessage("Canvas", "LoadID", Number(data.id));

      await objDownload(data.model_path);
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
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PLY file:", error);
      }
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
    unityLeaveAlert().then((result) => {
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
    unityLeaveAlert().then((result) => {
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

  // full screen
  const FullScreenClick = () => {
    requestFullscreen(true);
  };
  // unity language change
  const [isEnglish, setIsEnglish] = useState(1);
  const languageSwitch = async () => {
    sendMessage("Translator", "Translate", isEnglish === 1 ? 0 : 1);
    isEnglish === 1 ? setIsEnglish(0) : setIsEnglish(1);
  };

  return (
    <>
      <div className={style.unity}>
        <Unity
          id="show"
          unityProvider={unityProvider}
          tabIndex={1}
          className={style.unity_screen}
        />
        <div className={style.loading}>{isLoaded ? "" : <Loading />}</div>
      </div>
      <FullScreen FullScreen={FullScreenClick} />
      <LangSwitch langSwitch={languageSwitch} />
    </>
  );
}
