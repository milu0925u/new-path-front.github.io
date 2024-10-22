import React, { useEffect, useState, useRef } from "react";
import style from "@/component/nosharable/setting/workway/work-card.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import WorkCard from "./workway/work-card";
import OrangeButton from "@/component/button/orange-button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import WayLine from "@/component/nosharable/setting/workway/way-line";
import RWDTitle from "@/component/layout/rwd-title";
import BlueButton from "@/component/button/blue-button";
import toast from "react-hot-toast";
import { StartContext } from "@/hook/startContext";
import {
  createWorkListAction,
  SaveWorkListAction,
} from "@/redux/actions/ListAction";
export default function ChosenWorkWay() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { start } = StartContext();

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
    dispatch(SaveWorkListAction()); //清空create
  }, [datas]);
  // 下一頁按鈕
  const handleNext = () => {
    const typeid = swiperRef.current.swiper.activeIndex;
    // 數字對照的英文
    const list = ["weld", "polish", "debur", "spray", "drill", "glue", "cut"];
    if (list[typeid] === "weld") {
      dispatch(createWorkListAction({ method: method }));
    } else {
      dispatch(createWorkListAction({ method: list[typeid] }));
    }

    if (start.path.name) {
      router.push("/processing/processing-equitment");
      return;
    }
    toast.error(datas.nopathselected);
  };
  // 選擇加工方式
  const [method, setMethod] = useState("weld");
  const handleClick = (e) => {
    const work = e.currentTarget.dataset.work;
    setMethod(work);
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
    setMethod("weld");
  };
  const swiperRef = useRef(null);
  // 選擇路徑
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
              {start.path && start.path.name}
            </div>
          </div>
          <div className={style.col_work_card}>
            <Swiper slidesPerView={windowWidth < 1200 ? 1 : 7} ref={swiperRef}>
              {work?.map((item, i) => (
                <SwiperSlide
                  key={item.id}
                  onClick={handleClick}
                  data-work={item.image}
                >
                  <WorkCard item={item} method={method} />
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
