import React from "react";

import ChosenWorkWay from "@/component/nosharable/setting/chosen-workway";
import LayoutMain from "@/component/layout/layout-main";

export default function ProcessingChose() {
  return (
    <>
      <div className="bg-execute"></div>
      <LayoutMain>
        <ChosenWorkWay />
      </LayoutMain>
    </>
  );
}
