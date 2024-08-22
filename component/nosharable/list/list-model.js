import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import style from './list.module.scss'

import ImportInput from '../../button/import-input'
import WhiteButton from '@/component/button/white-button'

import Search from './model/search'
import ListModelData from './model/list-model-data'
import { readModelAction, SetDrawDataAction } from '@/redux/actions/ListAction'

import { uploadPlyData } from '@/js/scripts'
import toast from 'react-hot-toast'

export default function ListModel({ handleChosenDelete, handleDeleteBTN }) {
  const dispatch = useDispatch()
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const { datas } = useSelector((state) => state.public)
  const { current, data } = useSelector((state) => state.modelList)

  // 所有資料 / 顯示資料
  const [alldatasList, setAllDatasList] = useState([])
  const [datasList, setDatasList] = useState([])
  useEffect(() => {
    if (data) {
      setAllDatasList(data)
      setDatasList(data)
    }
  }, [data])

  const [currentId, setCurrentId] = useState()
  useEffect(() => {
    if (current) {
      setCurrentId(current.id)
    }
  }, [current])

  //附帶檔案
  const handleImportData = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('model', file)
    if (file) {
      await uploadPlyData(formData)
      dispatch(readModelAction())
      e.target.files = null
    } else {
      toast.error('請選擇檔案')
    }
  }

  // choose
  const handleChoose = (e) => {
    const id = Number(e.currentTarget.dataset.id)
    if (id) {
      const [currentData] = datasList.filter((item) => item.id == id)
      let newData = {
        ...currentData,
        model_path: `${domain}/${currentData.model_path}`,
        image_path: `${domain}/${currentData.image_path}`,
      }
      dispatch(SetDrawDataAction(newData))
      localStorage.setItem('model', JSON.stringify(newData))
    }
  }

  return (
    <div className={`${style.col_list} ${style.col_list_bg}`}>
      <div className={style.list_f}>
        <Search alldatasList={alldatasList} setDatasList={setDatasList} />
        <ImportInput
          text={datas.importmodel}
          icon="icon-import"
          handleOrangeBTN={handleImportData}
        />
        <WhiteButton
          text={datas.delete}
          icon="icon-delete"
          handleBlueBTN={handleDeleteBTN}
        />
      </div>
      <div className={style.list_model}>
        <div className={style.list_model_title}>
          <div></div>
          <div>{datas.modelname}</div>
          <div>{datas.creationtime}</div>
        </div>
        <ListModelData
          currentid={currentId}
          datasList={datasList}
          handleChosenDelete={handleChosenDelete}
          handleChoose={handleChoose}
        />
      </div>
    </div>
  )
}
