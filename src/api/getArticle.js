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