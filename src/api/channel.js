import { http } from '../utils/http/index'

// 获取用户频道
export const getChannel = () => {
  return http.get('/app/v1_0/user/channels')
}

// 获取所有频道
export const getAllChannel = () =>{
  return http.get('/app/v1_0/channels')
}

// 保存修改的频道
export const setChannel = (channels) =>{
  return http.put('/app/v1_0/user/channels',{
    channels
  })
}