import { get, post, del, patch,put } from "../utils/request";

export const getSupplierById = async (id) => {
  const result = await get(`supplier/findById/${id}`);
  return result;
};
export const getSupplierList = async () => {
  const result = await get("supplier/getall");
  return result;
};

export const createSupplier = async (data) => {
  const result = await post("supplier/create", data);
  return result;
};


export const editSupplier = async (id, option) => {
  const result = await put(`supplier/update-supplier/${id}`, option);
  return result;
};

export const deleteSupplier = async (id) => {
  const result = await del(`supplier/delete-supplier/${id}`);
  return result;
};
