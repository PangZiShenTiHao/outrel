/**
 * jQuery EasyUI 1.3.2
 */
(function ($) {
    //移除节点
    function removeNode(target) {
        target.each(function () {
            $(this).remove();
            if ($.browser.msie) {
                this.outerHTML = "";
            }
        });
    };
    //设置面板大小和布局
    function _resize(target, parm) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var header = panel.children("div.panel-header");
        var pbody = panel.children("div.panel-body");
        if (parm) {
            if (parm.width) {
                options.width = parm.width;
            }
            if (parm.height) {
                options.height = parm.height;
            }
            if (parm.left != null) {
                options.left = parm.left;
            }
            if (parm.top != null) {
                options.top = parm.top;
            }
        }
        options.fit ? $.extend(options, panel._fit()) : panel._fit(false);
        panel.css({ left: options.left, top: options.top });
        if (!isNaN(options.width)) {
            panel._outerWidth(options.width);
        } else {
            panel.width("auto");
        }
        header.add(pbody)._outerWidth(panel.width());
        if (!isNaN(options.height)) {
            panel._outerHeight(options.height);
            pbody._outerHeight(panel.height() - header._outerHeight());
        } else {
            pbody.height("auto");
        }
        panel.css("height", "");
        options.onResize.apply(target, [options.width, options.height]);
        panel.find(">div.panel-body>div").triggerHandler("_resize");
    };
    //移动面板到一个新位置
    function _move(target, parm) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (parm) {
            if (parm.left != null) {
                options.left = parm.left;
            }
            if (parm.top != null) {
                options.top = parm.top;
            }
        }
        panel.css({ left: options.left, top: options.top });
        options.onMove.apply(target, [options.left, options.top]);
    };

    function wrapPanel(target) {
        $(target).addClass("panel-body");
        var panel = $("<div class=\"panel\"></div>").insertBefore(target);
        panel[0].appendChild(target);
        panel.bind("_resize", function () {
            var opts = $.data(target, "panel").options;
            if (opts.fit == true) {
                _resize(target);
            }
            return false;
        });
        return panel;
    };
    //添加头部设置
    function addHeader(target) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (options.tools && typeof options.tools == "string") {
            panel.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(options.tools);
        }
        removeNode(panel.children("div.panel-header"));

        if (options.title && !options.noheader) {
            var header = $("<div class=\"panel-header\"><div class=\"panel-title\">" + options.title + "</div></div>").prependTo(panel);
            if (options.iconCls) {
                header.find(".panel-title").addClass("panel-with-icon");
                $("<div class=\"panel-icon\"></div>").addClass(options.iconCls).appendTo(header);
            }
            //工具条
            var tool = $("<div class=\"panel-tool\"></div>").appendTo(header);
            tool.bind("click", function (e) {
                e.stopPropagation();
            });
            if (options.tools) {
                if (typeof options.tools == "string") {
                    $(options.tools).children().each(function () {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
                    });
                } else {
                    for (var i = 0; i < options.tools.length; i++) {
                        var t = $("<a href=\"javascript:void(0)\"></a>").addClass(options.tools[i].iconCls).appendTo(tool);
                        if (options.tools[i].handler) {
                            t.bind("click", eval(options.tools[i].handler));
                        }
                    }
                }
            }
            if (options.collapsible) {
                $("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    if (options.collapsed == true) {
                        expandPanel(target, true);
                    } else {
                        _collapse(target, true);
                    }
                    return false;
                });
            }
            if (options.minimizable) {
                $("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    _minimize(target);
                    return false;
                });
            }
            if (options.maximizable) {
                $("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    if (options.maximized == true) {
                        _restore(target);
                    } else {
                        _maximize(target);
                    }
                    return false;
                });
            }
            if (options.closable) {
                $("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    _close(target);
                    return false;
                });
            }
            panel.children("div.panel-body").removeClass("panel-body-noheader");
        } else {
            panel.children("div.panel-body").addClass("panel-body-noheader");
        }
    };
    //刷新面板来装载远程数据。如果'href'属性有了新配置，它将重写旧的'href'属性
    function _refresh(target) {
        var panel = $.data(target, "panel");
        var options = panel.options;
        if (options.href) {
            if (!panel.isLoaded || !options.cache) {
                panel.isLoaded = false;
                _destroy2(target);
                if (options.loadingMessage) {
                    $(target).html($("<div class=\"panel-loading\"></div>").html(options.loadingMessage));
                }
                $.ajax({
                    url: options.href,
                    cache: false,
                    dataType: "html",
                    success: function (_1f) {
                        init(options.extractor.call(target, _1f));
                        options.onLoad.apply(target, arguments);
                        panel.isLoaded = true;
                    }
                });
            }
        } else {
            if (options.content) {
                if (!panel.isLoaded) {
                    _destroy2(target);
                    init(options.content);
                    panel.isLoaded = true;
                }
            }
        }
        function init(target) {
            $(target).html(target);
            if ($.parser) {
                $.parser.parse($(target));
            }
        };
    };
    //销毁控件
    function _destroy2(target) {
        var t = $(target);
        t.find(".combo-f").each(function () {
            $(this).combo("destroy");
        });
        t.find(".m-btn").each(function () {
            $(this).menubutton("destroy");
        });
        t.find(".s-btn").each(function () {
            $(this).splitbutton("destroy");
        });
    };
    //初始化
    function init(target) {
        $(target).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function () {
            $(this).triggerHandler("_resize", [true]);
        });
    };
    //在'forceOpen'参数设置为true的时候，打开面板时将跳过'onBeforeOpen'回调函数
    function _open(target, forceOpen) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (forceOpen != true) {
            if (options.onBeforeOpen.call(target) == false) {
                return;
            }
        }
        panel.show();
        options.closed = false;
        options.minimized = false;
        var tool = panel.children("div.panel-header").find("a.panel-tool-restore");
        if (tool.length) {
            options.maximized = true;
        }
        options.onOpen.call(target);
        if (options.maximized == true) {
            options.maximized = false;
            _maximize(target);
        }
        if (options.collapsed == true) {
            options.collapsed = false;
            _collapse(target);
        }
        if (!options.collapsed) {
            _refresh(target);
            init(target);
        }
    };
    //在'forceClose'参数设置为true的时候，关闭面板时将跳过'onBeforeClose'回调函数。
    function _close(target, forceClose) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (forceClose != true) {
            if (options.onBeforeClose.call(target) == false) {
                return;
            }
        }
        panel._fit(false);
        panel.hide();
        options.closed = true;
        options.onClose.call(target);
    };
    //在'forceDestroy'参数设置为true的时候，销毁面板时将跳过'onBeforeDestory'回调函数
    function _destroy(target, forceDestroy) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (forceDestroy != true) {
            if (options.onBeforeDestroy.call(target) == false) {
                return;
            }
        }
        _destroy2(target);
        removeNode(panel);
        options.onDestroy.call(target);
    };
    //折叠面板主题
    function _collapse(target, animate) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var pbody = panel.children("div.panel-body");
        var header = panel.children("div.panel-header").find("a.panel-tool-collapse");
        if (options.collapsed == true) {
            return;
        }
        pbody.stop(true, true);
        if (options.onBeforeCollapse.call(target) == false) {
            return;
        }
        header.addClass("panel-tool-expand");
        if (animate == true) {
            pbody.slideUp("normal", function () {
                options.collapsed = true;
                options.onCollapse.call(target);
            });
        } else {
            pbody.hide();
            options.collapsed = true;
            options.onCollapse.call(target);
        }
    };
    //展开面板主体
    function expandPanel(target, animate) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var pbody = panel.children("div.panel-body");
        var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");
        if (options.collapsed == false) {
            return;
        }
        pbody.stop(true, true);
        if (options.onBeforeExpand.call(target) == false) {
            return;
        }
        tool.removeClass("panel-tool-expand");
        if (animate == true) {
            pbody.slideDown("normal", function () {
                options.collapsed = false;
                options.onExpand.call(target);
                _refresh(target);
                init(target);
            });
        } else {
            pbody.show();
            options.collapsed = false;
            options.onExpand.call(target);
            _refresh(target);
            init(target);
        }
    };
    //最大化面板到容器大小
    function _maximize(target) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var tool = panel.children("div.panel-header").find("a.panel-tool-max");
        if (options.maximized == true) {
            return;
        }
        tool.addClass("panel-tool-restore");
        if (!$.data(target, "panel").original) {
            $.data(target, "panel").original = { width: options.width, height: options.height, left: options.left, top: options.top, fit: options.fit };
        }
        options.left = 0;
        options.top = 0;
        options.fit = true;
        _resize(target);
        options.minimized = false;
        options.maximized = true;
        options.onMaximize.call(target);
    };
    //最小化面板
    function _minimize(target) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        panel._fit(false);
        panel.hide();
        options.minimized = true;
        options.maximized = false;
        options.onMinimize.call(target);
    };
    //恢复最大化面板回到原来的大小和位置
    function _restore(target) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var tool = panel.children("div.panel-header").find("a.panel-tool-max");
        if (options.maximized == false) {
            return;
        }
        panel.show();
        tool.removeClass("panel-tool-restore");
        $.extend(options, $.data(target, "panel").original);
        _resize(target);
        options.minimized = false;
        options.maximized = false;
        $.data(target, "panel").original = null;
        options.onRestore.call(target);
    };
    //设置边框
    function setBorder(target) {
        var options = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var header = $(target).panel("header");
        var pbody = $(target).panel("body");
        panel.css(options.style);
        panel.addClass(options.cls);
        if (options.border) {
            header.removeClass("panel-header-noborder");
            pbody.removeClass("panel-body-noborder");
        } else {
            header.addClass("panel-header-noborder");
            pbody.addClass("panel-body-noborder");
        }
        header.addClass(options.headerCls);
        pbody.addClass(options.bodyCls);
        if (options.id) {
            $(target).attr("id", options.id);
        } else {
            $(target).attr("id", "");
        }
    };
    //设置标题
    function _setTitle(target, title) {
        $.data(target, "panel").options.title = title;
        $(target).panel("header").find("div.panel-title").html(title);
    };
    var TO = false;
    var resized = true;

    $(window).unbind(".panel").bind("resize.panel", function () {
        if (!resized) {
            return;
        }
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function () {
            resized = false;
            var layout = $("body.layout");
            if (layout.length) {
                layout.layout("resize");
            } else {
                $("body").children("div.panel,div.accordion,div.tabs-container,div.layout").triggerHandler("_resize");
            }
            resized = true;
            TO = false;
        }, 200);
    });
    //面板
    $.fn.panel = function (options, param) {
        if (typeof options == "string") {
            return $.fn.panel.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "panel");
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.isLoaded = false;
            } else {
                opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), options);
                $(this).attr("title", "");
                state = $.data(this, "panel", { options: opts, panel: wrapPanel(this), isLoaded: false });
            }
            addHeader(this);
            setBorder(this);
            if (opts.doSize == true) {
                state.panel.css("display", "block");
                _resize(this);
            }
            if (opts.closed == true || opts.minimized == true) {
                state.panel.hide();
            } else {
                _open(this);
            }
        });
    };
    //默认方法
    $.fn.panel.methods = {
        //返回属性对象
        options: function (jq) {
            return $.data(jq[0], "panel").options;
        },
        //返回面板对象
        panel: function (jq) {
            return $.data(jq[0], "panel").panel;
        },
        //返回面板头对象
        header: function (jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-header");
        },
        //返回面板主体对象
        body: function (jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-body");
        },
        //设置面板头的标题文本
        setTitle: function (jq, title) {
            return jq.each(function () {
                _setTitle(this, title);
            });
        },
        //在'forceOpen'参数设置为true的时候，打开面板时将跳过'onBeforeOpen'回调函数
        open: function (jq, forceOpen) {
            return jq.each(function () {
                _open(this, forceOpen);
            });
        },
        //在'forceClose'参数设置为true的时候，关闭面板时将跳过'onBeforeClose'回调函数
        close: function (jq, forceClose) {
            return jq.each(function () {
                _close(this, forceClose);
            });
        },
        //在'forceDestroy'参数设置为true的时候，销毁面板时将跳过'onBeforeDestory'回调函数
        destroy: function (jq, forceDestroy) {
            return jq.each(function () {
                _destroy(this, forceDestroy);
            });
        },
        //刷新面板来装载远程数据。如果'href'属性有了新配置，它将重写旧的'href'属性
        refresh: function (jq, href) {
            return jq.each(function () {
                $.data(this, "panel").isLoaded = false;
                if (href) {
                    $.data(this, "panel").options.href = href;
                }
                _refresh(this);
            });
        },
        //设置面板大小和布局。参数对象包含下列属性： width：新的面板宽度。  height：新的面板高度。left：新的面板左边距位置。top：新的面板上边距位置
        resize: function (jq, options) {
            return jq.each(function () {
                _resize(this, options);
            });
        },
        //移动面板到一个新位置。参数对象包含下列属性：   left：新的左边距位置。  top：新的上边距位置
        move: function (jq, options) {
            return jq.each(function () {
                _move(this, options);
            });
        },
        //最大化面板到容器大小
        maximize: function (jq) {
            return jq.each(function () {
                _maximize(this);
            });
        },
        //最小化面板
        minimize: function (jq) {
            return jq.each(function () {
                _minimize(this);
            });
        },
        //恢复最大化面板回到原来的大小和位置
        restore: function (jq) {
            return jq.each(function () {
                _restore(this);
            });
        },
        //折叠面板主题    
        collapse: function (jq, animate) {
            return jq.each(function () {
                _collapse(this, animate);
            });
        },
        //展开面板主体
        expand: function (jq, animate) {
            return jq.each(function () {
                expandPanel(this, animate);
            });
        }
    };
    //解析器配置
    $.fn.panel.parseOptions = function (target) {
        var t = $(target);
        return $.extend({},
            $.parser.parseOptions(target,
            ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href",
                { cache: "boolean", fit: "boolean", border: "boolean", noheader: "boolean" },
                { collapsible: "boolean", minimizable: "boolean", maximizable: "boolean" },
                { closable: "boolean", collapsed: "boolean", minimized: "boolean", maximized: "boolean", closed: "boolean" }]),
                {
                    loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined)
                 });
    };
    //面板的默认属性和事件
    $.fn.panel.defaults = {
        id: null,//面板的ID属性
        title: null,   //在面板头部显示的标题文本
        iconCls: null,//设置一个16x16图标的CSS类ID显示在面板左上角
        width: "auto",//设置面板宽度
        height: "auto",//设置面板高度
        left: null,//设置面板距离左边的位置（即X轴位置）
        top: null,//设置面板距离顶部的位置（即Y轴位置）
        cls: null,//添加一个CSS类ID到面板
        headerCls: null,//添加一个CSS类ID到面板头部
        bodyCls: null,//添加一个CSS类ID到面板正文部分
        style: {},//添加一个当前指定样式到面板
        href: null,//从URL读取远程数据并且显示到面板。注意：内容将不会被载入，直到面板打开或扩大，在创建延迟加载面板时是非常有用的：
        cache: true,//如果为true，在超链接载入时缓存面板内容
        fit: false,//当设置为true的时候面板大小将自适应父容器。下面的例子显示了一个面板，可以自动在父容器的最大范围内调整大小
        border: true,//定义是否显示面板边框
        doSize: true,//如果设置为true，在面板被创建的时候将重置大小和重新布局
        noheader: false,//如果设置为true，那么将不会创建面板标题
        content: null,//面板主体内容
        collapsible: false,//定义是否显示可折叠按钮
        minimizable: false,//定义是否显示最小化按钮
        maximizable: false,//定义是否显示最大化按钮
        closable: false,//定义是否显示关闭按钮
        collapsed: false,//定义是否在初始化的时候折叠面板
        minimized: false,//定义是否在初始化的时候最小化面板
        maximized: false,//定义是否在初始化的时候最大化面板
        closed: false,//定义是否在初始化的时候关闭面板
        tools: null,//自定义工具菜单，可用值： 1) 数组，每个元素都包含'iconCls'和'handler'属性。2) 指向工具菜单的选择器。面板工具菜单可以声明在已经存在的<div>标签上
        loadingMessage: "Loading...",//在加载远程数据的时候在面板内显示一条消息
        extractor: function (data) {//定义如何从ajax应答数据中提取内容，返回提取数据
            var pattern  = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var matches  = pattern .exec(data);
            if (matches ) {
                return matches [1];
            } else {
                return data;
            }
        },
        //在加载远程数据时触发
        onLoad: function () {
        },
        //在打开面板之前触发，返回false可以取消打开操作
        onBeforeOpen: function () {
        },
        //在打开面板之后触发
        onOpen: function () {
        },
        //在关闭面板之前触发，返回false可以取消关闭操作。下列的面板将不能关闭
        onBeforeClose: function () {
        },
        //在面板关闭之后触发
        onClose: function () {
        },
        //在面板销毁之前触发，返回false可以取消销毁操作
        onBeforeDestroy: function () {
        },
        //在面板销毁之后触发
        onDestroy: function () {
        },
        //在面板改变大小之后触发 width：新的宽度。        height：新的高度
        onResize: function (_6c, _6d) {
        },
        //在面板移动之后触发。   left：新的左边距位置。     top：新的上边距位置
        onMove: function (_6e, top) {
        },
        //在窗口最大化之后触发
        onMaximize: function () {
        },
        //在窗口恢复到原始大小以后触发
        onRestore: function () {
        },
        //在窗口最小化之后触发
        onMinimize: function () {
        },
        //在面板折叠之前触发，返回false可以终止折叠操作
        onBeforeCollapse: function () {
        },
        //在面板展开之前触发，返回false可以终止展开操作
        onBeforeExpand: function () {
        },
        //在面板折叠之后触发
        onCollapse: function () {
        },
        //在面板展开之后触发
        onExpand: function () {
        }
    };
})(jQuery);
