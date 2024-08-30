import React, { useEffect, useState, useRef } from "react";
import style from "@/component/nosharable/setting/workway/work-card.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";

import WorkCard from "./workway/work-card";

import OrangeButton from "@/component/button/orange-button";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { pageNextAction } from "@/redux/actions/publicAction";
import WayLine from "@/component/nosharable/setting/workway/way-line";
import { createdWayWorkingAction } from "@/redux/actions/ListAction";

import RWDTitle from "@/component/layout/rwd-title";
import BlueButton from "@/component/button/blue-button";
export default function ChosenWorkWay() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { datas } = useSelector((state) => state.public);
  const { path } = useSelector((state) => state.start);

  console.log(path);

  // 傳入陣列
  const [work, setWork] = useState(null);
  useEffect(() => {
    setWork([
      { id: 1, name: datas.welding, image: "weld" },
      { id: 2, name: datas.polishing, image: "polish" },
      { id: 3, name: datas.deburring, image: "debur" },
      { id: 4, name: datas.spraypainting, image: "spray" },
      { id: 5, name: datas.drilling, image: "drill" },
      { id: 6, name: datas.gluing, image: "glue" },
      { id: 7, name: datas.cutting, image: "cut" },
    ]);
  }, [datas]);
  // page
  const handleNext = () => {
    dispatch(
      createdWayWorkingAction(Number(swiperRef.current.swiper.realIndex) + 1)
    );
    router.push("/processing/processing-equitment");
  };
  // choose work way
  const [clickItem, setClickItem] = useState(1);
  const handleClickItem = (e) => {
    setClickItem(e.currentTarget.value);
  };
  // swiper
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const swiperRef = useRef(null);

  const handleBlueBTN = () => {
    router.push("/model/path-list");
  };
  return (
    <div className="container">
      <RWDTitle
        title={datas.chooseprocessingmethod}
        icon="icon-choose-work-way"
      >
        <button className="rwd-display-none-btn"></button>
        <button className="rwd-display-none-btn"></button>
      </RWDTitle>
      <div className="content content-white-full">
        <div className={style.l_work_card}>
          <div className={style.chosen_card}>
            <BlueButton
              text={datas.selectpath}
              icon="icon-importpath"
              handleBlueBTN={handleBlueBTN}
            />
            <div className={style.l_work_card_pathname}>
              {path ? path.name : "未選擇"}
            </div>
          </div>
          <div className={style.col_work_card}>
            <Swiper slidesPerView={windowWidth < 1200 ? 1 : 7} ref={swiperRef}>
              {work?.map((item) => (
                <SwiperSlide key={item.id}>
                  <WorkCard
                    item={item}
                    clickItem={clickItem}
                    handleClickItem={handleClickItem}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={style.rwd_chosen_line}>
              <WayLine />
            </div>
          </div>
          <div className={style.work_card_btn}>
            <OrangeButton
              text={datas.confirm}
              icon="icon-ok"
              handleOrangeBTN={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
