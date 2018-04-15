/**
 * 选择框的锚点
 */
function Anchor(x,y,index,container,mouseDownFun){
	this.x=x;
	this.y=y;
	this.index=index;
	this.container=container;
	this.mouseDownFun=mouseDownFun;
	this.selected=false;
	this.jqAnchor=null;
	this.anchorWD=3;//向外的大小
	this.cursor="nw-resize";
	this.editWin=null;
}
Anchor.prototype={
	constructor:Anchor,
	create:function(){
		var that=this;
		that.jqAnchor=$('<div class="anchor" style="left:-3px;top:-3px;"></div>');
		that.container.append(that.jqAnchor);
		var index=that.index%4;
		switch(index)
		{
			case 0:
				that.cursor="nw-resize";
			  break;
			case 1:
				that.cursor="n-resize";
			  break;
			case 2:
				that.cursor="ne-resize";
			  break;
			case 3:
				that.cursor="e-resize";
			  break;
		}
		that.jqAnchor.css("cursor",that.cursor);
		that.addEvent();
		return that;
	},
	addEvent:function(){
		var that=this;
		this.jqAnchor.bind("mousedown",function(ev){
			ev.stopPropagation();
			if(that.mouseDownFun){
				that.mouseDownFun(that,ev.pageX,ev.pageY);
			}
		});
		return that;
	},
	active:function(){//激活
		
	},
	move:function(w,h){
		var that=this;
		var wCenter=parseInt(w/2)-that.anchorWD;
		
		var hCenter=(parseInt(h/2))-that.anchorWD;
		var right=(w-that.anchorWD);
		var bottom=(h-that.anchorWD);
		switch(that.index)
		{
			case 1:
				that.jqAnchor.css("left",wCenter+"px");
			  break;
			case 2:
				that.jqAnchor.css("left",right+"px");
			  break;
			case 3:
				that.jqAnchor.css("left",right+"px");
				that.jqAnchor.css("top",hCenter+"px");
			  break;
			case 4:
				that.jqAnchor.css("left",right+"px");
				that.jqAnchor.css("top",bottom+"px");
			  break;
			case 5:
				that.jqAnchor.css("left",wCenter+"px");
				that.jqAnchor.css("top",bottom+"px");
			  break;
			case 6:
				that.jqAnchor.css("top",bottom+"px");
			  break;
			case 7:
				that.jqAnchor.css("top",hCenter+"px");
			  break;
			}
	},
	hide:function(){
		var that=this;
		that.jqAnchor.hide();
	},
	clear:function(){
		this.jqAnchor.unbind();
	},
	show:function(){
		var that=this;
		that.jqAnchor.show();
	},
	reDrewPosition:function(){//重绘位置
		
	}
}



/**
 * 选择区域对像
 */
function SelectArea(imageToolObj,x,y,container,index,selectedFun,mouseDownFun){
	this.imageToolObj=imageToolObj;
	this.x=x;
	this.y=y;
	this.container=container;
	this.index=index;
	this.selectedFun=selectedFun;
	this.mouseDownFun=mouseDownFun;//用于鼠标按下时回调的方法。因为move只能放到父的div中
	this.anchors=[];
	this.divName="Area"+(new Date()).getTime()+Math.round((Math.random()*100));
	this.tipName="tip"+this.divName;
	this.tipObj=null;
	this.selected=false;
	this.selectedIndex=0;
	this.jqObj=null;
	this.evX=0;
	this.evY=0;
	this.editWinIframe=null;//所关联的编缉主窗口
	this.editWin=null;//所关联的编缉区域的窗口
}

SelectArea.prototype={
		constructor:SelectArea,
		create:function(){
			var that=this;
			that.jqObj=(function(){
				return $('<div class="selectArea" style="left:'+that.x+'px;top:'+that.y+'px;width:0px;height:0px;"><em class="tipName" id="'+that.tipName+'"></em></div>');
			})();
			for(var i=0;i<8;i++){
				var anchor=new Anchor(that.x,that.y,i,that.jqObj,function(anchor,evX,evY){
					that.expansion(anchor.index);
					if(that.mouseDownFun){
						that.mouseDownFun(that,anchor,evX,evY);
					}
				});
				that.anchors.push(anchor.create());
			}
			that.container.append(that.jqObj[0]);
			that.tipObj=$("#"+that.tipName);
			that.setSelected();
			that.addEvent();
			//that.setSelected();
			return that;
		},
		getEditDatas:function(){
			var that=this;
			var editDatas=[];
			var lsW=that.jqObj.width();
			var lsH=that.jqObj.height();
			editDatas.push({"code":"width","name":"宽","value":lsW,"unit":"px","editFun":function(val){
				lsW=val;
				that.jqObj.css("width",lsW+"px");
				that.reDrewAnchorAll(lsW, lsH,true)
			}});
			editDatas.push({"code":"height","name":"高","value":that.jqObj.height(),"unit":"px","editFun":function(val){
				lsH=val;
				that.jqObj.css("height",lsH+"px");
				that.reDrewAnchorAll(lsW, lsH,true);
			}});
			editDatas.push({"code":"left","name":"左","value":that.jqObj.position().left,"unit":"px","editFun":function(val){
				that.jqObj.css("left",val+"px");
			}});
			editDatas.push({"code":"top","name":"上","value":that.jqObj.position().top,"unit":"px","editFun":function(val){
				that.jqObj.css("top",val+"px");
			}});
			return editDatas;
		},
		getCreateDatas:function(){
			var that=this;
			var editDatas=that.imageToolObj.extendEdits||[];
			var datas=that.getEditDatas();
			datas.push({"code":"code","name":"编号","value":""});
			return editDatas.concat(datas);
		},
		getHtmlObj:function(){
			var that=this;
			return that.jqObj;
		},
		addEvent:function(){
			var that=this;
			this.jqObj.bind("mousedown",function(ev){
				that.evX=ev.pageX;
				that.evY=ev.pageY;
				ev.stopPropagation();
				if(that.selectedFun){
					that.selectedFun(that);
				}else{
					that.setSelected();
				}
			});
			return that;
		},
		zoom:function(){
			
		},
		rounte:function(){
			
		},
		expansion:function(selectedIndex){//通过选中的索引来确认往哪个方向变动
			this.selectedIndex=selectedIndex;
		},
		reDrewAnchor:function(offsetX,offsetY,srcW,srcH,srcLeft,srcTop){
			var that=this;
			//console.log(lox+"***********************"+loy);
			var newW=srcW;
			var newH=srcH;
			switch(that.selectedIndex)
			{
				case 0:
					newW=(srcW-offsetX);
					newH=(srcH-offsetY);
					that.jqObj.css("height",newH+"px");
					that.jqObj.css("width",newW+"px");
					that.jqObj.css("left",(srcLeft+offsetX)+"px");
					that.jqObj.css("top",(srcTop+offsetY)+"px");
					break;	
				case 1:
					newH=(srcH-offsetY);
					that.jqObj.css("height",newH+"px");
					that.jqObj.css("top",(srcTop+offsetY)+"px");
					break;
				case 2:
					newW=(srcW+offsetX);
					newH=(srcH-offsetY);
					that.jqObj.css("height",newH+"px");
					that.jqObj.css("width",newW+"px");
					that.jqObj.css("top",(srcTop+offsetY)+"px");
					break;
				case 3:
					newW=(srcW+offsetX);
					that.jqObj.css("width",newW+"px");
					break;
				case 4:
					newW=(srcW+offsetX);
					newH=(srcH+offsetY);
					that.jqObj.css("height",newH+"px");
					that.jqObj.css("width",newW+"px");
					break;
				case 5:
					newH=(srcH+offsetY);
					that.jqObj.css("height",newH+"px");
					break;
				case 6:
					newW=(srcW-offsetX);
					newH=(srcH+offsetY);
					that.jqObj.css("height",newH+"px");
					that.jqObj.css("width",newW+"px");
					that.jqObj.css("left",(srcLeft+offsetX)+"px");
					break;
				case 7:
					newW=(srcW-offsetX);
					that.jqObj.css("width",newW+"px");
					that.jqObj.css("left",(srcLeft+offsetX)+"px");
					break;
				}
				that.reDrewAnchorAll(newW, newH);
		},
		/**
		 * 重绘所有锚点位置
		 * @param lsW
		 * @param lsH
		 */
		reDrewAnchorAll:function(lsW,lsH,isNotChangeEdit){
			var that=this;
			that.tipObj.html(lsW+"&nbsp;X&nbsp;"+lsH);
			if(!isNotChangeEdit){
				that.editWin.changeEditsValue(that.getEditDatas());
			}
			for(var i=0;i<that.anchors.length;i++){
				that.anchors[i].move(lsW,lsH);
			}
		},
		/**
		 * 新建对像是绘制方法
		 * @param startX
		 * @param startY
		 * @param newX
		 * @param newY
		 */
		newDrewObj:function(startX,startY,newX,newY){//新建时绘制选择框
			var that=this;
			var width=newX-startX;
			var height=newY-startY;
			var lsW=width;
			var lsH=height;
			if(width<0){
				lsW=0-width;
				var left=startX-lsW;
				that.jqObj.css("left",left+"px");
			}
			if(height<0){
				lsH=0-height;
				var top=startY-lsH;
				that.jqObj.css("top",top+"px");
			}
			that.jqObj.width(lsW);
			that.jqObj.height(lsH);
			that.reDrewAnchorAll(lsW, lsH);
		},
		/**
		 * 用于鼠标移动对像
		 * @param offsetX
		 * @param offsetY
		 * @param srcLeft
		 * @param srcTop
		 */
		mouseMoveDrew:function(offsetX,offsetY,srcLeft,srcTop){
			var that=this;
			var left=(srcLeft+(offsetX-that.evX));
			var top=(srcTop+(offsetY-that.evY));
			that.jqObj.css("left",left+"px");
			that.jqObj.css("top",top+"px");
			that.editWin.changeEditsValue([{"code":"left","value":left},{"code":"top","value":top}]);
		},
		/**
		 * 用于键盘左右键移动
		 * @param left
		 * @param top
		 * @param right
		 * @param bottom
		 */
		keyMoveDrew:function(left,top,right,bottom){
			var that=this;
			var l=that.jqObj.position().left;
			var t=that.jqObj.position().top;
			if(left>0){
				that.jqObj.css("left",(l-left)+"px");
			}
			if(top>0){
				that.jqObj.css("top",(t-top)+"px");
			}
			if(right>0){
				that.jqObj.css("left",(l+right)+"px");
			}
			if(bottom>0){
				that.jqObj.css("top",(t+bottom)+"px");
			}
			that.editWin.changeEditsValue(that.getEditDatas());
		},
		/**
		 * 设置对像选中
		 */
		setSelected:function(){//设置对像选中
			var that=this;
			this.selected=true;
			for(var i=0;i<that.anchors.length;i++){
				that.anchors[i].show();
			}
			that.tipObj.show();
			that.jqObj.addClass("selectAreaSelected");
			if(that.editWin){
				that.editWin.setSelected();
			}
		},
		/**
		 * 判断当前对像是否在指定区域
		 * @param startX
		 * @param startY
		 * @param endX
		 * @param endY
		 */
		isRange:function(startX,startY,endX,endY){
			if(startX>endX){
				var a=startX;
				startX=endX;
				endX=a;
			}
			if(startY>endY){
				var b=startY;
				startY=endY;
				endY=b;
			}
			var that=this;
			var x=that.jqObj.position().left;
			var y=that.jqObj.position().top;
			var eX=x+that.jqObj.width();
			var eY=y+that.jqObj.height();
			var points=[[x,y],[eX,y],[eX,eY],[x,eY]];
			for(var i=0;i<points.length;i++){
				var p=points[i];
				if((p[0]>startX&&p[0]<endX)&&(p[1]>startY&&p[1]<endY)){
					that.setSelected();
				}else{
					that.cancelSelected();
				}
			}
		},
		/**
		 * 用于清除对像
		 */
		clear:function(){
			var that=this;
			for(var i=0;i<that.anchors.length;i++){
				that.anchors[i].clear();
				that.anchors.splice(i, 1);
				i--;
			}
			that.jqObj.unbind();
			that.jqObj.remove();
			if(that.editWin){
				that.editWinIframe.clearEditWin(that);
			}
		},
		getSelectedStatus:function(){
			return this.selected;
		},
		/**
		 * 取消对像选择
		 */
		cancelSelected:function(){//取消对像选中
			var that=this;
			this.selected=false;
			for(var i=0;i<that.anchors.length;i++){
				that.anchors[i].hide();
			}
			that.jqObj.removeClass("selectAreaSelected");
			that.tipObj.hide();
			if(that.editWin){
				that.editWin.cancelSelected();
			}
		}
		
}




/**
 * 选择区域对像
 */
function BlockArea(x,y,w,h,container,proportion){
	this.proportion=proportion;
	this.x=x*this.proportion;
	this.y=y*this.proportion;
	this.w=w*this.proportion;
	this.h=h*this.proportion;
	this.container=container;
	this.divName="Area"+(new Date()).getTime()+Math.round((Math.random()*100));
	this.tipName="tip"+this.divName;
	this.tipObj=null;
	 
}
BlockArea.prototype={
		constructor:BlockArea,
		create:function(){
			var that=this;
			that.jqObj=(function(){
				return $('<div class="blockArea" style="left:'+that.x+'px;top:'+that.y+'px;width:'+that.w+'px;height:'+that.h+'px;"><em class="tipName" id="'+that.tipName+'"></em></div>');
			})();
			that.container.append(that.jqObj[0]);
			that.tipObj=$("#"+that.tipName);
			//that.setSelected();
			//that.addEvent();
			//that.setSelected();
			return that;
		},
		zoom:function(times){
			var that=this;
			var srcW=that.jqObj.width();
			var srcH=that.jqObj.height();
			that.jqObj.css("width",parseInt(srcW*times)+"px");
			that.jqObj.css("height",parseInt(srcH*times)+"px");
			
			var srcL=that.jqObj.position().left;
			var srcT=that.jqObj.position().top;
			
			that.jqObj.css("left",parseInt(srcL*times)+"px");
			that.jqObj.css("top",parseInt(srcT*times)+"px");
		},
		rounte:function(){
			
		},
		/**
		 * 用于鼠标移动对像
		 * @param offsetX
		 * @param offsetY
		 * @param srcLeft
		 * @param srcTop
		 */
		mouseMoveDrew:function(offsetX,offsetY,srcLeft,srcTop){
			var that=this;
			
			var srcL=that.jqObj.position().left;
			var srcT=that.jqObj.position().top;
			
			var left=(srcLeft+(offsetX-that.evX));
			var top=(srcTop+(offsetY-that.evY));
			that.jqObj.css("left",left+"px");
			that.jqObj.css("top",top+"px");
		},
		/**
		 * 用于键盘左右键移动
		 * @param left
		 * @param top
		 * @param right
		 * @param bottom
		 */
		keyMoveDrew:function(left,top,right,bottom){
			var that=this;
			var l=that.jqObj.position().left;
			var t=that.jqObj.position().top;
			if(left>0){
				that.jqObj.css("left",(l-left)+"px");
			}
			if(top>0){
				that.jqObj.css("top",(t-top)+"px");
			}
			if(right>0){
				that.jqObj.css("left",(l+right)+"px");
			}
			if(bottom>0){
				that.jqObj.css("top",(t+bottom)+"px");
			}
		},
		/**
		 * 用于清除对像
		 */
		clear:function(){
			var that=this;
			that.jqObj.unbind();
			that.jqObj.remove();
		}
}



/**
 * 鼠标拉动时区域块。用于将一个个定义的块进行选中
 */

function SelectedLine(startX,startY,container,areaList){
	this.startX=startX;
	this.startY=startY;
	this.container=container;
	this.areaList=areaList;
	this.jqObj=null;
}

SelectedLine.prototype={
		constructor:SelectedLine,
		create:function(){
			var that=this;
			that.jqObj= $('<div class="SelectedLine" style="left:'+that.startX+'px;top:'+that.startY+'px;width:0px;height:0px;"></div>');
			that.container.append(that.jqObj[0]);
		},
		mouseMove:function(newX,newY){
			var that=this;
			var w=newX-that.startX;
			var h=newY-that.startY;
			if(w<0){
				that.jqObj.css("left",newX+"px");
				w=-w;
			}
			if(h<0){
				that.jqObj.css("top",newY+"px");
				h=-h;
			}
			that.jqObj.css("width",w+"px");
			that.jqObj.css("height",h+"px");
			if(that.areaList){
				for(var i=0;i<that.areaList.length;i++){
					var area=that.areaList[i];
					area.isRange(that.startX,that.startY,newX,newY);
				}
			}
		},
		mouseUp:function(){
			var that=this;
			that.jqObj.remove();
		}
}



/**
 * 编辑窗口中的输入框
 */
function EditInput(tableStrArray,inputObj){
	this.tableStrArray=tableStrArray;
	this.inputObj=inputObj;
	this.jqObj=null;
	this.jqMap={};
	this.editName=(new Date()).getTime()+Math.round((Math.random()*10000));
	this.editNameParent=this.editName+"_";
	this.code=this.inputObj["code"];
	
}
EditInput.prototype={
		constructor:EditInput,
		create:function(){
			var that=this;
			var value=that.inputObj["value"]?that.inputObj["value"]:"";
			
			var getEditObj={"input":function(){
					return $('<input  code="'+that.inputObj["code"]+'" id="'+that.editName+'" value="'+value+'">');
				},
				"select":function(){
					var selectStr=['<select code="'+that.inputObj["code"]+'" id="'+that.editName+'" >'];
					if(value){
						for(var i=0;i<value.length;i++ ){
							v=value[i];
							selectStr.push('<option value='+v.value+'>'+v.text+'</option>');
						}
					}
					selectStr.push('</select>');
					return $(selectStr.join(""));
				}
			}
			var type=that.inputObj["type"]||"input";
			that.jqObj=getEditObj[type]();
			
			
			var trObj=$('<tr><th>'+that.inputObj["name"]+'：</th><td><span id="'+that.editNameParent+'"></span>'+(that.inputObj["unit"]||"&nbsp;")+'</td></tr>');
			var callEditFun=function(){
				var editFun=that.inputObj["editFun"];
				if(editFun){
					editFun(that.jqObj.val());
				}
			}
			that.jqObj.bind("blur",function(ev){
				callEditFun();
			}).bind("keyup",function(ev){
				if(ev.keyCode===13){
					callEditFun();
				}
			});
			trObj.find("span[id='"+that.editNameParent+"']").append(that.jqObj[0]);
			that.tableStrArray.append(trObj[0]);
//			that.jqMap[that.inputObj["code"]]=;
			return that;
		},
		changeValue:function(inputObj){
			var that=this;
			that.inputObj=inputObj;
			that.jqObj.val(inputObj["value"]);
		},
		fillValue:function(fillObj){
			var that=this;
			fillObj[that.inputObj["code"]]=that.jqObj.val();
		}
}

/**
 * 选区的编辑框窗口对像
 */
function EditWin(container,selectAreaList){
	this.jqObj=null;
	this.container=container;
	this.selectAreaList=selectAreaList;
	this.selectArea=null;
	this.jqLiContent=null;
	this.jqTitle=null;
	this.editInputMap={};
}

EditWin.prototype={
	constructor:EditWin,
	create:function(selectArea){
		var that=this;
		that.selectArea=selectArea;
		var tableStr=$('<table></table>');
		var editDatas=that.selectArea.getCreateDatas();
		for(var i=0;i<editDatas.length;i++){
			var editInput=new EditInput(tableStr,editDatas[i]).create();
			that.editInputMap[editInput["code"]]=editInput;
		}
		tableStr.push('</table>');
		that.jqTitle=$('<div class="areaBlackTitle">选项'+selectArea.index+'</div>');
		that.jqLiContent=$('<div class="areaBlackContent"></div>');
		that.jqLiContent.append(tableStr[0])
		that.jqObj=$('<li></li>');
		
		that.jqObj.append(that.jqTitle[0]);
		that.jqObj.append(that.jqLiContent[0]);
		that.container.append(that.jqObj[0]);
		selectArea["editWin"]=that;
		that.jqTitle.unbind().bind("click",function(ev){
			ev.stopPropagation();
			for(var i=0;i<that.selectAreaList.length;i++){
				var sal=that.selectAreaList[i];
				if(sal===that.selectArea){
					sal.setSelected();
				}else{
					sal.cancelSelected();
				}
			}
		});
		return that;
	},
	changeEditsValue:function(editObjs){
		debugger;
		var that=this;
		for(var i=0;i<editObjs.length;i++){
			var editObj=editObjs[i];
			that.editInputMap[editObj["code"]].changeValue(editObj);
		}
	},
	setSelected:function(){//通过引入的selectArea对像来进行同步调用
		var that=this;
		that.jqObj.addClass("winSelected");
		that.jqLiContent.show();
	},
	cancelSelected:function(){
		var that=this;
		that.jqObj.removeClass("winSelected");
		that.jqLiContent.hide();
	},
	clear:function(){
		var that=this;
		that.jqObj.remove();
	},
	getEditJson:function(){
		var that=this;
		var editObj={};
		for(var obj in that.editInputMap){
			that.editInputMap[obj].fillValue(editObj);
		}
//		alert(jyTools.parseJson2String(editObj));
		return editObj;
	}
	
}

/**
 * 工具栏窗口
 */

function EditWinIframe(container,selectAreaList){
	this.jqObj=null;
	this.container=container;
	this.selectAreaList=selectAreaList;
	this.winMouseBit=false;
	this.liObjList=[];
	this.ulObj=null;
	this.left=0;
	this.top=0;
	this.srcX=0;
	this.srcY=0;
}
EditWinIframe.prototype={
		constructor:EditWinIframe,
		create:function(){
			var that=this;
			that.jqObj= $('<div class="editWinIframe"><div class="winTitle">工具栏</div><div class="winContent"><ul></ul></div></div>');
			that.container.append(that.jqObj[0]);
			that.ulObj=$(that.jqObj.find("ul")[0]);
			that.jqObj.unbind().bind("mousedown",function(ev){
				var obj=ev.srcElement||ev.target;
				if($(obj).hasClass("winTitle")){
					that.winMouseBit=true;
					that.left=parseInt(that.jqObj.css("left"));
					that.top=parseInt(that.jqObj.css("top"));
					that.srcX=ev.pageX;
					that.srcY=ev.pageY;
				}
				ev.stopPropagation();
			}).bind("mousemove",function(ev){
				//ev.stopPropagation();
			}).bind("mouseup",function(ev){
				var obj=ev.srcElement||ev.target;
				if($(obj).hasClass("winTitle")){
					that.winMouseBit=false;
				}
				ev.stopPropagation();
			}).bind("click",function(ev){
//				alert(111);
//				debugger;
//				for(var i=0;i<that.liObjList.length;i++){
//					that.liObjList[i].getEditJson();
//				}
				ev.stopPropagation();
			});
		},
		getEditObjs:function(){
			var editWinObjs=[];
			for(var i=0;i<that.liObjList.length;i++){
				editWinObjs.push(that.liObjList[i].getEditJson());
			}
			return editWinObjs;
		},
		
		addSelectBlack:function(selectArea){
			var that=this;
			var editWin=new EditWin(that.ulObj,that.selectAreaList);
			selectArea["editWinIframe"]=that;
			that.liObjList.push(editWin.create(selectArea));
		},
		setSelected:function(){
			var that=this;
			that.jqObj.addClass("winSelected");
		},
		cancelSelected:function(){
			var that=this;
			that.jqObj.removeClass("winSelected");
		},
		clearEditWin:function(selectArea){
			var that=this;
			for(var i=0;i<that.selectAreaList.length;i++){
				if(that.selectAreaList[i]===selectArea){
					var editWin=selectArea["editWin"];
					editWin.clear();
					editWin=undefined;
					that.selectAreaList.splice(i,1);
				}
			}
		},
		moveWin:function(newX,newY){
			var that=this;
			that.jqObj.css("left",that.left+(newX-that.srcX)+"px");
			that.jqObj.css("top",that.top+(newY-that.srcY)+"px");
		}
		
}






/**
 * 文字标签
 */

function EditTextLabel(container,labels){
	this.jqObj=null;
	this.container=container;
	this.labels=labels;
	//this.init();
}
EditTextLabel.prototype={
		constructor:EditTextLabel,
		create:function(){
			var that=this;
			that.jqObj= $('<ul class="labelText"></ul>');
			var liHtml=[];
			for(var i=0;i<that.labels.length;i++){
				liHtml.push('<li>'+that.labels[i]+'</li>')
			}
			that.jqObj.html(liHtml.join(""));
			that.container.append(that.jqObj);
		},
		getEditObjs:function(){
			var editWinObjs=[];
			for(var i=0;i<that.liObjList.length;i++){
				editWinObjs.push(that.liObjList[i].getEditJson());
			}
			return editWinObjs;
		},
}




















/**
 * 图像查看器主体模块
 */
function ImageTool(imgStructure,imgName,container) {
	this.imgStructure=imgStructure;
	this.imgName=imgName;
	this.imgPanel=imgName+"panel";
	this.toolPanel=imgName+"toolbar";
	this.modelPanel=imgName+"model";
	this.bigImgPanel=imgName+"big";
	this.bigImg=imgName+"img";
	this.bigImgShadow=imgName+"img_Shadow";//大图像的影子
	this.bigPdf=imgName+"pdf";
	this.bigMp3=imgName+"mp3";
	this.bigPdfIframe=imgName+"pdfIframe";
	this.bigMp3Video=imgName+"mp3Video";
	this.preBtn=imgName+"pre";
	this.nextBtn=imgName+"next";
	this.prePageBtn=imgName+"pagePre";
	this.nextPageBtn=imgName+"pageNext";
	this.magnifierMask=imgName+"mm";//放大镜功能的遮罩
	this.selectAreaName=imgName+"areaName";//选择区域名称
	this.magnifierImg=imgName+"mImg";//放大镜的imgdiv;
	this.scaleName=imgName+"scale";
	this.pageIndexName=imgName+"pageIndexName";
	this.downLoadName=imgName+"downLoad";
	this.magnifierMoveImg=imgName+"moveImg";//移动时内部填充的图片
	this.groupImgList=imgName+"groupImgList";
	
	this.treeName=imgName+"tree";
	this.pptPanel=imgName+"ppt";
	this.pptTool=imgName+"pptTool";
	this.turnAngleValue=(null!=jyTools.getLocal("angle")&&undefined!=jyTools.getLocal("angle"))?Number(jyTools.getLocal("angle")):0;
	this.container=container||$("body")[0];
	this.groupImgs={};
	this.noGroupImgs=[];
	this.treeData=[];
	this.selectedIndex=0;
	//this.minImgExt="_200X200";//只是针对于信贷系统的缩略图设定的。
	this.minImgExt="";//只是针对于信贷系统的缩略图设定的。
	this.pageIndex=0;
	this.objH="100%";
	this.pptToolH=80;
	this.lockTool=false;
	this.magnifierBit=false;
	this.srcToolbarBtn=null;
	this.srcBigImgW=0;
	this.imageType=["JPG","JPEG","GIF","PNG","BMP","TIFF"];//图像文件格式
	this.noTypeUrl="icon/no.png";
	//其它文件格式类型文件的缩略图
	this.icoUrls={"PDF":"icon/icon_pdf.png","XLS":"icon/excel.png","XLSX":"icon/excel.png","DOCX":"icon/word.png","DOC":"icon/word.png","MP3":"icon/audio.png","WMA":"icon/audio.png","WAV":"icon/audio.png","AVI":"icon/video.png","3GP":"icon/video.png","MP4":"icon/video.png","RM":"icon/video.png","RMVB":"icon/video.png"};
	this.srcBigImgH=0;
	this.tree=null;
	this.basePath=""
	
	this.selectAreaList=[];//用于存放所有的编辑选区块
	
	this.blockAreas=[];//用于存放展示的一个区域块。主要在随单录入时能很好的展示选中的框。
	
	this.init();
}
ImageTool.prototype = {
	constructor:ImageTool,
	init:function(){
		var that=this;
		this.imgList=this.imgStructure.imgList;
		this.originalSize=this.imgStructure.originalSize;
		this.pdfUrl=this.imgStructure.pdfUrl;//pdf图标的url，当展示以pdf形式展示时。pdf文件小图标所展示的数据
		if(this.pdfUrl){
			this.icoUrls["PDF"]=this.pdfUrl;
		}
		
		this.minImgW=this.imgStructure.minImgW||100;
		this.minImgH=this.imgStructure.minImgH||100;
		this.extendEdits=[{"code":"test","name":"测试"},{"code":"teseeet","name":"测试","type":"select","value":[{"text":"测试1","value":"01"},{"text":"测试3","value":"003"},{"text":"测试3","value":"004"}]}];
//		this.extendEdits=this.imgStructure.extendEdits;
		
		this.pageSize=this.imgStructure.pageSize||5;
		this.times=this.imgStructure.times||1.2;
		this.treeW=this.imgStructure.treeWidth||150;
		this.basePath=this.imgStructure.basePath;
		this.moveDouble=2;
		this.hideToolbar=this.imgStructure.hideToolbar;
		this.objH=$(this.container).height();
		var createTreeData=function(imgObj,index){
				return {"ID":imgObj.id,"PID":imgObj.groupId,"NAME":imgObj.name,"URL":imgObj.url,"selectedIndex":index};
		}
		if(this.imgList){
			for(var i=0;i<this.imgList.length;i++){
				var imgObj=this.imgList[i];
//				imgObj.selectArea=[{"x":100,"y":100,"width":200,"height":100},{"x":300,"y":300,"width":300,"height":400}];//测试用
				if(typeof(imgObj)=="object"){
					if(undefined!=imgObj.groupId){
						var key=imgObj.groupId+"-"+imgObj.groupName;
						if(that.groupImgs[key]){
							that.groupImgs[key].push(imgObj);
						}else{
							this.groupImgs[key]=[imgObj];
							this.treeData.push(createTreeData({"id":imgObj.groupId,"name":imgObj.groupName},null));
						}
						this.treeData.push(createTreeData(imgObj,i));
					}else{
						that.noGroupImgs.push(imgObj.url);
						this.treeData.push(createTreeData(imgObj,i));
					}
				}else{
					that.noGroupImgs.push(imgObj.url);
					this.treeData.push(createTreeData(imgObj,i));
				}
			}
		}
	},
	getCssPostion:function(p){
		if(p){
			if(p=="auto"){
				p=0;
			}else{
				p=Number(p.replace("px",""));
			}
		}else{
			p=0;
		}
		return p;
	},
	zoom:function(times){
		//alert(times);
		var that=this;
		var img=$("#"+that.bigImg);
		var imgShadow=$("#"+that.bigImgShadow);
		var parent=img.parent();
		var pw=parent.width();
		var ph=parent.height();
		var w=img.width();
		var h=img.height();
		var py=(1-times)/2;
		var newW=w*times;
		var newH=h*times;
		img.css("width",newW+"px");
		imgShadow.css("width",newW+"px");
		img.css("height",newH+"px");
		imgShadow.css("height",newH+"px");
		var l=that.getCssPostion(img.css("left"));
		var t=that.getCssPostion(img.css("top"));
		img.css("left",((w-newW)/2+l)+"px");
		img.css("top",((h-newH)/2+t)+"px");
		
		imgShadow.css("left",((w-newW)/2+l)+"px");
		imgShadow.css("top",((h-newH)/2+t)+"px");
		
		img[0].style.maxWidth="";
		img[0].style.maxHeight="";
		that.setScaleValue();
		
		for(var i=0;i<that.blockAreas.length;i++){
			var blockArea=that.blockAreas[i];
			blockArea.zoom(times);
		}
	},
	zoomMax:function(){
		var that=this;
		that.zoom(that.times);
	},
	zoomMin:function(){
		var that=this;
		that.zoom(1/that.times);
	},
	rotateFun:function(ds,scale){
		var that=this;
		var angle=0;
		if(ds&&ds.length){
			for(var i=0;i<ds.length;i++){
				angle=that.fnRotateScale(ds[i],scale);
			}
			
		}
	},
	toolBarFun:function(){
		var that=this;
		$("#"+that.selectAreaName).hide();
		that.magnifierBit=false;
		return {
			"zoomMax":function(){
				that.zoomMax(that.times);
			},
			"zoomMin":function(){
				that.zoomMin(1/that.times);
			},
			"leftRounte":function(){
				var img=$("#"+that.bigImg);
				var imgShadow=$("#"+that.bigImgShadow);
				that.turnAngleValue-=90;
				that.rotateFun([img[0],imgShadow[0]],0);
			},
			"rightRounte":function(){
				var img=$("#"+that.bigImg);
				var imgShadow=$("#"+that.bigImgShadow);
				that.turnAngleValue+=90;
				that.rotateFun([img[0],imgShadow[0]],0);
			},
			"original":function(){
				var img=$("#"+that.bigImg);
				var imgShadow=$("#"+that.bigImgShadow);
				that.turnAngleValue=0;
				//that.fnRotateScale(imgShadow[0],-90,0);
				var w=$("#"+that.bigImg).width();
				var srcTimes=that.srcBigImgW/w;
				that.zoom(srcTimes);
			},
			"fullScreen":function(){
				
			},
			"selectedBlack":function(){
				 that.createSelectedBlack();
			},
			"magnifier":function(){//放大镜
				that.createMagnifier(true);
			},
			"lock":function(endObj){
				var c=endObj.attr("class");
				if(c.indexOf("unLock")>-1){
					that.lockTool=false;
		    		endObj.addClass("lock").removeClass("unLock");
	    		}else{
	    			that.lockTool=true;
	    			endObj.addClass("unLock").removeClass("lock");
	    		}
			},
			"clear":function(){
				that.magnifierBit=false;
				$("#"+that.selectAreaName).hide();
			}
		}
		//that.createMagnifier(true);
	},
	eachAreas:function(fun){
		for(var i=0;i<that.selectAreaList.length;i++){
			var selectObj=that.selectAreaList[i];
			if(fun){
				fun(selectObj);
			}
		}
	},
	createSelectedBlack:function(){
		var that=this;
		var mouseBit=false;//鼠标按下状态
		var downObjBit=0;//点击对像(0==父对像，1==选择框，2==锚点对像)
		var ctrlBit=false;
		var selectArea=null;
		var selectAreaDiv=$("#"+that.selectAreaName);
		var selectedLine=null;
		var editWinIframe=null;
		var selectAreaIndex=0;
		if(!selectAreaDiv.length){
			var selectAreaObj=$('<div class="magnifierMask" id="'+that.selectAreaName+'"></div>');
			$("#"+that.bigImgPanel).append(selectAreaObj[0]);
			var startX=0;
			var startY=0;
			var evX=0;
			var evY=0;
			var srcLeft=0;
			var srcTop=0;
			var srcW=0;
			var srcH=0;
			selectAreaObj.attr("tabindex",1);
			selectAreaObj[0].focus();
			editWinIframe=new EditWinIframe(selectAreaObj,that.selectAreaList);
			editWinIframe.create();
			var keyMove=function(l,t,r,b){
				that.eachAreas(function(selectObj){
					if(selectObj.getSelectedStatus()){
						selectObj.keyMoveDrew(l,t,r,b);
					}
				});
			}
			selectAreaObj.unbind().bind("keydown",function(ev){
				var moveValue=1;
				if(ev.ctrlKey){
					moveValue=10;
				}
				switch(ev.keyCode){
					case 17:
						ctrlBit=true;
						break;
					case 46:
						debugger;
						that.eachAreas(function(selectObj){
							if(selectObj.getSelectedStatus()){
								selectObj.clear();
							}
						});
						break;
					case 37:
						keyMove(moveValue,0,0,0);
						break;
					case 38:
						keyMove(0,moveValue,0,0);
						break;
					case 39:
						keyMove(0,0,moveValue,0);
						break;
					case 40:
						keyMove(0,0,0,moveValue);
						break;
				}
			}).bind("keyup",function(ev){
				ctrlBit=false;
			}).bind("mouseup",function(ev){
				mouseBit=false;
				selectAreaObj.css("cursor","");
				if(selectedLine){
					selectedLine.mouseUp();
					selectedLine=null;
				}
				if(editWinIframe){
					editWinIframe.winMouseBit=false;
				}
			}).bind("mousedown",function(ev){
				var obj=ev.srcElement||ev.target;
				var endObj=$(obj);
				evY=ev.pageY;
				evX=ev.pageX;
				startY=evY - selectAreaObj.offset().top;
				startX=evX - selectAreaObj.offset().left;
				if(!(endObj.hasClass("selectArea")||endObj.hasClass("anchor"))){
					mouseBit=true;
					if(ctrlBit){
						downObjBit=0;
						selectAreaIndex++;
						selectArea=(new SelectArea(that,startX,startY,$(this),selectAreaIndex,
								function(ownSelectArea){
									selectArea=ownSelectArea;
									mouseBit=true;
									downObjBit=3;//用来移动选区div位置
									selectAreaObj.css("cursor","pointer");
									var areaHtmlObj=selectArea.getHtmlObj();
									srcTop=areaHtmlObj.position().top;
									srcLeft=areaHtmlObj.position().left;
									if(ctrlBit){
										if(selectArea.getSelectedStatus()){
											selectArea.cancelSelected();
										}else{
											selectArea.setSelected();
										}
									}else{
										for(var i=0;i<that.selectAreaList.length;i++){
											var selectObj=that.selectAreaList[i];
											if(selectObj!==ownSelectArea){
												selectObj.cancelSelected();
											}else{
												selectObj.setSelected();
											}
										}
									}
								},function(selectAreaJQobj,anchor,subEvX,subEvY){
									mouseBit=true;
									downObjBit=2;//用来调整div大小
									evX=subEvX;
									evY=subEvY;
									selectAreaObj.css("cursor",anchor.cursor);
									selectArea=selectAreaJQobj;
									var areaHtmlObj=selectArea.getHtmlObj();
									srcW=areaHtmlObj.width();
									srcH=areaHtmlObj.height();
									srcTop=areaHtmlObj.position().top;
									srcLeft=areaHtmlObj.position().left;
								}
						)).create();
						selectAreaObj.css("cursor","pointer");
						editWinIframe.addSelectBlack(selectArea);
						for(var i=0;i<that.selectAreaList.length;i++){
							that.selectAreaList[i].cancelSelected();
						}
						that.selectAreaList.push(selectArea);
					}else{
						downObjBit=4;
						selectedLine=new SelectedLine(startX,startY,$(this),that.selectAreaList);
						selectAreaObj.css("cursor","crosshair");
						selectedLine.create();
					}
				}
			}).bind("mousemove",function(ev){
				if(editWinIframe&&editWinIframe.winMouseBit){
					editWinIframe.moveWin(ev.pageX, ev.pageY);
				}else{
					if(mouseBit){
						var obj=ev.srcElement||ev.target;
						var newY=ev.pageY - selectAreaObj.offset().top;
						var newX=ev.pageX - selectAreaObj.offset().left;
						//alert(downObjBit)
						//console.log(ev.pageX+"------------------"+evX);
						if(downObjBit===2){
							selectArea.reDrewAnchor((ev.pageX-evX), (ev.pageY-evY),srcW,srcH,srcLeft,srcTop);
						}else if(downObjBit===3){
							selectArea.mouseMoveDrew(ev.pageX, ev.pageY,srcLeft,srcTop);
						}else if(downObjBit===4){
							if(selectedLine){
								selectedLine.mouseMove(newX, newY);
							}
						}else{
							if(ctrlBit){
								selectArea.newDrewObj(startX, startY, newX, newY);
							}
						}
					}
				}
				
			}).bind("mouseout",function(ev){
				//mouseBit=false;
				//selectAreaObj.css("cursor","");
			})
			
		}else{
			selectAreaDiv.show();
		}
	},
	/**
	 * 给整个div加一个遮罩并且在遮罩上加入方法。(用天放大缩小，滚轮等事件)
	 */
	createMagnifier:function(magnifierBit){
		var that=this;
		this.magnifierBit=magnifierBit;
		var mouseBit=false;
		var moveBit=false;
		if(!$("#"+this.magnifierMask).length){
			var mDiv=[];
			var imgPanel=$("#"+that.bigImgPanel)
			mDiv.push('<div class="magnifierMask" id="'+this.magnifierMask+'"></div>');
			imgPanel.append(mDiv.join(""));
			imgPanel.append('<div class="magnifierImg" id="'+this.magnifierImg+'"></div>');
			var mask=$("#"+this.magnifierMask);
			var magImg=$("#"+this.magnifierImg);
			var moveX=0;
			var moveY=0;
			var srcLeft=0;
			var srcTop=0;
			var obj;
			mask.unbind().bind("mouseup",function(){
				mouseBit=false;
				moveBit=false;
				mask.css("cursor","");
				magImg.hide();
				moveX=0;
				moveY=0;
			}).bind("mousedown",function(ev){
				mask.css("cursor","pointer");
				var srcImg=$("#"+that.bigImg);
				obj=ev.srcElement||ev.target;
				if(that.magnifierBit){
					var src=srcImg.attr("src");
					var h=srcImg.height()*that.moveDouble;
					var w=srcImg.width()*that.moveDouble;
					var img='<img id="'+that.magnifierMoveImg+'" style="width:'+w+'px;height:'+h+'px;" src="'+src+'"/>';
					magImg.html(img);
					mouseBit=true;
				}else{
					moveY=jyTools.getOffsetTop(ev,obj);
					moveX=jyTools.getOffsetLeft(ev,obj);
					srcTop=that.getCssPostion(srcImg.css("top"));
					srcLeft=that.getCssPostion(srcImg.css("left"));
					moveBit=true;
				}
			}).bind("mousemove",function(ev){
				var imgObj=$("#"+that.bigImg);
				var bigImgShadow=$("#"+that.bigImgShadow);
				var my=jyTools.getOffsetTop(ev,mask[0]);
				var mx=jyTools.getOffsetLeft(ev,mask[0]);
				if(mouseBit){
					var obj=ev.srcElement||ev.target;
					var moveImgObj=$("#"+that.magnifierMoveImg);
					var imgT=imgObj.offset().top;
					var imgL=imgObj.offset().left;
					var imgW=imgObj.width();
					var imgH=imgObj.height();
					var pT=$(obj).offset().top;
					var pL=$(obj).offset().left;
					if((mx+pL)>=imgL&&(my+pT)>=imgT&&(mx+pL)<=(imgL+imgW)&&(my+pT)<=(imgT+imgH)){
						magImg.show();
						magImg.css("left",(mx)+"px");
						magImg.css("top",(my)+"px");
						var movey=-((my+pT)-imgT)*that.moveDouble;
						var movex=-((mx+pL)-imgL)*that.moveDouble;
						moveImgObj.css("left",movex+"px");
						moveImgObj.css("top",movey+"px");
					}else{
						mask.css("cursor","");
						magImg.hide();
					}
					console.log("imgT:"+imgT+",imgL:"+imgL+",my:"+my+",mx:"+mx+",pT:"+pT+",pL:"+pL);
				}else if(moveBit){
					var newLeft=srcLeft+(mx-moveX);
					var newTop=srcTop+(my-moveY);
					that.moveTo([imgObj,bigImgShadow],newTop,newLeft);
				}
			}).bind("mouseout",function(){
				mouseBit=false;
				moveBit=false;
				mask.css("cursor","");
				magImg.hide();
			}).bind('mousewheel', function(event, delta) {
				if(!that.magnifierBit){
					if(delta>0){
						that.toolBarFun()["zoomMax"]();
					}else{
						that.toolBarFun()["zoomMin"]();
					}
				}
	            //return false;
	        });
		}
		$("#"+this.magnifierMask).show();
	},
	moveTo:function(objs,top,left){
		var moveObj={"left":left,"top":top};
		for(var i=0;i<objs.length;i++){
			objs[i].css(moveObj)
		}
	},
	modelSwap:function(){
		var that=this;
		that.lockTool=false;
		var bigImgPanel=$("#"+that.imgPanel);
		return {
			"bigImg":function(){
			    imageTool.showBig();
			},
			"pptImg":function(){
			    imageTool.showPPt();
			},
			"treeImg":function(){
			    imageTool.showTree();
			},
			"listImg":function(){
				imageTool.showList();
			}
		}
	},
	createToolBar:function(){
//		var toolBtns=[["zoomMax","放大"],["zoomMin","缩小"],["leftRounte","左旋转"],["rightRounte","右旋转"],["original","原始大小"],["fullScreen","全屏"],["selectedBlack","选择块"],["magnifier","放大镜"],["lock","锁定"]];
		var toolBtns=[["zoomMax","放大"],["zoomMin","缩小"],["leftRounte","左旋转"],["rightRounte","右旋转"],["original","原始大小"],["fullScreen","全屏"],["selectedBlack","选择块"],["magnifier","放大镜"],["lock","锁定"]];

		var toolBar=["<ul>"];
		for(var i=0;i<toolBtns.length;i++){
			var t=toolBtns[i];
			toolBar.push('<li class="btnSrc '+t[0]+'" ext="'+t[0]+'" title="'+t[1]+'"></li>');
		}
		toolBar.push("</ul>")
		return toolBar.join("");
	},
	setScaleValue:function(){
		var bigImg=$("#"+this.bigImg);
		var scale=parseInt(bigImg.width()/this.srcBigImgW*100);
		$("#"+this.scaleName).html(scale+"%");
	},
	groupFrame:function(){
		var that=this;
		var btnw=20;
		var that=this;
		var imgStr=[];
		var ih=that.height-20;
		imgStr.push('<div id="'+that.imgName+'" class="imgIframe">');
		imgStr.push('<div id="'+that.modelPanel+'" class="modelChangePanel">');
		imgStr.push('<span class="bigImg" ext="bigImg" title="大图显示"></span>');
		imgStr.push('<span class="pptImg" ext="pptImg" title="ppt展示"></span>');
		imgStr.push('<span class="treeImg" ext="treeImg" title="树形展示"></span>');
		imgStr.push('<span class="listImg" ext="listImg" title="图片列表"></span>');
		imgStr.push('</div>');
		imgStr.push('<div id="'+that.toolPanel+'" class="toolPanel">');
		imgStr.push(that.createToolBar());
		imgStr.push('<div id="'+that.scaleName+'" class="scalePanel"></div>');
		imgStr.push('<img id="'+that.downLoadName+'" class="downLoadPanel"/>');
		imgStr.push('<div id="'+that.pageIndexName+'" class="scalePanel"></div>');
		imgStr.push('</div>');
		var style="";
		imgStr.push('<div id="'+that.treeName+'" class="treeFramePanel" style="width:'+that.treeW+'p;display:none;"></div>');
	    imgStr.push('<div '+style+' id="'+that.imgPanel+'"  class="imgIframePanel">');
	    imgStr.push('</div>');
	    imgStr.push('</div>');
	    $(this.container).html(imgStr.join(""));
	    
	    var addEvent=function(){
	    	$("#"+that.toolPanel).unbind().bind("mouseover",function(ev){
	    		var obj=ev.srcElement||ev.target;
	    		var endObj=$(obj);
	    		if(obj.tagName=="LI"){
	    			endObj.removeClass("btnSrc");
	    			endObj.addClass("btnOver");
	    		}
	    	}).bind("mouseout",function(ev){
	    		var obj=ev.srcElement||ev.target;
	    		var endObj=$(obj);
	    		if(obj.tagName=="LI"){
	    			endObj.addClass("btnSrc");
	    			endObj.removeClass("btnOver");
	    		}
	    	}).bind("click",function(ev){
	    		var obj=ev.srcElement||ev.target;
	    		var endObj=$(obj);
	    		if(obj.tagName=="LI"){
//	    			debugger;
	    			if(that.srcToolbarBtn){
	    				that.srcToolbarBtn.removeClass("btnSelected");
	    			}
	    			
//    				if(endObj.hasClass("btnSelected")){
//    					endObj.removeClass("btnSelected");
//    					that.toolBarFun()["clear"](endObj);
//    				}else{
    					var ext=endObj.attr("ext");
    					endObj.addClass("btnSelected");
    					if(ext){
    						that.toolBarFun()[ext](endObj);
    					}
    					that.srcToolbarBtn=endObj;
//    				}
	    		}
	    	});
	    	$("#"+that.modelPanel).bind("click",function(ev){
	    		var obj=ev.srcElement||ev.target;
	    		var endObj=$(obj);
	    		if(obj.tagName=="SPAN"){
	    			var ext=endObj.attr("ext");
	    			if(ext){
	    				that.modelSwap()[ext]();
	    			}
	    		}
	    	});
	    	var modelMoveBit=false;
	    	var modelX=0;
	    	var modelY=0;
	    	var modelLeft=0;
	    	var modelTop=0;
	    	$("#"+that.imgName).unbind().bind("mousedown",function(ev){
	    		var obj=ev.srcElement||ev.target;
	    		if(obj.id==that.modelPanel){
	    			modelMoveBit=true;
	    			var endObj=$(obj);
	    			modelX=ev.screenX||ev.x;//ev.offsetX||ev.pageX;
	    			modelY=ev.screenY||ev.y;//ev.offsetY||ev.pageY;
	    			modelLeft=$(obj).offset().left-$("#"+that.imgName).offset().left;
	    			modelTop=$(obj).offset().top-$("#"+that.imgName).offset().top;
	    			$(obj).css("cursor","move");
	    		}
	    	}).bind("mousemove",function(ev){
	    		if(modelMoveBit){
	    			var obj=$("#"+that.modelPanel);
	    			var x=ev.screenX||ev.x;
	    			var y=ev.screenY||ev.y;
	    			obj.css("left",(modelLeft+(x-modelX))+"px");
	    			obj.css("top",(modelTop+(y-modelY))+"px");
	    		}
	    	}).bind("mouseup",function(ev){
	    		var obj=$("#"+that.modelPanel);
	    		modelMoveBit=false;
	    		$(obj).css("cursor","");
	    	})
	    	$("#"+that.modelPanel).bind("mouseup",function(ev){
	    		var obj=$("#"+that.modelPanel);
	    		modelMoveBit=false;
	    		$(obj).css("cursor","");
	    	})
	    	
	    }
	    addEvent();
	},
	leftOrRightBtnOp:function(){
		var that=this;
		var imgCount=that.imgList.length;
		if(that.selectedIndex<(imgCount-1)&&that.selectedIndex>0){
			$("#"+that.preBtn).show();
			$("#"+that.nextBtn).show();
		}else if(that.selectedIndex>=(imgCount-1)&&that.selectedIndex){
			$("#"+that.preBtn).show();
			$("#"+that.nextBtn).hide();
		}else if(that.selectedIndex<=0){
			$("#"+that.preBtn).hide();
			if(that.selectedIndex<(imgCount-1)){
				$("#"+that.nextBtn).show();
			}else{
				$("#"+that.nextBtn).hide();
			}
		}
		if(imgCount>that.pageSize){
			var p=that.pageIndex+1;
			if(p*that.pageSize>=that.imgList.length){
				$("#"+that.nextPageBtn).hide();
			}else{
				$("#"+that.nextPageBtn).show();
			}
			if(that.pageIndex<=0){
				$("#"+that.prePageBtn).hide();
			}else{
				$("#"+that.prePageBtn).show();
			}
		}else{
			$("#"+that.prePageBtn).hide();
			$("#"+that.nextPageBtn).hide();
		}
	},
	isImage:function(url){
		var that=this;
		var ext=url.substr(url.lastIndexOf("."));
		var extUpper=ext.toUpperCase().substr(1);
		for(var i=0;i<that.imageType.length;i++){
			if(extUpper==that.imageType[i]){
				return true;
			}
		}
		return false;
	},
	getMinImgUrl:function(url){
		var that=this;
		if(url){
			var ext=url.substr(url.lastIndexOf("."));
			var extUpper=ext.toUpperCase().substr(1);
			if(that.isImage(url)){
				url=url.substring(0,url.lastIndexOf("."))+that.minImgExt+ext;
			}else if(that.icoUrls){
				var isIcon=false;
				for(var extName in that.icoUrls){
					if(extUpper==extName.toUpperCase()){
						url=that.icoUrls[extName];
						isIcon=true;
						break;
					}
				}
				if(!isIcon){
					url=that.noTypeUrl;
				}
				url=that.basePath+url;
			}
		}
		return url;
	},
	clearSelectedLi:function(parentObj){
		var that=this;
		var pIndex=that.pageIndex;
		var that=this;
		parentObj.find("li").each(function(index){
			var endObj=$(this);
			endObj.removeClass("btnSelected");
			if((index+pIndex*that.pageSize)==that.selectedIndex){
				endObj.addClass("btnSelected")
			}
		})
	},
	//大小图同步
	maxMinImgSync:function(){
		var that=this;
		var html=[];
		this.pageIndex=parseInt(that.selectedIndex/that.pageSize);
		for(var i=0;i<this.pageSize;i++){
			var index=(this.pageIndex*this.pageSize)+i;
			if(index>=this.imgList.length){
				break;
			}
			var imgObj=this.imgList[index];
			var minw=that.pptToolH-8;
			var minh=minw
			html.push('<li class="pptToolMinImg"  index='+index+' style="width:'+minw+'px;height:'+minh+'px;line-height: '+minh+'px;">');
			var url=imgObj["url"];
			//if(that.isImage(url)){
			var a=that.getMinImgUrl(url);
				html.push('<img max-width: 100%;max-height: 100%; index='+index+' src="'+a+'"/>')
			//}
			html.push('</li>');
		}
		$("#"+that.pptTool).html(html.join(""));
		that.clearSelectedLi($("#"+that.pptPanel));//清除选中项
	},
	showPPt:function(){
		var that=this;
		var html=[];
		html.push('<div id="'+that.pptPanel+'" class="pptPanel" style="he1ight:'+that.pptToolH+'px;">');
		html.push('<a href="javascript:void(0)" ext="-1" id="'+that.prePageBtn+'" class="pptPreBtn"></a>');
		html.push('<ul id="'+that.pptTool+'" class="pptTool">');
		html.push('</ul>');
		html.push('<a href="javascript:void(0)" ext="1" id="'+that.nextPageBtn+'" class="pptNextBtn"></a>');
		html.push('</div>');
		this.createBig(function(){
			that.maxMinImgSync();
			$("#"+that.pptPanel).unbind().bind("click",function(ev){//小图标点击时选中，并同步大图标
				var obj=ev.srcElement||ev.target;
				var endObj=$(obj);
				var attr=endObj.attr("ext")
				if(attr){//
					 var step=Number(attr)
					 that.pageIndex+=(step);
					 if(step>0){
						 that.selectedIndex=that.pageIndex*that.pageSize;
					 }else{
						 that.selectedIndex=(that.pageIndex+1)*that.pageSize+step;
					 }
				}else if(endObj.attr("index")){
					that.selectedIndex=Number(endObj.attr("index"));
				}
				that.maxMinImgSync()
				that.reDrewBigImg();//设置图像的url
			});
			that.setToolPanelAndBigImg("ppt");
		},html.join(""),function(){
			that.maxMinImgSync();
		});
	},
	reDrewBigImg:function(url){
		debugger;
		var  that=this;
		$("#"+that.pageIndexName).html('<label style="color:#ff0000;">'+(that.selectedIndex+1)+'</label>/'+that.imgList.length);
 		var imgObj=that.imgList[that.selectedIndex];
		var url=imgObj.url;
		$("#"+this.bigMp3).html("");
		$("#"+this.bigPdfIframe).attr("src","");
		//$("#"+this.bigMp3Video)[0].play();
		if(this.confirmType(url,".PDF")||this.confirmType(url,".TXT")){
			$("#"+this.bigPdfIframe).attr("src",url);
			$("#"+this.bigPdf).show();
			$("#"+this.bigImg).hide();
			$("#"+this.bigMp3).hide();
			$("#"+this.magnifierMask).hide();
		}else if(this.confirmType(url,".MP3")){
			//$("#"+this.bigMp3).html('<audio id="'+that.bigMp3Video+'" src="'+url+'" controls="controls" autoplay="false">您的浏览器不支持 mp3播放。</audio>');
			var mp3Iframe='<iframe id="'+that.bigMp3Video+'" src="'+url+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0"  style="width:100%;height:100%;border:0px; margin:0px;padding:0px;"></iframe>';
			$("#"+that.bigMp3).html(mp3Iframe);
			$("#"+this.bigMp3).show();
			$("#"+this.bigPdf).hide();
			$("#"+this.bigImg).hide();
			$("#"+this.magnifierMask).hide();
		}else{
			var bigImg=$("#"+this.bigImg);
			var bigImgShadow=$("#"+that.bigImgShadow);
			bigImg.attr("src",url);
			$("#"+that.downLoadName).attr("src",url);
			bigImg.css("width","");
			bigImg.css("height","");
			var loadedfun=function(){
				var parent=bigImg.parent();
				var pw=parent.width();
				var ph=parent.height();
				bigImg.css("max-width","");
				bigImg.css("max-height","");
				var w=bigImg.width()||bigImg[0].width;//用于计算100%比，获取原始图像大小；
				var h=bigImg.height()||bigImg[0].height;
				that.srcBigImgW=w;
				that.srcBigImgH=h;
				
				bigImg.css("max-width","100%");
				bigImg.css("max-height","100%");
				
				w=bigImg.width()||bigImg[0].width;//获取适应大小，用于计算左上角坐标
				h=bigImg.height()||bigImg[0].height;
				
				bigImg.css("max-width","");
				bigImg.css("max-height","");
				if(!that.originalSize){
					var animateParam={
							width:(w+'px'),
							height:(h+'px'),
							top:(((ph-h)/2)+"px"),
							left:(((pw-w)/2)+"px")
					};
					bigImg.css(animateParam);
					bigImgShadow.css(animateParam);
				}
				that.rotateFun([bigImgShadow[0],bigImg[0]],0);
				$("#"+that.bigPdf).hide();
				$("#"+that.bigMp3).hide();
				$("#"+that.bigImg).show();
				$("#"+that.magnifierMask).show();
				that.setScaleValue();
			};
			bigImg[0].onreadystatechange=function(){
				if(this.readyState=="complete"){
					loadedfun();
				}
			};
			bigImg[0].onload=loadedfun;
		}
		that.leftOrRightBtnOp();
	},
	confirmType:function(url,type){
		if(url){
			var extName=url.substr(url.lastIndexOf("."));
			return (extName.toUpperCase()===type )
		}
	},
	fnRotateScale:function(dom, scale) {
		var that=this;
		var angle=that.turnAngleValue;
		//var angle=that.turnAngleValue;
		if (dom && dom.nodeType === 1) {
			scale = parseFloat(scale) || 1;
			if(typeof(angle)==="string"){
				angle=Number(angle);
			}
			if (typeof(angle) === "number") {
				angle=angle%360;
				jyTools.saveLocal("angle", angle);
				//IE
				var rad = angle * (Math.PI / 180);
				var m11 = Math.cos(rad) * scale, m12 = -1 * Math.sin(rad) * scale, m21 = Math.sin(rad) * scale, m22 = m11;
					dom.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+ m11 +",M12="+ m12 +",M21="+ m21 +",M22="+ m22 +",SizingMethod='auto expand')";
				dom.style.MozTransform = "rotate("+ angle +"deg) scale("+ scale +")";
				dom.style.WebkitTransform = "rotate("+ angle +"deg) scale("+ scale +")";
				dom.style.OTransform = "rotate("+ angle +"deg) scale("+ scale +")";
				dom.style.Transform = "rotate("+ angle +"deg) scale("+ scale +")";
			}     
		}
		return angle;
	},
	
	createBig:function(callBackFun,addHtmlStr,bigLeftRightFun){
		var that=this;
		this.groupFrame();
		var url=this.imgList[this.selectedIndex].url;
		var html=['<div id="'+that.bigImgPanel+'"; class="bigImgPanel" >'];
		html.push('<img id="'+that.bigImg+'"; src="'+url+'" style=""/>');
		html.push('<div id="'+that.bigImgShadow+'"; class="bigImgShadow" style=""></div>');
		html.push('<div class="bigPdf" id="'+that.bigPdf+'" style="display:none;"><iframe id="'+that.bigPdfIframe+'" src="'+url+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0"  style="width:100%;height:100%;border:0px; margin:0px;padding:0px;"></iframe></div>');
		
		html.push('<div class="bigMp3" id="'+that.bigMp3+'" style="display:none;"></div>');
		
		html.push('<a href="javascript:void(0)" id="'+that.preBtn+'" ext="-1"  class="preBtn"></a>');
		html.push('<a href="javascript:void(0)" id="'+that.nextBtn+'" ext="1"  class="nextBtn"></a>');
		html.push('</div>');
		if(addHtmlStr){
			html.push(addHtmlStr);
		}
		$("#"+that.imgPanel).append(html.join(""));
		that.pageTurn=function(attr){
			var index=that.selectedIndex+attr;
			if(index>-1&&that.imgList&&index<that.imgList.length){
				that.selectedIndex=index;
				var lsIndex=that.selectedIndex+1;
				if(lsIndex%that.pageSize>0){
					that.pageIndex=parseInt(lsIndex/that.pageSize);
				}else{
					that.pageIndex=parseInt(lsIndex/that.pageSize)-1;
				}
				that.reDrewBigImg()
				if(bigLeftRightFun){
					bigLeftRightFun();
				}
			}
		}
		$("#"+that.bigImgPanel).unbind().bind("click",function(ev){//大图左右移动
			var obj=ev.srcElement||ev.target;
			var endObj=$(obj);
			var attr=endObj.attr("ext")
			if(attr){
				attr=(Number(attr));
				that.pageTurn(attr);
			}
		});
		this.createMagnifier(false);
		this.reDrewBigImg();
		if(callBackFun){
			callBackFun();
		}
	},
	pageTurn:function(attr){
		//createBig内部实现；
	},
	showBig:function(){
		this.createBig();
	},
	setToolPanelAndBigImg:function(mode){
		var that=this;
		var imgPanel=$("#"+that.imgPanel);
		var bigImgPanel=$("#"+that.bigImgPanel);
		var toolPanel=$("#"+that.toolPanel);
		var showMode={
				"tree":function(){
					toolPanel.show();
					imgPanel.css("top","30px");
					imgPanel.css("left",that.treeW+"px");
					bigImgPanel.css("bottom","0px");
				},
				"ppt":function(){
					toolPanel.show();
				    imgPanel.css("top","30px");
				    imgPanel.css("left","0px");
				    bigImgPanel.css("bottom",that.pptToolH+"px");
				},
				"list":function(){
					imgPanel.css("top","0px");
					toolPanel.hide();
				},
				"big":function(){
					toolPanel.show();
				    imgPanel.css("top","30px");
				    imgPanel.css("left","0px");
				    bigImgPanel.css("bottom","0px");
				}
		}
		showMode[mode]();
	},
	getCurrentImageObj:function(){
		var that=this;
		return that.imgList[that.selectedIndex];
	},
	showTree:function(){
		var that=this
		var treeNodeSelect=function(){
			var obj=that.imgList[that.selectedIndex];
			var tree=that.tree.getTree();
			var node=tree.getNodeByParam("ID",obj["id"]);
			tree.selectNode(node);
		};
		this.createBig(function(){
			that.setToolPanelAndBigImg("tree");
			var treeStr={"isEdit":false,"check":false,"expandAll":true,"viewFun":function(id,obj){
				if(!obj.children){
					that.selectedIndex=obj.selectedIndex;
					that.reDrewBigImg((obj.URL||obj.url));
				}
			}};
			that.tree=$("#"+that.treeName).jyTree(treeStr);
			that.tree.show(that.treeData);
			treeNodeSelect();
			$("#"+that.treeName).show();
		},
		"",
		function(){
			treeNodeSelect();
		});
	},
	showList:function(){
		that=this;
		this.groupFrame();
		var imgList=[];
		imgList.push('<div id="'+that.groupImgList+'">');
		var index=-1;
		for(var k in that.groupImgs){
			var list=that.groupImgs[k];
			if(list&&list.length){
				imgList.push('<div class="groupImgList">');
				imgList.push('<div class="groupTitle"><div class="groupText">'+k+'</div></div>');
				imgList.push('<ul class="imgContent">')
				for(var i=0;i<list.length;i++){
					index++;
					var imgObj=list[i];
					imgList.push('<li class="imgSwap" index="'+index+'" style="width:'+that.minImgW+'px;height:'+that.minImgH+'px;line-height: '+that.minImgH+'px;">');
					var url=imgObj["url"];
					imgList.push('<img style="max-width:'+that.minImgW+'px;max-height:'+that.minImgH+'px;"  index="'+index+'" src="'+that.getMinImgUrl(url)+'"/>');
					imgList.push('</li>');
				}
				imgList.push('</ul></div>');
			}
		}
		imgList.push('</div>');
		$("#"+that.imgPanel).append(imgList.join(""));
		var groupImgListObj=$("#"+that.groupImgList);
		var getIndex=function(ev,fun){
			var obj=ev.srcElement||ev.target;
			var endObj=$(obj);
			var index=endObj.attr("index");
			if(undefined!=index){
				index=Number(index);
				that.selectedIndex=index;
				if(fun){
					fun();
				}
			}
		}
		groupImgListObj.unbind().bind("click",function(ev){
			var parentP=$(this);
			getIndex(ev,function(){
				that.clearSelectedLi(parentP,0);
			});
		}).bind("dblclick",function(ev){
			getIndex(ev,function(){
				that.modelSwap()["pptImg"]();
			});
		});
		that.clearSelectedLi(groupImgListObj,0);
		that.setToolPanelAndBigImg("list");
	},
	clearBlockArea:function(){
		var that=this;
		for(var i=0;i<that.blockAreas.length;i++){
			var blockArea=that.blockAreas[i];
			blockArea.clear();
		}
		that.blockAreas=[];
	},
	showBlockArea:function(blockAreas,w){
		var that=this;
		if(blockAreas&&blockAreas.length){
			var imgObj=$("#"+that.bigImg);
			var bigImgShadow=$("#"+that.bigImgShadow);
			var proportion=1;
			if(!that.originalSize){
				if(w){
					 proportion=bigImgShadow.width()/w;
				}
			}


			var getLTPoint=function(objs){
				var returnObj={x:0,y:0};
				if(objs&&objs.length){
					returnObj["x"]=objs[0].x;
					returnObj["y"]=objs[0].y;
					if(objs.length>1){
						for(var i=1;i<objs.length;i++){
							var obj=objs[i];
							if(obj.x<returnObj["x"]){
								returnObj["x"]=obj.x;
							}
							if(obj.y<returnObj["y"]){
								returnObj["y"]=obj.y;
							}
						}
					}
				}
				return returnObj;
			}
			
			var getEndPoint=function(objs){
				var returnObj={x:0,y:0};
				if(objs&&objs.length){
					returnObj["x"]=objs[0].x;
					returnObj["y"]=objs[0].y;
					if(objs.length>1){
						for(var i=1;i<objs.length;i++){
							var obj=objs[i];
							if(obj.x>returnObj["x"]){
								returnObj["x"]=obj.x;
							}
							if(obj.y>returnObj["y"]){
								returnObj["y"]=obj.y;
							}
						}
					}
				}
				return returnObj;
			}
			
//			maxW=ba.w>maxW?ba.w:0;
//			maxH=ba.h>maxH?ba.h:0;
//			maxL=ba.x>maxL?ba.x:0;
//			maxT=ba.y>maxT?ba.y:0;
			
			that.clearBlockArea();
			var objsXY=[];
			var objsEndXY=[];
			for(var i=0;i<blockAreas.length;i++){
				ba=blockAreas[i];
				objsXY.push({x:Number(ba.x),y:Number(ba.y)});
				objsEndXY.push({x:Number(ba.x)+Number(ba.w),y:Number(ba.y)+Number(ba.h)});
				var blockAreaObj=new BlockArea(ba.x,ba.y,ba.w,ba.h,bigImgShadow,proportion);
				that.blockAreas.push(blockAreaObj.create());
			}
			var startObj=getLTPoint(objsXY);
			var objsEndXY=getEndPoint(objsEndXY);
			
			var maxW=objsEndXY.x-startObj.x;
			var maxH=objsEndXY.y-startObj.y;
			var pW=that.container.offsetWidth;
			var pH=that.container.offsetHeight;
			
			
			var offsetWScale=(pW-maxW)/2;
			var offsetHScale=(pH-maxH)/2;
			var blX=1;
			var blY=1;
			
			if(pW>maxW){
				offsetWScale=(pW-maxW)/2;
			}else{
				blX=(pW-100)/maxW;
			}
			if(pH>maxH){
				offsetHScale=(pH-maxH)/2;
			}else{
				blY=(pH-100)/maxH;
			}
			var bl=blY<blX?blY:blX;
			 
			
			var offsetL=startObj.x-offsetWScale;
			var offsetT=startObj.y-offsetHScale;
			that.moveTo([imgObj,bigImgShadow], -offsetT, -offsetL);
			setTimeout(function(){
				that.zoom(bl);
			},100);
		}
	},
	addTextLabel:function(labels){
		var that=this;
		if(labels&&labels.length){
			var bigImgShadow=$("#"+that.bigImgShadow);
			var editText=new EditTextLabel(bigImgShadow,["aaaa","bbbbb"]);
			editText.create();
		}
	}
	
};
(function( $ ){  
  $.fn.newImage = function(imgStructure) {
	  var tname="tname"+(new Date()).getTime();
   	 return new ImageTool(imgStructure,tname,$(this)[0]);
  };  
})( jQuery );  

