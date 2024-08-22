import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import RWDTitle from '@/component/layout/rwd-title'
import {
  pageNextAction,
  pagePreviousAction,
} from '@/redux/actions/publicAction'

import ViewCreate from './viewscan/view-create'
import ViewFunction from './viewscan/view-function'

import ReturnBlueButton from '@/component/button/return-blue-button'
import ReturnWhiteButton from '@/component/button/return-white-button'
export default function Process3() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { datas } = useSelector((state) => state.public)

  // page
  const handleReturn = () => {
    dispatch(pageNextAction('workway'))
  }
  const handleNext = () => {
    dispatch(pagePreviousAction('param'))
    dispatch(pageNextAction('param'))
  }

  return (
    <div className="container">
      <RWDTitle>
        <ReturnWhiteButton handleReturnBTN={handleReturn} />
        <button className="rwd-display-none-btn"></button>
      </RWDTitle>
      <div className="content content-pd">
        <ViewCreate />
        <ViewFunction handleOrangeBTN={handleNext} />
        <div className="rwd-btn">
          <OrangeButton
            text={datas.confirm}
            icon="icon-ok"
            handleOrangeBTN={handleOrangeBTN}
          />
          <ReturnBlueButton handleReturnBTN={handleReturn} />
        </div>
      </div>
    </div>
  )
}
