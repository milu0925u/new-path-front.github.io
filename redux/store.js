import { configureStore } from '@reduxjs/toolkit'
import { publicReducer } from './reducers/publicReducer'
import {
  modelReducer,
  pointReducer,
  pathReducer,
  workingReducer,
  centralControlReducer,
  abnormalLogReducer,
} from './reducers/listReducer'

const reducer = {
  public: publicReducer,
  modelList: modelReducer,
  pointList: pointReducer,
  pathList: pathReducer,
  workList: workingReducer,
  centralControl: centralControlReducer,
  log: abnormalLogReducer,
}

const preloadedState = {}

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
})
