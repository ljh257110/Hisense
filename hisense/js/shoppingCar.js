	$(function(){

//=============================动态创建商品列表=======================
			
			var cookieStr = $.cookie("goods");
			if(!cookieStr){
				$("form").html('<div class="empty-car"><p>购物车空空的哦~，去看看心仪的商品吧~</p><a href="http://www.hisense.com/index.html">去购物></a></div>');
				like();
				footer2();
			}else{
				var newarr = cookieStr.split(":");
			alert(newarr)
			var goodshtml = "";
			var allprice = 0;
			var everyGood_num = [];
			for(var k = 0; k < newarr.length;){
				allprice = newarr[k + 3] * newarr[k + 2] + ".00";
			
				goodshtml += '<li><div class = "bottom"><div class = "choose active"><input class="itemCheckbox" checked="checked" type="checkbox"></div><a href="#" class = "img"><img src=' + newarr[k + 1] + ' /></a><div class = "size_buy"><a href="#" class = "title">' + newarr[k] + '</a><h6></h6><p><a class = "a1">7天退换货</a><a class = "a2">全国联保</a><a class = "a3">电子发票</a><a class = "a4">全场包邮</a></p></div><h5 class = "one_price">¥<i>' + newarr[k + 3] + '</i></h5><div class = "num_buy"><a class = "reduce num" href = "">-</a><input type="text" value = ' + newarr[k + 2] + ' class = "number"/><a class = "add num" href = "">+</a></div><div class = "buy_price">¥<i>' + allprice + '</i></div><a href="#" class = "del">删除</a></div></li>';
				
				everyGood_num.push(newarr[k + 2]);
				k += 4;
			}

			$(".my_shopcar .buy_list").html(/*'<div class = "top"><span>国庆狂欢购LED65EC880UCQ下单立减600元</span></div>' + */goodshtml);
		
			}
			
//===============================全选=======================
			var arrTrue = [];
			var isAll = true;
			$(".my_shopcar .all_choose .all").click(function(){
				chooseAll();
				allGoods();
			})
			function chooseAll(){
					
					if(!isAll){
						$(".settlement .all").attr("class","all activeAll");
						$(".my_shopcar .all_choose .all").attr("class","all activeAll");
						$(".my_shopcar .buy_list .bottom .choose").attr("class","choose active");
						$(".my_shopcar .buy_list .bottom").css("background","rgb(255, 244, 232)");
						for(var i = 0; i < everyGood_num.length; i++){
							arrTrue[i] = true;
						}
					}else{
						$(".settlement .all").attr("class","all");
						$(".my_shopcar .all_choose .all").attr("class","all");
						$(".my_shopcar .buy_list .bottom .choose").attr("class","choose");
						$(".my_shopcar .buy_list .bottom").css("background","#fff");
						for(var i = 0; i < everyGood_num.length; i++){
							arrTrue[i] = false;
						}
					}
					isAll = !isAll;
			}	
			
			
			function chooseOne(){
				// var isOne = true;
				
				for(var i = 0; i < everyGood_num.length; i++){
					arrTrue[i] = true;
				}
				$(".my_shopcar .buy_list .bottom .choose").click(function(){
					// isOne = !isOne;
					var index = $(this).parent().parent().index();
					
					arrTrue[index] = !arrTrue[index];
					allGoods();
					if(arrTrue[index]){
						$(this).attr("class","choose active");
						$(".my_shopcar .buy_list li").eq(index).find(".bottom").css("background","rgb(255, 244, 232)");
					}else{
						$(this).attr("class","choose");
						$(".my_shopcar .buy_list li").eq(index).find(".bottom").css("background","#fff");
					}
					// isOne = !isOne;
					alert(index)
					// alert(isOne)
					alert(arrTrue)
					// allGoods();
				})
			}
			chooseOne();

				$(".settlement .all").click(function(){
					chooseAll();
					allGoods();
				})	


//===============================总价==================================
			
			var sum = 0;
			$(".my_shopcar .buy_list li").find(".bottom .num_buy .add").click(function(){
				var index = $(this).parent().parent().parent().index();
				everyGood_num[index]++;
				$(".my_shopcar .buy_list li").eq(index).find(".bottom .num_buy .number").val(everyGood_num[index]);
				sum = everyGood_num[index] * $(".my_shopcar .buy_list li").eq(index).find(".bottom .one_price i").html() + ".00";
				$(".my_shopcar .buy_list li").eq(index).find(".bottom .buy_price i").html(sum);

				//=================删除cookie=========================
				var cookieStr = $.cookie("goods");
				var newarr = cookieStr.split(":");
				var num = $(".my_shopcar .buy_list li").eq(index).find(".bottom .num_buy .number").val();
				var name = $(".my_shopcar .buy_list li").eq(index).find(".title").html();
				for(var i = 0; i < newarr.length;){
				 		if(newarr[i] == name){
				 			newarr[i + 2] = num;
				 			break;
				 		}
				 		i += 4;
				 	}
				 	$.cookie("goods", newarr.join(":"), {
								expires: 7,
								path:"/"
					});
				allGoods();
				return false;
			})
			$(".my_shopcar .buy_list .bottom .num_buy .reduce").click(function(){
				var index = $(this).parent().parent().parent().index();
				everyGood_num[index]--;
				if(everyGood_num[index] < 1){
					everyGood_num[index] = 1;

				}
				
				$(".my_shopcar .buy_list li").eq(index).find(".bottom .num_buy .number").val(everyGood_num[index]);
				sum = everyGood_num[index] * $(".my_shopcar .buy_list li").eq(index).find(".bottom .one_price i").html() + ".00";
				$(".my_shopcar .buy_list li").eq(index).find(".bottom .buy_price i").html(sum);
				var num = $(".my_shopcar .buy_list li").eq(index).find(".bottom .num_buy .number").val();
				var name = $(".my_shopcar .buy_list li").eq(index).find(".title").html();
				for(var i = 0; i < newarr.length;){
				 		if(newarr[i] == name){
				 			newarr[i + 2] = num;
				 			break;
				 		}
				 		i += 4;
				 	}
				 	$.cookie("goods", newarr.join(":"), {
								expires: 7,
								path:"/"
					});
				allGoods();
				return false;
			})
//=======================已选择n件商品================================
			// var goods_num = $(".my_shopcar .buy_list").children().length;
			// $(".settlement p #count").html(4);
//============================删除====================================
			$(".my_shopcar .buy_list li").find(".bottom .del").click(function(){
				var _this = this;
				 var index = $(_this).parent().parent().index();
				 var name = $(_this).parent().parent().find(".title").html();
				 $(".Del").css("display","block");
				 $(".del_box").css("display","block");
				 $(".del_box .del_true").click(function(){
				 	$(".Del").css("display","none");
				 	$(".del_box").css("display","none");
				 	$(".my_shopcar .buy_list li").eq(index).remove();
				 	arrTrue.splice(index,1);
				 	for(var k = 0; k < newarr.length;){
				 		if(newarr[k] == name){
				 			newarr.splice(k, 4);
				 			break;
				 		}
				 		k += 4;
				 	}
				 	$.cookie("goods", newarr.join(":"), {
								expires: 7,
								path:"/"
					});
					allGoods();
					
					var text = $("form ul").html();
					if(!text){
						$("form").html('<div class="empty-car"><p>购物车空空的哦~，去看看心仪的商品吧~</p><a href="http://www.hisense.com/index.html">去购物></a></div>');
					}
				 })
				 del_false();
				return false;
			})
			function del_false(){
				$(".del_box .del_false").hover(function(){
				 	$(this).css("background","#ebebeb");
				 },function(){
				 	$(this).css("background","#fff");
				 })
				 $(".del_box .del_false").click(function(){
				 	$(".Del").css("display","none");
				 	$(".del_box").css("display","none");
				 })
				 $(".close").click(function(){
				 	$(".Del").css("display","none");
				 	$(".del_box").css("display","none");
				 })
			}
			$(".settlement .del_choose").click(function(){
				 $(".Del").css("display","block");
				 $(".del_box").css("display","block");
				 $(".del_box .del_true").click(function(){
				 	$(".Del").css("display","none");
				 	$(".del_box").css("display","none");
				 	for(var j = arrTrue.length - 1; j >= 0; j--){
				 		
						if(arrTrue[j] == true){
							var name = $(".my_shopcar .buy_list li").eq(j).find(".title").html();
							$(".my_shopcar .buy_list li").eq(j).remove();
							arrTrue.splice(j,1);
						 	for(var k = 0; k < newarr.length;){
						 		if(newarr[k] == name){
						 			newarr.splice(k, 4);
						 			break;
						 		}
						 		k += 4;
						 	}
						 	$.cookie("goods", newarr.join(":"), {
										expires: 7,
										path:"/"
							});

						}


					}
				 	
					var text = $("form ul").html();
					if(!text){
						$("form").html('<div class="empty-car"><p>购物车空空的哦~，去看看心仪的商品吧~</p><a href="http://www.hisense.com/index.html">去购物></a></div>');
					}
					allGoods();
				})
				 del_false();
			})

			function allGoods(){
				var true_num = 0;
				for(var j = 0; j < arrTrue.length; j++){
					if(arrTrue[j] == true){
						true_num++;
					}
				}

				/*var li_num = $(".my_shopcar .buy_list").children().length - 1;*/
				$(".settlement p #count").html(true_num);
				var total = 0;
				for(var i = 0; i < arrTrue.length; i++){
					if(arrTrue[i] == true){
						total += Number($(".my_shopcar .buy_list li").eq(i).find(".bottom .buy_price i").html());
					}
					
				}
				total = total + ".00";		
				$(".settlement h4 #total").html(total);
			}
			allGoods();
//====================取消全选时的总价================================
		
			/*var true_num = 0;
			for(var i = 0; i < arrTrue.length; i++){
				if(arrTrue[i] == true){
					true_num++;
				}
			}
		*/
		
//==============================猜你喜欢=================================
		 like();
		function like(){
			$.ajax({
				url: "data/like.json",
				type: "get",
				success:function(data){
					var html = "";
					for(var i = 0; i < data.length; i++){
						html += '<li><a href="#"><img src=' + data[i].img + ' /><p>' + data[i].desc + '</p><span class="money">' + data[i].money + '</span><span class="num"><i>' + data[i].num + '</i>人购买</span></a></li>';
						$(".guess .picScroll_left .bd ul").html(html);	
					}
					$(".guess .picScroll_left .bd .tempWrap ul li").hover(function(){
							$(this).css("border-color","#00AAA6");
						},function(){
							$(this).css("border-color","#DEDEDE");
						})
					likehover();
				}
			})
		}
		likehover();
		function likehover(){
			$(".guess .picScroll_left").hover(function(){
				$(this).find(".hd a").css("display","block");
			},function(){
				$(this).find(".hd a").css("display","none");
			})
			var isClick = false;
			$(".guess .picScroll_left .hd a").click(function(){
				btnClick();
				return false;
			});
			$(".guess .picScroll_left .hd ul li").mouseover(function(){
				btnClick();
			})
			function btnClick(){
				if(!isClick){
					$(".guess .picScroll_left .bd .tempWrap ul").stop().animate({
						left:"-1012px"
					},500);
					$(".guess .picScroll_left .hd ul li").attr("class","");
					$(".guess .picScroll_left .hd ul li").eq(1).attr("class","on");
				}else{
					$(".guess .picScroll_left .bd .tempWrap ul").stop().animate({
						left:0
					},500);
					$(".guess .picScroll_left .hd ul li").attr("class","");
					$(".guess .picScroll_left .hd ul li").eq(0).attr("class","on");
				}
				isClick = !isClick;
			}
		}
			
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
		footer2();
		function footer2(){
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
		}
								
		})