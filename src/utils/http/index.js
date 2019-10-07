import axios from 'axios'
import { getUserInfo, setUserInfo } from '../../storage/index'
import JSONbig from 'json-bigint'
import { async } from 'q';


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

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, async function (error) {
    // 对响应错误做点什么
    if (error.response.status == 401) {
        if (getUserInfo()) {
            let refresh_token = getUserInfo().refresh_token
            let res = await axios({
                method: 'put',
                url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
                headers: { Authorization: `Bearer ${refresh_token}` },
            })
            // 保存新的token到本地
            setUserInfo({
                token: res.data.data.token,
                refresh_token: refresh_token
            })
            return http(error.config)
        }
    }

    return Promise.reject(error);
});



http.defaults.transformResponse = [function (data) {
    // 对 data 进行任意转换处理
    try {
        return JSONbig.parse(data);
    } catch (error) {
        return data;
    }

}]