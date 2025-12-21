import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/auth',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    console.log('axios请求', config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('axios响应', response)
    if (response.status == 200) {
      return response.data;
    }
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('axios响应错误', error.response)
    if (error.response.status == 401 || error.response.status == 500) {
      if (location.pathname != '/login') {
        // 401 跳转登录页
        localStorage.removeItem('token');
        location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  });

export default axiosInstance;