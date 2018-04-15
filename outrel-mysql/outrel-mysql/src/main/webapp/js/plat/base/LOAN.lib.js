/**
 * LOAN.util.js
 * 公共js库，放置一些常用的js函数
 * author : 
 * 调用示例(详细说明见各个对象及方法)：
 * 		LOAN.util.getDate();
 * 		LOAN.tabs({
	 		navs : $("ul li"),
	 		panels : $(".content"),
	 		focusClass : "focus"
 * 		});
 * 		LOAN.dialog.open({
 * 			url : "test.jsp",
 * 			modal : true,
 * 			width: 600,
 * 			height: 500
 * 		});
*/

(function(){
	var _util = {
		/*
		 * 返回日期，默认格式2000年00月00日
		 * 可接受1个或2个或3个参数，可分别替换默认的年，月，日，1个或2个时，只替换年和月
		 */
		getDate : function(){
			var f = arguments[0]?[arguments[0],arguments[1]?arguments[1]:arguments[0],arguments[2]?arguments[2]:""]:["年","月","日"];
			var today = new Date();
			return ""+today.getFullYear()+f[0]+(today.getMonth()+1)+f[1]+today.getDate()+f[2];
		},
		reg : {
			any : /.*/,
			//日期yyyy-MM-dd
			date : /^(((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29)))?$/,
			//日期格式 yyyy-MM
			date2 : /^((1[6-9]|[2-9]\d)\d{2}-?(0?[1-9]|1[012]))?$/,
			demical : /(^\d+\.\d+$)|(^\d*$)|(^\-\d+$)/,//小数
			integer : /^\d*$/,//整数
			name : /^([\u4e00-\u9fa5\s]|[a-zA-Z])*$/,//中英文
			NAndC : /^[a-zA-Z\d\s]*$/,//数字和字母
			charactor : /^\w*$/,//字符
			email : /^(([a-zA-Z0-9_\-]+\.?)*(\w)+\@([a-zA-Z0-9_\-]+\.)+(\w)+)?$///email		
		},
		//可校验日期，格式为2010-10-10
		validDate : function(date,s, type){
			if(!date) return false;
			s = s||"-";
			if(type == 2) {//type==2 yyyy-MM格式
				return this.reg.date2.test(date);
			} else {//默认为yyyy-MM-dd格式
				return this.reg.date.test(date);
			}
		},
		//可校验EMAIL
		isEmail : function(date){
			if(!date) return false;
			
			return this.reg.email.test(date);
		},
		//检查身份证号码
		isCheck18ID : function(pId){
			if(!pId) return false;
			
			//检查身份证号码 Go_Rush(阿舜) from http://ashun.cnblogs.com
		    var arrVerifyCode = [1,0,"x",9,8,7,6,5,4,3,2];
		    var Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
		    var Checker = [1,9,8,7,6,5,4,3,2,1,1];

    //if(pId.length != 15 && pId.length != 18)    return "身份证号共有 15 码或18位";
		 if(pId.length != 18){
			 //alert("身份证号共有18位");
			 return false;
		 } 
		    var Ai=pId.length==18 ?  pId.substring(0,17)   :   pId.slice(0,6)+"19"+pId.slice(6,16);
		
		    if (!/^\d+$/.test(Ai)){
		    	//alert("身份证除最后一位外，必须为数字！");
		      return false;
		     }
		
		    var yyyy=Ai.slice(6,10) ,  mm=Ai.slice(10,12)-1  ,  dd=Ai.slice(12,14);
		
		    var d=new Date(yyyy,mm,dd) ,  now=new Date();
		     var year=d.getFullYear() ,  mon=d.getMonth() , day=d.getDate();
		
		    if (year!=yyyy || mon!=mm || day!=dd || d>now || year<1940){
		   		//alert("身份证输入错误！");
		     	return false;
		     }
		
		    for(var i=0,ret=0;i<17;i++){
		      ret+=Ai.charAt(i)*Wi[i];    
		    }
		     Ai+=arrVerifyCode[ret %=11];
			//alert("good"+Ai);
		    //return pId.length ==18 && pId != Ai?"身份证输入错误！":Ai;  
		    if(pId.length ==18 && pId != Ai){
		    	//alert("身份证输入错误！");
		    	return false;
		    }else{
		    	return true;
		    }
		    //return pId.length ==18 && pId != Ai?"身份证输入错误！":true;  
		},
		//根据身份证 获取 出生年月日，及性别
		isYearMonthSexByID : function(id){
			if(!id) return false;
			
			var arr=[null,null,null,null,null,null,null,null,null,null,null,"北京","天津","河北","山西","内蒙古"
             ,null,null,null,null,null,"辽宁","吉林","黑龙江",null,null,null,null,null,null,null,"上海"
             ,"江苏","浙江","安微","福建","江西","山东",null,null,null,"河南","湖北","湖南","广东","广西","海南"
             ,null,null,null,"重庆","四川","贵州","云南","西藏",null,null,null,null,null,null,"陕西","甘肃"
             ,"青海","宁夏","新疆",null,null,null,null,null,"台湾",null,null,null,null,null,null,null,null
             ,null,"香港","澳门",null,null,null,null,null,null,null,null,"国外"]
    			//id=checkId(id)
    			//if (isNaN(id)) return "错误的身份证号码"    
   				 var id=String(id),  prov=arr[id.slice(0,2)]  ,  sex=id.slice(14,17)%2?  "1" : "0";
				
				var birthdayObj=(new Date(id.slice(6,10) , id.slice(10,12)-1 , id.slice(12,14)));
    			var birthday=birthdayObj.format("yyyy-MM-dd");
    			debugger;
    			//计算精确年龄
    			var nowObj=new Date();
    			var curYear=nowObj.getFullYear();
    			var birthYear=new Date(id.slice(6,10)).getFullYear();
    			var age=curYear-birthYear;
    			if(birthdayObj.format("MMdd")>nowObj.format("MMdd")) {
    				age-=1;
    			}
    			
    			var bornInAnimal=(birthYear-1900)%12+1;
   			 return [prov,birthday,sex,age,bornInAnimal];

		},
		/**
		 * 日期格式判断 支持三种情况的日期格式
		 * 规则 日期格式必须为以下三种情况：
		 * yyyy-mm-dd 或 yyyy/mm/dd 或 yyyymmdd 其中 以 yyyy-mm-dd 为基准
		 * 如果是其他格式的日期则转换成yyyy-mm-dd 来校验
		 * 验证通过 返回 false 日期自动转换为 yyyy-mm-dd格式，否则 返回 true 并且清空文本框
		 * @param $this 日期文本框对象
		 * @param msg 验证失败的提示
		 * @return true / false
		 */
		validateCheck : function($this, msg){
			msg = msg || "请输入正确的日期，格式： yyyy-mm-dd 或 yyyymmdd";
			var _value = $.trim($($this).val()); 
			if(!_value || _value == "")	return false;
			var _result = _value;
			var _i = _value.indexOf("-") == -1;
			var _j = _value.indexOf("/") == -1;
			if(_i && _j){
				_result = this.convert(_value);
			}else{
				if(!_i && !_j)
					_result = "0000-00-00";
				if(_i && !_j)	
					_result = this.convert(_value, "-");
			}
			if(!this.reg.date.test(_result)){
				$($this).attr("value", "").focus();
			 	alert(msg);
			 	return false;
			}
			$($this).attr("value", _result);
			return true;
		},
		/**
		 * 日期转换 支持二种日期格式转换， yyyy/mm/dd和yyyymmdd
		 * 转换的结果格式为 yyyy-mm-dd
		 * @param _value 需要转换的日期
		 * @param reg 全局替换规则 根据实际需要转换的日期格式来决定是否传该参数
		 * 例如 :_value = yyyy/mm/dd, reg = '-' 转换后的格式为 yyyy-mm-dd
		 * @return 转换后的日期格式 或 无效的日期
		 */
		convert : function(_value, reg){
			if(reg)
				return _value.replace(/\//g, reg);
			if(/^\d{8}$/.test(_value))
				return _value.substring(0,4) + "-" + _value.substring(4,6) + "-" + _value.substring(6,8);
		  	return "0000-00-00"; 
		},
		/*比较日期大小，返回结果是基于date1相对于date2参数比较的结果
		* date1 > date2 时, 返回 '>'
		* date1 = date2 时，返回 '='
		* date1 < date2 时，返回 '<'
		*/
		compareDate : function(date1,date2, type){
			var d1;
			var d2;
			if(type == 2) {
				if(!this.validDate(date1,'',type)||!this.validDate(date2,'',type)){
					alert('日期格式不正确，格式为：yyyy-mm 或 yyyymm');
					return false;
				}
				d1 = new Date(date1.replace(/\-/g,"/")+"/01");
				d2 = new Date(date2.replace(/\-/g,"/")+"/01");
			} else {
				if(!this.validDate(date1)||!this.validDate(date2)){
					alert('日期格式不正确，格式为：yyyy-mm-dd 或 yyyymmdd');
					return false;
				}
				d1 = new Date(date1.replace(/\-/g,"/"));
				d2 = new Date(date2.replace(/\-/g,"/"));
			}
			if(d1>d2){
				return ">";
			}else if(d1<d2){
				return "<";
			}else{
				return "=";
			}
			
		},
		isInteger : function(s){
			if(s==null || s=="") return false;
			if(this.reg.integer.test(s)) return true;
			return false;
		},
		isDemical : function(s){
			if(s==null || s=="") return false;
			if(this.reg.demical.test(s)) return true;
			return false;
		},
		//自适应iframe高度问题，传递进iframe；interval是可选的，调整的间隔，不传，表示只调整一次；repeat需要调整几次，Interval才有用，不传表示一直调整
		adjustIframeHeight : function(frame,interval,repeat,minHeight){
			var _this = this;
			function inner(frame){
				var $frame = $(frame);
				$frame.each(function(){
					try{
						var oframe = this;
						var height = oframe.contentWindow.document.body.scrollHeight+parseInt($(oframe.contentWindow.document.body).css("margin-bottom"));
					    if(minHeight && (height<minHeight)){ 
					    	$(oframe).height(minHeight);
					    }else{
							$(oframe).height(height);
					    }
					}catch(e){
						//try{
							//如果报错，可能是跨域了，则进行跨域iframe高度自适应方案，不一定成功，再出错就...
							//_this.adjustIframeHeightCrossDomain(this);
						//}catch(e){}
					}
				});

			}
			
			if(typeof interval=='undefined'){
				inner(frame);
			}else{
				var timer = interval || 1000;
				var flag = false,counter=1;
				if(repeat && this.isInteger(repeat)==true) flag = true;
				var intervalHandler = setInterval(function(){
					if(flag==true){
						if(counter<=repeat){
							inner(frame);
							counter++;
						}else{
							clearInterval(intervalHandler);
						}
					}else{
						inner(frame);
					}
				},timer);
			}
		},
		adjustIframeHeightCrossDomain : function(){
			//not complete
		},
		/*
		 * 表单提交，显示waiting信息
		 * @params msg 可选，默认为   数据保存中，请稍候...
		 * 方法返回该dialog对象，关闭该对话框时使用
		 */
		waitForSubmit : function(msg){
			//创建对象，封装dialog的open方法，并提供简便的关闭方法，便于调用
			function ProcessBar(message){
				var processer = LOAN.dialog.open({
					message: message,
					dialogClass:"from_processdialog",
					modal:true,
					minHeight:53,
					width:200,
					closeOnEscape:false,
					bgiframe:true
				});	
				this.close = function(){
					LOAN.dialog.close(processer);
				};
			}
			msg = msg||"数据保存中，请稍候...";
			msg+='<div class="form_processbar"></div>';
			return new ProcessBar(msg);
		}
	};
	
	if(typeof window.LOAN != "object") window.LOAN = {};
	window.LOAN.util = _util;
})();


/**
 * LOAN.tabs.js
 * 简单的页签库
 * author : 
 */
(function(){
	/*
	 * Tabs Widget
	 * 说明：参数navs和panels分别存放页签头和内容，位置按序列一一对应
	 * 例子：
	   Pa.tabs({
	 		navs : [dom,dom]|$(selector),——必须，数组或者jquery对象列表
	 		panels : [dom,dom]|$(selector),——必须，数组或者jquery对象列表，且数量必须和navs相同
	 		focusClass : "",——可选，选中的页签的样式
	 		blurClass : "",——可选，未选中页签的样式
	 		event : "mouseover",——可选，触发事件
	 		defaultTab : 1,——可选，默认选中第n个页签
	 		callback : function(domobj){}——可选，回调函数，选中页签后调用,会传入选中的页签dom对象
	 		urls : [],——可选，页签内容可从url里获取，与navs数量保持一致，默认ajax会获取panels对象的url属性，如果这里options的urls有值，优先级高
	 		cache : true|false——可选，是否每次重新ajax获取数据
	   })
	 */
	var _tabs = function(opts){
		var defaults = {
			navs : [],
			panels : [],
			focusClass : "",
			blurClass : "",
			event : "mouseover",
			defaultTab : 1,
			callback : function(){},
			urls : [],
			cache : true
		};
		opts = opts || {};
		for(var p in defaults){//参数为空的用默认参数
			if(!(p in opts)) opts[p] = defaults[p];
		}
		//检查参数是否格式正确
		if(opts.navs.length!=opts.panels.length || (opts.urls&&opts.urls.length>0&&opts.urls.length!=opts.navs.length)){
			throw new Error("navs 和 panels或urls长度不一致");
			return;
		}
		if(opts.urls&&opts.urls.length>0){//如果urls有值，将有值的按索引加入对应的panel的url属性
			$(opts.urls).each(function(i,n){
				if(this!="") $(opts.panels[i]).attr("url",n);
			});
		}
		if(opts.defaultTab < 1) opts.defaultTab = 1;
		$(opts.navs).each(function(i,n){
				$(opts.navs[i]).bind(opts.event,function(){//对每个nav绑定事件
					var _this = this;
					$(opts.navs).each(function(j,n){//切换nav的样式
						if(j==i) $(this).removeClass(opts.blurClass).addClass(opts.focusClass);
						else $(this).removeClass(opts.focusClass).addClass(opts.blurClass);
					});
					$(opts.panels).each(function(j,n){//将选中的nav对应的panel显示，其它隐藏
						if(j==i) $(this).show();
						else $(this).hide();
					});
					var url = $(opts.panels[i]).attr("url");
					//如果该选中的panel有url属性，表明内容需要从服务器ajax获取，并且如果属性cache为true，表明已经获取过了，不需要重新获取
					if($(opts.panels[i]).attr("cache")!="true" && url && url!=""){
						$.ajax({
							url : url,
							type : "POST",
							cache : false,
							beforeSend : function(){
								$(opts.panels[i]).html("数据加载中...");
							},
							success : function(data){
								if(opts.cache) $(opts.panels[i]).attr("cache","true");//如果参数cache为true，设置该panel的cache属性为true，之后不会在获取数据
								$(opts.panels[i]).html(data);
								opts.callback(_this);//调用回调函数 								
							},
							error : function(){
								opts.callback(_this);//原回调函数返回值
								opts.callback(_this , i);//新回调函数返回值，当函数只有一个入参时，添加的返回值i是不会旧的使用逻辑的
							}
						});
					}else{
						//opts.callback(_this);//非ajax获取内容时，直接调用回调函数  旧方法
						opts.callback(_this , i);//新方法，新填的返回值 i 不会影响旧的调用。
					}
				});
		});
		$(opts.navs[opts.defaultTab-1]).trigger(opts.event);//tab创建完毕后，选中一个tab
	};
	
	if(typeof window.LOAN!="object") window.LOAN = {};
	window.LOAN.tabs = _tabs;
		
})();

/* 
 * @author 
 * @params elems:传入需要检查的表单元素集合，必须是jquery对象
 * @desc 该对象是用来检查元素值是否有修改，如有改动，则在关闭页面时给出提示
 * 注意，如果在本页使用了该对象，在提交表单保存到后台前，需要调用cancel()方法来取消检查
 * 不然任何的跳转页面都会触发onbeforeunload事件里的检查代码
 * 
 * 该对象有5个方法，分别是bind(),add(elems),remove(elems),cancel(),rebind(),下面例子分别说明
 * 例子：
 * 在需要进行监听的页面创建该监听器对象（放入jquery的ready方法确保dom加载完毕才进行操作）
 * 
 * $(document).ready(function(){
 * 		var formListener = new FormChangedListener($("#productName,#productDesc,.customerAttributeInput"));//参数是juqery对象集合
 * 		formListener.bind();
 * });
 * 
 * 至此完成了简单的监听
 * 提交表单时，需要在submit()之前调用来取消监听，不然依然会弹出提示
 * formListener.cancel();
 * 
 * 该对象还提供了add(elems)方法，方便大家可以在监听器建立后，添加新的需要监听的表单元素:
 * 注意，add之后不需要其它操作，这些元素就是处于被监听状态了
 * formListener.add($("#productCode,#customerName"));
 * 
 * 该对象还提供了remove(elems)方法，方便大家可以在监听器建立后，从监听列表中移除不需要监听的表单元素:
 * formListener.remove($("#productName"));
 * 
 * 该对象还提供rebind方法，该方法可以让你把表单元素按照现在的值作为后面判断是否修改的比较基准。
 * 该方法一般情况下不需要调用
 * formListener.rebind();
 * 
 * 另外的说明：
 * 监听表单元素的值是否修改的基准值是调用bind或者rebind方法时元素的值
 * bind方法只能调用一次且必须调用，rebind可以调用多次，调用rebind前必须保证bind方法已经调用过
 * 
 * @2010-9-15
 * 新增了几个get方法
 * active()：重新开启监听器，cancel的逆操作
 * isCancel()：判断监听器是否失效
 * getBaseLineNum()：获取当前比较基线时共有多少个元素
 * getElements():获取正在监听的元素列表
 * @2010-9-16
 * remove() 方法修改为删除监听列表中的元素，而不是之前让标识失效
 * 同时getElements方法返回值就变成了正在监听的元素列表
 * @2010-9-30
 * isChanged()方法返回当前是否有被修改
 */
function FormChangedListener(elems){
	//私有属性
	var _elements = elems;
	var _cancel = false;
	var _this = this;
	var _inited = false;
	var _initTotalNum = 0;
	//内部私有方法
	function _bind(elems){
		if(!elems) elems = _elements;
		if(!validElements(_elements)) return;
		try{
			_cancel = false;
			$(document).ready(function(){
				$(elems).each(function(){
					if($(this).attr("type").toLowerCase()=="checkbox" || $(this).attr("type").toLowerCase()=="radio"){
						$(this).data("init_value",this.checked);
						$(this).data("need_check",true);
					}else{
						$(this).data("init_value",$(this).val());
						$(this).data("need_check",true);
					}
				});		
			});
		}catch(e){
			//do nothing 出错时，不影响正常业务流程
		}		
	};
	//私有
	function _beforeunload(){
		window.onbeforeunload = function(){
			try{
				var checkResult = _check();
				if(checkResult!==true){
					return checkResult;
				}
			}catch(e){
				//do nothing 出错时，不影响正常业务流程
			}					
		};
	};
	//私有
	function _check(){
		if(_cancel==true) return true;
		var isChanged = false;
		if(_initTotalNum != (_elements.length||0)){
			isChanged=true;
		}else{
			var allElems = $("input,select,textarea");//所有的表单元素
			$(_elements).each(function(){
				if($.inArray(this,allElems)==-1){
					isChanged =true;//如果元素被从dom中删除了，也需要提示
					return false;
				}
				if($(this).data("need_check")==true){
					var _value = $(this).data("init_value");
					if(typeof _value=="undefined" || _value==null) _value="";
					if($(this).attr("type").toLowerCase()=="checkbox" || $(this).attr("type").toLowerCase()=="radio"){
						if(this.checked !=_value) isChanged =true;					
					}else {
						if($(this).val()!=_value) isChanged =true;
					}
				}
				if(isChanged==true) return false;
			});
		}
		if(isChanged==true) return "您修改的内容还没有保存，确认离开吗？";
		else return true;
	}
	function validElements(elems){
		if(elems==null || typeof elems=='undefined') return false;
		if(elems.length && elems.length<=0) return false;
		return true;
	}
	//公有方法
	//bind事件
	this.bind = function(){
		if(_inited==true){
			throw new Error("use rebind,please!");
			return ;
		}
		try{
			_cancel = false;
			$(document).ready(function(){
				_bind();
				_beforeunload();
				_inited = true;
				_initTotalNum = _elements.length || 0;
			});
		}catch(e){
			//do nothing 出错时，不影响正常业务流程
		}
	};
	//添加需要监听的元素
	this.add = function(elems){
		if(!validElements(_elements)) _elements = elems;
		else _elements = _elements.add(elems);
		if(_inited==true){
			_bind(elems);
		}
	};
	this.remove = function(elems){
		if(!validElements(_elements)) return false;
		//从监听元素列表中去掉这些元素
		_elements = _elements.filter(function(){
			if($.inArray(this,elems)!=-1){
				$(this).removeData("need_check");
				_initTotalNum--;//调用remove需要把比较基准的元素数量相应减少
				return false;
			}else{
				return true;
			}
		});
		/*
		$(elems).each(function(){
			$(this).data("need_check",false);
			$(this).removeAttr("formListenerSeq");
		});
		*/
	}
	//取消监听事件
	this.cancel = function(){
		_cancel = true;
	};
	//重新设置比较基准值为当前元素的值
	this.rebind = function(){
		if(_inited==false){
			throw new Error("use bind to init first!");
			return ;
		}
		if(!validElements(_elements)) return;
		var allElems = $("input,select,textarea");
		//rebind时，去掉列表中已经从dom删除的元素
		_elements = _elements.filter(function(){
			if($.inArray(this,allElems)==-1){
				return false;
			}else{
				return true;
			}
		});
		_inited = false;
		this.bind();
	};
	//重新打开监听器
	this.active = function(){
		_cancel = false;
	}
	//开放获取监听列表元素的方法
	this.getElements = function(){
		return _elements;
	};
	//获取监听器是否失效
	this.isCancel = function(){
		return _cancel;
	};
	//获取比较基线的对象数量
	this.getBaseLineNum = function(){
		return _initTotalNum;
	};
	//公开手动检查是否有元素更改的方法
	this.isChanged = function(){
		if(_check()===true) return false;
		else return true;
	}
}


/*
* 如下的js为JSON object提供了两个重要方法，parse和stringify，用于在JSON Object和字符串
* 之间互相转换。
*/
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());