import React, { useEffect, useState } from "react";

import style from "./list.module.scss";
import Search from "./model/search";
import { useDispatch, useSelector } from "react-redux";
import ListModelData from "./model/list-model-data";
import { SetPathAction, deleteModelAction } from "@/redux/actions/ListAction";

import WhiteButton from "@/component/button/white-button";

export default function ListPath({ handleBlueBTN }) {
  const dispatch = useDispatch();
  const { datas } = useSelector((state) => state.public);
  const { current, data } = useSelector((state) => state.pathList);

  // 所有資料 / 顯示資料
  const [alldatasList, setAllDatasList] = useState([]);
  const [datasList, setDatasList] = useState([]);
  useEffect(() => {
    if (data) {
      setDatasList(data);
    }
  }, [data]);

  const [currentId, setCurrentId] = useState();
  useEffect(() => {
    if (current) {
      setCurrentId(current.id);
    }
  }, [current]);

  // delete item
  const [deleteItem, setDeleteItem] = useState([]);
  const handleChosenDelete = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDeleteItem((prev) => [...prev, Number(value)]);
    } else {
      setDeleteItem((prev) => prev.filter((item) => item !== Number(value)));
    }
  };
  const handleDelete = () => {
    const tf = confirm("是否要刪除?");
    if (tf) {
      dispatch(deleteModelAction(deleteItem));
    }
  };
  // choose
  const handleChoose = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    if (id) {
      const [currentData] = datasList.filter((item) => item.id == id);
      dispatch(SetPathAction(currentData));
      localStorage.setItem("path", JSON.stringify(currentData));
    }
  };

  return (
    <div className={`${style.col_list} ${style.col_list_bg}`}>
      <div className={style.list_f}>
        <Search alldatasList={alldatasList} setDatasList={setDatasList} />
        <WhiteButton text={datas.editpath} icon="icon-edit" />
        <WhiteButton
          text={datas.delete}
          icon="icon-delete"
          handleBlueBTN={handleDelete}
        />
      </div>
      <div className={style.list_model}>
        <div className={style.list_model_title}>
          <div></div>
          <div>{datas.pathlist}</div>
          <div>{datas.creationtime}</div>
        </div>
        <ListModelData
          currentid={currentId}
          datasList={datasList}
          handleChosenDelete={handleDelete}
          handleChoose={handleChoose}
        />
      </div>
    </div>
  );
}
