import React, { useEffect, useState } from "react";
import style from "./list.module.scss";
import Search from "./model/search";
import { useDispatch, useSelector } from "react-redux";
import ListModelData from "./model/list-model-data";
import { SetPointAction } from "@/redux/actions/ListAction";
import WhiteButton from "@/component/button/white-button";
import { useRouter } from "next/router";
export default function ListPoint({
  handleSort,
  handleChosenDelete,
  handleDeleteBTN,
}) {
  const dispatch = useDispatch();
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const { datas } = useSelector((state) => state.public);
  const { current, data } = useSelector((state) => state.pointList);
  // 所有資料 / 顯示資料
  const [alldatasList, setAllDatasList] = useState([]);
  const [datasList, setDatasList] = useState([]);
  useEffect(() => {
    if (data) {
      setDatasList(data);
      setAllDatasList(data);
    }
  }, [data]);
  const [currentId, setCurrentId] = useState();
  useEffect(() => {
    if (current) {
      setCurrentId(current.id);
    }
  }, [current]);

  // choose
  const handleChoose = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    if (id) {
      const [currentData] = datasList.filter((item) => item.id == id);
      let newData = {
        ...currentData,
        model_path: `${domain}/${currentData.model_path}`,
        image_path: `${domain}/${currentData.image_path}`,
      };

      dispatch(SetPointAction(newData));
      localStorage.setItem("point", JSON.stringify(newData));
    }
  };

  return (
    <>
      <div className={`${style.col_list} ${style.col_list_bg}`}>
        <div className={style.list_f}>
          <Search alldatasList={alldatasList} setDatasList={setDatasList} />
          <WhiteButton
            text={datas.modify}
            icon="icon-edit"
            handleBlueBTN={handleSort}
          />
          <WhiteButton
            text={datas.path}
            icon="icon-path"
            handleBlueBTN={handleSort}
          />
          <WhiteButton
            text={datas.delete}
            icon="icon-delete"
            handleBlueBTN={handleDeleteBTN}
          />
        </div>
        <div className={style.list_model}>
          <div className={style.list_model_title}>
            <div></div>
            <div>{datas.pointname}</div>
            <div>{datas.creationtime}</div>
          </div>
          <ListModelData
            currentid={currentId}
            datasList={datasList}
            handleChosenDelete={handleChosenDelete}
            handleChoose={handleChoose}
          />
        </div>
      </div>
    </>
  );
}
