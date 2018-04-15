//定义选中节点后 出现的图标事件
Gef.ns("Gef.tool");
Gef.tool.AbstractTool = Gef.extend(Object, {
    constructor: function($) {
        Gef.apply(this, $ ? $: {})
    },
    needCheckOutgo: function() {
        return true
    },
    getKey: function() {
        return "abstractTool"
    },
    getId: function($) {
        if ($) {
            this.node = $;
            this.id = $.getId() + ":" + this.getKey()
        }
        return this.id
    },
    render: function(_, $) {
        if (Gef.isVml) this.renderVml(_, $);
        else this.renderSvg(_, $)
    },
    renderVml: Gef.emptyFn,
    renderSvg: Gef.emptyFn,
    resize: function(B, A, $, _) {
        if (Gef.isVml) this.resizeVml(B, A, $, _);
        else this.resizeSvg(B, A, $, _)
    },
    resizeVml: Gef.emptyFn,
    resizeSvg: Gef.emptyFn,
    isClicked: function($) {
        if (Gef.isVml) return this.isClickedVml($);
        else return this.isClickedSvg($)
    },
    isClickedVml: Gef.emptyFn,
    isClickedSvg: Gef.emptyFn,
    drag: Gef.emptyFn,
    move: Gef.emptyFn,
    drop: Gef.emptyFn
});
Gef.ns("Gef.tool");
Gef.tool.AbstractImageTool = Gef.extend(Gef.tool.AbstractTool, {
    getKey: function() {
        return "abstractImageTool"
    },
    getUrl: function() {
        return Gef.IMAGE_ROOT + "../../tools/new_event.png"
    },
    getNodeConfig: function() {
        return {
            text: "node",
            w: 48,
            h: 48
        }
    },
    getX: function($) {
        return $ + 5
    },
    getY: function($) {
        return 15
    },
    renderVml: function(A, $) {
        var _ = document.createElement("img");
        _.setAttribute("id", this.getId($));
        _.setAttribute("unselectable", "on");
        _.style.position = "absolute";
        _.style.left = this.getX($.w) + "px";
        _.style.top = this.getY($.h) + "px";
        _.style.width = "16px";
        _.style.height = "16px";
        _.setAttribute("opacity", "0.5");
        _.src = this.getUrl();
        A.appendChild(_);
        this.el = _;
        _.onmouseover = function() {
            _.setAttribute("opacity", "1.0")
        };
        _.onmouseout = function() {
            _.setAttribute("opacity", "0.5")
        }
    },
    renderSvg: function(A, $) {
        var _ = document.createElementNS(Gef.svgns, "image");
        _.setAttribute("id", this.getId($));
        _.setAttribute("x", this.getX($.w));
        _.setAttribute("y", this.getY($.h));
        _.setAttribute("width", 16);
        _.setAttribute("height", 16);
        _.setAttributeNS(Gef.linkns, "xlink:href", this.getUrl());
        _.setAttribute("opacity", "0.5");
        A.appendChild(_);
        this.el = _;
        _.addEventListener("mouseover",
        function() {
            _.setAttribute("opacity", "1.0")
        },
        false);
        _.addEventListener("mouseout",
        function() {
            _.setAttribute("opacity", "0.5")
        },
        false)
    },
    resizeVml: function(B, A, $, _) {
        this.el.style.left = this.getX($) + "px";
        this.el.style.top = this.getY(_) + "px"
    },
    resizeSvg: function(B, A, $, _) {
        this.el.setAttribute("x", this.getX($));
        this.el.setAttribute("y", this.getY(_))
    },
    isClickedVml: function(A) {
        var _ = A.target,
        $ = _.getAttribute("id");
        if (!$) return false;
        if (_.tagName == "IMG" && $ == this.getId()) return true
    },
    isClickedSvg: function(A) {
        var _ = A.target,
        $ = _.getAttribute("id");
        if (!$) return false;
        if (_.tagName == "image" && $ == this.getId()) return true
    },
    drag: function(_) {
        var A = this.getNodeConfig();
        _.getDraggingRect().name = A.text;
        var $ = A.w,
        C = A.h;
        if (isNaN($) || $ < 0) $ = 48;
        if (isNaN(C) || C < 0) C = 48;
        var D = $ * -1,
        B = C * -1;
        _.getDraggingRect().update(D, B, $, C)
    },
    move: function(_, B) {
    //end event opertate
    	//alert("cheng tools move ");
        var $ = _.getDraggingRect(),
        A = B.point,
        D = A.x - $.w / 2,
        C = A.y - $.h / 2;
        $.moveTo(D, C)
    },
    drop: function(A, B) {
        var $ = A.getDraggingRect();
        if (A.isInCanvas(B.point)) {
            var D = $.name;
            B.role = {
                name: "CREATE_NODE",
                rect: {
                    x: B.point.x - $.w / 2,
                    y: B.point.y - $.h / 2,
                    w: $.w,
                    h: $.h
                },
                node: A.getModelFactory().createModel(D)
            };
            var C = new Gef.commands.CompoundCommand();
            C.addCommand(new Gef.gef.command.CreateNodeCommand(B.role.node, A.getContents().getModel(), B.role.rect));
            var _ = this.node.editPart.getModel(),
            G = B.role.node,
            E = A.getModelFactory().createModel(this.getConnectionModelName());
            if (_.getOutgoingConnections().length > 0) E.text = "to " + G.text;
            else E.text = "";
            C.addCommand(new Gef.gef.command.CreateConnectionCommand(E, _, G));
            A.getCommandStack().execute(C)
        }
        var H = $.w * -1,
        F = $.h * -1;
        $.moveTo(H, F)
    }
});
Gef.ns("Gef.tool");
Gef.tool.AbstractEdgeTool = Gef.extend(Gef.tool.AbstractImageTool, {
    getKey: function() {
        return "abstractEdgeTool"
    },
    getUrl: function() {
        return Gef.IMAGE_ROOT + "../../tools/edges.png"
    },
    getX: function($) {
        return $ + 5
    },
    getY: function() {
        return 40
    },
    drag: function(_) {
        var $ = this.node,
        A = $.editPart;
        if (A != null && A.getClass() == "node") if (A.canCreateOutgo()) _.temp.editPart = A;
        _.getDraggingEdge().update( - 1, -1, -1, -1)
    },
    move: function(_, C) {
        var B = C.point,
        $ = _.temp.editPart.getFigure(),
        D = {
            x: $.x,
            y: $.y,
            w: $.w,
            h: $.h
        },
        A = _.getDraggingEdge();
        A.updateForDragging(D, B)
    },
    drop: function($, B) {
        var A = $.getDraggingEdge(),
        E = $.temp.editPart,
        C = $.findEditPartAt(B);
        if (E != C && E.canCreateOutgo(C) && C.getClass() == "node" && C.canCreateIncome(E)) {
            var _ = this.getConnectionModelName(),
            D = $.getModelFactory().createModel(_);
            if (E.getModel().getOutgoingConnections().length > 0) D.text = "to " + C.getModel().text;
            else D.text = "";
            B.role = {
                name: "CREATE_EDGE",
                rect: {
                    x1: A.x1,
                    y1: A.y1,
                    x2: A.x2,
                    y2: A.y2
                },
                source: E.getModel(),
                target: C.getModel(),
                model: D
            };
            $.executeCommand($.temp.editPart, B)
        }
        $.getDraggingEdge().moveToHide()
    }
});


Gef.ns("Gef.jbs.tool");
Gef.jbs.tool.ChangeTypeTool = Gef.extend(Gef.tool.AbstractImageTool, {
    getKey: function() {
        return "changeTypeTool"
    },
    needCheckOutgo: function() {
        return false
    },
    getUrl: function() {
        return Gef.IMAGE_ROOT + "../../tools/wrench_orange.png"
    },
    getX: function($) {
        return 5
    },
    getY: function($) {
        return $ + 5
    },
    getConnectionModelName: function() {
        return "connection"
    },
    drag: function($, _) {
        var A = document.createElement("div");
        A.style.position = "absolute";
        A.style.left = _.point.absoluteX + "px";
        A.style.top = _.point.absoluteY + "px";
        A.style.backgroundColor = "#DDEEDD";
        Gef.each(this.allowedTypes,
        function(_) {
            if (_.type == this.node.editPart.model.getType()) return true;
            var $ = document.createElement("div");
            $.onmouseover = function() {
                this.style.backgroundColor = "yellow"
            };
            $.onmouseout = function() {
                this.style.backgroundColor = ""
            };
            $.style.cursor = "pointer";
            $.className = "_gef_changeType";
            $.setAttribute("title", _.type);
            $.innerHTML = _.name;
            A.appendChild($)
        },
        this);
        document.body.appendChild(A);
        $.changeTypeDiv = A
    },
    move: function($, _) {},
    drop: function(B, C) {
        var A = C.target;
        if (A.className == "_gef_changeType") {
            var E = A.getAttribute("title"),
            D = this.node.editPart.model,
            _ = B.getModelFactory().createModel(E),
            $ = new Gef.commands.CompoundCommand();
            $.addCommand(new Gef.gef.command.CreateNodeCommand(_, D.getParent(), {
                x: D.x,
                y: D.y,
                w: D.w,
                h: D.h
            }));
            Gef.each(D.getIncomingConnections(),
            function(A) {
                var D = A.getType(),
                C = B.getModelFactory().createModel(D);
                C.text = A.text;
                $.addCommand(new Gef.gef.command.RemoveConnectionCommand(A));
                $.addCommand(new Gef.gef.command.CreateConnectionCommand(C, A.getSource(), _));
                $.addCommand(new Gef.gef.command.ResizeConnectionCommand(C, [], A.innerPoints))
            });
            Gef.each(D.getOutgoingConnections(),
            function(A) {
                var D = A.getType(),
                C = B.getModelFactory().createModel(D);
                C.text = A.text;
                $.addCommand(new Gef.gef.command.RemoveConnectionCommand(A));
                $.addCommand(new Gef.gef.command.CreateConnectionCommand(C, _, A.getTarget()));
                $.addCommand(new Gef.gef.command.ResizeConnectionCommand(C, [], A.innerPoints))
            });
            $.addCommand(new Gef.gef.command.RemoveNodeCommand(D));
            B.getCommandStack().execute($);
            B.getSelectionManager().addSelectedNode(_.editPart)
        }
        document.body.removeChild(B.changeTypeDiv)
    }
});
Gef.ns("Gef.jbs.tool");
Gef.jbs.tool.TaskTool = Gef.extend(Gef.tool.AbstractImageTool, {
    getKey: function() {
        return "taskTool"
    },
    getUrl: function() {
        return Gef.IMAGE_ROOT + "../../tools/new_task.png"
    },
    getNodeConfig: function() {
    //alert("cheng Gef.jbs.tool.TaskTool getNodeConfig :");
       /* return {
            text: "human",
            w: 90,
            h: 50
        }*/
        return {
            text: "task",
            w: 90,
            h: 50
        }
    },
    getY: function() {
        return 0
    },
    getConnectionModelName: function() {
        return "transition"
    }
});
Gef.ns("Gef.jbs.tool");
Gef.jbs.tool.EndTool = Gef.extend(Gef.tool.AbstractImageTool, {
    getKey: function() {
        return "endTool"
    },
    getUrl: function() {
        return Gef.IMAGE_ROOT + "../../tools/new_event.png"
    },
    getNodeConfig: function() {
        return {
            text: "end",
            w: 48,
            h: 48
        }
    },
    getY: function() {
        return 20
    },
    getConnectionModelName: function() {
        return "transition"
    }
});
Gef.ns("Gef.jbs.tool");
Gef.jbs.tool.GatewayTool = Gef.extend(Gef.tool.AbstractImageTool, {
    getKey: function() {
        return "gatewayTool"
    },
    getUrl: function() {
        return Gef.IMAGE_ROOT + "../../tools/new_gateway_xor_data.png"
    },
    getNodeConfig: function() {
        return {
            text: "decision",
            w: 48,
            h: 48
        }
    },
    getY: function() {
        return 40
    },
    getConnectionModelName: function() {
        return "transition"
    }
});
Gef.ns("Gef.jbs.tool");
Gef.jbs.tool.LineTool = Gef.extend(Gef.tool.AbstractEdgeTool, {
    getKey: function() {
        return "lineTool"
    },
    getY: function() {
        return 60
    },
    getConnectionModelName: function() {
        return "transition"
    }
});