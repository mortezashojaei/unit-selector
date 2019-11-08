import axios from 'axios'
const API={
    userinstance : axios.create({
        baseURL: 'http://b46033ad.ngrok.io/api/user/',
        timeout: 1000,
        headers: {'Content-Type': 'application/json'}
      })
};
export default API;