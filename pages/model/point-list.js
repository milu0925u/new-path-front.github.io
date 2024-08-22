import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import OrangeButton from "@/component/button/orange-button";
import RWDTitle from "@/component/layout/rwd-title";
import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";
import DeleteWhiteButton from "@/component/button/delete-white-button";

import ListPoint from "@/component/nosharable/list/list-point";
import ChoosePoint from "@/component/nosharable/list/choose/choose-point";
import { unitySortAlert } from "@/component/alert/alert";
import { unityOpenAction } from "@/redux/actions/publicAction";
import {
  readPointAction,
  deletePointAction,
  SetShowDataAction,
} from "@/redux/actions/ListAction";
import toast from "react-hot-toast";
import { deleteAlert } from "@/component/alert/alert";
import WhiteButton from "@/component/button/white-button";

import LayoutMain from "@/component/layout/layout-main";
export default function PointList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.pointList);
  useEffect(() => {
    dispatch(readPointAction());
  }, []);

  const handleReturn = () => {
    router.back();
  };
  const handleNext = () => {
    if (current.id) {
      alert("目前畫面未建立");
      router.push("/draw/show");
    } else {
      toast.error("您未選擇模型");
    }
  };
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
  const handleDeleteBTN = () => {
    deleteAlert().then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePointAction(deleteItem));
        setDeleteItem([]);
        dispatch(SetShowDataAction({}));
      }
    });
  };
  const [opentool, setOpentool] = useState(false);
  const handleOpenTool = () => {
    setOpentool(!opentool);
  };
  // 進入show unity
  const handleSort = () => {
    if (current.id) {
      unitySortAlert().then((result) => {
        if (result.isConfirmed) {
          dispatch(unityOpenAction());
          router.push("/draw/edit");
        }
      });
    } else {
      toast.error("您未選擇模型");
    }
  };
  return (
    <LayoutMain>
      <div className="bg-clouds"></div>
      <div className="bg-sky"></div>
      <div className="container">
        <RWDTitle
          bgcolor="1"
          title={datas.punctuationlist}
          icon="icon-draw-list"
          switchState={opentool}
          handleclose={handleOpenTool}
        >
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <WhiteButton
            text={datas.toolbox}
            icon="icon-toolbox"
            handleBlueBTN={handleOpenTool}
          />
          <WhiteButton
            text={datas.modify}
            icon="icon-edit"
            handleBlueBTN={handleSort}
          />
          <DeleteWhiteButton handleDeleteBTN={handleDeleteBTN} />
        </RWDTitle>
        <div className="content content-pd content-blue-full">
          <ListPoint
            handleSort={handleSort}
            handleChosenDelete={handleChosenDelete}
            handleDeleteBTN={handleDeleteBTN}
          />
          <ChoosePoint>
            <OrangeButton
              text={datas.selectpoint}
              icon="icon-choosePoint"
              handleOrangeBTN={handleNext}
            />
          </ChoosePoint>
          <div className="rwd-btn">
            <OrangeButton
              text={datas.selectpoint}
              icon="icon-choosePoint"
              handleOrangeBTN={handleNext}
            />
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
