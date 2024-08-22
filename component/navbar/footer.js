import style from './navbar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { unityOpenAction, unityCloseAction } from '@/redux/actions/publicAction'
import { unityLeaveAlert } from '@/component/alert/alert'

export default function Footer() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { unity, datas } = useSelector((state) => state.public)
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

  return (
    <div className={style.footer}>
      {datas?.mobile?.map((item) => (
        <div
          key={item.name}
          data-href={item.href}
          onClick={(e) => {
            handleNavigation(e)
          }}
        >
          <i className={item.icon}></i>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}
