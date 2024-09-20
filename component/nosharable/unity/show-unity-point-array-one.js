import React, { useEffect, useState } from "react";

export default function ShowUnityPointArrayOne({
  array,
  v,
  allOpen,
  setAllOpen,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setAllOpen(!open);
  };
  // 樣式圖片
  const [icon, setIcon] = useState();
  // 樣式顏色
  const [color, setColor] = useState();
  useEffect(() => {
    if (v === "point") {
      setIcon("icon-pen");
      setColor("blue-circle");
    } else if (v.includes("contiPoint")) {
      setIcon("icon-pen-continuous");
      setColor("blue-circle");
    } else if (v.includes("linePoint")) {
      setIcon("icon-pen-line");
      setColor("blue-circle");
    } else if (v.includes("squarePoint")) {
      setIcon("icon-pen-square");
      setColor("orange-circle");
    } else if (v.includes("polygonPoint")) {
      setIcon("icon-pen-polygon");
      setColor("orange-circle");
    } else if (v.includes("recPoint")) {
      setIcon("icon-pen-rec");
      setColor("orange-circle");
    } else if (v.includes("circlePoint")) {
      setIcon("icon-pen-circle");
      setColor("orange-circle");
    } else if (v.includes("ovalPoint")) {
      setIcon("icon-pen-oval");
      setColor("orange-circle");
    } else if (v.includes("arcPoint")) {
      setIcon("icon-pen-arc");
      setColor("blue-circle");
    }
  }, []);

  console.log(array);

  return (
    <div
      className={`flex-array ${
        allOpen ? "flex-start-array" : "flex-center-array "
      }`}
    >
      <div className="show-array-title">
        <div onClick={handleOpen} data-text={v}>
          <button className={color}>
            <i className={icon ? icon : ""}></i>
            <span className="count">{array[v].length}</span>
          </button>
          {open &&
            array[v].map((vv, i) => (
              <button key={i} className="case-none"></button>
            ))}
        </div>
      </div>
      {open && (
        <div className="show-array-content">
          <div className="case-block"></div>
          {array[v].map((v, i) => (
            <div className="inner-content" key={i}>
              <p>{i + 1}.</p>
              <button>
                <i className="icon-pen"></i>
              </button>
              <span className="display-point">
                {`(${v.points[0]}, ${v.points[1]}, ${v.points[2]})`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
