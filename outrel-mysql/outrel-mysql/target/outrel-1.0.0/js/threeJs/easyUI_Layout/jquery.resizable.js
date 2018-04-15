/**
 * jQuery EasyUI 1.3.2
 */
(function ($) {
    var _resizable = false;
    //创建控件
    $.fn._resizable = function (options, param) {
    
        if (typeof options == "string") {
            return $.fn._resizable.methods[options](this, param);
        }
        //初始化函数
        function resize(e) {
            var resizeData = e.data;
            var opts = $.data(resizeData.target, "_resizable").options;
            if (resizeData.dir.indexOf("e") != -1) {
                var width = resizeData.startWidth + e.pageX - resizeData.startX;
                width = Math.min(Math.max(width, opts.minWidth), opts.maxWidth);
                resizeData.width = width;
            }
            if (resizeData.dir.indexOf("s") != -1) {
                var height = resizeData.startHeight + e.pageY - resizeData.startY;
                height = Math.min(Math.max(height, opts.minHeight), opts.maxHeight);
                resizeData.height = height;
            }
            if (resizeData.dir.indexOf("w") != -1) {
                resizeData.width = resizeData.startWidth - e.pageX + resizeData.startX;
                if (resizeData.width >= opts.minWidth && resizeData.width <= opts.maxWidth) {
                    resizeData.left = resizeData.startLeft + e.pageX - resizeData.startX;
                }
            }
            if (resizeData.dir.indexOf("n") != -1) {
                resizeData.height = resizeData.startHeight - e.pageY + resizeData.startY;
                if (resizeData.height >= opts.minHeight && resizeData.height <= opts.maxHeight) {
                    resizeData.top = resizeData.startTop + e.pageY - resizeData.startY;
                }
            }
        };
        //设置对象位置
        function applySize(e) {
            var resizeData = e.data;
            var target = resizeData.target;
            $(target).css({
                left: resizeData.left,
                top: resizeData.top
            });
            $(target)._outerWidth(resizeData.width)._outerHeight(resizeData.height);
        };

        function doDown(e) {
            _resizable = true;
            $.data(e.data.target, "_resizable").options.onStartResize.call(e.data.target, e);
            return false;
        };
        function doMove(e) {
            resize(e);
            if ($.data(e.data.target, "_resizable").options.onResize.call(e.data.target, e) != false) {
                applySize(e);
            }
            return false;
        };

        function doUp(e) {
            _resizable = false;
            resize(e, true);
            applySize(e);
            $.data(e.data.target, "_resizable").options.onStopResize.call(e.data.target, e);
            $(document).unbind("._resizable");
            $("body").css("cursor", "");
            return false;
        };
        return this.each(function () {
            var opts = null;
            var state = $.data(this, "_resizable");
            if (state) {
                $(this).unbind("._resizable");
                opts = $.extend(state.options, options || {});
            } else {
                opts = $.extend({}, $.fn._resizable.defaults, $.fn._resizable.parseOptions(this), options || {});
                $.data(this, "_resizable", { options: opts });
            }
            if (opts.disabled == true) {
                return;
            }
            //绑定事件
            $(this).bind("mousemove._resizable", { target: this }, function (e) {
                if (_resizable) {
                    return;
                }
                var dir = getDirection(e);
                if (dir == "") {
                    $(e.data.target).css("cursor", "");
                } else {
                    $(e.data.target).css("cursor", dir + "-resize");
                }
            }).bind("mouseleave._resizable", { target: this }, function (e) {
                $(e.data.target).css("cursor", "");
            }).bind("mousedown._resizable", { target: this }, function (e) {
                var dir = getDirection(e);
                if (dir == "") {
                    return;
                }
                //获取样式值
                function getCssValue(css) {
                    var val = parseInt($(e.data.target).css(css));
                    if (isNaN(val)) {
                        return 0;
                    } else {
                        return val;
                    }
                };
                var _13 = { target: e.data.target, dir: dir, startLeft: getCssValue("left"), startTop: getCssValue("top"), left: getCssValue("left"), top: getCssValue("top"), startX: e.pageX, startY: e.pageY, startWidth: $(e.data.target).outerWidth(), startHeight: $(e.data.target).outerHeight(), width: $(e.data.target).outerWidth(), height: $(e.data.target).outerHeight(), deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(), deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height() };
                $(document).bind("mousedown._resizable", _13, doDown);
                $(document).bind("mousemove._resizable", _13, doMove);
                $(document).bind("mouseup._resizable", _13, doUp);
                $("body").css("cursor", dir + "-resize");
            });

            function getDirection(e) {
                var tt = $(e.data.target);
                var dir = "";
                var offset = tt.offset();
                var width = tt.outerWidth();
                var height = tt.outerHeight();
                var edge = opts.edge;
                if (e.pageY > offset.top && e.pageY < offset.top + edge) {
                    dir += "n";
                } else {
                    if (e.pageY < offset.top + height && e.pageY > offset.top + height - edge) {
                        dir += "s";
                    }
                }
                if (e.pageX > offset.left && e.pageX < offset.left + edge) {
                    dir += "w";
                } else {
                    if (e.pageX < offset.left + width && e.pageX > offset.left + width - edge) {
                        dir += "e";
                    }
                }
                var handles = opts.handles.split(",");
                for (var i = 0; i < handles.length; i++) {
                    var handle = handles[i].replace(/(^\s*)|(\s*$)/g, "");
                    if (handle == "all" || handle == dir) {
                        return dir;
                    }
                }
                return "";
            };
        });
    };
    //默认方法
    $.fn._resizable.methods = {
        //返回调整大小属性
        options: function (jq) {
            return $.data(jq[0], "_resizable").options;
        },
        //启用调整大小功能
        enable: function (jq) {
            return jq.each(function () {
                $(this)._resizable({ disabled: false });
            });
        },
        //禁用调整大小功能
        disable: function (jq) {
            return jq.each(function () {
                $(this)._resizable({ disabled: true });
            });
        }
    };
    //解析器配置
    $.fn._resizable.parseOptions = function (target) {
        var t = $(target);
        return $.extend({},
            $.parser.parseOptions(target, ["handles", { minWidth: "number", minHeight: "number", maxWidth: "number", maxHeight: "number", edge: "number" }]),
            { disabled: (t.attr("disabled") ? true : undefined) });
    };
    //默认属性+事件
    $.fn._resizable.defaults = {
        disabled: false,//如果为true，则禁用大小调整
        handles: "n, e, s, w, ne, se, sw, nw, all",//声明调整方位,'n'=北,'e'=东,'s'=南等
        minWidth: 10,//当调整大小时候的最小宽度
        minHeight: 10,//当调整大小时候的最小高度
        maxWidth: 10000,//当调整大小时候的最大宽度
        maxHeight: 10000,//当调整大小时候的最大高度
        edge: 5,//边框边缘大小
        //在开始改变大小的时候触发
        onStartResize: function (e) {
        },
        //在调整大小期间触发。当返回false的时候，不会实际改变DOM元素大小
        onResize: function (e) {
        },
        //在停止改变大小的时候触发
        onStopResize: function (e) {
        }
    };
})(jQuery);
