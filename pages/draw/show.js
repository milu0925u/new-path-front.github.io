import React, { useState } from "react";
import { useUnityContext } from "react-unity-webgl";
import DrawFix from "@/component/nosharable/unity/fix-unity";
export default function Show() {
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

  // 開啟/關閉tool列表
  const [openTool, setOpenTool] = useState(true);
  // 選擇到的顏色
  const [chosen, setChosen] = useState("");

  /* ------------- 左邊 ------------- */
  const [openDraw, setOpenDraw] = useState(false);
  const [openGeometry, setOpenGeometry] = useState(false);
  const [drawList, setDrawList] = useState([
    { id: 1, name: "路徑清單", img: "path-list", ename: "list" },
    { id: 2, name: "修改路徑", img: "edit", ename: "modify" },
    { id: 3, name: "展示", img: "show", ename: "show" },
    { id: 4, name: "截圖", img: "screenshot", ename: "screenshot" },
    { id: 5, name: "資訊", img: "info", ename: "info" },
    { id: 6, name: "返回", img: "back", ename: "back" },
  ]);
  const handleClickDraw = (e) => {
    const text = e.currentTarget.dataset.pen;
    setChosen(text);
    setOpenDraw(false);
    setOpenGeometry(false);

    if (text === "list") {
      // 跳轉至標點清單
    } else if (text === "record") {
      // 打開標點紀錄
    } else if (text === "draw") {
      setOpenDraw(true);
    } else if (text === "geometry") {
      setOpenGeometry(true);
    } else if (text === "eraser") {
      // 觸發橡皮擦操作
    } else if (text === "show") {
      // 觸發展示操作
    }
  };

  const [sortList, setSortList] = useState([
    { id: 1, point: "(123,51,22)" },
    { id: 2, point: "(123,51,22)" },
    { id: 3, point: "(123,51,22)" },
  ]);
  const [bar, setBar] = useState(false);

  return (
    <>
      <div className="bg-sky"></div>
      <div className="bg-space"></div>
      <div className="l_unity">
        <div className="col_unity">
          <DrawFix
            unityProvider={unityProvider}
            addEventListener={addEventListener}
            removeEventListener={removeEventListener}
            sendMessage={sendMessage}
            requestFullscreen={requestFullscreen}
          />
        </div>
      </div>
    </>
  );
}
