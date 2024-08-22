import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import RWDTitle from '@/component/layout/rwd-title'

import { pageNextAction } from '@/redux/actions/publicAction'
import { SaveSetWorkingAction } from '@/redux/actions/ListAction'
import LeftcontentParam from '@/component/nosharable//info/eq-left-info'
import RightcontentParam from '@/component/nosharable/info/eq-right-info'
import OrangeButton from '@/component/button/orange-button'

import toast from 'react-hot-toast'
import ReturnBlueButton from '@/component/button/return-blue-button'
import ReturnWhiteButton from '@/component/button/return-white-button'

export default function Process4() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { create } = useSelector((state) => state.workList)
  const { datas } = useSelector((state) => state.public)
  // page
  const handleReturn = () => {
    dispatch(pageNextAction('name'))
  }
  const handleNext = () => {
    dispatch(pageNextAction('run'))
  }

  // save param
  const handleSave = async () => {
    const error = checkHasError()
    if (!error) {
      dispatch(SaveSetWorkingAction(create)) //儲存設定
      router.push('/processing/processing-list')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      dispatch(pageNextAction(''))
    }
  }

  // check input
  const checkHasError = () => {
    if (!create?.deep) {
      toast.error('請填入深度')
      return true
    } else if (!create?.electric_current) {
      toast.error('請填入電流')
      return true
    } else if (!create?.voltage) {
      toast.error('請填入電壓')
      return true
    } else if (!create?.speed) {
      toast.error('請填入手臂速度')
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div className="container">
        <RWDTitle
          title={datas.processingsetting}
          icon="icon-armparametersettings"
        >
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>

        <div className="content">
          <LeftcontentParam />
          <RightcontentParam>
            <OrangeButton
              text={datas.dryrun}
              icon="icon-testrun"
              handleOrangeBTN={handleNext}
            />
            <OrangeButton
              text={datas.save}
              icon="icon-save"
              handleOrangeBTN={handleSave}
            />
          </RightcontentParam>
          <div className="rwd-btn">
            <OrangeButton
              text={datas.dryrun}
              icon="icon-testrun"
              handleOrangeBTN={handleNext}
            />
            <OrangeButton
              text={datas.save}
              icon="icon-save"
              handleOrangeBTN={handleSave}
            />
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </>
  )
}
