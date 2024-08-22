import React from 'react'
import style from './runscreen.module.scss'
import { useSelector } from 'react-redux'
import OrangeButton from '@/component/button/orange-button'
import CameraLine from '@/component/nosharable/model/ff/camera-line'
import RedButton from '@/component/button/red-button'
import GreenButton from '@/component/button/green-button'
import BlueButton from '@/component/button/blue-button'
import WhiteButton from '@/component/button/white-button'
export default function RunScreen({
  handleGreenBTN,
  handleRedBTN,
  handleBlueBTN,
  handleOrangeBTN,
}) {
  const { datas } = useSelector((state) => state.public)
  return (
    <div className={style.l_run}>
      <div className={style.run_screen}>
        {/* <img alt=" " src="/images/testimg.png" /> */}
        <CameraLine />
      </div>
      <div className={style.run_btn}>
        <GreenButton
          text={datas.start}
          icon="icon-start"
          handleGreenBTN={handleGreenBTN}
        />
        <RedButton
          text={datas.stop}
          icon="icon-stop"
          handleRedBTN={handleRedBTN}
        />
        <BlueButton
          text={datas.pause}
          icon="icon-pause"
          handleBlueBTN={handleBlueBTN}
        />
        <OrangeButton
          text={datas.confirm}
          icon="icon-ok"
          handleOrangeBTN={handleOrangeBTN}
        />
      </div>
      <div className={style.rwd_run_btn}>
        <WhiteButton
          text={datas.start}
          icon="icon-start"
          handleGreenBTN={handleGreenBTN}
        />
        <WhiteButton
          text={datas.stop}
          icon="icon-stop"
          handleRedBTN={handleRedBTN}
        />
        <WhiteButton
          text={datas.pause}
          icon="icon-pause"
          handleBlueBTN={handleBlueBTN}
        />
      </div>
    </div>
  )
}
