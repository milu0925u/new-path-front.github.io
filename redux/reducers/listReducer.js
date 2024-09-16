import { current } from "@reduxjs/toolkit";
import {
  DATA_MODEL_READ,
  DATA_MODEL_CHOSEN,
  DATA_MODEL_DELETE,
  DATA_POINT_READ,
  DATA_POINT_CHOSEN,
  DATA_POINT_DELETE,
  DATA_PATH_READ,
  DATA_PATH_CHOSEN,
  DATA_PATH_DELETE,
  DATA_WORKING_READ,
  DATA_WORKING_CHOSEN,
  DATA_WORKING_DELETE,
  DATA_WORKING_UPDATE,
  DATA_WORKING_CREATE,
  DATA_WORKING_CREATE_SAVE,
  DATA_EQUITMENT_READ,
  PUBLIC_LOADING,
  DATA_CENTER_CONTROL_READ,
  DATA_ABNORMAL_LOG_READ,
  DATA_EQUITMENT_READ_DEFAULT,
} from "../constants";

let init_model = { current: {}, data: [] };
let init_point = { current: {}, data: [] };
let init_path = { current: {}, data: [] };
let init_work = {
  current: {},
  data: [],
  eqdata: [],
  create: { deep: 0 },
  eqdatadefault: [],
};
let init_center = { data: [] };
let init_log = { data: [] };

// 所有模型、標點清單
export const modelReducer = (state = init_model, action) => {
  switch (action.type) {
    case DATA_MODEL_READ: {
      return { ...state, data: action.payload };
    }
    case DATA_MODEL_DELETE: {
      return { ...state, data: action.payload };
    }
    case DATA_MODEL_CHOSEN: {
      return { ...state, current: action.payload };
    }
    default:
      return state;
  }
};
export const pointReducer = (state = init_point, action) => {
  switch (action.type) {
    case DATA_POINT_READ: {
      return { ...state, data: action.payload };
    }
    case DATA_POINT_DELETE: {
      return { ...state, data: action.payload };
    }
    case DATA_POINT_CHOSEN: {
      return { ...state, current: action.payload };
    }
    default:
      return state;
  }
};
export const pathReducer = (state = init_path, action) => {
  switch (action.type) {
    case DATA_PATH_READ: {
      return { ...state, data: action.payload };
    }
    case DATA_PATH_DELETE: {
      return { ...state, data: action.payload };
    }
    case DATA_PATH_CHOSEN: {
      return { ...state, current: action.payload };
    }
    default:
      return state;
  }
};
// 加工參數
export const workingReducer = (state = init_work, action) => {
  switch (action.type) {
    case DATA_WORKING_READ: {
      return { ...state, data: action.payload };
    }
    case DATA_WORKING_DELETE: {
      return { ...state, data: action.payload, current: {} };
    }
    case DATA_WORKING_CHOSEN: {
      return { ...state, current: action.payload };
    }
    case DATA_WORKING_CREATE: {
      return { ...state, create: { ...state.create, ...action.payload } };
    }
    case DATA_WORKING_CREATE_SAVE: {
      return { ...state, create: {} };
    }
    case DATA_EQUITMENT_READ: {
      return { ...state, eqdata: action.payload };
    }
    case DATA_EQUITMENT_READ_DEFAULT: {
      return { ...state, eqdatadefault: action.payload };
    }
    default:
      return state;
  }
};
export const centralControlReducer = (state = init_center, action) => {
  switch (action.type) {
    case DATA_CENTER_CONTROL_READ:
      let work;
      const updatedData = action.payload.map((item) => {
        switch (item.method) {
          case 1:
          case "weld": {
            work = "焊接加工";
            break;
          }

          case 2:
          case "polish": {
            work = "拋光加工";
            break;
          }

          case 3:
          case "debur": {
            work = "去毛邊加工";
            break;
          }

          case 4:
          case "spray": {
            work = "噴塗加工";
            break;
          }

          case 5:
          case "drill": {
            work = "鑽孔加工";
            break;
          }

          case 6:
          case "glue": {
            work = "塗膠加工";
            break;
          }

          case 7:
          case "cut": {
            work = "切割加工";
            break;
          }
        }
        return { ...item, work };
      });
      return { ...state, data: updatedData };
    default:
      return state;
  }
};
export const abnormalLogReducer = (state = init_log, action) => {
  switch (action.type) {
    case DATA_ABNORMAL_LOG_READ: {
      return { ...state, data: action.payload };
    }
    default:
      return state;
  }
};
