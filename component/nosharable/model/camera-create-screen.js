import React, { useState } from 'react'
import style from './camera-create.module.scss'
import { useSelector } from 'react-redux'
export default function CameraCreate() {
  const { datas, camera } = useSelector((state) => state.public)
  const pointData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ]
  const [activeIcon, setActiveIcon] = useState(null)

  return (
    <div className={`${style.l_screen} ${style.bg_screen}`}>
      <div className={style.screen_title}>
        {camera ? datas.selectscanningobjectrange : ''}
      </div>
      {camera ? (
        <div className={style.success}>
          {pointData.map((item) => (
            <div
              role="button"
              key={item.id}
              data-id={item.id}
              onClick={(e) => {
                setActiveIcon(e.target.dataset.id)
              }}
            >
              <span>{item.id}.</span>
              <span
                className={activeIcon == item.id ? style.active : ''}
              ></span>
            </div>
          ))}
          <span></span>
          <img alt=" " src="/images/connect/object.svg" />
        </div>
      ) : (
        <div className={style.fail}>
          <img alt=" " src="/images/connect/fail.svg" />
        </div>
      )}
    </div>
  )
}
