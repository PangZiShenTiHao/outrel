//默认按时/天统计
	var ischoose = $("#ctimeType").find("option:selected").val();
	if(ischoose != ''){
		$("#ctimeType").val(type_day);
		changeCtime();
		//当天
		$("#ctime").val(getTodayDate());
	}
	
	//定义form表单 查询 方法
	function queryData(){
		
		var chooseType = $("#ctimeType").val();//选中类型
		var ctime = $("#ctime").val();
		//时间必须选择
		if(ctime == ''){
			jyDialog({"type":"info"}).alert("时间必须选择！");
			return;
		}
		var appFlag = $("#appFlag").val();
		var logLevel = $("#logLevel").val();
		var params=$("#queryDataForm").serialize();
		var url=$("#queryDataForm").attr("action");
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(data){
				var dataArray = data.data;
				//格式为 {S00x:[{"ctime":"01","count":3},{"ctime":"01","count":3}]}
				var inputArray = createChartData(dataArray,1);
				var inputArrayRight = createChartData(dataArray,2);
			    //设置图表参数
			    var tooltipFormat = '';//提示格式
			    var daytimeFormat = [];//x轴坐标
				//新增成功后，生成左侧图
				flushChart(inputArray,tooltipFormat,daytimeFormat);
			    //生成右侧图
				flushRightChart(inputArrayRight,tooltipFormat,daytimeFormat);
				
	  	});
	}
	//生成图表数据,type = 1 生成左侧,type=2生成右侧
	function createChartData(dataArray,type){
		var inputArray = [];
		var n = 0;
		var hasResult = false;//默认无值
		$.each(dataArray,function(idx,obj){
			var inputObj = {};
			var appData = obj;//各个系统的统计项
			var inputDataArray;
			//补足数组位数
		    if(type == 1 ){
				inputDataArray = appendFullByLevel(appData);
			}
			if(type == 2 ){
				inputDataArray = appendFullByAppFlag(appData);
			}
			
		    //inputObj.appFlag = idx;
		    inputObj.appFlag = appFlagValue(idx);//处理系统编码为中文显示
			inputObj.ctime = ctime;
			inputObj.count = inputDataArray;//数组
			inputArray[n] = inputObj;
			n++;
			hasResult = true;//设置为有值
		});
		
		if(!hasResult){//查询结果为空情况
			var inputObj = {};
			var appData = [];
			var inputDataArray;
			if(type == 1 ){
				inputDataArray = appendFullByLevel(appData);
			}
			if(type == 2 ){
				inputDataArray = appendFullByAppFlag(appData);
			}
			inputObj.ctime = ctime;
			inputObj.count = inputDataArray;//数组
			inputArray[0] = inputObj;
		}
		return inputArray;
	}
	//定义 form表单 重置方法
	function resetData(){
		
	}
	//初始化 查询页面元素
	function initFn(){
		$("#tjsearchBtn").click(function(){
			queryData();
			
		});
	}
	
	setTimeout(queryData, 1000);
	var myChart = echarts.init(document.getElementById('main'));
	var myChartRight = echarts.init(document.getElementById('mainRight'));
	//生成右侧图表 
	function flushRightChart(countData,tooltipFormat,daytimeFormat){
		var optionRight = {
				title:{text: '各系统百分比',
			       
			        x:'center'},
				tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			    	
			        y : '40',
			        data:appFlagDicNames
			    },
			    
			    calculable : true,
			    
			    series : [
			        
			    ]
			};
		myChartRight.clear();//清空图像
		myChartRight.setOption(optionRight);
		var seriesArray = new Array();
		//data数组中的数据格式为{value:335, name:'理财系统'},
		var data = joinArrayRight(countData);
		//组织需要的数值
		var seriesObj = {};
		seriesObj.name='错误率占比';
		seriesObj.type="pie";
		seriesObj.radius = "55%";
		seriesObj.center = ['50%', '70%'];
               
		seriesObj.data=data;
		seriesArray[0]=seriesObj;
		console.log("right:");
		console.log(seriesArray);
		myChartRight.setOption({series:seriesArray}, false);
	}
	//生成图表
	function flushChart(countData,tooltipFormat,daytimeFormat){
		
		var option = {
				title:{text: '各级别百分比',
			       
			        x:'center'},
				tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			    	
			        y : '40',
			        data:levelLogDicNames
			    },
			    
			    calculable : true,
			    
			    series : [
			        
			    ]
			};
		
		myChart.clear();//清空图像	                    
		myChart.setOption(option);
		
		var seriesArray = new Array();
		//data数组中的数据格式为{value:335, name:'直接访问'},
		var data = joinArray(countData);
		//组织需要的数值
		var seriesObj = {};
		seriesObj.name='错误率占比';
		seriesObj.type="pie";
		seriesObj.radius = "55%";
		seriesObj.center = ['50%', '60%'];
               
		seriesObj.data=data;
		seriesArray[0]=seriesObj;
		console.log("left:");
		console.log(seriesArray);
		myChart.setOption({series:seriesArray}, false);
	}
	//生成时间选择下拉列表
	function changeCtime(){
		var choose = $("#ctimeType").val();
		
		//时间控件绑定
		if(choose == type_month){
			$("#ctime").val("");
			$("#ctime").unbind();
			$("#ctime").bind('focus',function(){
				WdatePicker({dateFmt:'yyyy-MM'});
			});
		}
		if(choose == type_day){
			$("#ctime").val("");
			$("#ctime").unbind();
			$("#ctime").bind('focus',function(){
				WdatePicker({dateFmt:'yyyy-MM-dd'});
			});
		}
		return;
		
		
		$("#ctime").empty();
		if(choose == type_month){//按天/月统计
			for(var i = 1 ;i<=getDays();i++){
				var v = i < 10 ? "0"+i : i;//小于10补0
				var option = $("<option>").val(v).text(i+"号");
			    $("#ctime").append(option);
			    //设置选中
			    if(getToday()==i){
			    	$("#ctime").val(v);
			    }
			    
			}
		}else if(choose == type_day){//按时/天统计
			for(var i = 0 ;i<24;i++){
				var v = i < 10 ? "0"+i : i;//小于10补0
				var option = $("<option>").val(v).text(i+"点");
			    $("#ctime").append(option);
			    //设置选中
			    if(getTodayHour()==i){
			    	$("#ctime").val(v);
			    }
			    
			}
		}
		
		
	}
	//得到当前月的天数
	function getDays(){
		var date = new Date();
		var y = date.getFullYear();//当前年
		var m = date.getMonth() + 1;//当前月
		if(m == 2){//当前月为二月时,判断润月
			return y % 4 == 0 ? 29 : 28;
		}else if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
			//判断大月
			return 31;
		}else{
			return 30;
		}
	}
	//得到当前月的天数 格式为yyyy-MM
	function getMDays(input){
		var ym = input.split("-");
		var y = ym[0];//年
		var m = ym[1];//月
		if(m == 2){//当前月为二月时,判断润月
			return y % 4 == 0 ? 29 : 28;
		}else if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
			//判断大月
			return 31;
		}else{
			return 30;
		}
	}
	//得到今天号数
	function getToday(){
		var date = new Date();
		var d = date.getDay();//几号
		return d;
	}
	//得到今天日期
	function getTodayDate(){
		var date = new Date();
	    var seperator1 = "-";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	            
	    return currentdate;  
	}
	//得到当前小时
	function getTodayHour(){
		var date = new Date();
		var h = date.getHours();
		return h;
	}
	//数组补足位数,按照级别补足
	//返回不同级别的结果,根据级别的顺序[0, 0, 0, 6 更多...]
	function appendFullByLevel(inputArray){
		//{"S001":[{"appFlag":"S001","count":1"ctime":null,"logLevel":3,"nodeName":null}],"S002":...}
		var length = inputArray.length;
		var resultArray = [];
		for(var i = 0 ;i < levelLogDicNames.length; i++ ){
			resultArray[i] = 0;//默认为0
			var stardLogLevel = levelLogDicValues[i];//数据字典中的级别
			for(var j = 0 ;j<inputArray.length;j++){
				var logLevel = inputArray[j].logLevel;
				var count = inputArray[j].count;
				if(stardLogLevel == logLevel){//相等,追加
					resultArray[i] = resultArray[i] + count;
				    //break;
				}
			}
			 
		}
		
		return resultArray;
	}
	//数组补足位数,按照系统标识补足
	//返回不同系统的结果,根据系统标识的顺序[0, 0, 0, 6 更多...]
	function appendFullByAppFlag(inputArray){
		//{"S001":[{"appFlag":"S001","count":1"ctime":null,"logLevel":3,"nodeName":null}],"S002":...}
		var length = inputArray.length;
		var resultArray = [];
		for(var i = 0 ;i < appFlagDicValues.length; i++ ){
			resultArray[i] = 0;//默认为0
			var stardAppFlag = appFlagDicValues[i];//数据字典中的系统标识编码值
			for(var j = 0 ;j<inputArray.length;j++){
				var appFlag = inputArray[j].appFlag;
				var count = inputArray[j].count;
				if(stardAppFlag == appFlag){//相等,追加
					resultArray[i] = resultArray[i] + count;
				    //break;
				}
			}
			 
		}
		
		return resultArray;
	}
	//将数组合并[{m:n,count:[]}]=>[{value:335, name:'直接访问'}]
	function joinArray(inputArray){
		var result = [];
		var data = [];
		//将各级别错误次数合并
		for(var k = 0 ;k<levelLogDicNames.length;k++){//各个级别的数据相加
			result[k] = 0;
			for(var j = 0 ;j<inputArray.length;j++){
				result[k] = result[k] + inputArray[j].count[k];
			}
			
		}
		//组织{value:335, name:'一般级别'}格式
		for(var j = 0 ;j<levelLogDicNames.length;j++){
			
			var inputObj = {};
			inputObj.value=result[j];
			inputObj.name=levelLogDicNames[j];
			data[j]=inputObj;
		}
		return data;
		
	}
	//将数组合并[{m:n,count:[]}]=>[{value:335, name:'理财系统'}]
	function joinArrayRight(inputArray){
		var result = [];
		var data = [];
		//将各级别错误次数合并
		for(var k = 0 ;k<appFlagDicValues.length;k++){//各个级别的数据相加
			result[k] = 0;
			for(var j = 0 ;j<inputArray.length;j++){
				result[k] = result[k] + inputArray[j].count[k];
			}
			
		}
		//组织[{value:335, name:'理财系统'},]格式
		for(var j = 0 ;j<appFlagDicNames.length;j++){
			
			var inputObj = {};
			inputObj.value=result[j];
			inputObj.name=appFlagDicNames[j];
			data[j]=inputObj;
		}
		return data;
		
	}