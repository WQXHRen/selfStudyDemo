import { http } from "../utils/http/index.js"

export const getCmt = ({type,source,offset,limit}) => {
    return http.get('/app/v1_0/comments', {
        params: {
            type,
            source,
            offset,
            limit
        }
    })
}