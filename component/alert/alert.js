import Swal from "sweetalert2";
export const deleteAlert = (datas) => {
  return Swal.fire({
    title: datas.deleteAlert,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: datas.confirm,
    cancelButtonText: datas.cancle,
  });
};

export const modifyAlert = (datas) => {
  return Swal.fire({
    title: datas.doyouwanttomodify,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: datas.confirm,
    cancelButtonText: datas.cancle,
  });
};

export const unityLeaveAlert = (datas) => {
  return Swal.fire({
    title: datas.leaveunityAlert,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: datas.confirm,
    cancelButtonText: datas.cancle,
  });
};

export const unityEditAlert = (datas) => {
  return Swal.fire({
    title: datas.doyouwanttomodifypunctuation,
    icon: "warning",
    showCloseButton: true,
    confirmButtonText: datas.confirm,
    cancelButtonText: datas.cancle,
  });
};

export const unitySortAlert = (datas) => {
  return Swal.fire({
    title: datas.doyouwanttosetprocessing,
    icon: "warning",
    showCloseButton: true,
    confirmButtonText: datas.confirm,
    cancelButtonText: datas.cancle,
  });
};

export const unityUploadFinish = (datas) => {
  setTimeout(() => {
    Swal.fire({
      title: datas.uploadsuccess,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }, 1500);
};

export const SaveAlert = (datas) => {
  setTimeout(() => {
    Swal.fire({
      title: datas.uploadsuccess,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }, 1500);
};
