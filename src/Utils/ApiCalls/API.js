import axios from 'axios'
const API = axios.create({
        baseURL: 'http://75b95f0b.ngrok.io/',
        timeout: 10000,
        headers: {'Content-Type': 'text/plain'}
      })

export function get(Url, params){
  return new Promise((resolve, reject) => {
    API
      .get(Url,{params})
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export function post(Url,body, params){
    return new Promise((resolve, reject) => {
      API
        .post(Url,body,{params})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };