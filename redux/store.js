import { configureStore } from "@reduxjs/toolkit";
import { publicReducer } from "./reducers/publicReducer";
import {
  modelReducer,
  pointReducer,
  pathReducer,
  workingReducer,
  centralControlReducer,
  abnormalLogReducer,
  startReducer,
  eqReducer,
} from "./reducers/listReducer";

const reducer = {
  public: publicReducer,
  modelList: modelReducer,
  pointList: pointReducer,
  pathList: pathReducer,
  workList: workingReducer,
  eq: eqReducer,
  centralControl: centralControlReducer,
  log: abnormalLogReducer,
  start: startReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: reducer,
  preloadedState: preloadedState,
});
