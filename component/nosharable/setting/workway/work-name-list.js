import React from "react";
import style from "@/component/nosharable/setting/setting.module.scss";
import { createdNameWorkingAction } from "@/redux/actions/ListAction";
import { useDispatch, useSelector } from "react-redux";
export default function WorkNameList({ setName }) {
  const { datas } = useSelector((state) => state.public);
  const { create } = useSelector((state) => state.workList);
  const dispatch = useDispatch();
  const onChangeSetName = (name) => {
    dispatch(createdNameWorkingAction(name, create.way));
  };
  return (
    <div className={`${style.right_setting_name}`}>
      <i className="icon-workname"></i>
      <input
        type="text"
        placeholder={datas.enterprocessingconfigurationname}
        onChange={(e) => {
          onChangeSetName(e.target.value);
        }}
      />
    </div>
  );
}
