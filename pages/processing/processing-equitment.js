import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import EqLeftAll from "@/component/nosharable/info/eq-left-all";
import RWDTitle from "@/component/layout/rwd-title";
import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";
import EquitmentSet from "@/component/nosharable/equitment/equitment-set";
import OrangeButton from "@/component/button/orange-button";
import { readdefaultEqAction, readEqAction } from "@/redux/actions/ListAction";

export default function ProcessingEquitment() {
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readEqAction());
    dispatch(readdefaultEqAction());
  }, []);
  // page
  const handleReturn = () => {
    router.push("/processing/processing-chose");
  };

  const handleNext = () => {};

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
          <div className="rwd-btn">
            <OrangeButton
              text={datas.confirm}
              icon="icon-ok"
              handleOrangeBTN={handleNext}
            />
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </>
  );
}
