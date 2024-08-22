import React, { useEffect } from 'react'
import { tw } from '@/public/locales/all-tw-lang.js'
import { en } from '@/public/locales/all-en-lang.js'
import { datasAction } from '@/redux/actions/publicAction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

export default function Language() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    if (locale === 'tw') {
      dispatch(datasAction(tw))
    } else if (locale === 'en') {
      dispatch(datasAction(en))
    }
  }, [locale, dispatch])

  return <></>
}
