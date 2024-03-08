import config from '/vite.config.js?raw'
import { markRaw } from 'vue'

/**
 * @description:根据name自动挂载组件，使用提示：
 * 1、组件文件命名必须为index.vue
 * 2、组件文件路径必须为`basePath`/{上级路由路径名称}/`name`/index.vue
 * 3、如果不需要挂载逐渐，可以不对路由对象配置name
 * 4、支持自定义组件，及在配置路由时对'component'自定义导入形式
 */
export class Routes {
  #routerTree     //路由树
  #basePath       //将要挂载的组件根目录（可以为别名）
  #modules        //将组件提前引入（懒加载）用于后续挂载

  /**
   * @description: 构造函数
   * @param {String} basePath 路由根目录
   * @param {Array} routerList 路由列表
   */
  constructor(basePath, routerList) {
    this.#modules = import.meta.glob('/src/**/*.vue')
    this.#basePath = this.#getPathAlias(basePath)
    this.#routerTree = this.#push(routerList)
  }

  /**
   * @description: 获取别名对应地址，并规范路径开头为/
   * @param {String} path 指定地址
   * @return {String} 如果为别名则返回对应的真实地址，否则返回原地址
   */
  #getPathAlias(path) {
    let temp = config.split("alias: {")[1].split("}")[0].replaceAll(' ', '')
    temp = temp.split('"').length > 1 ? temp.split('"') : temp.split('\'').filter((item, index) => index % 2 === 1)
    if (temp.indexOf(path)) path = temp[temp.indexOf(path) + 1] + '/'
    return path.substr(1) == '/' ? "" : "/" + (path.substr(-1) == '/' ? path : path + '/');
  }

  /**
   * @description: 生成路由树
   * @param {Array} routerList 路由列表
   * @return {*} 生成的路由树
   */
  #push(routerList) {
    return this.#pushEnum(this.#basePath, routerList)
  }

  /**
   * @description: 递归遍历路由表
   * @param {String} basePath 根路径
   * @param {Array} routerList 部分路由表
   * @return {*} 生成的路由树
   */
  #pushEnum(basePath, routerList) {
    let res = []
    routerList.forEach(i => {
      res.push(this.#pushRealize(basePath, i))
    });
    return res
  }

  /**
   * @description: 生成路由树实现
   * @param {String} basePath 根路径
   * @param {Array} router 部分路由表
   * @return {*} 部分路由树
   */  
  #pushRealize(basePath, router) {
    let res = {}
    for (const i in router) {
      if (i != 'component') res[i] = router[i]
    }
    if (router.hasOwnProperty('name')) {
      if (router.hasOwnProperty('component')) {
        res['component'] = router['component']
      } else {
        basePath = basePath + router.name + '/'
        res['component'] = markRaw(this.#modules[basePath + 'index.vue'])
      }
    }
    if (res.hasOwnProperty('children')) res['children'] = this.#pushEnum(basePath + 'children/', res['children'])
    return res
  }

  /**
   * @description: 获取路由树，只有获取，没有修改
   * @return {Array} 路由树
   */
  get() {
    return this.#routerTree
  }
}