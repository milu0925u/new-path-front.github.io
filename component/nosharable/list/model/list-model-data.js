import React from "react";
import style from "./list-model-data.module.scss";
import Loading from "@/component/loading/loading";
import { useSelector } from "react-redux";

export default function ListModelData({
  currentid,
  datasList,
  handleChosenDelete,
  handleChoose,
}) {
  const { loading } = useSelector((state) => state.public);

  if (loading) {
    return (
      <div className={style.data}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={style.data}>
      {datasList?.length > 0 ? (
        datasList?.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`${style.grid_list} ${
              currentid == item.id ? style.bg_blue : style.bg_grey
            }`}
            onClick={handleChoose}
          >
            <input
              type="checkbox"
              name="model"
              value={item.id}
              onChange={(e) => {
                handleChosenDelete(e);
              }}
            />
            <div>{item.name}</div>
            <div>{item.date}</div>
          </div>
        ))
      ) : (
        <div className={style.list_empty}>沒有檔案</div>
      )}
    </div>
  );
}
