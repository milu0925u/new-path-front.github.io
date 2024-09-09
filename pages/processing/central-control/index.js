import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import BlueButton from "@/component/button/blue-button";
import CCLeft from "@/component/nosharable/info/cc-left-info";
import { readcontrolAction } from "@/redux/actions/ListAction";
import RWDTitle from "@/component/layout/rwd-title";
import ReturnWhiteButton from "@/component/button/return-white-button";

export default function centralControl() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  useEffect(() => {
    dispatch(readcontrolAction());
  }, []);

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
          <div className="rwd-btn">
            <BlueButton
              text={datas.back}
              icon="icon-return-back"
              handleBlueBTN={handleReturn}
            />
          </div>
        </div>
      </div>
    </>
  );
}
