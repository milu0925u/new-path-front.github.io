import React from 'react'
import style from './connect.module.scss'
import { useSelector } from 'react-redux'
export default function Connect({ icon }) {
  const { equitment } = useSelector((state) => state.public)

  const renderConnetScreen = () => {
    switch (equitment) {
      case true: {
        return <div className={style.success}></div>
      }
      case false: {
        return (
          <div className={style.fail}>
            <i className="icon-cancle"></i>
          </div>
        )
      }
      default:
        return <div className={style.connect_line}></div>
    }
  }
  return (
    <div className={style.image_block}>
      <i className={icon}></i>
      <div className={style.line}>{renderConnetScreen()}</div>
      <i className="icon-screen"></i>
    </div>
  )
}
