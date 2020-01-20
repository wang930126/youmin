!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) }(function (a) { function c(a) { return a } function d(a) { return decodeURIComponent(a.replace(b, " ")) } function e(a) { 0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")); try { return f.json ? JSON.parse(a) : a } catch (b) { } } var b = /\+/g, f = a.cookie = function (b, g, h) { var i, j, k, l, m, n, o, p, q, r; if (void 0 !== g) return h = a.extend({}, f.defaults, h), "number" == typeof h.expires && (i = h.expires, j = h.expires = new Date, j.setDate(j.getDate() + i)), g = f.json ? JSON.stringify(g) : String(g), document.cookie = [f.raw ? b : encodeURIComponent(b), "=", f.raw ? g : encodeURIComponent(g), h.expires ? "; expires=" + h.expires.toUTCString() : "", h.path ? "; path=" + h.path : "", h.domain ? "; domain=" + h.domain : "", h.secure ? "; secure" : ""].join(""); for (k = f.raw ? c : d, l = document.cookie.split("; "), m = b ? void 0 : {}, n = 0, o = l.length; o > n; n++) { if (p = l[n].split("="), q = k(p.shift()), r = k(p.join("=")), b && b === q) { m = e(r); break } b || (m[q] = e(r)) } return m }; f.defaults = {}, a.removeCookie = function (b, c) { return void 0 !== a.cookie(b) ? (a.cookie(b, "", a.extend({}, c, { expires: -1 })), !0) : !1 } });

Array.prototype.QZuserLoginContains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

var notifyQZuserLoginArray = new Array();

(function ($) {
    var delHtml = function (str) { return str.replace(/<[^>]+>|　/g, ""); } //清除所有的html标记
    var host = location.host.indexOf(".gamersky.com") != -1 ? '.gamersky.com' : '';
    var client = null;
    var userId = 0;
    var token = "";
    var msgFun = {
        connect: function () {
            var timestamp = new Date().getTime();
            var ishttps = 'https:' == document.location.protocol ? true : false;
            var mattport = ishttps ? "8084" : "8083";
            var location = {
                hostname: "mqttd.gamersky.com",
                port: mattport,
                clientId: timestamp.toString()
            };
            client = new Paho.MQTT.Client(location.hostname, Number(location.port), location.clientId);
            client.onConnectionLost = msgFun.onConnectionLost;
            client.onMessageArrived = msgFun.onMessageArrived;
            client.connect({
                onSuccess: msgFun.onConnect,
                useSSL: ishttps,
                keepAliveInterval: 60,
                userName: userId.toString(),
                password: token
            });
        },
        onConnect: function (context) {
            client.subscribe("/gamersky/all");
            client.subscribe("/gamersky/" + userId);
            //console.log("onConnetc");
        },
        onConnectionLost: function (responseObject) {
            if (responseObject.errorCode !== 0) {
                //console.log("Connection Lost: " + responseObject.errorMessage);
                msgFun.connect(); //断后重新连接
            }
            //console.log("Connection Lost: ");
        },
        ajaxNotifycheck: function () {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//notify.gamersky.com/api/notifycheck",
                success: function (responseJson) { }
            });
        },
        onMessageArrived: function (message) {
            var destinationName = message.destinationName;
            if (destinationName == "/gamersky/all") {
                msgFun.ajaxNotifycheck();
            } else if (destinationName == "/gamersky/heartbeat") { }
            else {
                if (message.payloadString != "") {
                    var msg = JSON.parse(message.payloadString);
                    var NotifyForm = msg.NotifyForm;
                    if (NotifyForm == 0) {
                        var $a3 = $(".tzlik .a3 .num"), num1 = parseInt($a3.attr("data-num")) + 1;
                        $a3.show().attr("data-num", num1).html(num1 <= 999 ? num1 : "999+");
                    }
                    if (NotifyForm == 1) {
                        var $a2 = $(".tzlik .a2 .num"), num1 = parseInt($a2.attr("data-num")) + 1;
                        $a2.show().attr("data-num", num1).html(num1 <= 999 ? num1 : "999+");
                    }
                    if (NotifyForm == 2) {
                        var $a1 = $(".tzlik .a1 .num"), num2 = parseInt($a1.attr("data-num")) + 1;
                        $a1.show().attr("data-num", num2).html(num2 <= 999 ? num2 : "999+");
                    }

                    var arr = ["official", "favour", "writeback"];
                    var URL = 'http://i.gamersky.com/message/notify/' + arr[NotifyForm];
                    $(".alik.tongzhi").attr("href", URL);
                    var $tz = $(".alik.tongzhi .tz"), num3 = parseInt($tz.find(".num").attr("data-num")) + 1;
                    $tz.show().find(".num").attr("data-num", num3).html(num3 <= 999 ? num3 : "999+");
                    if (num3 > 0) {
                        showNotification({
                            title: '游民星空通知',
                            body: '游民星空通知您，您有' + num3 + '条通知未查看，请尽快查看！',
                            icon: '//image.gamersky.com/webimg15/qznav-app-logo.png',
                            link: URL
                        });
                    }
                }
            }
            //console.log("onMessageArrived:" + message.payloadString);
        }
    };

    function showNotification(options) {
        var options = options || {};
        var title = options.title, msg = options.body, imgUrl = options.icon, link = options.link;
        var Notification = window.Notification || window.mozNotification || window.webkitNotification;
        // 判断浏览器是否支持桌面通知
        if (Notification) {
            Notification.requestPermission().then(function (result) {
                // result 默认值default:等同于拒绝   denied:用户选择了拒绝   granted:用户同意启用通知
                if (result == "granted") {
                    var notify = new Notification(title, {
                        tag: "通知",      //字符串。标记当前通知的标签。
                        icon: imgUrl,   // 通知的缩略图,icon 支持ico、png、jpg、jpeg格式
                        body: msg,      // 通知的具体内容
                        renotify: true  // 是否替换之前的通知项
                    });

                    // 定义通知窗口点击函数
                    notify.onclick = function () {
                        window.open(link);
                        notify.close();
                    };
                } else {
                    var arr = { "default": "默认值，等同于拒绝", "denied": "用户选择了拒绝" };
                    console.log(result + '：' + arr[result]);
                }
            });
        }
    }

    $.fn.Notify = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//notify.gamersky.com/api/getnotifycount",
                success: function (data) {
                    var StatusCode = data.StatusCode;
                    var Count = data.Body.Count;
                    var CommentCount = data.Body.CommentCount;
                    var AgreeCount = data.Body.AgreeCount;
                    var OfficialCount = data.Body.OfficialNotifyCount;

                    var URL = 'http://i.gamersky.com/message/notify/' + (OfficialCount > 0 ? 'official' : CommentCount > 0 ? 'writeback' : AgreeCount > 0 ? 'favour' : 'writeback');
                    if (StatusCode == 1) {
                        if (Count > 0) {
                            $this.find(".tz").show().find(".num").attr("data-num", Count).html(Count > 999 ? "999+" : Count);
                        }
                        /*if(Count>0){
                          showNotification({
                            title: '游民星空通知',
                            body: '游民星空通知您，您有'+Count+'条通知未查看，请尽快查看！',
                            icon: '//image.gamersky.com/webimg15/qznav-app-logo.png',
                            link: URL
                          });
                        }*/

                        var CommentCountStr = CommentCount > 999 ? "999+" : CommentCount;
                        var AgreeCountStr = AgreeCount > 999 ? "999+" : AgreeCount;
                        var OfficialCountStr = OfficialCount > 999 ? "999+" : OfficialCount;
                        var style_a = CommentCount > 0 ? '' : ' style="display:none"';
                        var style_b = AgreeCount > 0 ? '' : ' style="display:none"';
                        var style_c = OfficialCount > 0 ? '' : ' style="display:none"';

                        var tzhtml = '<div class="topbar-tz">';
                        tzhtml += '<div class="tzcon">';
                        tzhtml += '<div class="tzlik">';
                        tzhtml += '<a class="a1" href="http://i.gamersky.com/message/notify/writeback" target="_blank">';
                        tzhtml += '<i class="l1"></i><span class="txt">回复我的</span><span class="num" data-num="' + CommentCount + '"' + style_a + '>' + CommentCountStr + '</span><i class="r"></i>';
                        tzhtml += '</a>';
                        tzhtml += '<a class="a2" href="http://i.gamersky.com/message/notify/favour" target="_blank">';
                        tzhtml += '<i class="l2"></i><span class="txt">收到的赞</span><span class="num" data-num="' + AgreeCount + '"' + style_b + '>' + AgreeCountStr + '</span><i class="r"></i>';
                        tzhtml += '</a>';
                        tzhtml += '<a class="a3" href="http://i.gamersky.com/message/notify/official" target="_blank">';
                        tzhtml += '<i class="l3"></i><span class="txt">官方通知</span><span class="num" data-num="' + OfficialCount + '"' + style_c + '>' + OfficialCountStr + '</span><i class="r"></i>';
                        tzhtml += '</a>';
                        tzhtml += '</div>';
                        tzhtml += '</div>';
                        tzhtml += '<div class="tzbot">';
                        tzhtml += '<div class="lik1"><a href="http://i.gamersky.com/user/info/notifysetting" target="_blank"></a></div>';
                        tzhtml += '<div class="lik2"><a href="javascript:;" class="allbtn">全部标为已读</a></div>';
                        tzhtml += '</div>';
                        tzhtml += '</div>';
                        //登陆后有新通知才会载入通知弹层
                        $this.attr({ "href": URL, "target": "_blank" }).parent().append(tzhtml);
                        msgFun.connect(); //获取通知
                    }
                }
            });
        });
    };

    //统一调用
    function logincheckAjax(callback) {
        $.ajax({
            type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
            success: function (responseJson) {
                if (typeof callback === 'function') {
                    callback(responseJson);
                }
            }
        });
    }
    $(document).ready(function () {
        $('.QZlogin').QZUserLogin(); //获取登录用户名
    });

    var isTrim = function (s) { return s.replace(/(^\s*)|(\s*$)/g, ""); }; //清除空格
    $.fn.UserOnline = function (callback) {
        if (!$.cookie("UserCookie")) {
            logincheckAjax(function (responseJson) {
                if (responseJson.status !== "ok") {
                    $('.QZshade,.QZlogin').show(); //显示登录层
                    $("#QZuserName").focus();
                    //$(".QZlogin").QZloginForm();//登录用户
                } else if (typeof callback === 'function') {
                    callback();
                }
            });
        } else if (typeof callback === 'function') {
            callback();
        }
    };
    $.fn.onlineAjax = function (callback) {
        logincheckAjax(function (responseJson) {
            if (responseJson.status == "ok") {
                $.cookie("UserCookie", JSON.stringify(responseJson), { path: '/', domain: host });
            } else {
                $.removeCookie("UserCookie", { path: '/', domain: host });
                $.removeCookie("isCheck", { path: '/', domain: host });
            }
            if (typeof callback === 'function') { callback(responseJson); }
        });
    };



    $.fn.QZUserLogin = function (options) { //获取登录用户名
        var $this = $(this), $HasLog = $("#QZHasLog"), $userLayer = $("#QZuserLayer");

        if ($HasLog.length == 0) { return; }
        function timeQuantumTips(htm) { var day = new Date(), hr = day.getHours(); if (hr == 0) { htm = "午夜时分，鬼出没时段！" } else if (hr == 1) { htm = "凌晨1点了！该休息了！" } else if (hr == 2) { htm = "工作狂，还在忙吗？" } else if (hr == 3) { htm = "午夜3点！还不睡觉吗？" } else if (hr == 4) { htm = "凌晨4点了，您累了！" } else if (hr == 5) { htm = "5点多了，还没睡啊？" } else if (hr == 6) { htm = "早上好！新一天开始啦！" } else if (hr == 7) { htm = "吃早饭了吗？" } else if (hr >= 8 && hr <= 11) { htm = "上午好！祝您工作愉快！" } else if (hr == 12) { htm = "中午好！你吃饭了吗？" } else if (hr == 13 || hr == 14) { htm = "下午好，开始上班了！" } else if (hr >= 15 && hr <= 18) { htm = "下午好！祝您工作愉快！" } else if (hr == 19) { htm = "肚子饿了，该吃晚饭了！" } else if (hr >= 20 && hr <= 22) { htm = "晚上好！" } else if (hr == 23) { htm = "不早了，该睡觉了？" } return htm }

        $userLayer.find(".time").html(timeQuantumTips(''));

        var userOK = function (responseJson) {
            var userface = responseJson.userface || 'https://image.gamersky.com/webimg15/comment/anonymous.jpg',
                username = responseJson.username,
                emailClass = responseJson.emailClass,
                phoneClass = responseJson.phoneClass,
                weixinClass = responseJson.weixinClass,
                qqClass = responseJson.qqClass,
                sinaClass = responseJson.sinaClass,
                iscolumn = responseJson.iscolumn; //我的订阅 返回false删除

            userId = responseJson.userid; //上面刷新通知使用
            token = responseJson.token; //上面刷新通知使用
            $(".alik.tongzhi").append('<span class="tz" style="display:none"><em class="l"></em><span class="num" data-num="0">0</span><em class="r"></em></span>').Notify();

            $HasLog.show().find(".uname img").attr("src", userface.replace("http:", "")).after(username);
            $userLayer.find(".user1 .name").html(username);
            $userLayer.find(".user1 .img img").attr("src", userface.replace("http:", ""));
            $userLayer.find(".user1 .binding .weixin").addClass(weixinClass).attr("title", weixinClass == "ok" ? "已绑定" : "点击绑定");
            $userLayer.find(".user1 .binding .qq").addClass(qqClass).attr("title", qqClass == "ok" ? "已绑定" : "点击绑定");
            $userLayer.find(".user1 .binding .sina").addClass(sinaClass).attr("title", sinaClass == "ok" ? "已绑定" : "点击绑定");
            $userLayer.find(".user1 .binding .phone").addClass(phoneClass).attr("title", phoneClass == "ok" ? "已绑定" : "点击绑定");
            $userLayer.find(".user1 .binding .email").addClass(emailClass).attr("title", emailClass == "ok" ? "已绑定" : "点击绑定");

            $(".QZshade,.QZlogin").remove();
            //进行数据统计
            var myDate = new Date();
            myDate.setDate(myDate.getDate() + 1);//获取明天
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var date = myDate.getDate();
            
            var cookieKey = "pc_" + userId;
            if ($.cookie(cookieKey) == undefined) {
                $.ajax({
                    type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/statisticshit?form=0",
                    success: function (responseJson) {
                        if (responseJson.status =="ok") {
                            var time = new Date(year + '-' + month + '-' + date + ' 00:00:00');
                            time.setTime(time.getTime());
                            $.cookie(cookieKey, true, { path: '/', domain: host, expires: time });
                        }
                    }
                });
            }
        };
        //userCookie存在的情况
        if (!!$.cookie("UserCookie")) {
            var responseJson = $.parseJSON($.cookie("UserCookie"));
            var isRemoveCookie = !!$.cookie("EditPassword");
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/verifyexpiration",
                data: { userId: responseJson.userid, modifitime: responseJson.modifitime, isRemoveCookie: isRemoveCookie },
                success: function (data) {
                    //如果修改密码情况
                    if (!data.Islate) {
                        $.removeCookie("UserCookie", { path: '/', domain: host });
                        $.removeCookie("isLogin", { path: '/', domain: host });
                        $this.onlineAjax(function (responseJson) {
                            if (responseJson == "") {
                                $("#QZNotLog").show();
                            }
                            else {
                                if (responseJson.status == "ok") {
                                    userOK(responseJson);
                                }
                            }
                        });
                    } else {
                        userOK(responseJson);
                    }
                }
            });

        } else {
            //userCookie不存在的情况
            $this.onlineAjax(function (responseJson) {
                if (responseJson == "") {
                    $("#QZNotLog").show();
                }
                else {
                    if (responseJson.status == "ok") {
                        userOK(responseJson);
                    }
                }
            });

        }
    };


    $.fn.QZloginForm = function (options) { //登录用户
        var $this = $(this);
        var urlParam = function (name, url) {
            if (!url) { url = window.location.href; }
            var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(url);
            if (!results) { return 0; }
            return results[1] || 0;
        };

        $this.on("click", "#QZqqLogin", function (event) {
            event.preventDefault();
            var returnUrl = urlParam("from") || window.location.href;
            window.location.href = "//i.gamersky.com/oauth/authorizelogin?authorizetype=qq&returnUrl=" + encodeURI(returnUrl);
        }).on("click", "#QZsinaLogin", function (event) {
            event.preventDefault();
            var returnUrl = urlParam("from") || window.location.href;
            window.location.href = "//i.gamersky.com/oauth/authorizelogin?authorizetype=sina&returnUrl=" + encodeURI(returnUrl);
        }).on("click", "#QZweixinLogin", function (event) {
            event.preventDefault();
            var returnUrl = urlParam("from") || window.location.href;
            window.location.href = "//i.gamersky.com/oauth/authorizelogin?authorizetype=weixin&returnUrl=" + encodeURI(returnUrl);
        }).on("keyup", "#QZuserName,#QZpassword", function (event) {
            if (event.keyCode == 13) {
                $("#QZbtn").click();
            }
        }).on("click", "#QZbtn", function (event) {
            event.preventDefault();
            var $userName = $("#QZuserName"), userName = $userName.val(), uname = $userName.attr("data-val");
            var $passWord = $("#QZpassword"), passWord = $passWord.val(), passw = $passWord.attr("data-val");
            var QZcookie = $("#QZcookie").attr("checked") ? "Year" : "None";
            $.cookie("isPersistent", QZcookie, { path: '/', domain: '.gamersky.com' });
            if (!isTrim(userName) || userName == uname) {
                alert("请填写用户名！");
                $userName.focus();
                return;
            }
            if (!isTrim(passWord) || passWord == passw) {
                alert("请填写密码！");
                $passWord.focus();
                return;
            }

            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/userlogin",
                data: { logindata: JSON.stringify({ username: userName, password: passWord, checkcode: "", expiration: QZcookie }) },
                success: function (responseJson) {
                    switch (responseJson.status) {
                        case "ok":
                            $('.QZshade,.QZlogin').hide();
                            $this.onlineAjax(function () { window.location.reload(); });
                            break;
                        case "err":
                            alert(responseJson.body);
                            break;
                    }
                }
            });
        });
    };

    $('.QZlogin').QZloginForm(); //登录用户

    $(window).resize(function () {
        $("#QZuserLayer").toggleClass("sm", $(window).width() < 1280 ? true : false);
    }).trigger("resize");

    if ((navigator.userAgent.match(/iPad/i))) {
        $("#QZHasLog .uname").on("click", function (event) {
            event.preventDefault();
        });
        $('.navtt,#QZHasLog').click(function (event) {
            event.preventDefault();
            $(this).addClass('cur');
            $("#QZuserLayer").css("marginLeft", "-200px").find(".zx").css("background-position", "230px 0");
        });
        $(document).on("touchstart", function (e) {
            if (!$('.navtt,#QZHasLog').is(e.target) && $('.navtt,#QZHasLog').has(e.target).length === 0) {
                $('.navtt,#QZHasLog').removeClass('cur');
            }
        });
    } else {
        $('.navtt,#QZHasLog').hover(function () {
            $(this).addClass('cur');
        }, function () {
            $(this).removeClass('cur');
        });
    }

    $(document).on('click', 'a.Login,a.tpbtn,a.tongzhi[href="javascript:;"]', function (event) {
        event.preventDefault();
        if (!$.cookie("UserCookie")) {
            $('.QZshade,.QZlogin').show();
            $("#QZuserName").focus();
        }
    }).on("click", ".QZshade,.QZ-close", function (event) {
        event.preventDefault();
        $('.QZshade,.QZlogin').hide();
    }).on("click", "#QZsign", function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/userlogout",
            success: function (logoutJson) {
                if (logoutJson.status == "ok") {
                    $(this).onlineAjax(function () { window.location.reload(); });
                }
            }
        });
    });
})(jQuery);
