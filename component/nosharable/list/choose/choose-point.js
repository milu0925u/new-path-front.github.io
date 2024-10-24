import React from "react";
import style from "../list.module.scss";
import { useSelector } from "react-redux";
export default function ChoosePoint({ children }) {
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.pointList);

  return (
    <div className={style.chosen_list}>
      <div className={`${style.chosen_list_data} ${style.col_list_mt}`}>
        <div>
          <div>{datas.pointname}：</div>
          <div className={style.chosen_list_input}>
            {current ? current.name : ""}
          </div>
        </div>
        <div className={style.chosen_list_img}>
          {current.image_path ? (
            <img src={`${current.image_path}`} alt={current.name} />
          ) : (
            <img alt="nodata" src="/images/no-image-data.png" />
          )}
        </div>
      </div>
      <div className="next-btn">{children}</div>
    </div>
  );
}
