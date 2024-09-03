<script setup></script>
<template>
    <myDialog @open="get" ref="pic" v-model="value" :size="[900, 700]" center mask maskClose>
        <div class="header">图片素材</div>
        <div class="pictureMain">
            <div class="pictureForm" v-loading="loading">
                <div v-for="i, j in list" @click="choose(j, i)" :class="chooseIndex == j ? 'choose' : ''">
                    <img :src="i['pic_url']">
                    <div class="picName">{{ i['pic_name'] }}</div>
                </div>
            </div>
            <div class="pictureSelect">
                <div class="menu" :class="model == 0 ? 'choose' : ''" @click="model = 0; get()">图库</div>
                <div class="menu" :class="model == 1 ? 'choose' : ''" @click="model = 1; get()">回收站</div>
                <el-button style="width: 80%;" @click="value = false; upCtrl = true;">上传</el-button>

                <el-button v-show="model == 0" type="danger" style="width: 80%;" @click="remove">删除</el-button>
                <el-button v-show="model == 1" type="success" style="width: 80%;" @click="remove">恢复</el-button>
                <el-button style="width: 80%;"
                    @click="this.$emit('pic', chooseItem['pic_url']); value = false">确认</el-button>
            </div>
        </div>
    </myDialog>

    <myDialog v-model="upCtrl" @close="value = true; upCtrl = false" :size="[800, 500]" center mask maskClose>
        <div class="header">上传图片</div>
        <div class="upMain" v-loading="uploading">
            <el-form :model="form" label-width="auto" style="width: 600px">
                <el-form-item label="上传图片：">

                    <div class="imgView imgempty" v-if="!photo"
                        style="display:flex;align-items: center;justify-content: center;cursor: pointer;" @click="up">
                        <el-icon color="white" size="40">
                            <Plus />
                        </el-icon>
                    </div>

                    <img class="imgView" style="cursor: pointer;" v-if="!!photo" @click="up" :src="photo">
                </el-form-item>
                <el-form-item label="图片名称：">
                    <el-input v-model="form.name" />
                </el-form-item>
                <p style="width: 100%;color: red;margin: 0 auto;">{{ tip }}</p>
            </el-form>
            <div class="footer">
                <el-button @click="upClose">取消</el-button>
                <el-button @click="upload" type="primary">确定</el-button>
            </div>
        </div>

    </myDialog>
</template>

<script>
export default {
    props: { modelValue: Boolean, },
    emits: ['update:modelValue', 'pic'],
    components: {},
    data() {
        return {
            value: true,
            upCtrl: false,
            visible: true,
            photo: '',
            model: 0,
            form: {
                name: '',
                file: '',
            },
            chooseIndex: -1,
            chooseItem: '',
            loading: true,
            uploading: false,
            list: [],
            tip: ''
        }
    },
    watch: {
        modelValue: {
            handler(n) {
                this.value = n
            },
            immediate: true
        },
        value(n) {
            this.$emit('update:modelValue', n)
        }
    },
    mounted() { },
    methods: {
        get() {
            this.loading = true
            if (this.model == 0) {
                this.api('getList').then(res => {
                    this.list = res.data.data
                    this.loading = false
                }).catch(e => {
                    this.loading = false
                })
            } else if (this.model == 1) {
                this.api('getRecycle').then(res => {
                    this.list = res.data.data
                    this.loading = false
                }).catch(e => {
                    this.loading = false
                })
            }
        },
        choose(index, item) {
            if (this.chooseIndex == index) {
                this.chooseIndex = -1
                this.chooseItem = ''
            } else {
                this.chooseIndex = index
                this.chooseItem = item
            }

        },
        remove() {
            //this.value=false
            if (this.chooseIndex == -1) {
                return
            }
            this.loading = true
            if (this.model == 1) {
                this.api('cancel', { id: this.chooseItem['id'] }).then(() => {
                    this.chooseIndex = -1
                    this.chooseItem = ''
                    this.get()
                })
            } else {
                this.api('recycle', { id: this.chooseItem['id'] }).then(() => {
                    this.chooseIndex = -1
                    this.chooseItem = ''
                    this.get()
                })
            }
        },
        async up() {
            let [temp] = await window.showOpenFilePicker({
                types: [
                    {
                        description: "图片类型",
                        accept: { "image/*": ['.png', '.jpeg', '.jpg'] }
                    }
                ]
            });
            temp = await temp.getFile()
            this.form.name = temp.name
            this.form.file = temp
            const windowURL = window.URL || window.webkitURL;
            this.photo = windowURL.createObjectURL(temp);
        },

        upClose() {
            this.upCtrl = false
            this.value = true
            this.form = {
                name: '',
                file: '',
            }
            this.photo = ''
            this.tip = ''
        },
        upload() {
            this.uploading = true
            if (!this.form['name']) {
                this.tip = '请输入图片名称'
                this.uploading = false
                return
            }

            if (!this.form['file']) {
                this.tip = '请选择图片'
                this.uploading = false
                return
            }
            let temp = new FormData()
            temp.append(this.form['name'], this.form['file'])

            this.api('oss', { file: this.form['file'] })
                .then((res) => {
                    let url = res.data.data
                    this.api('upload', {
                        pic_name: this.form.name,
                        pic_url: url,
                        created_by: 'test'
                    }).then(() => {
                        this.uploading = false
                        this.upClose()
                    }).catch(e => {
                        this.tip = '图片上传失败'
                        this.uploading = false
                    })
                }).catch(e => {
                    this.tip = '图片上传失败'
                    this.uploading = false
                })

        }
    },
}
</script>

<style scoped>
.main {
    height: 50vh;
    width: 50vw;
    padding: 8px;
    z-index: 1;
    border: 1.2px solid rgb(228, 232, 243);
}

.header {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1.2px solid rgb(228, 232, 243);
}

.pictureMain {
    height: calc(100% - 30px);
    width: 100%;
    padding: 10px;
    display: flex;

    .pictureForm {
        max-height: 100%;
        width: 632px;
        overflow: auto;
        scrollbar-width: none;
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        flex-wrap: wrap;

        img {
            width: 100%;
            height: calc(100% - 24px);
            object-fit: contain;
        }

        .picName {
            width: 100%;
            padding-left: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .choose {
            border: 2.5px solid rgb(13, 72, 237);
        }

        >div {
            height: 144px;
            width: 120px;
            margin-right: 8px;
            margin-bottom: 8px;
            border: 1.2px solid rgb(228, 232, 243);
            cursor: pointer;
        }

        >div:nth-child(5n+0) {
            margin-right: 0;
        }


    }

    .pictureSelect {
        flex: 1;
        min-width: 0;
        border: 1.2px solid rgb(228, 232, 243);
        margin-left: 8px;
        flex-direction: column;

        .menu {
            width: 100%;
            height: 30px;
            border: 1.2px solid rgb(228, 232, 243);
            text-align: center;
            line-height: 30px;
            color: rgb(96, 98, 102);
            cursor: pointer;
        }

        .menu:hover {
            background-color: rgb(228, 232, 243);
        }

        .choose {
            background-color: rgb(228, 232, 243);
        }

        .el-button {
            margin-top: 10px;
            margin-left: 10%;
        }
    }
}

.upMain {
    height: calc(100% - 30px);
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .imgView {
        height: 80px;
        width: 80px;
        border: 1.2px solid rgb(228, 232, 243);
        background-color: rgb(220, 222, 224);
    }

    .footer {
        display: flex;
        width: 100%;
        padding: 0 40px;
        justify-content: right;
    }
}

:deep(.is-message-box) {
    z-index: 9999;
}
</style>