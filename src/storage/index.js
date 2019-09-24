const STORAGE_KEY ='userInfo';

export const setUserInfo=(data)=>{
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(data))
}
export const getUserInfo = ()=>{
   return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
}

export const delUserInfo = () =>{
    window.localStorage.removeItem(STORAGE_KEY)
}