import { httpCode } from '../../src/config'
import { setToken, setUser } from '@/utils/common'

interface Tokens{
  [key:string]:any
}

interface Users{
  [key:string]:any
}

const tokens:Tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users:Users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  {
    url: '/mock/user/login',
    type: 'post',
    response: (config:any) => {
      console.log(config)
      const { username } = config.body
      const { token } = tokens[username] || { token: undefined }
      const info = users[token]
      // mock error
      if (!token) {
        return {
          code: httpCode.error,
          message: '帐户和密码不正确'
        }
      }
      setToken(token)
      setUser(info)
      return {
        code: httpCode.success
      }
    }
  },

  // get user info
  {
    url: '/mock/user/info\.*',
    type: 'get',
    response: (config:any) => {
      const { token } = config.query
      console.log(config)
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: httpCode.error,
          message: '登录失败，无法获得用户详细信息'
        }
      }

      return {
        code: httpCode.success,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: () => {
      return {
        code: httpCode.success,
        data: 'success'
      }
    }
  }
]
