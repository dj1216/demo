export const storage = {
  set: function (key, data) {
    try {
      return window.localStorage.setItem(key, window.JSON.stringify(data))
    } catch (err) {
      return window.localStorage.setItem(key, data)
    }
  },
  get: function (key) {
    try {
      return window.JSON.parse(window.localStorage.getItem(key))
    } catch (err) {
      return window.localStorage.getItem(key)
    }
  },
  remove: function (key) {
    return window.localStorage.removeItem(key)
  }
}
