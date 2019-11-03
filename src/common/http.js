import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://www.crean.top',
  timeout: 5000, // 请求超时时间 
})

export default service
