import style from "@/component/navbar/navbar.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  unityOpenAction,
  unityCloseAction,
} from "@/redux/actions/publicAction";

export default function Model() {
  const dispatch = useDispatch();
  const { datas, unity } = useSelector((state) => state.public);
  // language
  const router = useRouter();
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
      <div className="bg-sky bg-size"></div>
      <div className="bg-clouds bg-size"></div>
      <div className="container">
        <div className={style.mobile_menu}>
          <div className={`${style.mobile_menu_title} ${style.blue}`}>
            <i className="icon-navbar-title-path"></i>
            <span>{datas.pathconfigurationsetup}</span>
          </div>

          <div className="content content-width">
            <ul>
              {datas?.model?.map((item, i) => (
                <li
                  className={style.blue}
                  key={i}
                  data-href={item.href}
                  onClick={handleNavigation}
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
