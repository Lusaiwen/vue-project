export function debounce(fun, delay) {
  let timer = null
  delay = delay || 200
  return (function() {
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout(fun, delay)
  })()
}
//节流
export function throttle(fun, delay) {
  const prev = Date.now()
  delay = delay || 200
  return function() {
    const that = this
    const args = arguments
    const now = Date.now()
    if (now - prev >= delay) {
      fun.apply(that, args)
      prev = Date.now()
    }
  }
}



