<!--
 * @Author: wlWxh
 * @Date: 2024-04-12 10:29:18
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-07-24 08:45:36
 * @FilePath: \sy-vue\src\components\myDialog.vue
 * @Description: 自建弹窗组件，支持侧边悬浮窗，拖动，缩放操作，可以如普通弹窗一样使用
-->
<script setup>
import { nextTick } from 'vue';
</script>
<template>
    <!-- 悬浮按钮 -->
    <teleport to="body">
        <div class="open" ref="open" v-if="sideButton" @mousedown.prevent="closeCilck"
            @mouseenter=" $event.target.style.width = '50px'"
            @mouseleave="$event.target.style.width = oIsMove ? '50px' : '20px'" :style="{ top: top }">
            <!-- 悬浮按钮图标 -->
            <slot name="sideButton">
                <el-icon class="note">
                    <Collection />
                </el-icon>
            </slot>
        </div>

        <!-- 弹窗主体 -->
        <div class="dialog" ref="dialog"
            :style="[{ width: width + 'px', height: height + 'px', 'background-color': backGround }]" v-if="value">
            <div class="main" ref="main" @mousedown="ismove" :style="{ cursor: move ? 'move' : 'auto' }">
                <slot></slot>
            </div>
            <div class="resize-handle top" @mousedown.prevent="initDrag('top', $event)"
                :style="{ cursor: zoom ? 'ns-resize' : 'auto' }"></div>
            <div class="resize-handle right" @mousedown.prevent="initDrag('right', $event)"
                :style="{ cursor: zoom ? 'ew-resize' : 'auto' }"></div>
            <div class="resize-handle bottom" @mousedown.prevent="initDrag('bottom', $event)"
                :style="{ cursor: zoom ? 'ns-resize' : 'auto' }"></div>
            <div class="resize-handle left" @mousedown.prevent="initDrag('left', $event)"
                :style="{ cursor: zoom ? 'ew-resize' : 'auto' }"></div>
        </div>

        <!-- 遮罩 -->
        <div class="close" ref="close" v-if="value" @click="close">
            <el-icon>
                <Close />
            </el-icon>
        </div>

        <div class="mask" v-if="value && mask" @click="maskClose ? close() : _"
            :style="{ cursor: maskClose ? 'pointer' : 'auto' }"> </div>

    </teleport>
</template>

<script>
export default {
    props: {
        /* 是否使用悬浮按钮 */
        sideButton: Boolean,
        /* 方便父组件控制开启关闭 */
        modelValue: Boolean,
        /* 是否可以拖动 */
        move: Boolean,
        /* 是否可以缩放 */
        zoom: Boolean,
        /* 是否居中打开 */
        center: Boolean,
        /* 是否启用遮罩 */
        mask: Boolean,
        /* 是否可以点击遮罩关闭弹窗 */
        maskClose: Boolean,
        /* 背景颜色 */
        backGround: {
            type: String,
            default: 'white'
        },
        /* 设置弹窗大小 示例：100/"100"或"100,200"/[100]或[100,200] */
        size: [Array, String, Number],
    },
    emits: ['update:modelValue', 'open', 'close'],
    computed: {
    },
    created() {
        if (!this.size) {
            this.width = 270
            this.height = 480
        }
        else {
            switch (this.size.constructor) {
                case Number:
                    this.width = this.size;
                    this.height = this.size;
                    break;
                case String:
                    let temp = this.size.split(',')
                    if (temp.length == 1) {
                        this.width = temp[0]
                        this.height = temp[0]
                    }
                    else {
                        this.width = temp[0]
                        this.height = temp[1]
                    }
                    break;
                case Array:
                    this.width = this.size[0]
                    if (this.size.length == 1) this.height = this.size[0]
                    else this.height = this.size[1]
                    break;
                default:
                    this.width = 270;
                    this.height = 480
                    break;
            }
        }
    },
    components: {},
    data() {
        return {
            value: false,
            control: true,
            pitch: false,
            width: 0,
            height: 0,
            top: "50%",
            mLeft: null,
            mTop: null,
            mCLeft: null,
            oIsMove: false,
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
            let mdiv = this.$refs.dialog;
            let cdiv = this.$refs.close;
            if (this.center) {
                let ww = document.documentElement.clientWidth / 2 - mdiv.offsetWidth / 2
                let wh = document.documentElement.clientHeight / 2 - mdiv.offsetHeight / 2
                mdiv.style.left = ww + 'px'
                mdiv.style.top = wh + 'px'
                cdiv.style.left = ww + mdiv.offsetWidth + 3 + 'px'
                cdiv.style.top = wh + 'px'
            } else {
                mdiv.style.left = (this.mLeft ? this.mLeft : (document.documentElement.clientWidth - 80 - mdiv.offsetWidth)) + 'px'
                mdiv.style.top = this.mTop ? (this.mTop + 'px') : this.top
                cdiv.style.left = (this.mCLeft ? this.mCLeft : (document.documentElement.clientWidth - 77)) + 'px'
                cdiv.style.top = this.mTop ? (this.mTop + 'px') : this.top
            }
            this.$emit('update:modelValue', true)
            this.$emit('open', '')
        },
        close() {
            let mdiv = this.$refs.dialog;
            let cdiv = this.$refs.close;
            this.mTop = Number(mdiv.style.top.split('px')[0])
            this.mLeft = Number(mdiv.style.left.split('px')[0])
            this.mCLeft = Number(cdiv.style.left.split('px')[0])
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
.open {
    width: 20px;
    height: 40px;
    position: fixed;
    float: right;
    right: 0;
    background-color: white;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.1), 0px 8px 20px rgba(0, 0, 0, 0.08);
    z-index: 100;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    cursor: pointer;
    transition: width 0.1s linear 0s;

    .note {
        position: absolute;
        font-size: 20px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto 0;
        margin-left: 10px;
    }
}

.dialog {
    position: fixed;
    float: left;
    z-index: 2077;
    background-color: white;

    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.1), 0px 8px 20px rgba(0, 0, 0, 0.08);

    .main {
        position: absolute;
        top: 2px;
        bottom: 2px;
        left: 2px;
        right: 2px;
    }

    .resize-handle {
        position: absolute;
    }

    .resize-handle.top,
    .resize-handle.bottom {
        left: 0;
        right: 0;
        height: 5px;
    }

    .resize-handle.right,
    .resize-handle.left {
        top: 0;
        bottom: 0;
        width: 5px;
    }

    .resize-handle.top {
        top: 0;
    }

    .resize-handle.right {
        right: 0;
    }

    .resize-handle.bottom {
        bottom: 0;
    }

    .resize-handle.left {
        left: 0;
    }
}

.close {
    position: fixed;
    float: left;
    z-index: 2077;

    .el-icon {
        cursor: pointer;
    }

    .el-icon:hover {
        color: red;
    }
}

.mask {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 2076;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5)
}
</style>