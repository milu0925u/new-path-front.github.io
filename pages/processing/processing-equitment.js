import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import EqLeftAll from "@/component/nosharable/info/eq-left-all";
import RWDTitle from "@/component/layout/rwd-title";
import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";
import EquitmentSet from "@/component/nosharable/equitment/equitment-set";
import OrangeButton from "@/component/button/orange-button";
import {
  createWorkListAction,
  readdefaultEqAction,
  readEqAction,
} from "@/redux/actions/ListAction";

export default function ProcessingEquitment() {
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { create, eqdata } = useSelector((state) => state.workList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readEqAction());
    dispatch(readdefaultEqAction());
  }, []);
  // page
  const handleReturn = () => {
    router.push("/processing/processing-chose");
  };

  const handleNext = () => {
    // 抓到所有預設值
    const filteredData = {};
    for (const key in eqdata) {
      [filteredData[key]] = eqdata[key].filter((item) => item.defaultt === 1);
      if (!create[key]) {
        dispatch(createWorkListAction({ [key]: filteredData[key] }));
      }
    }
    router.push("/processing/processing-set");
  };
  //
  useEffect(() => {
    if (create.method === undefined) {
      router.push("/processing/processing-chose");
    }
  }, [router]);
  return (
    <>
      <div className="bg-execute"></div>
      <div className="container">
        <RWDTitle title={datas.equipmentsetup} icon="icon-execute">
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <EqLeftAll />
          <EquitmentSet />
          <div className="rwd-btn-2">
            <ReturnBlueButton handleReturnBTN={handleReturn} />
            <OrangeButton
              text={datas.save}
              icon="icon-save"
              handleOrangeBTN={handleNext}
            />
          </div>
        </div>
      </div>
    </>
  );
}
