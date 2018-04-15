//填充[模板类型]下拉框
function fillSelect(selectId, optValues,childModuleType) {
	var selectType = $(selectId);
	selectType.empty();
	var indexTemp = 0;
	if(optValues){
		for ( var p in optValues.value) {
			if (indexTemp > 0) {
				var option = $("<option>").text(optValues.value[p].text).val(optValues.value[p].value);
				if(optValues.value[p].value==childModuleType){
					option.attr({"selected":"selected"});
				}
				selectType.append(option);
			}
			indexTemp++;
		}
		$(selectId).change();
		$(selectId).removeAttr("notnull");
		removeNullCss($(selectId));
	}else{
		var option = $("<option>").text('请选择').val("");
		selectType.append(option);
		$(selectId).change();
		$(selectId).attr("notnull","true");
		setNullCss($(selectId));
	}
}