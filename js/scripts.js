import axios from "axios";
import toast from "react-hot-toast";
const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const uploadPlyData = async (datas) => {
  console.log(datas);

  try {
    console.log("546456456");

    await axios.post(`${domain}/upload/ply`, datas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("ok?");
  } catch (error) {
    // toast.error(error?.response.data.message);
    console.log(error);
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
    // toast.error(error?.response.data.message);
    console.log(error);
  }
};
