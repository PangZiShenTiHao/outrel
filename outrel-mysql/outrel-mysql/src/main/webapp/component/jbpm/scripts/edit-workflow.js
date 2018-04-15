
Ext.ns('App');

App = {
    webforms: {},

    init: function() {
        Ext.QuickTips.init();
        this.propertyManager = new App.property.PropertyManager();

        var viewport = new Ext.Viewport({
            layout: 'border',
            items: [
                this.createNorth(),
                this.createSouth(),
                this.createWest(),
                this.createEast(),
                this.createCenter()
            ]
        });
        //加载initEditor...
        //this.initEditor();

        setTimeout(function() {
            Ext.get('loading').remove();
            Ext.get('loading-mask').fadeOut({remove:true});
        }, 100);
    },

    initEditor: function(v_id) {
    
    	var xml = "";
    	//如果流程为null 则默认展示一个例子
	    if(!v_id || v_id == 'null' ){
	         xml = "<?xml version='1.0' encoding='UTF-8'?>"
	            + "<process name='exampleProName' key='exampleKey' version='1' xmlns='http://jbpm.org/4.4/jpdl'>"
	            +"<description>例子</description>"
			  + "<start g='130,106,48,48' name='start 1'>"
			    + " <transition to='任务1' name='开始' g='-2,-2' />"
			  + "</start>"
			  + "<end g='505,107,48,48' name='end 1'/>"
			  + "<task g='287,107,90,50' name='任务1' assignee='#{owner}'>"
			    + "<transition to='end 1' name='结束' g='-7,-3' />"
			  + "</task>"
			            + "</process>";
	     }else{
	     	/*//DWR设置同步：
			dwr.engine.setAsync(false);
			TemporaryJbpm4InfoServiceImpl.getOneProcessXMLContent(v_id,function(data){
				//初始化修改的信息
				xml = data;
			});
		   	//DWR设置异步：
		   	dwr.engine.setAsync(true);*/
		   	//通过 ajax 查询获取
		   	$.ajax({
		   		type: 'POST',
		   		url:Gef.GET_PRO_DEF_XML,
		   		async:false,
		   		data:{keyId:v_id},
		   		dataType:"text",
		   		error: function(){alert('error');},
		   		success: function(data){
		   			//初始化修改的信息
		   			var v_data = data.split("龍");
		   			//业务目录
		   			Gef.PROCESS_BIZ_FILE=v_data[0];
					xml = v_data[1];
		   		}
		   		
		   		
		   	});
		   	
	     }
		
			
		
        var editor = new Gef.jbs.ExtEditor();
        var input = new Gef.jbs.JBSEditorInput();
        //有数据
        if(xml){
         input.readXml(xml);
        }
       

        var workbenchWindow = new Gef.ui.support.DefaultWorkbenchWindow();
        workbenchWindow.getActivePage().openEditor(editor, input);

        workbenchWindow.render();

        Gef.activeEditor = editor;
		//添加事件
		//alert("cheng:initSelectionListener");
        this.propertyManager.initSelectionListener(editor);
    },

    getProcessModel: function() {
        var viewer = Gef.activeEditor.getGraphicalViewer();
        var processEditPart = viewer.getContents();
        return processEditPart.model;
    },

    createNorth: function() {
        var p = null;
        if (Gef.MODE_DEMO === true) {
            p = new Ext.Panel({
                region: 'north'
            });
        } else {
            p = new Ext.Panel({
                region: 'north',
                html:'<div class="top"><div class="logo font-16">Web工作流设计器</div></div>'
				
            });
        }

        App.northPanel = p;
        return p;
    },

    createSouth: function() {
        var p = this.propertyManager.getBottom();
        return p;
    },

    createWest: function() {
        var p = new App.PalettePanel({
            collapsible: true
        });

        App.westPanel = p;
        return p;
    },

    createEast: function() {
        var p = this.propertyManager.getRight();
        return p;
    },

    createCenter: function() {
        var p = new App.CanvasPanel();

        App.centerPanel = p;
        return p;
    },

    getSelectionListener: function() {
        if (!this.selectionListener) {
            this.selectionListener = new Gef.jbs.ExtSelectionListener(null);
        }
        return this.selectionListener;
    }
};

/*
Gef.override(App.PalettePanel, {
    configItems: function() {
        this.html = 'sdfasfdfdsa';
    }
});
*/

//Gef.PALETTE_TYPE = 'plain';
Gef.PALETTE_TYPE = 'accordion';

Ext.onReady(App.init, App);

App.CanvasPanel = Ext.extend(Ext.Panel, {
    initComponent: function() {
        //this.on('bodyresize', function(p, w, h) {
        //    var b = p.body.getBox();
        //});
        this.region = 'center';
        this.autoScroll = true;
        this.tbar = new Ext.Toolbar([{
            text: '新建',
            iconCls: 'tb-new',
            handler: function() {
                Gef.activeEditor.reset();
            }
        }, {
            text: '导入',
            iconCls: 'tb-webform',
            handler: function() {
            	//获取现有的 xml 字符串
                var xml = Gef.activeEditor.serial();
                
                if (!this.openWin) {
                	
                    this.openWin = new Ext.Window({
                        title: 'xml',
                        layout: 'fit',
                        width: 500,
                        height: 300,
                        closeAction: 'hide',
                        modal: true,
                        items: [{
                            id: '__gef_jbpm4_xml_import__',
                            xtype: 'textarea'
                        }],
                        buttons: [{
                            text: '导入',
                            handler: function() {
                        	//alert("cheng start 导入...");
                                var xml = Ext.getDom('__gef_jbpm4_xml_import__').value;
                                //alert("cheng xml---"+xml);
                                Gef.activeEditor.resetAndOpen(xml);
                                this.openWin.hide();
                            },
                            scope: this
                        }, {
                            text: '取消',
                            handler: function() {
                                this.openWin.hide();
                            },
                            scope: this
                        }]
                    });
                    this.openWin.on('show', function() {
                        Gef.activeEditor.disable();
                    });
                    this.openWin.on('hide', function() {
                        Gef.activeEditor.enable();
                    });
                }
                this.openWin.show(null, function() {
                    Ext.getDom('__gef_jbpm4_xml_import__').value = xml;
                });
            }
        }, {
            text: '导出',
            iconCls: 'tb-prop',
            handler: function() {
                var xml = Gef.activeEditor.serial();
                if (!this.openWin) {
                    this.openWin = new Ext.Window({
                        title: 'xml',
                        layout: 'fit',
                        width: 500,
                        height: 300,
                        closeAction: 'hide',
                        modal: true,
                        items: [{
                            id: '__gef_jbpm4_xml_export__',
                            xtype: 'textarea'
                        }],
                        buttons: [{
                            text: '关闭',
                            handler: function() {
                                this.openWin.hide();
                            },
                            scope: this
                        }]
                    });
                    this.openWin.on('show', function() {
                        Gef.activeEditor.disable();
                    });
                    this.openWin.on('hide', function() {
                        Gef.activeEditor.enable();
                    });
                }
                this.openWin.show(null, function() {
                    Ext.getDom('__gef_jbpm4_xml_export__').value = xml;
                });
            }
        }, {
            text: '保存',
            iconCls: 'tb-save',
            handler: function() {
                var editor = Gef.activeEditor;
                var xml = editor.serial();
                //var name = editor.getGraphicalViewer().getContents().getModel().text;
                var name = editor.getGraphicalViewer().getContents().getModel().procDefName;
               
                var v_model = editor.getGraphicalViewer().getContents().getModel();
                var v_bizFile = v_model.procCatName;
                var v_procCode = v_model.procDefCode;
                var v_procVersion = v_model.procVerName;
                //alert("cheng 流程名称:"+name);
                // alert(name +"---"+v_procCode);
                //return ;
                
                Ext.Msg.wait('正在保存流程'+name);
                
                Ext.Ajax.request({
                    method: 'post',
                    url: Gef.SAVE_URL,
                    success: function(response) {
                        try {
	                        if(response.responseText !="" && response.responseText.indexOf("成功") > 0){
	                        	 Ext.Msg.alert('信息', '操作成功',function(){
	                        	 //操作成功后关闭编辑窗口 并刷新 设计流程页面
	                        	 try{window.opener.queryData();}catch(e){}
	                        	 window.close();
	                        	 });
	                        }else{
	                        	Ext.Msg.alert('系统错误', response.responseText);
	                        }
                        } catch(e) {
                            Ext.Msg.alert('系统错误', response.responseText);
                        }
                    },
                    failure: function(response) {
                        Ext.Msg.alert('系统信息', response.responseText);
                    },
                    params: {
                        id: Gef.PROCESS_ID,
                        processName: name,
                        xml: xml,
                        bizFile:v_bizFile,
                        procCode:v_procCode,
                        procVersion:v_procVersion
                    }
                });
            }
        }, {
            text: '发布',
            iconCls: 'tb-deploy',
            handler: function() {
                var editor = Gef.activeEditor;

                var isValid = new Validation(editor).validate();
                if (!isValid) {
                    return false;
                }
				//后续需要添加判断该流程 是否存在。
              	//如果存在则进行提示
              
                var xml = editor.serial();
                var model = editor.getGraphicalViewer().getContents().getModel();
                var name = model.text;
               
                
                Ext.Msg.wait('正在发布 流程'+name);
                Ext.Ajax.request({
                    method: 'post',
                    url: Gef.DEPLOY_URL,
                    success: function(response) {
                        try {
	                        if(response.responseText !="" && response.responseText.indexOf("成功") > 0){
	                        	 Ext.Msg.alert('信息', '操作成功',function(){
	                        	 //操作成功后关闭编辑窗口 并刷新 设计流程页面
	                        	 try{window.opener.queryData();}catch(e){}
	                        	 window.close();
	                        	 });
	                        }else{
	                        	Ext.Msg.alert('系统错误', response.responseText);
	                        }
                        } catch(e) {
                            Ext.Msg.alert('系统错误', response.responseText);
                        }
                    },
                    failure: function(response) {
                        Ext.Msg.alert('系统错误', response.responseText);
                    },
                    params: {
                        id: Gef.PROCESS_ID,
                        bizFile: model.procCatName,//业务目录
                        processName: model.procDefName,//流程名称
                        procCode: model.procDefCode,//流程编码
                        procVersion: model.procVerName,//版本号
                        remark:model.descn,//备注
                        xml: xml
                    }
                });
            }
        }, {
            text: '清空',
            iconCls: 'tb-clear',
            handler: function() {
                Gef.activeEditor.clear();
            }
        }, {
            text: '撤销',
            iconCls: 'tb-undo',
            handler: function() {
                var viewer = Gef.activeEditor.getGraphicalViewer();
                var browserListener = viewer.getBrowserListener();
                var selectionManager = browserListener.getSelectionManager();
                selectionManager.clearAll();
                var commandStack = viewer.getEditDomain().getCommandStack();
                commandStack.undo();
            },
            scope: this
        }, {
            text: '重做',
            iconCls: 'tb-redo',
            handler: function() {
                var viewer = Gef.activeEditor.getGraphicalViewer();
                var browserListener = viewer.getBrowserListener();
                var selectionManager = browserListener.getSelectionManager();
                selectionManager.clearAll();
                var commandStack = viewer.getEditDomain().getCommandStack();
                commandStack.redo();
            },
            scope: this
        }, {
            text: '布局',
            iconCls: 'tb-activity',
            handler: function() {

                var viewer = Gef.activeEditor.getGraphicalViewer();
                var browserListener = viewer.getBrowserListener();
                var selectionManager = browserListener.getSelectionManager();
                selectionManager.clearAll();

                new Layout(Gef.activeEditor).doLayout();
            },
            scope: this
        }, {
            text: '删除',
            iconCls: 'tb-delete',
            handler: this.removeSelected,
            scope: this
        }, 
        /*
        {
            text: '生成图片',
            iconCls: 'tb-pro_png',
           // handler: this.proPng,
            handler: exportImage,
            scope: this
        }, */
        {
            text: '立即生效',
            iconCls: 'tb-pro_png',
           // handler: this.proPng,
            handler: function() {
                var editor = Gef.activeEditor;

                var isValid = new Validation(editor).validate();
                if (!isValid) {
                    return false;
                }
				//后续需要添加判断该流程 是否存在。
              	//如果存在则进行提示
                var xml = editor.serial();
                var model = editor.getGraphicalViewer().getContents().getModel();
                var name = model.text;
                
                Ext.Msg.wait('正在更新已发布 流程'+name);
                Ext.Ajax.request({
                    method: 'post',
                    url: Gef.UPDATE_PUBLISED_URL,
                    success: function(response) {
                        try {
	                        if(response.responseText !="" && response.responseText.indexOf("成功") > 0){
	                        	 Ext.Msg.alert('信息', '操作成功',function(){
	                        	 //操作成功后关闭编辑窗口 并刷新 设计流程页面
	                        	 try{window.opener.queryData();}catch(e){}
	                        	 window.close();
	                        	 });
	                        }else{
	                        	Ext.Msg.alert('系统错误', response.responseText);
	                        }
                        } catch(e) {
                            Ext.Msg.alert('系统错误', response.responseText);
                        }
                    },
                    failure: function(response) {
                        Ext.Msg.alert('系统错误', response.responseText);
                    },
                    params: {
                        id: Gef.PROCESS_ID,
                        bizFile: model.procCatName,//业务目录
                        processName: model.procDefName,//流程名称
                        procCode: model.procDefCode,//流程编码
                        procVersion: model.procVerName,//版本号
                        remark:model.descn,//备注
                        xml: xml
                    }
                });
            }
        }]);

        App.CanvasPanel.superclass.initComponent.call(this);
    },

    afterRender: function() {
        App.CanvasPanel.superclass.afterRender.call(this);

        var width = 1500;
        var height = 1000;

        Ext.DomHelper.append(this.body, [{
            id: '__gef_jbs__',
            tag: 'div',
            style: 'width:' + (width + 10) + 'px;height:' + (height + 10) + 'px;',
            children: [{
                id: '__gef_jbs_center__',
                tag: 'div',
                style: 'width:' + width + 'px;height:' + height + 'px;float:left;'
            }, {
                id: '__gef_jbs_right__',
                tag: 'div',
                style: 'width:10px;height:' + height + 'px;float:left;background-color:#EEEEEE;cursor:pointer;'
            }, {
                id: '__gef_jbs_bottom__',
                tag: 'div',
                style: 'width:' + (width + 10) + 'px;height:10px;float:left;background-color:#EEEEEE;cursor:pointer;'
            }]
        }]);

        var rightEl = Ext.fly('__gef_jbs_right__');
        rightEl.on('mouseover', function(e) {
            var t = e.getTarget();
            t.style.backgroundColor = 'yellow';
            t.style.backgroundImage = 'url(images/arrow/arrow-right.png)';
        });
        rightEl.on('mouseout', function(e) {
            var t = e.getTarget();
            t.style.backgroundColor = '#EEEEEE';
            //alert("cheng mouseout");
            t.style.backgroundImage = '';
        });
        rightEl.on('click', function(e) {
            Ext.fly('__gef_jbs__').setWidth(Ext.fly('__gef_jbs__').getWidth() + 100);
            Ext.fly('__gef_jbs_center__').setWidth(Ext.fly('__gef_jbs_center__').getWidth() + 100);
            Ext.fly('__gef_jbs_bottom__').setWidth(Ext.fly('__gef_jbs_bottom__').getWidth() + 100);
			//alert("cheng click:");
            Gef.activeEditor.addWidth(100);
        });

        var bottomEl = Ext.fly('__gef_jbs_bottom__');
        bottomEl.on('mouseover', function(e) {
            var t = e.getTarget();
            t.style.backgroundColor = 'yellow';
            t.style.backgroundImage = 'url(images/arrow/arrow-bottom.png)';
        });
        bottomEl.on('mouseout', function(e) {
            var t = e.getTarget();
            t.style.backgroundColor = '#EEEEEE';
            t.style.backgroundImage = '';
        });
        rightEl.on('click', function(e) {
            Ext.fly('__gef_jbs__').setHeight(Ext.fly('__gef_jbs__').getHeight() + 100);
            Ext.fly('__gef_jbs_center__').setHeight(Ext.fly('__gef_jbs_center__').getHeight() + 100);
            Ext.fly('__gef_jbs_right__').setHeight(Ext.fly('__gef_jbs_right__').getHeight() + 100);

            Gef.activeEditor.addHeight(100);
        });

        this.body.on('contextmenu', this.onContextMenu, this);
    },

    onContextMenu: function(e) {
        if (!this.contextMenu) {
            this.contextMenu = new Ext.menu.Menu({
                items: [{
                    text: '详细配置',
                    iconCls: 'tb-prop',
                    handler: this.showWindow,
                    scope: this
                }, {
                    text: '删除',
                    iconCls: 'tb-remove',
                    handler: this.removeSelected,
                    scope: this
                }]
            });
        }
        e.preventDefault();
        this.contextMenu.showAt(e.getXY());
    },

    showWindow: function() {
        App.propertyManager.changePropertyStatus('max');
    },

    removeSelected: function() {
        var viewer = Gef.activeEditor.getGraphicalViewer();
        var browserListener = viewer.getBrowserListener();
        var selectionManager = browserListener.getSelectionManager();

        var edge = selectionManager.selectedConnection;
        var nodes = selectionManager.items;

        var request = {};

        if (edge != null) {
            request.role = {
                name: 'REMOVE_EDGE'
            };
            this.executeCommand(edge, request);
            selectionManager.removeSelectedConnection();
        } else if (nodes.length > 0) {
            request.role = {
                name: 'REMOVE_NODES',
                nodes: nodes
            };
            this.executeCommand(viewer.getContents(), request);
            selectionManager.clearAll();
        }
    },
	
    executeCommand: function(editPart, request) {
        var command = editPart.getCommand(request);
        if (command != null) {
            Gef.activeEditor.getGraphicalViewer().getEditDomain().getCommandStack().execute(command);
        }
    }
});

