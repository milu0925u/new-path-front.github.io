import React from 'react'
import style from './rwd-title.module.scss'

export default function RWDTitle({
  children,
  title,
  icon,
  switchState,
  handleclose,
  bgcolor,
}) {
  return (
    <div className={style.l_banner}>
      {children[0]}
      <div
        className={`${style.col_banner} ${bgcolor == 1 ? style.blue_bg : style.orange_bg}`}
      >
        <i className={icon}></i>
        <div>{title}</div>
      </div>
      <div className={style.banner_btn_group}>
        {!switchState ? children[1] : ''}
        <div
          className={`${style.banner_btn_group_child} ${
            switchState ? style.on : style.off
          }`}
        >
          {children[2]}
          {children[3]}
          <button
            className={` ${switchState ? style.on : style.off}`}
            onClick={handleclose}
          >
            <i className="icon-cancle"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
