import Cookies from 'js-cookie'

const state = {
  opened: Cookies.get('sidebarStatus') ? !!Number(Cookies.get('sidebarStatus')) : false
}

const mutations = {
  TOGGLE_SIDEBAR: (state: any, val:any) => {
    state.opened = val
    if (state.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      console.log(state.opened)
      Cookies.set('sidebarStatus', '0')
    }
  }
}

// const actions = {
//   closeSideBar({ commit }) {
//     commit('CLOSE_SIDEBAR')
//   }
// }

export default {
  namespaced: true,
  state,
  mutations
//   actions
}

