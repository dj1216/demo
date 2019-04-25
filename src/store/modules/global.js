
const state = {
  footer: null,
  content: null,
  myContent: null,
  search: {bgDeg: '90', bgColor: '#fc3357', bgSecondColor: '#fc3357', color: '#fff', searchPlaceholder: '请输入关键字'},
  theme: {deg: '90', mainColor: '#fc3357', secondColor: '#fe6868', thirdColor: '#ffe7e9'},
  firstNav: '/home',
  block: null,
  registrationId: null,
  swiperProgress: null
}

const getters = {}

const actions = {}

const mutations = {
  setFooter (state, data) {
    state.footer = data
  },
  setContent (state, data) {
    state.content = data
  },
  setTheme (state, data) {
    state.theme = data
  },
  setSearch (state, data) {
    state.search = data
  },
  setBlock (state, data) {
    state.block = data
  },
  setFirstNav (state, data) {
    state.firstNav = data
  },
  setMyContent (state, data) {
    state.myContent = data
  },
  setRegistrationId (state, data) {
    state.registrationId = data
  },
  setSwiperProgress (state, data) {
    console.log(data)
    state.swiperProgress = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
