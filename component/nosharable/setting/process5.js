import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import RWDTitle from '@/component/layout/rwd-title'
import ReturnBlueButton from '@/component/button/return-blue-button'
import ReturnWhiteButton from '@/component/button/return-white-button'

import EmptyRunScreen from '@/component/nosharable/info/empty-run-screen'
import OrangeButton from '@/component/button/orange-button'
import LeftcontentParam from '@/component/nosharable/info/eq-left-info'
import { pageNextAction } from '@/redux/actions/publicAction'

export default function EmptyRun() {
  const { datas } = useSelector((state) => state.public)
  const { create } = useSelector((state) => state.workList)
  const dispatch = useDispatch()
  // page
  const handleReturn = () => {
    if (create.method === 'create') {
      dispatch(pageNextAction('param'))
    } else if (create.method === 'modify') {
      dispatch(pageNextAction('edit'))
    } else {
      console.log('找不到正確的create.method')
    }
  }

  return (
    <div className="container">
      <RWDTitle title={datas.dryrun} icon="icon-testrun">
        <ReturnWhiteButton handleReturnBTN={handleReturn} />
        <button className="rwd-display-none-btn"></button>
      </RWDTitle>

      <div className="content">
        <LeftcontentParam />
        <EmptyRunScreen handleOrangeBTN={handleReturn} />
        <div className="rwd-btn">
          <OrangeButton
            text={datas.confirm}
            icon="icon-ok"
            handleOrangeBTN={handleReturn}
          />
          <ReturnBlueButton handleReturnBTN={handleReturn} />
        </div>
      </div>
    </div>
  )
}
