import axios from 'axios'
const API={
    userinstance : axios.create({
        baseURL: 'http://75b95f0b.ngrok.io/api/user/',
        timeout: 10000,
        headers: {'Content-Type': 'text/plain'}
      })
};
export default API;