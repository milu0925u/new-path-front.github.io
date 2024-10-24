import React, { useEffect } from "react";
import style from "./runscreen.module.scss";

import { useDispatch, useSelector } from "react-redux";
import Listpath from "@/component/nosharable/list/list-path";
import Choosepath from "@/component/nosharable/list/choose/choose-path";
import { StartContext } from "@/hook/startContext";
import OrangeButton from "@/component/button/orange-button";
import { readPathAction } from "@/redux/actions/ListAction";
export default function ChosenPathScreen() {
  const dispatch = useDispatch();
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.pathList);
  const { handleAdd } = StartContext();
  useEffect(() => {
    dispatch(readPathAction());
  }, []);
  const handleNext = () => {
    handleAdd("path", current);
  };

  const handleEdit = () => {};
  return (
    <div className={`${style.l_run_list} ${style.flex}`}>
      <Listpath handleBlueBTN={handleEdit} />
      <Choosepath>
        <OrangeButton
          text={datas.selectpath}
          icon="icon-choosePoint"
          handleOrangeBTN={handleNext}
        />
      </Choosepath>
      <div className="rwd-next-btn">
        <OrangeButton
          text={datas.save}
          icon="icon-save"
          handleOrangeBTN={handleNext}
        />
      </div>
    </div>
  );
}
