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
				var inputArray = [];
				
				var inputDataArray = [];
				var n = 0;
				var hasResult = false;//默认无值
				$.each(dataArray,function(idx,obj){
					var inputObj = {};
					var appData = obj;//各个系统的统计项
					//补足数组位数
				    var inputDataArray = appendFull(appData,chooseType,ctime);
				    //inputObj.appFlag = idx;
				    inputObj.appFlag = appFlagValue(idx);//处理系统编码为中文显示
					inputObj.logLevel = logLevel;
					inputObj.ctime = ctime;
					inputObj.count = inputDataArray;//数组
					inputArray[n] = inputObj;
					n++;
					hasResult = true;//设置为有值
				});
				
				if(!hasResult){//查询结果为空情况
					var inputObj = {};
					var appData = [];
					var inputDataArray = appendFull(appData,chooseType,ctime);
					inputObj.logLevel = logLevel;
					inputObj.ctime = ctime;
					inputObj.count = inputDataArray;//数组
					inputArray[0] = inputObj;
				}
				
			    
				
			    //设置图表参数
			    var tooltipFormat = '';//提示格式
			    var daytimeFormat = [];//x轴坐标
			    
			    if(chooseType == type_day){
			    	tooltipFormat = "{b}时 : {c}次";
			    	daytimeFormat = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
			    }
			    if(chooseType == type_month){
			    	tooltipFormat = "{b}日 : {c}次";
			    	var days = getMDays(ctime);//组织当前月所拥有天数
			    	for(var k =1 ;k <= days ; k ++){
			    		daytimeFormat[k-1]=''+k;
			    	}
			    }
			    
				//新增成功后，
				flushChart(inputArray,tooltipFormat,daytimeFormat);
				
	  	});
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
	//flushChart(1);
	function flushChart(countData,tooltipFormat,daytimeFormat){
		
		var option = {
			    tooltip : {
			        trigger: 'axis'
			        //formatter: tooltipFormat
			    },
			    legend: {
			        data:appFlagDicNames
			    },
			    
			    calculable : false,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data :daytimeFormat
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        
			    ]
			};
		myChart.clear();//清空图像	                    
		myChart.setOption(option);
		var seriesArray = new Array();
		//组织需要的数值
		for(var i = 0 ; i < countData.length ; i++ ){
			var seriesObj = {};
			seriesObj.name=countData[i].appFlag;
			seriesObj.type="line";
			seriesObj.stack="";//设置值会进行堆积计算
			seriesObj.data=countData[i].count;
			seriesArray[i]=seriesObj;
		}
		
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
	//数组补足位数,符合按天/月,或时/天统计
	function appendFull(inputArray,type,ctime){
		var length = inputArray.length;
		var resultArray = [];
		
		if(type == type_month){//天/月统计
			var total = getMDays(ctime);
			for(var i = 0 ;i < total; i++ ){//月中天数
				resultArray[i] = 0;//默认为0
				for(var j = 0 ;j<inputArray.length;j++){
					var ctime = inputArray[j].ctime;
					var count = inputArray[j].count;
					if((i+1) == ctime){//相等的时,即此下标数组有值
						resultArray[i] = resultArray[i] + count;
					    //break;
					}
				}
				 
			}
		}
		if(type == type_day){//时间统计
			for(var i = 0 ;i < 24; i++ ){//二十四小时
				resultArray[i] = 0;//默认为0
				for(var j = 0 ;j<inputArray.length;j++){
					var ctime = inputArray[j].ctime;
					var count = inputArray[j].count;
					if(i == ctime){//相等的时,即此下标数组有值
						resultArray[i] = count;
					    break;
					}
				}
				 
			}
		}
		return resultArray;
	}