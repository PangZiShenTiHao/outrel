// new表格
function TreeMenu(treeMenu,treeObj) {
	this.treeMenu=treeMenu;
	this.treeObj=treeObj;
	this.treeId=treeObj.id+"tree";
	this.treeOK=this.treeId+"ok";
	this.treeCLOSE=this.treeId+"close";
	this.treeCheckAll=this.treeId+"checkAll";
	this.treeReverse=this.treeId+"reverse";
	this.treeCancelAll=this.treeId+"CancelAll";
	this.treeReset=this.treeId+"Reset";
	this.tree=null;
	this.init();
}
TreeMenu.prototype = {
	init:function(){
			var that=this;
			this.width=this.treeMenu.width||500;
			this.height=this.treeMenu.height||500;
			this.treeStructure=this.treeMenu.treeStructure;
			this.treeUrl=this.treeMenu.treeUrl;
			this.treeIdObj=this.treeMenu.treeIdObj;
			this.treeNameObj=this.treeMenu.treeNameObj;
			this.treeExtendObjs=this.treeMenu.treeExtendObjs;
			this.treeType=this.treeMenu.treeType||"radio";
        	this.disabledLink=this.treeMenu.disabledLink;
            this.lockParent=this.treeMenu.lockParent;
            this.clickParent=this.treeMenu.clickParent;
			$(that.treeObj).unbind().bind('click',function(ev){
				that.show();
			});
	},
	show:function(){
		var that=this;
		var treeDiv=$("#"+that.treeId);
		 if(!(treeDiv&&treeDiv.length)){
			 var tO=$(that.treeObj);

			 var left=tO.offset().left;
			 if(that.width+left>$("body").width()){
				 left=left-(that.width-tO.width());
			 }
			 var top=tO.offset().top+tO.height();
			 var createBtn=function(bit){
				 var buttons=[];
				 var aStyle=' display:inline-block; margin: 2px 5px; text-decoration: none; color: #0A5991; font-weight: bold;';
				 if(bit){
					 var style=aStyle+'color:#2F3841;';
					 buttons.push([that.treeCheckAll,"全选",style,function(ev){
						 that.tree.tree.checkAllNodes(true);
					 }]);
					 buttons.push([that.treeCancelAll,"全部取消",style,function(ev){
						 that.tree.tree.checkAllNodes(false);
					 }]);
					 buttons.push([that.treeOK,"确认",style,function(ev){
						 	debugger;
							var nodes=that.tree.tree.getCheckedNodes(true);
							var names=[];
							var ids=[];
							if(nodes&&nodes.length){
								for(var i=0;i<nodes.length;i++){
									names.push(that.tree.getName(nodes[i]));
									ids.push(that.tree.getId(nodes[i]));
								}
							}
							
							if(that.treeNameObj){
								$(that.treeNameObj).val(names.join(","));
							}else{
								$(that.treeObj).val(names.join(","));
							}
							if(that.treeIdObj){
								$(that.treeIdObj).val(ids.join(","));
							}
							if(that.treeExtendObjs){
								$(that.treeExtendObjs).val(jyTools.obj2JsonString(nodes));
							}
							that.recovery();
						 }]);
				 }
				 buttons.push([that.treeReset,"重置",aStyle+' ',function(ev){
					 if(that.treeNameObj){
						$(that.treeNameObj).val("");
					 }else{
						$(that.treeObj).val("");
					 }
					 $(that.treeIdObj).val("");
					 that.tree.tree.checkAllNodes(false);
					 that.recovery();
				 }]);
				 buttons.push([that.treeCLOSE,"关闭",aStyle+'  ',function(ev){
					 that.recovery();
				 }]);
				 return {
					 getBtnStr:function(){
						 var btnStr=[];
						 var groupBtn=function(btn){
							 return '<a href="javascript:void(0)" id="'+btn[0]+'" style="'+btn[2]+'">'+btn[1]+'</a>'
						 }
						 for(var i=0;i<buttons.length;i++){
							 btnStr.push(groupBtn(buttons[i]));
						 }
						 return btnStr.join("");
					 },
					 addEvent:function(){
						 for(var i=0;i<buttons.length;i++){
							 var btn=buttons[i];
							 $("#"+btn[0]).unbind().bind("click",btn[3]);
						 }
					 }
				 }
			 }
			 var createTree=function(bit){
				 var h=that.height-25;
				 var btnDiv="";
				 var btnOp=createBtn(bit);
				 btnDiv='<div class="treeBtns">'+btnOp.getBtnStr()+'</div>';
				 var cDiv='<div style="overflow:auto;width:100%;height:'+h+'px;" id="'+that.treeId+'_"></div>';
				 $("body").append('<div class="ui-widget-content treeMenu" style="left:'+left+'px; top:'+(top+6)+'px;width:'+that.width+'px;height:'+that.height+'px;" id="'+that.treeId+'">'+cDiv+btnDiv+'</div>');
				 btnOp.addEvent();
			 };
			 if(that.treeStructure){
				 createTree();
				 that.tree= $("#"+that.treeId).jyTree(that.treeStructure);
				 that.tree.show();
			 }else if(that.treeUrl){
				var ownTreeS= {"url":that.treeUrl};
				if(this.treeType=="radio"){
					createTree();
					ownTreeS["viewFun"]=function(nodeId,node){
                        if(node.isParent&&that.lockParent)
                        {
                          that.clickParent();
                        }
                        else
                        {
                            var a=that.tree.getName(node);
                            $(that.treeIdObj).css("border-color","#ff0000");
                            if(that.treeNameObj){
    							$(that.treeNameObj).val(a);
	    					 }else{
    							$(that.treeObj).val(a);
	    					 }
                            if(that.treeIdObj){
                                $(that.treeIdObj).val(that.tree.getId(node));
                            }
                            if(that.treeExtendObjs){
								$(that.treeExtendObjs).val(jyTools.obj2JsonString(node));
							}
							that.recovery();
                        }

					};
				}else if(this.treeType="checkbox"){
					createTree(true);
					ownTreeS["check"]=true;
				}
                if(this.disabledLink=="true")
                {
                    ownTreeS["disabledLink"]=true;
                }
				that.tree=$("#"+that.treeId+"_").jyTree(ownTreeS);
				that.tree.show();
			 }
		 }
		 $("#"+that.treeId).show();
	},
	recovery:function(){
		var that=this;
		$("#"+this.treeId).remove();
		that=null;
	}
};

(function( $ ){  
  $.fn.treeMenu = function(menuTreeStructure) {
   	 return new TreeMenu(menuTreeStructure,$(this)[0]);
  };
})( jQuery );  

