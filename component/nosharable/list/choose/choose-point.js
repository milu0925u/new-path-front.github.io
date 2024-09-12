import React from "react";
import style from "../list.module.scss";
import { useSelector } from "react-redux";
export default function ChoosePoint({ children }) {
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.pointList);
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  console.log(current);

  return (
    <div className={style.chosen_list}>
      <div className={style.chosen_list_data}>
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
      <div className="nextbtn">{children}</div>
    </div>
  );
}
