//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData() {
    var dialogStruct = {
        'display': contextRootPath + '/laTRepaymentBatch/prepareExecute/toAdd',
        'width': 800,
        'height': 500,
        'title': '新增',
        'buttons': [
            {'text': '保存', 'action': subimtBtn},
            {'text': '关闭', 'isClose': true}
        ]
    };

    dialogAddObj = jyDialog(dialogStruct);
    dialogAddObj.open();
}


function subimtBtn() {
    var obj = dialogAddObj.getIframe();
    if (obj.$("#batchType").val() == '') {
        jyDialog({"type": "info"}).alert("请选择文件类型！");
        return;
    }
    if (obj.$("#batchFile").val() == '') {
        jyDialog({"type": "info"}).alert("请选择文件！");
        return;
    }
    var form = obj.$("#addNewsFormData");
    form.attr("action", contextRootPath + '/laTRepaymentBatch/insertLaTRepaymentBatch?batchType=' + obj.$("#batchType").val());

    jyDialog({"type": "question"}).confirm("您确认要导入吗？", function () {
        var mask = $("").newMask();
        mask.show();
        form.ajaxSubmit(function (response) {
            var dataObj = eval("(" + response + ")"); // 转换为json对象
            var v_status = dataObj.status;
            if (v_status.indexOf('ok') > -1) {
                iframe.iframeObj["table"].query();
                jyDialog({"title": "test", "type": "success"}).alert(dataObj.msg);
                dialogAddObj.close();
            } else {
                jyDialog({"title": "test", "type": "error"}).alert(dataObj.msg);
            }
            mask.close();
        });
    }, "确认提示");
}


//查看明细
function viewData(vId) {
    if (vId == undefined) {
        vId = iframe.iframeObj["table"].getSelectedIds().join(",");
    }
    //如果没有选中 数据则
    if (vId == "") {
        jyDialog({"type": "info"}).alert("请选择数据！");
        return;
    }
    var dialogStruct = {
        'display': contextRootPath + '/laTRepaymentBatch/prepareExecute/toView?id=' + vId,
        'width': 800,
        'height': 500,
        'title': '查看明细',
        'buttons': [
            {'text': '关闭', 'isClose': true}
        ]
    };

    var dialogView = jyDialog(dialogStruct).open();
}
//查看批次明细
function viewBatchData1(batchNo) {
    //如果没有选中 数据则
    if (batchNo == "") {
        jyDialog({"type": "info"}).alert("请选择数据！");
        return;
    }
    var dialogStruct = {
        'display': contextRootPath + '/laTRepaymentBatch/prepareExecute/toBatchNoView?batchNo=' + batchNo,
        'width': 1100,
        'height': 800,
        'title': '查看批次明细',
        'buttons': [
            {'text': '关闭', 'isClose': true}
        ]
    };

    var dialogView = jyDialog(dialogStruct).open();
}

//删除 事件
function deleteData() {
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var batchNo = iframe.iframeObj["table"].getSelectedObjs("batchNo");
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "info"}).alert("请选择待删除的数据！");
        return;
    }

    jyDialog({"type": "question"}).confirm("您确认要删除选择的数据吗？", function () {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: contextRootPath + "/laTRepaymentBatch/deleteLaTRepaymentBatch?ids=" + v_ids,
            success: function (msg) {
                jyDialog({"type": "info"}).alert(msg.msg);
                var v_status = msg.status;
                //删除成功后
                if (v_status.indexOf('ok') > -1) {
                    iframe.iframeObj["table"].removeSelectedRow();
                }
            }
        });
    }, "确认提示");
}