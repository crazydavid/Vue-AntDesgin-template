import request from '@/utils/request'

export function login(data:any) {
  return request({
    url: '/mock/user/login',
    method: 'post',
    data
  })
}

export function getInfo(params:any) {
  return request({
    url: '/mock/user/info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/mock/user/logout',
    method: 'post'
  })
}
