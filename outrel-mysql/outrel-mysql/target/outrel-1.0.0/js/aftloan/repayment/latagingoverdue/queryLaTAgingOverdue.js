//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(id){
	var dialogStruct={
		'display':contextRootPath+'/laTAgingOverdue/prepareExecute/toAdd?agingId='+id,
		'width':800,
		'height':500,
		'title':'新增配置',
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	// if(!checkIsNull(obj.$("#addNewsFormData"))){} return;

    var id_array=new Array();
    obj.$('input[name="overAging"]:checked').each(function(){
        id_array.push($(this).val());//向数组中添加元素
    });
    var idstr=id_array.join(',');//将数组元素连接起来以构建一个字符串
    if(idstr ==''){
        jyDialog({"type":"info"}).alert("请选择逾期账龄！");
	}

    var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTAgingOverdue/insertLaTAgingOverdue';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                dialogAddObj.close();
        		queryData();
        	}
  	});
}

// 事件
function toUpdateData(type,agingId){
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    //如果没有选中 数据则
    if(v_ids == ""){
        jyDialog({"type":"info"}).alert("请选择待操作的数据！");
        return;
    }

    jyDialog({"type":"question"}).confirm("您确认要操作选择的数据吗？",function(){
        $.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTAgingOverdue/updateLaTAgingOverdueById?ids="+v_ids+"&type="+type+"&agingId="+agingId,
            success:function(msg){
                $("").newMsg({}).show(msg.msg);
                var v_status = msg.status;
                //成功后
                if(v_status.indexOf('ok') >-1){
                    queryData();
                }

            }
        });
    },"确认提示");
}
