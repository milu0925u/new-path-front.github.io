import React, { useRef, useState } from "react";
import style from "./info.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SmallTypeLog from "./type/log";
export default function CCLeft() {
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { data } = useSelector((state) => state.centralControl);

  const handleInToCentralData = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    if (router.asPath === "/processing/central-control/") {
      router.push(`/processing/central-control/${id}`);
    } else if (router.asPath === "/processing/abnormal-log/") {
      router.push(`/processing/abnormal-log/${id}`);
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
    <div
      className={style.cc_swiper}
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
      {data?.map((item, i) => {
        let color;
        let state;
        if (item.state == "斷線") {
          color = style.disconnected;
          state = datas.disconnection;
        } else if (item.state == "故障") {
          color = style.fault;
          state = datas.malfunction;
        } else if (item.state == "換耗材") {
          color = style.consumables;
          state = datas.replaceconsumables;
        } else if (item.state == "維修") {
          color = style.repairs;
          state = datas.repair;
        } else if (item.state == "保養") {
          color = style.maintainance;
          state = datas.maintainance;
        } else if (item.state == "換線") {
          color = style.changeline;
          state = datas.changeover;
        } else if (item.state == "調機") {
          color = style.adjustthemachine;
          state = datas.setup;
        } else if (item.state == "下料") {
          color = style.blanking;
          state = datas.unloading;
        } else if (item.state == "完成") {
          color = style.finish;
          state = datas.complete;
        } else if (item.state == "停止") {
          color = style.stop;
          state = datas.stop;
        } else if (item.state == "暫停") {
          color = style.pause;
          state = datas.pause;
        } else if (item.state == "加工") {
          color = style.process;
          state = datas.processing;
        } else if (item.state == "空跑") {
          color = style.dryrun;
          state = datas.dryrun;
        } else if (item.state == "上料") {
          color = style.feeding;
          state = datas.loading;
        } else if (item.state == "待料") {
          color = style.awaitingmaterials;
          state = datas.waitingformaterial;
        }

        let work;
        if (item.work == "焊接加工") {
          work = datas.weldingprocessing;
        } else if (item.work == "拋光加工") {
          work = datas.polishingprocessing;
        } else if (item.work == "去毛邊加工") {
          work = datas.deburringprocessing;
        } else if (item.work == "噴塗加工") {
          work = datas.spraypaintingprocessing;
        } else if (item.work == "鑽孔加工") {
          work = datas.drillingprocessing;
        } else if (item.work == "塗膠加工") {
          work = datas.gluingprocessing;
        } else if (item.work == "切割加工") {
          work = datas.cuttingprocessing;
        }
        return (
          <div
            key={i}
            className={`${style.l_left_info} ${style.l_left_info_min_width}`}
          >
            <div className={style.left_info_title}>
              <img src={`/images/work/${item.method}.svg`} />
              <span>{work}</span>
            </div>
            <div className={style.left_info_content}>
              <div className={`${style.block} ${style.eq_execute}`}>
                <h6>
                  {item.space}-{datas.regionalmachine}
                  {datas.isbeingexecuted}
                </h6>
              </div>
              <div className={style.left_info_state}>
                <h6>{datas.processingstatus}</h6>
                <span className={`${style.state} ${color}`}>{state}</span>
              </div>
              {router.asPath.includes("/processing/central-control/") ? (
                <>
                  <div className={style.block}>
                    <h6>{datas.selectprocessingpath}</h6>
                    <p>(目前以編號顯示){item.path_id}</p>
                  </div>
                  <div className={style.block}>
                    <h6>{datas.processeditem}</h6>
                    <p className={style.item}>{item.item}</p>
                  </div>
                </>
              ) : (
                <SmallTypeLog item={item} />
              )}
              {!router.query.id && (
                <div
                  className={style.left_info_content_btn}
                  data-id={item.space_id}
                  onClick={handleInToCentralData}
                >
                  <button>
                    <i className="icon-next"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
