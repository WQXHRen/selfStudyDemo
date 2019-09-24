
export const setUserInfo=(STORAGE_KEY,data)=>{
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(data))
}
export const getUserInfo = (STORAGE_KEY)=>{
   return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
}

export const delUserInfo = (STORAGE_KEY) =>{
    window.localStorage.removeItem(STORAGE_KEY)
}