/**
 * 根据行业ID，获取职位
 * @param obj
 */
function loadPosition(obj){
	$('#s_position_id').html("<option value=''>请选择</option>");
	$.ajax({
		url: contextRootPath + '/sysIndustry/queryPositionByIndustry/' +obj.value ,
		type: 'POST',
		async: false,
		dataType: 'json',
		data:'',
		error: function() {
			//alert('获取职位列表错误');
		},
		success: function(result) {
			var positions = result.data;
			for (var j = 0; j <= positions.length - 1; j++) {
				$('#s_position_id').append("<option value='"+positions[j].INDUSTRYCODE+"'>"+positions[j].INDUSTRYNAME+"</option>");
			}
		}
	});
}