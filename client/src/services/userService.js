import { get, post, del, patch, getCurrent, put } from "../utils/request";

export const taokhoachonguoidung = async (id) => {
  const result = await put(`user/taokhoachonguoidung/${id}`);
  return result;
};

export const deleteUser = async (id) => {
  const result = await del(`user/delete-user/${id}`);
  return result;
};

export const getUserById = async (id) => {
  const result = await get(`user/get-detail/${id}`);
  return result;
};
export const getCurrentData = async (token) => {
  const result = await getCurrent("user/get-current", token);
  return result;
};

export const getUserList = async (token) => {
  const result = await getCurrent("user/getall", token);
  return result;
};
export const login = async (data) => {
  const result = await post("user/login",data);
  return result;
};

// hàm kiểm tra thông tin user đã tồn tại chưa 
export const checkUser = async (key,value)=>{
    const result = await get(`user/check-user?${key}=${value}`);
    return result;
}

export const register = async (data) => {
  const result = await post("user/register", data);
  return result;
};
export const editUser = async (id, option) => {
  const result = await put(`user/update-user/${id}`, option);
  return result;
};


