import Cookies from 'js-cookie'

/**
 * @msg: 存取token
 * @param {string} token
 */
export const TOKEN_KEY: string = 'token'
export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
}
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

/**
 * @msg: 存取token
 * @param {string} userinfo
 */
export const USER_KEY: string = 'userInfo'
export const setUser = (userinfo: string) => {
  Cookies.set(USER_KEY, userinfo, { expires: 1 })
}
export const getUser = () => {
  const userInfo = Cookies.get(USER_KEY)
  if (userInfo) {
    return userInfo
  } else {
    return false
  }
}
