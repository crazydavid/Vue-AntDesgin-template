import { getInfo } from '@/api/user'
// eslint-disable-next-line
import { ActionContext } from 'vuex'

interface UserInfo {
    roles: string;
    introduction: string;
    avatar: string;
    name: string;
}

interface StateOf<V> {
    [_: string]: V | string
}

const state:StateOf<UserInfo> = {
  userInfo: {
    roles: '',
    introduction: '',
    avatar: '',
    name: ''
  },
  token: ''
}

const mutations = {
  SET_USER: (state: StateOf<UserInfo>, userInfo: UserInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  getUserInfo(context:ActionContext<StateOf<UserInfo>, any>) {
    const { commit, state } = context
    return new Promise((resolve, reject) => {
      getInfo(state.token).then((response:any) => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_USER', data)
        resolve(data)
      }).catch((error:any) => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

