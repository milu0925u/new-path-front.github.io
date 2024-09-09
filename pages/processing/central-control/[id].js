import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ReturnBlueButton from "@/component/button/return-blue-button";
import {
  readOneabnormallogAction,
  readOnecontrolAction,
} from "@/redux/actions/ListAction";
import CCRight from "@/component/nosharable/info/cc-right-info";
import CCLeft from "@/component/nosharable/info/cc-left-info";

import ReturnWhiteButton from "@/component/button/return-white-button";

import RWDTitle from "@/component/layout/rwd-title";
export default function centralControlID() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      dispatch(readOnecontrolAction(id));
      dispatch(readOneabnormallogAction(id));
    }
  }, [router.query.id, dispatch]);

  const handleReturn = () => {
    router.back();
  };
  return (
    <>
      <div className="bg-control"></div>
      <div className="container">
        <RWDTitle icon="icon-central-control" title={datas.centralcontrol}>
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <CCLeft />
          <CCRight />
          <div className="rwd-btn">
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </>
  );
}
