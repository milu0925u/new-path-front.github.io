import React, { useState, useEffect } from 'react'
import style from './setting.module.scss'
import OrangeButton from '@/component/button/orange-button'
import { useSelector, useDispatch } from 'react-redux'
import WorkNameList from '@/component/nosharable/setting/workway/work-name-list'
import { useRouter } from 'next/router'
import { createdNameWorkingAction } from '@/redux/actions/ListAction'
import { pageNextAction } from '@/redux/actions/publicAction'
import RWDTitle from '@/component/layout/rwd-title'
import ReturnBlueButton from '@/component/button/return-blue-button'
import ReturnWhiteButton from '@/component/button/return-white-button'
import toast from 'react-hot-toast'

export default function Setting() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { datas } = useSelector((state) => state.public)
  const { create } = useSelector((state) => state.workList)

  const [name, setName] = useState()

  // page
  const handleReturn = () => {
    dispatch(pageNextAction('workway'))
  }
  const handleNext = async () => {
    const error = checkHasError()
    if (!error) {
      dispatch(createdNameWorkingAction(name, create.way))
    } else {
      toast.error('請輸入加工設定名稱')
    }
  }
  // check input
  const checkHasError = () => {
    if (!name) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="container">
      <RWDTitle title={datas.pathgeneration} icon="icon-choose-work-way">
        <ReturnWhiteButton handleReturnBTN={handleReturn} />
        <button className="rwd-display-none-btn"></button>
      </RWDTitle>
      <div className="content content-pd">
        <div className={style.write_work_setting_name}>
          <WorkNameList setName={setName} />
          <div className={style.write_work_setting_name_btn}>
            <ReturnBlueButton handleReturnBTN={handleReturn} />
            <OrangeButton
              text={datas.confirm}
              icon="icon-ok"
              handleOrangeBTN={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
