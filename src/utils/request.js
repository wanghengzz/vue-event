import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL
})

// 白名单: 不需要携带token的api地址
const whiteAPIList = ['/api/reg', '/api/login']

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (!whiteAPIList.includes(config.url)) {
    // 为请求头挂载 Authorization 字段
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    // 无效的 token
    // 把 Vuex 中的 token 重置为空，并跳转到登录页面
    store.commit('updateToken', '')
    router.push('/login')
  }
  return Promise.reject(error)
})

// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios
