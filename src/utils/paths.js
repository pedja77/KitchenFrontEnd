import { getToken, getUser } from "./token";

export const getDefaultPath = (role) => {};

export const getAllowedPaths = (role) => {
  r;
  return null;
};

export const checkImageUrl = (url, callback) => {
  const img = new Image();
  img.src = url;
  // img.onload = () => callback(true);
  // img.onerror = () => callback(false);
  const complete = img.complete;
  return callback(complete);
};

export const getResource = async (url) =>
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });

export const putResource = async (url, payload) =>
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(payload),
  });

export const postResource = async (url, payload) =>
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:  getToken(),
    },
    body: JSON.stringify(payload),
  });

  export const deleteResource = async (url) => 
    await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: getToken()
        }
    })
