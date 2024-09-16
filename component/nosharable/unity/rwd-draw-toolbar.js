import React, { useEffect, useState, memo } from "react";
import RwdDrawToolPen from "@/component/nosharable/unity/rwd-draw-tool-pen";
import RwdDrawToolSqure from "@/component/nosharable/unity/rwd-draw-tool-squre";
import { GiRobotGrab } from "react-icons/gi";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { GrReturn } from "react-icons/gr";
const RwdDrawToolbar = ({ sendMessage }) => {
  // RWD開啟tool
  const [rwdSwitchToolBar, setRwdSwitchToolBar] = useState(false);
  // 目前要開啟的工具欄
  const [drawState, setDrawState] = useState("TOOL");

  // 功能列表
  const rwdlist = [
    { id: 1, tag: "list", img: "draw-list", active: 0 },
    { id: 2, tag: "record", img: "draw-record", active: 0 },
    { id: 3, tag: "draw", img: "pen", active: 0 },
    { id: 4, tag: "draw-g", img: "draw-geometry", active: 0 },
    { id: 5, tag: "eraser", img: "eraser", active: 0 },
    { id: 6, tag: "show", img: "show", active: 0 },
    { id: 7, tag: "import", img: "import", active: 0 },
    { id: 8, tag: "setting", img: "setting", active: 0 },
    { id: 9, tag: "backall", img: "backall", active: 0 },
    { id: 10, tag: "back", img: "back", active: 0 },
    { id: 11, tag: "save", img: "save", active: 0 },
    { id: 12, tag: "repeat", img: "repeat", active: 0 },
    { id: 13, tag: "reset", img: "reset", active: 0 },
  ];

  // 功能行為
  const handleBtnActive = (e) => {
    const current = e.currentTarget.dataset.tag;
    if (current === "list") {
    } else if (current === "record") {
      sendMessage("CallBackManager", "OpenRecord");
    } else if (current === "draw") {
      setDrawState("PEN");
    } else if (current === "draw-g") {
      setDrawState("SQURE");
    } else if (current === "eraser") {
      sendMessage("CallBackManager", "DrawFunc", -1);
    } else if (current === "show") {
      sendMessage("CallBackManager", "Exhibit", -1);
    } else if (current === "import") {
      sendMessage("CallBackManager", "ImportModel");
    } else if (current === "setting") {
      sendMessage("CallBackManager", "OpenSetting");
    } else if (current === "backall") {
      sendMessage("CallBackManager", "ReturnDraw", 1);
    } else if (current === "back") {
      sendMessage("CallBackManager", "ReturnDraw", 0);
    } else if (current === "save") {
      sendMessage("CallBackManager", "Save");
    } else if (current === "repeat") {
      sendMessage("CallBackManager", "Redo");
    } else if (current === "reset") {
      sendMessage("CallBackManager", "Reset");
    } else if (current === "tool-range") {
      sendMessage("CallBackManager", "Deep", parseFloat(e.currentTarget.value));
    } else if (current === "tool") {
      sendMessage("CallBackManager", "ShowTool");
    } else if (current === "robot") {
      setDrawState("RANGE");
    }
  };
  // 展開與上一頁功能
  const handleExtendList = () => {
    if (drawState === "TOOL") {
      setRwdSwitchToolBar(!rwdSwitchToolBar);
      return false;
    }
    setDrawState("TOOL");
  };

  return (
    <>
      <button
        className={`rwd_arrow ${
          rwdSwitchToolBar && drawState === "TOOL" ? "rwd_arrow-90" : ""
        }`}
        onClick={handleExtendList}
      >
        {drawState !== "TOOL" ? (
          <GrReturn color="black" />
        ) : (
          <FaAngleDown color="black" />
        )}
      </button>
      <div
        className={` ${
          rwdSwitchToolBar ? "rwd_tool_circle" : "rwd_tool_animation"
        }`}
      >
        {drawState === "TOOL" && (
          <>
            {rwdlist.map((v) => (
              <button
                key={v.id}
                data-tag={v.tag}
                value={v.id}
                onClick={handleBtnActive}
              >
                {v.id < 7 ? (
                  <img src={`/images/unity/${v.img}.svg`} />
                ) : (
                  <i className={`icon-${v.img}`}></i>
                )}
              </button>
            ))}
            <button data-tag="robot" value="14" onClick={handleBtnActive}>
              <GiRobotGrab color="black" size={20} />
            </button>
          </>
        )}
        {drawState === "PEN" && <RwdDrawToolPen sendMessage={sendMessage} />}
        {drawState === "SQURE" && (
          <RwdDrawToolSqure sendMessage={sendMessage} />
        )}
        {drawState === "RANGE" && (
          <div className="rwd-input">
            <input
              data-tag="tool-range"
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={handleBtnActive}
            />
            <div className="switch_container">
              <input
                data-tag="tool"
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={handleBtnActive}
              />
              <label className="switch" htmlFor="checkbox">
                <span className="slider"></span>
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(RwdDrawToolbar);
