function SearchAutoComplete(structure, name,container) {
		this.structure=structure;
		this.name=name;
		this.idName=this.name+"Id";
		this.ulName=this.name+"ul";
		this.container=container;
		this.opObj=$(this.container);
		this.selectIndex=0;
		this.liFocusStatus=-1;
		this.datas=structure.datas||[];
		this.init();
}
SearchAutoComplete.prototype = {
	init:function(){
		this.minWidth=this.structure.minWidth||this.opObj.width();
		this.target=document.body;
		this.left=this.opObj.offset().left;
		this.top=this.opObj.position().top;
		this.height=this.opObj.height();
		this.url=this.structure.url;
		this.minRowNum=this.structure.minRowNum||10;
		this.rowHeight=30;
		this.searchFilterFun=this.structure.searchFilterFun;
		this.create();
		this.addEvent();
		this.afterSelectFun=this.structure.afterSelectFun;
	},
	create:function(){
		var that=this;
		var str='<div  class="searchAuto" id="'+that.idName+'"><ul id='+this.ulName+'></ul></div>';
		var autoObj=$(str);
		if(!($("#"+that.idName).length)){
			autoObj.appendTo(that.opObj.parent());
		}
	},
	addEvent:function(){
		var that=this;
		var ulObj= $("#"+that.ulName);
		var groupData=function(datas){
			 ulObj.html();
			 if(datas&&datas.length){
				 that.datas=datas;
				 var lis=[];
				 for(var i=1;i<datas.length;i++){
					 lis.push('<li tabIndex='+i+' index='+i+'>'+datas[i]+'</li>');
				 }
				 ulObj.html(lis.join(""));
			 }
		}
		var destroyObj=function(){
			$("#"+that.idName).hide();
			that.selectIndex=0;
			that.datas=[];
		}
		var setObjSelected=function(selectedIndex){
			debugger;
			var liObj=ulObj.find("li").removeClass("selectedLi");
		   if(selectedIndex>0){
			   liObj=ulObj.find("li")[selectedIndex-1];
			   if(liObj){
				   var jqLi=$(liObj);
				   jqLi.addClass("selectedLi").unbind().bind("focus",function(){
					   that.liFocusStatus=1;
				   });
				   liObj.focus();
			   }
		   } 
   		   that.selectIndex=selectedIndex;
   		   that.opObj.val(that.datas[selectedIndex]);
   		   that.opObj.focus();
   		   
   		   if(that.afterSelectFun) {
   		   		that.afterSelectFun();
   		   }
		}
		var setCss=function(datas){
			var w=that.opObj.width()+10;
			if(that.minWidth&&w<that.minWidth){
				w=that.minWidth;
			}
			var autoObj=$("#"+that.idName);
			autoObj.css("width",w+"px");
			autoObj.css("left",that.opObj.offset().left+"px");
			if(datas&&datas.length&&datas.length>that.minRowNum){
				var rowHeight=$("#"+that.ulName).height()/(datas.length);
				autoObj.css("height",that.minRowNum*rowHeight+"px");
			}
		}
		ulObj.bind("mouseover",function(ev){
			ulObj.find("li").removeClass("selectedLi");
			var obj = ev.srcElement || ev.target;
			var jqObj=$(obj);
			if(obj.tagName=="LI"){
				jqObj.addClass("selectedLi");
			}
		});
        this.opObj.bind("keyup",function(ev){
        	debugger;
    	   var obj = ev.srcElement || ev.target;
    	   var keyValue=ev.keyCode;
    	   var direction=keyValue-39;
    	   var ulObj= $("#"+that.ulName);
    	   if(Math.abs(direction)==1&&that.datas.length){
    		   var index=(that.selectIndex+direction+that.datas.length)%that.datas.length;
    		   setObjSelected(index);
    	   }else if(keyValue==13){
    		   if(that.datas&&that.datas.length){
    			   setObjSelected(that.selectIndex);
    			   destroyObj();
    		   }else{
    			   if(that.searchFilterFun){
         			   that.searchFilterFun(function(datas){
         				   if(datas&&datas.length){
         					   setCss(datas);
         					   datas.unshift(that.opObj.val());
         					   groupData(datas);
         					   $("#"+that.idName).show();
         				   }
         			   },that.opObj.val(),that.opObj);
    			   }
    		   }
    	   } 
        }).bind("blur",function(){
        	that.liFocusStatus=0;
        	setTimeout(function(){
        		if(that.liFocusStatus==0){
        			destroyObj();
        		}
        	},1);
        });
        ulObj.bind("mousedown",function(ev){debugger;
           that.liFocusStatus=1;
    	   var obj = ev.srcElement || ev.target;
    	   var jqObj=$(obj);
    	   var index=Number(jqObj.attr("index"));
    	   setObjSelected(index);
    	   destroyObj();
        });
       
	}
};
(function( $ ){  
  $.fn.searchAutoComplete = function(menuStructure) {
	var mName="tname"+(new Date()).getTime();
   	return new SearchAutoComplete(menuStructure,mName,$(this)[0]);
  };  
})(jQuery);  

