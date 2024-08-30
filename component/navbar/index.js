import style from "./navbar.module.scss";
import { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";
import { pageNextAction } from "@/redux/actions/publicAction";
import { unityLeaveAlert } from "@/component/alert/alert";
export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { datas, unity } = useSelector((state) => state.public);
  const handleNavigation = (e) => {
    e.preventDefault();
    let link = e.currentTarget.dataset.href;
    console.log(link);

    if (link.includes("draw")) {
      dispatch(unityOpenAction());
    }
    if (unity) {
      unityLeaveAlert().then((result) => {
        if (result.isConfirmed) {
          dispatch(unityCloseAction());
          router.push(link);
        }
      });
    } else {
      router.push(link);
    }
  };

  // navbar > and <
  const [click, setClick] = useState(true);
  const handleClick = () => {
    setClick(!click);
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleResize = () => {
    if (window.innerWidth > 1400) {
      setClick(true);
    }
  };

  return (
    <div
      className={`${style.navbar} ${
        click ? style.navbar_open : style.navbar_close
      }`}
    >
      <div className={style.navbar_body}>
        <ul>
          {click ? (
            <li className={style.title}>
              <span className={style.one}>{datas.pathconfigurationsetup}</span>
            </li>
          ) : (
            <li></li>
          )}
          {datas?.model?.map((item) => (
            <li
              key={item.name}
              data-href={item.href}
              onClick={(e) => {
                handleNavigation(e);
              }}
              role="button"
            >
              <i className={item.icon}></i>
              {click ? <div>{item.name}</div> : ""}
            </li>
          ))}
        </ul>
        <ul>
          {click ? (
            <li className={style.title}>
              <span className={style.two}>{datas.executeprocessing}</span>
            </li>
          ) : (
            <li>　　</li>
          )}
          {datas?.execute?.map((item) => (
            <li
              key={item.name}
              data-href={item.href}
              onClick={(e) => {
                handleNavigation(e);
              }}
            >
              <i className={item.icon}></i>
              {click ? <div>{item.name}</div> : ""}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`${style.bar} ${click ? style.barOpen : style.barClose}`}
        onClick={handleClick}
      >
        <i className="icon-bar">
          <i className="path1"></i>
          <i className="path2"></i>
          <i className="path3"></i>
        </i>
      </button>
    </div>
  );
}
