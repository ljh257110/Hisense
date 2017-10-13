$(function(){
//=====================动态创建商品=====================================
		goodsData(0);
		function goodsData(goodsNum){
			$.ajax({
				url: "data/goods_tv.json",
				type: "get",
				success:function(goods_data){
					var html1 = "",html2 = "";
				
						html1 = '<div class = "link"><a href="http://www.hisense.com/index.html"><span>首页</span></a><span>></span><a href="http://www.hisense.com/category/56822224d59d8e65069f46cc.html"><span>电视</span></a></div><div class = "magnifier_box"><div class = "magnifier"><div class = "mark_box"></div><img src="" class = "show"/><div class = "magnifyingBegin"></div><div class = "magnifyingShow"><div class = "show_all"><img src="" /></div></div><div class = "small_image_list"><ul></ul></div></div>	<a href = "" class = "btn_prev btn"></a><a href = ""class = "btn_next btn"></a></div><div class = "right_goods_des"><div class = "title"><p></p><span></span></div><div class = "price"><span class = "sale">销售价：</span><span class = "sale_price">¥<i></i></span><span class = "hot">热销：</span><span class = "hot_num"></span><span class = "comment">评论：</span><span class = "comment_num"></span></div><div class = "address"><div class = "receipt_goods">配送至：</div><div class = "receipt_tab"><div class = "location"><span>山东省青岛市市北区</span><i></i></div></div><div class = "has">有货</div></div><div class = "buy_num"><span>购买数量：</span><div class = "reduce num">-</div><input type="text" value = "1" class = "number"/><div class = "add num">+</div></div><div class = "right_bottom"><a href="http://www.hisense.com/checkout.html" class = "immediately_buy">立即购买</a><a href="http://www.hisense.com/cart-success.html" class = "add_car">加入购物车</a><div><i>服务承诺：</i><a class = "a1">7天退换货</a><a class = "a2">全国联保</a><a class = "a3">电子发票</a><a class = "a4">全场包邮</a><a class = "a5">预约安装</a></div></div></div>'
					
					$(".commodity").html(html1);

					for(var i = 0; i < goods_data[goodsNum].img.length; i++){
						html2 += '<li><img src=' + goods_data[goodsNum].img[i] + ' /></li>'
					}
					$(".commodity .magnifier_box .magnifier .small_image_list ul").html(html2);
					$(".commodity .magnifier_box .magnifier .show").attr("src",goods_data[goodsNum].img[0]);
					$(".commodity .magnifier_box .magnifier .magnifyingShow .show_all img").attr("src",goods_data[goodsNum].img[0]);
					$(".commodity .right_goods_des .title p").html(goods_data[goodsNum].name);
					$(".commodity .right_goods_des .title span").html(goods_data[goodsNum].desc);
					$(".commodity .right_goods_des .price .sale_price i").html(goods_data[goodsNum].price);
					$(".commodity .right_goods_des .price .hot_num").html(goods_data[goodsNum].num_hot);
					$(".commodity .right_goods_des .price .comment_num").html(goods_data[goodsNum].comment);
					buy_num();
					create_cookie();
					$(".commodity .magnifier .small_image_list ul li").click(function(){
							var index = $(this).index();
							$(".commodity .magnifier .show").attr("src",goods_data[goodsNum].img[index]);
							$(".commodity .magnifier .magnifyingShow .show_all img").attr("src",goods_data[goodsNum].img[index]);
					});
					commodity();
				}
			})
		}
		
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

//======================为您推荐========================================
		$.ajax({
				url: "data/for_you.json",
				type: "get",
				success:function(data){
					var html = "";
					for(var i = 0; i < data.length; i++){
						html += '<li><a href="#"><img src=' + data[i].img + ' /><span class = "for_title">' + data[i].for_title + '</span><span class = "for_price">' + data[i].for_price + '</span></a></li>'
						$(".for_customer .for_you ul").html(html);	
					}				
						$(".for_customer .for_you ul li").eq(0).click(function(){
							$(".commodity").html("");
							goodsData(0);
						})
						$(".for_customer .for_you ul li").eq(1).click(function(){
							$(".commodity").html("");
							goodsData(1);
						})
						$(".for_customer .for_you ul li").eq(2).click(function(){
							$(".commodity").html("");
							goodsData(2);
						})
				
					
				}
		})

//=====================商品详情=======================================
		$.ajax({
				url: "data/item1.json",
				type: "get",
				success:function(data){
					var html1 = "";

					for(var i in data[0]){
						// alert(data[0][i])
						html1 += '<a href="#"><img src=' + data[0][i] + ' /></a>';
					}
					$(".for_customer .for_des_goods .tab_conbox .item1 p").eq(0).html(html1);
					var html2 = "";
					for(var j = 1; j < data.length; j++){
						html2 += '<p><img src=' + data[j].img + ' /><br /></p>';
						$(".for_customer .for_des_goods .tab_conbox .item1 div").html(html2);	
					}
				}
		})
//======================用户评价======================================
		$.ajax({
				url: "data/prompt.json",
				type: "get",
				success:function(data){
					var html = "";
					for(var i = 0; i < data.length; i++){
						html += '<li><div class = "head_img"><img src="images/user00.png" /><span>' + data[i].name + '</span></div><div class = "write_prompt"><div class = "star"><span>' + data[i].date + '</span></div><p>' + data[i].prompt + '</p></div></li>';
						$(".for_customer .for_des_goods .tab_conbox .item2 .all_prompt ul").html(html);	
					}
				}
		})
//======================规格参数======================================
		$.ajax({
				url: "data/specification.json",
				type: "get",
				success:function(data){
					var html = "";
					for(var i = 0; i < data.length; i++){
						html += '<li><span class = "view_name">' + data[i].view_name + '</span><span class = "spec">' + data[i].spec + '</span></li>';
						$(".for_customer .for_des_goods .tab_conbox .item3 div ul").html(html);	
					}
				}
		})		
//======================咨询===========================================
		$(".for_customer .for_des_goods .tab_conbox .item5 .ask_list li").click(function(){
			$(".for_customer .for_des_goods .tab_conbox .item5 .all_ask").css("display","block");
			$(".for_customer .for_des_goods .tab_conbox .item5 .ask_list li").attr("class","");
			$(this).attr("class","activeA");
		})
		for(let i = 2; i < 5; i++){
			$(".for_customer .for_des_goods .tab_conbox .item5 .ask_list li").eq(i).click(function(){
				$(".for_customer .for_des_goods .tab_conbox .item5 .all_ask").css("display","none");
			})
		}
//=================商品、评价、规格、包装、咨询=========================
			$(".for_customer .for_des_goods .pos_des .tabs li").click(function(){
				$(".for_customer .for_des_goods .pos_des .tabs li").attr("class","");
				$(this).attr("class","check");
				$(".for_customer .for_des_goods .tab_conbox .Tab").attr("id","");
				$(".for_customer .for_des_goods .tab_conbox .Tab").eq($(this).index()).attr("id","tab_active");
				$("body,html").stop().animate({
					scrollTop:880
				},400);
				return false;
			})	
//=====================================================================
	//返回顶部
			$(window).scroll(function(){
				if($(this).scrollTop() < 540){
					$(".fixed_nav ul .back_top").css("visibility" ,"hidden");				
				}else{
					$(".fixed_nav ul .back_top").css("visibility" ,"visible");			
				}
				if($(this).scrollTop() < 880){
					$(".for_customer .for_des_goods .pos_des").attr("class","pos_des");
					$(".for_customer .for_you").attr("class","for_you");
				}else{
					$(".for_customer .for_des_goods .pos_des").attr("class","pos_des reposition_location");
					if($(this).scrollTop() < 18900){
						$(".for_customer .for_you").attr("class","for_you fix").css("display","block");
					}else{
						$(".for_customer .for_you").attr("class","for_you fix").css("display","none");
					}
					
				}
			
			})
			$(".fixed_nav ul .back_top").click(function(){
				$("body,html").stop().animate({
					scrollTop:0
				},400);
			})
//==========================放大镜1==================================			
				/*$.ajax({
					url: "json/magnifier.json",
					type: "get",
					success:function(data){
						$(".commodity .magnifier .small_image_list ul li").click(function(){
							var index = $(this).index();
							$(".commodity .magnifier .show").attr("src",data[index].img);
							$(".commodity .magnifier .magnifyingShow .show_all img").attr("src",data[index].img);
						})
					}
				})	*/

				
//==========================放大镜2=====================================
	function commodity(){
		$(".mark_box").hover(function(){
			$(".magnifyingBegin").css("display", "block");
			$(".magnifyingShow").css("display", "block");
		},function(){
			$(".magnifyingBegin").css("display", "none");
			$(".magnifyingShow").css("display", "none");
		}).mousemove(function(ev){
			var left = ev.pageX - $(this).offset().left - $(".magnifyingBegin").width() / 2;

			if(left < 0){
				left = 0;
			}else if(left > $(".magnifier").width() - $(".magnifyingBegin").width()){
				left = $(".magnifier").width() - $(".magnifyingBegin").width();
			}
			$(".magnifyingBegin").css("left",left);

			var top = ev.pageY - $(this).offset().top - $(".magnifyingBegin").height() / 2;
			if(top < 0){
				top = 0;
			}else if(top > $(".magnifier").height() - $(".magnifyingBegin").height()){
				top = $(".magnifier").height() - $(".magnifyingBegin").height();
			}
			$(".magnifyingBegin").css("top",top);

			var proportionX = left / ($(".magnifier").width() - $(".magnifyingBegin").width());
			var proportionY = top / ($(".magnifier").height() - $(".magnifyingBegin").height());
			console.log(proportionX+':'+proportionY);

			$(".show_all").css("left", - proportionX * ($(".show_all").width() - $(".magnifyingShow").width())).css("top", - proportionY * ($(".show_all").height() - $(".magnifyingShow").height()));

		})
	}

		
//===================================购买数量===========================		
		function buy_num(){
			let i = 1;
			$(".commodity .right_goods_des .buy_num .add").click(function(){
				i++;
				$(".commodity .right_goods_des .buy_num .number").attr("value",i);
			})
			$(".commodity .right_goods_des .buy_num .reduce").click(function(){
				i--;
				if(i < 1){
					i = 1;
				}
				$(".commodity .right_goods_des .buy_num .number").attr("value",i);
			})
		}
			
//========================加入购物车创建cookie==========================
		function create_cookie(){
			$(".commodity .right_goods_des .right_bottom .add_car").click(function(){			
				var name = $(".commodity .right_goods_des .title p").html();
				var buy_num = $(".buy_num .number").attr("value");
				var src = $(".small_image_list ul li").eq(0).find("img").attr("src");
				var price = $(".commodity .right_goods_des .price .sale_price i").html();
				// alert(price)
				var isFirst = $.cookie("goods") ? false : true;
				if(isFirst){
					$.cookie("goods", name + ":" + src + ":" + buy_num + ":" + price, {
						expires: 7,
						path:"/"
					});					
				}else{
					var cookieStr = $.cookie("goods");
					var newarr = cookieStr.split(":");
					var tmp = false;
					for(var i = 0; i < newarr.length; ){
						if(newarr[i] == name){
							newarr[i + 2] = Number(newarr[i + 2]) + Number(buy_num);
							cookieStr = newarr.join(":");
							tmp = true;
							break;
						}
						i += 4;
					}
					if(!tmp){
							cookieStr += ":" +  name + ":" + src + ":" + buy_num + ":" + price;
					}
					$.cookie("goods",cookieStr,{
						expires:7,
						path:"/"
					})
				}
				alert($.cookie("goods")); 
			})
		}
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