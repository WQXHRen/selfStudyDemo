import axios from 'axios'
import { getUserInfo } from '../../storage/index'
export const http = axios.create({
    baseURL: "http://ttapi.research.itcast.cn"

})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (getUserInfo()) {
        config.headers.Authorization = `Bearer ${getUserInfo().token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});