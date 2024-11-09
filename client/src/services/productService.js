import { get, post, del, patch, put, postProduct } from "../utils/request";

export const createProductToBlockChain = async (data) => {
  const result = await post("product/createProductToBlockChain", data);
  return result;
};
export const editCheckStatusProductToBlockChain = async (data) => {
  const result = await put("product/editCheckStatusProductToBlockChain", data);
  return result;
};

export const getProductList = async () => {
  const result = await get("product/getall");
  return result;
};
export const getProductItem = async (id) => {
  const result = await get(`product/findById/${id}`);
  return result;
};
export const getProductByProductCode = async (productCode) => {
  const result = await get(`product/findProductCode/${productCode}`);
  return result;
};

export const createProduct = async (data) => {
  const result = await postProduct("product/create", data);
  return result;
};

export const deleteProduct = async (id) => {
  const result = await del(`product/delete/${id}`);
  return result;
};

export const editProduct = async (id, option) => {
  const result = await put(`product/update/${id}`, option);
  return result;
};
