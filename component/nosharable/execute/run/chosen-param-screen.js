import React, { useState, useEffect } from "react";
import style from "./runscreen.module.scss";
import { StartContext } from "@/hook/startContext";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ListWork from "@/component/nosharable/list/list-work";

import { modifyAlert, deleteAlert } from "@/component/alert/alert";
import {
  createWorkListAction,
  deleteWorkListAction,
  readWorkListAction,
  SetWorkListAction,
} from "@/redux/actions/ListAction";
import OrangeButton from "@/component/button/orange-button";
import { useRouter } from "next/router";
export default function ChosenParamScreen() {
  const { datas } = useSelector((state) => state.public);
  const { current, data } = useSelector((state) => state.workList);
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleAdd } = StartContext();
  useEffect(() => {
    dispatch(readWorkListAction());
  }, []);
  console.log(current);

  const handleNext = () => {
    if (Object.keys(current).length === 0) {
      toast.error("請選擇加工參數");
      return false;
    }
    handleAdd("method", select);
    handleAdd("robot", current.robot_name);
    handleAdd("camera", current.camera_name);
    handleAdd("security", current.security_name);
    handleAdd("network", current.network_name);
    handleAdd("gas", current.gas_name);
    handleAdd("eq", current.eq_name);
    handleAdd("param", {
      name: current.name,
      electric_current: current.electric_current,
      voltage: current.voltage,
      deep: current.deep,
    });
  };

  // 選擇的list畫面
  const [select, setSelected] = useState("weld");
  const handleSelect = (e) => {
    const value = e.target.dataset.value;
    setSelected(value);
  };
  // 刪除(多選)
  const [deleteItem, setDeleteItem] = useState([]);
  const handleDeleteBTN = () => {
    deleteAlert().then((result) => {
      if (result.isConfirmed) {
        const sendData = { type: select, paramid: deleteItem };
        dispatch(deleteWorkListAction(sendData));
        setDeleteItem([]);
      }
    });
  };
  const handleChosenDelete = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDeleteItem((prev) => [...prev, Number(value)]);
    } else {
      setDeleteItem((prev) => prev.filter((item) => item !== Number(value)));
    }
  };
  // 更新
  const handleModifyBTN = () => {
    if (Object.keys(current).length === 0) {
      toast.error("請選擇修改項目");
      return false;
    }

    modifyAlert(datas).then((result) => {
      if (result.isConfirmed) {
        // 把選擇到的資料丟進去create裡面
        const tag = { ...current, method: select, tag: "edit" };
        dispatch(createWorkListAction(tag));
        router.push("/processing/processing-equitment");
      }
    });
  };
  // 選擇到的顏色切換+選擇到存入redux
  const [currentid, setCurrentid] = useState();
  const handleChoose = (e) => {
    const chosenID = Number(e.currentTarget.dataset.id);
    setCurrentid(chosenID);
    const [currentData] = datasList.filter((item) => item.id == chosenID);
    dispatch(SetWorkListAction(currentData));
  };
  // 顯示資料
  const [datasList, setDatasList] = useState([]);
  useEffect(() => {
    setDatasList(data[select]);
  }, [data, select]);

  return (
    <div className={style.l_run_list}>
      <div className={style.l_run_list_worklist}>
        <ListWork
          select={select}
          handleSelect={handleSelect}
          handleDeleteBTN={handleDeleteBTN}
          handleChosenDelete={handleChosenDelete}
          handleModifyBTN={handleModifyBTN}
          currentid={currentid}
          handleChoose={handleChoose}
          datasList={datasList}
          setDatasList={setDatasList}
        />
        <OrangeButton
          text={datas.ok}
          icon="icon-ok"
          handleOrangeBTN={handleNext}
        />
      </div>
    </div>
  );
}
