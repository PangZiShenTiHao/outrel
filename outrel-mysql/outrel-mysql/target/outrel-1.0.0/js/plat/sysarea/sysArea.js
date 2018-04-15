/**
 *@description 生成省-市-区县三级联动下拉列表
 *@author
 *@date 20141023 20:19
 * eg: 在页面初始化方法中调用 $.jyarea.init({'divId':'test'});	
 * 说明：test为所属DIV容器的ID
 */
(function($) {
	var currentTime = new Date().getTime();
	$.jyarea = {
		init: function(options) {
			var defaults = {
				"divId": "areaListId", //所属容器ID	
				"proviceId": "s_province", //省ID
				"cityId": "s_city", //城市ID
				"countryId": "s_country" //区县ID
			};
			var opts = $.extend(defaults, options);
			$(this).data('settings', opts);
			$(this).each(function() {
				this.createHtml(opts);
				this.loadArea(opts.proviceId, 0);
			});

			$('#' + opts.proviceId).bind('change', function() {
				$('#' + opts.cityId).html('<option value="">--请选择--</option>');
				$('#' + opts.countryId).html('<option value="">--请选择--</option>');
				$.jyarea.loadArea(opts.cityId, $(this).val());
			});
			$('#' + opts.cityId).bind('change', function() {
				$('#' + opts.countryId).html('<option value="">--请选择--</option>');
				$.jyarea.loadArea(opts.countryId, $(this).val());
			});

		},
		createHtml: function(opts) {
			var temp = '<label>省、直辖市：</label><select id="' + opts.proviceId + '" name="' + opts.proviceId + '"><option value="">--请选择--</option></select>&nbsp;&nbsp;';
			temp += '<label>市：</label><select id="' + opts.cityId + '" name="' + opts.cityId + '"><option value="">--请选择--</option></select>&nbsp;&nbsp;';
			temp += '<label>区县：</label><select id="' + opts.countryId + '" name="' + opts.countryId + '"><option value="">--请选择--</option></select>&nbsp;&nbsp;';
			$("#" + opts.divId).html(temp);
		},
		loadArea: function(c, p) {
			var ragex = /^[0-9]+.?[0-9]*$/;
			if (!ragex.test(p)) {
				return;
			}
			$.ajax({
				url: contextRootPath + '/sysArea/queryListSysAreaByParentId',
				type: 'POST',
				async: false,
				dataType: 'json',
				data: {
					parentId: p,
					t:currentTime
				},
				error: function() {
					alert('获取城市列表错误');
				},
				success: function(result) {
					var citys = result.data;
					for (var j = 0; j <= citys.length - 1; j++) {
						$('#' + c).append('<option value="' + citys[j].id + '" code="'+citys[j].areaCode+'">' + citys[j].areaName + '</option>');
					}
				}
			});

		}
	};
})(jQuery);