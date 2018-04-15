//报表对象
function  bpmReport(id,title,yTitle,desc){
	this.id=id;
	this.title=title;
	this.yTitle=yTitle;
	this.desc=desc;
}
bpmReport.prototype.setUrl=function(url){
	this.url=url;
};
bpmReport.prototype.setType=function(type){
	this.type=type;
};
bpmReport.prototype.showImage=function(){
	if(this.type==this.avgColumnType){
		showAvgColumnData(this.id,this.url,this.title,this.yTitle, this.desc);
	}else if(this.type==this.columnType){
		showColumnData(this.id,this.url,this.title,this.yTitle, this.desc);
	}else if(this.type==this.pieType){
		showPieData(this.id,this.url,this.title,this.desc);
	}
};
bpmReport.prototype.avgColumnType = 'avgColumn';
bpmReport.prototype.columnType = 'column';
bpmReport.prototype.pieType = 'pie';
//图片展示对象
function imageReport(id,showData, title,yTitle, desc){
	this.id=id;
	this.showData=showData;
	this.title=title;
	this.yTitle=yTitle;
	this.desc=desc;
}
imageReport.prototype.loadAvgColumnData=function(){
	 loadAvgColumnData(this.id,this.showData, this.title,this.yTitle,this.desc);
};
imageReport.prototype.loadColumnData=function(){
	loadColumnData(this.id,this.showData, this.title,this.yTitle,this.desc);
};

imageReport.prototype.loadPieData=function(){
	loadPieData(this.id,this.showData, this.title,this.desc);
};
//显示速率柱形图
function showAvgColumnData(id,url, title,yTitle, desc){
	loadMessage(id);
	$.ajax({
		type : "POST",
		dataType : "JSON",
		url : url,
		success : function(result) {
			var showData = [];
			$.each(result, function(i, b) {
				showData.push([ b.name, b.num ]);
			});
			closeMessage(id);
			if(showData.length == 0){
				$('#'+id).html("<font size=\"15px\" color=\"#bcbcbc\">未查询到符合条件的数据</font>");
			}else{
				var ir=new imageReport(id,showData, title,yTitle, desc);
				ir.loadAvgColumnData();
			}
		}
	});
}
//显示普通柱形图
function showColumnData(id,url, title,yTitle, desc){
	loadMessage(id);
	$.ajax({
		type : "POST",
		dataType : "JSON",
		url : url,
		success : function(result) {
			var showData = [];
			$.each(result, function(i, b) {
				showData.push([ b.name, b.num ]);
			});
			closeMessage(id);
			if(showData.length == 0){
				$('#'+id).html("<font size=\"15px\" color=\"#2779aa\">未查询到符合条件的数据</font>");
			}else{
				var ir=new imageReport(id,showData, title,yTitle, desc);
				ir.loadColumnData();
			}
		}
	});
}
//显示普通饼图
function showPieData(id,url, title,desc){
	loadMessage(id);
	$.ajax({
		type : "POST",
		dataType : "JSON",
		url : url,
		success : function(result) {
			var showData = [];
			$.each(result, function(i, b) {
				showData.push([ b.name, b.num ]);
			});
			closeMessage(id);
			if(showData.length == 0){
				$('#'+id).html("<font size=\"15px\" color=\"#bcbcbc\">未查询到符合条件的数据</font>");
			}else{
				var ir=new imageReport(id,showData, title,null, desc);
				ir.loadPieData();
			}
		}
	});
}
function freshValue(id){
    var pro = $( "#"+id+"pgbar");
    var newValue = pro.progressbar("value");
  	if( newValue >= 100) {
    	 newValue=0;
    }else{
    	 newValue=newValue+5;	
    }
    pro.progressbar("value",newValue); 
    setTimeout(  function(){freshValue(id);}, 200); 
}
function showProgress(id){
	this.id=id;
}
showProgress.prototype.BAR_NAME="pgbar";
showProgress.prototype.LABEL_NAME="pglabel";
showProgress.prototype.show=function(){
	var pro = $( "#"+this.id+this.BAR_NAME);   
    var proLabel = $( "#"+this.id+this.LABEL_NAME); 
    pro.progressbar({
      value: false,   
      change: function() {
        proLabel.text( pro.progressbar( "value" ) + "%" );
      }
    });
    var id=this.id;
    setTimeout( function(){freshValue(id);}, 0); 
};
showProgress.prototype.close=function(){
	$("#"+this.id+this.BAR_NAME).hide();
};
//加载消息
function loadMessage(id) {
	var sp=new showProgress(id);
	sp.show();
};
//关闭消息
function closeMessage(id){
	var sp=new showProgress(id);
	sp.close();
}
//加载数据
function loadAvgColumnData(id,reslut, title, ytitle, name) {
		$('#'+id).highcharts({
			chart : {
				type : 'column',
				margin : [ 100, 100, 90, 150 ]
			},
			title : {
				text : '<span style="font-weight:bold;">'+title+'</span>'
			},
			xAxis : {
				type : 'category',
				labels : {
					rotation : 0,
					style : {
						fontSize : '14px',
						fontFamily : 'Verdana, sans-serif'
					}
				}
			},
			yAxis : {
				min : 0,
				title : {
					text :'<span style="font-weight:bold;">'+ytitle+'</span>' 
				},
				labels : {
					rotation : 0,
					style : {
						fontSize : '15px',
						fontFamily : 'Verdana, sans-serif'
					}
				}
			},
			plotOptions : {
				column : {
					colorByPoint : true
				},
				series: {
		               pointPadding: 0, 
		               borderWidth: 0,
		               shadow: false,
		               pointWidth:85 
		        }
			},
			legend : {
				enabled : false
			},
			tooltip : {
				pointFormatter: function () {
                    return  name + ' <b>'+ getDesc(this.y) + '</b>';
                }
			},
			series : [ {
				name : '流程',
				data : reslut,
				dataLabels : {
					enabled : true,
					rotation : 0,
					color : '#FFFFFF',
					align : 'center',
					format : '{point.y}',
					x : 0,
					y : 0,
					style : {
						fontSize : '12px',
						fontFamily : 'Verdana, sans-serif'
					}
				}
			} ]
		});
}

//获取描述信息
function  getDesc(y){
	var desc=null;
	if(y>=1440){
		var a=parseInt(y/1440);
		var b=y-(a*1440);
		return a+"天"+ getDesc(b);
	}else if(y<1440&y>=60){
		var a=parseInt(y/60);
		var b=y-(a*60);
		if(b>0){
			return a+"小时"+b+"分";
		}else{
			return  a+"小时";
		};
	}else{
		return y+"分";
	};
	
}

/**
 * 加载数据
 * @param reslut
 * @param title
 * @param ytitle
 * @param name
 */
function loadColumnData(id,reslut, title, ytitle, name) {
	$('#'+id).highcharts({
		chart : {
			type : 'column',
			margin : [ 100, 100, 90, 150 ]
		},
		title : {
			text : '<span style="font-weight:bold;">'+title+'</span>'
		},
		xAxis : {
			type : 'category',
			labels : {
				rotation : 0,
				style : {
					fontSize : '14px',
					fontFamily : 'Verdana, sans-serif'
				}
			}
		},
		yAxis : {
			min : 0,
			title : {
				text :'<span style="font-weight:bold;">'+ytitle+'</span>' 
			},
			labels : {
				rotation : 0,
				style : {
					fontSize : '15px',
					fontFamily : 'Verdana, sans-serif'
				}
			}
		},
		plotOptions : {
			column : {
				colorByPoint : true
			},
			series: {
	               pointPadding: 0, 
	               borderWidth: 0,
	               shadow: false,
	               pointWidth:85 
	        }
		},
		legend : {
			enabled : false
		},
		tooltip : {
			pointFormat : '{point.x:}' + name + ' <b>{point.y:.0f}个</b>'
		},
		series : [ {
			name : '流程',
			data : reslut,
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#FFFFFF',
				align : 'center',
				format : '{point.y}',
				x : 0,
				y : 0,
				style : {
					fontSize : '12px',
					fontFamily : 'Verdana, sans-serif'
				}
			}
		} ]
	});
}
/**
 * 加载饼状图
 * @param id
 * @param reslut
 * @param title
 * @param desc
 */
function loadPieData(id,reslut, title, desc) {
	$('#'+id).highcharts({
		chart : {
			type : 'pie',
			options3d : {
				enabled : true,
				alpha : 45,
				beta : 0
			}
		},
		title : {
			text : "<b>"+title+"</b><br/>（排列前20的数据委托概况）"
		},
		
		tooltip : {
			pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				depth : 45,
				dataLabels : {
					enabled : true,
					format : '{point.name}'
				}
			}
		},
		series : [ {
			type : 'pie',
			name : desc,
			data : reslut
		} ]
	});
}