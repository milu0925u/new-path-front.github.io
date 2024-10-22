import React, { useEffect, useState } from "react";
import { useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import DrawShow from "@/component/nosharable/unity/show-unity";
import ShowUnityPointArray from "@/component/nosharable/unity/show-unity-point-array";
import {
  CurrentCleanAction,
  SavePointArrayAction,
} from "@/redux/actions/ListAction";
import { useDispatch } from "react-redux";
import { unityLeaveAlert } from "@/component/alert/alert";
import { useRouter } from "next/router";
import { unityCloseAction } from "@/redux/actions/publicAction";
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
    loaderUrl: "/unity/ShowScene/ShowScene_0801.loader.js",
    dataUrl: "/unity/ShowScene/ShowScene_0801.data",
    frameworkUrl: "/unity/ShowScene/ShowScene_0801.framework.js",
    codeUrl: "/unity/ShowScene/ShowScene_0801.wasm",
    // loaderUrl: "/unity/ShowScene/Build/ShowScene_0801.loader.js",
    // dataUrl: "/unity/ShowScene//Build/ShowScene_0801.data",
    // frameworkUrl: "/unity/ShowScene//Build/ShowScene_0801.framework.js",
    // codeUrl: "/unity/ShowScene//Build/ShowScene_0801.wasm",
  });
  const { current } = useSelector((state) => state.pointList);

  // 開啟/關閉tool列表 (unity彈跳時關閉功能列)
  const [openTool, setOpenTool] = useState(true);
  // 選擇到的顏色
  const [chosen, setChosen] = useState("");
  // 設定標點名稱
  const [pointName, setPointName] = useState("");
  // 可移動的物件
  const [array, setArray] = useState({});
  // 排序(要儲存時，正確的排序)
  const [orderI, setorderI] = useState();
  // 在標點清單的唯一編號
  const [pointid, setpointid] = useState(0);
  // 讀取 需要執行的順序
  const idSelect = async () => {
    let data;

    if (Object.keys(current).length === 0) {
      const drawData = sessionStorage.getItem("point");
      data = JSON.parse(drawData);
    } else {
      data = current;
    }
    // 設定名稱
    setpointid(data.id);
    setPointName(data.name);
    // 抓到標點清單選擇到的物件
    // 轉譯成javascript物件

    // 各種標點轉換成javascript物件
    const key = [
      { id: 0, name: "point" },
      { id: 1, name: "contiPoint" },
      { id: 2, name: "linePoint" },
      { id: 3, name: "squarePoint" },
      { id: 4, name: "polygonPoint" },
      { id: 5, name: "recPoint" },
      { id: 6, name: "circlePoint" },
      { id: 7, name: "ovalPoint" },
      { id: 8, name: "arcPoint" },
    ];

    // 原排序
    const orderX = JSON.parse(data.order);
    const order = orderX.map((v) => v.index);
    setorderI(order);

    // 依照排序置放
    orderX.map((v) => {
      key.map((a) => {
        if (v.index === a.id) {
          let newData = convertPoints(data[a.name]);
          setArray((prev) => ({ ...prev, [a.name]: newData }));
        }
      });
    });
  };
  useEffect(() => {
    idSelect();
  }, []);
  // 通用組件 - 轉換
  const convertPoints = (pointData) => {
    return JSON.parse(pointData.replace(/\((.*?)\)/g, "[$1]")).map((item) => ({
      ...item,
      points: JSON.parse(item.points),
    }));
  };

  // 左邊導覽列
  const drawList = [
    { id: 1, name: "標點清單", img: "icon-path-list", ename: "list" },
    // { id: 2, name: "刪除", img: "icon-delete", ename: "delete" },
    { id: 3, name: "展示", img: "icon-show", ename: "show" },
    // { id: 4, name: "播放路徑", img: "icon-start", ename: "play" },
    { id: 5, name: "資訊", img: "icon-info", ename: "info" },
    { id: 6, name: "返回", img: "icon-return-back", ename: "back" },
  ];
  const router = useRouter();
  const handleClickDraw = (e) => {
    const text = e.currentTarget.dataset.pen;
    setChosen(text);

    if (text === "list") {
      // 跳轉至路徑清單
      unityLeaveAlert(datas).then((result) => {
        if (result.isConfirmed) {
          dispatch(unityCloseAction());
          dispatch(CurrentCleanAction());
          router.push("/model/point-list");
        }
      });
    } else if (text === "delete") {
      // 刪除功能
    } else if (text === "show") {
      // 展示功能
      sendMessage("CallBackManager", "SExhibit", "Rotating Model");
    } else if (text === "play") {
      //播放路徑
    } else if (text === "info") {
      // 觸發資訊內容
      sendMessage("CallBackManager", "ShowInfo", "Show info");
    } else if (text === "back") {
      // 觸發返回上一頁
      unityLeaveAlert(datas).then((result) => {
        if (result.isConfirmed) {
          dispatch(unityCloseAction());
          dispatch(CurrentCleanAction());
          router.back();
        }
      });
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
  const dispatch = useDispatch();
  const handleNext = () => {
    const data = {
      id: pointid,
      name: pointName,
      index: orderI,
    };
    dispatch(SavePointArrayAction(data));
    // sendMessage(
    //   "CallBackManager",
    //   "UploadOrder",
    //   "Update the new order to database"
    // );
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
            placeholder="標點名稱"
            defaultValue={pointName}
            onChange={(e) => setPointName(e.target.value)}
          />
        </div>
        {/* 顯示unity畫面 */}
        <div className="unity_screen">
          <DrawShow
            isLoaded={isLoaded}
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
            <ShowUnityPointArray
              array={array}
              orderI={orderI}
              setorderI={setorderI}
            />
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
