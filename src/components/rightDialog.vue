<!--
 * @Author: wlWxh
 * @Date: 2024-04-12 10:29:18
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-07-24 14:37:26
 * @FilePath: \sy-vue\src\components\rightDialog.vue
 * @Description: 自建弹窗组件，支持侧边悬浮窗，拖动，缩放操作，可以如普通弹窗一样使用
-->
<script setup>
import { nextTick } from 'vue';
</script>
<template>
    <!-- 悬浮按钮 -->
    <teleport to="#app">

        <!-- 弹窗主体 -->
        <Transition name="slide">
            <div class="dialog" ref="dialog" :style="{ width: w, height: '100%' }" v-if="value">

                <div class="header">
                    <span>
                        <slot name="header"></slot>
                    </span>
                    <div class="close" ref="close" v-if="value" @click="close">
                        <el-icon size="20">
                            <Close />
                        </el-icon>
                    </div>
                </div>

                <div class="main">
                    <slot></slot>
                </div>

                <div class="footer">
                    <slot name="footer"></slot>
                    <el-button type="danger" icon="close" size="large" @click="close" plain>关闭</el-button>
                </div>

            </div>
        </Transition>
        <!-- 遮罩 -->
        <div class="mask" v-if="value" @click="close()"> </div>

    </teleport>
</template>

<script>
export default {
    props: {
        /* 方便父组件控制开启关闭 */
        modelValue: Boolean,
        width: [Number, String]
    },
    emits: ['update:modelValue', 'open', 'close'],
    computed: {},
    created() {
        switch (typeof (this.width)) {
            case 'number':
                this.w = this.width + 'px';
                break;
            case 'string':
                this.w = this.width
                break;
            default:
                this.w = '70%';
                break;
        }
    },
    components: {},
    data() {
        return {
            value: false,
            w: 0
        }
    },
    watch: {
        modelValue: {
            handler(n) {
                if (n && !this.value) {
                    this.open()
                } else if (!n && this.value) {
                    this.close()
                }
            },
            immediate: true
        }
    },
    mounted() {
    },
    methods: {
        async open() {
            this.value = true
            await nextTick()
            this.$emit('update:modelValue', true)
            this.$emit('open', '')
        },
        close() {
            this.value = false
            this.$emit('update:modelValue', false)
            this.$emit('close', '')
        },
        closeCilck(e) {
            let mdiv = this.$refs.open
            let startY = e.clientY - mdiv.offsetTop
            this.oIsMove = true
            let time = new Date()
            document.onmousemove = (e) => {
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let top = e.clientY - startY;

                //移动当前元素
                mdiv.style.top = top + 'px';
                this.top = top + 'px';
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                this.oIsMove = false
                if (new Date() - time < 600) {
                    if (this.value) {
                        this.close()
                    }
                    else {
                        this.open()
                    }
                }
            };
        },
        ismove(e) {
            if (this.move) {
                let mdiv = this.$refs.dialog;
                let cdiv = this.$refs.close;
                let startX = e.clientX - mdiv.offsetLeft
                let startY = e.clientY - mdiv.offsetTop
                document.onmousemove = (e) => {
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - startX;
                    let top = e.clientY - startY;

                    //移动当前元素
                    mdiv.style.left = left + 'px';
                    mdiv.style.top = top + 'px';
                    cdiv.style.left = left + mdiv.offsetWidth + 3 + 'px';
                    cdiv.style.top = top + 'px';
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        },
        initDrag(side, e) {
            if (this.zoom) {
                let mdiv = this.$refs.dialog;
                let cdiv = this.$refs.close;
                let startX = e.clientX
                let startY = e.clientY
                let startWidth = mdiv.offsetWidth
                let startHeight = mdiv.offsetHeight
                let startXMove = Number(mdiv.style.left.split('px')[0])
                let startYMove = Number(mdiv.style.top.split('px')[0])
                let startCXMove = Number(cdiv.style.left.split('px')[0])
                document.onmousemove = (e) => {
                    //获取鼠标相对移动的距离
                    let x = e.clientX - startX;
                    let y = e.clientY - startY;
                    switch (side) {
                        case 'right':
                            this.width = startWidth + x
                            cdiv.style.left = startCXMove + x + "px";
                            break;
                        case 'left':
                            this.width = startWidth - x
                            mdiv.style.left = startXMove + x + "px";
                            break;
                        case 'bottom':
                            this.height = startHeight + y
                            break;
                        case 'top':
                            this.height = startHeight - y
                            cdiv.style.top = startYMove + y + "px";
                            mdiv.style.top = startYMove + y + "px";
                            break;

                        default:
                            break;
                    }
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    }
}
</script>

<style scoped>
.slide-enter-from {
    transform: translateX(100%);
}

.slide-enter-to {
    transform: translateX(0);
}

.slide-enter-active {
    transition: transform 0.1s ease-out;
}

.slide-leave-from {
    transform: translateX(0);
}

.slide-leave-to {
    transform: translateX(100%);
}

.slide-leave-active {
    transition: transform 0.1s ease-out;
}

.dialog {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2077;
    background-color: white;

    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.1), 0px 8px 20px rgba(0, 0, 0, 0.08);
}

.header {
    padding: 20px 20px 0;
    margin-bottom: 20px;
    align-items: center;
    display: flex;
    font-size: 16px;

    span {
        flex: 1;
        height: 20px;
    }

    .close {
        right: 0;
        z-index: 2077;
        width: 20px;
        height: 20px;

        .el-icon {
            cursor: pointer;
        }

        .el-icon:hover {
            color: red;
        }
    }
}

.main {
    width: 100%;
    height: calc(100% - 120px);
    padding: 0 20px;
}

.footer {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
}

.mask {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 2076;
    top: 0;
    background-color: rgba(0, 0, 0, 0.0)
}
</style>