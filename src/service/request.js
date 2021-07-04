import axios from 'axios';

export default function  (){
  //1.检查localStore中有没有token
  //保证有一个axios
  let instance = axios;
//   instance.defaults.baseURL = 'http://47.103.197.26:8000';
  instance.defaults.withCredentials = true;
  
  
  //axios请求拦截器
  instance.interceptors.request.use(req => {
    // const token = localStorage.getItem('token');
    // if(token) {
    //   req.headers.authorization = 'bear ' + token;
    // }

    console.log(req)
    return req;
  }, err => {
    return Promise.reject(err);
  })



  //axiox响应拦截器
  instance.interceptors.response.use(res => {
    // if(res.headers.authorization){
    //   localStorage.setItem('token', res.headers.authorization);
    // }
    console.log(res);
    return res;
  }, err => {
    return Promise.reject(err);
  });
  // , err => {
  //   if(err.response.status === 403){
  //     // localStorage.removeItem('token');
  //   }
  //   Promise.reject(err);
  // }

  return instance;


}