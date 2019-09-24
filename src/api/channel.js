import {http} from '../utils/http/index'

export const getChannel = () => {
  return http.get('/app/v1_0/user/channels')
}