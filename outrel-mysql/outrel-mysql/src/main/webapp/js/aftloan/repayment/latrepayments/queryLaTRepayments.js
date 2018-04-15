//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(repaymentType) {
    var dialogStruct = {
        'display': contextRootPath + '/laTRepayments/prepareExecute/toAdd?repaymentType=' + repaymentType,
        'width': 1100,
        'height': 600,
        'title': '新增',
        'buttons': [
            {'text': '保存', 'action': doAddFrom},
            {'text': '关闭', 'isClose': true}
        ]
    };

    dialogAddObj = jyDialog(dialogStruct);
    dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom() {
    var obj = dialogAddObj.getIframe();

    //序列化 新增页面的form表单数据
    if (!checkIsNull(obj.$("#addNewsFormData"))) return;
    var debitAmt = obj.$("#dtodebitAmt").val();
    var creditAmt = obj.$("#dtocreditAmt").val();
    var balanceAmt = obj.$("#dtobalanceAmt").val();
    var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;

    if (debitAmt != '') {
        if (!exp.test(debitAmt)) {
            jyDialog({"type": "info"}).alert("请输入正确借方金额！");
            return;
        }
    }
    if (creditAmt != '') {
        if (!exp.test(creditAmt)) {
            jyDialog({"type": "info"}).alert("请输入正确贷方金额！");
            return;
        }
    }
    if (balanceAmt != '') {
        if (!exp.test(balanceAmt)) {
            jyDialog({"type": "info"}).alert("请输入正确账户余额！");
            return;
        }
    }
    if (debitAmt != '' && creditAmt != '') {
        jyDialog({"type": "info"}).alert("贷方金额和借方金额不能同时不为空！");
        return;
    }
    // if (Number(balanceAmt) < Number(debitAmt)) {
    //     jyDialog({"type": "info"}).alert("账户余额不可小于借方金额！");
    //     return;
    // }
    var params = obj.$("#addNewsFormData").serialize();
    var url = contextRootPath + '/laTRepayments/insertLaTRepayments';
    //通过ajax保存
    jyAjax(
        url,
        params,
        function (msg) {
            //新增成功后，
            $("").newMsg({}).show(msg.msg);
            var v_status = msg.status;
            if (v_status.indexOf('ok') > -1) {
                //新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                dialogAddObj.close();
                queryData();
            }
        });
}

//修改页面 的 保存操作
function doUpdate(stat) {
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    // var allotStat = iframe.iframeObj["table"].getSelectedObjs("allotStat");
    // var claimStat = iframe.iframeObj["table"].getSelectedObjs("claimStat");

    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "info"}).alert("请选择待操作的数据！");
        return;
    }
    //只能撤销已分配的并且待认款的
    // if ("1" == stat) {
    //     if (allotStat == "1") {
    //         jyDialog({"type": "info"}).alert("只能撤销已分配的数据！");
    //         return;
    //     }
    //     if (claimStat != "1") {
    //         jyDialog({"type": "info"}).alert("只能撤销待认款的数据！");
    //         return;
    //     }
    // }
    // //只能分配待分配的
    // if ("1" != stat) {
    //     if (allotStat != "1") {
    //         jyDialog({"type": "info"}).alert("只能分配待分配的数据！");
    //         return;
    //     }
    // }
    jyDialog({"type": "question"}).confirm("您确认要操作选择的数据吗？", function () {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: contextRootPath + "/laTRepayments/updateLaTRepayments?ids=" + v_ids + "&allotStat=" + stat,
            success: function (msg) {
                $("").newMsg({}).show(msg.msg);
                var v_status = msg.status;
                //成功后
                if (v_status.indexOf('ok') > -1) {
                    queryData();
                }
            }
        });
    }, "确认提示");

}
//删除 事件
function deleteData() {
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    // var isHand = iframe.iframeObj["table"].getSelectedObjs("isHand");
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "info"}).alert("请选择待删除的数据！");
        return;
    }
    // if (isHand != '1') {
    //     jyDialog({"type": "info"}).alert("只能删除手工添加流水！");
    //     return;
    // }

    jyDialog({"type": "question"}).confirm("您确认要删除选择的数据吗？", function () {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: contextRootPath + "/laTRepayments/deleteLaTRepayments?ids=" + v_ids,
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
//查看明细
function toClaim() {
    var vId = iframe.iframeObj["table"].getSelectedIds().join(",");
    var claimStat = iframe.iframeObj["table"].getSelectedObjs("claimStat");
    //如果没有选中 数据则
    if (vId == "") {
        jyDialog({"type": "info"}).alert("请选择数据！");
        return;
    }
    if (claimStat != '3' && claimStat != '4' && claimStat != '5') {
        jyDialog({"type": "info"}).alert("该流水未完成还款处理操作!");
        return;
    }
    var dialogStruct = {
        'display': contextRootPath + '/laTRepayments/prepareExecute/toClaim?id=' + vId,
        'width': 800,
        'height': 500,
        'title': '查看明细',
        'buttons': [
            {'text': '关闭', 'isClose': true}
        ]
    };

    var dialogView = jyDialog(dialogStruct).open();
}


//查看明细
function viewData(vId) {
    var dialogStruct = {
        'display': contextRootPath + '/laTRepayments/prepareExecute/toView?id=' + vId,
        'width': 900,
        'height': 700,
        'title': '查看明细',
        'buttons': [
            {'text': '关闭', 'isClose': true}
        ]
    };

    var dialogView = jyDialog(dialogStruct).open();
}