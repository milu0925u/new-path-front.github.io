import {
  DATA_MODEL_READ,
  DATA_MODEL_CHOSEN,
  DATA_MODEL_DELETE,
  DATA_POINT_READ,
  DATA_POINT_CHOSEN,
  DATA_POINT_DELETE,
  DATA_PATH_READ,
  // DATA_PATH_CHOSEN,
  DATA_WORKING_READ,
  DATA_WORKING_CREATE_NAME,
  DATA_WORKING_CREATE_WAY,
  DATA_WORKING_CREATE_PARAM,
  DATA_WORKING_CREATE_CLEAR,
  DATA_WORKING_METHOD,
  DATA_WORKING_CHOSEN,
  DATA_WORKING_DELETE,
  PUBLIC_LOADING,
  DATA_CENTER_CONTROL_READ,
  DATA_ABNORMAL_LOG_READ,
} from "../constants";
import axios from "axios";
import toast from "react-hot-toast";

import {
  pageNextAction,
  pagePreviousAction,
} from "@/redux/actions/publicAction";
const domain = process.env.NEXT_PUBLIC_DOMAIN;

/* ----------- model list ----------- */
export const readModelAction = () => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_LOADING, payload: true });

    const { data } = await axios.get(`${domain}/model`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });
    if (data.success) {
      dispatch({ type: DATA_MODEL_READ, payload: data.data });
      dispatch({ type: PUBLIC_LOADING, payload: false });
    }
  } catch (error) {
    console.log("讀模型失敗", error);
  }
};
export const deleteModelAction = (groupid) => async (dispatch) => {
  try {
    if (groupid.length > 0) {
      const { data } = await axios.delete(`${modeldomain}/${groupid}`);
      if (data.success) {
        toast.success("刪除成功!");
        dispatch({
          type: DATA_MODEL_DELETE,
          payload: data.data,
        });
      }
    } else {
      toast.error("你未選擇項目");
    }
  } catch (error) {
    console.log("模型刪除錯誤", error);
  }
};
export const SetDrawDataAction = (data) => async (dispatch) => {
  try {
    await dispatch({
      type: DATA_MODEL_CHOSEN,
      payload: data,
    });
  } catch (error) {
    console.log("模型current選擇錯誤", error);
  }
};

/* ----------- point list ----------- */
export const readPointAction = () => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_LOADING, payload: true });

    const { data } = await axios.get(`${domain}/point`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });
    if (data.success) {
      dispatch({
        type: DATA_POINT_READ,
        payload: data.data,
      });

      dispatch({ type: PUBLIC_LOADING, payload: false });
    }
  } catch (error) {
    console.log("讀標點失敗", error);
  }
};
export const deletePointAction = (groupid) => async (dispatch) => {
  try {
    if (groupid.length > 0) {
      const { data } = await axios.delete(`${domain}/point/${groupid}`);
      if (data.success) {
        toast.success("刪除成功!");
        dispatch({
          type: DATA_POINT_DELETE,
          payload: data.data,
        });
      }
    } else {
      toast.error("你未選擇項目");
    }
  } catch (error) {
    console.log("標點刪除錯誤", error);
  }
};
export const SetShowDataAction = (data) => (dispatch) => {
  try {
    dispatch({
      type: DATA_POINT_CHOSEN,
      payload: data,
    });
  } catch (error) {
    console.log("標點current選擇錯誤", error);
  }
};

/* ----------- path list ----------- */
export const readPathAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${domain}/path`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });
    dispatch({
      type: DATA_PATH_READ,
      payload: data,
    });
  } catch (error) {
    console.log("讀路徑失敗", error);
  }
};
// export const SetFixDataAction = (data) => (dispatch) => {
//   try {
//     dispatch({
//       type: DATA_PATH_CHOSEN,
//       payload: data,
//     })
//   } catch (error) {}
// }

/* ----------- working list ----------- */
export const readWorkingAction = (work) => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_LOADING, payload: true });

    const { data } = await axios.get(`${domain}/work/${work}`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });
    dispatch({
      type: DATA_WORKING_READ,
      payload: data,
    });

    dispatch({ type: PUBLIC_LOADING, payload: false });
  } catch (error) {
    toast.error("read working fail");
  }
};
export const SetWorkingDataAction = (data) => async (dispatch) => {
  try {
    await dispatch({
      type: DATA_WORKING_CHOSEN,
      payload: data,
    });
  } catch (error) {
    toast.error("choose working fail");
  }
};
export const deleteWorkingDataAction = (way, array) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${domain}/work/delete/${way}`, array);
    if (data?.success === true) {
      dispatch({
        type: DATA_WORKING_DELETE,
        payload: data,
      });
    }
  } catch (error) {
    toast.error("刪除失敗");
  }
};

// ----------- create working list
//PART1 寫入加工方式
export const createdWayWorkingAction = (wayid) => async (dispatch) => {
  dispatch({
    type: DATA_WORKING_CREATE_WAY,
    payload: wayid,
  });
};
//PART2 寫入命名
export const editNameWorkingAction = (name, method) => async (dispatch) => {
  try {
    dispatch({
      type: DATA_WORKING_CREATE_NAME,
      payload: name,
    });
    dispatch({
      type: DATA_WORKING_METHOD,
      payload: method,
    });
  } catch (error) {
    console.log(error, "創建名稱失敗");
  }
};
//PART2 檢查命名是否重複
export const createdNameWorkingAction = (name, way) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${domain}/work/check/${way}`, name);
    if (data?.success === true) {
      dispatch(editNameWorkingAction(name, "create"));
      dispatch(pagePreviousAction("name"));
      dispatch(pageNextAction("param"));
    }
  } catch (error) {
    toast.error("命名重複");
  }
};
//PART4 寫入加工參數
export const wirteParamWorkingAction = (name, param) => async (dispatch) => {
  try {
    dispatch({
      type: DATA_WORKING_CREATE_PARAM,
      payload: { name: name, value: param },
    });
  } catch (error) {
    console.log(error, "加入參數失敗");
  }
};
//PART4 儲存參數設定
export const SaveSetWorkingAction = (datas) => async (dispatch) => {
  try {
    if (datas.method === "create") {
      await axios.post(`${domain}/work/save/${datas.way}`, datas);
    } else if (datas.method === "modify") {
      await axios.patch(`${domain}/work/modify/${datas.way}`, datas);
    }

    dispatch({
      type: DATA_WORKING_CREATE_CLEAR,
      payload: false,
    });
  } catch (error) {
    console.log(error, "儲存參數錯誤");
  }
};

/* ----------- center control state list ----------- */
export const readcontrolAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${domain}/control`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });
    if (data.success) {
      dispatch({
        type: DATA_CENTER_CONTROL_READ,
        payload: data.data,
      });
    }
  } catch (error) {
    toast.error("read equitment fail");
  }
};

export const readOnecontrolAction = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${domain}/control/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });
    if (data.success) {
      dispatch({
        type: DATA_CENTER_CONTROL_READ,
        payload: data.data,
      });
    }
  } catch (error) {
    toast.error("read equitment fail");
  }
};

/* ----------- abnormal log list ----------- */
export const readabnormallogAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${domain}/abmormalstate`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });
    if (data.success) {
      dispatch({
        type: DATA_ABNORMAL_LOG_READ,
        payload: data.data,
      });
    }
  } catch (error) {
    toast.error("read log fail");
  }
};

export const readOneabnormallogAction = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${logdomain}/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });

    if (data.success) {
      dispatch({
        type: DATA_ABNORMAL_LOG_READ,
        payload: data.data,
      });
    }
  } catch (error) {
    toast.error("read log fail");
  }
};
