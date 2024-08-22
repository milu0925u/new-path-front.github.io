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
export default function Process1() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(pageNextAction("workway"));
  }, []);

  const { datas } = useSelector((state) => state.public);

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
  const handleReturn = () => {
    dispatch(pageNextAction("/"));
    router.back();
  };
  const handleNext = () => {
    dispatch(pageNextAction("name"));
    dispatch(
      createdWayWorkingAction(Number(swiperRef.current.swiper.realIndex) + 1)
    );
  };
  // choose work way
  const [clickItem, setClickItem] = useState(1);
  const handleClickItem = (e) => {
    setClickItem(e.currentTarget.value);
  };
  // swiper
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

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
        <ReturnWhiteButton handleReturnBTN={handleReturn} />
        <button className="rwd-display-none-btn"></button>
      </RWDTitle>
      <div className="content content-white-full">
        <div className={style.l_work_card}>
          <div>
            <BlueButton
              text={datas.importpath}
              icon="icon-importpath"
              handleBlueBTN={handleBlueBTN}
            />
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
          <div id={style.workcard_nextbtn_swiper}>
            <OrangeButton
              text={datas.confirm}
              icon="icon-ok"
              handleOrangeBTN={handleNext}
            />
          </div>
          <div className="rwd-btn">
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </div>
  );
}
