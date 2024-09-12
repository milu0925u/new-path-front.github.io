import {
  DATA_MODEL_SAVE,
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
  DATA_EQUITMENT_READ_DEFAULT,
  PUBLIC_LOADING,
  DATA_CENTER_CONTROL_READ,
  DATA_ABNORMAL_LOG_READ,
} from "../constants";
import axios from "axios";
import toast from "react-hot-toast";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

/* ----------- model list ----------- */
export const saveModelAction = (data) => async () => {
  try {
    await axios.post(`${domain}/model/save`, data);
  } catch (error) {
    console.log("讀模型失敗", error);
  }
};
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
      const { data } = await axios.delete(`${domain}/model/${groupid}`);
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
export const SetModelAction = (data) => async (dispatch) => {
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
export const SetPointAction = (data) => (dispatch) => {
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
      payload: data.data,
    });
  } catch (error) {
    console.log("讀路徑失敗", error);
  }
};
export const deletePathAction = (groupid) => async (dispatch) => {
  try {
    if (groupid.length > 0) {
      const { data } = await axios.delete(`${domain}/point/${groupid}`);
      if (data.success) {
        toast.success("刪除成功!");
        dispatch({
          type: DATA_PATH_DELETE,
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
export const SetPathAction = (data) => (dispatch) => {
  try {
    dispatch({
      type: DATA_PATH_CHOSEN,
      payload: data,
    });
  } catch (error) {
    console.log("標點current選擇錯誤", error);
  }
};
/* ----------- working list ----------- */
export const readWorkListAction = () => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_LOADING, payload: true });

    const { data } = await axios.get(`${domain}/work/geteq`);
    dispatch({
      type: DATA_WORKING_READ,
      payload: data.data,
    });

    dispatch({ type: PUBLIC_LOADING, payload: false });
  } catch (error) {
    toast.error("read working fail");
  }
};
export const deleteWorkListAction = (datas) => async (dispatch) => {
  try {
    await axios.post(`${domain}/work/delete`, datas);
    const { data } = await axios.get(`${domain}/work/geteq`);
    if (data.success) {
      dispatch({
        type: DATA_WORKING_DELETE,
        payload: data.data,
      });
    }
  } catch (error) {
    toast.error("刪除失敗");
  }
};
export const SetWorkListAction = (data) => async (dispatch) => {
  try {
    await dispatch({
      type: DATA_WORKING_CHOSEN,
      payload: data,
    });
  } catch (error) {
    toast.error("choose working fail");
  }
};

export const updateWorkListAction = (datas) => async (dispatch) => {
  try {
    await axios.post(`${domain}/work/update`, datas);
  } catch (error) {
    toast.error("read working fail");
  }
};
export const createWorkListAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: DATA_WORKING_CREATE, payload: data });
  } catch (error) {
    toast.error("read working fail");
  }
};
export const SaveWorkListAction = (datas) => async (dispatch) => {
  try {
    if (datas) {
      await axios.post(`${domain}/work/add`, datas);
    }
    dispatch({ type: DATA_WORKING_CREATE_SAVE, payload: {} });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const readEqAction = () => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_LOADING, payload: true });
    const { data } = await axios.get(`${domain}/equitment`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });

    dispatch({
      type: DATA_EQUITMENT_READ,
      payload: data.data,
    });

    dispatch({ type: PUBLIC_LOADING, payload: false });
  } catch (error) {
    toast.error("read working fail");
  }
};
export const readdefaultEqAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${domain}/equitment/defaultt`, {
      headers: {
        "ngrok-skip-browser-warning": "1",
      },
    });

    dispatch({
      type: DATA_EQUITMENT_READ_DEFAULT,
      payload: data.data,
    });
  } catch (error) {
    toast.error("read working fail");
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
