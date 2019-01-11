//求自然月日期
export default {
    name:'datess',
  getMonthBeforeFormatAndDay(num, format, day)
{
    var date = new Date();
    date.setMonth(date.getMonth() - (num * 1), 1);
    var mo = date.getMonth();
    //小月
    if (mo == 4 || mo == 6 || mo == 9 || mo == 11) {
        if (day > 30) {
            day = 30
        }
    }
    //2月
    else if (mo == 2) {
        if (isLeapYear(date.getFullYear())) {
            if (day > 29) {
                day = 29
            } else {
                day = 28
            }
        }
        if (day > 28) {
            day = 28
        }
    }
    //大月
    else {
        if (day > 31) {
            day = 31
        }
    }

   let retureValue = date.format('yyyy' + format + 'MM' + format + day);

    return retureValue;
},

//JS判断闰年代码
isLeapYear(Year) {
    if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
    } else {
        return (false);
    }
},

formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
},

getNowYear(){
     var now = new Date();
     var nowYear = now.getYear();
     nowYear += (nowYear < 2000) ? 1900 : 0; //
     return nowYear;
 },

getMonthStartDate(){
    var now = new Date();
    var nowMonth = now.getMonth();
    var nowYear = this.getNowYear();
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return this.formatDate(monthStartDate);
},

getMonthEndDate(){
    var now = new Date();
    var nowMonth = now.getMonth();
    var nowYear = this.getNowYear();
    var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowYear,nowMonth));
    return this.formatDate(monthEndDate);
},

getLastMonthStartDate()
{
    var lastMonthDate = new Date();
    var m = lastMonthDate.getMonth();
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
    var lastMonth = lastMonthDate.getMonth();
    var nowYear = this.getNowYear();
    if(m==0)
    nowYear = parseInt(nowYear) - 1;
    var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
    return this.formatDate(lastMonthStartDate);
},

getLastMonthEndDate(){
    var lastMonthDate = new Date();
    var m = lastMonthDate.getMonth();
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
    var lastMonth = lastMonthDate.getMonth();
    var nowYear = this.getNowYear();
    if(m==0) nowYear = parseInt(nowYear) - 1;
    var lastMonthEndDate = new Date(nowYear, lastMonth, this.getMonthDays(nowYear,lastMonth));
    return this.formatDate(lastMonthEndDate);
},

getMonthDays(nowYear,myMonth){
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
    return days;
}
}
//日期格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth(), // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}