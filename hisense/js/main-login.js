alert("加载成功");




//<1>配置路径
require.config({
	paths: {
		"login": "login",
		"jquery.cookie":"jquery.cookie",
		"jquery":"jquery-1.11.1"
	}
})

//<2>引入模块，异步引入
require(["login","jquery.cookie","jquery"], function(login,$,$){
	login.login();
})