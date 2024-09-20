import React, { useState, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import ShowUnityPointArrayOne from "./show-unity-point-array-one";

export default function ShowUnityPointArray({ array, orderI }) {
  const listRef = useRef(null);
  const orderRef = useRef(orderI);
  // 更新 ref 的值
  useEffect(() => {
    orderRef.current = orderI;
  }, [orderI]);

  const [toggle, setToggle] = useState(false); //觸發重新渲染

  useEffect(() => {
    if (listRef.current) {
      Sortable.create(listRef.current, {
        animation: 150,
        onStart: (event) => {
          setToggle(true);
        },
        onEnd: (event) => {
          const { oldIndex, newIndex } = event; // 點選到的物件 - 目前的位置
          let oldarray = orderRef.current;
          let number = oldarray[oldIndex];
          oldarray.splice(oldIndex, 1); // 刪除位置,1項
          oldarray.splice(newIndex, 0, number); //加入位置,不刪,增加
          // setorderI(oldarray); //為啥不需要設定??不知道
          setToggle(false);
        },
      });
    }
  }, []);

  const [allOpen, setAllOpen] = useState(false); //移動位置

  return (
    <div ref={listRef}>
      {/* 執行順序 */}
      {Object.keys(array).map((v, i) => (
        <ShowUnityPointArrayOne
          key={i}
          array={array}
          v={v}
          allOpen={allOpen}
          setAllOpen={setAllOpen}
        />
      ))}
    </div>
  );
}
