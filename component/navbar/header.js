import style from "./navbar.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { unityLeaveAlert } from "@/component/alert/alert";
import { unityCloseAction } from "@/redux/actions/publicAction";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas, unity } = useSelector((state) => state.public);
  const handleUser = () => {
    alert("未寫會員");
  };
  const handleLang = () => {
    router.push(router.asPath, router.asPath, {
      locale: router.locale == "tw" ? "en" : "tw",
    });
  };
  const handleNavigation = (e) => {
    e.preventDefault();
    let link = e.currentTarget.value;
    if (unity) {
      unityLeaveAlert(datas).then((result) => {
        if (result.isConfirmed) {
          dispatch(unityCloseAction());
          router.push(link);
        }
      });
    } else {
      router.push(link);
    }
  };

  return (
    <>
      <div className={style.header}>
        <button
          className={style.logo}
          value="/"
          onClick={(e) => {
            handleNavigation(e);
          }}
        ></button>
        <div className={style.header_btn}>
          <button onClick={handleUser}>
            <i className="icon-user"></i>
            <span>{datas?.user}</span>
          </button>
          <button onClick={handleLang}>
            <i className="icon-language"></i>
            <span>{datas?.language}</span>
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
}
