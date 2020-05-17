import axios from "axios";
export const API = axios.create({
        baseURL: 'https://fast-cove-18027.herokuapp.com/',
        timeout: 10000,
        headers: {'Content-Type': 'text/plain'}
      })
// baseURL: http://75b95f0b.ngrok.io/
export function get(Url, params) {
  return new Promise((resolve, reject) => {
    API.get(Url, { params })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function post(Url, body, params) {
  return new Promise((resolve, reject) => {
    API.post(Url, body, { params })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function deleteMethod(Url, body) {
  return new Promise((resolve, reject) => {
    API.delete(Url, { data: body })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function put(Url, body, params) {
  return new Promise((resolve, reject) => {
    API.put(Url, body, { params })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
