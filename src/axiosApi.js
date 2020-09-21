import axios from "axios";


const baseURL = `http://localhost:8000/api/v1/`
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': localStorage.getItem('accessToken') ? "Bearer " + localStorage.getItem('accessToken') : null,
    'Content-Type': 'application/json',
    'accept': 'application/json'
}
});
axiosInstance.interceptors.response.use(
  response => response,
  error => {
      const originalRequest = error.config;

      // Prevent infinite loops
      if (error.response.status === 401 && originalRequest.url === baseURL+'token/refresh/') {
          window.location.href = '/login';
          return Promise.reject(error);
      }

      if (error.response.data.code === "token_not_valid" &&
          error.response.status === 401 && 
          error.response.statusText === "Unauthorized") 
          {
              const refreshToken = localStorage.getItem('refreshToken');

              if (refreshToken){
                  const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                  // exp date in token is expressed in seconds, while now() returns milliseconds:
                  const now = Math.ceil(Date.now() / 1000);
                  console.log(tokenParts.exp);

                  if (tokenParts.exp > now) {
                      return axiosInstance
                      .post('token/refresh/', {refresh: refreshToken})
                      .then((response) => {
          
                          localStorage.setItem('accessToken', response.data.access);
                          localStorage.setItem('refreshToken', response.data.refresh);
          
                          axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                          originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
          
                          return axiosInstance(originalRequest);
                      })
                      .catch(err => {
                          console.log(err)
                      });
                  }else{
                      console.log("Refresh token is expired", tokenParts.exp, now);
                      window.location.href = '/login';
                  }
              }else{
                  console.log("Refresh token not available.")
                  window.location.href = '/login';
              }
      }
    
   
    // specific error handling done elsewhere
    return Promise.reject(error);
}
);

export default axiosInstance