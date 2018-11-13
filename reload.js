
//发送数据
function doLoadAction(data){
 miotOpenJsApi_send_sendUartData(data);

}
function sendToNative_sendUartData(data){
 miotOpenJsApi_send_sendUartData(data);

}
//接收数据
function receiveData(data){
receive(data);
}
var time_out;
var time_out_body;
var time_out_num = 15;
//所有白色按钮--删除
function white_openBtn(classN){
    $(classN).css("background-color", "#ddd");
}
function white_openendBtn(classN){
    $(classN).css("background-color", "#fff");
}
//ontouchstart="javascript:white_openBtn(this)" ontouchend="javascript:white_openendBtn(this)"
//ontouchstart="javascript:two_openBtn(this)" ontouchend="javascript:two_openendBtn(this)"
//两种颜色按钮
function two_openBtn(classN){
	console.log($(classN).css("background-color"));

	if( $(classN).css("background-color") == "#D8D8D8" ||  $(classN).css("background-color") == "rgb(216, 216, 216)"){
		console.log("1="+$(classN).css("background-color"));

		$(classN).css("background-color", "#BBBBBB");

	}else if( $(classN).css("background-color") == "#BABABA"  ||  $(classN).css("background-color") == "rgb(186, 186, 186)"){

		console.log("2="+$(classN).css("background-color"));

		$(classN).css("background-color", "#9A9A9A");

	}else if( $(classN).css("background-color") == "#2BE07F"  ||  $(classN).css("background-color") == "rgb(43, 224, 127)"){

		console.log("3="+$(classN).css("background-color"));

		$(classN).css("background-color", "#1BBC66");

	}else if( $(classN).css("background-color") == "#DCC529"  ||  $(classN).css("background-color") == "rgb(220, 197, 41)"){

		console.log("4="+$(classN).css("background-color"));

		$(classN).css("background-color", "#C1AB18");

	}else if( $(classN).css("background-color") == "#F89432"  ||  $(classN).css("background-color") == "rgb(248, 148, 50)"){

		console.log("5="+$(classN).css("background-color"));

		$(classN).css("background-color", "#DF8125");

	}else if( $(classN).css("background-color") == "#F83253"  ||  $(classN).css("background-color") == "rgb(248, 50, 83)"){

		console.log("6="+$(classN).css("background-color"));

		$(classN).css("background-color", "#D71E3D");

	}


}

function two_openendBtn(classN){

	if( $(classN).css("background-color") == "#BBBBBB" ||  $(classN).css("background-color") == "rgb(187, 187, 187)"){

		$(classN).css("background-color", "#D8D8D8");

	}else if( $(classN).css("background-color") == "#9A9A9A"  ||  $(classN).css("background-color") == "rgb(154, 154, 154)"){

		$(classN).css("background-color", "#BABABA");

	}else if( $(classN).css("background-color") == "#1BBC66"  ||  $(classN).css("background-color") == "rgb(27, 188, 102)"){

		$(classN).css("background-color", "#2BE07F");

	}else if( $(classN).css("background-color") == "#C1AB18"  ||  $(classN).css("background-color") == "rgb(193, 171, 24)"){

		$(classN).css("background-color", "#DCC529");

	}else if( $(classN).css("background-color") == "#DF8125"  ||  $(classN).css("background-color") == "rgb(223, 129, 37)"){

		$(classN).css("background-color", "#F89432");

	}else if( $(classN).css("background-color") == "#D71E3D"  ||  $(classN).css("background-color") == "rgb(215, 30, 61)"){

		$(classN).css("background-color", "#F83253");

	}


}




//查询15次
function countdown() {
	try {
		if (time_out_num > 1) {
			time_out_num--;
			console.log(time_out_num);
			doLoadAction("F1F1F00100F17E");
		    }
		} catch (e) {
			//alert("countdown="+e);
	    }
			time_out = setTimeout("countdown()", 2000);
}

function body_time() {
	time_out_num = 15;
	console.log(time_out_num);
}
var high_power;
var hg_mode,air_state;
var $_equive_pm_hight,pm_hight;
var pm_value;
var state,set_sj,set_ts,set_wind,set_mode;
var	set_mode_auto,set_mode_sleep;
var equive_state,equive_pm_hight,equive_pm_low,lz_remain,jq_remain;

/****************************解析******************************/
function receive(data){
	//alert("data="+data);
	var cdata = ml_parseOneFrameArray(data);
	//alert("cdata="+JSON.stringify(cdata));

	for(var i=0;i<cdata.length;i++){
		var obj = cdata[i].playload;
		//alert("obj="+JSON.stringify(obj));
		var obj = decode_721(data);
		//alert("obj1="+JSON.stringify(obj));

		//state = obj.actionParams.state;
		//alert("equive_state="+equive_state);
		//re_state(state);
		equive_state = obj.actionParams.equive_state;
		re_equive_state(equive_state);



		equive_pm_hight = obj.actionParams.equive_pm_hight;

		re_equive_pm_hight(equive_pm_hight);




		equive_pm_low = obj.actionParams.equive_pm_low;
		re_equive_pm_low(equive_pm_low);

		lz_remain = obj.actionParams.lz_remain;
		re_lz_remain(lz_remain);

		jq_remain = obj.actionParams.jq_remain;
		re_jq_remain(jq_remain);

	}

}


function re_lz_remain(lz_remain){
	$("#lizixiang_value").text(lz_remain);
}


function re_jq_remain(jq_remain){
	$("#jiaquan_value").text(jq_remain);
	if( parseInt(jq_remain) <=3 ){
		$("#jiaquan_sign").text("更换");
	}else{
		$("#jiaquan_sign").text("正常");
	}

}

//设备状态
function re_equive_state(equive_state){
	//alert("equive_state="+equive_state);
	var $_equive_state = parseInt(equive_state).toString(2);
	while( $_equive_state.length < 8 ){
		$_equive_state = "0"+$_equive_state;
	}
	high_power = $_equive_state.substring(0,1);
	set_ts = $_equive_state.substring(1,2);
	state = $_equive_state.substring(2,3);
	set_sj = $_equive_state.substring(3,4);
	set_mode_sleep = $_equive_state.substring(4,5);
	set_mode_auto = $_equive_state.substring(5,6);
	set_wind = $_equive_state.substring(6,8);

	if( set_wind == "01" ){
		$(".choose_wind_text").text("低速");
	}else if( set_wind == "10" ){
		$(".choose_wind_text").text("中速");
	}else if( set_wind == "11" ){
		$(".choose_wind_text").text("高速");
	}


//alert("high_power="+high_power);
//alert("set_ts="+set_ts);
//alert("state="+state);
//alert("set_sj="+set_sj);
//alert("set_mode_sleep="+set_mode_sleep);
//alert("set_mode_auto="+set_mode_auto);
//alert("set_wind="+set_wind);


	if( state == "1" ){

		state_on();

		if( high_power == "0" ){
			$("#esp_sign").text("正常");
		}else{
			$("#esp_sign").text("异常");
		}


		//童锁
		if( set_ts == "1" ){
			if( pm_value>=0 && pm_value <= 50 ){
				$("#tongs").css("background","#2BE07F");
			}else if( pm_value>=51 && pm_value <= 150 ){
				$("#tongs").css("background","#DCC529");
			}else if( pm_value>=151 && pm_value <= 250 ){
				$("#tongs").css("background","#F89432");
			}else if( pm_value>=251 ){
				$("#tongs").css("background","#F83253");
			}

			$("#tongs_p").css("color","#666");

		}else{

			$("#tongs").css("background","#bababa");
			$("#tongs_p").css("color","#666");
		}
		//杀菌
		if( set_sj == "1" ){
			if( pm_value>=0 && pm_value <= 50 ){
				$("#shaj").css("background","#2BE07F");
			}else if( pm_value>=51 && pm_value <= 150 ){
				$("#shaj").css("background","#DCC529");
			}else if( pm_value>=151 && pm_value <= 250 ){
				$("#shaj").css("background","#F89432");
			}else if( pm_value>=251 ){
				$("#shaj").css("background","#F83253");
			}

			$("#shaj_p").css("color","#666");

		}else{
			$("#shaj").css("background","#bababa");
			$("#shaj_p").css("color","#666");
		}
		//模式
		if( set_mode_sleep == "1" && set_mode_auto == "1" ){


		}else if( set_mode_sleep == "0" && set_mode_auto == "0" ){

			if( pm_value>=0 && pm_value <= 50 ){
				$("#moshi").css("background","#2BE07F");
			}else if( pm_value>=51 && pm_value <= 150 ){
				$("#moshi").css("background","#DCC529");
			}else if( pm_value>=151 && pm_value <= 250 ){
				$("#moshi").css("background","#F89432");
			}else if( pm_value>=251 ){
				$("#moshi").css("background","#F83253");
			}
			$("#moshi p").css("background-image","url(webpage/device/detail/721/images/hand.png)");
			$("#moshi_p").css("color","#666");

		}else if( set_mode_sleep == "1" && set_mode_auto == "0" ){
			if( pm_value>=0 && pm_value <= 50 ){
				$("#moshi").css("background","#2BE07F");
			}else if( pm_value>=51 && pm_value <= 150 ){
				$("#moshi").css("background","#DCC529");
			}else if( pm_value>=151 && pm_value <= 250 ){
				$("#moshi").css("background","#F89432");
			}else if( pm_value>=251 ){
				$("#moshi").css("background","#F83253");
			}

			$("#moshi p").css("background-image","url(webpage/device/detail/721/images/sleep.png)");
			$("#moshi_p").css("color","#666");


		}else if( set_mode_sleep == "0" && set_mode_auto == "1" ){
			if( pm_value>=0 && pm_value <= 50 ){
				$("#moshi").css("background","#2BE07F");
			}else if( pm_value>=51 && pm_value <= 150 ){
				$("#moshi").css("background","#DCC529");
			}else if( pm_value>=151 && pm_value <= 250 ){
				$("#moshi").css("background","#F89432");
			}else if( pm_value>=251 ){
				$("#moshi").css("background","#F83253");
			}
			$("#moshi p").css("background-image","url(webpage/device/detail/721/images/auto.png)");
			$("#moshi_p").css("color","#666");

		}


	}else{

		state_off();


	}



}

//设备状态--pm高位
function re_equive_pm_hight(equive_pm_hight){
	//alert("equive_pm_hight1="+equive_pm_hight);
	$_equive_pm_hight = parseInt(equive_pm_hight).toString(2);
	var $_equive_pm_hight1 = $_equive_pm_hight;
	//alert("equive_pm_hight2="+$_equive_pm_hight1);
	while( $_equive_pm_hight1.length < 8 ){
		$_equive_pm_hight1 = "0"+$_equive_pm_hight1;
	}
	hg_mode = $_equive_pm_hight1.substring(0,1);
	air_state = $_equive_pm_hight1.substring(2,4);
	pm_hight = $_equive_pm_hight1.substring(5,8);
	//alert("hg_mode="+hg_mode);
	//alert("air_state="+air_state);
	if( state == "1" ){
		if( hg_mode == "1" ){
			$("#lizixiang_sign").text("烘干");
		}else if( parseInt(lz_remain)<=3 || high_power == "1" ){
			$("#lizixiang_sign").text("清洁");
		}else{
			$("#lizixiang_sign").text("正常");
		}



		if( air_state == "00" ){
			$("#air_quity").text("潔淨");
		}else if( air_state == "01" ){
			$("#air_quity").text(“輕度污染");
		}else if( air_state == "10" ){
			$("#air_quity").text("中度污染");
		}else if( air_state == "11" ){
			$("#air_quity").text("重度污染");
		}


	}

}


//设备状态--pm低位
function re_equive_pm_low(equive_pm_low){
	if(state == "1" ){
		$_equive_pm_low = parseInt(equive_pm_low).toString(2);
		while( $_equive_pm_low.length < 8 ){
			$_equive_pm_low = "0"+$_equive_pm_low;
		}
		var pm_value_1 = pm_hight+$_equive_pm_low;
		pm_value = parseInt(pm_value_1,2);

		if( pm_value>=0 && pm_value <= 50 ){
			$(".state_circle").css("background","#2BE07F");
			$("#xingx").css("background","#2BE07F");
			$(".state_on h1").text(“潔淨”);
		}else if( pm_value>=51 && pm_value <= 150 ){
			$(".state_circle").css("background","#DCC529");
			$("#xingx").css("background","#DCC529");
			$(".state_on h1").text(“輕度污染");
		}else if( pm_value>=151 && pm_value <= 250 ){
			$(".state_circle").css("background","#F89432");
			$("#xingx").css("background","#F89432");
			$(".state_on h1").text("中度污染");
		}else if( pm_value>=251 ){
			$(".state_circle").css("background","#F83253");
			$("#xingx").css("background","#F83253");
			$(".state_on h1").text("重度污染");
		}
		$("#xingx_p").css("color","#666");

		$(".state_on h4").text(pm_value);

	}

}







/*
var lvuvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"lvuv\",\"actionParams\":{\"value\":\""+num+"\"}}}";
var lvuv = encode_721(lvuvsendinfo);
sendToNative_sendUartData(lvuv.uartdata);


var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"changeuv\",\"actionParams\":{\"value\":\"0\"}}}";
var uv = encode_721(uvsendinfo);
sendToNative_sendUartData(uv.uartdata);

*/

function state_on(){
	$("#state_btn").text(“關閉”);
	$("#state_btn").css("color","#FF2323");
	$("#turn_off").hide();
	$(".state_on").show();
	$(".state_off").hide();

}
function state_off(){
	$("#state_btn").text(“開啟”);
	$("#state_btn").css("color","#2BE07F");

	$(".choose_wind_text").text("--");
	$("#air_quity").text("--");
	$("#turn_off").show();

	$(".state_on").hide();
	$(".state_off").show();

	$(".bottom_function_1").css("background","#D8D8D8");
	$(".bottom_function_p").css("color","#D8D8D8");


}


$("#state_btn").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);

		if( state == "1" ){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"state\",\"actionParams\":{\"value\":\"0\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);
		}else if( state == "0" ){

			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"state\",\"actionParams\":{\"value\":\"1\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);

		}

	}
})

//杀菌
$("#shaj").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);
		if( set_sj == "0" ){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_sj\",\"actionParams\":{\"value\":\"1\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);
		}else if( set_sj == "1" ){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_sj\",\"actionParams\":{\"value\":\"0\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);
		}

	}
})

//童锁
$("#tongs").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);
		if( set_ts == "0" ){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_ts\",\"actionParams\":{\"value\":\"1\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);
		}else if( set_ts == "1" ){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_ts\",\"actionParams\":{\"value\":\"0\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);
		}

	}
})

//模式
$("#moshi").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);


		if( set_mode_sleep == "0" && set_mode_auto == "0" ){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_mode\",\"actionParams\":{\"value\":\"1\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);

		}else if( set_mode_sleep == "1" && set_mode_auto == "0" ){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_mode\",\"actionParams\":{\"value\":\"1\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);
		}else if( set_mode_sleep == "0" && set_mode_auto == "1"){
			var uvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_mode\",\"actionParams\":{\"value\":\"2\"}}}";
			var uv = encode_721(uvsendinfo);
			sendToNative_sendUartData(uv.uartdata);
		}






	}
})









//点击设备信息
$("#xingx").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);
		$("#state_info_bottom").show();
		$("#state_home_bottom").hide();
		$("#state_info_error").hide();
	}
})

//故障报修
$("#error_bx").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);
		$("#state_info_bottom").hide();
		$("#state_home_bottom").hide();
		$("#state_info_error").show();
	}
})
//故障报修-返回
$("#back_error").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);
		$("#state_info_bottom").show();
		$("#state_home_bottom").hide();
		$("#state_info_error").hide();
	}
})

$("#fanhui").click(function(){
	var nowTime = new Date().getTime();
	var clickTime = $(this).attr("ctime");
	if( clickTime != 'undefined' && (nowTime - clickTime < 800)){
		console.log('操作过于频繁，稍后再试',$(this).attr("ctime"),nowTime);
		return false;
	}else{
		$(this).attr("ctime",nowTime);
		$("#state_info_bottom").hide();
		$("#state_home_bottom").show();
		$("#state_info_error").hide();
	}
})



//var set_countdown = 1062;
//点击定时关机
$("#time_btn").click(function(){
	$("#time_page").show();
	SwiperMode1.slideTo(0,0,true);
	SwiperMode2.slideTo(0,0,true);

//	$("#mode-swiper1 div:eq("+indexF1+")").html("0");
//	$("#mode-swiper2 div:eq("+indexF2+")").html("0");
	//indexF1 = $_hour_index-1;
	//indexF2 = $_minute_index-1;
})

$("#time_page .function_sure").click(function(){
	var $_hour_num = $("#mode-swiper1 div:eq("+indexF1+")").html();
	var $_minute_num = $("#mode-swiper2 div:eq("+indexF2+")").html();
	//console.log("indexF1="+$("#mode-swiper1 div:eq("+indexF1+")").html());
	//console.log("indexF2="+$("#mode-swiper2 div:eq("+indexF2+")").html());

	if( $_hour_num == undefined ){
		$_hour_num = 0 ;
	}

	if( $_minute_num == undefined ){
		$_minute_num = 0 ;
	}

	var hour_num = parseInt($_hour_num);
	var minute_num = parseInt($_minute_num);
	//console.log("hour_num="+hour_num);
	//console.log("minute_num="+minute_num);
	var nub = 13+hour_num+minute_num;
	//alert("nub="+nub);
	nub = parseInt(nub).toString(16);
	//alert("nub1="+nub);
	while( nub.length < 2 ){
		nub = "0"+nub;
	}
	if( $_hour_num == 0 && $_minute_num == 0 ){
		sendToNative_sendUartData("F1F10B0200000D7E");
	}else{
		var $_hour_num1 = parseInt($_hour_num).toString(16);
		var $_minute_num1 = parseInt($_minute_num).toString(16);

		if( $_hour_num1.length < 2 ){
			$_hour_num1 = "0"+$_hour_num1;
		}
		if( $_minute_num1.length < 2 ){
			$_minute_num1 = "0"+$_minute_num1;
		}
		//console.log("$_hour_num1="+$_hour_num1);
		//console.log("$_minute_num1="+$_minute_num1);

		console.log("F1F10B02"+$_hour_num1+$_minute_num1+nub+"7E");
		sendToNative_sendUartData("F1F10B02"+$_hour_num1+$_minute_num1+nub+"7E");
	}

})




//点击换气
$("#air_btn").click(function(){
	var $_text = $("#air_click h3").text();
	if( $_text == get_i18n_lan_value("close_1") ){
		$_text = 1;
	}else if( $_text == get_i18n_lan_value("air_hq") ){
		$_text = 2;
	}else if( $_text == get_i18n_lan_value("auto_air_hq") ){
		$_text = 3;
	}else if( $_text == get_i18n_lan_value("healthy_air_hq") ){
		$_text = 4;
	}
	//alert("$_text="+$_text);
	var air_index = parseInt($_text);
	air_index = air_index-1;
	//alert("air_index="+air_index);
	SwiperMode3.slideTo(air_index,0,true);
	$("#air_exchange").show();
	indexF3 = air_index+1;
})

$("#air_exchange .function_sure").click(function(){
	var save_indexF3 = indexF3-1;
	//alert("save_indexF3="+save_indexF3);
	var lvuvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_air_exchange\",\"actionParams\":{\"value\":\""+save_indexF3+"\"}}}";
	var lvuv = encode_721(lvuvsendinfo);
	sendToNative_sendUartData(lvuv.uartdata);
	console.log(lvuv.uartdata);
})





//点击温度
$("#temp_btn").click(function(){
	if( set_cold == 0 && set_hot1 == 0 && set_hot2 == 0 ){
		$("#no_set_wind").show();
		setTimeout(function(){
			$("#no_set_wind").hide();
		},1000)
	}else{
		var $_text_1 = $("#temp_click h3").text();
		if( $_text_1 == "--"){

		}else{

			var reg = /\d+/g;
			var $_text = $_text_1.match(reg);


			var air_index = parseInt($_text);
			air_index = air_index-23;

			SwiperMode4.slideTo(air_index,0,true);
			$("#set_temp").show();
			indexF4 = air_index+1;
		}
	}

})
$("#set_temp .function_sure").click(function(){
	var save_indexF4 = indexF4+22;

	save_indexF4 = parseInt(save_indexF4);
	var lvuvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_temperature\",\"actionParams\":{\"value\":\""+save_indexF4+"\"}}}";
	var lvuv = encode_721(lvuvsendinfo);
	sendToNative_sendUartData(lvuv.uartdata);
	console.log(lvuv.uartdata);
})

//点击风速
$(".choose_wind_text").click(function(){
	if( state == "1" ){
		var $_text = $(".choose_wind_text").text();
		if( $_text == "低速" ){
			$_text = 1;
		}else if( $_text == "中速" ){
			$_text = 2;
		}else if( $_text == "高速" ){
			$_text = 3;
		}

		var air_index = parseInt($_text);
		air_index = air_index-1;
		SwiperMode5.slideTo(air_index,0,true);
		indexF5 = air_index+1;
		$("#set_wind").show();
	}
})

$("#set_wind .function_sure").click(function(){
	var save_indexF5 = indexF5;
	//alert("save_indexF5="+save_indexF5);
	var lvuvsendinfo = "{\"buzJsonStr\":{\"actionName\":\"set_wind\",\"actionParams\":{\"value\":\""+save_indexF5+"\"}}}";
	var lvuv = encode_721(lvuvsendinfo);
	sendToNative_sendUartData(lvuv.uartdata);
	console.log(lvuv.uartdata);
})


$(".function_page").click(function(){
	$(".function_page").hide();
})
$(".function_mid_page").click(function(e){
	e.stopPropagation();
})
$(".function_sure,.function_del").click(function(){
	$(".function_page").hide();
})


