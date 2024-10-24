import style from "./navbar.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";
import { unityLeaveAlert } from "@/component/alert/alert";
import toast from "react-hot-toast";
export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { datas, unity } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.modelList);
  const handleNavigation = (e) => {
    e.preventDefault();
    let link = e.currentTarget.dataset.href;

    if (link.includes("draw")) {
      dispatch(unityOpenAction());
    }
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

  // navbar > and <
  const [navhide, setnavhide] = useState(true);
  const handleClick = () => {
    setnavhide(!navhide);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleResize = () => {
    if (window.innerWidth > 1400) {
      setnavhide(true);
    }
  };

  return (
    <div className={`${style.navbar} ${navhide ? style.open : style.close}`}>
      <div className={style.navbar_body}>
        <ul>
          {navhide ? (
            <li className={style.navbar_title}>
              <span className={style.one}>{datas.pathconfigurationsetup}</span>
            </li>
          ) : (
            <li></li>
          )}
          {datas?.model?.map((item) => {
            const isClickable = !(
              item.name === "繪製標點" && Object.keys(current).length === 0
            );
            return (
              <li
                key={item.name}
                data-href={item.href}
                onClick={(e) => {
                  if (isClickable) {
                    handleNavigation(e);
                  } else {
                    e.preventDefault();
                    toast.error("請選擇模型");
                  }
                }}
                role="button"
              >
                <i className={item.icon}></i>
                {navhide ? <div>{item.name}</div> : ""}
              </li>
            );
          })}
        </ul>
        <ul>
          {navhide ? (
            <li className={style.navbar_title}>
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
              {navhide ? <div>{item.name}</div> : ""}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`${style.bar} ${navhide ? style.open : style.close}`}
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
