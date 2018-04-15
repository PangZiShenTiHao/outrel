/*----------------------------------------------------平台tab公共操作----------------------------------------------------*/
//获取当前活动tab的标题
function getActiveTabTitle() {
	return window.top.tabs.getActiveObj().title;
}

//关闭tab(按照tab标题)
function closeTab(tabTitle) {
	window.top.tabs.close(tabTitle);
}

//关闭tab(按照tab标题),并且刷新父tab
function closeTab(tabTitle, parentTitle) {
	if(parentTitle) {
		window.top.tabs.activeByTitle(parentTitle);
		flushTab(parentTitle)
	}
	
	window.top.tabs.close(tabTitle);
}

//关闭tab(按照tab标题),并且刷新父tab
function closeTabAndFlushP(tabTitle, parentTitle) {
	if(parentTitle) {
		flushTab(parentTitle);
	}
	
	window.top.tabs.close(tabTitle);
}

//确定并关闭tab(按照tab标题)
var closeBit=0;
function closeTabWithConfirm(tabTitle,parentTitle,closeFun) {
	window.top.tabs.activeByTitle(tabTitle);
	if(closeBit<1){
		closeBit=1;
		jyDialog().confirm("您确认要关闭当前窗口吗？", function(){debugger;
			//closeFun(tabTitle);
			if(parentTitle) {
				flushTab(parentTitle);
			}
			window.top.tabs.close(tabTitle);
		},"",function(){
			closeBit=0;
		});
	}
}

//刷新指定的tab(按照tab标题)
function flushTab(tabTitle) {
	var winObj=window.top.tabs.getTabWinByTitle(tabTitle);
	if(winObj){
		window.top.tabs.activeByTitle(tabTitle);
		winObj.queryData();
	}
}
/*----------------------------------------------------平台tab公共操作----------------------------------------------------*/


/*----------------------------------------------------获取选择的地区----------------------------------------------------*/
/**
 * 单级地区节点-根据ID获取地区名称
 * @param selectedId
 * @returns {String}
 */
function getSelectedAreaText(selectedId) {
	var areaText="";
	if($("#"+selectedId+" option:selected").val() != "") {
		areaText=$("#"+selectedId+" option:selected").text();
	}
	
	return areaText;
}

/**
 * 解析选择的地区的中文显示全称
 * @param id
 * @returns {String}
 */
function getFullAreaText(id) {
	return getSelectedAreaText("p"+id)+getSelectedAreaText("c"+id)+getSelectedAreaText("dto"+id);
}
/*----------------------------------------------------获取选择的地区----------------------------------------------------*/