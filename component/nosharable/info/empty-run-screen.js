import React from 'react'
// import style from "./runscreen.module.scss";
import style from './info.module.scss'
import { useSelector } from 'react-redux'
import OrangeButton from '@/component/button/orange-button'
import CameraLine from '@/component/nosharable/model/ff/camera-line'
export default function EmptyRunScreen({ handleOrangeBTN }) {
  const { datas } = useSelector((state) => state.public)
  return (
    <div className={style.l_row_right_info}>
      <div className={style.col_row_right_info}>
        <div className={style.test_screen}>
          <CameraLine />
        </div>
        <div className={style.test_btn}>
          <OrangeButton
            text={datas.confirm}
            icon="icon-ok"
            handleOrangeBTN={handleOrangeBTN}
          />
        </div>
      </div>
    </div>
  )
}
