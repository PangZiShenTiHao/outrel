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
		//this.subSwapMaxHeight=300;
	},
	show : function(isShow) {
		var that=this;
		that.create();
	},
	create:function(){
		var that=this;
		var menuStr=['<div  id="'+that.menuId+'">'];
    menuStr.push('<div id="all-btn">全部分类</div>');
    menuStr.push('<div class="nav-dropdown">');
    var createFirstNodes= function(firstNodes,index){
      if(firstNodes){
        var firstNodeStr = ['<div class="level1-nav">'];
        firstNodeStr.push('<div class="level-inner">');
        firstNodeStr.push('<ul>');
        var substr = "";
        for(var i=0;i<firstNodes.length;i++){
          var node = firstNodes[i];
          var id = "firstNode"+that.menuName+"_"+i;
          that.dataMap[id]=node;
          var subicon = "";
          var astr = "";
		  var key = "";
		  var attrKey= "";
          if(node['subNodes']){
            subicon = '<i class="icon icon-arrow-right"></i>';
			key = 'bar_'+i;
			attrKey = 'data-key="'+key+'"';
            substr += createSubNode(node['subNodes'],key);//div#topbar_1
          }else{
            astr = 'url='+node["url"];
          }
          var li=('<li level="1"'+astr+' class="slide-animation inner-text"'+attrKey+'>'+node["text"]+''+subicon+'</li>');
          firstNodeStr.push(li);
        }
        firstNodeStr.push('</ul>');//封闭ul
        firstNodeStr.push('</div>');//封闭div.level-inner
        firstNodeStr.push('</div>');//封闭div.level1-nav
        firstNodeStr.push(substr);
        return firstNodeStr.join("");
      }
      return "";
    }
    var createSubNode=function(subNodes,key){
		if(subNodes){
		var id=key
		var subNodeStr=['<div id="'+id+'">'];
		subNodeStr.push('<div class="level1-content level2-nav">')
        subNodeStr.push('<div class="level-inner">');
        subNodeStr.push('<ul>');
        var thirdstr = "";
        for(var i=0;i<subNodes.length;i++){
            var node=subNodes[i];
            var id="subNode"+that.menuName+"_"+i;
            that.dataMap[id]=node;
            var subicon = "";
            var astr = "";
			var subKey = "";
			var attrKey= "";
            if(node['subNodes']){
            	subicon = '<i class="icon icon-arrow-right"></i>';
				subKey = key+'_'+i;
				attrKey = 'data-key="'+subKey+'"';
                thirdstr += createThirdNodes(node['subNodes'],subKey);
            }else{
                astr = 'url='+node["url"];
            }
            var li=('<li level="1" '+astr+' class="slide-animation inner-text"'+attrKey+'>'+subicon+''+node["text"]+'</li>');
            subNodeStr.push(li);
        }
        subNodeStr.push('</ul>');//封闭ul
        subNodeStr.push('</div>');//封闭div.level-inner
        subNodeStr.push('</div>');//封闭div.level2-nav
		subNodeStr.push(thirdstr);
		subNodeStr.push('</div>');
        return subNodeStr.join("");
			}
			return "";
		}
    var createThirdNodes=function(thirdNodes,key){
            if(thirdNodes){
			 var id=key
			 var thirdNodeStr=['<div id="'+id+'">'];
			 thirdNodeStr.push('<div class="level2-content">')
              thirdNodeStr.push('<div class="level-inner">');
              thirdNodeStr.push('<ul>');
                //var thirdNodeStr=['<ul  class="menu-three" id="'+id+'">'];
                for(var i=0;i<thirdNodes.length;i++){
                    var node=thirdNodes[i];
                    //var id=fid+"thirdNode"+index+"_"+i;
                    that.dataMap[id]=node;
                    that.subNodeIds.push(id);
                    thirdNodeStr.push('<li class="slide-animation inner-text" url="'+node["url"]+'">'+node["text"]+'</a></li>');
                }
                thirdNodeStr.push('</ul>');
                thirdNodeStr.push('</div>');
                thirdNodeStr.push('</div>');
				thirdNodeStr.push('</div>');
                return thirdNodeStr.join("");
            }
            return "";
        };
		var groupData=function(){
			//var h=window.screen.availHeight-140-(that.datas.length*40);
			//that.subSwapMaxHeight=(h>that.subSwapMaxHeight?h:that.subSwapMaxHeight);
      menuStr.push(createFirstNodes(that.datas));
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
    menuStr.push('</div>');//结束div.nav-dropdown
    menuStr.push('</div>');//结束div#that.menuId
    $(that.container).html(menuStr.join(""));
    that.addEvent();
	},
	addEvent:function(){
		function whichTransitionEvent() {
		  var t, n = document.createElement("fakeelement"),
		    e = {
		      animation: "animationend",
		      OAnimation: "oAnimationEnd",
		      MozAnimation: "animationend",
		      WebkitAnimation: "webkitAnimationEnd"
		    };
		  for (t in e)
		    if (void 0 !== n.style[t]) return e[t]
		};
		var that_ = this;
		$(function() {
		  var t;
		  function animationEnd(e,fun){
		    var n = whichTransitionEvent()
		    e.one(n,fun)
		  }
		  $("#all-btn").mouseenter(function(event){
		      var that = this;
		      $('.nav-dropdown').find('div').removeClass('slide-in').removeClass('slide-out');
		      $(that).siblings('.nav-dropdown').addClass('active');
		      var t = $(window).height() - $('#all-btn')[0].getBoundingClientRect().bottom;
		      $('.nav-dropdown').css({
		        height: t
		      });
		      var target = $('.level1-nav');
		      target.addClass('active slide-in');
		      animationEnd(target,function(){
		        target.removeClass('slide-in');
		      })
		  })
		  .mouseleave(function(event) {
		    var that = this;
		      var target = $(that).siblings('').find('.level1-nav');
		      target.addClass('slide-out');
		      animationEnd(target,function(){
		        target.removeClass('slide-out active').parents('.nav-dropdown').removeClass('active');
		      })
		  });
		   $(".nav-dropdown").mouseenter(function(event) {
		       var that = this;
		       $(that).find('div').removeClass('slide-in').removeClass('slide-out');
		       var thirdNode = $(that).find('.level2-content');
		       var subNode = $(that).find('.level1-content');
		       var firstNode = $(that).find('.level1-nav');
		       if(thirdNode.hasClass('active')){
		         thirdNode.find('.inner-text').removeClass('active');
		         thirdNode.addClass('slide-out');
		         animationEnd(thirdNode,function(){
		           thirdNode.removeClass('slide-out active');
		         })
		         subNode.find('.inner-text').removeClass('active');
		         subNode.addClass('slide-out');
		         animationEnd(subNode,function(){
		           subNode.removeClass('slide-out active');
		         })
		         firstNode.find('.inner-text').removeClass('active');
		         firstNode.addClass('slide-out');
		         animationEnd(firstNode,function(){
		           firstNode.removeClass('slide-out active');
		         })
		       }else if(subNode.hasClass('active')){
		         subNode.find('.inner-text').removeClass('active');
		         subNode.addClass('slide-out');
		         animationEnd(subNode,function(){
		           subNode.removeClass('slide-out active');
		         })
		         firstNode.find('.inner-text').removeClass('active');
		         firstNode.addClass('slide-out');
		         animationEnd(firstNode,function(){
		           firstNode.removeClass('slide-out active');
		         })
		       }else if(thirdNode.hasClass('active')){
		         thirdNode.find('.inner-text').removeClass('active');
		         thirdNode.addClass('slide-out');
		         animationEnd(thirdNode,function(){
		           thirdNode.removeClass('slide-out active');
		         })
		       }
		   })
		   .mouseleave(function(event) {
		     var that = this;
		       var thirdNode = $(that).find('.level2-content');
		       var subNode = $(that).find('.level1-content');
		       var firstNode = $(that).find('.level1-nav');
		       if(thirdNode.hasClass('active')){
		         thirdNode.find('.inner-text').removeClass('active');
		         thirdNode.addClass('slide-out');
		         animationEnd(thirdNode,function(){
		           thirdNode.removeClass('slide-out active');
		         })
		         subNode.find('.inner-text').removeClass('active');
		         subNode.addClass('slide-out');
		         animationEnd(subNode,function(){
		           subNode.removeClass('slide-out active');
		         })
		         firstNode.find('.inner-text').removeClass('active');
		         firstNode.addClass('slide-out');
		         animationEnd(firstNode,function(){
		           firstNode.removeClass('slide-out active');
		         })
		       }else if(subNode.hasClass('active')){
		         subNode.find('.inner-text').removeClass('active');
		         subNode.addClass('slide-out');
		         animationEnd(subNode,function(){
		           subNode.removeClass('slide-out active');
		         })
		         firstNode.find('.inner-text').removeClass('active');
		         firstNode.addClass('slide-out');
		         animationEnd(firstNode,function(){
		           firstNode.removeClass('slide-out active');
		         })
		       }else if(thirdNode.hasClass('active')){
		         thirdNode.find('.inner-text').removeClass('active');
		         thirdNode.addClass('slide-out');
		         animationEnd(thirdNode,function(){
		           thirdNode.removeClass('slide-out active');
		         })
		       }
		   });
		  $(".nav-dropdown .level1-nav").mouseenter(function(event) {
		    var that = this;
		    $(this).addClass('active').removeClass('slide-out slide-in');
		    $(".nav-dropdown").addClass('active');
		  })
		  .mouseleave(function(event){
		    var that = this;
		    $(this).addClass('slide-out');
		    animationEnd($(that),function(){
		      $(that).removeClass('slide-out active');
		    });
		  });

		  $(".nav-dropdown .level2-nav").mouseenter(function(event) {
		    var that = this;
		    $(this).removeClass('slide-out slide-in').addClass('active');
		    var sup_nav = $('.level1-nav').addClass('active').removeClass('slide-in slide-out');
		  })
		  .mouseleave(function(event){
		    var that = this;
		    $(this).addClass('slide-out');
		    animationEnd($(that),function(){
		      $(that).removeClass('slide-out active');
		      $('.level1-nav').addClass('slide-out');
		      animationEnd($('.level1-nav'),function(){
		        $('.level1-nav').removeClass('slide-out active');
		        $('.nav-dropdown').removeClass('active');
		      });
		    });
		  })

		  $(".nav-dropdown .level2-content").mouseenter(function(event) {
		    var that = this;
		    $(this).addClass('active').removeClass('slide-in slide-out');
		    $('.level1-nav').addClass('active').removeClass('slide-in slide-out');
		    $(this).parent().parent().children().first().addClass('active').removeClass('slide-in slide-out');
		  })
		  .mouseleave(function(event) {
		    var that = this;
		    $(this).addClass('slide-out');
		    animationEnd($(that),function(){
		      $(that).removeClass('slide-out active');
		      $('.level1-content').addClass('slide-out');
		      animationEnd($('.level1-content'),function(){
		        $('.level1-content').removeClass('slide-out active');
		        $('.level1-nav').addClass('slide-out');
		        animationEnd($('.level1-nav'),function(){
		          $('.level1-nav').removeClass('slide-out active');
		          $('.nav-dropdown').removeClass('active');
		        });
		      });
		    });
		  });
		  $(".slide-animation").mouseenter(function(event) {
		    var that = this;
		        var key = $(this).attr('data-key');
		        //是否存在下级内容
		        //存在下级
		        if(key){
		          $(this).addClass('active').siblings().removeClass('active');//当前li选中，其余兄弟li撤销选中
		          var par_nav = $(this).parents('.level-inner').parent('');//当前级别框
		          var target = par_nav.siblings('#'+key).children('div:eq(0)');//当前Li对应下级级别框
		          var t = par_nav.siblings('div').children('div:first-child.active');//其余的选中状态兄弟
		          var tc = t.siblings('div').children('div:first-child.active');
		          par_nav.removeClass('slide-in slide-out');//去除当前动画类，初始化最终状态，排除类名没有彻底清除
		          //是否存在其余的下级元素有被选中状态
		          if(t.length>0){//存在选中下级--同级li之间滑入改变
		            t.removeClass('active slide-out');//前一个滑入li存在子集元素，隐藏元素，滑入li对应的子集显示
		            target.addClass('active');
		            if(tc.length>0){
		              tc.addClass('active slide-out');
		              animationEnd(tc,function(){
		                tc.removeClass('slide-out active');
		              })
		            }
		          }else{
		            target.addClass('active slide-in')  //滑入li对应的子集滑入显示
		            animationEnd(target,function(){
		              target.removeClass('slide-in')
		            });
		          }
		        }else{
		          //不存在子集
		          $(this).siblings().removeClass('active');
		          var par_nav = $(this).parents('.level-inner').parent('');
		          //var target = par_nav.siblings('#'+key).children('div:eq(0)');
		          var t = par_nav.siblings('div').children('div:first-child.active');
		          if(t.length>0){
		            t.addClass('active slide-out');//前一个li 对应的子集滑出
		            animationEnd(t,function(){
		              t.removeClass('slide-out active');
		            })
		          }
		        }
		  })
		  .mouseleave(function(event) {
		    var that = this;
		    var key = $(this).attr('data-key');
		    if(key){
		      var par_nav = $(this).parents('.level-inner').parent('');
		      var target = par_nav.siblings('#'+key).children('div:eq(0)');
		      target.addClass('slide-out active');
		      animationEnd(target,function(){
		        $(that).removeClass('active');
		        target.removeClass('slide-out active');
		      })
		    }
		  });
		  $('.slide-animation[url]').bind('click',function(){
			  //var elObj=ev.srcElement||ev.target;
	          var url=$('this').attr("url");
	          var obj=$(this);
	          if(that_.fun){
	              that_.fun(obj);
	          }else{
	              that_.target.src=url;
	          }
		});
		});
	}
	
	// addEvent:function(){
  //   function addSecondEvent(id){
  //     var obj=$("#"+id+"");
  //     if(obj.parent("li").attr("level")=="2"){
  //       if( obj.hasClass("menu-show-li")){
  //           obj.siblings().slideUp(300);
  //           $(obj.parent("li")).removeClass("menu-show");
  //           obj.removeClass("menu-show-li");
  //       }else{
  //           var otherli = obj.parent("li").siblings().find("ul");
	//
  //           $(otherli).slideUp(300);
  //           $(obj.parent("li").siblings()).removeClass("menu-show");
	//
  //           obj.siblings().slideDown(300);
	//
	//
  //           $(".menu-show-li").removeClass("menu-show-li");
  //           $(obj.parent("li")).addClass("menu-show");
  //           $(obj).addClass("menu-show-li");
  //       }
  //     }
  //   }
  //   $(".menu-two li").bind("click",function(ev,el){
  //     var elObj=ev.srcElement||ev.target;
  //     addSecondEvent($(elObj).attr("id")||$(elObj.parentNode).attr("id"));
  //   });
	// 	var that=this;
	// 	 $(function() {
  //      $("#all-btn").mouseenter(function(event){
	// 			 var that = this;
  //        clearTimeout();
  //        setTimeout(function(){
  //          $(that).addClass('active').find('.nav-dropdown').addClass('active').find('.level1-nav').addClass('active');
  //        },100);
  //      }).mouseout(function(event) {
	// 			 var that = this;
  //        clearTimeout();
  //        setTimeout(function(){
  //          $(that).removeClass('active').find('.nav-dropdown').removeClass('active').find('.level1-nav').removeClass('active');
  //        },100);
  //      });
	//
	//
	// 	 });
	// }
};
(function( $ ){
  $.fn.newMenu = function(menuStructure) {
	var mName="tname"+(new Date()).getTime();
   	return new Menu(menuStructure,mName,$(this)[0]);
  };
})(jQuery);
