$(function(){
			
			
			$(".panel form .username input").focus(function(){
				var text = $(this).val();
				if(text == "邮箱/手机/用户名"){
					$(this).attr("class","active").css("display","block").val("");
					$(".error").css("display","none");
				}else{
					$(this).attr("class","active").css("display","block");
					$(".error").css("display","none");
				}
				
				
			})
			$(".panel form .username input").blur(function(){
				var text = $(this).val();
				if(!text){
					$(this).attr("class","").val("邮箱/手机/用户名");
				}else{
					$(this).attr("class","");
				}
				
				
			})
			$(".panel form .password input").focus(function(){
				var text = $(this).val();
				if(text == "密码"){
					$(this).attr("class","active").css("display","block").val("").attr("type","password");
					$(".error").css("display","none");
				}else{
					$(this).attr("class","active").css("display","block").attr("type","password");
					$(".error").css("display","none");
				}
				
				
			})
			$(".panel form .password input").blur(function(){
				var text = $(this).val();
				if(!text){
					$(this).attr("class","").val("密码").attr("type","text");
				}else{
					$(this).attr("class","").attr("type","password");
				}
				
				
			})
			
			$(".btn").click(function(){
					var username = $(".panel form .username #username_text").val();
					var password = $(".panel form .password #pass_text").val();
					var username_text = "邮箱/手机/用户名";
					var pass_text = "密码";
					if(username == username_text && password != pass_text){
						$(".error .error_text").html("用户名不能为空");
						$(".error").css("display","block");
					}else if(password == pass_text && username != username_text){
						$(".error .error_text").html("密码不能为空");
						$(".error").css("display","block");
					}else if(username == username_text && password == pass_text){
						$(".error .error_text").html("用户名和密码不能为空");
						$(".error").css("display","block");
					}else if(username != username_text && password != pass_text){
						var isYes =  $.cookie("register") ? false : true;
						if(!isYes){
							var cookieStr = $.cookie("register");
						// alert(cookieStr)
							var newarr = cookieStr.split(":");
							// alert(newarr)
							for(var i = 0; i < newarr.length;){
								if(newarr[i] == username){
									if(newarr[i + 1] == password){
										alert("登录成功");
										$(".error").css("display","none");
										break;
									}
								}else{
									$(".error .error_text").html("用户名和密码不匹配");
									$(".error").css("display","block");
									$(".panel form .username input").val(username_text);
									$(".panel form .password input").attr("type","text").val(pass_text);
								}
								i += 2;
							}
						}else{
							$(".error .error_text").html("用户名和密码不匹配");
									$(".error").css("display","block");
									$(".panel form .username input").val(username_text);
									$(".panel form .password input").attr("type","text").val(pass_text);
						}
						
					}
					
			})
			$(".reset_btn").click(function(){
				$(".panel form .username input").val("邮箱/手机/用户名");
				$(".panel form .password input").attr("type","text").val("密码");
				$(".error").css("display","none");
			})
			
})