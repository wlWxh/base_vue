const modules = import.meta.glob('/src/api/**/*.js')
import { Router } from '/router/router'
import request from '/utils/request'
export const Api = {
    install(app) {
        /**
         * @description: 用于自动寻找对应的api接口，使用要求：除非自定义了path，否则保证api文件路径及命名与调用api文件自src层后一致
         * 特殊的：components中的组件默认将使用上层父组件的接口及components上一级目录的index.vue的api，可以通过定义path覆盖
         * @param {String} api 调用api文件中具体的接口名，如果为api文件的默认导出可以不写
         * @param {*} data 设定传入数据,默认为空
         * @param {String} path 自定义path变量，默认为空
         * @return {*} 返回服务端响应数据
         */
        app.config.globalProperties.api = async (api = 'default', data = null, path = null,) => {
            if (!path) {
                path = Router.getRoute().matched;
                path = '/src/api' + path[path.length - 1].components.default.__file.split('/src')[1].split('.')[0] + '.js'
            }
            let res = await modules[path]().then(res => {
                if (data) return res[api](data);
                else return res[api]()
            })
            return request(res)
        }
    }
}