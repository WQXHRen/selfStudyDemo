import { http } from '../utils/http/index'

export const Article = (data)=>{
    return http.get('/app/v1_1/articles',{
        params:data
    })
}
