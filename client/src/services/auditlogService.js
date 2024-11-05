import { get, post, del, patch, put } from "../utils/request";

export const getAuditlog = async (id) => {
  const result = await get(`auditlog/findById/${id}`);
  return result;
};
export const getAuditlogList = async () => {
  const result = await get("auditlog/getall");
  return result;
};

export const createAuditlog = async (data) => {
  const result = await post("auditlog/create", data);
  return result;
};

export const editAuditlog = async (id, option) => {
  const result = await put(`auditlog/update-auditlog/${id}`, option);
  return result;
};

export const deleteAuditlog = async (id) => {
  const result = await del(`auditlog/delete-auditlog/${id}`);
  return result;
};
