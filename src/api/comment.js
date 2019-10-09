import { http } from "../utils/http/index.js"

// 获取评论
export const getCmt = ({ type, source, offset, limit }) => {
    return http.get('/app/v1_0/comments', {
        params: {
            type,
            source,
            offset,
            limit
        }
    })
}

// 点赞评论
export const likeCmt = (target) => {
    return http.post('/app/v1_0/comment/likings', {
        target
    })
}

// 取消点赞评论
export const unLikeCmt = (target) => {
    return http.delete(`/app/v1_0/comment/likings/${target}`)
}

// 发表评论
export const sendCmt = ({ target, content, art_id }) => {
    return http.post('/app/v1_0/comments', {
        target,
        content,
        art_id
    })
}