// const API_DOMAIN = "http://localhost:3002/api/";
// const API_DOMAIN = "http://192.168.2.15:3002/api/";
const API_DOMAIN = "http://172.20.10.14:3002/api/";

export const getCurrent = async (path, token) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
    },
  });
  const result = await response.json();
  return result;
};

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
};

export const post = async (path, option) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option), // chuyển sang dạng json
  });
  const result = await response.json();
  return result;
};
export const postProduct = async(path,option)=>{
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    body: option, // Đưa FormData vào body
  });
  const result = await response.json();
  return result;
}

export const del = async (path)=>{
    const response = await fetch(API_DOMAIN + path, {
      method: "DELETE",
    });
  const result = await response.json();
  return result;
}
export const patch = async(path,option)=>{
     const response = await fetch(API_DOMAIN + path, {
       method: "PATCH",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(option), // chuyển sang dạng json
     });
     const result = await response.json();
     return result;
}

export const put = async (path, option) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option), 
  });
  const result = await response.json();
  return result; 
};