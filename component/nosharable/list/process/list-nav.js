import React, { useRef, useState } from "react";
import styles from "./list-nav.module.scss";
import { useSelector } from "react-redux";

export default function ListNav({ select, handleSelect }) {
  const { datas } = useSelector((state) => state.public);

  const worklist = [
    { id: 1, name: `${datas.weldingprocessing}`, text: "weld" },
    { id: 2, name: `${datas.polishingprocessing}`, text: "polish" },
    { id: 3, name: `${datas.deburringprocessing}`, text: "debur" },
    {
      id: 4,
      name: `${datas.spraypaintingprocessing}`,
      text: "spray",
    },
    { id: 5, name: `${datas.drillingprocessing}`, text: "drill" },
    { id: 6, name: `${datas.gluingprocessing}`, text: "glue" },
    { id: 7, name: `${datas.cuttingprocessing}`, text: "cut" },
  ];

  // swiper
  const swiperRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  //滑鼠移動
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - swiperRef.current.offsetLeft);
    setScrollLeft(swiperRef.current.scrollLeft);
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
    <>
      <div className={styles.list_nav}>
        <div
          className={styles.swiper}
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
          {worklist.map((item) => (
            <div
              role="button"
              key={item.id}
              onClick={(e) => handleSelect(e)}
              data-value={item.text}
              className={`${
                select == item.text ? styles.btn_active : styles.btn_initail
              } ${styles.swiper_slide}`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
