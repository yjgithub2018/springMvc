var domain = "http://192.168.9.155:60071";
(function($) {
	var netstate = true;
	var timeout = 1000 * 45;//超时时间设置，默认设置45秒；
	$.messager = {
		alert: function(option) {
			console.info("---------alert----------")
		},
		notice: function(option) {
			console.info("---------notice----------")
		},
		fail: function(msg) {
			art.dialog({
				icon: 'error',
				time: 2,
				content: msg
			});
		},
		error: function(msg) {
			art.dialog({
				icon: 'error',
				time: 2,
				content: msg
			});
		},
		warn: function(msg) {
			art.dialog({
				icon: 'warning',
				time: 2,
				content: msg
			});
		},
		success: function(msg) {
			art.dialog({
				icon: 'succeed',
				time: 2,
				content: msg
			});
		}
	}
	$.http = {
		post: function(option) {
            loadingImg('show',option.url);
			option = option || {}
			$.ajax({
				type: "POST",
				url: domain + option.url,
				contentType: 'application/json',
                timeout : timeout,
				data: JSON.stringify(option.data),
				dataType: 'json',
				/*beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("token", $.cookie.getCookie('token'))
				},*/
				success: function(r) {
                    loadingImg('hide');
					if(r.status == 200) {
						if(option.success) {
							option.success(r)
						}
					} else {
						$.messager.fail(r.message)
					}
				},
				error: function(r,textStatus) {
                    loadingImg('hide');
                    if(textStatus=='timeout'){
                        //处理超时的逻辑
                        $.messager.warn('网络信号差！');
                        netstate = false;
                    }else{
                        if(r.status === 403) {
                            window.location.href = 'login.html';
                        } else {
                            if(option.error) {
                                option.error(r)
                            }
                            if(netstate) {
                                $.messager.error('网络错误');
                                netstate = false;
                            }
                        }
                    }
				}
			});
		},
		get: function(option) {
         ///   loadingImg('show',option.url);
			$.ajax({
				type: "get",
				url: domain + option.url,
				contentType: 'application/json',
                timeout : timeout,
				async:false,
				data: option.data,
				dataType: 'json',
				/*beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("token", $.cookie.getCookie('token'))
				},*/
				success: function(r) {
                    loadingImg('hide');
					if(r.status == 200) {
						if(option.success) {
							option.success(r)
						}
					} else {
						$.messager.fail(r.message)
					}
				},
				error: function(r,textStatus) {
                    loadingImg('hide');
                    if(textStatus=='timeout'){
                        //处理超时的逻辑
                        $.messager.warn('网络信号差！');
                        netstate = false;
                    }else {
                        if (r.status === 403) {
                            window.location.href = 'login.html';
                        } else {
                            if (option.error) {
                                option.error(r)
                            }
                            if (netstate) {
                                $.messager.error('网络错误');
                                netstate = false;
                            }
                        }
                    }
				}
			});
		}
	}
	$.md5 = function(val) {
		return hex_md5(hex_md5(val))
	}
	$.cookie = {
		setCookie: function(k, v) {
			localStorage.setItem(k, JSON.stringify(v));
		},
		getCookie: function(k) {
			return JSON.parse(localStorage.getItem(k));
		},
		delCookie: function(k) {
			localStorage.removeItem(k)
		}
	}
	$.fn.param = function() {
		var formArray = $(this).serializeArray();
		var obj = new Object();
		for(var i in formArray) {
			var item = formArray[i];
			obj[item.name] = item.value;
		}
		return obj;
	}
	$.fn.fillForm = function(obj) {
		if(!obj) {
			return;
		}
		this.find("input,select,textarea").each(function(i) {
			var el = $(this);
			var type = el.context.type;
			if(type !== 'radio' && type !== 'button'){
                if(el.attr("name") == null) {
                    el.val(obj[el.attr("id")]);
                } else {
                    el.val(obj[el.attr("name")]);
                }
			}

		})
		this.find("img[id]").each(function(i) {
			var el = $(this);
			el.attr("src", obj[el.attr('id').split('_')[0]]);
		})
		return this;
	}
	$.fn.select = function(option) {
		option = option || {}
		var _self = $(this);
		var fs = _self.children('option').first().text() === '全部';
		_self.empty();
		if(fs) _self.append("<option value=''>全部</option>")
		$.http.get({
			url: option.url,
			data: option.data,
			success: function(r) {
				var options = r.data;
				for(var i in options) {
					_self.append("<option value=\"" + options[i].code + "\" " + (i == 0 ? 'selected' : '') + ">" + options[i].name + "</option>");
				}
				_self.trigger('change')
			},
			error: function(r) {

			}
		})
		return _self;
	}
    $.fn.selectAll = function(option) {
        option = option || {}
        var _self = $(this);
        var fs = _self.children('option').first().text() === '全部';
        _self.empty();
        if(fs) _self.append("<option value=''>全部</option>")
        $.http.get({
            url: option.url,
            data: option.data,
            success: function(r) {
                var options = r.data;
                for(var i in options) {
                    _self.append("<option value=\"" + options[i].code + "\" >" + options[i].name + "</option>");
                }
                _self.trigger('change')
            },
            error: function(r) {

            }
        })
        return _self;
    }
    $.fn.selectRemeber = function(option) {
        option = option || {}
        var _self = $(this);
        var fs = _self.children('option').first().text() === '全部';
        _self.empty();
        if(fs) _self.append("<option value=''>全部</option>")
        $.http.get({
            url: option.url,
            data: option.data,
            success: function(r) {
                var options = r.data;
                for(var i in options) {
                	if(localStorage.firstArea == '' && '' == localStorage.secondArea && ''== localStorage.enterCode){
                        _self.append("<option value=\"" + options[i].code + "\" " + (i == 0 ? 'selected' : '') + ">" + options[i].name + "</option>");
					}else{
                        if(localStorage.firstArea == options[i].code || options[i].code== localStorage.secondArea || options[i].code== localStorage.enterCode){//记忆
                            _self.append("<option value=\"" + options[i].code + "\" " + (0 == 0 ? 'selected' : '') + ">" + options[i].name + "</option>");
						}else{
                            _self.append("<option value=\"" + options[i].code + "\" >" + options[i].name + "</option>");
						}
					}

                }
                _self.trigger('change')
            },
            error: function(r) {

            }
        })
        return _self;
    }
	$.utils = {
		dataColorRender: function(status) { //颜色数据颜色
			/*var color = '#ffffff'
			switch(status) {
				case 1:
					color = '#e60012';
					break;
				case 2:
					color = '#f29b76';
					break;
				case 3:
					color = '#448aca';
					break;
				case 4:
					color = '#e2d503';
					break;
				default:
					break;
			}*/
            var color = '#ffffff'
            switch (status) {
                case -1:
                    color = '#ffffff';
                    break;
                case -2:
                    color = '#ffffff';
                    break;
                case 3:
                    color = '#448aca';
                    break;
                case 1:
                    color = '#f29b76';
                    break;
                case 2:
                    color = '#e60012';
                    break;
                case 4:
                    color = '#e2d503';
                    break;
                case 6:
                    color = '#936233';
                    break;
                case 7:
                    color = '#000000';
                    break;
                default:
                    break;
            }
			return "background-color:" + color + ";color:" + (color === '#ffffff' ? '#000' : '#ffffff') + ";";
		},
		select_self: function(el) { //自身赋值，针对select2自身不改变选中的问题
			$("#select2-" + el.id + "-container").text($(el).children(":selected").text());
			return $("#select2-" + el.id + "-container").text();
		},
		formatDate: function(date, mask) {
			var d = date;
			var zeroize = function(value, length) {
				if(!length) length = 2;
				value = String(value);
				for(var i = 0, zeros = ''; i < (length - value.length); i++) {
					zeros += '0';
				}
				return zeros + value;
			};

			return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
				switch($0) {
					case 'd':
						return d.getDate();
					case 'dd':
						return zeroize(d.getDate());
					case 'ddd':
						return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
					case 'dddd':
						return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
					case 'M':
						return d.getMonth() + 1;
					case 'MM':
						return zeroize(d.getMonth() + 1);
					case 'MMM':
						return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
					case 'MMMM':
						return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
					case 'yy':
						return String(d.getFullYear()).substr(2);
					case 'yyyy':
						return d.getFullYear();
					case 'h':
						return d.getHours() % 12 || 12;
					case 'hh':
						return zeroize(d.getHours() % 12 || 12);
					case 'H':
						return d.getHours();
					case 'HH':
						return zeroize(d.getHours());
					case 'm':
						return d.getMinutes();
					case 'mm':
						return zeroize(d.getMinutes());
					case 's':
						return d.getSeconds();
					case 'ss':
						return zeroize(d.getSeconds());
					case 'l':
						return zeroize(d.getMilliseconds(), 3);
					case 'L':
						var m = d.getMilliseconds();
						if(m > 99) m = Math.round(m / 10);
						return zeroize(m);
					case 'tt':
						return d.getHours() < 12 ? 'am' : 'pm';
					case 'TT':
						return d.getHours() < 12 ? 'AM' : 'PM';
					case 'Z':
						return d.toUTCString().match(/[A-Z]+$/);
						// Return quoted strings with the surrounding quotes removed
					default:
						return $0.substr(1, $0.length - 2);
				}
			})
		},
		isEmpty: function(val) { //自身赋值，针对select2自身不改变选中的问题
			if(val === null || $.trim(val) === '') {
				return true
			} else if(typeof(val) === 'undefined') {
				return true
			}
			return false;
		},
		getNotEmptyVal: function(val) {
			if($.utils.isEmpty(val)) {
				return '--'
			}
			return val;
		},
		getEmptyVal: function(val) {
			if($.utils.isEmpty(val)) {
				return ''
			}
			return val;
		},
		dealStationState: function(val) {
			if(val === 5) {
				return '停运'
			} else {
				return '排放'
			}
		},
		dealOnlineState: function(val) {
			if(val === 2) {
				return '在线'
			} else if(val === 3) {
				return '离线'
			}
			return '--'
		}
	}
})(jQuery)
var dayTimes = 1000 * 3600 * 24;

function fillZero(val) {
	return new String(val).length < 2 ? ('0' + val) : val;
}

function subDate(d) {
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	return year + "-" + fillZero(month) + "-" + fillZero(day) + "T00:00";
	//		return new Date(year,month,day);
}

function getToday() {
	var d = new Date();
	return this.subDate(d);
}

function getYestoday() {
	var d = new Date();
	d.setTime(d.getTime() - dayTimes);
	return this.subDate(d);
}

function getWeekFirstDay() {
	var d = new Date();
	var week = d.getDay();
	var gap = week != 0 ? week - 1 : 6;
	d.setTime(d.getTime() - dayTimes * gap);
	return this.subDate(d);
}

function getWeekLastDay() {
	var d = new Date();
	var week = d.getDay();
	var gap = week != 0 ? 7 - week : 0;
	d.setTime(d.getTime() + dayTimes * gap);
	return this.subDate(d);
}

function getLastWeekFirstDay() {
	var d = new Date();
	var week = d.getDay();
	var gap = 7 + (week != 0 ? week - 1 : 6);
	d.setTime(d.getTime() - dayTimes * gap);
	return this.subDate(d);
}

function getLastWeekLastDay() {
	var d = new Date();
	var week = d.getDay();
	var gap = (week != 0 ? 7 - week : 0) - 7;
	d.setTime(d.getTime() + dayTimes * gap);
	return this.subDate(d);
}

function getMonthFirstDay() {
	var d = new Date();
	var d2 = new Date(d.getFullYear(), d.getMonth(), 1)
	return this.subDate(d2)
}

function getMonthLastDay() {
	var d = new Date();
	var d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0)
	return this.subDate(d2);
}

function getLastMonthFirstDay() {
	var d = new Date();
	var m = d.getMonth();
	var year = m != 0 ? d.getFullYear() : d.getFullYear() - 1;
	var month = m != 0 ? m - 1 : 11;
	var d2 = new Date(year, month, 1)
	return this.subDate(d2);
}

function getLastMonthLastDay() {
	var d = new Date();
	var d2 = new Date(d.getFullYear(), d.getMonth(), 0)
	return this.subDate(d2);
}
function loadingImg(showOrHide,url) {
    if("client/noticeCount" == url){
        return;
    }
    if('show' == showOrHide){
        requestCount++;
        if(requestCount>0){
            $("#loading").show();
           // $("#fade").show();
        }
    }else {
        requestCount--;
        if(requestCount<1){
            requestCount = 0;
            $("#loading").hide();
          //  $("#fade").hide();
        }
    }
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return JSON.stringify(o);
};
