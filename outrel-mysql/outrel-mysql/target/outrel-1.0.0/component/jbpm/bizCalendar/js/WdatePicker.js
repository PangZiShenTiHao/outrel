function SetDate(splitStr,readFun,name,container){
		this.readFun=readFun;
		this.container=container||document.body;
		this.name="date"+name;
		this.maxYear=2030;
		this.minYear=1990;
		this.splitStr='';
		if(splitStr){
			this.splitStr=splitStr;
		}
		this.date=new Date();
		this.year=this.date.getFullYear();
		this.month=this.date.getMonth()+1;
		this.day=this.date.getDate();
		this.newDate=new Date(this.year,this.month-1,1);
		this.init();
}
SetDate.prototype={
	constructor:SetDate,
	init:function(){
		var that=this;
		$(that.container).append('<div id="'+that.name+'"></div>');
		$("#"+that.name).bind('click', function (ev, obj) {
			that.dateOnclick(ev)
		}).bind('change',function(ev){
				that.yearUpdate(ev);
		});
	},
	initDate:function(){
		this.days=["日","一","二","三","四","五","六"];
	},
	/*
	*动态整合区间的select下拉框
	*/
	getYearsOrMonth:function(min,max,selValue){
		var selectStr="<select >";
		for(var i=min;i<=max;i++){
			var selStr="";
			if(i==selValue){
				selStr=" selected=true ";
			}
			selectStr+="<option "+selStr+" value="+i+">"+i+"</option>";
		}
		selectStr+="</select>";
		return selectStr;
	},
	/*
	*
	*/
	show:function(){
		var that=this;
		this.initDate();
		this.startWeek=this.newDate.getDay();//开始是周几
		this.datas=this.putDays();
		var rows=0;
		if(this.datas.length%7==0){
			rows=parseInt(this.datas.length/7);
		}else{
			rows=parseInt(this.datas.length/7)+1;
		}
		var drewDate=function(overDates){
			var overDateFun=function(day){
				if(overDates){
					for(var i=0;i<overDates.length;i++){
						var d=overDates[i];
						if(d==day){
							return "tdOver";	
						}	
					}
				}
				return "";	
			}
			var dateStr="<table cellspacing='1' cellpadding='1' bgcolor='#a3c0e8'><tbody>";
			dateStr+="<tr class='topPanel'><td colspan='7'  style='text-align:center'>";
			dateStr+="<div class='prevYear'><a href='javascript:void(0)'></a></div><div class='prevMonth'><a href='javascript:void(0)'></a></div><div class='selectObj'>"+that.getYearsOrMonth(that.minYear,that.maxYear,that.year)+that.getYearsOrMonth(1,12,that.month)+"</div><div class='nextMonth'><a href='javascript:void(0)'></a></div><div class='nextYear'><a href='javascript:void(0)'></a></div>";
			dateStr+="</td></tr>";
			for(var rIndex=0;rIndex<rows;rIndex++){
				var tr="<tr class='trCss'>";
				for(var i=0;i<7;i++){
					var dataIndex=rIndex*7+i;
					var pojo=that.datas[dataIndex];
					isr=pojo?pojo:"";
					var overClass=overDateFun(that.getDateByDay(pojo));
					var tdStr="<td class='"+overClass+"' isReality='"+isr+"'>";
					if(rIndex==0){
						tr+="<td style='text-align:center'>"+pojo+"</td>";
					}else{
						if(dataIndex>=that.datas.length){
							tr+=(tdStr+"&nbsp;</td>");
						}else{
							if(pojo==that.day){
								tdStr="<td class='tdDayOver "+overClass+"' isReality='"+isr+"'>";
							}else if((dataIndex)%7==0||(dataIndex+1)%7==0){
								tdStr="<td class='weekend "+overClass+"' isReality='"+isr+"'>";
							}
							tr+=(tdStr+pojo+"</td>");
						}
					}
				}
				dateStr+=(tr+"</tr>");
			}
			$("#"+that.name).html(dateStr+'</tbody></table>');
		}
		if(that.readFun){
			that.readFun(that.getDateByDay(),function(dates){
				drewDate(dates);
			})
		}else{
			drewDate();	
		}
	},
	todayValue:function(){
		var nowDate=new Date();
		this.year=nowDate.getFullYear();
		this.month=nowDate.getMonth()+1;
		this.day=nowDate.getDate();
	},
	makeUpZero:function(value,length){
		value+='';
		if(value.length<length){
			var makeUpLen=length-value.length;
			for(var i=makeUpLen;i>0;i--){
				value=("0"+value);	
			}	
		}
		return value;
	},
	/*
	*公共的单击事件，用来监听面板当中的所有操作
	*/
	dateOnclick:function(ev){
			var that=this;
			var obj = ev.srcElement || ev.target;
			var endObj=$(obj);
			if(obj.nodeName=="TD"&&endObj.attr("isreality")){
				if(endObj.hasClass("tdOver")){
					endObj.removeClass("tdOver");	
				}else{
					endObj.addClass("tdOver");
				}
			}else if(obj.nodeName=="A"){
					var parentNode=obj.parentNode;
					if(parentNode.className){
						var opBit=false;
						switch (parentNode.className){
							case "prevYear":
								if(that.year<=that.minYear){
									that.year=that.maxYear;	
								}else{
									that.year=parseInt(that.year)-1;	
								}
								opBit=true;
								break;
							case "nextYear":
								if(that.year>=that.maxYear){
									that.year=that.minYear;
								}else{
									that.year=parseInt(that.year)+1;
								}
								opBit=true;
								break;
							case "prevMonth":
								if(that.month==1){
									if(that.year<=that.minYear){
										that.year=that.minYear;	
									}else{
										that.year-=1;
									}
									that.month=12;
								}else{
									that.month-=1;
								}
								opBit=true;
								break;
							case "nextMonth":
								if(that.month>=12){
									if(that.year>=that.maxYear){
										that.year=that.maxYear;	
									}else{
										that.year+=1;
									}
									that.month=1;
								}else{
									that.month+=1;
								}
								opBit=true;
								break;
						}
						if(opBit){
							that.days.length=0;
							that.newDate=new Date(that.year,that.month-1,1);//生成当前月的第一天
							that.show();
						}

					}
				}
			//event.cancelBubble=true;
	},
	getDateByDay:function(d){
		var that=this;
		var m=that.month;
		if(d){
			d=d+"";
			if(d.length<2){
				d="0"+d;	
			}
			d=that.splitStr+d
		}else{
			d="";	
		}
		if(m<10){
			m="0"+m;	
		}
		return that.year+that.splitStr+m+d;
	},
	getSelectedDate:function(){
		var that=this;
		var values=[];
		 $('#'+this.name).find("td").each(function () {
		    var obj=$(this);
            if(obj.hasClass("tdOver")){
				var d=obj.attr("isreality");
				values.push(that.getDateByDay(d));
			}
        });
		return values;
	},
	/*
	*年份与日期下拉框更改时的事件
	*/
	yearUpdate:function(ev){
		var that=this;
		var obj = ev.srcElement || ev.target;
		//var obj=JBF.getEventTarget(event);
		//alert(obj.nodeName);
		if(obj.nodeName=="SELECT"){
				var value=obj.options[obj.selectedIndex].value;
				if(value.length>2){
					that.year=value;
				}else{
					that.month=value;	
				}
				that.days.length=0;
				that.newDate=new Date(that.year,that.month-1,1);//生成当前月的第一天
				that.show();	
		}
	},
	/*把所有数据全部压缩到表格当中
	*/
	putDays:function(){
		for(var i=0;i<this.startWeek;i++){
			this.days.push("");
		}
		monthDays=this.getMonthDays(this.month);
		for(var i=1;i<=monthDays;i++){
			this.days.push(i);
		}
		return this.days;
	},
	/*
	*通过当前年，及月份，得到当前月有几天
	*/
	getMonthDays:function(){
		var monthDay=30;
		switch(Number(this.month)){
			//case 1||3||5||7||8||10||12:
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				monthDay=31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				monthDay=30;
				break;
			case 2:
				if((this.year % 400 == 0)||(this.year % 4 == 0)&&(this.year % 100 != 0)){
					monthDay=29;
				}else{
					monthDay=28;
				}
				break;
			default:
				monthDay=30;
		}
		return monthDay;
	}
};
(function ($) {
    $.fn.newDate = function (splitStr,readFun) {
        var tname = "tname" + (new Date()).getTime();
        return new SetDate(splitStr,readFun,tname,$(this)[0]);
    };
})(jQuery);
