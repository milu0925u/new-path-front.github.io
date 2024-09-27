import React, { useEffect, useState } from "react";
import BlueButton from "@/component/button/blue-button";
import OrangeButton from "@/component/button/orange-button";
import style from "./ai-use.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import InputText from "@/component/input/input-text";
import axios from "axios";
export default function OptimalPathPage() {
  const aidomain = process.env.NEXT_PUBLIC_AI;
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const [imageUrl, setImageUrl] = useState();
  const [formData, setFormData] = useState();

  // 讀取標點紀錄
  useEffect(() => {
    const drawData = sessionStorage.getItem("point");
    if (drawData !== null) {
      let data = JSON.parse(drawData);
      setFormData(data);
      // 標點紀錄，傳給ai
      sendPrecise(data);
    }
  }, []);
  const sendSmooth = async (data) => {
    try {
      const { datas } = await axios.post(`${aidomain}/smooth_path`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(datas);
      if (datas.status === "success") {
        setImageUrl(datas.image_url);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const sendPrecise = async (data) => {
    try {
      const { datas } = await axios.post(`${aidomain}/precise_path`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(datas);
      if (datas.status === "success") {
        setImageUrl(datas.image_url);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
    sendPrecise(formData);
  };
  // 平滑
  const handleSmooth = () => {
    setActiveColor(false);
    sendSmooth(formData);
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
        <div className={style.content}>
          <img src={`${domain}${imageUrl}`} />
        </div>
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
