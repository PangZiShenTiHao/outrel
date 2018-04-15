function Table(tableStructure, tableName, container) {
    this.ts= tableStructure;
    this.tableName = tableName + "t";
    this.container = container;
    this.showType = "SHOW";
    this.RADIO = "radio";
    this.CHECK = "checkbox";
    this.init();
}

Table.prototype = {
    constructor: Table,
    init: function () {
        this.pageSize = this.ts.pageSize || 10;
        this.pageIndex = this.ts.pageIndex || 1;
        this.totalRows = 0;// 总记录行数
        this.pageCount = 0;// 共有多少页（总页数）
        this.pageRows = 0;// 当前页记录个数
        this.url = this.ts.url || "";
        this.params=this.ts.params||"";
        this.selectType = this.ts.selectType || "radio";// 选择类型(generic,radio,checkbox)
        this.editFilterFun=this.ts.editFilterFun;
        this.isCheck = this.ts.isCheck;
        this.hiddenFooter = this.ts.hiddenFooter;
        this.rowH = this.ts.rowH || 20;
        this.columnsColors = [ "#ff0000", "#FFFFFF", "#F3F3F3", ];
        this.trOverColor = '#D7DAD1';// 鼠标经过颜色
        this.trSelectedColor = '#ffe681';
        this.isPage = (undefined === this.ts.isPage) ? true : this.ts.isPage;
        this.headObj = {};
        this.datas = this.ts.datas || [];
        this.dataMap = {};
        this.toolbarName = "toolbar" + this.tableName;
        this.headName = "tableHead" + this.tableName;// 表头内容名称
        
        this.bContentTableName = "bctn_" + this.tableName;// 表中内容名称(基本内容)
        this.lContentTableName = "lctn_" + this.tableName;// 表中内容名称(锁定表格)
        this.linkContentTableName = "linkCtn_" + this.tableName;// 表中内容名称(锁定表格)
        
        this.btContainerName="btContainern_"+this.tableName;//表格容器名称
        this.ltContainerName="ltContainern_"+this.tableName;//表格容器名称
        this.linktContainerName="linktContainern_"+this.tableName;//表格容器名称
        
        
        this.footerName = "tableFooter" + this.tableName;// 脚本块名称
        this.psName = "pageSize" + this.tableName;// 输入分页信息框
        this.checkName = "check" + this.tableName;// 选择框名称(checkbox)
        this.checkAllName = "checkAll" + this.tableName;// 全选按钮名称(checkbox)
        this.bTableName = "btn_" + this.tableName;// 表中内容表格名称
        this.lTableName = "ltn_" + this.tableName;// 锁定表格名称
        this.linkTableName = "linktn_" + this.tableName;// 锁定表格名称
        
        this.moveDivName = "move" + this.tableName;
        this.moveMaskDivName = "moveMask" + this.tableName;
       
        this.bHeadDivName=this.headName+"_basic";
        this.lHeadDivName=this.headName+"_lock";
        this.linkHeadDivName=this.headName+"_link";
        this.ltHeadTableName=this.tableName+"head_lock";
        this.btHeadTableName=this.tableName+"head_Basic";
        
        this.linktHeadTableName=this.tableName+"head_link";
        
        
        this.columns=this.ts.columns;
        this.toolbar = this.ts.toolbar;
        this.toolbarHTML = "";
        this.form = this.ts.form;
        this.rownumbers = this.ts.rownumbers;
        this.checkedFun = this.ts.checkedFun;
        this.clickFun = this.ts.clickFun;
        this.dbClickFun = this.ts.dbClickFun;
        this.checkAllFun=this.ts.checkAllFun;
        this.cancelCheckFun = this.ts.cancelCheckFun;
        this.loadEndFun=this.ts.loadEndFun;
        this.setTrStyle=this.ts.setTrStyle;
        this.primaryKey = this.ts.primaryKey || "id";
        this.sortName = "";
        this.sortType = "";
        this.orderClass = {0: "thOrderNoDes", 1: "thOrderAsc", 2: "thOrderDesc"};
        this.orderParams = {1: "asc", 2: "desc"};
        this.lockColumns=[];
        this.basicColumns=[];
        this.linkColumns=[];
        this.handleColumns=[];
        this.handleStatic=false;
        this.lockColumnStatic=false;
        this.columnWidth=0;
        this.changePageFun=this.ts.changePageFun;
        for(var i=0;i<this.columns.length;i++){
             var c=this.columns[i];
             if(c){
                 this.columnWidth+=(c.width||100);
                 if(c&&c.isLock){
                     this.lockColumns.push(c);
                 }else if(c.type==="link"||c.type==="funLink"){
                     this.linkColumns.push(c);
                 }else{
                     this.basicColumns.push(c);
                 }
                 if(c.handle){
                     this.handleColumns.push(c);
                 }
             }
        }
//        if(this.columnWidth<=$(this.container).width()){
//          this.basicColumns=this.basicColumns.concat(this.linkColumns);
//          this.linkColumns.length=0;
//        }
        var numColumn={display: '序号', code: 'rowNum', width: 30, align: 'center'};
        if(this.rownumbers){
            if (this.lockColumns.length) {
                this.lockColumns.unshift(numColumn);
                this.lockColumnStatic=true;
            }else{
                this.basicColumns.unshift(numColumn);
            }
        }
        this.isRefrash=false;// 异步数据获取完成时改为true
    },


    /**
     * 获取指定字段的值，并通过数组形式返回
     */
    getSelectedObjs: function (columnName) {
        var objs = [];
        var that = this;
        $('#'+that.bTableName+' tr.trSelected').each(function () {
            var k = $(this).attr("kvalue");
            if (undefined != k && null != k) {
                if (that.dataMap[k]) {
                    if (columnName) {
                        objs.push(that.dataMap[k][columnName]);
                    } else {
                        objs.push(that.dataMap[k]);
                    }
                }
            }
        });
        return objs;
    },
    changeColTitleByCode:function(columnCode,columnNewName)
    {
        var obj=$('table th[linkcolumn="'+columnCode+'"]');
        var span=obj.find(".tableHR");
        if(span.children().length>0)
        {
            span.children().text(columnNewName);
        }
        else
        {
            span.text(columnNewName);
        }

    },
    changeValByColCode:function(colCode,colVal,rowKey)
    {
        var that = this;
        var row;
        if(rowKey)
        {
             row=$('table tr[kvalue="'+rowKey+'"]');
        }
        else
        {
             row= $('#'+that.bTableName+' tr.trSelected')[0];
        }
        var col=$(row).find('[extname="'+colCode+'"]');
        var div=col.find(".tdInner");
        if(div.children().length>0)
        {
            div.children().text(colVal);
        }
        else
        {
            div.text(colVal);
        }



    },
    /**
     * 获取指定字段的值，并通过数组形式返回
     */
    getSelectedIds: function () {
        return this.getSelectedObjs(this.primaryKey);
    },
    /**
     * 根据选择行索引，获取某字段的值
     */
    getValueForIndex: function (columnName, rowIndex) {
        var key = columnName;
        if (!key) {
            key = "id";
        }
        var rowData = this.datas[rowIndex];
        return rowData[key];
    },
    setValueForIndex: function (rowIndex, columnName, value) {
        var data = this.datas[rowIndex];
        data[columnName] = value;
        this.refreshDatas();
    },

    /**
     * 得到行的记录数
     */
    getRowsCount: function () {
        return this.datas.length;
    },
    toHtml: function () {
    },
    getColumnByCode: function (columnCode) {
        var columns=this.lockColumns.concat(this.basicColumns);
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            if (column.code == columnCode) {
                return column;
            }
        }
    },

    /**
     * 增加一条新的记录//
     */
    addPojo: function (pojo, index) {
        var i = (this.datas.length || index);
        if (this.datas) {
            var newObj={};
            if(pojo){
                pojo["editObj"]={};
                for(var extName in pojo){
                    var tdColumn=this.getColumnByCode(extName);
                    if(tdColumn){
                        var editObj={"oldValue":"","newValue":pojo[extName],"code":extName,"name":tdColumn.display,"type":"3"}
                        pojo["editObj"][extName]=editObj;
                    }
                }
                newObj=pojo;
            }
            newObj["isNew"]=true;
            this.datas.splice(i, 0, newObj);
            this.totalRows += 1;
            this.flush();
           // trClickOp(0);

        }
        this.selectRowByIndex(i);
    },
    /**
     * 修改数据当中的一条记录(然后进行全部刷新表格，使其重新展示);
     */
    modifyPojo: function (pojo) {
        var that=this;
        if (typeof(pojo) == "object") {
            var k = pojo[this.primaryKey];
            if (this.dataMap[k]) {
                for (var i = 0; i < this.datas.length; i++) {
                    var oldPojo = this.datas[i];
                    if (oldPojo[this.primaryKey] == k) {
                        // this.datas.splice(i,1);
                        this.datas[i] = pojo;
                        var editObjArray=oldPojo["editObj"]||{};
                        var isModify=false;
                        for(var extName in pojo){
                            var tdColumn=that.getColumnByCode(extName);
                            if(tdColumn){
                                var oldValue=that.formatData()[tdColumn.type](oldPojo,tdColumn);
                                var newValue=that.formatData()[tdColumn.type](pojo,tdColumn);
                                if(newValue!=oldValue){
                                    var editObj={"oldValue":oldValue,"newValue":newValue,"code":extName,"name":tdColumn.display,"type":"3"}
                                    editObjArray[extName]=editObj;
                                    isModify=true;
                                }
                            }
                        }
                        
                        if(isModify){
                            pojo["editObj"]=editObjArray;
                            pojo["isEdit"]=true;
                            pojo["isNew"]=undefined;
                        }
                        this.datas[i]=pojo;
                        this.flush();
//                        this.show(true);
                        i = this.datas.length;
                    }
                }
            }
        }
    },

    /**
     * 修改表格数据刷新一行数据，主要体现是的居部刷新
     */
    flushTableTr: function (trObj, rowIndex) {

    },
    /**
     * 通过字段名来获取到字段名称
     */
    getColumnByName: function (columnName) {

    },
    compare: function (td1, td2) {
        if (td1.index > td2.index) {
            return 1;
        } else if (td1.index < td2.index) {
            return -1;
        } else {
            return 0;
        }
    },

    /**
     * 整合行数据内容
     */
    tableContentTr: function () {// 整合内容行

    },
    pageSizeChange: function () {
        this.pageIndex = 1;
    },
    /**
     * 显示表格的主函数,用于整合表格，并放到页面中的指定位置//有问题，需要修改
     */
    show: function (isShow,isNextPage) {
        var that = this;
        var tableContent = [];
        var createToolbar=function(){
            if (that.toolbar && that.toolbar.length) {
                var toolbarStr=[];
                if (typeof(that.toolbar) == "string") {
                    that.toolbarHTML = that.toolbarHTML || $("#" + that.toolbar).html();
                    if (that.toolbarHTML && that.toolbarHTML.length) {
                        toolbarStr.push('<div class="tableToolbar" id="' + that.toolbarName + '" >');
                        toolbarStr.push(that.toolbarHTML);
                        $("#" + that.toolbar).remove();
                        toolbarStr.push("</div>");
                    }
                } else {
                    toolbarStr.push('<div class="tableToolbar" id="' + that.toolbarName + '" >');
                    for (var i = 0; i < that.toolbar.length; i++) {
                        var btn = that.toolbar[i];
                        toolbarStr.push('<a href="javascript:void(0)" index="' + i + '">' + btn.text + '</a>');
                    }
                    toolbarStr.push("</div>");
                }
                return toolbarStr.join("");
            }
        }
        tableContent.push(createToolbar());
        
        if(that.lockColumns.length){
            tableContent.push('<div class="tableContainer lockColumn" id="'+that.ltContainerName+'">');
            tableContent.push(that.head().createLockHead());
            tableContent.push('<div class="tableContent" id="' + that.lContentTableName + '" ></div>');
            tableContent.push('</div>'); 
        }
        
        tableContent.push('<div class="tableContainer" id="'+that.btContainerName+'">');
            tableContent.push(that.head().createBasicHead());
            tableContent.push('<div class="tableContent" id="' + that.bContentTableName + '" ></div>');
        tableContent.push('</div>');
        
        if(that.linkColumns.length){
            tableContent.push('<div class="tableContainer lockLinkColumn" id="'+that.linktContainerName+'">');
            tableContent.push(that.head().createLinkHead());
            tableContent.push('<div class="tableContent" id="' + that.linkContentTableName + '" ></div>');
            tableContent.push('</div>');
        }
        
        //重新绘制tbody
        var params = that.getPagesParams() + "&" + that.serializeForm(isNextPage);
        if(that.params){
            params+="&"+that.params;
        }

        if(params.indexOf("bizTotalFlag=Y") >= 0){
            debugger;
        }else{
            tableContent.push(that.createTableFoot().getFooterDiv());
            $(that.container).html(tableContent.join(""));
        }
        
        $("body").append('<div id="' + that.moveMaskDivName + '" class="moveMarker"><div id="' + that.moveDivName + '" class="moveDiv"></div></div>');
        $("body").append('<span id="lsWidthObj" style="position: absolute;left:-10000000000px;"></span>')
        if(that.linkColumns.length){
            that.resize();
        }
        if (isShow) {
            that.createContent(false, function (tableLists) {
                that.eachAllTd(function(td){
                    var tdObj=$(td);
                    var text=tdObj.text();
                    //debugger;
                    //console.log(text);
                    if(text.trim().length){
                        var lsW= $("#lsWidthObj");
                        lsW.html(text);
                        if(lsW.width()>tdObj.width()||lsW.height()>tdObj.height()){
                            tdObj.newTooltip({"content":tdObj.html()}); 
                        }
                    }
                });
                that.createTableFoot().flushFooter();
                that.resize();
                //TODO 干扰敏感信息 
                that.disturbSecret();
            },isNextPage);
        } 
        
    },
    disturbSecret: function () {
        var that = this;
        //干扰敏感信息
        try{
            if("Y" != DISTURB_SECRET_JS) return ;
            //当前table含有敏感字段信息则进行干扰
            if(that.datas&&that.datas.length && that.datas.length > 1){
                var maxCun = 0;
                //有数据
                if(that.datas.length <= 3){
                    maxCun = 0;
                }else if(that.datas.length <= 10){
                    //随机干扰一次
                    maxCun = 1;
                }else if(that.datas.length <= 20){
                    //随机干扰二次
                    maxCun = 2;
                }else if(that.datas.length <= 30){
                    //随机干扰三次
                    maxCun = 3;
                }else if(that.datas.length <= 50){
                    //随机干扰5次
                    maxCun = 5;
                }else {
                    maxCun = 8;
                }
                
                for(var i=0 ;i< maxCun;i++){
                    var ranIdx=parseInt(Math.random()*10+i*10);
                    for(var m=0;m < JQUERY_TABLE_OBJS_JS.length; m++){
                        $("td[extname='"+JQUERY_TABLE_OBJS_JS[m]+"']").each(function(k){
                            //console.log(ranIdx+"===="+$(this).html());
                            if(ranIdx==k){
                                var _htm = $(this).html();
                                var _Oldtxt = $(this).text();
                                var _newTxt = _Oldtxt;
                                //debugger;
                                //截取后三位
                                var _curStr = CUR_USER_ID_JS.substr(CUR_USER_ID_JS.length-3);
                                //截取身份证后四位中的前三位
                                var replaceStr = _Oldtxt.substr(_Oldtxt.length -4,3);
                                _newTxt = _Oldtxt.replace(new RegExp(replaceStr,'gm'),_curStr);
                                _htm = _htm.replace(new RegExp(_Oldtxt,'gm'),_newTxt);
                                $(this).html(_htm);
                            }
                        });
                    }
                    
                }
                
            }
        }catch(e){
            
        }
    },
    
    hideToolbar:function(){
        $("#"+this.toolbarName).hide();
    },
    showToolbar:function(){
        $("#"+this.toolbarName).show();
    },
    query: function (asynQuery) {
        var that=this;
        var _varStr = "";
        var _bizTotalFlagVal ="";
        try{
            if (typeof(that.form) === "string") {
                _varStr = $("#" + that.form).serialize();
            } else if (typeof(that.form) === "object"&&that.form instanceof SearchForm) {
                _bizTotalFlagVal = that.form.getObj("bizTotalFlag").value;
                if(asynQuery && 'Y'== _bizTotalFlagVal){
                    that.form.getObj("bizTotalFlag").value='N';
                }
                _varStr =  that.form.serialize();
            }
        }catch(e){}
       
        //查询业务数据
        this.pageIndex=1;
        this.totalRows=0;
        
        if(asynQuery || typeof(asynQuery) == "undefined"){
            this.show(true);
        }else{
            this.show(true,false);
        }
        
        //异步统计总数
        if('N'== _bizTotalFlagVal ){
            if (typeof(that.form) === "object"&&that.form instanceof SearchForm) {
                that.form.getObj("bizTotalFlag").value='Y';
                this.query(false);
            }
        }
    },
    showAndQuery: function (tableDiv) {
        this.show(true);
    },
    resize:function(){
        var that=this;
        var linkObjW=0;
        var lockObjW=0;
        var basicObjW=0;
        var parentObjW=0;
        var linkObj=$("#"+that.linktContainerName);
        if(linkObj.length){
            linkObjW=linkObj.width();
        }
        var lockObj=$("#"+that.ltContainerName);
        if(lockObj.length){
            lockObjW=lockObj.width();
        }
        var parentObjW=$(that.container).width();
        var basicObj=$("#"+that.btContainerName);
        basicObjW=basicObj.width();
        var toolH=$("#"+that.toolbarName).height()+1; 
        linkObj.css("top",(toolH+"px"));
        var bTableW=$("#"+that.btHeadTableName).width();
        var a=linkObjW+bTableW+lockObjW
        if(a>=parentObjW){
            var subW=parentObjW-lockObjW-linkObjW;
            basicObj.css("width",subW+"px");
            basicObj.css("margin-right",linkObjW+"px");
            linkObj.css("right","0px");
            //basicObj.css("float","left");
            basicObj.css("margin-left",lockObjW+"px");
        }else{
            basicObj.css("width","");
            basicObj.css("float","");
            linkObj.css("right",(parentObjW-lockObjW-bTableW-linkObjW)+"px");
        }
    },
    flush: function () {
        var that = this;
        if(that.lockColumns.length){
            $("#" + that.lHeadDivName).replaceWith(that.head().createLockHead());
        }
        $("#" + that.bHeadDivName).replaceWith(that.head().createBasicHead());
        if(that.linkColumns.length){
            $("#" + that.linkHeadDivName).replaceWith(that.head().createLinkHead());
        }
        that.createContent(true, function (contentList) {
            that.createTableFoot().flushFooter();
            that.resize();
        });
    },
    /**
     * 整合表头数据
     */
    head: function () {
        var that = this;
        var createHead=function(columns,isLock,tableName,headName,contentTableName){
            if(columns&&columns.length){
                var linkTable='link="'+contentTableName+'"';
                var htr = [];
                htr.push('<div class="tableHead tableWhead" id="' + headName + '">');
                htr.push('<table id="' + tableName + '" cellpadding="0px" cellspacing="0px" '+linkTable+'> <tr style="height:30px;">');
                var tdIndex = 0;
                if (that.isCheck&&isLock) {
                    var chObj = {};
                    var thStr='<th style="width:30px;" '+linkTable+' index="' + tdIndex + '"><div headMove="true" class="tdInner" style="width:30px;">';
                    chObj[that.CHECK] = '<input type="checkbox" id="' + that.checkAllName + '"></div></th>';
                    chObj[that.RADIO] = '</div></th>';
                    tdIndex++;
                    htr.push(thStr+chObj[that.selectType]);
                }
                for (var i = 0; i < columns.length; i++) {
                    var c = columns[i];
                    var order = "";
                    var tc = c["display"];
                    var linkColumn=' linkColumn="'+c.code+'" ';
                    if (c.isOrder) {
                        var orderC = that.orderClass[0];
                        var exV = 0;
                        if (that.sortName == c.code||that.sortName==c.sortName) {
                            orderC = that.orderClass[that.sortType];
                            exV = that.sortType;
                        }
                        order = '<span class="thIcon ' + orderC + '" >&nbsp;</span>';
                        tc = '<a sortName="' + (c.sortName||c.code) + '" sortType="' + exV + '" href="javascript:void(0)">' + tc + '</a>';
                    }
                    if(c["type"] == "hidden"){
                        htr.push('<th headMove="true" style="display:none" '+linkColumn+linkTable+' index="' + (tdIndex++) + '"><div headMove="true" class="tdInner" style="width:' + c.width + 'px"><span class="tableHR">' + tc + '</span>' + order + '</div></th>');
                    }
                    else{
                        htr.push('<th headMove="true" '+linkColumn+linkTable+' index="' + (tdIndex++) + '"><div headMove="true" class="tdInner" style="width:' + c.width + 'px"><span class="tableHR">' + tc + '</span>' + order + '</div></th>');
                    }
                }
                htr.push('</tr></table></div>');
                return htr.join("");
            }
            return "";
        }
        return {
            createBasicHead:function(){
                return createHead(that.basicColumns,!that.lockColumnStatic,that.btHeadTableName,that.bHeadDivName,that.bTableName);
            },
            createLockHead:function(){
                return createHead(that.lockColumns,that.lockColumnStatic,that.ltHeadTableName,that.lHeadDivName,that.lTableName);
            },
            createLinkHead:function(){
                return createHead(that.linkColumns,false,that.linktHeadTableName,that.linkHeadDivName,that.linkTableName);
            }
        }
    },
    formatData:function(){
        var that=this;
        var getV = function (datas, column) {
            if(typeof(datas)=="object"){
                var code = column.code.trim();
                var maxName = code.toUpperCase();
                var minName = code.toLowerCase();
                var isUndeFined=function(v){
                    if(typeof(v)==undefined){
                        return true;
                    }
                    return false;
                };
                if(!isUndeFined(datas[code])){
                    return datas[code];
                }
                if(!isUndeFined(datas[maxName])){
                    return datas[maxName];
                }
                if(!isUndeFined(datas[minName])){
                    return datas[minName];
                }
                return "&nbsp;";
            }
            return datas;
        };
        return {
            "text": function (datas, column) {
                return getV(datas, column);
            },
            "hidden": function (datas, column) {
                return getV(datas, column);
            },
            "textArea":function(datas,column){
                return getV(datas, column);
            },
            "number":function(){
                return getV(datas, column);
            },
            "date": function (v, column) {
                var dateVal = getV(v, column);
                if (dateVal != "&nbsp;"&&dateVal) {
                    var nDate = new Date(dateVal);
                    var pattern = column.format || "yyyy-MM-dd";
                    return nDate.format(pattern);
                }else{
                    return dateVal;
                }
            },
            "select": function (v, column) {
                if(column.fullData){
                    return column.fullData(v,column);
                }
                if (column.value) {
                    for (var i = 0; i < column.value.length; i++) {
                        var o = column.value[i];
                        if ((o.value+"") === (getV(v, column)+"")) {
                            return o.text;
                        };
                    };
                }
                return "&nbsp;";
            },
            "fun": function (datas, column,index) {
                return column.value(datas,index);
            },
            "funLink":function(datas,column,index){
                return column.value(datas,index);
            },
            "link": function (datas, column,index) {
                var linkIndexs;
                var isFilter=false;
                if(column.filter){
                    linkIndexs=column.filter(datas);
                    isFilter=true;
                }
                var filterFun=function(index){
                    if(isFilter&&linkIndexs&&linkIndexs.length){
                        for(var i=0;i<linkIndexs.length;i++){
                            if(index==i){
                                return true;
                            };
                        };
                    }
                    return false;
                };
                var linkStr =[];
                if (column.value) {
                    for (var i = 0; i < column.value.length; i++) {
                        var b = column.value[i];
                        if(!filterFun(i)){
                            linkStr.push('<a href="javascript:void(0)"  cName="' + column["code"] + '" index="' + i + '" kValue="' + datas[that.primaryKey] + '">' + b["text"] + '</a>');
                        }
                    }
                }
                return linkStr.join("&nbsp;|&nbsp;");
            },
            "money": function (datas, column) {
                var moneyVal = getV(datas, column);
                if(moneyVal != "&nbsp;"){
                    return jyTools.formatMoney(moneyVal);
                }
            },
            "checkbox":function(v, column){
                if (column.value) {
                    var chkVal=getV(v, column);
                    if(chkVal!="&nbsp;")
                    {
                        return   column.value[chkVal];
                    }
                    return "&nbsp;";
                }
                return "&nbsp;";
            },
            "tree":function(datas, column){
                return getV(datas, column);
            },
            "radio":function(v, column) {
                if (column.value) {
                    var str=[];
                    str.push('<div istd="true" >');

                    for (var i = 0; i < column.value.length; i++) {
                        var o = column.value[i];
                        var checked="";
                        if ((o.value+"") === (getV(v, column)+"")) {
                            checked='checked="true"';
                        }

                        str.push('<input name="rd_'+v[that.primaryKey]+'" type="radio" istd="true" value="'+ o.value+'"  '+checked+'>'+ o.text);

                    };
                    str.push('</div >')
                    return str.join("&nbsp;");
                }
                return "&nbsp;";
            }

        };
    },
    createContent: function (isFlush, groupContentFun,isNextPage) {
        var that = this;
        var createTd = function (column, datas,index,isHandle) {
            var value =null;
            var tdClass="";
            if(isHandle){
                if(column.handle){
                    value= that.formatData()[(column.type || "text")](datas, column,index);
                }
                tdClass=' class="handle"';
            }else{
                value= that.formatData()[(column.type || "text")](datas, column,index);
            }
            if(undefined==value||null==value){
                value="&nbsp;";
            }
            var isEditStr="";
            if(column.isEdit){
                isEditStr='isEdit="' + column.isEdit + '"';
            }
            var title="";//funfunLinklink
            if(!(column.type=="fun"||column.type=="funLink"||column.type=="link")){
            //  title=$(value).text();
            }
            
            if(column.type == "hidden"){
                return '<td '+tdClass+' style="display:none" id="' + column.code + '_' + datas[that.primaryKey] + '" extName="' + column.code + '"  isTd="true" ><div title="'+title+'" isTd="true" '+isEditStr+' cellType="' + column.type + '" class="tdInner" style="width:' + column.width + 'px; text-align:' + column["align"] + '">' + value + '</div></td>';
            }
            else{
                return '<td '+tdClass+' id="' + column.code + '_' + datas[that.primaryKey] + '" extName="' + column.code + '"  isTd="true" ><div title="'+title+'" isTd="true" '+isEditStr+' cellType="' + column.type + '" class="tdInner" style="width:' + column.width + 'px; text-align:' + column["align"] + '">' + value + '</div></td>';
            }
        };
        var createTr = function (trData, index,columns,isLock,isHandle) {
            if(columns&&columns.length){
                className = "";
                var styleCss="";
                if ((index % 2) == 0) {
                    className = " oddTr";
                }
                if(that.setTrStyle){
                    styleCss+=that.setTrStyle(trData);
                }
                var kvalue = trData[that.primaryKey];
                if (!kvalue) {
                    kvalue = new Date().getTime() + index;
                    trData[that.primaryKey] = kvalue;
                }
                var tds = ['<tr kValue="' + kvalue + '" class="' + className + '" style="'+styleCss+'">'];
                var i = 0;
                if(isLock){
                    if (that.isCheck) {
                        var chObj="&nbsp;";
                        if(!isHandle){
                            chObj='<input selectTr="true"  type="'+that.selectType+'" style="margin:0px;" name="' + that.checkName + '">';
                        }
                        tds.push('<th><div class="tdInner" style="width:30px" >'+chObj+'</div></th>');
                    }
                    if (that.rownumbers) {
                        var v=((that.pageIndex - 1) * that.pageSize) + (index + 1);
                        if(isHandle){
                            v="&nbsp;";
                        }
                        trData["rowNum"] =v;
                        tds.push(createTd(columns[0], trData,index,false));
                        i = 1;
                    }
                }
                for (; i < columns.length; i++) {
                    tds.push(createTd(columns[i], trData,index,isHandle));
                }
                tds.push("</tr>");
                return tds.join("");
            }
            return "";
        };
        var groupData = function () {
            var trStr = '<table cellpadding="0px" id="#id#" cellspacing="0px">#content#</table>';
            var lockTrs=[];
            var basicTrs=[];
            var linkTrs=[];
            (function(){
                that.dataMap = {};
                if(that.datas&&that.datas.length){
                    if(!that.handleStatic&&that.handleColumns&&that.handleColumns.length){
                        var handlePojo={};
                        for(var i=0;i<that.handleColumns.length;i++){
                            var hC=that.handleColumns[i];
                            handlePojo[hC.code]=hC.handle(that.datas);
                        }
                        that.datas.push(handlePojo);
                        that.handleStatic=true;
                    }
                    for (var i = 0; i < that.datas.length; i++) {
                        var data = that.datas[i];
                        var isHandle=false;
                        if(that.handleColumns&&that.handleColumns.length&&((i+1)==that.datas.length)){
                            isHandle=true;
                        }
                        lockTrs.push(createTr(data, i,that.lockColumns,that.lockColumnStatic,isHandle));
                        basicTrs.push(createTr(data, i,that.basicColumns,!that.lockColumnStatic,isHandle));
                        linkTrs.push(createTr(data, i,that.linkColumns,false,isHandle));
                        that.dataMap[data[that.primaryKey]] = data;
                    }
                    if(that.lockColumns.length){
                        $("#"+that.lContentTableName).html(trStr.replace("#id#",that.lTableName).replace("#content#", lockTrs.join("")));//先镇充锁定列数据，用于后续计算
                    }
                    $("#"+that.bContentTableName).html(trStr.replace("#id#",that.bTableName).replace("#content#", basicTrs.join("")));
                    if(that.linkColumns.length){
                        $("#"+that.linkContentTableName).html(trStr.replace("#id#",that.linkTableName).replace("#content#", linkTrs.join("")));//先镇充锁定列数据，用于后续计算
                    }
                }else{
                    $("#"+that.bContentTableName).html('<span class="noData">暂无数据</span>');
                    $("#"+that.bContentTableName).children('.noData').css('width',$("#" + that.bHeadDivName).children('table').width());
                }
            })();
            if (groupContentFun) {
                groupContentFun();
            }
        };
        var checkFormatForm=function(){
            if(typeof(that.form) === "object"&&that.form instanceof SearchForm){
                return that.form.checkFormFormat();
            }
            return true;
        };
        if (that.datas && isFlush) {
            groupData();
            return;
        }
        if (that.url) {
            if(!checkFormatForm()){
                 that.datas = [];
                 groupData();
                 return;
            }
            var params = that.getPagesParams() + "&" + that.serializeForm(isNextPage);
            if(that.params){
                params+="&"+that.params;
            }
            var _bizTotalFlag =false;
            try{
                if (typeof(that.form) === "string") {
                    _varStr = $("#" + that.form).serialize();
                } else if (typeof(that.form) === "object"&&that.form instanceof SearchForm) {
                    _bizTotalFlagVal = that.form.getObj("bizTotalFlag").value;
                    if('Y'== _bizTotalFlagVal){
                        _bizTotalFlag = true;
                        that.form.getObj("bizTotalFlag").value='N';
                    }
                }
            }catch(e){}
            
            jyAjax(that.url, params, function (result) {
                var _lastToltal = that.totalRows;
                if(that.loadEndFun){
                    that.loadEndFun(result);
                }
                if (result && result.data) {
                    if (typeof (result.pageIndex) == "number") {
                        that.pageIndex = result.pageIndex;
                    }
                    if (typeof (result.pageSize) == "number") {
                        that.pageSize = result.pageSize;
                    }
                    if (typeof (result.totalRows) == "number") {
                        that.totalRows = result.totalRows;
                    }
                    if(isNextPage || typeof(isNextPage)=="undefined"){
                        if(that.totalRows == 0 && _lastToltal >0){
                            that.totalRows = _lastToltal;
                        }
                        that.datas = result.data;
                    }else{
                        if(that.totalRows == 0 && _lastToltal >0){
                            that.totalRows = _lastToltal;
                        }
                        //that.datas = result.data;
                    }
                    groupData();
                    that.isRefrash=true;
                }
            },null, null, null,null, _bizTotalFlag);
        } else {
            that.datas = this.ts.datas;
            groupData();
        }
        
    },
    getPagesParams: function () {
        var that = this;
        that.pageSize = $("#" + that.psName).val() || that.pageSize;
        var params = "pageIndex=" + that.pageIndex + "&pageSize="
            + that.pageSize + "&selectRowIndex=" + this.selectRowIndexes;
        if (that.sortName && that.sortType) {
            params += "&sortName=" + that.sortName + "&sortType="
                + that.orderParams[that.sortType];
        }
        return params;
    },
    serializeForm: function (isNextPage) {
        var that = this;
        var _varStr = "";
        if (that.form) {
            if (typeof(that.form) === "string") {
                _varStr = $("#" + that.form).serialize();
            } else if (typeof(that.form) === "object"&&that.form instanceof SearchForm) {
                _varStr =  that.form.serialize();
            }
        }
        /*if(isNextPage && _varStr){
            if(_varStr.indexOf("bizTotalFlag=Y") >= 0){
                _varStr = _varStr.replace("bizTotalFlag=Y", "bizTotalFlag=N");
            }
        }*/
        return _varStr;
    },
    /**
     * 整合表尾内容
     */
    createTableFoot: function () {
        var that = this;
        return {
            "getFooterDiv":function(){
                if (!that.hiddenFooter) {
                    return '<div class="tableFooter" id="' + that.footerName + '"></div>';
                }
                return "";
            },
            "flushFooter":function(){
                if (!that.hiddenFooter) {
                    var groupFoot = function () {
                        var footerArray = ['<ul>'];
                        if (that.isPage) {
                            var optionStr = ['<li><select style="min-width:50px;" id="' + that.psName + '">'];
                            for (var i = 0; i < that.ts.pages.length; i++) {
                                var value = that.ts.pages[i];
                                var selectedStr = "";
                                if (value == that.pageSize) {
                                    selectedStr = "selected='selected'";
                                }
                                optionStr.push("<option " + selectedStr + " value='" + value + "'>" + value + "</option>");
                            }
                            optionStr.push("</select></li>");
                            footerArray.push(optionStr.join(""));
                        }
                        var createSD = function () {
                            return '<li><div class="splitDiv"></div></li>';
                        };
                        var createBtn = function (css, text) {
                            return '<li><div class="footerBtnDiv"><span class="footerBtn ' + css + '" title="' + text + '" extId="' + css + '"></span></div></li>';
                        };
                        if (that.pageIndex && that.pageIndex > 1) {
                            footerArray.push(createSD());
                            footerArray.push(createBtn("first", "首页"));
                            footerArray.push(createBtn("prev", "上一页"));
                        }
                        footerArray.push(createSD());
                        footerArray.push('<li>' + that.pageIndex + '&nbsp;/&nbsp;' + that.pageCount + '</li>');
                        if (that.pageIndex < that.pageCount) {
                            footerArray.push(createSD());
                            footerArray.push(createBtn("next", "下一页"));
                            footerArray.push(createBtn("last", "尾页"));
                        }
                        footerArray.push(createSD());
                        footerArray.push('<li>跳转到&nbsp;<input id="' + that.tableName + 'FlushInput"' + 'class="fonterJumpInput"></li>');
                        footerArray.push(createBtn("brush", "刷新"));
                        footerArray.push(createSD());
                        var showPageSize = ((that.pageIndex - 1) * that.pageSize + 1) + "-" + ((that.pageIndex - 1) * that.pageSize + that.getRowsCount());
                        footerArray.push('<li style="float:right; margin-right:20px;">当前' + showPageSize + ',总计' + that.totalRows + ',每页' + that.pageSize + "</li>");
                        footerArray.push('</ul>');
                        return footerArray.join("");
                    };
                    that.pageCount = parseInt(that.totalRows / that.pageSize);
                    if (that.totalRows % that.pageSize > 0) {
                        that.pageCount += 1;
                    }
                    $("#"+that.footerName).html(groupFoot());
                }
                that.addFooterEvent();
            }
        }
    },
    getEditData: function () {
        var editDatas = [];
        for (var i = 0; i < this.datas.length; i++) {
            var d = this.datas[i];
            if (d.isEdit&&(!d.isNew)) {
                editDatas.push(d);
            }
        }
        return editDatas;
    },
    getAllData:function(){
        return this.datas;
    },
    getAllDataJson:function(){
        return this.datasToJsonStr(this.datas,["editObj"]);
    },
    getEditDataJson:function(){
        return this.datasToJsonStr(this.getEditData());
    },
    getNewData:function(){
         var editDatas = [];
         for (var i = 0; i < this.datas.length; i++) {
             var d = this.datas[i];
             if (d.isNew) {
                 editDatas.push(d);
             }
         }
         return editDatas;
    },
    getNewDataJson:function(){
        return this.datasToJsonStr(this.getNewData());
    },
    eachTablesTd:function(trObj,fun){
        var that=this;
        if(trObj){
            var rowIndex=$(trObj).index();
            var tableNames=[that.bTableName,that.lTableName];
            for(var i=0;i<tableNames.length;i++){
                var trJqName="#"+tableNames[i] +" tr:eq("+rowIndex+")";
                if(fun){
                    fun($(trJqName));
                }
            }
        }
    },
    eachAllTd:function(fun){
        var that=this;
        var tableNames=[that.bTableName,that.lTableName];
        for(var i=0;i<tableNames.length;i++){
            var tds=$("#"+tableNames[i] +" tr td").each(function(){
                var td=$(this);
                if(fun){
                    fun(td);
                }
            });
        }
    },
    addFooterEvent: function () {
        var that = this;
        var events = {
            first: function () {
                that.pageIndex = 1;
            },
            prev: function () {
                that.pageIndex -= 1;
            },
            next: function () {
                that.pageIndex += 1;
            },
            last: function () {
                that.pageIndex = that.pageCount;
            },
            brush: function (pageIndex) {
                var obj= $("#"+that.tableName + "FlushInput");
                if(!isNaN(Number(obj.val())))
                {
                    var pIndex=Number(obj.val());
                    if(pIndex>0&&pIndex<=that.pageCount)
                    {
                        that.pageIndex=pIndex;
                        that.show(true,true);
                    }
                }
            }
        };
      var   checkFun =function(trIndex){
            var lockTable=$("#"+that.lContentTableName);
            var basicTrs=$("#"+that.bContentTableName).find('tr');
            var searchTable=lockTable.find('tr');
            if(!searchTable.length){
                searchTable=basicTrs;
            }
            var index=0;
            searchTable.each(
                function () {
                    var thisTr=$(this);
                    var basicTr_jquery=$(basicTrs[index]);
                    var kValue=that.dataMap[thisTr.attr("kValue")];
                    var tCheck = thisTr.find("input[type='"+that.selectType+"']")[0];//有待遇通过名字区分
                    var checkSelectedFun=function(fun,result){
                        if(tCheck){
                            tCheck.checked=result;
                        }
                        if(fun){
                            fun(kValue);
                        }
                    }
                    if(index==trIndex){
                        if(!thisTr.hasClass("trSelected")){
                            thisTr.addClass("trSelected");
                            basicTr_jquery.addClass("trSelected");
                            checkSelectedFun(that.checkedFun,true);
                        }else{
                            thisTr.removeClass("trSelected");
                            basicTr_jquery.removeClass("trSelected");
                            checkSelectedFun(that.cancelCheckFun,false);
                        }
                    }else{
                        if(that.selectType=="radio"){
                            thisTr.removeClass("trSelected");
                            basicTr_jquery.removeClass("trSelected");
                        }
                    }
                    index++;
                }
            );
        };
        var trClickOp = function (obj, fun) {
            if (obj.tagName == "TD" || obj.tagName == "DIV"||$(obj).attr("type")=="radio") {

                if ($(obj).attr("isTd")) {
                    var tr = jyTools.getParentNodeByTagName(obj,"TR");
                    if(tr){
                        var tr_j=$(tr);
                        checkFun(tr_j.index());
                        var k = tr_j.attr("kValue");
                        if (fun) {
                            fun(that.dataMap[k]);
                        }
                    }
                }

            }
        };
        var editRow = function (trObj) {
            var selectOptions = function (curtext, optionData) {
                var options = [];
                for (var i = 0; i < optionData.length; i++) {
                    if ((curtext+"").length&&(curtext == optionData[i].value)){
                        options.push("<option value='" + optionData[i].value + "' selected='true'>" + optionData[i].text + "</option>");
                    }else{
                        options.push("<option value='" + optionData[i].value + "'>" + optionData[i].text + "</option>")};
                }
                return options.join("");
            };
            var setCheckType=function(colObj){// 用来设置数据校验样式
                var checkType=[];
                if(colObj.notNull)
                {
                    checkType.push(' notNull="true" ');
                }
                if(colObj.maxLength)
                {
                    checkType.push('  maxLength='+colObj.maxLength);
                }
                if(colObj.checkType)
                {
                    checkType.push('  checkType="'+colObj.checkType+'"  ');
                }
                if(colObj.regExp)
                {
                    checkType.push('  regExp="'+colObj.regExp+'"  ');
                }
                if(colObj.checkFun)
                {
                    checkType.push('  checkFun="'+colObj.checkFun+'"  ');
                }
                return checkType.join(" ");
            };
            var getEditObj = function (tdData, tdColumn,trData) {

                if (tdData==undefined||tdData==null) {
                    tdData = "";
                }
                var id=' id="'+tdColumn.code+'_" ';
                var obj =
                {
                    "text": function () {
                        return $('<input ' +id+' type="text" '+setCheckType(tdColumn)+'  style="width:100%;" value="' + tdData + '"/>');
                    },
                    "textArea":function(){
                        return $('<textArea ' +id+' type="text" '+setCheckType(tdColumn)+'  style="width:100%;" >'+tdData+'</textArea>');
                    },
                    "select": function () {
                        return $('<select ' +id +setCheckType(tdColumn)+'>' + selectOptions(tdData, tdColumn.value) + '</select>');
                    },
                    "money": function () {
                        return $('<input ' +id+'  type="text"   checkType="number"   style="width:100%;" value="' + tdData + '"/>');
                    },
                    "date":function()
                    {
                        if(tdData){
                            tdData=that.formatData()["date"](tdData, tdColumn);
                        }
                        var dateObj=$('<input type="text"  '+id+'  style="width:100%;" value="' +tdData  + '"/>');
                        dateObj.bind("click",function(){
                            var own=$(this);
                            var dataFormat={dateFmt:'yyyy-MM-dd',onpicked:function(){
                                if(tdColumn.eventName=="blur"||tdColumn.eventName=="change"){
                                    tdColumn.eventFun(own,trData,tdColumn);
                                }
                            }};
                            if(tdColumn.maxDateCode){
                                //dateObj_S.maxDate="#F{$dp.$D(\''+endId.replace("#","")+'\')}';
                                dataFormat["maxDate"]="#F{$dp.$D('"+(tdColumn.maxDateCode+"_")+"')}"
                            }
                            if(tdColumn.minDateCode){
                                dataFormat["minDate"]="#F{$dp.$D('"+(tdColumn.minDateCode+"_")+"')}"
                            }
                            WdatePicker(dataFormat);
                        });
                        return dateObj;
                    },
                    "checkbox":function()
                    {
                        var checked=tdData==true?"checked='true'":"";
                        return $('<input ' +id+'  type="checkbox" style="width:100%;" '+checked+' />');
                    },
                    "tree":function()
                    {
                        var tTextObj=$('<input ' +id+'  type="text" id="txttree_'+new Date().getTime()+'" style="width:100%;" value="' + tdData + '" >');
                        tTextObj.treeMenu({"treeUrl":tdColumn.url,"treeType":"radio","width":tdColumn.width,"height":"auto","isFocus":true});
                        return tTextObj;
                    }
                };
                var returnObj=obj[tdColumn.type]();
                if(tdColumn.eventName){
                    returnObj.bind(tdColumn.eventName,function(ev){
                        if(tdColumn.eventFun){
                            return tdColumn.eventFun(ev,$(this),trData);
                        }
                    })
                }
                 return returnObj[0];


            };

            var getSelectTextByVal=function(val, dataArr) {
                for (var i = 0; i < dataArr.length; i++) {
                    if (val == dataArr[i].value){
                        return dataArr[i].text;
                    }
                }
            };
            var kValue = $(trObj).attr("kValue");
            var trDataObj = that.dataMap[kValue];
            var linkDownObj=[];
            

            that.eachTablesTd(trObj,function(jqTrObj){
                var trObj=jqTrObj.find("td").each(function (i) {
                    var tdObj = $(this);
                    var extName = tdObj.attr("extName");
                    if (extName) {
                        var tdValue = trDataObj[extName];
                        var tdColumn = that.getColumnByCode(extName);
                        if(tdColumn.type=="radio")
                        {
                            var rd_click=function(obj){
                                var key=trDataObj[that.primaryKey];
                                if( that.dataMap[key][tdColumn.code]!=obj.value)
                                {
                                    that.dataMap[key][tdColumn.code]=obj.value;
                                    that.dataMap[key]["isEdit"]=true;
                                }
                            };

                         tdObj.find("[type=radio]").bind("click",function(){
                             rd_click(this);
                         })
                            var obj = event.srcElement || event.target;
                            rd_click(obj);
                            return;
                        }
                        if (tdColumn.isEdit) {

                            // 1.隐藏td 内部div
                            var innerDiv=tdObj.find("div")[0];
                        var html = $(getEditObj(tdValue, tdColumn,trDataObj));
                            $(innerDiv).html(html);
                            if(tdColumn.linkObj){
                                var linkObjValue=trDataObj[tdColumn.linkObj]
                                linkDownObj.push([html,{"linkObj":tdColumn.linkObj+"_",type:tdColumn.linkType,linkFun:tdColumn.linkFun,linkUrl:tdColumn.linkUrl,"defaultValue":linkObjValue,"callFun":function(datas){
                                    var linkColumn=that.getColumnByCode(tdColumn.linkObj);
                                    linkColumn.value=datas;
                                }}]);
                            }
                            tdObj.removeClass("checkError");
                            var changeFun=function (ev) {
                                var own=$(this);
                                checkFormatByObjs([this]);
                                checkIsNullByObjs([this]);
                                if (!(own.val() === tdValue)) {
                                    trDataObj["isEdit"] = true;
                                    var editObj={"oldValue":tdValue,"newValue":own.val(),"code":extName,"name":tdColumn.display};
                                    if(trDataObj["editObj"]){
                                        trDataObj["editObj"][extName]=editObj;
                                    }else{
                                        trDataObj["editObj"]={extName:editObj};
                                    }
                                    trDataObj[extName] = own.val();
                                    var htmlval = own.val();
                                    if (this.tagName == "SELECT") {
                                        htmlval = getSelectTextByVal(htmlval, this.options);
                                    }
                                    if(own.attr("type")=="checkbox")
                                    {
                                        var tdcol = that.getColumnByCode(extName);
                                        var chkVal=Number(this.checked);
                                        trDataObj[extName]=chkVal;
                                        htmlval=tdcol.value[chkVal];
                                    }
                                }
                            };
                            html.bind("blur", changeFun);
                        }
                    }
                });
            });
            
            if(linkDownObj.length){
                for(var i=0;i<linkDownObj.length;i++){
                    var linkObj=linkDownObj[i];
                    linkObj[0].downLink(linkObj[1]);
                }
            }
        };
        var oldEditTr="";
        var  validationInput=function(obj,tdObj){
             if(checkIsNullByObjs([obj])&&checkFormatByObjs([obj])){
                 tdObj.removeClass("checkError");
             }else{
                 tdObj.addClass("checkError");
             }
        };

        // 是否允许行编辑
        var isEdit = function (trObj) {
            var key=$(trObj).attr("kValue");
            var check = function () {
                for (var i = 0; i < that.columns.length; i++) {
                    var c = that.columns[i];
                    if (c.isEdit) {
                        return true;
                    }
                }
                return false;
            };
            function editOP(){
                if (oldEditTr) {
                    if ($(oldEditTr).attr("kValue") != key) {
                        return check();
                    }
                } else {
                    return check();
                }
            }
            if(that.editFilterFun){
                var rowData=that.dataMap[key];
                if(that.editFilterFun(rowData)){
                   return   editOP();
                }
            }else{
                return editOP();
            }
            return false;
        };

        $(that.container).unbind().bind('click', function (ev, obj) {
            var obj = ev.srcElement || ev.target;
            var extId = $(obj).attr("extId");
            /**分页处理功能**/
            if (extId && events[extId]) {
                events[extId]();
                that.show(true,true);
            /**点击单选及多选按钮时对表格的处理**/
            }else if (obj.tagName == "INPUT" &&(obj.type == "checkbox"||obj.type=="radio" ) && $(obj).attr("selectTr")) {
                if (obj.name == that.checkName) {
                     var tr = jyTools.getParentNodeByTagName(obj,"TR");
                     checkFun($(tr).index());
                    var k = $(tr).attr("kValue");
                    if (that.clickFun) {
                        that.clickFun(that.dataMap[k]);
                    }
                }
            /**链接操作，比如修改等功能**/
            } else if (obj.tagName == "A") {
                var k = $(obj).attr("kValue");
                var index = $(obj).attr("index");
                var cName = $(obj).attr("cName");
                if (k) {
                    for (var i = 0; i < that.columns.length; i++) {
                        var c = that.columns[i];
                        if (cName === c.code) {
                            c.value[index]["action"](that.dataMap[k],obj);
                        }
                    }
                }
            }else {
                var trObj = jyTools.getParentNodeByTagName(obj,"TR");// oldEditTr用来保存上一个编缉的行信息
                if (isEdit(trObj)) {
                    that.eachTablesTd(oldEditTr,function(editTr){
                         $(editTr).find("td>div[isEdit=true]").each(function () {
                            var divEl=$(this);
                            var tdObj=divEl.parent();
                            var childEls=divEl.children();
                            var extName=tdObj.attr("extName");
                            var values=[];
                            childEls.each(function(){
                                validationInput(this,tdObj);
                                var columnObj = that.getColumnByCode(extName);
                                var value=that.formatData()[(columnObj.type || "text")]($(this).val(), columnObj);
                                values.push(value);
                            });
                            divEl.html(values.join(""));
                         });
                    });
                    oldEditTr = trObj;
                    editRow(trObj);
                }
            }
            trClickOp(obj, that.clickFun);
        /**行双击时要做的操作**/
        }).bind("dblclick", function (ev, obj) {
            if (that.dbClickFun) {
                var obj = ev.srcElement || ev.target;
                trClickOp(obj, that.dbClickFun);
            }
        });
        $("#"+that.tableName + "FlushInput").bind('keyup',function(e){
            if(e.keyCode==13) {
                 events["brush"]();
            }
        });
        
        /**调整表格宽度功能**/
        var moveBit = false;
        var mleft = 0;
        var mdownX = 0;
        var moveObj;
        var offset = 0;
        $(that.container).bind("mousemove", function (ev, obj) {
            var obj = ev.srcElement || ev.target;
            var endObj = $(obj);
            if (endObj.attr("headMove")) {
                var thObj = obj;
                if (obj.tagName == "DIV") {
                    thObj = obj.parentNode;
                }
                var w = thObj.offsetWidth;
                var X = ev.offsetX;
                if ((X + 4) >= w) {
                    $(this).addClass("hrMove");
                    moveBit = true;
                } else {
                    moveBit = false;
                    $(this).removeClass("hrMove");
                }
            }
        }).bind("mousedown", function (ev) {
            var obj = ev.srcElement || ev.target;
            if ($(obj).attr("headMove") && moveBit) {
                moveObj = obj;
                if (obj.tagName == "DIV") {
                    moveObj = obj.parentNode;
                }
                var endObj = $(moveObj);
                offset = 0;
                mdownX = ev.pageX;
                var l = endObj.offset().left;
                var t = endObj.offset().top;
                var w = endObj.width();
                var h = $("#" + that.bHeadDivName).height() + $("#" + that.bContentTableName).height();
                var m = $("#" + that.moveDivName);
                mleft = l + w;
                m.css("left", mleft);
                m.css("top", t);
                m.css("height", h);
                var mask = $("#" + that.moveMaskDivName);
                mask.show();
            }
        });
        $("#" + that.moveMaskDivName).unbind().bind('mousemove', function (ev, obj) {
            if (moveBit && moveObj) {
                var nx = ev.pageX;
                // console.log(ev.pageX);
                var m = $("#" + that.moveDivName);
                offset = nx - mdownX;
                m.css("left", mleft + offset);
            }
        }).bind("mouseup", function (ev) {
            var obj = ev.srcElement || ev.target;
            $(that.container).removeClass("hrMove");
            var mask = $("#" + that.moveMaskDivName);
            var findTd = function (index) {
                var table =$("#"+$(moveObj).attr("link"))[0];
                var cells = [];
                if(table){
                    for (var i = 0; i < table.rows.length; i++) {
                        var row = table.rows[i];
                        for (var j = 0; j < row.cells.length; j++) {
                            if (j == index) {
                                cells.push(row.cells[j]);
                            }
                        }
                    }
                }
                return cells;
            };
            if (moveBit && moveObj) {
                var o = $(moveObj);
                var index = o.attr("index");
                var cells = findTd(index);
                cells.push(o[0]);
                var w=0;
                for (var i = 0; i < cells.length; i++) {
                    var innerDiv = $(cells[i]).find("div");
                    w=innerDiv.width() + offset
                    innerDiv.css("width", w);
                }
                var cName=$(moveObj).attr("linkColumn");
                var column=that.getColumnByCode(cName);
                column["width"]=w;
                
            }
            moveBit = false;
            moveObj = null;
            that.resize();
            mask.hide();
        });
        $(window).bind("resize",function(){
            that.resize();
        })
        /**表格进行滚时带动标题栏进行横向滚动**/
        $("#" + that.bContentTableName).unbind().bind('scroll', function (ev, obj) {
            var obj = ev.srcElement || ev.target;
            var l = obj.scrollLeft;
            $("#" + that.btHeadTableName).css("margin-left", (-l) + "px");
        });
        $("#" + that.checkAllName).unbind().bind('click', function (ev, obj) {
            $("input[name='" + that.checkName + "']").each(function (i) {
                var obj = ev.srcElement || ev.target;
                $(this)[0].checked = obj.checked;
                var trObj=jyTools.getParentNodeByTagName($(this)[0],"tr");
                that.eachTablesTd(trObj,function(jqTrObj){
                    if (obj.checked) {
                        jqTrObj.addClass("trSelected");
                    } else {
                        jqTrObj.removeClass("trSelected");
                    }
                });
                return;
            });
            if(that.checkAllFun){
                that.checkAllFun(that.getSelectedObjs());
            }
        });
        /**排序功能**/
        (function(){
            var fun=function (ev, obj) {
                var target = ev.srcElement || ev.target;
                if (target.tagName === "A") {
                    that.sortName = $(target).attr("sortName");
                    that.sortType = (that.sortType + 1) % 3;
                    that.show(true);
                }
            }
             $("#" + that.bHeadDivName).unbind().bind("click",fun );
             $("#" + that.lHeadDivName ).unbind().bind("click",fun );
        })()
        /**工具栏操作**/
        if (typeof(that.toolbar) != "string") {
            $("#" + that.toolbarName).unbind().bind("click", function (ev, obj) {
                var target = ev.srcElement || ev.target;
                if (target.tagName === "A") {
                    var endObj=$(target);
                    var clicked=endObj.attr("clicked");
                    if(!(clicked&&clicked=="true")){
                        endObj.attr("clicked","true");
                        index = endObj.attr("index");
                        var fun = that.toolbar[index].action;
                        fun(that);
                        endObj.attr("clicked","");
                    }
                }
            });
        }
        /**切换页处理**/
        $("#" + that.psName).bind("change",function(){
            that.pageSize=$(this).val();
            that.pageIndex=1;
            that.totalRows=0;
            //that.show(true);
            that.query(true);
            if(that.changePageFun){
                that.changePageFun();
            }

        });
    },
    removeByIndex: function (index) {
        var that=this;
        this.datas.splice(index, 1);
        that.flush();
        that.selectRowByIndex(index-1)
    },
    /**
     * 开放接口，用于直接移除选中的行
     */
    removeSelectedRow: function () {
        var that = this;
        var remove = function (key) {
            for (var i = 0; i < that.datas.length; i++) {
                var d = that.datas[i];
                if (d[that.primaryKey] == key) {
                    that.datas.splice(i, 1);
                    break;
                }
            }
        };
        $('tr.trSelected').each(function () {
            var k = $(this).attr("kvalue");
            if (undefined != k && null != k) {
                if (that.dataMap[k]) {
                    remove(k);
                    that.dataMap[k] = null;
                }
            }
            that.flush();
        });

    },
    removeById: function (id) {
        for (var i = 0; i < this.datas.length; i++) {
            var d = this.datas[i];
            if (d[this.primaryKey] == id) {
                this.removeByIndex(i);
                return;
            }
        }
    },
    checkFormat:function(){
        var that=this;
        var errorCount=0;
        var checkByType=function(value,column,data){
            var ec=0;
            var checkFun= {
                "notNull":function(){
                    if(null==value||undefined==value||""===value||(value+"").trim().length==0){
                        return 1;
                    }
                    return 0;
                },
                "maxLength":function(){
                    if(null!=value&&undefined!=value&&""!=value){
                        var length=(value+"").replace(/[\u4E00-\u9FA5]/g, 'xxx').length;
                        if(length>column.maxLength){
                            return 1;
                        }
                    }
                    return 0;
                },
                "checkType":function(){
                    var regExp = regExps[column.checkType];
                    if (regExp) {
                       if(!regExp.test(value+"")){
                           return 1;
                       }
                    }
                    return 0;
                },
                "regExp":function(){
                    var regExp=column.regExp;
                    if (regExp) {
                       if(!regExp.test(value+"")){
                           return 1;
                       }
                    }
                    return 0;
                },
                "checkFun":function(){
                    if(column.checkFun){
                        if(column.checkFun(value,data)){
                            return 1;
                        }
                    }
                    return 0;
                }
            };
            for(var k in column){
                if(checkFun[k]){
                    
                    ec+=checkFun[k]();
                }
            }
            return ec;
        };
        $("#"+that.bTableName).find('tr').each(
             function () {
                 that.eachTablesTd($(this),function(trObj){
                     var mapKey=trObj.attr("kValue");
                     trObj.find('td').each(
                         function(){
                             var tdObj=$(this);
                             var extId=tdObj.attr("extname");
                             var data=that.dataMap[mapKey];
                             var value=data[extId];
                             var column=that.getColumnByCode(extId);
                             var count=checkByType(value,column,data);
                             if(count){
                                 tdObj.addClass("checkError");
                                 errorCount=errorCount+count;
                             }else{
                                 tdObj.removeClass("checkError");
                             }
                         }
                     );
                });
                 
             }
         );
        return errorCount;
    },
    selectRowByIndex: function (rowIndex) {

      //  checkFun(rowIndex);
    },
    selectRowById: function (id) {
    },
    dataToJsonStr:function(data,filterColumns){
        var cols=[];
        for(var key in data){
            var isTrue=true;
            if(filterColumns){
                if(filterColumns.indexOf(key)<0){
                    isTrue=true;
                }else{
                    isTrue=false;
                }
            }
            if(isTrue){
                var value=data[key];
                if(null!=value&&undefined!=value&&(value+"").length>0){
                    var column=this.getColumnByCode(key);
                    if(column){
                        if(column.type=="date"){
                            value=this.formatData()["date"](value, column);
                        }
                    }
                    cols.push("'"+key + "':'" + value + "'");
                }
            }
        }
        return "{" + cols.join(",") + "}";
    },
    datasToJsonStr:function(datas,fifterColumns){
        var jsonStr=[];
        for(var i=0;i<datas.length;i++){
            jsonStr.push(this.dataToJsonStr(datas[i],fifterColumns));
        }
        return "[" + jsonStr.join(",") + "]";
    },
    toJson: function (filterFun) {
        var newData = [];
        for (var i = 0; i < this.datas.length; i++) {
            var data = this.datas[i];
            if(filterFun){
                if(filterFun(data)){
                    newData.push(data);
                }
            }else{
                newData.push(data);
            }
        }
        return this.datasToJsonStr(newData,["editObj"]);
    },
    getPageIndex: function () {
        return this.pageIndex;
    },
    getPageSize: function () {
        return this.pageSize;
    },
    getSelectIndex: function () {
        return this.selectRowIndexes;
    }
};
(function ($) {
    $.fn.newTable = function (tableStructure, name) {
        var tname = "tname" + (new Date()).getTime()+Math.round((Math.random()*100));
        if (name) {
            tname += name;
        }
        return new Table(tableStructure, tname, $(this)[0]);
    };
})(jQuery);

