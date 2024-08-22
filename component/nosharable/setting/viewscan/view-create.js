import React from 'react'
import style from './view-create.module.scss'
import { useSelector } from 'react-redux'
import CameraLine from '@/component/nosharable/model/ff/camera-line'
import OrangeButton from '@/component/button/orange-button'
export default function ViewCreate({ handleBlueBTN }) {
  const { datas, camera } = useSelector((state) => state.public)

  return (
    <div className={style.content_bg}>
      <h3 className="content-title">
        {camera ? datas.placescanningobject : ''}
      </h3>
      {camera ? (
        <div className={style.success}>
          <CameraLine />
          <div className={style.cameracontent}>
            <img alt=" " src="/images/testimg.png" />
          </div>
          <div className={style.trackPoint}>
            <OrangeButton text={datas.trackpath} icon="icon-camera" />
          </div>
        </div>
      ) : (
        <div className={style.fail}>
          <img alt=" " src="/images/connect/fail.svg" />
        </div>
      )}
    </div>
  )
}
