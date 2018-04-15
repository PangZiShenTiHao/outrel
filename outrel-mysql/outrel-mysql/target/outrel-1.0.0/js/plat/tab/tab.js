function Tabs(tabStructure, tabsName, container) {
    this.tabStructure = tabStructure;
    this.tabsName = tabsName;
    this.ulName = tabsName + "_ul";
    this.container = container || $("body");
    this.activeIframe="";
    this.tabMap={};
    this.tabsObj;
    this.tabsCount = 0;
    this.init();
}
Tabs.prototype = {
    init: function () {
        var that = this;
        this.isClose = this.tabStructure.isClose;
        this.tabList = this.tabStructure.tabList;
        this.tabIndex = this.tabStructure.tabIndex || 1;
        this.reBuildUrl=this.tabStructure.reBuildUrl;
        this.closeFun=this.tabStructure.closeFun;
        this.isFullLoad=this.tabStructure.isFullLoad;
        this.switchFun=this.tabStructure.switchFun;
        this.titleMap={};
        $('<div class="tabs" id="' + this.tabsName + '" style="overflow:hidden"></div>').appendTo(that.container);
        this.create();
        this.showMove();
    },
    createTitle: function (tab) {
        var that = this;
        that.tabMap[tab["id"]]=tab;
        var close = "";
        if (that.isClose) {
        	if(!(undefined!=tab.isLock&&tab.isLock==true)){
        		close = '<span class="ui-icon ui-icon-close"  style="float:right;   display:-moz-inline-stack;"  role="presentation">移除</span>';
        	}
        } 
        var icon="";
        if(tab.icon)
        {
            icon='style=" background: url('+tab.icon+') center left 5px no-repeat; text-indent:15px ; "';
        }
        return ('<li style=" display: inline-block; float: none;" url="' + that.reUrl(tab.url) + '" index="' + that.tabsCount + '" extTitle="'+tab.title+'" linkPanel="'+tab.id+'" ><a id="'+tab.id+'_" href="#'+tab.id+'" '+icon+'>' + tab.title + '</a>' + close + '</li>');

    },
    createContent: function (tab,index) {
        var that = this;
        var content = "";
        if (tab.content) {
            content = '<div class="tabContent" id="' + tabName + '">' + tab.content + '</div>';
        }
        if (tab.url) {
        	var url=that.reUrl(tab.url);
            var isLoad = "";
            var src="";
            if(that.isFullLoad){
            	 isLoad = "isLoad=true ";
     	         src = ' src= "' + url + '"';
            }else if(tab.isLoad){
	           	 isLoad = " isLoad=true ";
	 	         src = ' src= "' + url + '"';
            }else{
            	if((that.tabIndex-1)==index){
            		isLoad = "isLoad=true;";
            		src = ' src= "' + url + '"';
            	}
            }
            var iframeName=tab.id + "_Iframe" ;
            that.titleMap[tab["title"]]=iframeName;
            content = '<div class="tabContent" id="' + tab.id + '" ' + isLoad + ' extSrc="' + url+ '"><iframe ' + src + ' width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0"  style="width:100%;height:100%;border:0px; margin:0px;padding:0px;" id="' + iframeName + '" name="' + tab.content + '"></iframe></div>';
        }
        return content;
    },
    showMove:function(){
        var that=this;
        var tabObj=$("#"+that.tabsName);
        if(tabObj.find("li:last").offset().left+tabObj.find("li:last").width()> tabObj.width()+tabObj.offset().left)
        {
            var curUl=$("#" + that.ulName);
            curUl.width(function(n,c){
                return tabObj.find("li:last").offset().left+tabObj.find("li:last").width();
            });

            $("#right_" + that.tabsName).css("display","block");
        }
    },
    reUrl:function(url){
    	if(this.reBuildUrl){
    		return this.reBuildUrl(url);
    	}
    	return url;
    },
    create: function () {
        var that = this;
        if (that.tabList) {
            var tabTitles = ['<div id="close_all_' + that.tabsName + '"  style="display:none"><button class="close-all" id="btn_close_all_' + that.tabsName + '">全部关闭</button></div><div class="tabMove tab_moveLeft" id="left_'+that.tabsName+'"></div><ul class="tabRadius" id="' + that.ulName + '" style="  white-space: nowrap; ">'];
            var contents = [];
            for (var i = 0; i < that.tabList.length; i++) {
                that.tabsCount++;
                var tab = that.tabList[i];
                tab["id"]=tab.id || (that.tabsName + that.tabsCount);
                tabTitles.push(that.createTitle(tab));
                contents.push(that.createContent(tab, i));
            }
            tabTitles.push('</ul><div class="tabMove tab_moveRight" id="right_'+that.tabsName+'"></div>');
            $("#" + that.tabsName).html(tabTitles.join("") + contents.join(""));
            that.tabsObj = $("#" + that.tabsName).tabs({
            		activate: function( event, ui ) {
            		  var panel=ui.newTab[0];
            		  if(panel){
            			 var linkPanelId= $(panel).attr("linkPanel");
            			 var linkPanel=$("#"+linkPanelId);
            			 if(that.switchFun){
            				 that.switchFun(that.tabMap[linkPanelId]);
            			 }
            			 var url=linkPanel.attr("extSrc");
            			 
            			 var tabObj=that.tabMap[linkPanelId];
            			 if(tabObj.isDialog&&(!linkPanel.attr("isDialog"))){
            				 linkPanel.attr("isDialog",true);
            				 var dialogStruct={
            						 'title':tabObj.title,
            						 'display':url,
            						 'width':tabObj.dialogW||'900',
            						 'height':tabObj.dialogH||'700',
            						 'modal':false,
            						 'closeFun':function(){
            							 linkPanel.attr("isDialog","");
            						 },
            						 'buttons':[
            						            {'text':'关闭','action':function(){
            						            	linkPanel.attr("isDialog","");
            						            },'isClose':true}
            						 ]
            				  };
            				  window.top.windowTopDialog(dialogStruct);
            			 }else{
            				 if(!linkPanel.attr("isLoad")){
                				 var iframe=linkPanel.find("iframe")[0];
                				 if(iframe){
                					that.activeIframe=iframe;
                					iframe.src=linkPanel.attr("extSrc");
                					linkPanel.attr("isLoad",true);
                				 }
                			 }
            			 }
            		  }
            			
            	  }
            });
            that.tabsObj.find(".ui-tabs-nav").sortable({
                axis: "x",
                stop: function () {
                    that.tabsObj.tabs("refresh");
                }
            });
            that.tabsObj.delegate("span.ui-icon-close", "click", function (obj) {
            	var id=obj.target.previousSibling.hash.replace("#","");
            	var title=obj.target.previousSibling.innerText;
            	var win=that.getTabWinByTitle(title);
            	var activeObj=that.tabMap[id];
            	var panelObj=$(this);
            	var callCloseFun=function(){
            		that.close(title);
//            		 var panelId = panelObj.closest("li").remove().attr("aria-controls");
//                     $("#" + panelId).remove();
//                     that.tabsObj.tabs("refresh");
            	}
            	if(activeObj.closeFun){
            		activeObj.closeFun(win,callCloseFun);
            	}else if(that.closeFun){
            		that.closeFun(callCloseFun);
            	}else{
            		callCloseFun();
            	}
            });
            that.tabsObj.find(".ui-tabs-nav").bind("contextmenu",function(e){
                return false;
            });

            that.tabsObj.delegate(".ui-tabs-nav li","mouseup",function(e){
                var oEvent = window.event;
                if (oEvent.button == 2) {


                    var objDiv = $("#close_all_" + that.tabsName);
                    $(objDiv).css("display", "block");
                    $(objDiv).css("position", "absolute");
                    $(objDiv).css("z-index", "999");
                    $(objDiv).css("left", event.clientX-250);
                    $(objDiv).css("top", event.clientY-40);

                }
            });
            that.tabsObj.delegate(".ui-tabs-nav","click",function(e){
                $("#close_all_" + that.tabsName).css("display","none");
            });

            $("#btn_close_all_" + that.tabsName).bind('click', function () {
                $("#" + that.ulName).find("li").each(function(){
                    if(! $(this).is(":first-child"))
                    {
                        var panelId = $(this).closest("li").remove().attr("aria-controls");
                        $("#" + panelId).remove();
                    }
                });

                that.tabsObj.tabs("refresh");
                var objDiv = $("#close_all_" + that.tabsName);
                $(objDiv).css("display","none");


            });
            $("#left_" + that.tabsName).bind('click',function(){
                var  move=this;
                var pleft=   $("#"+that.tabsName).offset().left;
                $("#"+that.ulName).offset(function(n,c){
                    var    newPos=new Object();
                    var left=c.left+100;
                    if(left>pleft)
                    {
                        left=pleft;
                        move.style.display="none";
                    }
                    if($(this).width()+left> $("#"+that.tabsName).width())
                    {
                        $("#right_" + that.tabsName).css("display","block");
                    }

                    newPos.left=left;

                    return newPos;
                });

            });
            $("#right_" + that.tabsName).bind('click',function(){
                var  move=this;

                $("#"+that.ulName).offset(function(n,c){
                    var    newPos=new Object();
                    var tabObj=$("#"+that.tabsName);
                    var left=c.left-100;

                    if( $(this).find("li:last").offset().left+$(this).find("li:last").width()<= tabObj.width()+tabObj.offset().left)
                    {
                        left=  tabObj.width()+tabObj.offset().left-$(this).width();
                        move.style.display="none";
                    }


                    if($(this).width()+left> tabObj.width())
                    {
                        $("#left_" + that.tabsName).css("display","block");
                    }

                    newPos.left=left

                    return newPos;
                });
            });
        }
    },
    add: function (tabPojo) {
        var that = this;
        var index = 0;
        var ifFind = false;
        /**
         * 激活当前标签
         * */
        $("#" + that.ulName).find("li").each(
            function () {
                index++;
                if ($(this).attr("url") == tabPojo.url) {
                    that.tabsObj.tabs("option", "active", index - 1);
                    ifFind = true;
                    return;
                }
            }
        );
        /**
         * 新增并且及活当前标签
         * **/
        if (!ifFind) {
            that.tabsCount++;
            tabPojo["id"]= tabPojo.id || (that.tabsName + that.tabsCount);
            $("#" + that.ulName).append(that.createTitle(tabPojo));
            $("#" + that.tabsName).append(that.createContent(tabPojo));
            that.tabsObj.tabs("refresh");
            that.tabsObj.tabs("option", "active", index);
            that.tabList.push(tabPojo);

        }
        var curUl=$("#" + that.ulName);
        var  curTab=curUl.find(".ui-tabs-active");
        var tabObj=$("#"+that.tabsName);
        var left=curTab.offset().left+curTab.width()-tabObj.offset().left;
        if( left>tabObj.width())
        {
            left=left-tabObj.width();
            curUl.offset({left:tabObj.offset().left-left-5});
            if(curUl.nextAll().length)
            {
                curUl.width(function(n,c){
                    return c+curTab.width();
                });
                tabObj.find("#right_" + that.tabsName).css("display","none");
            }
            else
            {
                tabObj.find("#right_" + that.tabsName).css("display","block");
            }
            tabObj.find("#left_" + that.tabsName).css("display","block");
        }
    },
    close: function (title) {
        var that = this;
        var doClose = function (panelId) {
            $("#" + panelId).remove();
            that.tabsObj.tabs("refresh");
            for(var i=0;i<that.tabList.length;i++){
            	var tab=that.tabList[i];
            	if(tab.id==panelId){
            		that.tabList.splice(i,1);
            		that.titleMap[tab["title"]]=undefined;
            	};
            }
        };
        if (title) {
            $("#" + that.ulName).find("li a").each(function () {
                if ($(this).text() == title) {
                    var panelId = $(this).parent("li").remove().attr("aria-controls");
                    doClose(panelId);
                }
            });
        }
        else {
            var panelId = $("#" + that.ulName).find(".ui-tabs-active").remove().attr("aria-controls");
            doClose(panelId);
        }
    },
    replaceIconByTitle:function(title,url)
    {
        var that=this;
        var iconLi=$("#" + that.ulName).find("li[exttitle='"+title+"']");

        iconLi.find("a").css("background","url("+url+") center left 5px no-repeat");
    },
    changeTitleStyleByName:function(title,style){
    	 var that=this;
         var iconLi=$("#" + that.ulName).find("li[exttitle='"+title+"']");
         var obj=iconLi.find("a");
         for(var key in style){
        	 obj.css(key,style[key]);
         }
    },
    activeByIndex: function (index) {
    	this.tabsObj.tabs("option", "active", index - 1);
    },
    activeByTitle:function(title){
    	var that=this;
    	var i=0;
    	for(t in that.titleMap){
    		i++;
    		if(t===title){
    			that.activeByIndex(i);
    			break;
    		}
    	}
    },
    getActiveIframe:function(){
    	var v_tabId = $("#"+this.tabsName).find(".ui-tabs-active a").attr("id");
    	var v_actIfrWind = $("#"+v_tabId+"Iframe")[0].contentWindow;
    	return v_actIfrWind;
    },
    getActiveObj:function(){
    	var v_tabId = $("#"+this.tabsName).find(".ui-tabs-active a").attr("id");
    	v_tabId = v_tabId.replace("_","");
    	return this.tabMap[v_tabId];
    },
 
    refreshByTitle: function (title) {
    	this.getTabWinByTitle(title).location.reload();
    },
    getTabWinByTitle:function(title){
    	if(title){
	    	var frm=document.getElementById(this.titleMap[title]);
	    	if(frm){
	    		return frm.contentWindow;
	    	}
    	};
    	return null;
    },
    changeTitleByIndex:function(index,newTitle){
    	var that=this;
    	var tabPojo=that.tabList[index];
    	if(tabPojo){
    		tabPojo["title"]=newTitle;
    		that.tabList[index]=tabPojo;
    		var tabName= tabPojo.id || (that.tabsName + that.tabsCount);
    		$("#"+tabName+"_").html(newTitle);
    	}
    },

    refreshByIndex:function(index){
    	var tabPojo=this.tabList[index];
    	this.refreshByTitle(tabPojo["title"]);
    }
};
(function ($) {
    $.fn.newTabs = function (tabStructure) {
        var tname = "tname" + (new Date()).getTime() + "tabs";
        return new Tabs(tabStructure, tname, $(this)[0]);
    };
})(jQuery);

