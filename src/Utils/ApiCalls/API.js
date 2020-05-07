import axios from 'axios'
const API = axios.create({
        baseURL: 'https://fast-cove-18027.herokuapp.com/',
        timeout: 10000,
        headers: {'Content-Type': 'text/plain'}
      })
// baseURL: http://75b95f0b.ngrok.io/
export function get(Url, params){
  return new Promise((resolve, reject) => {
    API
      .get(Url,{params})
      .then(response => {
        resolve(response);
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
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
