import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ListWork from "@/component/nosharable/list/list-work";
import ChooseWorkCut from "@/component/nosharable/list/choose/choose-work-cut";
import ChooseWorkPolish from "@/component/nosharable/list/choose/choose-work-polish";
import ChooseWorkSpray from "@/component/nosharable/list/choose/choose-work-spray";
import ChooseWorkGlue from "@/component/nosharable/list/choose/choose-work-glue";
import ChooseWorkDebur from "@/component/nosharable/list/choose/choose-work-debur";
import ChooseWorkDrill from "@/component/nosharable/list/choose/choose-work-drill";
import ChooseWorkWeld from "@/component/nosharable/list/choose/choose-work-weld";
import { StartContext } from "@/hook/startContext";
import RWDTitle from "@/component/layout/rwd-title";
import WhiteButton from "@/component/button/white-button";

import { modifyAlert, deleteAlert } from "@/component/alert/alert";
import {
  readWorkListAction,
  SetWorkListAction,
  deleteWorkListAction,
  editNameWorkingAction,
  createdWayWorkingAction,
  wirteParamWorkingAction,
  createWorkListAction,
} from "@/redux/actions/ListAction";
import { useRouter } from "next/router";
import OrangeButton from "@/component/button/orange-button";
import toast from "react-hot-toast";
export default function ProcessingList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { current, data } = useSelector((state) => state.workList);

  useEffect(() => {
    dispatch(readWorkListAction());
  }, []);

  // 選擇的list畫面
  const [select, setSelected] = useState("weld");
  const handleSelect = (e) => {
    const value = e.target.dataset.value;
    setSelected(value);
  };
  const renderChoose = () => {
    switch (select) {
      case "weld":
        return <ChooseWorkWeld handleOrangeBTN={handleNext} />;
      case "polish":
        return <ChooseWorkPolish handleOrangeBTN={handleNext} />;
      case "debur":
        return <ChooseWorkDebur handleOrangeBTN={handleNext} />;
      case "spray":
        return <ChooseWorkSpray handleOrangeBTN={handleNext} />;
      case "drill":
        return <ChooseWorkDrill handleOrangeBTN={handleNext} />;
      case "glue":
        return <ChooseWorkGlue handleOrangeBTN={handleNext} />;
      case "cut":
        return <ChooseWorkCut handleOrangeBTN={handleNext} />;
      default:
        return <ChooseWorkWeld handleOrangeBTN={handleNext} />;
    }
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

  const { handleAdd } = StartContext();
  // 選擇
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
    router.push("/processing/processing-view");
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
    if (select) {
      dispatch(SetWorkListAction({})); //切換加工方式時清除
    }
  }, [data, select]);
  return (
    <>
      <div className="bg-execute"></div>
      <div className="container">
        <RWDTitle
          title={datas.processingconfigurationlist}
          icon="icon-processing-list"
        >
          <WhiteButton
            text={datas.delete}
            icon="icon-delete"
            handleBlueBTN={handleDeleteBTN}
          />
          <WhiteButton
            text={datas.modify}
            icon="icon-editset"
            handleBlueBTN={handleModifyBTN}
          />
        </RWDTitle>
        <div className="content content-margin">
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
          {renderChoose()}
          <div className="rwd-btn">
            <OrangeButton
              text={datas.executeprocessing}
              icon="icon-execute-work"
              handleOrangeBTN={handleNext}
            />
            <button className="rwd-display-none-btn"></button>
          </div>
        </div>
      </div>
    </>
  );
}
