import axios from 'axios'
import { throwErr } from './throwErr' // utils 捕捉服务端http状态码的方法
// 创建axios实例
const service = axios.create({
  baseURL: 'http://www.crean.top',
  timeout: 5000 // 请求超时时间
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
  // 在发送请求之前做些什么
    return config
  },
  error => {
  // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
  // 对响应数据做点什么
    return response
  },
  error => {
    if (error && error.response) {
      let res = {}
      res.code = error.response.status
      res.msg = throwErr(error.response.status, error.response) // throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
      return Promise.reject(res)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service
