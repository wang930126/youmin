(function ($) {
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 6=4(1){2 0(0(3.7)+0($("#b").c("a-8"))+0(1)+0("9"))}',13,13,'md5|phoneNumber|return|navigator|function|var|codeNumberPost|userAgent|sid|fq239843ifujskldghqrpery89f843ihfdsfsjdjkfldajsfadfd|data|sessionid|attr'.split('|'),0,{}));

	var ts = true;
	var isTrim = function (s) {return s.replace(/(^\s*)|(\s*$)/g, "");}; //清除空格
	var isEmail = function (s) {return s.match(/^[\w]{1}[\w\.\-_]*@[\w]{1}[\w\-_\.]*\.[\w]{2,4}$/i);}; //验证Email格式
	var isNumBer = function (s) {return s.match(/^\+?[1-9][0-9]*$/);}; //验证数字格式
	var isPass = function (s) {return s.match(/^.{6,20}/);}; //验证密码格式
	var cb = new Date().getTime(); //获取时间戳
	$.fn.ErrorLayer = function (options) { //弹层错误提示
	 	var $this = $(this),
	 	T = $this.offset().top - 18,
	 	W = $this.outerWidth(),
	 	L = $this.offset().left + W;
	 	$this.siblings(".wenLayer").remove();
	 	$this.after('<div class="wenLayer" style="left:' + L + 'px;top:' + T + 'px"><div class="wen-zx"></div><div class="wen-txt">' + options + '</div></div>');
	 };
	 $.fn.Error = function (options) {
	 	$(this).parent().next().html(options);
	 };
	 $.fn.clickGetMessageCode = function (codeDiv, codeVal, phoneNumber, codeNumber) { //点击发送验证码
	 	//请求到后台
	 	var codePost = codeNumber;
	 	var $this = $(this);
	 	var datatype = $this.attr("data-type");
	 	if (datatype === "0") {
	 		codePost = codeNumber + "$$$" + codeNumberPost(phoneNumber);
	 	}
	 	if ($this.attr("data-ban") == "OK") {
	 		$.ajax({
	 			url: '/user/smscode',
	 			type: 'post',
	 			data: {
	 				number: phoneNumber,
	 				handleType: datatype,
	 				codeNumber: codePost
	 			},
	 			success: function (data) {
	 				if (data.StatusCode == 1) {
	 					$this.Error("发送成功");
	 					var $This = $this,databan = $This.attr("data-ban");
	 					if (databan == "NO") {
	 						return false;
	 					}
	 					var timer,wait = 60,S = wait,Txt = $.text($This);
	 					$This.attr("data-ban", "NO").html(S + "秒后重新发送");
	 					timer = setInterval(function () {
	 							if (S == 1) {
	 								$This.attr("data-ban", "OK").html(Txt);
	 								clearInterval(timer);
	 								$This.attr("data-updatecode", "true");
	 							} else {
	 								S--;
	 								$This.html((S < 10 ? "0" + S : S) + "秒后重新发送");
	 							}
	 						}, 1000);
	 					if ($This.nextAll(codeVal).hasClass("none")) {
	 						$This.prevAll(codeDiv).addClass('none').nextAll(codeVal).removeClass('none').addClass('block').focus();
	 					} else {
	 						$This.nextAll(codeVal).focus();
	 					}
	 				} else {
	 					$this.Error(data.Message);
	 				}
	 			}
	 		});
	 	}
	};
	$.fn.clickGetCode = function (options) { //点击获取验证码
		return this.each(function () {
			var $This = $(this);
			$This.addClass('none').nextAll(".code").removeClass('none').addClass('block').focus();
			$This.nextAll(options).removeClass('none').addClass('block');
		});
	};
	$.fn.FocusBlur = function (callback) {
		var $this = $(this);
		$this.find("input[name='PhoneNumber']").val("请输入手机号").attr("data-val", "请输入手机号");
		$this.find("input[name='Email']").val("请输入邮箱").attr("data-val", "请输入邮箱");
		$this.find("input[name='PwdConfirm']").val("确认密码").attr("data-val", "确认密码");
		$this.find("input[name='codeVal']").val("输入短信验证码").attr("data-val", "输入短信验证码");
		$this.find("input[name='Code']").val("输入验证码").attr("data-val", "输入验证码");
		if ($this.find("input[name='sendEmail']").val() == "请输入注册时的邮箱" || $this.find("input[name='sendEmail']").val() == "") {
			$this.find("input[name='sendEmail']").val("请输入注册时的邮箱").attr("data-val", "请输入注册时的邮箱");
		}
		if ($this.find("input[name='sendPhoneNumber']").val() == "请输入注册时的手机号" || $this.find("input[name='sendPhoneNumber']").val() == "") {
			$this.find("input[name='sendPhoneNumber']").val("请输入注册时的手机号").attr("data-val", "请输入注册时的手机号");
		}

		$this.find("input[name='NewPassword']").val("设置新密码").attr("data-val", "设置新密码");
		$this.find("input[name='CfnewPassword']").val("再次输入新密码").attr("data-val", "再次输入新密码");

		$this.on("focus", "input", function () {
			var $This = $(this),
			val = $This.val(),
			vals = $This.attr("data-val"),
			inputname = $This.attr("name");
			$This.parent().next(".error").html("");
			if ($This.attr("placeholder") != '') {
				$This.addClass("cur");
			}
			if (val == vals) {
				$This.val("").addClass("cur");
				if (inputname == "CfPassword" || inputname == "NewPassword" || inputname == "PwdConfirm" || inputname == "CfnewPassword") {
					$This.parent().html($This.parent().html().replace("text", "password")).find("input").focus();
				}

			}
		}).on("blur", "input", function () {
			if (callback) {
        callback($(this));
      }
			var $This = $(this),
			val = $This.val(),
			vals = $This.attr("data-val"),
			inputname = $This.attr("name");
			if (!isTrim(val)) {
				$This.val(vals).removeClass("cur");
				if (inputname == "CfPassword" || inputname == "NewPassword" || inputname == "PwdConfirm" || inputname == "CfnewPassword") {
					$This.parent().html($This.parent().html().replace("password", "text")).find("input").val(vals);
				}
			}
		});
	};
	//点击a标签切换注册方式时触发该函数
	$.fn.RegFocusBlur = function (callback) {
		var $this = $(this);
		if ($this.find("input[name='PhoneNumber']").val() == "请输入手机号") {
			$this.find("input[name='PhoneNumber']").val("请输入手机号").attr("data-val", "请输入手机号");
		}
		if ($this.find("input[name='Email']").val() == "请输入邮箱" || $this.find("input[name='Email']").val() == "") {
			$this.find("input[name='Email']").val("请输入邮箱").attr("data-val", "请输入邮箱");
		}

		if ($this.find("input[name='PwdConfirm']").val() == "确认密码" || $this.find("input[name='PwdConfirm']").val() == "") {
			$this.find("input[name='PwdConfirm']").val("确认密码").attr("data-val", "确认密码");
		}
		if ($this.find("input[name='codeVal']").val() == "输入短信验证码") {
			$this.find("input[name='codeVal']").val("输入短信验证码").attr("data-val", "输入短信验证码");
		}
		if ($this.find("input[name='Code']").val() == "输入验证码" || $this.find("input[name='Code']").val() == "") {
			$this.find("input[name='Code']").val("输入验证码").attr("data-val", "输入验证码");
		}

		$this.on("focus", "input", function () {
			var $This = $(this),
			val = $This.val(),
			vals = $This.attr("data-val"),
			inputname = $This.attr("name");
			$This.parent().next(".error").html("");
			if (val == vals) {
				$This.val("").addClass("cur");
				if (inputname == "CfPassword" || inputname == "NewPassword" || inputname == "PwdConfirm" || inputname == "CfnewPassword") {
					$This.parent().html($This.parent().html().replace("text", "password")).find("input").focus();
				}

			}
		}).on("blur", "input", function () {
			if (callback) {
        callback($(this));
      }
			var $This = $(this),
			val = $This.val(),
			vals = $This.attr("data-val"),
			inputname = $This.attr("name");
			if (!isTrim(val)) {
				if (inputname != "Password") {
					$This.val(vals).removeClass("cur");
				}
				if (inputname == "CfPassword" || inputname == "NewPassword" || inputname == "PwdConfirm" || inputname == "CfnewPassword") {
					$This.parent().html($This.parent().html().replace("password", "text")).find("input").val(vals);
				}
			}
		});
	};
	$.fn.RegUser = function (options) { //注册
		return this.each(function () {
			var $this = $(this),i = 0;
			var $block = $this.find(".RegLcon.block"),
			$PhoneNumber = $block.find("input[name='PhoneNumber']"),
			$Email = $block.find("input[name='Email']"),
			$Password = $block.find("input[name='Password']"),
			$CfPassword = $block.find("input[name='PwdConfirm']"),
			$codeVal = $block.find("input[name='codeVal']"),
			$Code = $block.find("input[name='Code']"),
			PhoneNumber = $PhoneNumber.val(),
			Email = $Email.val(),
			Password = $Password.val(),
			CfPassword = $CfPassword.val(),
			codeVal = $codeVal.val(),
			Code = $Code.val();
			$this.find(".RegLcon.block").FocusBlur(function (thisInput) {
				var name = thisInput.attr("name");
				if (name == "Password") {
					//验证密码是否符合规则
					if (!isTrim(thisInput.val()) || thisInput.val() == thisInput.attr("data-val")) {
						thisInput.Error("密码不能为空！");
					} else if (!isPass(thisInput.val())) {
						thisInput.Error("密码不能带有中文，并且个数在6-20位！");
					}
				}
				if (name == "PwdConfirm") {
					if (!isTrim(thisInput.val()) || thisInput.val() == thisInput.attr("data-val")) {
						thisInput.Error("确认密码不能为空！");
					} else if ($this.find(".RegLcon.block .Password").val() != thisInput.val()) {
						thisInput.Error("两次密码不一致！");
					}
				}
				if (name == "PhoneNumber") {
					//验证电话号码是否重复
					if (!isTrim(thisInput.val()) || thisInput.val() == thisInput.attr("data-val")) {
						thisInput.Error("电话号码不能为空！");
						return;
					}
					csrf = $("input[name='csrfmiddlewaretoken']").val();
					$.ajax({
						url: '/user/verifyphone',
						type: 'post',
						data: {
							phone: thisInput.val(),
							csrfmiddlewaretoken: csrf,
						},
						success: function (data) {
							if (data.StatusCode == 0) {
								$(".RegLcon.block .submit").attr("data-config", true);
								thisInput.Error(data.Message);
							} else {
								$(".RegLcon.block .submit").attr("data-config", false);
							}
						}
					});
				}
			});
			$Code.blur(function () {
				if ($(".code").val() != '输入验证码') {
					$.ajax({
						url: '/user/VerifyCode',
						type: 'post',
						data: {
							code: $Code.val()
						},
						success: function (data) {
							if (data.StatusCode == 1) {
								$Code.Error(data.Message);
							}
						}
					});
				}
			});
			$this.on("keyup", "input", function (event) {
				if (event.keyCode == 13) {
					$this.find(".submit").click();
				}
			}).on("click", ".submit", function () {
				var $block = $this.find(".RegLcon.block"),
				$PhoneNumber = $block.find("input[name='PhoneNumber']"),
				$Email = $block.find("input[name='Email']"),
				$Password = $block.find("input[name='Password']"),
				$CfPassword = $block.find("input[name='PwdConfirm']"),
				$codeVal = $block.find("input[name='codeVal']"),
				$Code = $block.find("input[name='Code']"),
				PhoneNumber = $PhoneNumber.val(),
				Email = $Email.val(),
				Password = $Password.val(),
				CfPassword = $CfPassword.val(),
				codeVal = $codeVal.val(),
				Code = $Code.val();
				if (!isTrim(Password) || Password == $Password.attr("data-val")) {
					$Password.Error("密码不能为空！");
					ts = false;
					return ts;
				} else if (!isPass(Password)) {
					$Password.Error("密码不能带有中文，并且个数在6-20位！");
					ts = false;
					return ts;
				} else {
					ts = true;
				}

				if (!isTrim(CfPassword) || CfPassword == $CfPassword.attr("data-val")) {
					$CfPassword.Error("确认密码不能为空！");
					ts = false;
					return ts;
				} else if (Password !== CfPassword) {
					$CfPassword.Error("两次密码不一致！");
					ts = false;
					return ts;
				} else {
					ts = true;
				}

				if (i == 0) {
					if (!isTrim(PhoneNumber) || PhoneNumber == $PhoneNumber.attr("data-val")) {
						$PhoneNumber.Error("手机号不能为空！");
						ts = false;
						return ts;
					} else if (!isNumBer(PhoneNumber)) {
						$PhoneNumber.Error("手机号只能是数字！");
						ts = false;
						return ts;
					} else if (PhoneNumber.length !== 11) {
						$PhoneNumber.Error("手机号必须是11位！");
						ts = false;
						return ts;
					} else {
						ts = true;
					}
					if ($(this).attr("data-config") == 'true') {
						$Email.Error("存在此电话号码！");
						ts = false;
						return ts;
					}
					if ($codeVal.hasClass("none") == true) {
						$block.find(".codeSendBtn").Error("请先点击获取短信验证码！");
						ts = false;
						return ts;
					} else if (!isTrim(codeVal) || codeVal == $codeVal.attr("data-val")) {
						$codeVal.Error("短信验证码不能为空！");
						ts = false;
						return ts;
					} else {
						ts = true;
					}
					if (ts == false) {
						return false;
					}

				} else {
					if (!isTrim(Email) || Email == $Email.attr("data-val")) {
						$Email.Error("邮箱不能为空！");
						ts = false;
						return ts;
					} else if (!isEmail(Email)) {
						$Email.Error("邮箱格式不正确！");
						ts = false;
						return ts;
					} else {
						ts = true;
					}
					if ($(this).attr("data-config") == 'true') {
						ts = false;
						return ts;
					}

					if ($Code.hasClass("none") == true) {
						$Code.Error("请先点击获取验证码！");
						ts = false;
						return ts;
					} else if (!isTrim(Code) || Code == $Code.attr("data-val")) {
						$Code.Error("验证码不能为空！");
						ts = false;
						return ts
					} else {
						ts = true;
					}

					if (ts == false) {
						return false;
					}
				}
			}).on("click", ".codeSendBtn", function () {
				$("#Vcode").attr("src", "/home/getvalidatecode?time=" + (new Date()).getTime());
				$("#codeid").show();
				$(".codeSendBtn").attr("class", "SendPhoneBtn");

			}).on("click", ".SendPhoneBtn", function () {
				if (!isTrim($(".code").val()) || $(".code").val() == '输入验证码') {
					$(".code").Error("验证码不能为空！");
					return false;
				}
				if ($(this).attr("data-updatecode") == "true") {
					$("#Vcode").attr("src", "/home/getvalidatecode?time=" + (new Date()).getTime());
					$(this).attr("data-updatecode", false);
				}
				$(this).clickGetMessageCode(".codeDiv", ".codeVal", $("#PhoneNumber").val(), $(".code").val()); //点击发送验证码

			}).on("click", ".codeBtn", function () {
				$("#EmailVcode").attr("src", "/home/getvalidatecode?time=" + (new Date()).getTime());
				$(this).clickGetCode(".codeImg"); //点击获取验证码
			}).find(".RegLnav").on("click", "a", function () {
				var $This = $(this);
				i = $This.index();
				$This.addClass("cur").siblings().removeClass("cur");
				$this.find(".RegLcon").removeClass("block").addClass("none").eq(i).toggleClass("none block");
				$this.find(".RegLcon.block").RegFocusBlur(function (thisInput) {
					var name = thisInput.attr("name");
					if (name == "Password") {
						//验证密码是否符合规则
						if (!isTrim(thisInput.val()) || thisInput.val() == thisInput.attr("data-val")) {
							thisInput.Error("密码不能为空！");
						} else if (!isPass(thisInput.val())) {
							thisInput.Error("密码不能带有中文，并且个数在6-20位！");
						}
					}
					if (name == "PwdConfirm") {
						if (!isTrim(thisInput.val()) || thisInput.val() == thisInput.attr("data-val")) {
							thisInput.Error("确认密码不能为空！");
						} else if ($this.find(".RegLcon.block .Password").val() != thisInput.val()) {
							thisInput.Error("两次密码不一致！");
						}
					}
					if (name == "Email") {
						//验证E-Mail是否重复
						if (!isTrim(thisInput.val()) || thisInput.val() == thisInput.attr("data-val")) {
							thisInput.Error("邮箱不能为空！");
							return;
						}
						$.ajax({
							url: '/user/verifyemail',
							data: {
								email: thisInput.val()
							},
							success: function (data) {
								if (data.StatusCode == 0) {
									thisInput.Error(data.Message);
									$(".RegLcon.block .submit").attr("data-config", true);
								} else {
									$(".RegLcon.block .submit").attr("data-config", false);
								}
							}
						});
					}
				});
			});
		});
	};
	$.fn.EmailOK = function (options) { //邮箱注册成功
		return this.each(function () {
			var $this = $(this);
			$this.FocusBlur();
			//邮箱注册成功 再次发送确认信 显示验证码
			$("#sendBtn").click(function () {
				$("#obtainCode").toggleClass("none block");
			});
			$this.on("keyup", "input", function (event) {
				if (event.keyCode == 13) {
					$("#sendEmail").click();
				}
			});
			$("#sendEmail").click(function () {
				var $Code = $this.find("input[name='Code']"),
				Code = $Code.val(),
				SendEmail = $(this).attr("data-email");
				if (!isTrim(Code) || Code == $Code.attr("data-val")) {
					$Code.Error("验证码不能为空！");
					return false;
				}
				$("#obtainCode .error").html("正在发送");
				//发送邮箱
				$.ajax({
					url: '/user/repetitionsendemail',
					type: 'post',
					data: {
						email: SendEmail,
						code: Code
					},
					success: function (data) {
						$("#obtainCode .error").html(data.Message);
						$('#Vcode').trigger("click");
					}
				});
			});
		});
	};
  //统一调用
  function logincheckAjax(callback){
    $.ajax({
      type: "GET",dataType: "jsonp",url: "//i.gamersky.com/api/logincheck",
      success: function (responseJson) {
        if (typeof callback === 'function') {
          callback(responseJson);
        }
      }
    });
  }
	var urlParam = function (name, url) {
		if (!url) {
			url = window.location.href;
		}
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
		if (!results) {
			return "";
		}
		return results[1] || "";
	}
  
	$.fn.UserLogin = function (options) { //会员登录
		return this.each(function () {
			var $this = $(this);
			$this.FocusBlur();
			$this.on("keyup", "input", function (event) {
				if (event.keyCode == 13) {
					$this.find(".submit").click();
				}
			}).on("click", ".codeBtn", function () {
				$(this).clickGetCode(".codeImg"); //点击获取验证码
			}).on("click", ".submit", function () {
				var ispersistent = false;
				if ($this.find("#persistentcookie").attr("checked")) {
					ispersistent = true;
				}
				var $Uname = $this.find("input[name='UserName']"),
				$Pass = $this.find("input[name='LoginPassword']"),
				$Code = $this.find("input[name='Code']"),
				Uname = $Uname.val(),
				Pass = $Pass.val(),
				Code = $Code.val();
				if (!isTrim(Uname) || Uname == $Uname.attr("data-val")) {
					$Uname.Error("邮箱地址/手机号/用户名不能为空！");
					ts = false;
					return ts;
				} else if (Uname.indexOf("@") !== -1 && !isEmail(Uname)) {
					$Uname.Error("邮箱格式不正确！");
					ts = false;
					return ts;
				} else {
					ts = true;
				}

				if (!isTrim(Pass) || Pass == $Pass.attr("data-val")) {
					$Pass.Error("密码不能为空！");
					ts = false;
					return ts;
				} else if (!isPass(Pass)) {
					$Pass.Error("密码不能带有中文，并且个数在6-20位！");
					ts = false;
					return ts;
				} else {
					ts = true;
				}
				var datashow = $(".verification").attr("data-show");
				if (datashow == "true") {
					if ($Code.hasClass("none")) {
						$Code.Error("请先点击获取验证码！");
						ts = false;
						return ts;
					} else if (!isTrim(Code) || Code == $Code.attr("data-val")) {
						$Code.Error("验证码不能为空！");
						ts = false;
						return ts;
					}
				}
				$.ajax({
					url: '/user/login',
					type: 'post',
					data: {userName: Uname,loginPassword: Pass,persistent: ispersistent,showCode: datashow,code: Code},
					success: function (data) {
						switch (data.StatusCode) {
						case 0:
							$Code.Error(data.Message);
							break;
						case -1:
							$("body").append(alertConfirmhtml(data.OtherParameter));
							openUrl(".validation");
							break;
						case -2:
							$Pass.Error("账号或密码错误！");
							break;
						case -5:
							$Uname.Error("用户名、邮箱、电话号码不存在！");
							break;
						case 1:
              var from = urlParam("from");
              logincheckAjax(function(responseJson){
                var host = location.host.indexOf(".gamersky.com")!=-1?'.gamersky.com':'';
                if (responseJson.status == "ok") {
                  cookie("UserCookie", JSON.stringify(responseJson), {path: '/',domain: host});
                  window.location.href = from != ""? unescape(from) : "/home/";
                }
              });
							break;
						}
						if (data.OtherParameter == "ok") {
							$(".verification").attr("data-show", "true");
							$(".verification").show();
							$(".verificationerror").show();
						}
					}
				});
			});
		});
	};
	$.fn.RetrievePassword = function (options) { //找回密码
		return this.each(function () {
			var $this = $(this);
			$this.find(".RPcon.block").FocusBlur();
			$this.find(".RPnav").on("click", "a", function () {
				var $This = $(this),i = $This.index();
				$This.addClass("cur").siblings().removeClass("cur");
				$this.find(".RPcon").removeClass("block").addClass("none").eq(i).toggleClass("none block");
				$this.find(".RPcon.block").FocusBlur();
			});
			$this.on("keyup", "input[name='sendEmail']", function (event) {
				if (event.keyCode == 13) {
					$this.find(".SendEmailBtn").click();
				}
			}).on("keyup", "input[name='sendPhoneNumber']", function (event) {
				if (event.keyCode == 13) {
					$this.find(".SendcodeBtn").click();
				}
			}).on("keyup", "input[name='codeVal']", function (event) {
				if (event.keyCode == 13) {
					$this.find(".Subcode").click();
				}
			}).on("click", ".SendEmailBtn", function () {
				var $block = $this.find(".RPcon.block");
				var $sendEmail = $block.find("input[name='sendEmail']");
				var sendEmail = $sendEmail.val();
				if (!isTrim(sendEmail) || sendEmail == $sendEmail.attr("data-val")) {
					$sendEmail.Error("邮箱不能为空！");
					return false;
				} else if (!isEmail(sendEmail)) {
					$sendEmail.Error("邮箱格式不正确！");
					return false;
				}
				//发送邮箱
				if ($(".SendEmailBtn").hasClass("SendEmailBtn") == true) {
					$.ajax({
						url: '/user/sendemail',
						type: 'post',
						async: false,
						data: {
							email: sendEmail
						},
						success: function (data) {
							if (data.StatusCode == 1) {
								var htm1 = "<font size='5'>邮件已发送！</font>";
								var htm2 = "我们已经将确认信发到你的邮箱 <b>" + sendEmail + "</b><br/>";
								htm2 += "请查收<a href='http://mail." + sendEmail.split("@")[1] + "' target='_blank'>邮件</a>并点击确认信中的链接重设你的密码。<a href='http://www.gamersky.com/'>返回主页</a>";
								$block.find(".txt").html(htm1);
								$block.find(".input").html(htm2);
							} else {
								$sendEmail.Error(data.Message);
							}
						}
					});
				}

			}).on("click", ".SendcodeBtn", function () {
				var $block = $this.find(".RPcon.block");
				var $sendPhoneNumber = $block.find("input[name='sendPhoneNumber']");
				var sendPhoneNumber = $sendPhoneNumber.val();
				if (!isTrim(sendPhoneNumber) || sendPhoneNumber == $sendPhoneNumber.attr("data-val")) {
					$sendPhoneNumber.Error("手机号不能为空！");
					return false;
				} else if (!isNumBer(sendPhoneNumber)) {
					$sendPhoneNumber.Error("手机号只能是数字！");
					return false;
				} else if (sendPhoneNumber.length !== 11) {
					$sendPhoneNumber.Error("手机号必须是11位！");
					return false;
				}
				//验证手机是否在后台存在
				$.ajax({
					url: '/user/getvalidatenumber',
					type: 'post',
					data: {
						numberPhone: sendPhoneNumber
					},
					success: function (data) {
						if (data.StatusCode == 1) {
							var htm1 = '你选择的手机号 <b>' + sendPhoneNumber + '</b> 来重置密码';
							$block.find(".txt").html(htm1);
							$(".SendcodeBtn").attr("data-ban", "OK");
							$(".SendcodeBtn").val("获取手机验证码");
							$("#codeBtn").show();
							$(".SendcodeBtn").attr("class", "SendPhoneBtn");
						} else {
							$sendPhoneNumber.Error("手机号不存在！");
						}
					}
				});
			}).on("click", ".SendPhoneBtn", function () {
				if (!isTrim($(".code").val()) || $(".code").val() == '输入验证码') {
					$(".code").Error("验证码不能为空！");
					return false;
				}
				$.ajax({
					url: '/user/getcode',
					type: 'post',
					data: {
						codeNumber: $(".code").val()
					},
					success: function (data) {
						if (data.StatusCode == 1) {
							var $block = $this.find(".RPcon.block");
							var $sendPhoneNumber = $block.find("input[name='sendPhoneNumber']");
							var sendPhoneNumber = $sendPhoneNumber.val();
							var htm2 = '<input class="codeVal" type="text" name="codeVal" value="" maxlength="11" />';
							htm2 += '<div class="codeSendBtn" data-ban="OK" data-phonenumber="' + sendPhoneNumber + '" data-type="1"  data->获取手机验证码</div>';
							htm2 += '<input class="Subcode" type="submit" value="提 交" />';
							$block.find(".inputsend").html(htm2);
							$(".codeSendBtn").clickGetMessageCode(".codeDiv", ".codeVal", sendPhoneNumber, $(".code").val());
							$this.find("input[name='codeVal']").val("输入短信验证码").attr("data-val", "输入短信验证码");
						} else {
							$(".code").Error("验证码错误！");
						}
					}
				});

			}).on("click", ".codeSendBtn", function () {
				var phonenumber = $(this).attr("data-phonenumber");
				$(this).clickGetMessageCode(".codeDiv", ".codeVal", phonenumber, $(".code").val()); //点击发送验证码
			}).on("click", ".Subcode", function () {
				var $block = $this.find(".RPcon.block"),
				$codeVal = $block.find("input[name='codeVal']"),
				codeVal = $codeVal.val();
				var numberCode = $(".codeSendBtn").attr("data-phonenumber");
				var handleType = $(".codeSendBtn").attr("data-type");
				if ($codeVal.hasClass("none") == true) {
					$block.find(".codeSendBtn").Error("请先点击获取短信验证码！");
					return false;
				} else if (!isTrim(codeVal) || codeVal == $codeVal.attr("data-val")) {
					$codeVal.Error("短信验证码不能为空！");
					return false;
				}
				$.ajax({
					url: '/user/verifysmscode',
					type: 'post',
					data: {
						number: numberCode,
						numberCode: codeVal,
						handleType: handleType
					},
					success: function (data) {
						if (data.StatusCode == 1) {
							window.location.href = data.OtherParameter;
						} else {
							$block.find(".codeSendBtn").Error(data.Message);
						}
					}
				});
			});
		});
	};
	$.fn.ResetPassword = function (options) { //重置密码
		return this.each(function () {
			var $this = $(this);
			$this.FocusBlur();
			$this.on("keyup", "input", function (event) {
				if (event.keyCode == 13) {
					$this.find(".submit").click();
				}
			}).on("click", ".submit", function () {
				var $newPassword = $this.find("input[name='NewPassword']"),
				$CfnewPassword = $this.find("input[name='CfnewPassword']"),
				newPassword = $newPassword.val(),
				CfnewPassword = $CfnewPassword.val();
				if (!isTrim(newPassword) || newPassword == $newPassword.attr("data-val")) {
					$newPassword.Error("密码不能为空！");
					ts = false;
					return ts;
				} else if (!isPass(newPassword)) {
					$newPassword.Error("密码不能带有中文，并且个数在6-20位！");
					ts = false;
					return ts;
				} else {
					ts = true;
				}

				if (!isTrim(CfnewPassword) || CfnewPassword == $CfnewPassword.attr("data-val")) {
					$CfnewPassword.Error("确认密码不能为空！");
					ts = false;
					return ts;
				} else if (newPassword !== CfnewPassword) {
					$CfnewPassword.Error("两次密码不一致！");
					ts = false;
					return ts;
				} else {
					ts = true;
				}
				if (ts == false) {
					return false;
				}
			});
		});
	};
	$.fn.Activate = function (options) { //加入游民星空
		return this.each(function () {
			var $this = $(this);
			$this.on("keyup", "input", function (event) {
				if (event.keyCode == 13) {
					$this.find(".submit").click();
				}
			}).on("click", ".submit", function () {
				var $username = $this.find("input[name='username']"),
				username = $username.val();
				if (isTrim(username) == "") {
					$username.Error("用户名不能为空！")
					return false;
				}
				if (isNumBer(username)) {
					$username.Error("用户名不能是电话号码！")
					return false;
				}
				if (isEmail(username)) {
					$username.Error("用户名不能是邮箱！");
					return false;
				}
				if (!username.match(/^(?:[A-Za-z0-9]{4,16}|[\u4E00-\u9FA5\uF900-\uFA2D-A-Za-z0-9]{2,8}|^1[3|5]{1}\d{9}|)$/)) {
					$username.Error("只能输入2-8个中文或者4-16个英文字母！！");
					return false;
				}

				var year = $("#select_year option:selected").val();
				var month = $("#select_month option:selected").val();
				var day = $("#select_day option:selected").val();
				var selectdate = true;
				if ((month == "0" || day == "0") && (year != "0")) {
					selectdate = false;
				}
				if (!selectdate) {
					$this.find("#select_day").ErrorLayer("请选择正确日期！");
					return false;
				}
				var selectcountry = $("#select_country option:selected").val();
				var selectprovince = $("#select_province option:selected").val();
				var selectcity = $("#select_city option:selected").val();
				if (selectcountry == "0" || selectprovince == "0" || selectcity == "0") {
					$this.find("#select_city").ErrorLayer("请选择正确区域！");
					return false;
				}
				document.usersubmit.submit();
			});
		});
	};
	function alertConfirmhtml(options) {
		var confirmhtml = '<div class="dp_pop_mask"></div>';
		confirmhtml += '<div class="dp_pop_layer">';
		confirmhtml += '<div class="dp_pop_top"><a href="javascript:;" class="dp_pop_close">×</a></div>';
		confirmhtml += '<div class="con">用户未通过邮箱认证！</div>';
		confirmhtml += '<div class="btn"><a target="_blank" class="btn validation" href="javascript:;" data-email=' + options + '>去认证</a></div>';
		confirmhtml += '</div>';
		return confirmhtml;
	}
	function openUrl(div) {
		$(div).on("click", function (event) {
			event.preventDefault();
			var email = $(this).attr("data-email");
			var url = '//i.gamersky.com/user/register/checkemail/?email=' + email + '&type=2';
			$(".dp_mask,.dp_layer,.dp_pop_mask,.dp_pop_layer").remove();
			window.open(url, '_blank');
		});
	}
})(jQuery);

$(function () {
	$("#Reg").RegUser(); //注册
	$("#EmailOK").EmailOK(); //邮箱注册成功
	$("#Login").UserLogin(); //登录
	$("#RetrievePassword").RetrievePassword(); //找回密码
	$("#ResetPassword").ResetPassword(); //找回密码
	$("#RegSupply").Activate();
	$(".Vcode").click(function (event) {
		event.preventDefault();
		$("#Vcode").attr("src", "/home/getvalidatecode?time=" + (new Date()).getTime());
	});
	$(".EmailVcode").click(function (event) {
		event.preventDefault();
		$("#EmailVcode").attr("src", "/home/getvalidatecode?time=" + (new Date()).getTime());
	});
	$(document).on("click", ".dp_mask,.dp_layer_close,.dp_pop_close", function (event) { //关闭弹窗
		event.preventDefault();
		$(".dp_mask,.dp_layer,.dp_pop_mask,.dp_pop_layer").remove();
	});

});
