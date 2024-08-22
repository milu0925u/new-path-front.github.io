import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
// import mqtt from 'mqtt'
import LeftcontentParam from '@/component/nosharable//info/eq-left-info'

import RWDTitle from '@/component/layout/rwd-title'
import ReturnBlueButton from '@/component/button/return-blue-button'
import ReturnWhiteButton from '@/component/button/return-white-button'
import RunScreen from '@/component/nosharable/execute/run/run-screen'
import OrangeButton from '@/component/button/orange-button'

import LayoutMain from '@/component/layout/layout-main'
export default function ProcessingView() {
  const router = useRouter()

  const { datas } = useSelector((state) => state.public)
  // page
  const handleReturn = () => {
    router.back()
  }
  const handleNext = () => {}

  // const [message, setMessage] = useState('')
  const handlePause = async () => {}
  const handleStop = async () => {}

  const handleStart = () => {
    // const client = mqtt.connect('http://172.16.11.40:8081')
    // client.on('connect', () => {
    //   const json = { text: 123 }
    //   const payload = JSON.stringify(json, null, 2)
    //   client.publish('ClientJetson1', payload)
    // })
    // client.on('message', (topic, message) => {
    //   setMessage(message.toString())
    //   console.log(`Received message: ${message.toString()}`)
    // })
    // client.on('error', (err) => {
    //   console.error('MQTT Client Error:', err)
    // })
    // client.on('close', () => {
    //   console.log('MQTT Connection Closed')
    // })
    // return () => {
    //   console.log('end')
    //   client.removeAllListeners()
    //   client.end()
    // }
  }

  return (
    <LayoutMain>
      <div className="bg-execute"></div>
      <div className="container">
        <RWDTitle title={datas.processingsetting} icon="icon-processing">
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <LeftcontentParam />
          <RunScreen
            handleOrangeBTN={handleNext}
            handleGreenBTN={handleStart}
            handleRedBTN={handleStop}
            handleBlueBTN={handlePause}
          />
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
  )
}
