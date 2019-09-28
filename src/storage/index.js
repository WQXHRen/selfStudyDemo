const STORAGE_KEY ='userInfo';
const CHANNEL_LIST = 'channel_list'


export const setUserInfo=(data)=>{
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(data))
}
export const getUserInfo = ()=>{
   return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
}

export const delUserInfo = () =>{
    window.localStorage.removeItem(STORAGE_KEY)
}

// 未登录 保存频道
export const saveChannel=(list)=>{
    window.localStorage.setItem(CHANNEL_LIST,JSON.stringify(list))
}

// 获取本地频道
export const getChannel = () =>{
    return  JSON.parse(window.localStorage.getItem(CHANNEL_LIST))
}
