import style from '@/component/navbar/navbar.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { unityOpenAction, unityCloseAction } from '@/redux/actions/publicAction'
import LayoutMain from '@/component/layout/layout-main'
export default function Model() {
  const dispatch = useDispatch()
  const { datas, unity } = useSelector((state) => state.public)
  // language
  const router = useRouter()
  const handleNavigation = (e) => {
    e.preventDefault()
    let link = e.currentTarget.dataset.href
    if (link.includes('draw')) {
      dispatch(unityOpenAction())
    }
    if (unity) {
      unityLeaveAlert().then((result) => {
        if (result.isConfirmed) {
          dispatch(unityCloseAction())
          router.push(link)
        }
      })
    } else {
      router.push(link)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        router.push('/')
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [router])
  return (
    <LayoutMain>
      <div className="bg-sky"></div>
      <div className="bg-clouds"></div>
      <div className="container">
        <div className={style.mobile_menu}>
          <div className={`${style.title} ${style.title_blue}`}>
            <i className="icon-navbar-title-path"></i>
            <span className={style.title_blue}>
              {datas.pathconfigurationsetup}
            </span>
          </div>

          <div className="content content-pd">
            <ul>
              {datas?.model?.map((item, i) => (
                <li
                  className={style.li_blue}
                  key={item.name}
                  data-href={item.href}
                  onClick={(e) => {
                    handleNavigation(e)
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
    </LayoutMain>
  )
}
