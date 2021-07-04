import request from './request';


const instance = request();

// export async function register (username, password, photo) {
//   const resp = await instance.post('/api/register/', {
//     username,
//     password,
//     photo
//   }, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
//   return resp;
// }

export async function register (formData) {
  const resp = await instance.post('/api/register/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return resp;
}