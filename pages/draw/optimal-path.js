import React from "react";
import BlueButton from "@/component/button/blue-button";
export default function OptimalPath() {
  const handleA = () => {};
  const handleB = () => {};
  const handleC = () => {};
  return (
    <>
      <div className="bg-sky"></div>
      <div>
        <BlueButton text="匯入標點" handleBlueBTN={handleA} />
        <h1>路徑生成演算法</h1>
        <BlueButton text="精準選項" handleBlueBTN={handleB} />
        <BlueButton text="平滑選項" handleBlueBTN={handleC} />
        <input type="text" placeholder="路徑名稱" />
      </div>
    </>
  );
}
