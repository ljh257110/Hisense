$(function(){
//======================================================================
			//轮播图		
		var num = 0;
		function pic(){
			$("#pic li").stop().animate({
				opacity:0
			});
			$("#pic li").eq(num).stop().animate({
				opacity:1
			});
			$("#btn li").attr("class","");
			$("#btn li").eq(num).attr("class","active");
		}
		var timer = setInterval(function(){
			pic();
			num++;		
			if(num == 2){
				num = 0;
			}
		},1000)
		$("#btn li").hover(function(){
			clearInterval(timer);
			num = $(this).index();
			pic();
		},function(){
			timer = setInterval(function(){						
			num++;		
			if(num == 2){
				num = 0;
			}
			pic();
		},1000)
		})
		$("#pic li").hover(function(){
			clearInterval(timer);
			
		},function(){
			
			timer = setInterval(function(){	
			pic();					
			num++;		
			if(num == 2){
				num = 0;
			}			
		},1000)
		});
		$("#banner").hover(function(){
			$("#banner div a").css("display","block");
		},function(){
			$("#banner div a").css("display","none");
		})
		$("#banner div #btn_prev").hover(function(){
			clearInterval(timer);
			num--;
		},function(){
			num++;
		})
		$("#banner div #btn_next").mouseover(function(){
			clearInterval(timer);
		})
		$("#banner div #btn_prev").click(function(){
			num--;			
			pic();									
			if(num == -1){
				num = 1;
			}

			return false;
		})
		$("#banner div #btn_next").click(function(){
			clearInterval(timer);
			pic();					
			num++;		
			if(num == 2){
				num = 0;
			}			
			return false;
		})
//======================================================================
			//侧边栏
		$("#nav #menu .allClassify").hover(function(){
			$("#nav #menu .classify").css("display","block");
		},function(){
			$("#nav #menu .classify").css("display","none");
		})
		//================================侧边栏================================
			
		$.ajax({
				url: "data/sidebar.json",
				type: "get",
				success:function(data){
					var html = "";
					for(var i = 0; i < data.length; i++){
						html += '<li class  = "item"><a href="two-index.html" target = "_blank" ><div class = "cate"><p>' + data[i].id + '</p></div></a><div class = "exh"><ul class = "left"></ul><ul class = "right"></ul></div></li>';
						
					}
					$("#nav #menu .classify ul").html(html);
					for(var j = 0; j < data.length; j++){
						$("#nav #menu .classify .cate").eq(j).css("background","url(" + data[j].img + ") no-repeat 26px center");
					}
					secondmenu();
				}
			})
		
//========================================================================
		function secondmenu(){
			$.ajax({
				url: "data/secondmenu.json",
				type: "get",
				success:function(data){
					var html = "";
					for(let i = 0; i < data.length; i += 2){
						for(let j = 0; j < data[i].length; j++){
							html += '<li><a href="http://www.hisense.com/category/5822bc6a937cbd775d20476c.html"><img src=' + data[i][j].img + ' width="40" height="40" /><span>' + data[i][j].desc + '</span></a></li>';
						}
						$("#nav #menu .classify .exh .left").eq(i / 2).html(html);
						html = "";
					}
					for(let m = 1; m < data.length; m += 2){
						if(data[m] == ""){
								$("#nav #menu .classify .exh").eq((m -1)/ 2).css("width",270);
							}else{
								$("#nav #menu .classify .exh").eq((m -1)/ 2).css("width",549);
								for(let n = 0; n < data[m].length; n++){
							
							html += '<a href="#"><li><div><p class="name">' + data[m][n].name + '</p><p class="price"><span>¥</span>' + data[m][n].price + '</p></div><img src='+ data[m][n].img + ' /></li></a>'
								}
							$("#nav #menu .classify .exh .right").eq((m - 1)/2).html(html);
							html = "";
							}
						
					}
					$("#nav #menu .classify ul .item").hover(function(){
							$(this).css("background","#f5f5f5");
							$("#nav #menu .classify ul li .exh").css("display","none")
							$("#nav #menu .classify ul li .exh").eq($(this).index()).css("display","block");
						},function(){
							$(this).css("background","#fff");
							$("#nav #menu .classify ul li .exh").css("display","none");
						})
					$("#nav #menu .classify ul li .exh").hover(function(){				
						$("#nav #menu .classify ul .item").eq($(this).parent().index()).css("background","rgb(245,245,245,0.3)")
						
					},function(){
						$("#nav #menu .classify ul .item").eq($(this).parent().index()).css("background","#f5f5f5")
					})
					

				}
			})
		}
//===============================banner===============================
		$.ajax({
				url: "data/banner2.json",
				type: "get",
				success:function(data){
					$("#pic li").eq(0).find("img").attr("src",data[0]);
					$("#pic li").eq(1).find("img").attr("src",data[1]);
				}
			})

//=======================容声冰箱===================================
	$.ajax({
				url: "data/refrigerator.json",
				type: "get",
				success:function(data){
					// alert(data.length)
					var html1 = "",html2 = "";
					for(var i = 0; i < data.length; i++){	
						html1 += '<div class = "brand border_style"><span class = "first_name">' + data[i].first_name + '</span><ul></ul></div>'
						$(".content .homepage .brand-content").html(html1);				
					}
					for(let i = 0; i < data.length; i++){
						for(var j = 0;j < data[i].desc.length; j++){
							html2 += '<li><a href="#">' + data[i].desc[j] + '</a></li>';
						}	
						$(".content .homepage .brand-content .border_style").eq(i).find("ul").html(html2);
						html2 = "";
					}
				}
			})

//=======================展开、收缩=====================================
		var isYes = false;
		$(".content .homepage .shrink").click(function(){
			if(isYes){
				$(".content .homepage .brand-content").stop().animate({
					height:"153px"
				});
				$(".content .homepage .shrink span").html("展开");
				$(".content .homepage .shrink img").css("transform","rotate(0deg)");
			}else{
				$(".content .homepage .brand-content").stop().animate({
					height:"408px"
				});
				$(".content .homepage .shrink span").html("收缩");
				$(".content .homepage .shrink img").css("transform","rotate(180deg)");
			}
			isYes = !isYes;
			return false;
		})
	
//=========================list-brands=================================
		function list(){
						
					}
		$.ajax({
				url: "data/list-sell.json",
				type: "get",
				success:function(data){
					// alert(data.length)
					var html = "";
						for(var i = 0; i < data.length; i++){
							html += '<li><a href="#"><div class = "good-des"><img src=' + data[i].img + ' /><div class = "money-popularity"><span class = "content-good">' + data[i].money_popularity[0] + '</span><span class = "money">' + data[i].money_popularity[1] + '</span><span class = "popularity">' + data[i].money_popularity[2] + '</span></div></div></a><div class = "need"><a><div class = "compare"><span>对比</span></div></a><a href="#" class = "com-sty">立即购买</a></div></li>'
							$(".content .list-brands .ul1").html(html);	

						}
						$(".content .list-brands .ul1 li").eq(3).css("margin-right",0);
						$(".content .list-brands .ul1 li").eq(7).css("margin-right",0);
						$(".content .list-brands .ul1 li").eq(11).css("margin-right",0);
	//========================================================
		//图片动画
						$(".content .list-brands .list li").hover(function(){
								$(this).find(".good-des").stop().animate({
									top:"-10px"
									
								},400);
								$(this).find(".need .com-sty").css("background","#00AAA6").css("color","#fff");
											
							},function(){
								$(this).find(".good-des").stop().animate({
									top:"0px"
									
								},400);
								$(this).find(".need .com-sty").css("background","#fff").css("color","#333");
									
							}
						)
					Compare1();
					deleteLi();
				}
			})
		$.ajax({
				url: "data/list-comment.json",
				type: "get",
				success:function(data){
					// alert(data.length)
					var html = "";
						for(var i = 0; i < data.length; i++){
							html += '<li><a href="#"><div class = "good-des"><img src=' + data[i].img + ' /><div class = "money-popularity"><span class = "content-good">' + data[i].money_popularity[0] + '</span><span class = "money">' + data[i].money_popularity[1] + '</span><span class = "popularity">' + data[i].money_popularity[2] + '</span></div></div></a><div class = "need"><a><div class = "compare"><span>对比</span></div></a><a href="#" class = "com-sty">立即购买</a></div></li>'
							$(".content .list-brands .ul2").html(html);	

						}
						$(".content .list-brands .ul2 li").eq(3).css("margin-right",0);
						$(".content .list-brands .ul2 li").eq(7).css("margin-right",0);
						$(".content .list-brands .ul2 li").eq(11).css("margin-right",0);
	//========================================================
		//图片动画
						$(".content .list-brands .list li").hover(function(){
								$(this).find(".good-des").stop().animate({
									top:"-10px"
									
								},400);
								$(this).find(".need .com-sty").css("background","#00AAA6").css("color","#fff");
											
							},function(){
								$(this).find(".good-des").stop().animate({
									top:"0px"
									
								},400);
								$(this).find(".need .com-sty").css("background","#fff").css("color","#333");
									
							}
						)
					Compare2();
					deleteLi();
				}
			})
		$.ajax({
				url: "data/list-price.json",
				type: "get",
				success:function(data){
					// alert(data.length)
					var html = "";
						for(var i = 0; i < data.length; i++){
							html += '<li><a href="#"><div class = "good-des"><img src=' + data[i].img + ' /><div class = "money-popularity"><span class = "content-good">' + data[i].money_popularity[0] + '</span><span class = "money">' + data[i].money_popularity[1] + '</span><span class = "popularity">' + data[i].money_popularity[2] + '</span></div></div></a><div class = "need"><a><div class = "compare"><span>对比</span></div></a><a href="#" class = "com-sty">立即购买</a></div></li>'
							$(".content .list-brands .ul3").html(html);	

						}
						$(".content .list-brands .ul3 li").eq(3).css("margin-right",0);
						$(".content .list-brands .ul3 li").eq(7).css("margin-right",0);
						$(".content .list-brands .ul3 li").eq(11).css("margin-right",0);
	//========================================================
		//图片动画
						$(".content .list-brands .list li").hover(function(){
								$(this).find(".good-des").stop().animate({
									top:"-10px"
									
								},400);
								$(this).find(".need .com-sty").css("background","#00AAA6").css("color","#fff");
											
							},function(){
								$(this).find(".good-des").stop().animate({
									top:"0px"
									
								},400);
								$(this).find(".need .com-sty").css("background","#fff").css("color","#333");
									
							}
						)
					Compare3();
					deleteLi();
				}
			})
		$(".order-goods .fsort").click(function(){
			var index = $(this).index() - 1;
			$(".order-goods .fsort").attr("id","");
			$(this).attr("id","active");
			$(".content .list-brands .list").css("display","none");
			$(".content .list-brands .list").eq(index).css("display","block");
			/*$(".order-goods .fsort").css("display","none");
			$(this)*/
		})
//================================商品对比=================================
	function Compare1(){
		var isCompare = [];
		for(var i = 0; i < $(".content .list-brands .ul1 li").length; i++){
				isCompare[i] = false;
			}
		$(".content .list-brands .ul1 li .need .compare").click(function(){

			$(".compare-item").css("display","block");
			var index = $(this).parent().parent().parent().index();
			var img = $(".content .list-brands .ul1 li").eq(index).find("img").attr("src");
			var name = $(".content .list-brands .ul1 li").eq(index).find(".content-good").html();
			var price = $(".content .list-brands .ul1 li").eq(index).find(".money").html();
			if(!isCompare[index]){
				$(".content .list-brands .ul1 li").eq(index).find(".need .compare").css("background-image","url(images/choose.png)");
				if($(".compare-item .three_brand ul li").length == 3){
					$(".compare-item .warning-item").css("display","block");
				}else{
					$(".compare-item .warning-item").css("display","none");
					var html = '<li><a class="has-brand has-brand1"><img src='+ img +'  /><span class="small-des">'+ name +'</span><span class="small-price">'+ price +'</span><span class="delete del-brand del-brand2">删除</span></a></li>';
					$(".compare-item .three_brand ul").append(html);
				}
				

			}else{
				$(".content .list-brands .ul1 li").eq(index).find(".need .compare").css("background","url(images/no_choose.png) no-repeat 35px 20px");
				for(var j = 0; j < $(".compare-item .three_brand ul li").length; j++){
					var desc = $(".compare-item .three_brand ul li").eq(j).find(".small-des").html();
					if(desc == name){
						$(".compare-item .three_brand ul li").eq(j).remove();
						$(".compare-item .warning-item").css("display","none");
					}
				}
			}
			isCompare[index] = !isCompare[index];
			deleteLi();
			Compare();
			deleteAll();
		})
	}
	function Compare2(){
		var isCompare = [];
		for(var i = 0; i < $(".content .list-brands .ul1 li").length; i++){
				isCompare[i] = false;
			}
		$(".content .list-brands .ul2 li .need .compare").click(function(){
			$(".compare-item").css("display","block");
			var index = $(this).parent().parent().parent().index();
			var img = $(".content .list-brands .ul2 li").eq(index).find("img").attr("src");
				var name = $(".content .list-brands .ul2 li").eq(index).find(".content-good").html();
				var price = $(".content .list-brands .ul2 li").eq(index).find(".money").html();
			if(!isCompare[index]){
				$(".content .list-brands .ul2 li").eq(index).find(".need .compare").css("background-image","url(images/choose.png)");
				
				if($(".compare-item .three_brand ul li").length == 3){
					$(".compare-item .warning-item").css("display","block");
				}else{
					$(".compare-item .warning-item").css("display","none");
					var html = '<li><a class="has-brand has-brand1"><img src='+ img +'  /><span class="small-des">'+ name +'</span><span class="small-price">'+ price +'</span><span class="delete del-brand del-brand2">删除</span></a></li>';
					$(".compare-item .three_brand ul").append(html);
				}
			}else{
				$(".content .list-brands .ul2 li").eq(index).find(".need .compare").css("background","url(images/no_choose.png) no-repeat 35px 20px");
					for(var j = 0; j < $(".compare-item .three_brand ul li").length; j++){
					var desc = $(".compare-item .three_brand ul li").eq(j).find(".small-des").html();
					if(desc == name){
						$(".compare-item .three_brand ul li").eq(j).remove();
						$(".compare-item .warning-item").css("display","none");
					}
				}
			}
			isCompare[index] = !isCompare[index];
			deleteLi();
			Compare();
			deleteAll();
		})
	}
	function Compare3(){
		var isCompare = [];
		for(var i = 0; i < $(".content .list-brands .ul1 li").length; i++){
				isCompare[i] = false;
			}
		$(".content .list-brands .ul3 li .need .compare").click(function(){
			$(".compare-item").css("display","block");
			var index = $(this).parent().parent().parent().index();
			var img = $(".content .list-brands .ul3 li").eq(index).find("img").attr("src");
				var name = $(".content .list-brands .ul3 li").eq(index).find(".content-good").html();
				var price = $(".content .list-brands .ul3 li").eq(index).find(".money").html();
			if(!isCompare[index]){
				$(".content .list-brands .ul3 li").eq(index).find(".need .compare").css("background-image","url(images/choose.png)");
				
				if($(".compare-item .three_brand ul li").length == 3){
					$(".compare-item .warning-item").css("display","block");
				}else{
					$(".compare-item .warning-item").css("display","none");
					var html = '<li><a class="has-brand has-brand1"><img src='+ img +'  /><span class="small-des">'+ name +'</span><span class="small-price">'+ price +'</span><span class="delete del-brand del-brand2">删除</span></a></li>';
					$(".compare-item .three_brand ul").append(html);
				}
			}else{
				$(".content .list-brands .ul3 li").eq(index).find(".need .compare").css("background","url(images/no_choose.png) no-repeat 35px 20px");
					for(var j = 0; j < $(".compare-item .three_brand ul li").length; j++){
					var desc = $(".compare-item .three_brand ul li").eq(j).find(".small-des").html();
					if(desc == name){
						$(".compare-item .three_brand ul li").eq(j).remove();
						$(".compare-item .warning-item").css("display","none");
					}
				}
			}
			isCompare[index] = !isCompare[index];
			deleteLi();
			Compare();
			deleteAll();
	
		})
	}
	
//=========================================

		function deleteLi(){
			$(".compare-item .three_brand ul li .del-brand").click(function(){
				// alert(1)
				
				var desc = $(this).parent().parent().find(".small-des").html();
				$(".compare-item .warning-item").css("display","none");
				for(var j = 0; j < $(".list-brands ul li").length; j++){
					var name = $(".content .list-brands ul li").eq(j).find(".content-good").html();
					if(desc == name){
						$(".content .list-brands ul li").eq(j).find(".need .compare").css("background","url(images/no_choose.png) no-repeat 35px 20px");
					}
				}
				$(this).parent().parent().remove();
			})
		}
		function Compare(){
			var num = $(".compare-item .three_brand ul li").length;
			$(".compare-it").click(function(){
				switch(num){
					case 0:
						$(".compare-it").attr("href","");
						break;
					case 1:
						$(".compare-it").attr("href","");
						break;
					case 2:
						$(".compare-it").attr("href","http://www.hisense.com/product/compare.html");
						break;
					case 3:
						$(".compare-it").attr("href","http://www.hisense.com/product/compare.html");
						break;
					default:
						break;	
				}
			})
			
		}
		function deleteAll(){
			$(".clear-it").click(function(){
				 $(".compare-item").css("display","none");
			 	$(".compare-item .three_brand ul").html("");
			 	$(".content .list-brands ul li .need .compare").css("background","url(images/no_choose.png) no-repeat 35px 20px");
			})
			

		}
		/*function deleteOne(){
			for(var j = 0; j < $(".compare-item .three_brand ul li").length; j++){
					var desc = $(".compare-item .three_brand ul li").eq(j).find(".small-des").html();
					alert(desc)
					if(desc == name){
						$(".compare-item .three_brand ul li").eq(j).remove();
					}
			}
		}*/
//===========================返回顶部====================================
	
			$(window).scroll(function(){
				if($(this).scrollTop() < 540){
					$(".fixed_nav ul .back_top").css("visibility" ,"hidden");
				}else{
					$(".fixed_nav ul .back_top").css("visibility" ,"visible");
				}
			
			})
			$(".fixed_nav ul .back_top").click(function(){
				$("body,html").stop().animate({
					scrollTop:0
				},400);
			})
//==============================底部连接====================================
			$.ajax({
				url: "data/footer2.json",
				type: "get",
				success:function(data){
					var html1 = "",html2 = "";
					for(var k = 0; k < data.length; k++){
						html1 += '<dl><dt><p>'+ data[k][0] +'</p></dt><dd></dd></dl>';
					}
					$(".links").html(html1);
					for(var i = 0; i < data.length; i++){
					
						for(var j = 1; j < data[i].length; j++){
							html2 += '<a href="http://www.hisense.cn/gyhx/index.aspx?nodeid=138" target = "_blank" >'+ data[i][j] +'</a>';
						}
						$(".links dl").eq(i).find("dd").html(html2);
						html2 = "";
					}
					
				}
			})		

	})