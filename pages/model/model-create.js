import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import OrangeButton from '@/component/button/orange-button'
import RWDTitle from '@/component/layout/rwd-title'

import CameraCreateScreen from '@/component/nosharable/model/camera-create-screen'
import CameraCreateFunction from '@/component/nosharable/model/camera-create-function'
import CameraViewScreen from '@/component/nosharable/model/camera-view-screen'
import CameraViewName from '@/component/nosharable/model/camera-view-name'

import { pageNextAction } from '@/redux/actions/publicAction'
import ReturnWhiteButton from '@/component/button/return-white-button'
import ReturnBlueButton from '@/component/button/return-blue-button'

import LayoutMain from '@/component/layout/layout-main'

export default function ModelCreate() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { datas, pageset } = useSelector((state) => state.public)

  // 設定目前分頁
  useEffect(() => {
    dispatch(pageNextAction('connect'))
  }, [dispatch])

  // 編輯名稱
  const [modelName, setModelName] = useState(null)
  const handleNameSet = (e) => {
    const newName = e?.target.value
    setModelName(newName)
  }

  // return page
  const handleReturn = () => {
    if (pageset == 'connect-view') {
      dispatch(pageNextAction('connect'))
    } else {
      router.back()
    }
  }

  // next page
  const handleNext = () => {
    if (pageset == 'connect') {
      dispatch(pageNextAction('connect-view'))
    } else if (pageset == 'connect-view') {
      router.push('/model/model-list')
    }
  }

  return (
    <>
      {pageset === 'connect' ? (
        <LayoutMain>
          <div className="bg-clouds"></div>
          <div className="bg-sky"></div>
          <div className="container">
            <RWDTitle title={datas.scanningobject} icon="icon-scan" bgcolor="1">
              <ReturnWhiteButton handleReturnBTN={handleReturn} />
              <button className="rwd-display-none-btn"></button>
            </RWDTitle>
            <div className="content content-pd content-blue-full">
              <CameraCreateScreen handleBlueBTN={handleReturn} />
              <CameraCreateFunction>
                <OrangeButton
                  text={datas.startscanning}
                  icon="icon-scan"
                  handleOrangeBTN={handleNext}
                />
              </CameraCreateFunction>
              <div className="rwd-btn">
                <OrangeButton
                  text={datas.startscanning}
                  icon="icon-scan"
                  handleOrangeBTN={handleNext}
                />
                <ReturnBlueButton handleReturnBTN={handleReturn} />
              </div>
            </div>
          </div>
        </LayoutMain>
      ) : (
        <LayoutMain>
          <div className="bg-clouds"></div>
          <div className="bg-sky"></div>
          <div className="container">
            <RWDTitle title={datas.viewmodel} icon="icon-view-scan" bgcolor="1">
              <ReturnWhiteButton handleReturnBTN={handleReturn} />
              <button className="rwd-display-none-btn"></button>
            </RWDTitle>
            <div className="content content-pd content-blue-full">
              <CameraViewScreen handleBlueBTN={handleReturn} />
              <CameraViewName
                modelName={modelName}
                handleNameSet={handleNameSet}
              >
                <OrangeButton
                  text={datas.savemodel}
                  icon="icon-save"
                  handleOrangeBTN={handleNext}
                />
              </CameraViewName>

              <div className="rwd-btn">
                <OrangeButton
                  text={datas.savemodel}
                  icon="icon-save"
                  handleOrangeBTN={handleNext}
                />
                <ReturnBlueButton handleReturnBTN={handleReturn} />
              </div>
            </div>
          </div>
        </LayoutMain>
      )}
    </>
  )
}
