import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import BlueButton from '@/component/button/blue-button'
import CCLeft from '@/component/nosharable/info/cc-left-info'
import {
  readcontrolAction,
  readabnormallogAction,
} from '@/redux/actions/ListAction'

import ReturnWhiteButton from '@/component/button/return-white-button'

import RWDTitle from '@/component/layout/rwd-title'
import LayoutMain from '@/component/layout/layout-main'
export default function AbnormalLog() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { datas } = useSelector((state) => state.public)
  useEffect(() => {
    dispatch(readcontrolAction())
    dispatch(readabnormallogAction())
  }, [])

  const handleReturn = () => {
    router.back()
  }
  return (
    <LayoutMain>
      <div className="bg-abnormal"></div>
      <div className="container">
        <RWDTitle icon="icon-abnormal-log" title={datas.abnormalsignalrecord}>
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <CCLeft />
          <div className="rwd-btn">
            <BlueButton
              text={datas.back}
              icon="icon-return-back"
              handleBlueBTN={handleReturn}
            />
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}
