/**
 * time输入时间规范：
 * 1、没有输入会获取当前时间
 * 2、"2018-1-1"
 * 3、"2018-1-1 23:34:45"
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Time = factory()
} (this, function() {
    'use strict';

    //一些常量和正则 UNIT单位 REG正则
    const UNIT_YEAR = 'year';
    const UNIT_MONTH = 'month';
    const UNIT_DAY = 'day';
    const UNIT_HOUR = 'hour';
    const UNIT_MINUTE = 'minute';
    const UNIT_SECOND = 'second';
    const REG_YY = /YY/;
    const REG_MM = /MM/;
    const REG_DD = /DD/;
    const REG_hh = /hh/;
    const REG_mm = /mm/;
    const REG_ss = /ss/;

    // 工具函数
    let _utils = {
        /**
         * 方法一:
         * year % 4 == 0     条件1：年份必须要能被4整除
         * year % 100 != 0   条件2：年份不能是整百数
         * year % 400 ==0    条件3：年份是400的倍数
         * 当条件1和条件2同时成立时 就肯定是闰年
         * 如果条件1和条件2不能同时成立 但如果条件3能成立 则仍然是闰年
         * [判断一个年份是否为闰年]
         * return (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0);
         * 方法二:
         * 利用Date函数, 判断这一年的二月份是否有29号
         */
        isLeapYear(year){
            return new Date(year, 1, 29).getDate() === 29;
        },
        /**
         * 判断用户输入的字串是否合法
         * @param {用户输入的时间参数} timeStr 
         */
        validate(timeStr){
            if(new Date(timeStr).toString() === 'Invalid Date' && timeStr !== undefined){
                return false;
            }
            return true;
        },
        cahngeToStandardTime(){
            //将不合法的时间转化成合法的时间
        },
        /**
         * [报错函数]
         * @param  {[type]} msg [description]
         * @return {[type]}     [description]
         */
        throwError(msg){
            throw new Error(msg);
        },
        /**
         * 判断是否是Time对象
         * @param {*} obj 
         */
        isTimeObject(obj){
            if(obj._date) return true;
            return false;
        },
        /**
         * 将个位数转化为两位数
         */
        num2str(num){
            if(parseInt(num) < 10){
                return '0' + num;
            }
            return '' + num;
        }
    };

    //Time构造器
    let Time = function(timeStr){
        //需要对用户输入的timeStr进行校验
        if(!_utils.validate(timeStr)){
            _utils.throwError('Invalid Date');
        }
        //返回Time对象
        return new Time.prototype.init(timeStr);
    }

    //构造函数
    Time.prototype.init = function(timeStr){
        //维护一个date对象
        if(!timeStr){
            this._date = new Date();
        }else{
            this._date = timeStr.split(' ')[1]?new Date(timeStr):new Date(timeStr + ' 00:00:00');
        }
    }

    //将Time对象的原型指向Time的原型，这样Time构造出的对象 就能使用Time原型上的方法了
    Time.prototype.init.prototype = Time.prototype;

    //浅拷贝 将第一个对象中的内容复制到第一个对象中
    Time.extend = Time.prototype.extend = function(){
        let funcObj = arguments[0];
        if(typeof arguments[0] !== 'object') return;
        for(let key in funcObj){
            this[key] = funcObj[key];
        }
    }

    //添加Time工具函数
    Time.extend({
        /**
         * [获取当前时间戳]
         * @return {[number]} [description]
         */
        getCurrentTimeStamp(){
            return new Date().getTime();
        },
        /**
         * [获取当前年份]
         * @return {[number]} [description]
         */
        getCurrentFullYear(){
            return new Date().getFullYear();
        },
        /**
         * [获取当前月份，1，2，3...]
         * @return {[number]} [description]
         */
        getCurrentMonth(){
            return new Date().getMonth() + 1;
        },
        /**
         * [获取当前日数]
         * @return {[number]} [description]
         */
        getCurrentDate(){
            return new Date().getDate();
        },
        /**
         * [获取当前小时数]
         * @return {[number]} [description]
         */
        getCurrentHours(){
            return new Date().getHours();
        },
        /**
         * [获取当前分钟数]
         * @return {[number]} [description]
         */
        getCurrentMinutes(){
            return new Date().getMinutes();
        },
        /**
         * [获取当前秒数]
         * @return {[number]} [description]
         */
        getCurrentSeconds(){
            return new Date().getSeconds();
        },
        /**
         * [获取当前毫秒数]
         * @return {[string]} [description]
         */
        getCurrentMilliseconds(){
            return new Date().getMilliseconds();
        },
        /**
         * [获取当前星期数，1，2，3，4，5，6，7]
         * @return {[number]} [description]
         */
        getCurrentDay(){
            if(new Date().getDay() === 0){
                return 7;
            }
            return new Date().getDay();
        },
        /**
         * [获取当前季度数]
         * @return {[number]} [description]
         */
        getCurrentQuarter(){
            return this.getCurrentMonth()%4 + 1;
        },
        /**
         * [获取格式化日期和时间]
         * @param  {Boolean} hasHour [是否需要具体时间 true:yyyy-MM-dd HH:MM:SS false:yyyy-MM-dd]
         * @return {[string]}          [description]
         */
        getCurrentFormatTime(hasHour){
            hasHour = hasHour === undefined?true:hasHour;
            let base = this.getCurrentFullYear() + '-' + this.getCurrentMonth() + '-' + this.getCurrentDate();
            let result = hasHour === true?base + ' ' + this.getCurrentHours() + ':' + this.getCurrentMinutes() + ':' + this.getCurrentSeconds():base;
            return result;
        },
        /**
         * [判断某年是否是闰年]
         * @return {Boolean} [description]
         */
        isLeapYear(year){
            return _utils.isLeapYear(year);
        },
        /**
         * [判断某年 或者 某年某月有多少天]
         * @param  {[type]} year  [description]
         * @param  {[type]} month [description]
         * @return {[type]}       [description]
         */
        howManyDays(year,month){
            if(!month){
                if(typeof year !== 'number'){
                    _utils.throwError('howManyDays(): year输入类型有错');
                }
                return this.isLeapYear(year) === true ? 366 : 365;
            }else{
                if(typeof year !== 'number' || typeof month !== 'number'){
                    _utils.throwError('howManyDays(): 输入类型有错');
                }
                if(month > 12 || month < 1){
                    _utils.throwError('howManyDays(): month输入不合法');
                }
                let res = 31;
                res = ((parseInt(month) === 4) || (parseInt(month) === 6) || (parseInt(month) === 9) || (parseInt(month) === 11))?30:31;
                res = (parseInt(month) !== 2)? res : this.isLeapYear(year) === true ? 29 : 28 ;
                return res;
            }
        },
        /**
         * 判断某年某月某日是星期几 
         * @param {年} year 
         * @param {月} month 
         * @param {日} day 
         * @returns 1,2,3,4,5,6,7
         */
        getWeek(year,month,day){
            if(!_utils.validate(year + '-' + month + '-' +day)){
                _utils.throwError('getWeek(): 参数错误');
            }
            let d = new Date(year + '-' + month + '-' + day);
            if(d.getDay() === 0){
                return 7;
            }
            return d.getDay();
        }
    });

    //添加Time对象函数
    Time.prototype.extend({
        /**
         * 获取格式化的时间 默认是YY-MM-DD hh:mm:ss
         */
        format(str){
            str = arguments[0]?str:'YY-MM-DD hh:mm:ss';
            let YY = _utils.num2str(this._date.getFullYear());
            let MM = _utils.num2str(this._date.getMonth() + 1);
            let DD = _utils.num2str(this._date.getDate());
            let hh = _utils.num2str(this._date.getHours());
            let mm = _utils.num2str(this._date.getMinutes());
            let ss = _utils.num2str(this._date.getSeconds());
            return str.replace(REG_YY,YY).replace(REG_MM,MM).replace(REG_DD,DD).replace(REG_hh,hh).replace(REG_mm,mm).replace(REG_ss,ss);
        },
        /**
         * [判断时间是否在time之前]
         * @param  {[type]}  time [description]
         * @return {Boolean}      [description]
         */
        isBefore(t){

            if(!_utils.isTimeObject(t)){
                if(typeof t === 'string'){
                    t = Time(t);
                }else{
                    _utils.throwError('isBefore(): 参数有误');
                }
            }

            if(this._date.getTime() < t._date.getTime()){
                return true;
            }

            return false;
        },
        /**
         * [判断时间是否在time之后]
         * @param  {[type]}  t [description]
         * @return {Boolean}      [description]
         */
        isAfter(t){
            if(!_utils.isTimeObject(t)){
                if(typeof t === 'string'){
                    t = Time(t);
                }else{
                    _utils.throwError('isAfter(): 参数有误');
                }
            }

            if(this._date.getTime() > t._date.getTime()){
                return true;
            }

            return false;
        },
        /**
         * [判断time是否在time1和time2之间]
         * @param  {[type]}  t1 [description]
         * @param  {[type]}  t2 [description]
         * @return {Boolean}       [description]
         */
        isBetween(t1,t2){

            if(!_utils.isTimeObject(t1)){
                if(typeof t1 === 'string'){
                    t1 = Time(t1);
                }else{
                    _utils.throwError('isBetween(): 参数有误');
                }
            }

            if(!_utils.isTimeObject(t2)){
                if(typeof t2 === 'string'){
                    t2 = Time(t2);
                }else{
                    _utils.throwError('isBetween(): 参数有误');
                }
            }

            if(this._date.getTime() > t1._date.getTime() && this._date.getTime() < t2._date.getTime()){
                return true;
            }

            return false;
        },
        /**
         * 对日期进行加减操作 支持链式调用
         * @param {要加的天数 整数为加n天 负数为减n天} number 
         * @param {单位} unit 
         */
        add(number,unit){
            switch(unit){
                case UNIT_YEAR:
                    this._date.setYear(this._date.getFullYear() + parseInt(number));
                    return this;
                case UNIT_MONTH:
                    this._date.setMonth(this._date.getMonth() + parseInt(number));
                    return this;
                case UNIT_DAY:
                    this._date.setDate(this._date.getDate() + parseInt(number));
                    return this;
                case UNIT_HOUR:
                    this._date.setHours(this._date.getHours() + parseInt(number));
                    return this;
                case UNIT_MINUTE:
                    this._date.setMinutes(this._date.getMinutes() + parseInt(number));
                    return this;
                case UNIT_SECOND:
                    this._date.setSeconds(this._date.getSeconds() + parseInt(number));
                    return this;
                default :
                    _utils.throwError(`单位 ${unit} 错误`);
            }
        },
        /**
         * 计算两个时间相差多少天
         * @param {*}
         */
        duration(t){
            if(!_utils.isTimeObject(t)){
                if(typeof t === 'string'){
                    t = Time(t);
                }else{
                    _utils.throwError('isBetween(): 参数有误');
                }
            }
            return Math.floor((t._date.getTime() - this._date.getTime())/(24*3600*1000));
        },
        /**
         * 
         * @param {定时器,当时间到了的时候清除定时器} timer 
         * @param {时间到的回调方法} fn
         */
        countDown(timer,fn){
            //结束时间
            let endTime = this._date.getTime();
            //开始时间
            let curTime = new Date().getTime();
            //总秒数
            let totalSeconds  = parseInt((endTime - curTime)/1000);
            if(totalSeconds > 0){
                //剩下的天数
                let letfDays = Math.floor(totalSeconds / (60 * 60 * 24));
                //剩下的小时数
                let modulo = totalSeconds % (60 * 60 * 24);
                let leftHours = Math.floor(modulo / (60 * 60));
                //剩下的分钟
                modulo = modulo % (60 * 60);
                let leftMinutes = Math.floor(modulo / 60);
                //剩下的秒
                let leftSeconds = modulo % 60;
                return { day: letfDays, hour: leftHours, minute: leftMinutes, second: leftSeconds }
            }else{
                //时间到执行回调函数
                fn();
                //清除定时器
                clearInterval(timer);
                return { day: 0, hour: 0, minute: 0, second: 0 }
            }            
        }
    });

    //返回对象
    return Time;
}));
