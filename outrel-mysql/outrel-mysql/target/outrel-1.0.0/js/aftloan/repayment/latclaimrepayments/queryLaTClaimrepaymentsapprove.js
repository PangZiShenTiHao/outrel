//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate;
var dialogReject;
var dialogView;
var dialogRescind;
//修改 事件
function toApprove() {
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var obj = iframe.iframeObj["table"].getSelectedObjs();
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "warn"}).alert("请选择待审批的数据！");
        return;
    }
    //如果选择多个 择提示
    if (v_ids.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("请选择一条数据！");
        return;
    }
    if (obj[0]["auditStat"] != "2") {
        jyDialog({"type": "warn"}).alert("只能审批单据状态为待审批的数据！");
        return;
    }

    var dialogStruct = {
        'display': contextRootPath + '/laTClaimrepaymentsApprove/prepareExecute/toApprove?id=' + v_ids,
        'width': 1100,
        'height': 750,
        'title': '还款信息审批',
        'buttons': [
            {'text': '入账', 'action': doPost},
            {'text': '驳回', 'action': toReject}
        ]
    };

    dialogUpdate = jyDialog(dialogStruct);
    dialogUpdate.open();
}

function toRescind() {
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var obj = iframe.iframeObj["table"].getSelectedObjs();
    var auditTime = new Date(obj[0]["auditTime"]).format("yyyy-MM-dd");
    var currentdate = getNowFormatDate();
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "warn"}).alert("请选择撤销的数据！");
        return;
    }
    //如果选择多个 择提示
    if (v_ids.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("请选择一条数据！");
        return;
    }

    if (obj[0]["auditStat"] != "3") {
        jyDialog({"type": "warn"}).alert("只能撤销单据状态为审批通过的数据！");
        return;
    }
    if (auditTime != currentdate) {
        jyDialog({"type": "warn"}).alert("只能撤销当天入账数据！");
        return;
    }
    var url = contextRootPath + '/laTClaimrepaymentsApprove/prepareExecute/toRescind?v_ids=' + v_ids;
    var dialogStruct = {
        'display': url,
        'width': 800,
        'height': 500,
        'title': '当日还款撤销',
        'buttons': [
            {'text': '提交', 'action': doRescind},
            {'text': '关闭', 'isClose': true}
        ]
    };
    dialogRescind = jyDialog(dialogStruct);
    dialogRescind.open();
}


//驳回
function toReject() {
    var obj = dialogUpdate.getIframe();
    var repaymentId = obj.$("#repaymentId").val();
    var claimrepaymentId = obj.$("#claimrepaymentId").val();
    //关闭查询界面
    dialogUpdate.close();
    var url = contextRootPath + '/laTClaimrepaymentsApprove/prepareExecute/toReject?repaymentId=' + repaymentId + "&claimrepaymentId=" + claimrepaymentId;
    var dialogStruct = {
        'display': url,
        'width': 800,
        'height': 500,
        'title': '审批驳回',
        'buttons': [
            {'text': '提交', 'action': doReject},
            {'text': '关闭', 'isClose': true}
        ]
    };
    dialogReject = jyDialog(dialogStruct);
    dialogReject.open();
}

//入账
function doPost() {
    var obj = dialogUpdate.getIframe();
    var params = obj.$("#updateNewsFormData").serialize();
    var url = contextRootPath + '/laTClaimrepaymentsApprove/doPost';
    jyDialog({"type": "question"}).confirm("您确认要入账吗？", function () {
        //通过ajax保存
        jyAjax(
            url,
            params,
            function (msg) {
                //新增成功后，
                jyDialog({"type": "warn"}).alert(msg.msg);
                var v_status = msg.status;
                if (v_status.indexOf('ok') > -1) {
                    //新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                    queryData();
                    dialogUpdate.close();
                }
            });
    }, "确认提示");
}

//撤销
function doRescind() {
    var obj = dialogRescind.getIframe();
    var refusemsg = obj.$("#refusemsg").val();
    var val = obj.$('input:radio[name="reject"]:checked').val();
    if (val == '') {
        jyDialog({"type": "warn"}).alert("请选择驳回节点！");
        return;
    }
    if (refusemsg == '') {
        jyDialog({"type": "warn"}).alert("请输入撤销原因！");
        return;
    }
    var params = obj.$("#updateNewsFormData").serialize();
    var url = contextRootPath + '/laTClaimrepaymentsApprove/doRescind?rejectFlag=' + val;

    jyDialog({"type": "question"}).confirm("您确认要撤销吗？", function () {
//通过ajax保存
        jyAjax(
            url,
            params,
            function (msg) {
                //新增成功后，
                jyDialog({"type": "warn"}).alert(msg.msg);
                var v_status = msg.status;
                if (v_status.indexOf('ok') > -1) {
                    //新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                    queryData();
                    dialogRescind.close();
                }
            });
    }, "确认提示");
}


//驳回
function doReject() {
    var obj = dialogReject.getIframe();
    var refusemsg = obj.$("#refusemsg").val();
    var val = obj.$('input:radio[name="reject"]:checked').val();
    if (val == '') {
        jyDialog({"type": "warn"}).alert("请选择驳回节点！");
        return;
    }
    if (refusemsg == '') {
        jyDialog({"type": "warn"}).alert("请输入驳回原因！");
        return;
    }
    var params = obj.$("#updateNewsFormData").serialize();
    var url = contextRootPath + '/laTClaimrepaymentsApprove/doReject?rejectFlag=' + val;
    jyDialog({"type": "question"}).confirm("您确认要驳回吗？", function () {
//通过ajax保存
        jyAjax(
            url,
            params,
            function (msg) {
                //新增成功后，
                jyDialog({"type": "warn"}).alert(msg.msg);
                var v_status = msg.status;
                if (v_status.indexOf('ok') > -1) {
                    //新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                    queryData();
                    dialogReject.close();
                }
            });
    }, "确认提示");
}

function toView(v_ids) {
    if (v_ids == undefined) {
        v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    }

    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "warn"}).alert("请选择待查询的数据！");
        return;
    }

    var dialogStruct = {
        'display': contextRootPath + '/laTClaimrepaymentsApprove/prepareExecute/toView?id=' + v_ids,
        'width': 1100,
        'height': 750,
        'title': '还款信息查询',
        'buttons': [
            {'text': '关闭', 'isClose': true}
        ]
    };

    dialogView = jyDialog(dialogStruct);
    dialogView.open();
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}