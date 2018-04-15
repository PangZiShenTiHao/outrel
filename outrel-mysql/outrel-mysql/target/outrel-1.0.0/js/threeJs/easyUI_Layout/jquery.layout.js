/**
 * jQuery EasyUI 1.3.2
 */
(function ($) {
    var resizing = false;
    //调整大小
    function _resize(target) {
        var options = $.data(target, "layout").options;
        var panels = $.data(target, "layout").panels;
        var cc = $(target);
        options.fit ? cc.css(cc._fit()) : cc._fit(false);
        var cpos = {
            top: 0,
            left: 0,
            width: cc.width(),
            height: cc.height()
        };
        //设置北部大小
        function setNorthSize(pp) {
            if (pp.length == 0) {
                return;
            }
            pp.panel("resize", {
                width: cc.width(),
                height: pp.panel("options").height,
                left: 0,
                top: 0
            });
            cpos.top += pp.panel("options").height;
            cpos.height -= pp.panel("options").height;
        };
        if (isVisible(panels.expandNorth)) {
            setNorthSize(panels.expandNorth);
        } else {
            setNorthSize(panels.north);
        }
        //设置南部大小
        function setSouthSize(pp) {
            if (pp.length == 0) {
                return;
            }
            pp.panel("resize", {
                width: cc.width(),
                height: pp.panel("options").height,
                left: 0,
                top: cc.height() - pp.panel("options").height
            });
            cpos.height -= pp.panel("options").height;
        };
        if (isVisible(panels.expandSouth)) {
            setSouthSize(panels.expandSouth);
        } else {
            setSouthSize(panels.south);
        }
        //设置东部大小
        function setEastSize(pp) {
            if (pp.length == 0) {
                return;
            }
            pp.panel("resize", {
                width: pp.panel("options").width,
                height: cpos.height,
                left: cc.width() - pp.panel("options").width,
                top: cpos.top
            });
            cpos.width -= pp.panel("options").width;
        };
        if (isVisible(panels.expandEast)) {
            setEastSize(panels.expandEast);
        } else {
            setEastSize(panels.east);
        }
        //设置西部大小
        function setWestSize(pp) {
            if (pp.length == 0) {
                return;
            }
            pp.panel("resize", {
                width: pp.panel("options").width,
                height: cpos.height,
                left: 0,
                top: cpos.top
            });
            cpos.left += pp.panel("options").width;
            cpos.width -= pp.panel("options").width;
        };
        if (isVisible(panels.expandWest)) {
            setWestSize(panels.expandWest);
        } else {
            setWestSize(panels.west);
        }
        panels.center.panel("resize", cpos);
    };
    //初始化函数
    function init(target) {
        var cc = $(target);
        if (cc[0].tagName == "BODY") {
            $("html").addClass("panel-fit");
        }
        cc.addClass("layout");
        function createPanel(cc) {
            cc.children("div").each(function () {
                var _f = $.parser.parseOptions(this, ["region"]);
                var r = _f.region;
                if (r == "north" || r == "south" || r == "east" || r == "west" || r == "center") {
                    _add(target, { region: r }, this);
                }
            });
        };
        cc.children("form").length ? createPanel(cc.children("form")) : createPanel(cc);
        $("<div class=\"layout-split-proxy-h\"></div>").appendTo(cc);
        $("<div class=\"layout-split-proxy-v\"></div>").appendTo(cc);
        cc.bind("_resize", function (e, param) {
            var options = $.data(target, "layout").options;
            if (options.fit == true || param) {
                _resize(target);
            }
            return false;
        });
    };
    //添加
    function _add(jq, region, el) {
        region.region = region.region || "center";
        var panels = $.data(jq, "layout").panels;
        var cc = $(jq);
        var dir = region.region;
        if (panels[dir].length) {
            return;
        }
        var pp = $(el);
        if (!pp.length) {
            pp = $("<div></div>").appendTo(cc);
        }
        pp.panel($.extend({}, {
            width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
            height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
            split: (pp.attr("split") ? pp.attr("split") == "true" : undefined),
            doSize: false,
            cls: ("layout-panel layout-panel-" + dir),
            bodyCls: "layout-body",
            onOpen: function () {
                var regions = { north: "up", south: "down", east: "right", west: "left" };
                if (!regions[dir]) {
                    return;
                }
                var button = "layout-button-" + regions[dir];
                var header = $(this).panel("header").children("div.panel-tool");
                if (!header.children("a." + button).length) {
                    var t = $("<a href=\"javascript:void(0)\"></a>").addClass(button).appendTo(header);
                    t.bind("click", { dir: dir }, function (e) {
                        _collapse(jq, e.data.dir);
                        return false;
                    });
                }
            }
        }, region));
        panels[dir] = pp;
        if (pp.panel("options").split) {
            var panel = pp.panel("panel");
            panel.addClass("layout-split-" + dir);
            var handle = "";
            if (dir == "north") {
                handle = "s";
            }
            if (dir == "south") {
                handle = "n";
            }
            if (dir == "east") {
                handle = "w";
            }
            if (dir == "west") {
                handle = "e";
            }
            panel._resizable({
                handles: handle,
                //在开始改变大小的时候触发
                onStartResize: function (e) {
                    resizing = true;
                    if (dir == "north" || dir == "south") {
                        var proxy = $(">div.layout-split-proxy-v", jq);
                    } else {
                        var proxy = $(">div.layout-split-proxy-h", jq);
                    }
                    var top = 0, left = 0, width = 0, height = 0;
                    var pos = { display: "block" };
                    if (dir == "north") {
                        pos.top = parseInt(panel.css("top")) + panel.outerHeight() - proxy.height();
                        pos.left = parseInt(panel.css("left"));
                        pos.width = panel.outerWidth();
                        pos.height = proxy.height();
                    } else {
                        if (dir == "south") {
                            pos.top = parseInt(panel.css("top"));
                            pos.left = parseInt(panel.css("left"));
                            pos.width = panel.outerWidth();
                            pos.height = proxy.height();
                        } else {
                            if (dir == "east") {
                                pos.top = parseInt(panel.css("top")) || 0;
                                pos.left = parseInt(panel.css("left")) || 0;
                                pos.width = proxy.width();
                                pos.height = panel.outerHeight();
                            } else {
                                if (dir == "west") {
                                    pos.top = parseInt(panel.css("top")) || 0;
                                    pos.left = panel.outerWidth() - proxy.width();
                                    pos.width = proxy.width();
                                    pos.height = panel.outerHeight();
                                }
                            }
                        }
                    }
                    proxy.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                },
                onResize: function (e) {
                    if (dir == "north" || dir == "south") {
                        var proxy = $(">div.layout-split-proxy-v", jq);
                        proxy.css("top", e.pageY - $(jq).offset().top - proxy.height() / 2);
                    } else {
                        var proxy = $(">div.layout-split-proxy-h", jq);
                        proxy.css("left", e.pageX - $(jq).offset().left - proxy.width() / 2);
                    }
                    return false;
                },
                onStopResize: function () {
                    $(">div.layout-split-proxy-v", jq).css("display", "none");
                    $(">div.layout-split-proxy-h", jq).css("display", "none");
                    var options = pp.panel("options");
                    options.width = panel.outerWidth();
                    options.height = panel.outerHeight();
                    options.left = panel.css("left");
                    options.top = panel.css("top");
                    pp.panel("resize");
                    _resize(jq);
                    resizing = false;
                    cc.find(">div.layout-mask").remove();
                }
            });
        }
    };
    //移出指定面板
    function _remove(jq, region) {
        var panels = $.data(jq, "layout").panels;
        if (panels[region].length) {
            panels[region].panel("destroy");
            panels[region] = $();
            var expandregion = "expand" + region.substring(0, 1).toUpperCase() + region.substring(1);
            if (panels[expandregion]) {
                panels[expandregion].panel("destroy");
                panels[expandregion] = undefined;
            }
        }
    };

    //折叠指定面板。'region'参数可用值有：'north','south','east','west'
    function _collapse(target, region, speed) {
        if (speed == undefined) {
            speed = "normal";
        }
        var panels = $.data(target, "layout").panels;
        var p = panels[region];
        if (p.panel("options").onBeforeCollapse.call(p) == false) {
            return;
        }
        var Expandregion = "expand" + region.substring(0, 1).toUpperCase() + region.substring(1);
        if (!panels[Expandregion]) {
            panels[Expandregion] = createExpandPanel(region);
            panels[Expandregion].panel("panel").click(function () {
                var opts = setOptions();
                p.panel("expand", false).panel("open").panel("resize", opts.collapse);
                p.panel("panel").animate(opts.expand);
                return false;
            });
        }
        var Options = setOptions();
    
        if (!isVisible(panels[Expandregion])) {
            panels.center.panel("resize", Options.resizeC);
        }
        p.panel("panel").animate(Options.collapse, speed, function () {
          
            p.panel("collapse", false).panel("close");
            panels[Expandregion].panel("open").panel("resize", Options.expandP);
        });
        //创建折叠面板
        function createExpandPanel(dir) {
            var icon;
            if (dir == "east") {
                icon = "layout-button-left";
            } else {
                if (dir == "west") {
                    icon = "layout-button-right";
                } else {
                    if (dir == "north") {
                        icon = "layout-button-down";
                    } else {
                        if (dir == "south") {
                            icon = "layout-button-up";
                        }
                    }
                }
            }
            var p = $("<div></div>").appendTo(target).panel({
                cls: "layout-expand",
                title: "&nbsp;",
                closed: true,
                doSize: false,
                tools: [{
                    iconCls: icon,
                    handler: function () {
                        _expand(target, region);
                        return false;
                    }
                }]
            });
            p.panel("panel").hover(function () {
                $(this).addClass("layout-expand-over");
            }, function () {
                $(this).removeClass("layout-expand-over");
            });
            return p;
        };
        //布局属性设置
        function setOptions() {
            var cc = $(target);
            if (region == "east") {              
                return {
                    resizeC: { width: panels.center.panel("options").width + panels["east"].panel("options").width - 28 },
                    expand: { left: cc.width() - panels["east"].panel("options").width },
                    expandP: {
                        top: panels["east"].panel("options").top,
                        left: cc.width() - 28,
                        width: 28,
                        height: panels["center"].panel("options").height
                    },
                    collapse: { left: cc.width() }
                };
            } else {
                if (region == "west") {
                    return {
                        resizeC: { width: panels.center.panel("options").width + panels["west"].panel("options").width - 28, left: 28 },
                        expand: { left: 0 }, expandP: {
                            left: 0,
                            top: panels["west"].panel("options").top,
                            width: 28,
                            height: panels["center"].panel("options").height
                        }, collapse: { left: -panels["west"].panel("options").width }
                    };
                } else {
                    if (region == "north") {
                        var hh = cc.height() - 28;
                        if (isVisible(panels.expandSouth)) {
                            hh -= panels.expandSouth.panel("options").height;
                        } else {
                            if (isVisible(panels.south)) {
                                hh -= panels.south.panel("options").height;
                            }
                        }
                        panels.east.panel("resize", { top: 28, height: hh });
                        panels.west.panel("resize", { top: 28, height: hh });
                        if (isVisible(panels.expandEast)) {
                            panels.expandEast.panel("resize", { top: 28, height: hh });
                        }
                        if (isVisible(panels.expandWest)) {
                            panels.expandWest.panel("resize", { top: 28, height: hh });
                        }
                        return {
                            resizeC: { top: 28, height: hh },
                            expand: { top: 0 },
                            expandP: { top: 0, left: 0, width: cc.width(), height: 28 },
                            collapse: { top: -panels["north"].panel("options").height }
                        };
                    } else {
                        if (region == "south") {
                            var hh = cc.height() - 28;
                            if (isVisible(panels.expandNorth)) {
                                hh -= panels.expandNorth.panel("options").height;
                            } else {
                                if (isVisible(panels.north)) {
                                    hh -= panels.north.panel("options").height;
                                }
                            }
                            panels.east.panel("resize", { height: hh });
                            panels.west.panel("resize", { height: hh });
                            if (isVisible(panels.expandEast)) {
                                panels.expandEast.panel("resize", { height: hh });
                            }
                            if (isVisible(panels.expandWest)) {
                                panels.expandWest.panel("resize", { height: hh });
                            }
                            return {
                                resizeC: { height: hh },
                                expand: { top: cc.height() - panels["south"].panel("options").height },
                                expandP: {
                                    top: cc.height() - 28,
                                    left: 0,
                                    width: cc.width(),
                                    height: 28
                                }, collapse: { top: cc.height() }
                            };
                        }
                    }
                }
            }
        };
    };
    //展开指定面板。'region'参数可用值有：'north','south','east','west'
    function _expand(target, region) {
        var panels = $.data(target, "layout").panels;
        var options = setRegionopts();
        var p = panels[region];
        if (p.panel("options").onBeforeExpand.call(p) == false) {
            return;
        }
        var expandRegion = "expand" + region.substring(0, 1).toUpperCase() + region.substring(1);
        panels[expandRegion].panel("close");
        p.panel("panel").stop(true, true);
        p.panel("expand", false).panel("open").panel("resize", options.collapse);
        p.panel("panel").animate(options.expand, function () {
            _resize(target);
        });
        //设置折叠展开布局配置
        function setRegionopts() {
            var cc = $(target);
            if (region == "east" && panels.expandEast) {
                return {
                    collapse: { left: cc.width() },
                    expand: { left: cc.width() - panels["east"].panel("options").width }
                };
            } else {
                if (region == "west" && panels.expandWest) {
                    return {
                        collapse: { left: -panels["west"].panel("options").width },
                        expand: { left: 0 }
                    };
                } else {
                    if (region == "north" && panels.expandNorth) {
                        return {
                            collapse: { top: -panels["north"].panel("options").height },
                            expand: { top: 0 }
                        };
                    } else {
                        if (region == "south" && panels.expandSouth) {
                            return {
                                collapse: { top: cc.height() },
                                expand: { top: cc.height() - panels["south"].panel("options").height }
                            };
                        }
                    }
                }
            }
        };
    };

    //绑定事件
    function bindEvents(target) {
        var panels = $.data(target, "layout").panels;
        var cc = $(target);
        if (panels.east.length) {
            panels.east.panel("panel").bind("mouseover", "east", collapsePanel);
        }
        if (panels.west.length) {
            panels.west.panel("panel").bind("mouseover", "west", collapsePanel);
        }
        if (panels.north.length) {
            panels.north.panel("panel").bind("mouseover", "north", collapsePanel);
        }
        if (panels.south.length) {
            panels.south.panel("panel").bind("mouseover", "south", collapsePanel);
        }
        panels.center.panel("panel").bind("mouseover", "center", collapsePanel);
        //折叠面板
        function collapsePanel(e) {
            if (resizing == true) {
                return;
            }
            if (e.data != "east" && isVisible(panels.east) && isVisible(panels.expandEast)) {
                _collapse(target, "east");
            }
            if (e.data != "west" && isVisible(panels.west) && isVisible(panels.expandWest)) {
                _collapse(target, "west");
            }
            if (e.data != "north" && isVisible(panels.north) && isVisible(panels.expandNorth)) {
                _collapse(target, "north");
            }
            if (e.data != "south" && isVisible(panels.south) && isVisible(panels.expandSouth)) {
                _collapse(target, "south");
            }
            return false;
        };
    };
    //设置可见性
    function isVisible(pp) {
        if (!pp) {
            return false;
        }
        if (pp.length) {
            return pp.panel("panel").is(":visible");
        } else {
            return false;
        }
    };
    //折叠面板
    function _collapsePanel(target) {
        var panels = $.data(target, "layout").panels;
        if (panels.east.length && panels.east.panel("options").collapsed) {
            _collapse(target, "east", 0);
        }
        if (panels.west.length && panels.west.panel("options").collapsed) {
            _collapse(target, "west", 0);
        }
        if (panels.north.length && panels.north.panel("options").collapsed) {
            _collapse(target, "north", 0);
        }
        if (panels.south.length && panels.south.panel("options").collapsed) {
            _collapse(target, "south", 0);
        }
    };
    //实例化组件
    $.fn.layout = function (options, param) {
        if (typeof options == "string") {
            return $.fn.layout.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "layout");
            if (state) {
                $.extend(state.options, options);
            } else {
                var opts = $.extend({}, $.fn.layout.defaults,
                    $.fn.layout.parseOptions(this), options);
                $.data(this, "layout", {
                    options: opts, panels: {
                        center: $(),
                        north: $(),
                        south: $(),
                        east: $(),
                        west: $()
                    }
                });
                init(this);
                bindEvents(this);
            }
            _resize(this);
            _collapsePanel(this);
        });
    };
    //布局方法
    $.fn.layout.methods = {
        //设置布局大小
        resize: function (jq) {
            return jq.each(function () {
                _resize(this);
            });
        },
        //返回指定面板，'region'参数可用值有：'north','south','east','west','center'
        panel: function (jq, region) {
            return $.data(jq[0], "layout").panels[region];
        },
        //折叠指定面板。'region'参数可用值有：'north','south','east','west'
        collapse: function (jq, region) {
            return jq.each(function () {
                _collapse(this, region);
            });
        },
        //展开指定面板。'region'参数可用值有：'north','south','east','west'
        expand: function (jq, region) {
            return jq.each(function () {
                _expand(this, region);
            });
        },
        //添加指定面板。属性参数是一个配置对象，更多细节请查看选项卡面板属性
        add: function (jq, options) {
            return jq.each(function () {
                _add(this, options);
                _resize(this);
                if ($(this).layout("panel", options.region).panel("options").collapsed) {
                    _collapse(this, options.region, 0);
                }
            });
        },
        //移除指定面板。'region'参数可用值有：'north','south','east','west'
        remove: function (jq, region) {
            return jq.each(function () {
                _remove(this, region);
                _resize(this);
            });
        }
    };
    //解析器
    $.fn.layout.parseOptions = function (target) {
        return $.extend({},
            $.parser.parseOptions(target, [{ fit: "boolean" }])
            );
    };
    //布局属性
    //如果设置为true，布局组件将自适应父容器。当使用'body'标签创建布局的时候，整个页面会自动最大
    $.fn.layout.defaults = {
        fit: false
    };
})(jQuery);
