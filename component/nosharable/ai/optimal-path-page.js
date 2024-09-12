import React, { useEffect, useState } from "react";
import BlueButton from "@/component/button/blue-button";
import OrangeButton from "@/component/button/orange-button";
import style from "./ai-use.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import InputText from "@/component/input/input-text";
export default function OptimalPathPage() {
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  // 讀取標點紀錄
  useEffect(() => {
    const drawData = localStorage.getItem("point");
    if (drawData !== null) {
      let data = JSON.parse(drawData);
      // 標點紀錄，傳給ai
    }
  }, []);
  // 匯入
  const handleImportData = () => {
    router.push("/model/point-list");
  };
  //路徑命名
  const [pathName, setPathName] = useState();

  // 選擇顏色
  const [activeColor, setActiveColor] = useState(true);
  // 精確
  const handlePrecise = () => {
    setActiveColor(true);
  };
  // 平滑
  const handleSmooth = () => {
    setActiveColor(false);
  };
  // 儲存
  const handleNext = () => {};

  return (
    <div className={style.l_optimal}>
      <div className={style.col_content}>
        <div className={style.nav}>
          <BlueButton
            text={datas.importpoint}
            icon="icon-import"
            handleBlueBTN={handleImportData}
          />
          <div className="naming">
            <i className="icon-workname"></i>
            <input
              type="text"
              placeholder="路徑名稱"
              onChange={(e) => setPathName(e.target.value)}
            />
          </div>
        </div>
        <div className={style.content}>content test screen</div>
        <OrangeButton
          text={datas.save}
          icon="icon-save"
          handleOrangeBTN={handleNext}
        />
      </div>
      <div className={style.col_ai_btn}>
        <h1>路徑生成演算法</h1>
        <button
          className={`${style.button} ${
            activeColor ? style.btnactive : style.btnnone
          }`}
          onClick={handlePrecise}
        >
          精確選項
        </button>
        <button
          className={`${style.button} ${
            !activeColor ? style.btnactive : style.btnnone
          }`}
          onClick={handleSmooth}
        >
          平滑選項
        </button>
      </div>
    </div>
  );
}
