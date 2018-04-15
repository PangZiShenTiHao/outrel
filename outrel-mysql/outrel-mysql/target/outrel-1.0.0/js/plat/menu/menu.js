function Menu(menuStructure, menuName,container) {
	this.menuStructure=menuStructure;
	this.menuName=menuName;
	this.container=container;
	this.URL="url";
	this.menuId='m'+this.menuName;
	this.subNodeIds=[];
	this.liIds=[];
	this.dataMap={};
	this.init();
}
Menu.prototype = {
	init:function(){
		this.type=this.menuStructure.type||this.URL;
		this.target=this.menuStructure.target||document.body;
		this.fun=this.menuStructure.fun;
        this.level=0;
		this.datas=[];
		this.subSwapMaxHeight=300;
	},
	show : function(isShow) {
		var that=this;
		that.create();
	},
	create:function(){
		var that=this;
		var menuStr=['<div  id="'+that.menuId+'">'];
		var createSubNode=function(subNodes,index){
			if(subNodes){
				var id='subM'+that.menuName+index;

                    var subNodeStr=['<ul class="menu-two" id="'+id+'">'];

                    for(var i=0;i<subNodes.length;i++){
                        var node=subNodes[i];
                        var id="subNode"+that.menuName+index+"_"+i;
                        that.dataMap[id]=node;

                        var thirdarrow="";
                        var thirdli="";
                        if(node['subNodes'])
                        {
                            thirdarrow=' <span class="arrow"></span>';
                            thirdli=createThirdNodes(node['subNodes'],i,id);

                        }
                        else
                        {
                            that.subNodeIds.push(id);
                        }

                        var li=('<li level="2"  url="'+node["url"]+'"><div class="two-header" id="'+id+'" ><span class="txt"> '+node["text"]+'</span>'+thirdarrow+'</div>'+thirdli);
                        subNodeStr.push(li);
                        subNodeStr.push('</li>');
                    }
                    subNodeStr.push('</ul>');
                    return subNodeStr.join("");


			}
			return "";
		}
        var createThirdNodes=function(thirdNodes,index,fid)
        {
            if(thirdNodes){

                var thirdNodeStr=['<ul  class="menu-three" id="'+id+'">'];
                for(var i=0;i<thirdNodes.length;i++){
                    var node=thirdNodes[i];
                    var id=fid+"thirdNode"+index+"_"+i;
                    that.dataMap[id]=node;
                    that.subNodeIds.push(id);
                    thirdNodeStr.push('<li   url="'+node["url"]+'" id="'+id+'">'+node["text"]+'</li>');

                }
                thirdNodeStr.push('</ul>');
                return thirdNodeStr.join("");
            }
            return "";
        };
		var groupData=function(){
			var h=window.screen.availHeight-140-(that.datas.length*40);
			that.subSwapMaxHeight=(h>that.subSwapMaxHeight?h:that.subSwapMaxHeight);
			for(var i=0;i<that.datas.length;i++){
				var data=that.datas[i];
                var   id="firstMenu"+i;
                //max-height:'+that.subSwapMaxHeight+'px;overflow-y:auto;;
				 var subNodes=data['subNodes'];
				 var paddingStr='5px;';
				 var isSub=' isSub="true" ';
				if(data.url&&data.url.length>0)
                 {	
					 if(!(subNodes&&subNodes.length)){
						 paddingStr="0px";
						 isSub=' isSub="false" ';
					 }
                     that.dataMap[id]=data;
                     that.subNodeIds.push(id);
                 }
				menuStr.push('<h3 id="'+id+ '" '+isSub+'  level="'+that.level+'" url="'+data.url+'">'+data.text+'</h3><div style="padding:'+paddingStr+';overflow-x:hidden;">');
				menuStr.push(createSubNode(subNodes, i));
				menuStr.push('</div>');
			}
			menuStr.push("</div>");
			$(that.container).html(menuStr.join(""));
			that.addEvent();
			$("#"+that.menuId).find("h3").each(function(){
				var isSub=$(this).attr("isSub");
				if(isSub=="false"){
					$(this).find("span").hide();
				}
			})
		};
		if(this.type==that.URL){
			$.ajax({
				url: that.url,
				type: 'POST',
				data:params,
				dataType: 'json',
				error: function(){alert('error');},
				success: function(result){
						that.datas=result.datas; 
						groupData(); 
				}
			});
		}else{
			that.datas=that.menuStructure.datas;
			groupData();
		}
		
	},
	addEvent:function(){
        function addSecondEvent(id)
        {
            var obj=$("#"+id+"");
            if(obj.parent("li").attr("level")=="2")
            {
            if( obj.hasClass("menu-show-li"))
            {
                obj.siblings().slideUp(300);
                $(obj.parent("li")).removeClass("menu-show");
                obj.removeClass("menu-show-li");
            }
            else {
                var otherli = obj.parent("li").siblings().find("ul");

                $(otherli).slideUp(300);
                $(obj.parent("li").siblings()).removeClass("menu-show");

                obj.siblings().slideDown(300);


                $(".menu-show-li").removeClass("menu-show-li");
                $(obj.parent("li")).addClass("menu-show");
                $(obj).addClass("menu-show-li");
            }  }
        }

        $(".menu-two li").bind("click",function(ev,el){
            var elObj=ev.srcElement||ev.target;
            addSecondEvent($(elObj).attr("id")||$(elObj.parentNode).attr("id"));
        });
		var that=this;
		 $(function() {
			$( "#"+that.menuId ).accordion({
			  heightStyle: "content",
			  collapsible: true  
			});
             for(var i=0;i<that.subNodeIds.length;i++){
                 var nid=that.subNodeIds[i];
                 $( "#"+nid).bind("click",function(ev,el){
                     var elObj=ev.srcElement||ev.target;

                     var url=$(elObj).attr("url")||$(elObj.parentNode).attr("url");
                     var id=$(elObj).attr("id")||$(elObj.parentNode).attr("id");


                     var obj=that.dataMap[id];
                     if(that.fun){
                         that.fun(obj,id);
                     }else{
                         that.target.src=obj.url;
                     }

                 })

             }
		 });
	}
};
(function( $ ){  
  $.fn.newMenu = function(menuStructure) {
	var mName="tname"+(new Date()).getTime();
   	return new Menu(menuStructure,mName,$(this)[0]);
  };  
})(jQuery);  

