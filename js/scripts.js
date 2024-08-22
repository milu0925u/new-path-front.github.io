import axios from "axios";
import toast from "react-hot-toast";
const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const uploadPlyData = async (datas) => {
  try {
    await axios.post(`${domain}/ply`, datas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    toast.error(error?.response.data.message);
  }
};
