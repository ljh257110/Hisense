$(function(){
			
//========================顶部=============================================
		/*$.ajax({
				url: "json/top.json",
				type: "get",
				success:function(data){
					for(var i = 0; i < 3;i++){
						$("#header_left li").eq(i).find("a").html(data[0].left[i]);
					
					}
					
					for(var j = 0; j < 6;j++){
						$("#header_right li").eq(j).find("a").html(data[0].right[j]);
					}
					

					
				}
			})*/
//============================funcNav==================================
		$.ajax({
				url: "data/funcNav.json",
				type: "get",
				success:function(data){
					var html = '<div id = "funcNav_left"><div class = "pic1"><img src='+ data[0][0].img +' /><p>'+ data[0][0].name +'</p></div><div><img src='+ data[0][1].img +' /><p>'+ data[0][1].name +'</p></div><div class = "pic3"><img src='+ data[0][2].img +' /><p>'+ data[0][2].name +'</p></div><div ><img src='+ data[0][3].img +' /><p>'+ data[0][3].name +'</p></div></div><a href="http://www.hisense.com/product/596c78a6937cbd276ab38002.html" target = "_blank" ><img src='+ data[1][0] +' /></a><a href="http://www.hisense.com/product/596c78a6937cbd276ab38002.html" target = "_blank" ><img src='+ data[1][1] +' /></a><a href="http://www.hisense.com/product/596c78a6937cbd276ab38002.html" target = "_blank" ><img src='+ data[1][2] +' /></a>'
					$("#funcNav").html(html);
					$("#hookFace img").attr("src",data[1][3]);
					$(".prefecture img").attr("src",data[1][4]);
				}
			})
		
//======================================================================
			//轮播图
		function banner(){
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
			if(num == 6){
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
			if(num == 6){
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
			if(num == 6){
				num = 0;
			}			
		},1000)
		});
		$("#banner").hover(function(){
			$("#banner div .banner_btn").css("display","block");
		},function(){
			$("#banner div .banner_btn").css("display","none");
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
				num = 5;
			}

			return false;
		})
		$("#banner div #btn_next").click(function(){
			clearInterval(timer);
			pic();					
			num++;		
			if(num == 6){
				num = 0;
			}			
			return false;
		})
	}
//====================================================================
		$.ajax({
				url: "data/video.json",
				type: "get",
				success:function(data){
					var html = "";
					for(var n= 0; n < 3; n++){
						for(var i = 0; i < data.length; i++){
						html += '<li><a href="" target = "_blank" ><img src=' + data[i].img +' /></a></li>';
						
						}
					}
					$(".video ul").html(html);
					var oUL = document.getElementById('video-slide');
					drag(oUL);
				}
			})

		//拖拽动画
		function drag(node){
			//1、添加鼠标按下事件
			var offsetX = 0; //记录相对位置
			node.onmousedown = function(ev){
				var e = ev || window.event;
				offsetX = e.clientX - node.offsetLeft;
				//2、添加移动
				document.onmousemove = function(ev){
					var e = ev || window.event;
					//改变拖拽物体的坐标
					node.style.left = e.clientX - offsetX + "px";
				}

				//3、取消拖拽
				document.onmouseup = function(){
					document.onmousemove = null;
				}
			}
		}
		
//========================================================
	//图片动画
	function pic_animate(){
		$(".category ul li").hover(function(){
				$(this).find("img").stop().animate({
					top:"-10px"
				},400),
				$(this).find("div").stop().animate({
					top:"-10px"
				},400)				
			},function(){
				$(this).find("img").stop().animate({
					top:"0px"
				},400),
				$(this).find("div").stop().animate({
					top:"0px"
				},400)			
			}
		)
	}
		pic_animate();
//=============================banner图============================
			$.ajax({
				url: "data/banner.json",
				type: "get",
				success:function(data){
					var html = "";
					for(var i = 0; i < data.length; i++){
						html += '<li><img src=' + data[i].img + ' /></a></li>';
					}
					$("#banner #pic").html(html);
					$("#banner #pic li").eq(0).attr("class","active");
					banner();
				}
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
		// laser_tv
		


//=====================================================================
			//热销推荐
			$.ajax({
				url: "data/hotGroom.json",
				type: "get",
				success:function(data){
					var html = "";
				for(let i = 0; i < 3; i++){
					for(let i = 0; i < data.length; i++){
					html += '<li><a href="http://www.hisense.com/product/596c7576937cbd276ab37ff2.html"><img src=' + data[i].img + ' /><div><p class = "name">' + data[i].name + '</p><p class = "price"><span>¥</span>' + data[i].price + '</p></div></a></li>'
					}
				}
				
				$("#hotGroom .recommend ul").html(html);

				$("#hotGroom .recommend ul li").hover(function(){		
				$("#hotGroom .recommend div").eq($(this).index()).stop().	animate({
					   top:"258px"
					},400).css("color","#d72121");				
				},function(){
					$("#hotGroom .recommend div").eq($(this).index()).stop().animate({
						top:"263px"
					},400).css("color","#282828");				
				})

				}
			})
			
			$("#hotGroom .btn_next a").click(function(){
				var left = $("#hotGroom .recommend ul").position().left - 240;
				$("#hotGroom .recommend ul").css("left",left);
				if(left == -2400){
					$("#hotGroom .recommend ul").css("left",-1200);
				}
				return false;
			})
			$("#hotGroom .btn_prev a").click(function(){		
				var left = $("#hotGroom .recommend ul").position().left + 240;
				$("#hotGroom .recommend ul").css("left",left);
				if(left == 0){
					$("#hotGroom .recommend ul").css("left",-1200);
				}
				return false;
			})
//========================商品分类===================================
			$.ajax({
				url: "data/tv.json",
				type: "get",
				success:function(data){
					var html1 = "",html2 = "",html3 = "",html4 = "",html5 = "";
					for(let i = 0; i < data[0].length; i++){
						html1 += '<li><div><p class = "name">' + data[0][i].name + '</p><p class = "price"><span>¥</span>' + data[0][i].price + '</p></div><a href="goods.html" target = "_blank" ><img src=' + data[0][i].img + ' /></a></li>'
					}
					for(let i = 0; i < data[1].length; i++){
						html2 += '<li><div><p class = "name">' + data[1][i].name + '</p><p class = "price"><span>¥</span>' + data[1][i].price + '</p></div><a href="http://www.hisense.com/product/58204636937cbd775d204476.html"><img src=' + data[1][i].img + ' /></a></li>'
					}
					for(let i = 0; i < data[2].length; i++){
						html3 += '<li><div><p class = "name">' + data[2][i].name + '</p><p class = "price"><span>¥</span>' + data[2][i].price + '</p></div><a href="http://www.hisense.com/product/58204636937cbd775d204476.html"><img src=' + data[2][i].img + ' /></a></li>'
					}
					for(let i = 0; i < data[3].length; i++){
						html4 += '<li><div><p class = "name">' + data[3][i].name + '</p><p class = "price"><span>¥</span>' + data[3][i].price + '</p></div><a href="http://www.hisense.com/product/58204636937cbd775d204476.html"><img src=' + data[3][i].img + ' /></a></li>'
					}
					for(let i = 0; i < data[4].length; i++){
						html5 += '<li><div><p class = "name">' + data[4][i].name + '</p><p class = "price"><span>¥</span>' + data[4][i].price + '</p></div><a href="http://www.hisense.com/product/58204636937cbd775d204476.html"><img src=' + data[4][i].img + ' /></a></li>'
					}
					$(".category .tv ul").html(html1);
					$(".category .phone ul").html(html2);
					$(".category .air_cond ul").html(html3);
					$(".category .refrigerator ul").html(html4);
					$(".category .washer ul").html(html5);

					$(".category .tv ul li").find("div").attr("class","tv_show");
					$(".category .tv ul li").eq(0).attr("class","item1").find("div").attr("class","tv_show1");
					$(".category .tv ul li").eq(1).attr("class","item2").find("div").attr("class","tv_show2");
					$(".category .tv ul li").eq(2).attr("class","item3")
					$(".category .tv ul li").eq(3).attr("class","item4")
					$(".category .tv ul li").eq(4).attr("class","item5")
					$(".category .tv ul li").eq(5).attr("class","item6")

					$(".category .phone ul li").find("div").attr("class","phone_show");
					$(".category .phone ul li").eq(0).attr("class","item1").find("div").attr("class","");
					$(".category .phone ul li").eq(1).attr("class","item2").find("div").attr("class","");
					$(".category .phone ul li").eq(2).attr("class","item3")
					$(".category .phone ul li").eq(3).attr("class","item4")
					

					$(".category .air_cond ul li").find("div").attr("class","cond_show");
					$(".category .air_cond ul li").eq(0).attr("class","item1").find("div").attr("class","");
					$(".category .air_cond ul li").eq(1).attr("class","item2")
					$(".category .air_cond ul li").eq(2).attr("class","item3").find("div").attr("class","");
					$(".category .air_cond ul li").eq(3).attr("class","item4")
					$(".category .air_cond ul li").eq(4).attr("class","item5")
					$(".category .air_cond ul li").eq(5).attr("class","item6")

					$(".category .refrigerator ul li").eq(0).attr("class","item1")
					$(".category .refrigerator ul li").eq(1).attr("class","item2 item")
					$(".category .refrigerator ul li").eq(2).attr("class","item3 item")
					$(".category .refrigerator ul li").eq(3).attr("class","item4 item")
					$(".category .refrigerator ul li").eq(4).attr("class","item5")
					$(".category .refrigerator ul li").eq(5).attr("class","item6 item")

					$(".category .washer ul li").eq(0).attr("class","item1").find("div")
					$(".category .washer ul li").eq(1).attr("class","item2").find("div")
					$(".category .washer ul li").eq(2).attr("class","item3 item")
					$(".category .washer ul li").eq(3).attr("class","item4 item")
					$(".category .washer ul li").eq(4).attr("class","item5")
					









					pic_animate();
				}
			})
//=====================================================================
	//返回顶部
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