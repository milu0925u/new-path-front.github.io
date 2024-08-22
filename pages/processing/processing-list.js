import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ListWork from '@/component/nosharable/list/list-work'
import ChooseWorkCut from '@/component/nosharable/list/choose/choose-work-cut'
import ChooseWorkPolish from '@/component/nosharable/list/choose/choose-work-polish'
import ChooseWorkSpray from '@/component/nosharable/list/choose/choose-work-spray'
import ChooseWorkGlue from '@/component/nosharable/list/choose/choose-work-glue'
import ChooseWorkDebur from '@/component/nosharable/list/choose/choose-work-debur'
import ChooseWorkDrill from '@/component/nosharable/list/choose/choose-work-drill'
import ChooseWorkWeld from '@/component/nosharable/list/choose/choose-work-weld'

import RWDTitle from '@/component/layout/rwd-title'
import WhiteButton from '@/component/button/white-button'

import { modifyAlert, deleteAlert } from '@/component/alert/alert'
import toast from 'react-hot-toast'
import LayoutMain from '@/component/layout/layout-main'

import {
  pageNextAction,
  pagePreviousAction,
} from '@/redux/actions/publicAction'

import {
  readWorkingAction,
  SetWorkingDataAction,
  deleteWorkingDataAction,
  editNameWorkingAction,
  createdWayWorkingAction,
  wirteParamWorkingAction,
} from '@/redux/actions/ListAction'
import { useRouter } from 'next/router'
import BlueButton from '@/component/button/blue-button'
import OrangeButton from '@/component/button/orange-button'
export default function ProcessingList() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { datas } = useSelector((state) => state.public)
  const { data, current } = useSelector((state) => state.workList)
  const [select, setSelected] = useState('weld')
  useEffect(() => {
    dispatch(readWorkingAction(select))
    dispatch(SetWorkingDataAction())
  }, [select])

  const handleReturn = () => {
    router.back()
  }
  const handleNext = () => {
    alert('跳轉至選擇的加工方式的手臂操作-目前未完成')
  }

  const renderChoose = () => {
    switch (select) {
      case 'weld':
        return <ChooseWorkWeld handleOrangeBTN={handleNext} />
      case 'polish':
        return <ChooseWorkPolish handleOrangeBTN={handleNext} />
      case 'debur':
        return <ChooseWorkDebur handleOrangeBTN={handleNext} />
      case 'spray':
        return <ChooseWorkSpray handleOrangeBTN={handleNext} />
      case 'drill':
        return <ChooseWorkDrill handleOrangeBTN={handleNext} />
      case 'glue':
        return <ChooseWorkGlue handleOrangeBTN={handleNext} />
      case 'cut':
        return <ChooseWorkCut handleOrangeBTN={handleNext} />
      default:
        return <ChooseWorkWeld handleOrangeBTN={handleNext} />
    }
  }

  // 選擇的加工方式list
  const handleSelect = (e) => {
    dispatch(readWorkingAction(e.target.dataset.value))
    setSelected(e.target.dataset.value)
    setCurrentId()
  }
  // delete item
  const [deleteItem, setDeleteItem] = useState([])
  const handleChosenDelete = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setDeleteItem((prev) => [...prev, Number(value)])
    } else {
      setDeleteItem((prev) => prev.filter((item) => item !== Number(value)))
    }
  }
  const handleDeleteBTN = () => {
    if (deleteItem.length > 0) {
      deleteAlert().then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteWorkingDataAction(select, deleteItem))
          setDeleteItem([])
        }
      })
    } else {
      toast.error('未選擇刪除項目')
    }
  }
  // modify item
  const handleModifyBTN = () => {
    if (!current) {
      toast.error('你未選擇要編輯的清單')
    } else {
      modifyAlert().then((result) => {
        if (result.isConfirmed) {
          router.push('/processing/processing-set')
          dispatch(createdWayWorkingAction(select))
          dispatch(editNameWorkingAction(current.name, 'modify'))
          dispatch(pageNextAction('edit'))
          dispatch(pagePreviousAction('edit'))
          Object.entries(current).forEach(([key, value]) => {
            dispatch(wirteParamWorkingAction(key, value))
          })
        }
      })
    }
  }
  // choose current
  const [currentId, setCurrentId] = useState()
  useEffect(() => {
    if (current) {
      setCurrentId(current.id)
    }
  }, [current])
  const handleChoose = (e) => {
    const id = Number(e.currentTarget.dataset.id)
    if (id) {
      const [newData] = data.data.filter((item) => item.id == id)
      dispatch(SetWorkingDataAction(newData))
    }
  }
  return (
    <LayoutMain>
      <div className="bg-execute"></div>
      <div className="container">
        <RWDTitle
          title={datas.processingconfigurationlist}
          icon="icon-processing-list"
        >
          <WhiteButton
            text={datas.back}
            icon="icon-return-back"
            handleBlueBTN={handleReturn}
          />
          <WhiteButton
            text={datas.modify}
            icon="icon-editset"
            handleBlueBTN={handleModifyBTN}
          />
          <WhiteButton
            text={datas.delete}
            icon="icon-delete"
            handleBlueBTN={handleDeleteBTN}
          />
        </RWDTitle>
        <div className="content content-work-list-top">
          <ListWork
            select={select}
            handleSelect={handleSelect}
            currentId={currentId}
            handleChoose={handleChoose}
            handleModifyBTN={handleModifyBTN}
            handleDeleteBTN={handleDeleteBTN}
            handleChosenDelete={handleChosenDelete}
          />
          {renderChoose()}
          <div className="rwd-btn">
            <OrangeButton
              text={datas.executeprocessing}
              icon="icon-execute-work"
              handleOrangeBTN={handleNext}
            />
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
