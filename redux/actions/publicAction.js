import {
  PUBLIC_PAGE_DATA,
  // PUBLIC_LANGUAGE,
  PUBLIC_UNITY,
  // PUBLIC_CAMERA_STATE,
  PUBLIC_CURRENT_PAGE,
  PUBLIC_PREVIOUS_PAGE,
} from '../constants'

export const datasAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_PAGE_DATA,
      payload: data,
    })
  } catch (error) {
    console.log('未抓到此頁資料')
  }
}

// export const languageAction = (language) => async (dispatch) => {
//   try {
//     const word = language
//     dispatch({
//       type: PUBLIC_LANGUAGE,
//       payload: word,
//     })
//     localStorage.setItem('language', word)
//   } catch (error) {
//     console.log('未偵測到語言')
//   }
// }

export const unityOpenAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_UNITY,
      payload: true,
    })
  } catch (error) {
    console.log('加載unity失敗')
  }
}
export const unityCloseAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_UNITY,
      payload: false,
    })
  } catch (error) {
    console.log('卸載unity失敗')
  }
}

// export const CameraOpenAction = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: PUBLIC_CAMERA_STATE,
//       payload: true,
//     })
//   } catch (error) {
//     console.log('開啟相機失敗')
//   }
// }
// export const CameraCloseAction = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: PUBLIC_CAMERA_STATE,
//       payload: false,
//     })
//   } catch (error) {
//     console.log('開啟相機失敗')
//   }
// }

export const pageNextAction = (page) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_CURRENT_PAGE,
      payload: page,
    })
  } catch (error) {
    console.log('跳頁失敗')
  }
}

export const pagePreviousAction = (page) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_PREVIOUS_PAGE,
      payload: page,
    })
  } catch (error) {
    console.log('上頁失敗')
  }
}
