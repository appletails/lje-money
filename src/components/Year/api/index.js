import axios from 'axios'
// 创建axios实例
const $http = axios.create({
  baseURL: 'http://192.168.1.5:83',
//   baseURL: 'http://www.crean.top:83',
  timeout: 300000, // 请求超时时间 
})
$http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const getYearMsgData = function (name) {
    return $http.get(`/getYearMsgData?name=${name}`)
}

export const getReplyList = function (name) {
    return $http.get(`/getReplyList?name=${name}`)
}

export const getYearData = function (name) {
    return $http.get(`/getYearData?name=${name}`)
}

export const getOtherIdolList = function (name) {
    return $http.get(`/getOtherIdolList?name=${name}`)
}

export const getJujuSay = function (name) {
    return $http.get(`/getJujuSay?name=${name}`)
}

export const getMonthIdList = function (name) {
    return $http.get(`/getMonthIdList?name=${name}`)
}

export const getBastDay = function (name) {
    return $http.get(`/getBastDay?name=${name}`)
}

export const getFlipCard = function (name) {
    return $http.get(`/getFlipCard?name=${name}`)
}

export const getAllIdols = function () {
    return $http.get(`/getAllIdols`)
}

export const getIdol = function (data) {
    return $http({
        method: 'POST',
        url: `/getIdol`,
        data
    })
}