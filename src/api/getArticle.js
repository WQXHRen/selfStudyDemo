import { http } from '../utils/http/index'

export const Article = (data)=>{
    return http.get('/app/v1_1/articles',{
        params:data
    })
}


// 不喜欢文章
export const dislikes = (id)=>{
    return http.post('/app/v1_0/article/dislikes',{
        target:id
    })
}

// 拉黑用户
export const pullBlack = (autId)=>{
    return http.post('/app/v1_0/user/blacklists',{
        target:autId
    })
}

// 举报文章
export const reportsArt = (obj)=>{
    return http.post('/app/v1_0/article/reports',obj)
}

// 文章详情
export const getDetails = (art_id)=>{
    return http.get('/app/v1_0/articles/'+art_id)
}