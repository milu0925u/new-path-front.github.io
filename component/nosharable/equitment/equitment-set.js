import React, { useEffect, useState, useRef } from "react";
import style from "./equitment-set.module.scss";
import BlueButton from "@/component/button/blue-button";
import { useDispatch, useSelector } from "react-redux";
import EqMaintainance from "./maintainance/eq-maintainance";
import EqList from "./list/eq-list";
import RobotMaintainance from "./maintainance/robot-maintainance";
import RobotList from "./list/robot-list";
import CameraMaintainance from "./maintainance/camera-maintainance";
import CameraList from "./list/camera-list";
import SecurityMaintainance from "./maintainance/security-maintainance";
import SecurityList from "./list/security-list";
import GasMaintainance from "./maintainance/gas-maintainance";
import GasList from "./list/gas-list";
import InternetList from "./list/internet-list";
import InternetMaintainance from "./maintainance/internet-maintainance";
import ConsumablesMaintainance from "./maintainance/consumables-maintainance";
import ConsumablesList from "./list/consumables-list";
import { createWorkListAction } from "@/redux/actions/ListAction";

export default function EquitmentSet() {
  const dispatch = useDispatch();
  const { datas } = useSelector((state) => state.public);

  // 選單得動態生成
  const [equitment, setEquitment] = useState([]);

  useEffect(() => {
    setEquitment([
      {
        id: 1,
        name: datas.processingequipment,
      },
      {
        id: 2,
        name: datas.roboticarm,
      },
      {
        id: 3,
        name: datas.visioncamera,
      },
      {
        id: 4,
        name: datas.consumables,
      },
      {
        id: 5,
        name: datas.safetyequipment,
      },
      {
        id: 6,
        name: datas.airsupplyequipment,
      },
      {
        id: 7,
        name: datas.networkequipment,
      },
    ]);
  }, []);
  // 設備設定選項的顏色
  const [active, setActive] = useState(1);
  const handleActiveColor = (e) => {
    const value = Number(e.currentTarget.parentElement.getAttribute("value"));
    setActive(value);
    setText(null);
  };
  // 保養日期
  const [text, setText] = useState("");
  const [csbtext, setcsbText] = useState([]);
  const handleActive = (data) => {
    setText(data);
  };
  const handleCSBActive = (data) => {
    setcsbText((prev) => {
      if (prev?.some((item) => item.id === data.id)) {
        return prev.filter((item) => item.id !== data.id);
      } else {
        return [...prev, data];
      }
    });
  };

  const renderScreen1 = () => {
    if (active === 1) {
      return <EqMaintainance text={text} />;
    } else if (active === 2) {
      return <RobotMaintainance text={text} />;
    } else if (active === 3) {
      return <CameraMaintainance text={text} />;
    } else if (active === 4) {
      return <ConsumablesMaintainance text={csbtext} />;
    } else if (active === 5) {
      return <SecurityMaintainance text={text} />;
    } else if (active === 6) {
      return <GasMaintainance text={text} />;
    } else if (active === 7) {
      return <InternetMaintainance text={text} />;
    }
  };
  // 清單列表
  const renderScreen2 = () => {
    if (active === 1) {
      return (
        <EqList text={text} handleActive={handleActive} handleNext={handleOK} />
      );
    } else if (active === 2) {
      return (
        <RobotList
          text={text}
          handleActive={handleActive}
          handleNext={handleOK}
        />
      );
    } else if (active === 3) {
      return (
        <CameraList
          text={text}
          handleActive={handleActive}
          handleNext={handleOK}
        />
      );
    } else if (active === 4) {
      return (
        <ConsumablesList
          csbtext={csbtext}
          handleCSBActive={handleCSBActive}
          handleNext={handleOK}
        />
      );
    } else if (active === 5) {
      return (
        <SecurityList
          text={text}
          handleActive={handleActive}
          handleNext={handleOK}
        />
      );
    } else if (active === 6) {
      return (
        <GasList
          text={text}
          handleActive={handleActive}
          handleNext={handleOK}
        />
      );
    } else if (active === 7) {
      return (
        <InternetList
          text={text}
          handleActive={handleActive}
          handleNext={handleOK}
        />
      );
    }
  };
  // 清單裡面確認按鈕
  const handleOK = () => {
    let method = text?.type;
    if (method === undefined) {
      dispatch(createWorkListAction({ csb: csbtext }));
    } else {
      dispatch(createWorkListAction({ [method]: text }));
    }
  };

  //swiper
  const swiperRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);

    setStartX(e.clientX - swiperRef.current.offsetLeft); //每次開始的位置
    setScrollLeft(swiperRef.current.scrollLeft); //移動的距離
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX - swiperRef.current.offsetLeft;
    const scrollX = x - startX;
    swiperRef.current.scrollLeft = scrollLeft - scrollX;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  // 手機板移動
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - swiperRef.current.offsetLeft);
    setScrollLeft(swiperRef.current.scrollLeft);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - swiperRef.current.offsetLeft;
    const scrollX = x - startX;
    swiperRef.current.scrollLeft = scrollLeft - scrollX;
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  return (
    <div className={style.l_equitment}>
      <div className={style.l_title}>
        <div className="content-title">{datas.equipmentsetup}</div>
        <div className={style.l_title_switch}>
          <i className="icon-setting"></i>
        </div>
      </div>
      <div className={style.l_content}>
        <div
          className={style.col_equitment_nav}
          ref={swiperRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {equitment.map((item) => (
            <div
              key={item.id}
              value={item.id}
              className={item.id === active ? style.nav_btn_active : ""}
            >
              <BlueButton
                text={item.name}
                btnnone={true}
                handleBlueBTN={handleActiveColor}
              />
            </div>
          ))}
        </div>
        <div className={style.col_equitment}>{renderScreen1()}</div>
        <div className={style.col_equitment}>{renderScreen2()}</div>
      </div>
    </div>
  );
}
