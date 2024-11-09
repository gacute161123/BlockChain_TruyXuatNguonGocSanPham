import { get, post, del, patch, put, postAuditlog, putAuditlog } from "../utils/request";

export const getAuditlog = async (id) => {
  const result = await get(`auditlog/findById/${id}`);
  return result;
};
export const getAuditlogList = async () => {
  const result = await get("auditlog/getall");
  return result;
};

export const createAuditlog = async (data) => {
  const result = await postAuditlog("auditlog/create", data);
  return result;
};

export const editAuditlog = async (id, option) => {
  const result = await putAuditlog(`auditlog/update-auditlog/${id}`, option);
  return result;
};

export const deleteAuditlog = async (id) => {
  const result = await del(`auditlog/delete-auditlog/${id}`);
  return result;
};
