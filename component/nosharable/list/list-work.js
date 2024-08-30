import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./list.module.scss";

import WhiteButton from "@/component/button/white-button";

import Search from "./model/search";
import ListNav from "./process/list-nav";
import ListModelData from "./model/list-model-data";
export default function ListWork({
  select,
  handleSelect,
  currentId,
  handleChoose,
  handleModifyBTN,
  handleDeleteBTN,
  handleChosenDelete,
}) {
  const { datas } = useSelector((state) => state.public);
  const { data } = useSelector((state) => state.workList);

  useEffect(() => {
    setAllDatasList(data.data);
    setDatasList(data.data);
  }, [data.data]);

  // 所有資料 / 顯示資料
  const [alldatasList, setAllDatasList] = useState([]);
  const [datasList, setDatasList] = useState([]);

  return (
    <div
      className={`${style.col_list} ${style.col_list_bg} ${style.list_radius}`}
    >
      <div className={style.list_f}>
        <Search alldatasList={alldatasList} setDatasList={setDatasList} />
        <WhiteButton
          text={datas.modify}
          icon="icon-editset"
          handleBlueBTN={handleModifyBTN}
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
          <div>{datas.modelname}</div>
          <div>{datas.creationtime}</div>
        </div>
        <ListModelData
          currentid={currentId}
          datasList={datasList}
          handleChosenDelete={handleChosenDelete}
          handleChoose={handleChoose}
        />
      </div>
      <ListNav select={select} handleSelect={handleSelect} />
    </div>
  );
}
