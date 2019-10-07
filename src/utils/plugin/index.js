import { Dialog } from 'vant'
import { getUserInfo } from '@/storage/index.js'
import router from '@/router/index.js'
let myPlugin = {

}
myPlugin.install = (Vue) => {
    Vue.prototype.$isLogin = ()=>{
            if (getUserInfo()) {
                Dialog({ message: '提示' });
                return true
            } else {
                Dialog.confirm({
                    title: '温馨提示',
                    message: '该功能需要登录,是否登录?'
                  }).then(() => {
                    router.push('/login')
                    // on confirm
                  }).catch(() => {
                    // on cancel
                  });
                  return false;
            }
    }
}
export default myPlugin;