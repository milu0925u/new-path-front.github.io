import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import LeftcontentParam from '@/component/nosharable//info/eq-left-info'

import RWDTitle from '@/component/layout/rwd-title'
import ReturnBlueButton from '@/component/button/return-blue-button'
import ReturnWhiteButton from '@/component/button/return-white-button'
import EquitmentSet from '@/component/nosharable/equitment/equitment-set'
import OrangeButton from '@/component/button/orange-button'

import LayoutMain from '@/component/layout/layout-main'
export default function Equitment() {
  const router = useRouter()

  const { datas } = useSelector((state) => state.public)
  // page
  const handleReturn = () => {
    router.back()
  }
  const handleNext = () => {}

  return (
    <>
      <LayoutMain>
        <div className="bg-execute"></div>
        <div className="container">
          <RWDTitle title={datas.equipmentsetup} icon="icon-execute">
            <ReturnWhiteButton handleReturnBTN={handleReturn} />
            <button className="rwd-display-none-btn"></button>
          </RWDTitle>
          <div className="content">
            <LeftcontentParam />
            <EquitmentSet />
            <div className="rwd-btn">
              <OrangeButton
                text={datas.confirm}
                icon="icon-ok"
                handleOrangeBTN={handleNext}
              />
              <ReturnBlueButton handleReturnBTN={handleReturn} />
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}
