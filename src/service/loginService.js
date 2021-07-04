import request from './request';


const instance = request();




export async function login(username, password){
  const resp = await instance.post('/api/login/', {
    username,
    password
  }); 
  console.log(resp);
  return resp.data;
}

export async function loginOut(){
  await instance.get('/api/logout/');
  // localStorage.removeItem('username');
}

export async function whoami(){
  const resp = await instance.get('/api/whoami/');
  if(resp.data.ret === 0) {
    return resp.data.data;
  }else if(resp.data.ret === 302){
    return null;
  }
}