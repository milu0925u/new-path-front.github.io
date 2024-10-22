import style from "@/component/navbar/navbar.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";
import { useRouter } from "next/router";

export default function Processing() {
  // language
  const { datas, unity } = useSelector((state) => state.public);
  const router = useRouter();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        router.push("/");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);

  return (
    <>
      <div className="bg-execute"></div>
      <div className="container">
        <div className={style.mobile_menu}>
          <div className={`${style.title} ${style.title_orange}`}>
            <i className="icon-navbar-title-execute"></i>
            <span>{datas.executeprocessing}</span>
          </div>
          <div className="content content-pd">
            <ul>
              {datas?.execute?.map((item) => (
                <li
                  role="button"
                  className={style.li_orange}
                  key={item.name}
                  data-href={item.href}
                  onClick={(e) => {
                    handleNavigation(e);
                  }}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
