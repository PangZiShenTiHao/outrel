/**
 *@description 生成省-市-区县三级联动下拉列表
 *@author
 *@date 20141023 20:19
 * eg: 在页面初始化方法中调用 $.jyarea.init({divId:'test',level:3,defaultVal:['110000','110100','110101']});;		
 * 说明：test为所属DIV容器的ID
 * 	   level值为是2级展示还是3级展示，默认3级
 *     defaultVal:默认初始数组[省，市，县]，值为cityCode，且顺序不能更改
 */

function loadArea(obj){
	var array = obj.title.split(',');
	for(var i=0;i<array.length;i++){
		$('#' + array[i]).html('<option value="">--请选择--</option>');
	}
	var areaCode = "";
	if(obj.value != null && obj.value != ""){
		areaCode = obj.value;
		$.ajax({
			url: contextRootPath + '/sysArea/queryAreaByCode/' +areaCode ,
			type: 'POST',
			async: false,
			dataType: 'json',
			data:'',
			error: function() {
				jyDialog({"type":"error"}).alert("获取城市列表错误！");
				//alert('获取城市列表错误');
			},
			success: function(result) {
				var areas = result.data;
				for (var j = 0; j <= areas.length - 1; j++) {
					$('#'+obj.title).append("<option value='"+areas[j].AREACODE+"'>"+areas[j].AREANAME+"</option>");
				}
			}
		});
	}
	
	
}

