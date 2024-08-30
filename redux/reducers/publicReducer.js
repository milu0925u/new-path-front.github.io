import {
  PUBLIC_LANGUAGE,
  PUBLIC_UNITY,
  PUBLIC_CAMERA_STATE,
  PUBLIC_PAGE_DATA,
  PUBLIC_CURRENT_PAGE,
  PUBLIC_PREVIOUS_PAGE,
  PUBLIC_LOADING,
} from "../constants";

let initial = {
  loading: false,
  language: null,
  unity: false,
  camera: null,
  robot: false,
  equitment: false,
  prevpage: "/",
  pageset: null, //當前頁面名稱
  datas: {},
};
export const publicReducer = (state = initial, action) => {
  switch (action.type) {
    case PUBLIC_PAGE_DATA:
      return { ...state, datas: action.payload };
    case PUBLIC_LANGUAGE:
      return { ...state, language: action.payload };
    case PUBLIC_UNITY:
      return { ...state, unity: action.payload };
    case PUBLIC_CAMERA_STATE:
      return { ...state, camera: action.payload };
    case PUBLIC_CURRENT_PAGE:
      return { ...state, pageset: action.payload };
    case PUBLIC_PREVIOUS_PAGE:
      return { ...state, prepage: action.payload };
    case PUBLIC_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
