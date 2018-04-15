/**
 * jQuery EasyUI 1.3.2
 */
(function ($) {
    $.parser = {
        auto: true,//定义是否自动解析EasyUI组件
        //渲染完成后会触发onComplete事件（如果该事件绑定了处理函数，则每次调用parser渲染DOM后都会触发一次该事件绑定的处理函数）
        onComplete: function (context) {

        },
        //plugins属性枚举出了所有组件名称标识(31)
        // 解决easyui和jQueryui冲突，easyui的resizable方法替换为_resizable;
        //draggable暂时没有用到，如果引用easyui的draggable方法，也需要替换方法名称
        plugins: ["draggable", "droppable", "_resizable", "pagination", "linkbutton", "menu",
            "menubutton", "splitbutton", "progressbar", "tree", "combobox", "combotree", "combogrid",
            "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar",
            "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid",
            "treegrid", "tabs", "accordion", "window", "dialog"],
        //parse就是实现渲染DOM的核心方法了，入参为DOM对象，其实也就是某个DOM块，不传入参的话，则是对整个页面进行渲染
        parse: function (context) {
            var aa = [];
            for (var i = 0; i < $.parser.plugins.length; i++) {
                var pluginname = $.parser.plugins[i];
                var r = $(".easyui-" + pluginname, context);
                if (r.length) {
                    if (r[pluginname]) {


                        r[pluginname]();
                    } else {
                        aa.push({ name: pluginname, jq: r });
                    }
                }
            }
            if (aa.length && window.easyloader) {
                var names = [];
                for (var i = 0; i < aa.length; i++) {
                    names.push(aa[i].name);
                }

                easyloader.load(names, function () {
                    for (var i = 0; i < aa.length; i++) {
                        var name = aa[i].name;
                        var jq = aa[i].jq;
                        jq[name]();
                    }
                    $.parser.onComplete.call($.parser, context);
                });
            } else {
                $.parser.onComplete.call($.parser, context);
            }
           // console.info(aa);
        },
        //公用的属性转换器，兼容data-options方式和老方式，功能可谓灵活而强大
        parseOptions: function (target, parseOptions) {
            var t = $(target);
           
            var opts = {};
            var data_options = $.trim(t.attr("data-options"));
           
            if (data_options) {
                var first_str = data_options.substring(0, 1);
               
                var last_str = data_options.substring(data_options.length - 1, 1);
                if (first_str != "{") {
                    data_options = "{" + data_options;
                }
                if (last_str != "}") {
                    data_options = data_options + "}";
                }
               
                opts = (new Function("return " + data_options))();
                //console.info(opts);
            }
         
            if (parseOptions) {
                var _b = {};
                for (var i = 0; i < parseOptions.length; i++) {
                    var pp = parseOptions[i];
                    if (typeof pp == "string") {
                        if (pp == "width" || pp == "height" || pp == "left" || pp == "top") {
                            _b[pp] = parseInt(target.style[pp]) || undefined;
                        } else {
                            _b[pp] = t.attr(pp);
                        }
                    } else {
                        for (var _c in pp) {
                            var _d = pp[_c];
                            if (_d == "boolean") {
                                _b[_c] = t.attr(_c) ? (t.attr(_c) == "true") : undefined;
                            } else {
                                if (_d == "number") {
                                    _b[_c] = t.attr(_c) == "0" ? 0 : parseFloat(t.attr(_c)) || undefined;
                                }
                            }
                        }
                    }
                }
                $.extend(opts, _b);
            }
            return opts;
        }
    };
    //文档准备好后，根据$.parser.auto的设置来决定是否自动渲染
    $(function () {
        if (!window.easyloader && $.parser.auto) {
            $.parser.parse();
        }
    });
    //扩展_outerWidth方法到jQuery对象上，用于兼容IE这种不是正规盒子模型的另类浏览器
    $.fn._outerWidth = function (val) {
        if (val == undefined) {
            if (this[0] == window) {
                return this.width() || document.body.clientWidth;
            }
            return this.outerWidth() || 0;
        }
        return this.each(function () {
            if (!$.support.boxModel && document.all) {
                $(this).width(val);
            } else {
                $(this).width(val - ($(this).outerWidth() - $(this).width()));
            }
        });
    };
    //扩展_outerHeight方法到jQuery对象上，用于兼容IE这种不是正规盒子模型的另类浏览器
    $.fn._outerHeight = function (val) {
        if (val == undefined) {
            if (this[0] == window) {
                return this.height() || document.body.clientHeight;
            }
            return this.outerHeight() || 0;
        }
        return this.each(function () {
            if (!$.support.boxModel && document.all) {
                $(this).height(val);
            } else {
                $(this).height(val - ($(this).outerHeight() - $(this).height()));
            }
        });
    };
    //扩展滚动条的水平位置
    $.fn._scrollLeft = function (val) {
        if (val == undefined) {
            return this.scrollLeft();
        } else {
            return this.each(function () {
                $(this).scrollLeft(val);
            });
        }
    };

    $.fn._propAttr = $.fn.prop || $.fn.attr;

    $.fn._fit = function (fit) {
        fit = fit == undefined ? true : fit;
        var p = this.parent()[0];
        var t = this[0];
        var _11 = p.fcount || 0;
        if (fit) {
            if (!t.fitted) {
                t.fitted = true;
                p.fcount = _11 + 1;
                $(p).addClass("panel-noscroll");
                if (p.tagName == "BODY") {
                    $("html").addClass("panel-fit");
                }
            }
        } else {
            if (t.fitted) {
                t.fitted = false;
                p.fcount = _11 - 1;
                if (p.fcount == 0) {
                    $(p).removeClass("panel-noscroll");
                    if (p.tagName == "BODY") {
                        $("html").removeClass("panel-fit");
                    }
                }
            }
        }
        return { width: $(p).width(), height: $(p).height() };
    };
})(jQuery);
