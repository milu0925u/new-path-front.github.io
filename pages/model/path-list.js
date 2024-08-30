import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import OrangeButton from "@/component/button/orange-button";
import RWDTitle from "@/component/layout/rwd-title";
import DeleteWhiteButton from "@/component/button/delete-white-button";
import WhiteButton from "@/component/button/white-button";

import Listpath from "@/component/nosharable/list/list-path";
import Choosepath from "@/component/nosharable/list/choose/choose-path";

import { unityOpenAction } from "@/redux/actions/publicAction";
import { readPathAction } from "@/redux/actions/ListAction";
import toast from "react-hot-toast";
import LayoutMain from "@/component/layout/layout-main";
import { FaTools } from "react-icons/fa";
export default function PathList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.pathList);
  const { path } = useSelector((state) => state.start);

  useEffect(() => {
    dispatch(readPathAction());
  }, []);

  const handleNext = () => {
    if (current.id) {
      // dispatch(unityOpenAction());
      router.push("/processing/processing-chose");
    } else {
      toast.error("您未選擇路徑");
    }
  };
  const handleDelete = () => {};

  const [opentool, setOpentool] = useState(false);
  const handleOpenTool = () => {
    setOpentool(!opentool);
  };
  const handleEdit = () => {
    if (current.id) {
      unitySortAlert().then((result) => {
        if (result.isConfirmed) {
          dispatch(unityOpenAction());
          router.push("/draw/show");
        }
      });
    }
  };

  return (
    <>
      <LayoutMain>
        <div className="bg-clouds"></div>
        <div className="bg-sky"></div>
        <div className="container">
          <RWDTitle
            bgcolor="1"
            title={datas.pathlist}
            icon="icon-path-list"
            switchState={opentool}
            handleclose={handleOpenTool}
          >
            <DeleteWhiteButton handleDeleteBTN={handleDelete} />

            <WhiteButton
              text={datas.modify}
              icon="icon-edit"
              handleBlueBTN={handleEdit}
            />
          </RWDTitle>
          <div className="content content-pd content-blue-full">
            <Listpath handleBlueBTN={handleEdit} />
            <Choosepath>
              <OrangeButton
                text={datas.selectpath}
                icon="icon-choosePoint"
                handleOrangeBTN={handleNext}
              />
            </Choosepath>
            <div className="rwd-btn">
              <OrangeButton
                text={datas.selectpath}
                icon="icon-choosePoint"
                handleOrangeBTN={handleNext}
              />
              <button className="rwd-display-none-btn"></button>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
