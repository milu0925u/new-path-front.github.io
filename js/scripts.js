import axios from "axios";
import toast from "react-hot-toast";
const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const uploadPlyData = async (datas) => {
  try {
    await axios.post(`${domain}/upload/ply`, datas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (error) {
      toast.error(error?.response.data.message);
    }
  }
};

export const uploadYmlData = async (datas) => {
  try {
    await axios.post(`${domain}/upload/yml`, datas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (error) {
      toast.error(error?.response.data.message);
    }
  }
};
