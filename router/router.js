// @ts-nocheck
/*
 * @Author: wlWxh
 * @Date: 2023-11-09 13:44:30
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-08-30 15:59:25
 * @FilePath: \wp\vue_ui\router\router.js
 * @Description: 路由器基础配置，创建了路由器并配置了路由拦截器，由cookie配合完成状态管理
 */
import { createRouter, createWebHistory, useRoute } from "vue-router"
import cookies from "vue-cookies";
import routes from './routes'
import * as abort from "/lib/pendingControl";
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
//前置拦截器
router.beforeEach((to, from, next) => {
  //清除路由开始时的请求
  abort.clear()
  //将路由表中meta中的title渲染到页面窗口
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();

  /* 
  //登录校验
  if (to.path === '/login') {
    next();
  } else if (to.path.split('/')[1] === 'share') {
    next();
  } else {
    let token = cookies.get('token')

    if (token === null || token === '') {
      if (from.path === '/login') {
        next('/login');
        alert('请正确登录')
      }
      else {
        next('/login');
        alert('登录已过期，请重新登录。')
      }
    } else {
      next();
    }
  } */
});

export const Router = {
  /**
     * @description: 通过路由在本页打开指定地址
     * @param {string} path 地址
     * @param {boolean} autoComplete 自动补全地址，将输入地址拼接在当前地址后面 默认开启，false关闭
     * @return {*}
     */
  openRouter: function (path, autoComplete = true) {
    if (autoComplete) {
      router.push(router.currentRoute['_value'].fullPath + (path.split('')[0] == '/' ? '' : '/') + path)
    }
    else {
      router.push(path)
    }
  },

  /**
    * @description: 通过路由在新页面打开指定地址
    * @param {string} path 地址
    * @param {boolean} authComplete autoComplete 自动补全地址，将输入地址拼接在当前地址后面 默认开启，false关闭
    * @return {*}
    */
  openNewPage(path, autoComplete) {
    let routeData
    if (autoComplete) {
      routeData = router.resolve({ path: router.currentRoute['_value'].fullPath + (path.split('')[0] == '/' ? '' : '/') + path });
    }
    else {
      routeData = router.resolve({ path: path });
    }
    window.open(routeData.href, '_blank');
  },

  /**
   * @description: 返回路由对象
   * @return {*} router
   */
  getRouter() {
    return router
  },

  /**
   * @description: 返回路由表
   * @return {*} routes
   */
  getRoutes() {
    return routes
  },

  /**
   * @description: 获取当前页面路由实例，等效于this.$route
   * @return {*}
   */
  getRoute() {
    return router.currentRoute._value
  },

  /**
   * @description: 用于vue use插件注册全局方法
   */
  install(app) {
    app.use(router);

    app.config.globalProperties.openRouter = (path, autoComplete = true) => {
      this.openRouter(path, autoComplete)
    }

    app.config.globalProperties.openNewPage = (path, autoComplete = true) => {
      this.openNewPage(path, autoComplete)
    }

  }
}
