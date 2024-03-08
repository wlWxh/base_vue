<!--
 * @Author: wlWxh
 * @Date: 2023-11-28 08:23:00
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-03-06 14:36:17
 * @FilePath: \sy-vue\src\components\autoBreadcrumb.vue
 * @Description: 自动面包屑组件，根据路由历史自动生成面包屑，若使用则需要对路由表进行特殊设定
 * 及在meta标签添加pathName，如果为动态路由地址则还需额外添加pathNameVar并将pathName置为false，在pathNameVar中表明需要替换的动态路由部分
 * 注意！！！meta中的元素会被子路由继承，因此如果父路由中定义了pathName，如果子路由不进行覆盖的话会和父路由保持一致
 * 示例说明
 * {
 *  path: 'data',
 *  name: 'data',
 *  meta: {
 *      pathName: '数据概览'
 *  },
 *  children: [{
 *      path: 'allData/:type',
 *      name: 'dataSubPageAllData',
 *      meta: {
 *          pathName: false,
 *          pathNameVar: ['type']
 *      },
 *  }]
 * }
 * @DependOn: element-plus
-->
<template>
    <div id="main" :style="{ width: width, height: height, fontSize: fontSize }">
        <el-breadcrumb separator="/" :style="{ fontSize: fontSize }">
            <el-breadcrumb-item v-for="i in dataList" :to="i.path">{{ i.name }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        fontSize: {
            type: String,
            default: '1rem'
        }
    },
    data() {
        return {
            fullPath: [],
            routes: {},
            dataList: []
        }
    },
    mounted() {
        this.$router.getRoutes().forEach(i => {
            if (!i.redirect) this.routes[i.path] = i
        })
        this.fullPath = this.$route.fullPath.split('/')
        this.move()
    },
    methods: {
        move() {
            let partPath = ''
            this.dataList = []
            this.$route.matched.forEach(i => {
                if (!i.redirect) {
                    partPath = this.fullPath.slice(0, i.path.split('/').length).join('/')
                    this.dataList.push({
                        name: this.change(i.path, partPath),
                        path: this.fullPath.slice(0, i.path.split('/').length).join('/')
                    })
                }
            })
        },
        change(path, partPath) {
            let temp = this.routes[path]
            if (temp.meta.pathName) {
                return temp.meta.pathName
            }
            else {
                return decodeURIComponent(partPath.split('/')[path.split('/').indexOf(':' + temp.meta.pathNameVar)])
            }
        }
    },
    watch: {
        $route() {
            this.fullPath = this.$route.fullPath.split('/')
            this.move()
        }
    }
}
</script>

<style scoped>
#main {
    display: flex;
    align-items: center;
}
</style>