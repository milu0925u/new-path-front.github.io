import React, { useCallback, useState } from "react";
import { useUnityContext } from "react-unity-webgl";
import BlueButton from "@/component/button/blue-button";
import { MdZoomOutMap, MdZoomInMap } from "react-icons/md";
import { useRouter } from "next/router";
import { unityLeaveAlert } from "@/component/alert/alert";
import { unityCloseAction } from "@/redux/actions/publicAction";
import RwdDrawToolbar from "@/component/nosharable/unity/rwd-draw-toolbar";

import LayoutMain from "@/component/layout/layout-main";
import toast from "react-hot-toast";
import EditUnity from "@/component/nosharable/unity/fix-unity";
export default function Edit() {
  const router = useRouter();
  // 開啟/關閉tool列表
  const [openTool, setOpenTool] = useState(true);
  // 選擇到的顏色
  const [chosen, setChosen] = useState("");
  // 主啟動unity程式
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    sendMessage,
    isLoaded,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "/Unity/FixScene/FixScene_0801.loader.js",
    dataUrl: "/Unity/FixScene/FixScene_0801.data",
    frameworkUrl: "/Unity/FixScene/FixScene_0801.framework.js",
    codeUrl: "/Unity/FixScene/FixScene_0801.wasm",
  });

  // 縮放工具欄的按鈕開關
  const [pointlistcount, setpointlistcount] = useState(true);
  // 手臂姿態深度調整
  const handleDeep = (e) => {
    sendMessage("CallBackManager", "Deep", parseFloat(e.target.value));
  };
  // 按下展示鎖住其他按鈕
  const [showING, setShowING] = useState(false);

  /* ------------- 左邊 ------------- */
  const [openDraw, setOpenDraw] = useState(false);
  const [openGeometry, setOpenGeometry] = useState(false);
  const [drawList, setDrawList] = useState([
    { id: 1, name: "標點清單", img: "draw-list", ename: "list" },
    { id: 2, name: "標點紀錄", img: "draw-record", ename: "record" },
    { id: 3, name: "繪製標點", img: "pen", ename: "draw" },
    { id: 4, name: "幾何標點", img: "draw-geometry", ename: "geometry" },
    { id: 5, name: "橡皮擦", img: "eraser", ename: "eraser" },
    { id: 6, name: "展示", img: "show", ename: "show" },
  ]);
  // 開啟列表
  const handleClickDraw = (e) => {
    const text = e.currentTarget.dataset.pen;
    if (text === "show") {
      sendMessage("CallBackManager", "Exhibit", -1);
      setShowING(!showING);
      setChosen(text);
      setOpenDraw(false);
      setOpenGeometry(false);
      return;
      // 觸發展示操作
    }

    if (showING) {
      toast.error("請先取消展示(再次點擊展示)");
      return;
    }
    setChosen(text);
    setOpenDraw(false);
    setOpenGeometry(false);
    if (text === "list") {
      unityLeaveAlert().then((result) => {
        if (result.isConfirmed) {
          dispatch(unityCloseAction());
          router.push("/model/point-list");
        }
      });
    } else if (text === "record") {
      sendMessage("CallBackManager", "OpenRecord");
      setpointlistcount(false);
      setOpenTool(false);
      // 打開標點紀錄
    } else if (text === "draw") {
      setOpenDraw(true);
    } else if (text === "geometry") {
      setOpenGeometry(true);
    } else if (text === "eraser") {
      sendMessage("CallBackManager", "DrawFunc", -1);
      // 觸發橡皮擦操作
    }
  };

  // 繪製 function
  const handleChangeDraw = (e, filename) => {
    const target = e.target?.closest("div");
    if (target) {
      sendMessage("CallBackManager", "DrawFunc", -2);
      const img = target.querySelector("img");
      const span = target.querySelector("span");
      const mode = target.getAttribute("data-mode");
      const param = Number(target.getAttribute("data-param"));

      if (img && span) {
        const imgSrc = img.src;
        const imgFileName = imgSrc.substring(
          imgSrc.lastIndexOf("/") + 1,
          imgSrc.lastIndexOf(".")
        );
        const spanText = span.textContent;
        const updateList = (prevList, ename) =>
          prevList.map((item) =>
            item.ename === ename
              ? { ...item, name: spanText, img: imgFileName }
              : item
          );
        if (filename === "draw") {
          setDrawList((prevList) => updateList(prevList, "draw"));
        } else if (filename === "geometry") {
          setDrawList((prevList) => updateList(prevList, "geometry"));
        }

        setOpenDraw(false);
        setOpenGeometry(false);
      }

      sendMessage("CallBackManager", mode, param);
    }
  };

  // 標點紀錄名稱
  const [pointname, setPointName] = useState();
  //儲存檔案
  const handleSave = async (e) => {
    e.preventDefault();
    await rename();
    if (!pointname) {
      toast.error("未輸入名稱");
      return;
    }
    sendMessage("CallBackManager", "Save");
  };
  // 更改名稱
  const rename = () => {
    return new Promise((resolve) => {
      sendMessage("CallBackManager", "Rename", pointname);
      resolve();
    });
  };
  /* ------------- 右邊 ------------- */

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

  // 開啟設定
  const handleSetting = () => {
    sendMessage("CallBackManager", "OpenSetting");
    setOpenTool(false);
    setpointlistcount(false);
  };
  // 儲存時的通知動畫
  const [isAnimated, setIsAnimated] = useState(false);
  const handleAnimated = useCallback(() => {
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 1300);
  }, []);
  return (
    <LayoutMain>
      <div className="bg-sky"></div>
      <div className="bg-space"></div>
      {/* RWD */}
      <div
        className="l_unity"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* RWD */}
        <div className="rwd_toolbar">
          <RwdDrawToolbar sendMessage={sendMessage} />
        </div>
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
              <img src={`/images/unity/${item.img}.svg`} />
              <span>{item.name}</span>
            </div>
          ))}
          {openDraw && (
            <div
              className="draw_point"
              onClick={(e) => handleChangeDraw(e, "draw")}
            >
              <div data-mode="DrawFunc" data-param={0}>
                <img alt="pen" src="/images/unity/pen.svg" />
                <span>一般標點</span>
              </div>
              <div data-mode="DrawFunc" data-param={1}>
                <img
                  alt="pen-continuous"
                  src="/images/unity/pen-continuous.svg"
                />
                <span>連續標點</span>
              </div>
              <div data-mode="DrawShape" data-param={0}>
                <img alt="pen-line" src="/images/unity/pen-line.svg" />
                <span>直線標點</span>
              </div>
              <div data-mode="DrawShape" data-param={6}>
                <img alt="pen-arc" src="/images/unity/pen-arc.svg" />
                <span>弧線標點</span>
              </div>
              <div data-mode="DrawFunc" data-param={2}>
                <img alt="pen-area" src="/images/unity/pen-area.svg" />
                <span>區域標點</span>
              </div>
              <div data-mode="DrawFunc" data-param={3}>
                <img alt="pen-flat" src="/images/unity/pen-flat.svg" />
                <span>創建平面</span>
              </div>
            </div>
          )}
          {openGeometry && (
            <div
              className="draw_point"
              onClick={(e) => handleChangeDraw(e, "geometry")}
            >
              <div data-mode="DrawShape" data-param={1}>
                <img alt="pen-square" src="/images/unity/pen-square.svg" />
                <span>正方形</span>
              </div>
              <div data-mode="DrawShape" data-param={2}>
                <img alt="pen-rec" src="/images/unity/pen-rec.svg" />
                <span>長方形</span>
              </div>
              <div data-mode="DrawShape" data-param={4}>
                <img alt="pen-circle" src="/images/unity/pen-circle.svg" />
                <span>圓形</span>
              </div>
              <div data-mode="DrawShape" data-param={5}>
                <img alt="pen-oval" src="/images/unity/pen-oval.svg" />
                <span>橢圓形</span>
              </div>
              <div data-mode="DrawShape" data-param={3}>
                <img alt="pen-polygon" src="/images/unity/pen-polygon.svg" />
                <span>多邊形</span>
              </div>
            </div>
          )}
        </div>
        <div className={`naming ${!openTool ? "unity_unvisible" : ""}`}>
          <i className="icon-workname"></i>
          <input
            type="text"
            placeholder="標點紀錄名稱"
            onChange={(e) => setPointName(e.target.value)}
          />
        </div>
        <div className="unity_screen">
          <EditUnity
            handleAnimated={handleAnimated}
            openTool={openTool}
            setOpenTool={setOpenTool}
            setpointlistcount={setpointlistcount}
            unityProvider={unityProvider}
            sendMessage={sendMessage}
            addEventListener={addEventListener}
            removeEventListener={removeEventListener}
            isLoaded={isLoaded}
            requestFullscreen={requestFullscreen}
          />
        </div>
        <div className={`save_btn ${!openTool ? "unity_unvisible" : ""}`}>
          <div
            className="span_none"
            onClick={() => {
              sendMessage("CallBackManager", "ReturnDraw", 0);
            }}
          >
            <i className="icon-backall"></i>
            <span>繪點返回</span>
          </div>
          <div
            onClick={() => {
              sendMessage("CallBackManager", "ReturnDraw", 1);
            }}
          >
            <i className="icon-back"></i>
            <span>步驟返回</span>
          </div>
          <div onClick={handleSave}>
            <i className="icon-save"></i>
            <span>存檔</span>
          </div>
          <div
            onClick={() => {
              sendMessage("CallBackManager", "Redo");
            }}
          >
            <i className="icon-repeat"></i>
            <span>重回</span>
          </div>
          <div
            onClick={() => {
              sendMessage("CallBackManager", "Reset");
            }}
          >
            <i className="icon-reset"></i>
            <span>重置</span>
          </div>
        </div>
        <div
          className={`robot_attitude ${!openTool ? "unity_unvisible" : ""}`}
          onChange={() => sendMessage("CallBackManager", "ShowTool")}
        >
          <label className="switch">
            <input type="checkbox" />
            <div className="slider">
              <span>off</span>
              <span>on</span>
            </div>
          </label>
        </div>
        <div
          className={`extend ${
            pointlistcount ? "unity_visible" : "unity_unvisible"
          }`}
        >
          <div
            onClick={() => {
              setOpenTool(!openTool);
            }}
          >
            {openTool ? <MdZoomOutMap /> : <MdZoomInMap />}
          </div>
        </div>
        <div className={`robot_deep ${!openTool ? "unity_unvisible" : ""}`}>
          <span>Deep : </span>
          <input
            type="range"
            step="0.01"
            min="0"
            max="1"
            onChange={handleDeep}
          />
        </div>

        <button
          className={`beil ${!openTool ? "unity_unvisible" : ""} ${
            isAnimated ? "beil-active" : ""
          }`}
        >
          <img alt=" " src="/images/unity/beil.svg" />
          <div></div>
          <span
            className={
              isAnimated ? "unity_visible" : "unity_unvisible unity_none"
            }
          >
            Deposited
          </span>
        </button>
        <button
          className={`setting ${!openTool ? "unity_unvisible" : ""}`}
          onClick={handleSetting}
        >
          <i className="icon-setting"></i>
        </button>
        <button className={`mouse ${!openTool ? "unity_unvisible" : ""}`}>
          <img src={`/images/unity/mouse${mouse}.svg`} />
        </button>
      </div>
    </LayoutMain>
  );
}
