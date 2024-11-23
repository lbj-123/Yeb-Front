import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import 'font-awesome/css/font-awesome.css'
//插件形式使用请求
import {putRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "@/utils/menus";
import * as url from "url";


Vue.config.productionTip = false
Vue.use(ElementUI,{size: 'small'});
//插件形式使用请求
Vue.prototype.putRequest = putRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
//全局前置守卫
router.beforeEach((to,from,next)=>{
  if(window.sessionStorage.getItem('tokenStr')){
    initMenu(router,store);
    if(!window.sessionStorage.getItem('user')){
      //判断用户信息是否存在
      return getRequest('admin/info').then(resp=>{
        if(resp){
          //存入用户信息
          window.sessionStorage.setItem('user',JSON.stringify(resp));
          next();
        }
      })
    }
    next();
  }else {
    if(to.path=='/'){
      next();
    }else {
      next('/?redirect='+to.path);
    }

  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
