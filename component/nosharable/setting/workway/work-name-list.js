import React from "react";
import style from "@/component/nosharable/setting/setting.module.scss";
import { createWorkListAction } from "@/redux/actions/ListAction";
import { useDispatch, useSelector } from "react-redux";
export default function WorkNameList() {
  const { datas } = useSelector((state) => state.public);
  const { create } = useSelector((state) => state.workList);
  const dispatch = useDispatch();
  const onChangeSetName = (e) => {
    const value = e.target.value;
    dispatch(createWorkListAction({ name: value }));
  };
  return (
    <div className={style.right_setting_name}>
      <i className="icon-workname"></i>
      <input
        type="text"
        placeholder={datas.enterprocessingconfigurationname}
        value={create.name ? create?.name : ""}
        onChange={onChangeSetName}
      />
    </div>
  );
}
