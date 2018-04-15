//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var dialogAddOne;//添加第一个界面：查询贷前
var addDlgAddTwo;//添加第二个界面：添加详情
var addDlgAddThere;
var dialogUpdate;
var dialogView;
var v_type;
function toAddData(type) {
    v_type = type;
    var dialogStruct = {
        'display': contextRootPath + '/laTClaimrepayments/prepareExecute/toAdd?type=' + type,
        'width': 1100,
        'height': 800,
        'title': '新增',
        'buttons': [
            {'text': '下一步', 'action': openNextPageOne},
            {'text': '关闭', 'isClose': true}
        ]
    };

    dialogAddOne = jyDialog(dialogStruct);
    dialogAddOne.open();
}

//下一步
function openNextPageOne() {
    var selectIds = dialogAddOne.getIframe().getSelectedIds().join(",");
    //如果没有选中 数据则
    if (selectIds == "") {
        jyDialog({"type": "warn"}).alert("请先选择一条数据！");
        return;
    }
    //如果选择多个 择提示
    if (selectIds.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("只能选择一条数据！");
        return;
    }
    //var claimKind = addDlg1.getIframe().getClaimKind();
    var claimStat = dialogAddOne.getIframe().getSelectedObjss("claimStat");
    if (claimStat != "02") {
        jyDialog({"type": "warn"}).alert("只能选择认款状态为待认款的数据！");
        return;
        //queryData();
    }
    var selectObj = dialogAddOne.getIframe().getSelectedObjs();
    //关闭查询界面
    dialogAddOne.close();

    //打开新增界面
    var url = contextRootPath + '/laTClaimrepayments/prepareExecute/toAddNextBefloan?' + selectObj;
    var dialogStruct = {
        'display': url,
        'width': 1100,
        'height': 750,
        'title': '新增认款信息',
        'buttons': [
            {'text': '上一步', 'action': openPrevPageTwo},
            {'text': '下一步', 'action': openNextPage},
            {'text': '关闭', 'isClose': true}
        ]
    };

    addDlgAddTwo = jyDialog(dialogStruct);
    addDlgAddTwo.open();
}
//上一步
function openPrevPageTwo() {
    addDlgAddTwo.close();
    toAddData(v_type);
}

//下一步
function openNextPage() {
    var selectIds = addDlgAddTwo.getIframe().getSelectedIds().join(",");
    //如果没有选中 数据则
    if (selectIds == "") {
        jyDialog({"type": "warn"}).alert("请先选择一条数据！");
        return;
    }
    //如果选择多个 择提示
    if (selectIds.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("只能选择一条数据！");
        return;
    }
    //var claimKind = addDlg1.getIframe().getClaimKind();
    var selectObj = addDlgAddTwo.getIframe().getSelectedObjs();
    var claimObj = addDlgAddTwo.getIframe().getClaimObjValue();
    //关闭查询界面
    addDlgAddTwo.close();
    //打开新增界面
    var url = contextRootPath + '/laTClaimrepayments/prepareExecute/toAddNextClaimpay?' + selectObj + '&claimObj=' + claimObj;
    var dialogStruct = {
        'display': url,
        'width': 1100,
        'height': 750,
        'title': '新增认款信息',
        'buttons': [
            {'text': '上一步', 'action': openPrevPageThree},
            {'text': '保存', 'action': doAddFrom},
            {'text': '关闭', 'isClose': true}
        ]
    };

    addDlgAddThere = jyDialog(dialogStruct);
    addDlgAddThere.open();
}
//上一步
function openPrevPageThree() {

    var claimObj = $(addDlgAddThere.iframe.contentDocument.getElementById("claimObj")).val();
    addDlgAddThere.close();
    var url = contextRootPath + '/laTClaimrepayments/prepareExecute/toAddNextBefloan?objThere=' + claimObj;
    var dialogStruct = {
        'display': url,
        'width': 1100,
        'height': 750,
        'title': '新增认款信息',
        'buttons': [
            {'text': '上一步', 'action': openPrevPageTwo},
            {'text': '下一步', 'action': openNextPage},
            // {'text':'保存','action':doAddFrom,'isClose':true},
            // {'text':'保存并提交','action':doAll,'isClose':true},
            {'text': '关闭', 'isClose': true}
        ]
    };

    addDlgAddTwo = jyDialog(dialogStruct);
    addDlgAddTwo.open();
}
//新增页面的保存操作
function doAddFrom() {
    /*delete by liuyu at 170524 该放款机构理财人-华瑞放款可做认款
     var dtocontractSource=$(addDlgAddThere.iframe.contentDocument.getElementById("dtocontractSource")).val();
     if(dtocontractSource == "01"){
     jyDialog({"type":"warn"}).alert("该放款机构理财人-华瑞放款不可做认款");
     return ;
     }*/

    //序列化 新增页面的form表单数据
    //var params=$("#addNewsFormData").serialize();
    var params = $(addDlgAddThere.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
    var url = contextRootPath + '/laTClaimrepayments/insertLaTClaimrepayments';

    var dtopayoffFlag = $(addDlgAddThere.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
    var dtocontractId = $(addDlgAddThere.iframe.contentDocument.getElementById("dtocontractId")).val();
    var dtoloanStatus = $(addDlgAddThere.iframe.contentDocument.getElementById("dtoloanStatus")).val();
    var dtoclaimKind = $(addDlgAddThere.iframe.contentDocument.getElementById("dtoclaimKind")).val();
    //逾期期数
    var dtooverdueTerm = $(addDlgAddThere.iframe.contentDocument.getElementById("dtooverdueTerm")).val();
    //还款时间
    var dtorepayTime = $(addDlgAddThere.iframe.contentDocument.getElementById("dtorepayTime")).val();

    //还款金额
    var dtorepayAmount = $(addDlgAddThere.iframe.contentDocument.getElementById("dtorepayAmount")).val();
    //逾期本金
    var dtodeductOverBase = $(addDlgAddThere.iframe.contentDocument.getElementById("dtodeductOverBase")).val();
    //逾期利息
    var dtodeductOverInst = $(addDlgAddThere.iframe.contentDocument.getElementById("dtodeductOverInst")).val();
    //挂账金额
    var dtolosAmount = $(addDlgAddThere.iframe.contentDocument.getElementById("dtolosAmount")).val();
    //总期数
    var dtototalTerm = $(addDlgAddThere.iframe.contentDocument.getElementById("dtototalTerm")).val();
    //当前期数
    var dtoloanCurrentPeriod = $(addDlgAddThere.iframe.contentDocument.getElementById("dtoloanCurrentPeriod")).val();
    //申请日期
    var dtoclaimApplyDate = $(addDlgAddThere.iframe.contentDocument.getElementById("dtoclaimApplyDate")).val();
    //当期还款日期
    var dtocurPayDate_str = $(addDlgAddThere.iframe.contentDocument.getElementById("dtocurPayDate")).val();
    if (dtopayoffFlag == "02") {
        jyDialog({"type": "warn"}).alert("已结清数据不能认款！");
        return;
    }
    if (dtocontractId == "" || dtoloanStatus == "") {
        jyDialog({"type": "warn"}).alert("请完善数据！");
        return;
    }
    if (dtoloanStatus == "2" || dtoloanStatus == "4" || dtoloanStatus == "5") {
        jyDialog({"type": "warn"}).alert("结清的数据不能进行认款操作！");
        return;
    }
    if (dtoclaimKind == "") {
        jyDialog({"type": "warn"}).alert("认款类型不能为空，请选择认款类型！");
        return;
    }

    var dtocurPayDate_ = dtocurPayDate_str;
    //如果当前期数不等于总期数那么就把当前期数减一个月
    if (transdate(dtocurPayDate_str) >= transdate(dtoclaimApplyDate)) {
        var dtocurPayDate = new Date(dtocurPayDate_str);
        dtocurPayDate_ = getLastMonthYestdy(dtocurPayDate);
    }
    dtocurPayDate_ = dtocurPayDate_ + " 23:59:59";

    if (dtoloanStatus == "1" && dtoclaimKind == "05") {
        if (dtooverdueTerm != 1) {
            jyDialog({"type": "warn"}).alert("非逾期M1的合同不允许发起正常月还的认款，请重新选择！");
            return;
        }
        /*if((parseFloat(dtodeductOverBase)+parseFloat(dtodeductOverInst)).toFixed(2)>(parseFloat(dtorepayAmount)+parseFloat(dtolosAmount)).toFixed(2)){
         jyDialog({"type":"warn"}).alert("逾期M1的合同发起正常月还认款，还款金额必须大于逾期本金、逾期利息之和，请重新选择！");
         return;
         }*/

        if (dtorepayTime != null && dtorepayTime != "" && dtocurPayDate_ != null && dtocurPayDate_ != "") {
            if (transdate(dtorepayTime) > transdate(dtocurPayDate_)) {
                jyDialog({"type": "warn"}).alert("认款流水还款时间晚于上期应还款日时间，不允许发起正常月还的认款，请重新选择！");
                return;
            }
        } else {
            jyDialog({"type": "warn"}).alert("还款时间或者当期还款日期还款日期为空，请联系管理员！");
            return;
        }

    }

    if (dtoloanStatus == "1" && dtoclaimKind == "06" && dtooverdueTerm == 1) {
        if (dtorepayTime != null && dtorepayTime != "" && dtocurPayDate_ != null && dtocurPayDate_ != "") {
            if (transdate(dtorepayTime) < transdate(dtocurPayDate_)) {
                jyDialog({"type": "warn"}).alert("逾期M1的合同，认款流水还款时间早于上期应还款日时间，不允许发起逾期还款的认款，请重新选择！");
                return;
            }
        } else {
            jyDialog({"type": "warn"}).alert("还款时间或者当期还款日期还款日期为空，请联系管理员！");
            return;
        }
    }

    if (dtoloanStatus == "1" && dtoclaimKind == "04") {
        jyDialog({"type": "warn"}).alert("逾期合同不允许发起预存款还款的认款，请重新选择！");
        return;
    }
    if (dtoloanStatus == "0" && dtoclaimKind == "06") {
        jyDialog({"type": "warn"}).alert("正常合同不允许发起逾期还款的认款，请重新选择！");
        return;
    }

    if (dtoloanStatus == "0" && dtoclaimKind == "01") {
        jyDialog({"type": "warn"}).alert("正常合同不允许发起承诺还款的认款，请重新选择！");
        return;
    }
    /*if(dtoloanCurrentPeriod == dtototalTerm && dtoclaimKind=="02"){
     jyDialog({"type":"warn"}).alert("当前期次是最后一期的合同不允许发起提前结清的认款，请重新选择！");
     return;
     }*/

    if (dtoclaimKind == "07") {
        if (dtototalTerm != dtoloanCurrentPeriod) {
            jyDialog({"type": "warn"}).alert("只有贷款最后一期的客户才能做展期认款，请重新选择！");
            return;
        }
    }
    //通过ajax保存
    jyAjax(
        url,
        params,
        function (msg) {
            //新增成功后，
            $("").newMsg({"waitTime": 3000, "title": "操作提示"}).show(msg.msg);
            var v_status = msg.status;
            if (v_status.indexOf('ok') > -1) {
                //新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                queryData();
                addDlgAddThere.close();
            }
        });
}
//修改 事件
function toUpdateData() {
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var obj = iframe.iframeObj["table"].getSelectedObjs();
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "warn"}).alert("请选择待修改的数据！");
        return;
    }
    //如果选择多个 择提示
    if (v_ids.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("请选择一条数据！");
        return;
    }
    if (obj[0]["listStat"] != "01") {
        jyDialog({"type": "warn"}).alert("只能修改单据状态为初始录入的数据！");
        return;
    }

    var dialogStruct = {
        'display': contextRootPath + '/laTClaimrepayments/prepareExecute/toUpdate?id=' + v_ids,
        'width': 1100,
        'height': 750,
        'title': '修改认款信息',
        'buttons': [
            {'text': '保存', 'action': doUpdateFrom},
            {'text': '关闭', 'isClose': true}
        ]
    };

    dialogUpdate = jyDialog(dialogStruct);
    dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom() {
    //序列化 新增页面的form表单数据
//	var params=$("#updateNewsFormData").serialize();
    var params = $(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
    var url = contextRootPath + '/laTClaimrepayments/updateLaTClaimrepaymentsInfo';
    var dtopayoffFlag = $(dialogUpdate.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
    var dtocontractId = $(dialogUpdate.iframe.contentDocument.getElementById("dtocontractId")).val();
    var dtoloanStatus = $(dialogUpdate.iframe.contentDocument.getElementById("dtoloanStatus")).val();
    var dtoclaimKind = $(dialogUpdate.iframe.contentDocument.getElementById("dtoclaimKind")).val();


    //逾期期数
    var dtooverdueTerm = $(dialogUpdate.iframe.contentDocument.getElementById("dtooverdueTerm")).val();
    //还款时间
    var dtorepayTime = $(dialogUpdate.iframe.contentDocument.getElementById("dtorepayTime")).val();

    //还款金额
    var dtorepayAmount = $(dialogUpdate.iframe.contentDocument.getElementById("dtorepayAmount")).val();
    //逾期本金
    var dtodeductOverBase = $(dialogUpdate.iframe.contentDocument.getElementById("dtodeductOverBase")).val();
    //逾期利息
    var dtodeductOverInst = $(dialogUpdate.iframe.contentDocument.getElementById("dtodeductOverInst")).val();
    //挂账金额
    var dtolosAmount = $(dialogUpdate.iframe.contentDocument.getElementById("dtolosAmount")).val();

    //总期数
    var dtototalTerm = $(dialogUpdate.iframe.contentDocument.getElementById("dtototalTerm")).val();
    //当前期数
    var dtoloanCurrentPeriod = $(dialogUpdate.iframe.contentDocument.getElementById("dtoloanCurrentPeriod")).val();
    //申请日期
    var dtoclaimApplyDate = $(dialogUpdate.iframe.contentDocument.getElementById("dtoclaimApplyDate")).val();
    //当期还款日期
    var dtocurPayDate_str = $(dialogUpdate.iframe.contentDocument.getElementById("dtocurPayDate")).val();
    if (dtopayoffFlag == "2") {
        jyDialog({"type": "warn"}).alert("已结清数据不能认款！");
        return;
    }
    if (dtocontractId == "" || dtoloanStatus == "") {
        jyDialog({"type": "warn"}).alert("请完善数据！");
        return;
    }
    if (dtoloanStatus == "2" || dtoloanStatus == "4") {
        jyDialog({"type": "warn"}).alert("结清的数据不能进行认款操作！");
        return;
    }
    if (dtoclaimKind == "") {
        jyDialog({"type": "warn"}).alert("认款类型不能为空，请选择认款类型！");
        return;
    }
    var dtocurPayDate_ = dtocurPayDate_str;
    //如果当前期数不等于总期数那么就把当前期数减一个月
    if (transdate(dtocurPayDate_str) >= transdate(dtoclaimApplyDate)) {
        var dtocurPayDate = new Date(dtocurPayDate_str);
        dtocurPayDate_ = getLastMonthYestdy(dtocurPayDate);
    }
    dtocurPayDate_ = dtocurPayDate_ + " 23:59:59";

    if (dtoloanStatus == "1" && dtoclaimKind == "05") {
        if (dtooverdueTerm != 1) {
            jyDialog({"type": "warn"}).alert("非逾期M1的合同不允许发起正常月还的认款，请重新选择！");
            return;
        }
        /*if((parseFloat(dtodeductOverBase)+parseFloat(dtodeductOverInst)).toFixed(2)>(parseFloat(dtorepayAmount)+parseFloat(dtolosAmount)).toFixed(2)){
         jyDialog({"type":"warn"}).alert("逾期M1的合同发起正常月还认款，还款金额必须大于逾期本金、逾期利息之和，请重新选择！");
         return;
         }*/

        if (dtorepayTime != null && dtorepayTime != "" && dtocurPayDate_ != null && dtocurPayDate_ != "") {
            if (transdate(dtorepayTime) > transdate(dtocurPayDate_)) {
                jyDialog({"type": "warn"}).alert("认款流水还款时间晚于上期应还款日时间，不允许发起正常月还的认款，请重新选择！");
                return;
            }
        } else {
            jyDialog({"type": "warn"}).alert("还款时间或者当期还款日期还款日期为空，请联系管理员！");
            return;
        }

    }
    if (dtoloanStatus == "1" && dtoclaimKind == "06" && dtooverdueTerm == 1) {
        if (dtorepayTime != null && dtorepayTime != "" && dtocurPayDate_ != null && dtocurPayDate_ != "") {
            if (transdate(dtorepayTime) < transdate(dtocurPayDate_)) {
                jyDialog({"type": "warn"}).alert("逾期M1的合同，认款流水还款时间早于上期应还款日时间，不允许发起逾期还款的认款，请重新选择！");
                return;
            }
        } else {
            jyDialog({"type": "warn"}).alert("还款时间或者当期还款日期还款日期为空，请联系管理员！");
            return;
        }
    }
    if (dtoloanStatus == "1" && dtoclaimKind == "04") {
        jyDialog({"type": "warn"}).alert("逾期合同不允许发起预存款还款的认款，请重新选择！");
        return;
    }
    if (dtoloanStatus == "0" && dtoclaimKind == "06") {
        jyDialog({"type": "warn"}).alert("正常合同不允许发起逾期还款的认款，请重新选择！");
        return;
    }

    if (dtoloanStatus == "0" && dtoclaimKind == "01") {
        jyDialog({"type": "warn"}).alert("正常合同不允许发起承诺还款的认款，请重新选择！");
        return;
    }

    /*if(dtoloanCurrentPeriod == dtototalTerm && dtoclaimKind=="02"){
     jyDialog({"type":"warn"}).alert("当前期次是最后一期的合同不允许发起提前结清的认款，请重新选择！");
     return;
     }*/

    //通过ajax保存
    jyAjax(
        url,
        params,
        function (msg) {
            //保存成功后，执行查询页面查询方法
            $("").newMsg({"waitTime": 3000, "title": "操作提示"}).show(msg.msg);
            var v_status = msg.status;
            if (v_status.indexOf('ok') > -1) {
                //新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                queryData();
                dialogUpdate.close();
            }
        });
}
//删除 事件
function deleteData() {

    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var obj = iframe.iframeObj["table"].getSelectedObjs();
    //如果选择多个 择提示
    if (v_ids.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("请选择一条数据！");
        return;
    }
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "info"}).alert("请选择待删除的数据！");
        return;
    }
    if (obj[0]["listStat"] != "01") {
        jyDialog({"type": "warn"}).alert("只能刪除单据状态为初始录入的数据！");
        return;
    }

    jyDialog({"type": "question"}).confirm("您确认要删除选择的数据吗？", function () {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: contextRootPath + "/laTClaimrepayments/deleteLaTClaimrepayments?ids=" + v_ids,
            success: function (msg) {
                $("").newMsg({}).show(msg.msg);
                var v_status = msg.status;
                //删除成功后
                if (v_status.indexOf('ok') > -1) {
                    iframe.iframeObj["table"].removeSelectedRow();
                }
            }
        });
    }, "确认提示");
}

//上传文件
function toUploadFile() {
    //getValueForIndex("listStat",);
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "warn"}).alert("请先选择一条数据！");
        return;
    }
    //如果选择多个 择提示
    if (v_ids.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("只能选择一条数据！");
        return;
    }

    var dialogStruct = {
        'display': contextRootPath + '/laTImageBizAss/prepareExecute/toViewUpload?id=' + v_ids + "&type=39",
        'width': 1100,
        'height': 800,
        'title': '上传',
        'buttons': [
            {'text': '关闭', 'isClose': true}
        ]
    };

    dialogUpdate = jyDialog(dialogStruct);
    dialogUpdate.open();
}


//查看明细
function viewData(vId) {
    var dialogStruct = {
        'display': contextRootPath + '/laTClaimrepayments/prepareExecute/toView?id=' + vId,
        'width': 1100,
        'height': 800,
        'title': '查看明细',
        'buttons': [
            {'text': '关闭', 'isClose': true}
        ]
    };

    var dialogView = jyDialog(dialogStruct).open();
}
//获得上个月在昨天这一天的日期
function getLastMonthYestdy(date) {
    var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
    var strYear = date.getFullYear();
    var strDay = date.getDate();
    var strMonth = date.getMonth() + 1;
    if (strYear % 4 == 0 && strYear % 100 != 0) {
        daysInMonth[2] = 29;
    }
    if (strMonth - 1 == 0) {
        strYear -= 1;
        strMonth = 12;
    }
    else {
        strMonth -= 1;
    }
    strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
    if (strMonth < 10) {
        strMonth = "0" + strMonth;
    }
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    datastr = strYear + "-" + strMonth + "-" + strDay;
    return datastr;
}
function transdate(endTime) {
    var date = new Date();
    date.setFullYear(endTime.substring(0, 4));
    date.setMonth(endTime.substring(5, 7) - 1);
    date.setDate(endTime.substring(8, 10));
    date.setHours(endTime.substring(11, 13));
    date.setMinutes(endTime.substring(14, 16));
    date.setSeconds(endTime.substring(17, 19));
    return Date.parse(date) / 1000;
}

//提交认款审核给核心（异步返回，不用工作流）
function submitData() {
    var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
    var objs = iframe.iframeObj["table"].getSelectedObjs();
    //如果没有选中 数据则
    if (v_ids == "") {
        jyDialog({"type": "warn"}).alert("请选择待提交的数据！");
        return;
    }
    if (v_ids.indexOf(",") > -1) {
        jyDialog({"type": "warn"}).alert("只能选择一条数据！");
        return;
    }
    //验证是否上传附件
    var isUpload = checkUpload(objs[0]["listId"]);
    if (!isUpload) {
        jyDialog({"type": "warn"}).alert("请先上传附件！");
        return;
    }
    if (objs[0]["listStat"] == "01") {
        jyDialog({"type": "question"}).confirm("您确认要提交选择的数据吗？", function () {
            $.ajax({
                type: "POST",
                url: contextRootPath + "/laTClaimrepayments/submitData?ids=" + v_ids,
                dataType: "json",
                success: function (msg) {
                    $("").newMsg({"waitTime": 3000, "title": "操作提示"}).show(msg.msg);
                    var v_status = msg.status;
                    //提交成功后
                    if (v_status.indexOf('ok') > -1) {
                        queryData();
                    }
                }
            });
        }, "确认提示");
    } else {
        jyDialog({"type": "warn"}).alert("只能提交单据状态为初始录入的数据！");
    }
}

function checkUpload(v_ids) {

    var url = contextRootPath + "/laTImageBizAss/checkUpload?listId=" + v_ids + "&listType=39";
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        success: function (msg) {
            if (msg.indexOf('ok') > -1) {
                isUpload = true;
            } else {
                isUpload = false;
            }
        }
    });
    return isUpload;
}