/*
 * @Author: wlWxh
 * @Date: 2024-02-27 09:10:05
 * @LastEditors: wlWxh
 * @LastEditTime: 2024-04-26 10:58:24
 * @FilePath: \sy-vue\lib\myDate.js
 * @Description: 自定义时间工具函数，直接修改Date原型，可以直接通过默认Date调用,在main导入即可
 */

/**
 * @description: 格式化当前时间对象
 * @param {String} fmt 格式化模板
 * @return {String} 格式化后时间字符串
 */
Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
    const o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * @description: 格式化指定时间对象
 * @param {*} date 指定时间（可以为时间对象以及可以被解析的字符串，数值等）
 * @param {String} fmt 格式化模板
 * @return {String} 格式化后的时间字符串
 */
Date.prototype.timeFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    return new Date(date).format(fmt);
}

/**
 * @description: 获取当前时间对象的真实月份（getMonth+1）
 * @return {number} 当前时间对象的月份数值
 */
Date.prototype.getRealMonth = function () {
    return this.getMonth() + 1
}

/**
 * @description: 获取当前时间对象的月份天数
 * @return {Number} 当前时间对象的月份天数
 */
Date.prototype.getMonthNum = function () {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
}

/**
 * @description: 返回指定时间对象的上一个自然月
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {*}{Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getLastNatureMonth = function (date = this) {
    date = new Date(date)
    date = new Date(date.getFullYear(), date.getMonth(), 0)
    let month = Number(date.getDate())
    let res = [date.format('yyyy-MM-dd')]
    for (let i = 1; i < month; i++) {
        date.setDate(date.getDate() - 1)
        res.unshift(date.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 返回指定时间对象自然月
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {*}{Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getNatureMonth = function (date = this) {
    date = new Date(date)
    let month = Number(date.getDate())
    let res = [date.format('yyyy-MM-dd')]
    for (let i = 1; i < month; i++) {
        date.setDate(date.getDate() - 1)
        res.unshift(date.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 返回指定时间对象的上一个自然周
 * @param {Number} start 规定自然周起始时间默认为0（周日）以此类推
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getLastNatureWeek = function (start = 0, date = this) {
    date = new Date(date)
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() - start + 7) % 7)
    let res = []
    for (let i = 1; i <= 7; i++) {
        date.setDate(date.getDate() - 1)
        res.unshift(date.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 返回指定时间对象自然周
 * @param {Number} start 规定自然周起始时间默认为0（周日）以此类推
 * @param {*} date 指定时间对象（可以为任意可以初始化时间对象的字符串，数值等），默认为当前时间对象
 * @return {Array} 返回由年月日构成的字符串数组
 */
Date.prototype.getNatureWeek = function (start = 0, date = this) {
    date = new Date(date)
    let tempDate = new Date(date.getTime())
    let week = (tempDate.getDay() - start + 7) % 7
    let res = [tempDate.format('yyyy-MM-dd')]
    for (let i = 1; i <= week; i++) {
        tempDate.setDate(tempDate.getDate() - 1)
        res.unshift(tempDate.format('yyyy-MM-dd'))
    }
    return res
}

/**
 * @description: 重构基础方法，获取当前时间戳的时间对象
 * @return {Date}
 */
Date.prototype.now = function () {
    return new Date()
}

/**
 * @description: 获取当前时间对象指定年前的时间对象
 * @param {int} time 指定年 默认为1
 * @return {Data}
 */
Date.prototype.lastYear = function (time = 1) {
    return new Date(this.getFullYear() - time, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定月前的时间对象
 * @param {int} time 指定月 默认为1
 * @return {Data}
 */
Date.prototype.lastMonth = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth() - time, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定季度前的时间对象
 * @param {int} time 指定季度 默认为1
 * @return {Data}
 */
Date.prototype.lastQuarter = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth() - 3 * time, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定周前的时间对象
 * @param {int} time 指定周 默认为1
 * @return {Data}
 */
Date.prototype.lastWeek = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() - 7 * time, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定天前的时间对象
 * @param {int} time 指定天 默认为1
 * @return {Data}
 */
Date.prototype.lastDay = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() - time, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定小时前的时间对象
 * @param {int} time 指定小时 默认为1
 * @return {Data}
 */
Date.prototype.lastHours = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours() - time, this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定分钟前的时间对象
 * @param {int} time 指定分钟 默认为1
 * @return {Data}
 */
Date.prototype.lastMinutes = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes() - time, this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定秒前的时间对象
 * @param {int} time 指定秒 默认为1
 * @return {Data}
 */
Date.prototype.lastSeconds = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds() - time, this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定年后的时间对象
 * @param {int} time 指定年 默认为1
 * @return {Data}
 */
Date.prototype.nextYear = function (time = 1) {
    return new Date(this.getFullYear() + time, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定月后的时间对象
 * @param {int} time 指定月 默认为1
 * @return {Data}
 */
Date.prototype.nextMonth = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth() + time, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定季度后的时间对象
 * @param {int} time 指定季度 默认为1
 * @return {Data}
 */
Date.prototype.nextQuarter = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth() + 3 * time, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定周后的时间对象
 * @param {int} time 指定周 默认为1
 * @return {Data}
 */
Date.prototype.nextWeek = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + 7 * time, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定日后的时间对象
 * @param {int} time 指定日 默认为1
 * @return {Data}
 */
Date.prototype.nextDay = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + time, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定小时后的时间对象
 * @param {int} time 指定小时 默认为1
 * @return {Data}
 */
Date.prototype.nextHours = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours() + time, this.getMinutes(), this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象分钟的时间对象
 * @param {int} time 指定分钟 默认为1
 * @return {Data}
 */
Date.prototype.nextMinutes = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes() + time, this.getSeconds(), this.getMilliseconds())
}

/**
 * @description: 获取当前时间对象指定秒后的时间对象
 * @param {int} time 指定秒 默认为1
 * @return {Data}
 */
Date.prototype.nextSeconds = function (time = 1) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds() + time, this.getMilliseconds())
}

export default {}