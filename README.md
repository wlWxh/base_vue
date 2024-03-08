# Vue+vite开发框架
这是一个vue+vite的架子，包含一些自己写的插件和规范

##详情

- 首先是文件结构
```
文件夹 PATH 列表  
卷序列号为 0E44-1BC1  
vue:  
|   .gitignore
|   index.html          //网站入口
|   jsconfig.json       //用于vscode的提示
|   package-lock.json   
|   package.json
|   README.md           //我在这(ノ￣▽￣)
|   vite.config.js      //vite服务器配置，如部署到其他服务器请参照这里进行修改
|   
+---config
|       config.js       //存放一些个性化的基础配置，例如跨域，反向代理等，用于简化跨环境配置
|       
+---lib
|       '''
|       这里放的都是自己写的工具组件，级别最高，主要用来保存全项目以及未来项目都要用到的组件。
|       所以对在一本目录下的组件进行如下要求：
|       1、仅允许导入vite、nodeJs和vue中的工具
|       2、文件开头注释和方法注释务必撰写，尽量详尽
|       3、文件名按照小驼峰命名
|       4、可以为复合组件，但符合组件的主组件应被目录包裹，子组件应放在components目录。形成下方的文件结构：
|       lib：
|       |
|       |   dome.js
|       |
|       +---testComponent
|       |       |
|       |       |   testComponent.js
|       |       |
|       |       +---components
|       |       |       |
|       |       |       |   component1.vue
|       |       |       |   component2.vue
|
|       '''
|       componentController.js  //路由自动挂载组件
|       myDate.js               //扩充的一些时间对象的一些常用方法
|       pendingControl.js       //请求控制
|       
+---public      //存放公开的资源，例如logo，背景等
|       vite.svg
|       
+---node_modules        //node环境 
|     
+---router      //路由相关配置
|       router.js       //二次封装过的Router对象
|       routes.js       //路由表，规定路由结构
|       
+---src     //网站项目文件
|   |   '''
|   |   基础文件不做解释
|   |   '''
|   |   App.vue     
|   |   main.js
|   |   style.css
|   |   zh-cn.js        //element-plus的汉化文件
|   |   
|   +---api
|   |   |   index.js        //api插件，用于自动引入api接口，便于开发
|   |   |   
|   |   +---page
|   |       +---admin
|   |       |       index.js
|   |       |       
|   |       +---login
|   |           |   index.js
|   |           |   
|   |           +---children
|   |               +---test
|   |                       index.js
|   |                       
|   +---assets      
|   +---components
|   |       autoBreadcrumb.vue      //依赖element-plus的面包屑组件
|   |       
|   +---page        
|       +---admin
|       |   |   index.vue
|       |   |   
|       |   +---children
|       |   +---components
|       |   +---public
|       +---login
|           |   index.vue
|           |   
|           +---children
|           |   +---test
|           |           index.vue
|           |           
|           +---components
|                   dome.vue
|                   
+---utils
        request.js      //axios实例化配置
        
```
## 注意，接下来是重点：

接下是对于文件结构的规范，规范主要用于路由表自动挂载组件和api接口的自动定位，为了方便儿做出的规定，两个组件在开发时对原生语法做了兼容，可以根据需求手动导入，但为了保持项目的结构整洁，请务必参照下面的规范开发。
### 页面文件目录规范
```
首先放一个标准页面的目录结构
admin页面
admin
    |   index.vue
    |   
    +---children
    +---components
    +---public
    +---...(根据个人需要拓展)
```
1. 所有网站页面组件创建于```page```目录下
2. 页面命名均为```index.vue```，并用小驼峰命名其目录，保证其与```/router/routes.js```中定义的路由```name```一致，命名尽量贴合用途。
3. 对于子页面，需要放置在目录中的```children```目录下，并与主页面文件结构相同。
4. 对于页面用到的局部子组件，放置在```components```中
5. 对于所用的图片、视频、音频等静态资源，放置在```public```目录中
6. 目录结构可以缺省  

***

下面举例说明：
```
/router/routes.js

***

import { Routes } from "../lib/componentController"; 

const routeList = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        children: [
            {
                path: 'test/:type',
                name: 'test',
            }
        ]

    },
    {
        path: '/admin',
        name: 'admin',
    }
]
const routes = new Routes('@p', routeList)
export default routes.get()
```
```
对应的目录结构为
***

+---page        
|       +---admin
|       |   |   index.vue
|       |   |   
|       |   +---children
|       |   +---components
|       |   +---public
|       +---login
|           |   index.vue
|           |   
|           +---children
|           |   +---test
|           |           index.vue
|           |           
|           +---components
|                   dome.vue
```
### api文件目录规范  
1. ```api```目录下除主组件外对应```src```层级，及可以为```src```目录下的所有组件提供数据请求服务，因此目录结构应与需要是用接口的组件目录自```src```后保持一致，并命名为```index.js```。
2. 页面中所用的局部子组件默认与页面主组件使用接口一致，如需重定义，请自行导入或者定义```this.api```的```path```变量  
   
***

下面举例说明：

```
页面目录
***
page        
    +---admin
    |   |   index.vue
    |   |   
    |   +---children
    |   +---components
    |   +---public
    +---login
        |   index.vue
        |   
        +---children
        |   +---test
        |           index.vue
        |           
        +---components
                dome.vue    //默认将使用/api/page/login/index.js
```
```
api目录
***
api
|   |   index.js        //api主组件，用于自动引入api接口，便于开发
|   |   
|   +---page
|       +---admin
|       |       index.js
|       |       
|       +---login
|           |   index.js
|           |   
|           +---children
|               +---test
|                       index.js
```