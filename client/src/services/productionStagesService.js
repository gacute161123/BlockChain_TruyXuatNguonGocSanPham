import { get, post, del, patch, put } from "../utils/request";

export const getProductionStagesFindByID = async (id) => {
  const result = await get(`productionStage/findById/${id}`);
  return result;
};

export const getProductionStagesList = async () => {
  const result = await get("productionStage/getall");
  return result;
};

export const createProductionStages = async (data) => {
  const result = await post("productionStage/create", data);
  return result;
};

export const editProductionStages = async (id, option) => {
  const result = await put(`productionStage/update-stage/${id}`, option);
  return result;
};

export const deleteProductionStages = async (id) => {
  const result = await del(`productionStage/delete-stage/${id}`);
  return result;
};
