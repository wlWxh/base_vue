<!--
 * @Author: wlWxh
 * @Date: 2024-03-12 16:16:07
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-08-06 10:00:51
 * @FilePath: \sy-vue\src\components\myMenu.vue
 * @Description: 自建菜单组件，使用定义的菜单表导航，与el-menu思路不同
 * @DependOn: vue-Router,router(自建的那个)
-->
<template>
    <div v-for="(j, i, x) in list" :style="{
        '--width': props.width,
        '--height': props.height,
        '--text-size': props.textSize,
        '--icon-size': props.iconSize,
        '--icon-gutter': props.iconGutter,
        '--gutter': x == 0 ? props.topGutter : props.gutter,
        '--item-color': props.color[0],
        '--text-color': props.color[1],
        '--text-conter': textConter,
        '--item-color-hover': props.hoverColor[0],
        '--text-color-hover': props.hoverColor[1],
        '--item-color-activate': props.activateColor[0],
        '--text-color-activate': props.activateColor[1],
        '--item-color-disable': props.disabledColor[0],
        '--text-color-disable': props.disabledColor[1],
    }" class="my-menu" :class="[{
        'my-menu-disabled': j.disabled,
        'my-menu-titale': j.titale,
        'my-menu-activate': j.activate
    }]" @click="click(j.name)">
        <img v-if="j.icon" :src="j.icon" class="icon" alt="">
        <span>{{ j.name }}</span>
    </div>
    <slot></slot>
</template>

<script>
export default {
    name: 'myMenu',
    props: {
        class: undefined,
        width: {
            type: [String, Number]
        },
        height: {
            type: [String, Number]
        },
        item: {
            type: Array,
            required: true
        },
        defaultActivate: {
            type: String,
        },
        refreshKeep: {
            type: Boolean
        },
        router: {
            type: Boolean,
        },
        baseUrl: {
            type: String,
            required: true
        },
        textConter: {
            validator(value, props) {
                return ['left', 'center', 'right'].includes(value)
            },
            default: 'center'
        },
        textSize: {
            type: [String, Number]
        },
        iconSize: {
            type: [String, Number]
        },
        iconGutter: {
            type: [String, Number]
        },
        gutter: {
            type: [String, Number]
        },
        topGutter: {
            type: [String, Number]
        },
        color: {
            type: [String, Array]
        },
        hoverColor: {
            type: [String, Array]
        },
        activateColor: {
            type: [String, Array]
        },
        disabledColor: {
            type: [String, Array]
        },
    },
    components: {},
    computed: {
        props() {
            let width
            if (this.width) {
                if (typeof (this.width) == 'number') {
                    width = String(this.width) + 'px'
                }
                else {
                    width = this.width
                }
            } else {
                width = '100%'
            }
            let height
            if (this.height) {
                if (typeof (this.height) == 'number') {
                    height = String(this.height) + 'px'
                } else {
                    height = this.height
                }
            } else {
                height = '30px'
            }
            let textSize
            if (this.textSize) {
                if (typeof (this.textSize) == 'number') {
                    textSize = String(this.textSize) + 'px'
                } else {
                    textSize = this.textSize
                }
            } else {
                textSize = '14px'
            }
            let iconSize
            if (this.iconSize) {
                if (typeof (this.iconSize) == 'number') {
                    iconSize = String(this.iconSize) + 'px'
                } else {
                    iconSize = this.iconSize
                }
            } else {
                iconSize = '14px'
            }
            let iconGutter
            if (this.iconGutter) {
                if (typeof (this.iconGutter) == 'number') {
                    iconGutter = String(this.iconGutter) + 'px'
                } else {
                    iconGutter = this.iconGutter
                }
            } else {
                iconGutter = '5px'
            }
            let gutter
            if (this.gutter) {
                if (typeof (this.gutter) == 'number') {
                    gutter = String(this.gutter) + 'px'
                } else {
                    gutter = this.gutter
                }
            } else {
                gutter = '10px'
            }
            let topGutter
            if (this.topGutter) {
                if (typeof (this.topGutter) == 'number') {
                    topGutter = String(this.topGutter) + 'px'
                } else {
                    topGutter = this.topGutter
                }
            } else {
                topGutter = gutter
            }
            let color = ['#ffffff', '#303133']
            if (this.color) {
                if (typeof (this.color) == 'string') {
                    color[0] = this.color
                } else {
                    switch (this.color.length) {
                        case 0:
                            break;
                        case 1:
                            color[0] = this.color[0] ? this.color[0] : color[0]
                            break;
                        default:
                            color[0] = this.color[0] ? this.color[0] : color[0]
                            color[1] = this.color[1] ? this.color[1] : color[1]
                            break;
                    }
                }
            }
            let hoverColor = ['#d9ecff', '#409eff']
            if (this.hoverColor) {
                if (typeof (this.hoverColor) == 'string') {
                    hoverColor[0] = this.hoverColor
                } else {
                    switch (this.hoverColor.length) {
                        case 0:
                            break;
                        case 1:
                            hoverColor[0] = this.hoverColor[0] ? this.hoverColor[0] : hoverColor[0]
                            break;
                        default:
                            hoverColor[0] = this.hoverColor[0] ? this.hoverColor[0] : hoverColor[0]
                            hoverColor[1] = this.hoverColor[1] ? this.hoverColor[1] : hoverColor[1]
                            break;
                    }
                }
            }
            let activateColor = ['#ffffff', '#409eff']
            if (this.activateColor) {
                if (typeof (this.activateColor) == 'string') {
                    activateColor[0] = this.activateColor
                } else {
                    switch (this.activateColor.length) {
                        case 0:
                            break;
                        case 1:
                            activateColor[0] = this.activateColor[0] ? this.activateColor[0] : activateColor[0]
                            break;
                        default:
                            activateColor[0] = this.activateColor[0] ? this.activateColor[0] : activateColor[0]
                            activateColor[1] = this.activateColor[1] ? this.activateColor[1] : activateColor[1]
                            break;
                    }
                }
            }
            let disabledColor = ['#c6e2ff', '#409eff']
            if (this.disabledColor) {
                if (typeof (this.disabledColor) == 'string') {
                    disabledColor[0] = this.disabledColor
                } else {
                    switch (this.disabledColor.length) {
                        case 0:
                            break;
                        case 1:
                            disabledColor[0] = this.disabledColor[0] ? this.disabledColor[0] : disabledColor[0]
                            break;
                        default:
                            disabledColor[0] = this.disabledColor[0] ? this.disabledColor[0] : disabledColor[0]
                            disabledColor[1] = this.disabledColor[1] ? this.disabledColor[1] : disabledColor[1]
                            break;
                    }
                }
            }

            return {
                width,
                height,
                textSize,
                iconSize,
                iconGutter,
                gutter,
                topGutter,
                color,
                hoverColor,
                activateColor,
                disabledColor,
            }
            /* item: 
            defaultActivate:
            refreshKeep:
            router:*/
        }
    },
    data() {
        return {
            list: {},
            map: {},
            activateStyle: {},
            activateItem: '',
            refreshHash: ''
        }
    },
    created() {
        let temp = {}
        this.item.forEach((i, j) => {
            temp[j] = {
                'name': i.name,
                'show': i.show ? true : false,
                'titale': i.titale ? true : false,
                'activate': i == this.defaultActivate ? true : false,
                'disabled': i.disabled ? true : false,
                'router': i.router ? i.router : '',
                'icon': i.icon ? i.icon : ''
            }
            if (!temp[j].titale) {
                this.map[i.name] = j
            }
        })
        this.list = temp

        if (this.refreshKeep) {
            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("userMsg-" + this.baseUrl, JSON.stringify(this.activateItem))
            })
        }
    },
    watch: {},
    mounted() {
        if (this.refreshKeep && sessionStorage.getItem("userMsg-" + this.baseUrl)) {
            this.activate(JSON.parse(sessionStorage.getItem("userMsg-" + this.baseUrl)))
        } else if (this.defaultActivate) {
            this.click(this.defaultActivate)
        }

    },
    methods: {
        click(i) {
            if (!this.list[this.map[i]].titale) {
                this.activate(i)
                if (this.router) {
                    if (this.list[this.map[i]].router) {
                        if (this.list[this.map[i]].router == '/') {
                            this.openRouter(this.baseUrl, false)
                        } else {
                            this.openRouter(this.baseUrl + (this.list[this.map[i]].router.split('')[0] == '/' ? '' : '/') + this.list[this.map[i]].router, false)
                        }
                    }
                    else {
                        console.error('没有配置对应的路由地址');
                    }
                }
            }
        },
        activate(i) {
            if (this.activateItem) this.list[this.map[this.activateItem]]['activate'] = false
            this.list[this.map[i]]['activate'] = true
            this.activateItem = i
        }
    },
}
</script>

<style scoped>
.my-menu {
    width: var(--width);
    height: var(--height);
    color: var(--text-color);
    background-color: var(--item-color);
    margin: 0;
    margin-top: var(--gutter);
    font-size: var(--text-size);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: var(--text-conter);
}

.my-menu span {
    padding: 0 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.my-menu:hover {
    color: var(--text-color-hover);
    background-color: var(--item-color-hover);
}

.my-menu>.icon {
    width: var(--icon-size);
    height: var(--icon-size);
    margin-right: var(--icon-gutter)
}

.my-menu-disabled {
    color: var(--text-color-disable);
    background-color: var(--item-color-disable);
    pointer-events: none;
    cursor: not-allowed;
}

.my-menu-disabled:hover {
    color: var(--text-color-disable);
    background-color: var(--item-color-disable);
    pointer-events: none;
    cursor: not-allowed;
}

.my-menu-activate {
    color: var(--text-color-activate);
    background-color: var(--item-color-activate);
}

.my-menu-titale {
    font-weight: bold;
}

.my-menu-titale:hover {
    color: var(--text-color);
    background-color: var(--item-color);
}
</style>