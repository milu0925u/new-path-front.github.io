import React, { useState } from "react";

export default function ShowUnityPointArray({ img, point }) {
  const [open, setOpen] = useState(false);

  if (point.length !== 0) {
    return (
      <div>
        <div
          className="show-array-title"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <button>
            <i className={img}></i>
            <span className="count">{point.length}</span>
          </button>
        </div>
        {open && (
          <div className="show-array-content">
            {point.map((v, i) => (
              <div>
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
}
