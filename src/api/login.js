import {http} from '../utils/http'

export const login = (data) =>{
    return http.post('/app/v1_0/authorizations',data)
    
}