import React, { useState } from "react";
import style from "./search.module.scss";
import CancleX from "./cancleX";
import { useSelector } from "react-redux";
export default function Search({ alldatasList, setDatasList }) {
  const { datas } = useSelector((state) => state.public);

  console.log(alldatasList);
  console.log(setDatasList);

  // search text
  const [searchText, setSearchText] = useState("");
  const handleSearchText = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setTimeout(() => {
      let newData = alldatasList.filter((item) => {
        return (
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.date.toLowerCase().includes(text.toLowerCase())
        );
      });
      setDatasList(newData);
    }, 500);
  };
  // search delect
  const cancle = () => {
    setSearchText("");
    setDatasList(alldatasList);
  };

  return (
    <div className={style.search}>
      <i className="icon-search"></i>
      <input
        type="text"
        placeholder={datas.searchPlaceholder}
        value={searchText}
        onChange={(e) => {
          handleSearchText(e);
        }}
      />
      {searchText !== "" ? (
        <button onClick={cancle}>
          <CancleX />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
