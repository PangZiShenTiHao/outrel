$(function(){
	//点击扩编时
	$("#disType1").bind("click",function() { 
		//隐藏转出客服
		$(".trServiceOld").hide();
		//显示转入客服
		$(".trServiceNew").show();
		//显示在职客服
		$(".trServiceNow").show();
		clearService();
	});
	//点击缩编时
	$("#disType2").bind("click",function() { 
		//显示转出客服
		$(".trServiceOld").show();
		//隐藏转入客服
		$(".trServiceNew").hide();
		//显示在职客服
		$(".trServiceNow").show();
		clearService();
	});
	//点击顶替时
	$("#disType3").bind("click",function() { 
		//显示转出客服
		$(".trServiceOld").show();
		//显示转入客服
		$(".trServiceNew").show();
		//隐藏在职客服
		$(".trServiceNow").hide();
		clearService();
	});
	/**
	 * 清空客服
	 */
	function clearService(){
		$("#serviceOld,#serviceNew,#serviceNow").val("");
	}
});