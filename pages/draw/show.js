import React, { useEffect, useState } from "react";
import { useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import DrawShow from "@/component/nosharable/unity/show-unity";
import ShowUnityPointArray from "@/component/nosharable/unity/show-unity-point-array";
export default function Show() {
  const { datas } = useSelector((state) => state.public);
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
  // 開啟/關閉tool列表
  const [openTool, setOpenTool] = useState(true);
  // 選擇到的顏色
  const [chosen, setChosen] = useState("");
  // 設定路徑名稱
  const [pointName, setPointName] = useState("");

  // 選擇的point list 存入狀態
  const [point, setPoint] = useState([]);
  const [contiPoint, setcontiPoint] = useState([]);
  const [linePoint, setlinePoint] = useState([]);
  const [squarePoint, setsquarePoint] = useState([]);
  const [polygonPoint, setpolygonPoint] = useState([]);
  const [recPoint, setrecPoint] = useState([]);
  const [circlePoint, setcirclePoint] = useState([]);
  const [ovalPoint, setovalPoint] = useState([]);
  const [arcPoint, setarcPoint] = useState([]);

  // 讀取選擇的標點清單
  const idSelect = async () => {
    let data;
    if (Object.keys(current).length === 0) {
      const drawData = localStorage.getItem("point");
      data = JSON.parse(drawData);
    } else {
      data = current;
    }
    // 抓到標點清單選擇到的物件
    // 轉譯成javascript物件

    // point 單點轉換
    let value1 = JSON.parse(data.point.replace(/\((.*?)\)/g, "[$1]"));
    value1 = value1.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setPoint(value1);
    // contiPoint 連續標點轉換
    let value2 = JSON.parse(data.contiPoint.replace(/\((.*?)\)/g, "[$1]"));
    value2 = value2.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setcontiPoint(value2);
    // linePoint 直線標點轉換
    let value3 = JSON.parse(data.linePoint.replace(/\((.*?)\)/g, "[$1]"));
    value3 = value3.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setlinePoint(value3);
    // squarePoint 正方形標點轉換
    let value4 = JSON.parse(data.squarePoint.replace(/\((.*?)\)/g, "[$1]"));
    value4 = value4.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setsquarePoint(value4);
    // polygonPoint 多邊形標點轉換
    let value5 = JSON.parse(data.polygonPoint.replace(/\((.*?)\)/g, "[$1]"));
    value5 = value5.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setpolygonPoint(value5);
    // recPoint 長方形標點轉換
    let value6 = JSON.parse(data.recPoint.replace(/\((.*?)\)/g, "[$1]"));
    value6 = value6.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setrecPoint(value6);
    // circlePoint 圓形標點轉換
    let value7 = JSON.parse(data.circlePoint.replace(/\((.*?)\)/g, "[$1]"));
    value7 = value7.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setcirclePoint(value7);
    // ovalPoint 橢圓形標點轉換
    let value8 = JSON.parse(data.ovalPoint.replace(/\((.*?)\)/g, "[$1]"));
    value8 = value8.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setovalPoint(value8);
    // arcPoint 弧形標點轉換
    let value9 = JSON.parse(data.arcPoint.replace(/\((.*?)\)/g, "[$1]"));
    value9 = value9.map((item) => {
      if (item) {
        return {
          ...item,
          points: JSON.parse(item.points),
        };
      }
    });
    setarcPoint(value9);
  };
  useEffect(() => {
    idSelect();
  }, []);
  // 移動
  const [array, setArray] = useState({});

  /* ------------- 左邊 ------------- */
  const [openDraw, setOpenDraw] = useState(false);
  const [drawList, setDrawList] = useState([
    { id: 1, name: "路徑清單", img: "icon-path-list", ename: "list" },
    { id: 2, name: "刪除", img: "icon-delete", ename: "delete" },
    { id: 3, name: "展示", img: "icon-show", ename: "show" },
    { id: 4, name: "播放路徑", img: "icon-start", ename: "play" },
    { id: 5, name: "資訊", img: "icon-info", ename: "info" },
    { id: 6, name: "返回", img: "icon-return-back", ename: "back" },
  ]);
  const handleClickDraw = (e) => {
    const text = e.currentTarget.dataset.pen;
    setChosen(text);

    if (text === "list") {
      // 跳轉至路徑清單
    } else if (text === "delete") {
      // 刪除功能
    } else if (text === "show") {
      // 展示功能
    } else if (text === "play") {
      //播放路徑
    } else if (text === "info") {
      // 觸發資訊內容
    } else if (text === "back") {
      // 觸發返回上一頁
    }
  };

  // 滑鼠偵測
  const [mouse, setMouse] = useState("");
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setMouse("-left");
    } else if (e.button === 1) {
      setMouse("-center");
    } else if (e.button === 2) {
      setMouse("-right");
    }
  };
  const handleMouseUp = () => {
    setMouse("");
  };

  // 執行排列的展開
  const [open, setOpen] = useState(false);

  // 下一頁
  const handleNext = () => {
    const data = {
      name: pointName,
      data: point,
    };
  };

  return (
    <>
      <div className="bg-sky"></div>
      <div
        className="l_show_unity"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* 左側列表 */}
        <div className={`draw_tools ${!openTool ? "unity_unvisible" : ""}`}>
          {drawList.map((item, i) => (
            <div
              key={i}
              className={`${
                chosen === item.ename ? "chosen_pen" : ""
              } draw_list`}
              data-pen={item.ename}
              onClick={handleClickDraw}
            >
              <i className={item.img}></i>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        {/* 上方建立名稱 */}
        <div className={`naming ${!openTool ? "unity_unvisible" : ""}`}>
          <i className="icon-workname"></i>
          <input
            type="text"
            placeholder="路徑名稱"
            onChange={(e) => setPointName(e.target.value)}
          />
        </div>
        {/* 顯示unity畫面 */}
        <div className="unity_screen">
          <DrawShow
            unityProvider={unityProvider}
            addEventListener={addEventListener}
            removeEventListener={removeEventListener}
            sendMessage={sendMessage}
            requestFullscreen={requestFullscreen}
          />
        </div>
        {/* 儲存按鈕 */}
        <div
          className={`save_btn tool_save_btn ${
            !openTool ? "unity_unvisible" : ""
          }`}
        >
          <OrangeButton
            text={datas.save}
            icon="icon-save"
            handleOrangeBTN={handleNext}
          />
        </div>
        {/* 執行順序 */}
        <div
          className={`tool_execution ${!openTool ? "unity_unvisible" : ""} ${
            !open ? "open_execution_expand" : ""
          }`}
        >
          <h1>執行順序</h1>
          <div className="show-array">
            <ShowUnityPointArray img="icon-pen" point={point} />
            <ShowUnityPointArray img="icon-pen-continuous" point={contiPoint} />
            <ShowUnityPointArray img="icon-pen-line" point={linePoint} />
            <ShowUnityPointArray img="icon-pen-square" point={squarePoint} />
            <ShowUnityPointArray img="icon-pen-polygon" point={polygonPoint} />
            <ShowUnityPointArray img="icon-pen-rec" point={recPoint} />
            <ShowUnityPointArray img="icon-pen-circle" point={circlePoint} />
            <ShowUnityPointArray img="icon-pen-oval" point={ovalPoint} />
            <ShowUnityPointArray img="icon-pen-arc" point={arcPoint} />
          </div>
          <button
            className="execute-bar"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <i className={` icon-bar ${open ? "scaleXlIE" : "scaleXlDE"}`}>
              <i className="path1"></i>
              <i className="path2"></i>
              <i className="path3"></i>
            </i>
          </button>
        </div>
        {/* 滑鼠顯示 */}
        <button className={`mouse ${!openTool ? "unity_unvisible" : ""}`}>
          <img alt="mouse" src={`/images/unity/mouse${mouse}.svg`} />
        </button>
      </div>
    </>
  );
}
