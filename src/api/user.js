import { http } from "../utils/http/index"

export const follow = (aut_id) => {
    return http.post('/app/v1_0/user/followings', {
        target: aut_id
    })
}

export const noFollow = (aut_id) => {
    return http.delete('/app/v1_0/user/followings/' + aut_id)
}

export const likeArt = (target) => {
    return http.post('/app/v1_0/article/likings', {
        target
    })
}

export const unLikeArt = (target) => {
    return http.delete('/app/v1_0/article/likings/' + target)
}

// 踩这篇文章
export const trample = (target)=>{
    return http.post('/app/v1_0/article/dislikes',{
        target
    })
}

// 不踩这篇文章
export const unTrample = (target)=>{
    return http.delete('/app/v1_0/article/dislikes/'+target)
}

// 获取我的  信息
export const getUser = () => {
    return http.get('/app/v1_0/user')
}

// 获取个人信息
export const getUserInfo = () => {
    return http.get('/app/v1_0/user/profile')
}

// 编辑个人资料
export const saveUser = ({ name, gender, birthday }) => {
    return http.patch('/app/v1_0/user/profile', {
        name,
        gender,
        birthday
    })
}
// 编辑头像
export const savePhoto = (photo) => {
    return http.patch('/app/v1_0/user/photo',
        photo
    )
}

