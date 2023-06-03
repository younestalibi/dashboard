import axios from 'axios';
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  console.log(getTokenFromLocalStorage)
const axiosHttp = axios.create({
  baseURL: `http://localhost:8000/api`,
  headers: {
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
      }`,
      // 'Accept': "application/json",      
  },
});

export default axiosHttp;
