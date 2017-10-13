$(function(){
//==================改变选中的内容======================================
		var arrYes = [true,true,true];
		function username(){
			var content = $(".reg .reg_right .reg_cont .select_name .select_input").find("option:selected").text();
			var placeholder = "";		
			switch(content){
				case "用户名":
					placeholder = "请输入用户名";
					warn_content = "用户名由4-30位数字字母组成";
					break;
				case "手机":
					placeholder = "请输入您的11位手机号码";
					warn_content = "请输入正确的手机号码";
					break;
				case "邮箱":
					placeholder = "请输入您的邮箱地址";
					warn_content = "请输入正确的邮箱格式";
					break;
				default:
					alert("error");
					break;
			}
			$(".reg .reg_right .reg_cont .username .text_input").attr("placeholder",placeholder).css("background-color","#fff").css("border-color","#b2b2b2");
			$(".reg .reg_right .reg_cont .username .tooltips-prompt .tooltips-content").html(placeholder);
			$(".reg .reg_right .reg_cont .username .tooltips-warn .tooltips-content").html('<i class="iconfont icon-jinggao"></i>' + warn_content);
			arrYes[0] = true;
		}
		username();
		$(".reg .reg_right .reg_cont .select_name .select_input").change(function(){
			username();
		})
//===================信息提示框==========================================
		var isTest = [false,false,false];
		function tooltips_show(){
			
			$(".reg .reg_right .reg_cont .item").find(".text_input").focus(function(){	
				var index = $(this).parent().index() -1;		
				if(!$(this).val() && arrYes[index]){
					$(this).parent().find(".tooltips-prompt").stop().animate({
						bottom:"30px",
						"opacity":1,
						"filter":"alpha(opacity = 100)"
					},500).css("visibility","visible");
					arrYes[index] = false;
				}else{

					$(this).parent().find(".tooltips-warn").stop().animate({
						bottom:"30px",
						"opacity":1,
						"filter":"alpha(opacity = 100)"
					},500).css("visibility","visible");
				}
				if($(this).parent().find(".input_success").css("display") == "block"){
					$(this).parent().find(".tooltips").css("visibility","hidden");
				}
			})
//===========================用户名检测===============================
			$(".reg .reg_right .reg_cont .username .text_input").blur(function(){
				var content = $(".reg .reg_right .reg_cont .select_name .select_input").find("option:selected").text();
				$(".reg .reg_right .reg_cont .username .tooltips-prompt").css("visibility","hidden").css("opacity",0).css("filter","alpha(opacity = 0)");
				if(content == "用户名"){
					if( /^[a-zA-Z\d]{3,29}$/.test($(this).val())){
						$(".reg .reg_right .reg_cont .username .input_success").css("display","block");
						$(this).css("background-color","#fff").css("border-color","#b2b2b2");
						isTest[0] = true;
					}else{
						$(".reg .reg_right .reg_cont .username .tooltips-warn").stop().animate({
							bottom:"30px",
							"opacity":1,
							"filter":"alpha(opacity = 100)"
						},500).css("visibility","visible");
					}
				}else if(content == "手机"){
					if(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test($(this).val())){
						$(".reg .reg_right .reg_cont .username .input_success").css("display","block");
						$(this).css("background-color","#fff").css("border-color","#b2b2b2");
						isTest[0] = true;
					}else{
						$(".reg .reg_right .reg_cont .username .tooltips-warn").stop().animate({
							bottom:"30px",
							"opacity":1,
							"filter":"alpha(opacity = 100)"
						},500).css("visibility","visible");
					}
				}else if(content == "邮箱"){
					if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val())){
						$(".reg .reg_right .reg_cont .username .input_success").css("display","block");
						$(this).css("background-color","#fff").css("border-color","#b2b2b2");
						isTest[0] = true;
					}else{
						$(".reg .reg_right .reg_cont .username .tooltips-warn").stop().animate({
							bottom:"30px",
							"opacity":1,
							"filter":"alpha(opacity = 100)"
						},500).css("visibility","visible");
					}
				}
				
			})
//===========================密码===============================
			$(".reg .reg_right .reg_cont .password .text_input").blur(function(){
				$(".reg .reg_right .reg_cont .password .tooltips-prompt").css("visibility","hidden").css("opacity",0).css("filter","alpha(opacity = 0)");
				if(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test($(this).val())){
					$(".reg .reg_right .reg_cont .password .input_success").css("display","block");
					$(this).css("background-color","#fff").css("border-color","#b2b2b2");
					isTest[1] = true;
				}else{
					$(".reg .reg_right .reg_cont .password .tooltips-warn").stop().animate({
						bottom:"30px",
						"opacity":1,
						"filter":"alpha(opacity = 100)"
					},500).css("visibility","visible");
				}
			})
//========================再次输入密码====================================
			$(".reg .reg_right .reg_cont .confirm .text_input").blur(function(){
				$(".reg .reg_right .reg_cont .confirm .tooltips-prompt").css("visibility","hidden").css("opacity",0).css("filter","alpha(opacity = 0)");
				var val = $(".reg .reg_right .reg_cont .password .text_input").val();
				if($(this).val() == val && val){
					$(".reg .reg_right .reg_cont .confirm .input_success").css("display","block");
					$(this).css("background-color","#fff").css("border-color","#b2b2b2");
					isTest[2] = true;
				}else{
					$(".reg .reg_right .reg_cont .confirm .tooltips-warn").stop().animate({
						bottom:"30px",
						"opacity":1,
						"filter":"alpha(opacity = 100)"
					},500).css("visibility","visible");
				}
			})

			$(".reg .reg_right .reg_cont .item").find(".text_input").blur(function(){
				if($(this).parent().find(".input_success").css("display") == "none"){
					$(this).css("background-color","#ffe6e7").css("border-color","#fca1a5");
				}
				$(".reg .reg_right .reg_cont .item .tooltips-prompt").css("visibility","hidden").css("opacity",0).css("filter","alpha(opacity = 0)");
				$(".reg .reg_right .reg_cont .item .tooltips-warn").css("visibility","hidden").css("opacity",0).css("filter","alpha(opacity = 0)");
			})
		}
		tooltips_show();
//=======================检测成功登陆=====================================
		var isSucess = true;
		$(".reg_btn").click(function(){
			login();
			if(isSucess){
				var username = $(".reg .reg_right .reg_cont .username .text_input").val();
				var password = $(".reg .reg_right .reg_cont .password .text_input").val();
				var isFirst = $.cookie("register") ? true : false;
				if(!isFirst){
					$.cookie("register", username + ":" + password, {
						expires: 7,
						path:"/"
					});					
				}else{
					var cookieStr = $.cookie("register");
						var newarr = cookieStr.split(":");
						var tmp = false;
						for(var i = 0; i < newarr.length; ){
							if(newarr[i] == username){
								/*newarr[i + 1] = Number(newarr[i + 1]) + 1;
								cookieStr = newarr.join(":");*/
								$(".reg .reg_right .reg_cont .username .tooltips-warn .tooltips-content").html('<i class="iconfont icon-jinggao"></i>用户名已经被注册');
								$(".reg .reg_right .reg_cont .username .tooltips-warn").stop().animate({
									bottom:"30px",
									"opacity":1,
									"filter":"alpha(opacity = 100)"
								},500).css("visibility","visible");
								$(".reg .reg_right .reg_cont .username .text_input").css("background-color","#ffe6e7").css("border-color","#fca1a5");
								$(".reg .reg_right .reg_cont .username .input_success").css("display","none");
								 tmp = true;
								 break;
							}
							i += 2;
						}
						if(!tmp){
							cookieStr += ":" + username + ":" + password;
						}
						$.cookie("register",cookieStr,{
							expires:7,
							path:"/"
						})	 

				}
			}
			alert($.cookie("register")); 
		})

		function login(){
			
			for(var i = 0; i < isTest.length; i++){
				if(!isTest[i]){
					isSucess = false;
					break;
				}
			}
			return isSucess;
			/*if(isSucess){
				alert("登录成功");
			}*/
		
		}
		

	})
