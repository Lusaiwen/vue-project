export default {
  //判断是否为空
  isEmpty(data) {
    let flag = false
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          flag = true
        }
      }
    }
    return flag
  },
  resetForm(form) {
    for (const key in this.form) {
      if (form.hasOwnProperty(key)) {
        form[key] = ''
      }
    }
  },

}