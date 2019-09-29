import { http } from '../utils/http/index'

// 搜索联想
export const suggestion = (q) => {
    return http.get('/app/v1_0/suggestion', {
        params: {
            q
        }
    })
}

// 获取搜索历史

export const searchHistory = () => {
    return http.get('/app/v1_0/search/histories')
}

//搜索
export const toSearch = (data) => {
    return http.get('/app/v1_0/search', {
        params:data
    })
}