import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./list.module.scss";

import WhiteButton from "@/component/button/white-button";

import Search from "./model/search";
import ListNav from "./process/list-nav";
import ListModelData from "./model/list-model-data";
export default function ListWork({
  select,
  handleDeleteBTN,
  handleModifyBTN,
  handleSelect,
  currentid,
  handleChoose,
  datasList,
  setDatasList,
  handleChosenDelete,
}) {
  const { datas } = useSelector((state) => state.public);
  const { data } = useSelector((state) => state.workList);

  return (
    <div
      className={`${style.col_list} ${style.col_list_bg} ${style.list_radius}`}
    >
      <div className={style.list_f}>
        <Search alldatasList={data[select]} setDatasList={setDatasList} />
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
          currentid={currentid}
          datasList={datasList}
          handleChosenDelete={handleChosenDelete}
          handleChoose={handleChoose}
        />
      </div>
      <ListNav select={select} handleSelect={handleSelect} />
    </div>
  );
}
