import React from 'react'
import { useSelector } from 'react-redux'

import Process1 from '@/component/nosharable/setting/process1'
import Process2 from '@/component/nosharable/setting/process2'
// import Process3 from '@/component/nosharable/setting/process3'
import Process4 from '@/component/nosharable/setting/process4'
import Process5 from '@/component/nosharable/setting/process5'
import Process4Edit from '@/component/nosharable/setting/process4-edit'

import LayoutMain from '@/component/layout/layout-main'

export default function ProcessingSet() {
  const { pageset } = useSelector((state) => state.public)

  const renderCurrentScreen = () => {
    switch (pageset) {
      case 'workway':
        return <Process1 />
      case 'name':
        return <Process2 />
      // case "view":
      //   return <Process3 />;
      case 'param':
        return <Process4 />
      case 'run':
        return <Process5 />
      case 'edit':
        return <Process4Edit />
      default:
        return <Process1 />
    }
  }
  return (
    <>
      <div className="bg-execute"></div>
      <LayoutMain>{renderCurrentScreen()}</LayoutMain>
    </>
  )
}
