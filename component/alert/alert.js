import Swal from "sweetalert2";

export const deleteAlert = () => {
  return Swal.fire({
    title: "是否刪除",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
};

export const modifyAlert = () => {
  return Swal.fire({
    title: "是否前往修改",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
};

export const unityLeaveAlert = () => {
  return Swal.fire({
    title: "是否離開此頁面?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
};

export const unityEditAlert = () => {
  return Swal.fire({
    title: "是否前往修改標點",
    icon: "warning",
    showCloseButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
};

export const unitySortAlert = () => {
  return Swal.fire({
    title: "是否前往設定加工順序",
    icon: "warning",
    showCloseButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
};

export const unityUploadFinish = () => {
  setTimeout(() => {
    Swal.fire({
      title: "上傳成功！",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }, 1500);
};
