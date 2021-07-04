import request from './request'

const instance = request()

//获取图书
export async function getBooks() {
  return await instance.get('/api/book/');
}

//获取用户借的图书
export async function getLendBooks() {
  return await instance({
    url: '/api/rbbook/',
    method: 'GET'
  })
}

// 添加图书
export async function addBooks(formData) {
  return await instance.post('/api/book/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//修改图书
export async function changeBook(bookForm) {
  return await instance.put('/api/book/', {
    id: bookForm.id,
    newdata: bookForm,
  })
}

//删除图书
export async function deleteBook(bookIdArr) {
  console.log(bookIdArr)
  return await instance({
    url: '/api/book/',
    method: 'DELETE',
    data: {
      id: bookIdArr
    }
  })
}

//借阅图书
export async function lendBook(bookIdArr) {
  console.log(bookIdArr)
  return await instance({
    url: '/api/rbbook/',
    method: 'POST',
    data: {
      id: bookIdArr
    }
  })
}

//还书
export async function returnBook(bookIdArr) {
  console.log(bookIdArr)
  return await instance({
    url: '/api/rbbook/',
    method: 'PUT',
    data: {
      id: bookIdArr
    }
  })
}

export const getBook = async(id) => {
    
}





