import {
  DATA_MODEL_READ,
  DATA_MODEL_DELETE,
  DATA_MODEL_CHOSEN,
  DATA_POINT_READ,
  DATA_POINT_DELETE,
  DATA_POINT_CHOSEN,
  DATA_PATH_READ,
  DATA_PATH_DELETE,
  DATA_PATH_CHOSEN,
  DATA_WORKING_READ,
  DATA_WORKING_METHOD,
  DATA_WORKING_CREATE_CLEAR,
  DATA_WORKING_CREATE_NAME,
  DATA_WORKING_CREATE_WAY,
  DATA_WORKING_CREATE_PARAM,
  DATA_WORKING_DELETE,
  DATA_WORKING_CHOSEN,
  DATA_CENTER_CONTROL_READ,
  DATA_ABNORMAL_LOG_READ,
} from '../constants'

let initialA = { current: {}, data: [] }
let initialB = { current: {}, data: [] }
let initialC = { current: {}, data: [] }
let initialD = { current: {}, data: [], create: {} }
let initialE = { data: [] }
let initialF = { data: [] }

export const modelReducer = (state = initialA, action) => {
  switch (action.type) {
    case DATA_MODEL_READ: {
      return { ...state, data: action.payload }
    }
    case DATA_MODEL_DELETE: {
      return { ...state, data: action.payload }
    }
    case DATA_MODEL_CHOSEN: {
      return { ...state, current: action.payload }
    }
    default:
      return state
  }
}

export const pointReducer = (state = initialB, action) => {
  switch (action.type) {
    case DATA_POINT_READ: {
      return { ...state, data: action.payload }
    }
    case DATA_POINT_DELETE: {
      return { ...state, data: action.payload }
    }
    case DATA_POINT_CHOSEN: {
      return { ...state, current: action.payload }
    }
    default:
      return state
  }
}

export const pathReducer = (state = initialC, action) => {
  switch (action.type) {
    case DATA_PATH_READ: {
      return { ...state, data: action.payload }
    }
    case DATA_PATH_DELETE: {
      return { ...state, data: action.payload }
    }
    case DATA_PATH_CHOSEN: {
      return { ...state, current: action.payload }
    }
    default:
      return state
  }
}

export const workingReducer = (state = initialD, action) => {
  switch (action.type) {
    case DATA_WORKING_READ: {
      return { ...state, data: action.payload }
    }
    case DATA_WORKING_DELETE: {
      return { ...state, data: action.payload }
    }
    case DATA_WORKING_CHOSEN: {
      return { ...state, current: action.payload }
    }
    case DATA_WORKING_CREATE_CLEAR: {
      return { ...state, create: {} }
    }
    case DATA_WORKING_CREATE_WAY: {
      let wayid
      switch (action.payload) {
        case 1:
        case 'weld': {
          wayid = 'weld'
          break
        }
        case 2:
        case 'polish': {
          wayid = 'polish'
          break
        }
        case 3:
        case 'debur': {
          wayid = 'debur'
          break
        }
        case 4:
        case 'spray': {
          wayid = 'spray'
          break
        }
        case 5:
        case 'drill': {
          wayid = 'drill'
          break
        }
        case 6:
        case 'glue': {
          wayid = 'glue'
          break
        }
        case 7:
        case 'cut': {
          wayid = 'cut'
          break
        }
      }
      return { ...state, create: { way: wayid } }
    }
    case DATA_WORKING_CREATE_NAME: {
      return { ...state, create: { ...state.create, name: action.payload } }
    }
    case DATA_WORKING_CREATE_PARAM: {
      return {
        ...state,
        create: {
          ...state.create,
          [action.payload.name]: action.payload.value,
        },
      }
    }

    case DATA_WORKING_METHOD:
      return { ...state, create: { ...state.create, method: action.payload } }
    default:
      return state
  }
}
export const centralControlReducer = (state = initialE, action) => {
  switch (action.type) {
    case DATA_CENTER_CONTROL_READ:
      let work
      const updatedData = action.payload.map((item) => {
        switch (item.method) {
          case 1:
          case 'weld': {
            work = '焊接加工'
            break
          }

          case 2:
          case 'polish': {
            work = '拋光加工'
            break
          }

          case 3:
          case 'debur': {
            work = '去毛邊加工'
            break
          }

          case 4:
          case 'spray': {
            work = '噴塗加工'
            break
          }

          case 5:
          case 'drill': {
            work = '鑽孔加工'
            break
          }

          case 6:
          case 'glue': {
            work = '塗膠加工'
            break
          }

          case 7:
          case 'cut': {
            work = '切割加工'
            break
          }
        }
        return { ...item, work }
      })
      return { ...state, data: updatedData }
    default:
      return state
  }
}
export const abnormalLogReducer = (state = initialF, action) => {
  switch (action.type) {
    case DATA_ABNORMAL_LOG_READ: {
      return { ...state, data: action.payload }
    }
    default:
      return state
  }
}
