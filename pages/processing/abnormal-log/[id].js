import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ReturnBlueButton from "@/component/button/return-blue-button";
import {
  readOneabnormallogAction,
  readOnecontrolAction,
} from "@/redux/actions/ListAction";
import AbnormalcontentTitle from "@/component/nosharable/info/ab-title";
import Abnormalcontent from "@/component/nosharable/info/ab-content";

import ReturnWhiteButton from "@/component/button/return-white-button";

import RWDTitle from "@/component/layout/rwd-title";
export default function AbnormalLogID() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);

  useEffect(() => {
    if (router.query.id) {
      dispatch(readOnecontrolAction(router.query.id));
      dispatch(readOneabnormallogAction(router.query.id));
    }
  }, [router.query.id, dispatch]);
  const handleReturn = () => {
    router.back();
  };
  return (
    <>
      <div className="bg-abnormal"></div>
      <div className="container">
        <RWDTitle icon="icon-abnormal-log" title={datas.abnormalsignalrecord}>
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>

        <div className="content content-abnormal-log">
          <AbnormalcontentTitle />
          <Abnormalcontent />
          <div className="rwd-btn">
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </>
  );
}
