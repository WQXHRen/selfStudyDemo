 import {http} from "../utils/http/index"

 export const follow = (aut_id)=>{
     return http.post('/app/v1_0/user/followings',{
        target:aut_id
     })
 }

 export const noFollow = (aut_id)=>{
    return http.delete('/app/v1_0/user/followings/'+aut_id)
}

export const likeArt = (target)=>{
    return http.post('/app/v1_0/article/likings',{
        target
    })
}

export const unLikeArt = (target)=>{
    return http.delete('/app/v1_0/article/likings/'+target)
}

// 获取我的  信息
export const getUser =( )=>{
    return http.get('/app/v1_0/user')
}

// 获取个人信息
export const getUserInfo = ()=>{
    return http.get('/app/v1_0/user/profile')
}