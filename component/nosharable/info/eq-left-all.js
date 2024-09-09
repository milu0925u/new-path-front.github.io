import React from "react";
import { useSelector } from "react-redux";
import style from "./info.module.scss";
import { useRouter } from "next/router";
import EqLeftAllEquitment from "./eq-left-all-equitment";
import EqLeftAllExecute from "./eq-left-all-execute";
import EqLeftAllParam from "./eq-left-all-param";
export default function EqLeftAll() {
  const router = useRouter();

  const renderScreen = () => {
    if (router.pathname === "/processing/processing-equitment") {
      return <EqLeftAllEquitment />;
    } else if (router.pathname === "/processing/processing-view") {
      return <EqLeftAllExecute />;
    } else if (router.pathname === "/processing/processing-set") {
      return <EqLeftAllParam />;
    }
  };

  return <div className={style.l_left_info}>{renderScreen()}</div>;
}
