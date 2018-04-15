

/////////////////////////////////////////////////////////////////
//创建 核心对象
Gef = createCore("Gef");


Gef.IMAGE_ROOT = "gef/images/activities/48/";
Gef.ns("Gef.ui");
Gef.ui.WorkbenchWindow = Gef.extend(Object, {
    getActivePage: Gef.emptyFn
});
Gef.ns("Gef.ui");
Gef.ui.WorkbenchPage = Gef.extend(Object, {
    getWorkbenchWindow: Gef.emptyFn,
    getActiveEditor: Gef.emptyFn,
    openEditor: Gef.emptyFn
});
Gef.ns("Gef.ui");
Gef.ui.WorkbenchPart = Gef.extend(Object, {
    setWorkbenchPage: Gef.emptyFn,
    getWorkbenchPage: Gef.emptyFn
});
Gef.ns("Gef.ui");
Gef.ui.ViewPart = Gef.extend(Object, {});
Gef.ns("Gef.ui");
Gef.ui.EditorPart = Gef.extend(Gef.ui.WorkbenchPart, {
    init: Gef.emptyFn
});
Gef.ns("Gef.ui");
Gef.ui.EditorInput = Gef.extend(Object, {
    getName: Gef.emptyFn,
    getObject: Gef.emptyFn
});
Gef.ns("Gef.ui.support");
Gef.ui.support.DefaultWorkbenchWindow = Gef.extend(Gef.ui.WorkbenchWindow, {
    getActivePage: function() {
        if (!this.activePage) {
            this.activePage = new Gef.ui.support.DefaultWorkbenchPage();
            this.activePage.setWorkbenchWindow(this)
        }
        return this.activePage
    },
    render: function() {
        if (!this.rendered) {
            document.getElementsByTagName("html")[0].className += " gef-workbenchwindow";
            if (Gef.isIE) {
                this.width = document.body.offsetWidth;
                this.height = document.body.offsetHeight
            } else {
                this.width = window.innerWidth;
                this.height = window.innerHeight
            }
            this.getActivePage().render();
            this.rendered = true
        }
    }
});
Gef.ns("Gef.ui.support");
Gef.ui.support.DefaultWorkbenchPage = Gef.extend(Gef.ui.WorkbenchPage, {
    constructor: function($) {
        this.workbenchWindow = $
    },
    getWorkbenchWindow: function() {
        return this.workbenchWindow
    },
    setWorkbenchWindow: function($) {
        this.workbenchWindow = $
    },
    getActiveEditor: function() {
        return this.activeEditor
    },
    openEditor: function(_, $) {
        this.activeEditor = _;
        _.setWorkbenchPage(this);
        _.init($)
    },
    render: function() {
        this.activeEditor.render()
    }
});
Gef.ns("Gef.ui.support");
Gef.ui.support.DefaultEditorPart = Gef.extend(Gef.ui.EditorPart, {
    constructor: function($) {
        this.workbenchPage = $
    },
    getWorkbenchPage: function() {
        return this.workbenchPage
    },
    setWorkbenchPage: function($) {
        this.workbenchPage = $
    },
    init: function($) {},
    render: function() {}
});
Gef.ns("Gef.commands");
Gef.commands.Command = Gef.extend(Object, {
    execute: Gef.emptyFn,
    undo: Gef.emptyFn,
    redo: Gef.emptyFn
});
Gef.ns("Gef.commands");
Gef.commands.CommandStack = Gef.extend(Object, {
    constructor: function() {
        this.undoList = [];
        this.redoList = [];
        this.maxUndoLength = 100
    },
    execute: function($) {
        while (this.undoList.length > this.maxUndoLength) this.undoList.shift();
        this.undoList.push($);
        this.redoList.splice(0, this.redoList.length);
        $.execute();
        return $
    },
    redo: function() {
        var $ = this.redoList.pop();
        if ($ != null) {
            this.undoList.push($);
            $.redo();
            return this.redoList.length > 0
        }
        return false
    },
    undo: function() {
        var $ = this.undoList.pop();
        if ($ != null) {
            while (this.redoList.length > this.maxUndoLength) this.redoList.shift();
            this.redoList.push($);
            $.undo();
            return this.undoList.length > 0
        }
        return false
    },
    flush: function() {
        this.flushUndo();
        this.flushRedo()
    },
    flushUndo: function() {
        this.undoList.splice(0, this.undoList.length)
    },
    flushRedo: function() {
        this.redoList.splice(0, this.redoList.length)
    },
    getMaxUndoLength: function() {
        return this.maxUndoLength
    },
    setMaxUndoLength: function($) {
        this.maxUndoLength = $
    },
    canUndo: function() {
        return this.undoList.length > 0
    },
    canRedo: function() {
        return this.redoList.length > 0
    }
});
Gef.ns("Gef.commands");
Gef.commands.CompoundCommand = Gef.extend(Gef.commands.Command, {
    constructor: function() {
        this.commandList = []
    },
    addCommand: function($) {
        this.commandList.push($)
    },
    getCommandList: function() {
        return this.commandList
    },
    execute: function() {
        for (var $ = 0; $ < this.commandList.length; $++) this.commandList[$].execute()
    },
    undo: function() {
        for (var $ = this.commandList.length - 1; $ >= 0; $--) this.commandList[$].undo()
    },
    redo: function() {
        for (var $ = 0; $ < this.commandList.length; $++) this.commandList[$].redo()
    }
});


//////////////////////////////////////////////////////////////////////////
Gef.ns("Gef.figure");
Gef.figure.Figure = Gef.extend(Object, {
    constructor: function($) {
        this.children = [];
        $ = $ ? $: {};
        $["fill"] = $["fill"] || "";
        $["strok"] = $["strok"] || "black";
        $["strokwidth"] = $["strokwidth"] || 1;
        Gef.apply(this, $)
    },
    setParent: function($) {
        this.parent = $
    },
    getParent: function() {
        return this.parent
    },
    getParentEl: function() {
        return this.parent.el
    },
    getChildren: function() {
        return this.children
    },
    addChild: function($) {
        this.children.push($);
        $.setParent(this)
    },
    removeChild: function($) {
        $.remove()
    },
    render: function() {
        if (!this.el) if (Gef.isVml) {
            this.renderVml();
            this.onRenderVml()
        } else {
            this.renderSvg();
            this.onRenderSvg()
        }
        for (var $ = 0; $ < this.children.length; $++) this.children[$].render()
    },
    renderSvg: Gef.emptyFn,
    renderVml: Gef.emptyFn,
    onRenderVml: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "pointer";
        this.el.fillcolor = this["fill"];
        this.el.strokecolor = this["stroke"];
        this.el.strokeweight = this["strokewidth"];
        this.getParentEl().appendChild(this.el)
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.setAttribute("fill", this["fill"]);
        this.el.setAttribute("stroke", this["stroke"]);
        this.el.setAttribute("stroke-width", this["strokewidth"]);
        this.el.setAttribute("cursor", "pointer");
        this.getParentEl().appendChild(this.el)
    },
    getId: function() {
        return this.el.getAttribute("id")
    },
    remove: function() {
        this.parent.getChildren().remove(this);
        this.getParentEl().removeChild(this.el)
    },
    show: function() {
        this.el.style.display = ""
    },
    hide: function() {
        this.el.style.display = "none"
    },
    moveTo: Gef.emptyFn,
    update: Gef.emptyFn
});
Gef.ns("Gef.figure");
Gef.figure.GroupFigure = Gef.extend(Gef.figure.Figure, {
    renderVml: function() {
        var $ = document.createElement("div");
        $.id = this.id;
        this.el = $;
        this.getParentEl().appendChild($)
    },
    renderSvg: function() {
        var $ = document.createElementNS(Gef.svgns, "g");
        $.setAttribute("id", this.id);
        this.el = $;
        this.getParentEl().appendChild($)
    },
    onRenderVml: function() {},
    onRenderSvg: function() {}
});
Gef.ns("Gef.figure");
Gef.figure.LineFigure = Gef.extend(Gef.figure.Figure, {
    renderVml: function() {
        var $ = document.createElement("v:line");
        $.from = this.x1 + "," + this.y1;
        $.to = this.x2 + "," + this.y2;
        this.el = $
    },
    renderSvg: function() {
        var $ = document.createElementNS(Gef.svgns, "line");
        $.setAttribute("x1", this.x1 + "px");
        $.setAttribute("y1", this.y1 + "px");
        $.setAttribute("x2", this.x2 + "px");
        $.setAttribute("y2", this.y2 + "px");
        this.el = $
    },
    onRenderVml: function() {
        this.el.setAttribute("id", Jpdl.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "pointer";
        this.el.setAttribute("strokeweight", 2);
        this.el.setAttribute("strokecolor", "blue");
        this.getParentEl().appendChild(this.el)
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Jpdl.id());
        this.el.setAttribute("fill", "white");
        this.el.setAttribute("stroke", "blue");
        this.el.setAttribute("stroke-width", "2");
        this.el.setAttribute("cursor", "pointer");
        this.getParentEl().appendChild(this.el)
    },
    update: function(B, $, A, _) {
        this.x1 = B;
        this.y1 = $;
        this.x2 = A;
        this.y2 = _;
        if (Gef.isVml) this.updateVml();
        else this.updateSvg()
    },
    updateVml: function() {
        this.el.from = this.x1 + "," + this.y1;
        this.el.to = this.x2 + "," + this.y2
    },
    updateSvg: function() {
        this.el.setAttribute("x1", this.x1 + "px");
        this.el.setAttribute("y1", this.y1 + "px");
        this.el.setAttribute("x2", this.x2 + "px");
        this.el.setAttribute("y2", this.y2 + "px")
    }
});
Gef.ns("Gef.figure");
Gef.figure.PolylineFigure = Gef.extend(Gef.figure.Figure, {
    getPoint: function(_, A) {
        var $ = "";
        for (var C = 0; C < this.points.length; C++) {
            var B = this.points[C];
            $ += (B[0] + _) + "," + (B[1] + A) + " "
        }
        return $
    },
    renderVml: function() {
        var $ = document.createElement("v:polyline");
        $.setAttribute("points", this.getPoint(0, 0));
        this.el = $
    },
    renderSvg: function() {
        var $ = document.createElementNS(Gef.svgns, "polyline");
        $.setAttribute("points", this.getPoint(0, 0));
        this.el = $
    },
    onRenderVml: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "pointer";
        this.el.setAttribute("strokeweight", 2);
        this.el.setAttribute("strokecolor", "blue");
        Gef.model.root.appendChild(this.el)
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.setAttribute("fill", "none");
        this.el.setAttribute("stroke", "blue");
        this.el.setAttribute("stroke-width", "2");
        this.el.setAttribute("cursor", "pointer");
        Gef.model.root.appendChild(this.el)
    },
    onSelectVml: function() {
        this.el.setAttribute("strokeweight", "4");
        this.el.setAttribute("strokecolor", "green")
    },
    onSelectSvg: function() {
        this.el.setAttribute("stroke-width", "4");
        this.el.setAttribute("stroke", "green")
    },
    onDeselectVml: function() {
        this.el.setAttribute("strokeweight", "2");
        this.el.setAttribute("strokecolor", "blue")
    },
    onDeselectSvg: function() {
        this.el.setAttribute("stroke-width", "2");
        this.el.setAttribute("stroke", "blue")
    }
});
Gef.ns("Gef.figure");
Gef.figure.RectFigure = Gef.extend(Gef.figure.Figure, {
    renderVml: function() {
        var $ = document.createElement("v:rect");
        $.style.left = this.x + "px";
        $.style.top = this.y + "px";
        $.style.width = this.w + "px";
        $.style.height = this.h + "px";
        this.el = $
    },
    renderSvg: function() {
        var $ = document.createElementNS(Gef.svgns, "rect");
        $.setAttribute("x", this.x + "px");
        $.setAttribute("y", this.y + "px");
        $.setAttribute("width", this.w + "px");
        $.setAttribute("height", this.h + "px");
        this.el = $
    },
    move: function($, _) {
        this.moveTo(this.x + $, this.y + _)
    },
    moveTo: function(_, $) {
        this.x = _;
        this.y = $;
        if (Gef.isVml) this.moveToVml();
        else this.moveToSvg()
    },
    moveToVml: function() {
        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px"
    },
    moveToSvg: function(_, $) {
        this.el.setAttribute("x", this.x);
        this.el.setAttribute("y", this.y)
    },
    update: function(B, A, $, _) {
        this.x = B;
        this.y = A;
        this.w = $;
        this.h = _;
        if (Gef.isVml) this.updateVml();
        else this.updateSvg()
    },
    updateVml: function() {
        this.moveToVml();
        this.el.style.width = this.w + "px";
        this.el.style.height = this.h + "px"
    },
    updateSvg: function() {
        this.moveToSvg();
        this.el.setAttribute("width", this.w);
        this.el.setAttribute("height", this.h)
    },
    resize: function(B, _, A) {
        var E = this.x,
        D = this.y,
        $ = this.w,
        C = this.h;
        if (B == "n") {
            D = D + A;
            C = C - A
        } else if (B == "s") C = C + A;
        else if (B == "w") {
            E = E + _;
            $ = $ - _
        } else if (B == "e") $ = $ + _;
        else if (B == "nw") {
            E = E + _;
            $ = $ - _;
            D = D + A;
            C = C - A
        } else if (B == "ne") {
            $ = $ + _;
            D = D + A;
            C = C - A
        } else if (B == "sw") {
            E = E + _;
            $ = $ - _;
            C = C + A
        } else if (B == "se") {
            $ = $ + _;
            C = C + A
        }
        this.update(E, D, $, C);
        return {
            x: E,
            y: D,
            w: $,
            h: C
        }
    }
});
Gef.ns("Gef.figure");
Gef.figure.RoundRectFigure = Gef.extend(Gef.figure.RectFigure, {
    renderVml: function() {
        Gef.figure.RoundRectFigure.superclass.renderVml.call(this);
        this.el.arcsize = 0.2
    },
    renderSvg: function() {
        Gef.figure.RoundRectFigure.superclass.renderSvg.call(this);
        this.el.setAttribute("rx", 10);
        this.el.setAttribute("ry", 10)
    }
});
Gef.ns("Gef.figure");
Gef.figure.ImageFigure = Gef.extend(Gef.figure.RectFigure, {
    renderVml: function() {
   		//alert("cheng ImageFigure renderVml :"+this.url);
        var $ = document.createElement("img");
        $.style.left = this.x + "px";
        $.style.top = this.y + "px";
        $.setAttribute("src", this.url);
        //设置图片初始 大小
        $.setAttribute("width", "46");
        $.setAttribute("height", "46");
        this.el = $
    },
    renderSvg: function() {
    	//alert("cheng ImageFigure renderSvg :"+this.w);
        var $ = document.createElementNS(Gef.svgns, "image");
        $.setAttribute("x", this.x + "px");
        $.setAttribute("y", this.y + "px");
        $.setAttribute("width", this.w + "px");
        $.setAttribute("height", this.h + "px");
        $.setAttributeNS(Gef.linkns, "xlink:href", this.url);
        $.onclick = function() {
            return false
        };
        this.el = $
    },
    update: function(B, A, $, _) {
        this.moveTo(B, A)
    },
    onRenderVml: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "pointer";
        this.getParentEl().appendChild(this.el)
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.setAttribute("cursor", "pointer");
        this.getParentEl().appendChild(this.el)
    },
    changeImageUrl: function($) {
        if (Gef.isVml) this.changeImageUrlVml($);
        else this.changeImageUrlSvg($)
    },
    changeImageUrlVml: function($) {
        this.el.setAttribute("src", $)
    },
    changeImageUrlSvg: function($) {
        this.el.setAttributeNS(Gef.linkns, "xlink:href", $)
    }
});
Gef.ns("Gef.figure");
Gef.figure.RootFigure = Gef.extend(Gef.figure.Figure, {
    render: function() {
        this.getParentEl().onselectstart = function() {
            return false
        };
        Gef.figure.RootFigure.superclass.render.call(this)
    },
    renderVml: function() {
        var $ = document.createElement("div");
        $.setAttribute("id", Gef.id());
        this.getParentEl().appendChild($);
        this.el = $
    },
    renderSvg: function() {
        var E = this.getParentEl(),
        _ = E.ownerDocument.createElementNS(Gef.svgns, "svg");
        _.setAttribute("id", Gef.id());
        _.setAttribute("width", E.style.width.replace(/px/, ""));
        _.setAttribute("height", E.style.height.replace(/px/, ""));
        _.style.fontFamily = "Verdana";
        _.style.fontSize = "12px";
        E.appendChild(_);
        var $ = _.ownerDocument.createElementNS(Gef.svgns, "defs");
        _.appendChild($);
        var B = _.ownerDocument.createElementNS(Gef.svgns, "marker");
        B.setAttribute("id", "markerArrow");
        B.setAttribute("markerUnits", "userSpaceOnUse");
        B.setAttribute("markerWidth", 8);
        B.setAttribute("markerHeight", 8);
        B.setAttribute("refX", 8);
        B.setAttribute("refY", 4);
        B.setAttribute("orient", "auto");
        var A = _.ownerDocument.createElementNS(Gef.svgns, "path");
        A.setAttribute("d", "M 0 0 L 8 4 L 0 8 z");
        A.setAttribute("stroke", "#909090");
        A.setAttribute("fill", "#909090");
        B.appendChild(A);
        $.appendChild(B);
        var D = _.ownerDocument.createElementNS(Gef.svgns, "marker");
        D.setAttribute("id", "markerDiamond");
        D.setAttribute("markerUnits", "userSpaceOnUse");
        D.setAttribute("markerWidth", 16);
        D.setAttribute("markerHeight", 8);
        D.setAttribute("refX", 0);
        D.setAttribute("refY", 4);
        D.setAttribute("orient", "auto");
        var C = _.ownerDocument.createElementNS(Gef.svgns, "path");
        C.setAttribute("d", "M 0 4 L 8 8 L 16 4 L 8 0 z");
        C.setAttribute("stroke", "#909090");
        C.setAttribute("fill", "#FFFFFF");
        D.appendChild(C);
        $.appendChild(D);
        this.el = _
    },
    onRenderVml: function() {},
    onRenderSvg: function() {}
});
Gef.ns("Gef.figure");
Gef.figure.NoFigure = Gef.extend(Gef.figure.Figure, {
    render: Gef.emptyFn,
    update: Gef.emptyFn
});
Gef.ns("Gef.figure");
Gef.figure.NodeFigure = Gef.extend(Gef.figure.RoundRectFigure, {
    constructor: function($) {
        this.outputs = [];
        this.incomes = [];
        Gef.figure.NodeFigure.superclass.constructor.call(this, $);
        this.w = 90;
        this.h = 50
    },
    renderVml: function() {
        var $ = document.createElement("v:group");
        $.style.left = this.x;
        $.style.top = this.y;
        $.style.width = this.w;
        $.style.height = this.h;
        $.setAttribute("coordsize", this.w + "," + this.h);
        this.el = $;
        var B = document.createElement("v:roundrect");
        B.style.position = "absolute";
        B.style.left = "5px";
        B.style.top = "5px";
        B.style.width = (this.w - 10) + "px";
        B.style.height = (this.h - 10) + "px";
        B.setAttribute("id", Gef.id());
        B.setAttribute("arcsize", 0.2);
        B.setAttribute("fillcolor", "#F6F7FF");
        B.setAttribute("strokecolor", "#03689A");
        B.setAttribute("strokeweight", "2");
        B.style.verticalAlign = "middle";
        $.appendChild(B);
        this.rectEl = B;
        var _ = this.getTextPosition(this.w, this.h),
        A = document.createElement("v:textbox");
        A.style.textAlign = "center";
        A.style.fontFamily = "Verdana";
        A.style.fontSize = "12px";
        A.setAttribute("id", Gef.id());
        A.innerHTML = this.name;
        B.appendChild(A);
        this.textEl = A
    },
    renderSvg: function() {
        var $ = document.createElementNS(Gef.svgns, "g");
        $.setAttribute("transform", "translate(" + this.x + "," + this.y + ")");
        this.el = $;
        var B = document.createElementNS(Gef.svgns, "rect");
        B.setAttribute("id", Gef.id());
        B.setAttribute("x", 5);
        B.setAttribute("y", 5);
        B.setAttribute("width", (this.w - 10) + "px");
        B.setAttribute("height", (this.h - 10) + "px");
        B.setAttribute("rx", 10);
        B.setAttribute("ry", 10);
        B.setAttribute("fill", "#F6F7FF");
        B.setAttribute("stroke", "#03689A");
        B.setAttribute("stroke-width", "2");
        $.appendChild(B);
        this.rectEl = B;
        var _ = this.getTextPosition(this.w, this.h),
        A = document.createElementNS(Gef.svgns, "text");
        A.setAttribute("id", Gef.id());
        A.setAttribute("x", _.x);
        A.setAttribute("y", _.y);
        A.setAttribute("text-anchor", "middle");
        A.textContent = this.name;
        $.appendChild(A);
        this.textEl = A
    },
    onRenderVml: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "pointer";
        this.getParentEl().appendChild(this.el)
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.setAttribute("cursor", "pointer");
        this.getParentEl().appendChild(this.el)
    },
    getTextPosition: function($, _) {
        if (Gef.isVml) return this.getTextPositionVml($, _);
        else return this.getTextPositionSvg($, _)
    },
    getTextPositionVml: function($, B) {
        var _ = Gef.getTextSize(this.name),
        C = $ / 2,
        A = B / 2;
        return {
            x: C + "px",
            y: A + "px"
        }
    },
    getTextPositionSvg: function($, B) {
        var _ = Gef.getTextSize(this.name),
        C = $ / 2,
        A = B / 2 + _.h / 4;
        return {
            x: C + "px",
            y: A + "px"
        }
    },
    moveTo: function(B, _) {
        Gef.figure.NodeFigure.superclass.moveTo.call(this, B, _);
        for (var A = 0; A < this.incomes.length; A++) {
            var $ = this.incomes[A];
            $.refresh()
        }
        for (A = 0; A < this.outputs.length; A++) {
            $ = this.outputs[A];
            $.refresh()
        }
    },
    moveToVml: function() {
        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px"
    },
    moveToSvg: function($, _) {
        this.el.setAttribute("transform", "translate(" + this.x + "," + this.y + ")")
    },
    update: function(B, A, $, _) {
        this.x = B;
        this.y = A;
        this.w = $;
        this.h = _;
        if (Gef.isVml) this.resizeVml(B, A, $, _);
        else this.resizeSvg(B, A, $, _)
    },
    remove: function() {
        for (var _ = this.outputs.length - 1; _ >= 0; _--) {
            var $ = this.outputs[_];
            $.remove()
        }
        for (_ = this.incomes.length - 1; _ >= 0; _--) {
            $ = this.incomes[_];
            $.remove()
        }
        Gef.figure.NodeFigure.superclass.remove.call(this)
    },
    hideText: function() {
        this.textEl.style.display = "none"
    },
    updateAndShowText: function($) {
        this.name = $;
        if (Gef.isVml) this.textEl.innerHTML = $;
        else this.textEl.textContent = $;
        this.textEl.style.display = ""
    },
    cancelEditText: function() {
        this.textEl.style.display = ""
    },
    resize: function(B, _, A) {
        var E = this.x,
        D = this.y,
        $ = this.w,
        C = this.h;
        if (B == "n") {
            D = D + A;
            C = C - A
        } else if (B == "s") C = C + A;
        else if (B == "w") {
            E = E + _;
            $ = $ - _
        } else if (B == "e") $ = $ + _;
        else if (B == "nw") {
            E = E + _;
            $ = $ - _;
            D = D + A;
            C = C - A
        } else if (B == "ne") {
            $ = $ + _;
            D = D + A;
            C = C - A
        } else if (B == "sw") {
            E = E + _;
            $ = $ - _;
            C = C + A
        } else if (B == "se") {
            $ = $ + _;
            C = C + A
        }
        if (Gef.isVml) this.resizeVml(E, D, $, C);
        else this.resizeSvg(E, D, $, C);
        return {
            x: E,
            y: D,
            w: $,
            h: C
        }
    },
    resizeVml: function(B, A, $, _) {
        this.el.style.left = B + "px";
        this.el.style.top = A + "px";
        this.el.style.width = $ + "px";
        this.el.style.height = _ + "px";
        this.el.coordsize = $ + "," + _;
        this.rectEl.style.width = ($ - 10) + "px";
        this.rectEl.style.height = (_ - 10) + "px"
    },
    resizeSvg: function(C, B, $, A) {
        this.el.setAttribute("transform", "translate(" + C + "," + B + ")");
        this.rectEl.setAttribute("width", ($ - 10) + "px");
        this.rectEl.setAttribute("height", (A - 10) + "px");
        var _ = this.getTextPosition($, A);
        this.textEl.setAttribute("x", _.x);
        this.textEl.setAttribute("y", _.y)
    },
    getTools: function() {
        return []
    }
});
Gef.ns("Gef.figure");
Gef.figure.ImageNodeFigure = Gef.extend(Gef.figure.ImageFigure, {
    constructor: function($) {
        this.w = 48;
        this.h = 48;
        this.outputs = [];
        this.incomes = [];
        Gef.figure.ImageNodeFigure.superclass.constructor.call(this, $)
    },
    move: function(_, A) {
        Gef.figure.ImageNodeFigure.superclass.move.call(this, _, A);
        for (var B = 0; B < this.incomes.length; B++) {
            var $ = this.incomes[B];
            $.refresh()
        }
        for (B = 0; B < this.outputs.length; B++) {
            $ = this.outputs[B];
            $.refresh()
        }
    },
    remove: function() {
        for (var _ = this.outputs.length - 1; _ >= 0; _--) {
            var $ = this.outputs[_];
            $.remove()
        }
        for (_ = this.incomes.length - 1; _ >= 0; _--) {
            $ = this.incomes[_];
            $.remove()
        }
        Gef.figure.ImageNodeFigure.superclass.remove.call(this)
    },
    getTools: function() {
        return []
    }
});
Gef.ns("Gef.figure");
Gef.figure.EdgeFigure = Gef.extend(Gef.figure.PolylineFigure, {
    constructor: function(_, $) {
        this.from = _;
        this.to = $;
        if (!this.name) this.name = "to " + $.name;
        this.from.outputs.push(this);
        this.to.incomes.push(this);
        this.alive = true;
        this.innerPoints = [];
        this.calculate();
        Gef.figure.EdgeFigure.superclass.constructor.call(this, {});
        this.textX = 0;
        this.textY = 0;
        this.conditional = false
    },
    render: function() {
        this.calculate();
        Gef.figure.EdgeFigure.superclass.render.call(this);
        this.setConditional(this.conditional)
    },
    onRenderVml: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "pointer";
        this.el.setAttribute("strokeweight", 2);
        this.el.setAttribute("strokecolor", "#909090");
        this.getParentEl().appendChild(this.el);
        this.stroke = document.createElement("v:stroke");
        this.el.appendChild(this.stroke);
        this.stroke.setAttribute("endArrow", "Classic");
        this.fill = document.createElement("v:fill");
        this.el.appendChild(this.fill);
        this.fill.setAttribute("opacity", 0);
        var _ = document.createElement("textbox");
        _.setAttribute("id", Gef.id());
        var $ = this.getTextLocation();
        //alert("cheng $.x:"+$.x);
        _.style.position = "absolute";
        _.style.left = $.x + "px";
        _.style.top = ($.y - $.h) + "px";
        _.style.textAlign = "center";
        _.style.cursor = "pointer";
        _.style.fontFamily = "Verdana";
        _.style.fontSize = "12px";
        _.innerHTML = this.name ? this.name: "";
        _.setAttribute("edgeId", this.getId());
        this.getParentEl().appendChild(_);
        this.textEl = _
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.setAttribute("fill", "none");
        this.el.setAttribute("stroke", "#909090");
        this.el.setAttribute("stroke-width", "2");
        this.el.setAttribute("cursor", "pointer");
        this.el.setAttribute("marker-end", "url(#markerArrow)");
        this.getParentEl().appendChild(this.el);
        var _ = document.createElementNS(Gef.svgns, "text");
        _.setAttribute("id", Gef.id());
        var $ = this.getTextLocation();
        _.setAttribute("x", $.x);
        _.setAttribute("y", $.y - 4);
        _.setAttribute("cursor", "pointer");
        _.textContent = this.name ? this.name: "";
        _.setAttribute("edgeId", this.getId());
        this.getParentEl().appendChild(_);
        this.textEl = _
    },
    setConditional: function($) {
        this.conditional = $;
        if (Gef.isVml) this.setConditionalVml();
        else this.setConditionalSvg()
    },
    setConditionalVml: function() {
        if (this.conditional === true) this.stroke.setAttribute("startArrow", "diamond");
        else this.stroke.setAttribute("startArrow", "none")
    },
    setConditionalSvg: function() {
        if (this.conditional === true) this.el.setAttribute("marker-start", "url(#markerDiamond)");
        else this.el.setAttribute("marker-start", "")
    },
    calculate: function() {
        var A = new Geom.Line(this.from.x + this.from.w / 2, this.from.y + this.from.h / 2, this.to.x + this.to.w / 2, this.to.y + this.to.h / 2),
        C = new Geom.Rect(this.from.x, this.from.y, this.from.w, this.from.h),
        B = new Geom.Rect(this.to.x, this.to.y, this.to.w, this.to.h),
        _ = C.getCrossPoint(A),
        $ = B.getCrossPoint(A);
        if (_ == null || $ == null) {
            this.x1 = 0;
            this.y1 = 0;
            this.x2 = 0;
            this.y2 = 0
        } else {
            this.x1 = _.x;
            this.y1 = _.y;
            this.x2 = $.x;
            this.y2 = $.y
        }
        this.convert()
    },
    recalculate: function(_, $) {
        var B = new Geom.Line(_.x + _.w / 2, _.y + _.h / 2, $[0], $[1]),
        C = new Geom.Rect(_.x, _.y, _.w, _.h),
        A = C.getCrossPoint(B);
        return A
    },
    convert: function() {
        this.points = [];
        var _ = this.points,
        A = this.innerPoints.length;
        if (A > 0) {
            var $ = this.recalculate(this.from, this.innerPoints[0]);
            if ($) {
                this.x1 = $.x;
                this.y1 = $.y
            }
        }
        _.push([this.x1, this.y1]);
        for (var B = 0; B < this.innerPoints.length; B++) _.push([this.innerPoints[B][0], this.innerPoints[B][1]]);
        if (A > 0) {
            $ = this.recalculate(this.to, this.innerPoints[A - 1]);
            if ($) {
                this.x2 = $.x;
                this.y2 = $.y
            }
        }
        _.push([this.x2, this.y2])
    },
    update: function(B, $, A, _) {
        this.x1 = B;
        this.y1 = $;
        this.x2 = A;
        this.y2 = _;
        if (Gef.isVml) this.updateVml();
        else this.updateSvg()
    },
    updateVml: function() {
        this.el.points.value = this.getPoint(0, 0);
        var $ = this.getTextLocation();
        this.textEl.style.left = $.x + "px";
        this.textEl.style.top = ($.y - $.h) + "px"
    },
    updateSvg: function() {
        this.el.setAttribute("points", this.getPoint(0, 0));
        var $ = this.getTextLocation();
        this.textEl.setAttribute("x", $.x);
        this.textEl.setAttribute("y", $.y - 4)
    },
    refresh: function() {
        if (!this.el) this.render();
        this.calculate();
        this.update(this.x1, this.y1, this.x2, this.y2)
    },
    getTextLocation: function() {
    	//alert("cheng getTextLocation:"+this.textX);
    	if(isNaN(this.textX)){
    		this.textX =0;
    	}
        var _obj = Gef.getTextSize(this.name),
        W = _obj.w + 2,
        B = _obj.h + 2,
        C = (this.x1 + this.x2) / 2 + this.textX - 1,
        A = (this.y1 + this.y2) / 2 + this.textY + 2;
        return {
            x: C,
            y: A,
            w: W,
            h: B
        }
    },
    updateAndShowText: function(_) {
        this.name = _;
        if (Gef.isVml) {
            this.textEl.innerHTML = _ ? _: "";
            var $ = this.getTextLocation();
            this.textEl.style.left = $.x;
            this.textEl.style.top = $.y
        } else this.textEl.textContent = _ ? _: "";
        this.textEl.style.display = ""
    },
    remove: function() {
        if (this.alive) {
            this.from.outputs.remove(this);
            this.to.incomes.remove(this);
            this.getParentEl().removeChild(this.textEl);
            Gef.figure.EdgeFigure.superclass.remove.call(this);
            this.alive = false
        }
    },
    modify: function() {
        this.convert();
        if (Gef.isVml) this.el.points.value = this.getPoint(0, 0);
        else this.el.setAttribute("points", this.getPoint(0, 0));
        this.refresh()
    }
});
Gef.ns("Gef.figure");
Gef.figure.DraggingRectFigure = Gef.extend(Gef.figure.RectFigure, {
    constructor: function($) {
        Gef.figure.DraggingRectFigure.superclass.constructor.call(this, $);
        this._className = "Gef.DraggingRectFigure"
    },
    onRenderVml: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "normal";
        this.getParentEl().appendChild(this.el);
        this.stroke = document.createElement("v:stroke");
        this.el.appendChild(this.stroke);
        this.stroke.setAttribute("strokecolor", "black");
        this.stroke.setAttribute("dashstyle", "dot");
        this.fill = document.createElement("v:fill");
        this.el.appendChild(this.fill);
        this.fill.setAttribute("color", "#F6F6F6");
        this.fill.setAttribute("opacity", "0.5")
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.setAttribute("fill", "#F6F6F6");
        this.el.setAttribute("opacity", "0.7");
        this.el.setAttribute("stroke", "black");
        this.el.setAttribute("stroke-width", "1");
        this.el.setAttribute("cursor", "normal");
        this.el.setAttribute("stroke-dasharray", "2");
        this.getParentEl().appendChild(this.el)
    },
    update: function(E, D, $, C) {
        var B = this.x,
        A = this.y,
        _ = {
            x: E,
            y: D,
            w: $,
            h: C
        };
        if ($ < 0) {
            this.oldX = this.x;
            _.x = E + $;
            _.w = -$
        }
        if (C < 0) {
            _.y = D + C;
            _.h = -C
        }
        Gef.figure.DraggingRectFigure.superclass.update.call(this, _.x, _.y, _.w, _.h);
        if ($ < 0) this.x = B;
        if (C < 0) this.y = A
    }
});
Gef.ns("Gef.figure");
Gef.figure.DraggingEdgeFigure = Gef.extend(Gef.figure.EdgeFigure, {
    constructor: function($) {
        Gef.figure.DraggingEdgeFigure.superclass.constructor.call(this, {
            outputs: []
        },
        {
            incomes: []
        });
        this._className = "Gef.DraggingEdgeFigure"
    },
    onRenderVml: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.style.position = "absolute";
        this.el.style.cursor = "normal";
        this.getParentEl().appendChild(this.el);
        this.stroke = document.createElement("v:stroke");
        this.el.appendChild(this.stroke);
        this.stroke.color = "#909090";
        this.stroke.dashstyle = "dot";
        this.stroke.endArrow = "Classic";
        this.stroke.weight = 2
    },
    onRenderSvg: function() {
        this.el.setAttribute("id", Gef.id());
        this.el.setAttribute("fill", "none");
        this.el.setAttribute("stroke", "#909090");
        this.el.setAttribute("stroke-width", "2");
        this.el.setAttribute("cursor", "normal");
        this.el.setAttribute("stroke-dasharray", "2");
        this.el.setAttribute("marker-end", "url(#markerArrow)");
        this.getParentEl().appendChild(this.el)
    },
    updateForDragging: function(_, $) {
        this.from = _;
        this.x1 = this.from.x;
        this.y1 = this.from.y;
        this.to = {
            x: $.x,
            y: $.y,
            w: 2,
            h: 2
        };
        this.x2 = this.to.x;
        this.y2 = this.to.y;
        this.innerPoints = [];
        this.refresh()
    },
    updateForMove: function($, _, A) {
        if (_ == "start") {
            this.from = {
                x: A.x,
                y: A.y,
                w: 2,
                h: 2
            };
            this.x1 = A.x;
            this.y1 = A.y;
            this.to = $.to;
            this.x2 = $.x2;
            this.y2 = $.y2
        } else {
            this.from = $.from;
            this.x1 = $.x1;
            this.y1 = $.y1;
            this.to = {
                x: A.x,
                y: A.y,
                w: 2,
                h: 2
            };
            this.x2 = A.x;
            this.y2 = A.y
        }
        this.innerPoints = $.innerPoints;
        this.refresh()
    },
    moveToHide: function() {
        this.from = null;
        this.to = null;
        this.innerPoints = null;
        this.points = [[ - 1, -1], [ - 1, -1]];
        this.update( - 1, -1, -1, -1)
    },
    updateVml: function() {
        this.el.points.value = this.getPoint(0, 0)
    },
    updateSvg: function() {
        this.el.setAttribute("points", this.getPoint(0, 0))
    }
});
Gef.ns("Gef.figure");
Gef.figure.DraggingTextFigure = Gef.extend(Gef.figure.Figure, {
    constructor: function($) {
        Gef.figure.DraggingTextFigure.superclass.constructor.call(this);
        this.edge = $
    },
    getTextLocation: function() {
        var _ = this.edge.getTextLocation(),
        E = _.x,
        D = _.y,
        $ = _.w,
        C = _.h,
        B = $ / 2,
        A = C / 2;
        D -= C;
        return {
            x: E,
            y: D,
            w: $,
            h: C,
            cx: B,
            cy: A
        }
    },
    renderVml: function() {
        var A = this.getTextLocation(),
        G = A.x,
        F = A.y,
        $ = A.w,
        E = A.h,
        C = A.cx,
        B = A.cy,
        _ = document.createElement("v:group");
        _.style.left = G;
        _.style.top = F;
        _.style.width = $;
        _.style.height = E;
        _.setAttribute("coordsize", $ + "," + E);
        this.el = _;
        var D = document.createElement("v:rect");
        D.filled = "f";
        D.strokecolor = "black";
        D.style.left = "0px";
        D.style.top = "0px";
        D.style.width = $ + "px";
        D.style.height = E + "px";
        _.appendChild(D);
        this.rectEl = D;
        this.nwEl = this.createItemVml(0, 0, "nw");
        this.neEl = this.createItemVml($, 0, "ne");
        this.swEl = this.createItemVml(0, E, "sw");
        this.seEl = this.createItemVml($, E, "se")
    },
    createItemVml: function(B, A, $) {
        var _ = document.createElement("v:rect");
        _.id = this.edge.getId() + ":" + $;
        _.fillcolor = "black";
        _.style.cursor = $ + "-resize";
        _.style.left = (B - 2) + "px";
        _.style.top = (A - 2) + "px";
        _.style.width = "4px";
        _.style.height = "4px";
        this.el.appendChild(_);
        return _
    },
    renderSvg: function() {
        var A = this.getTextLocation(),
        G = A.x,
        F = A.y,
        $ = A.w,
        E = A.h,
        C = A.cx,
        B = A.cy,
        _ = document.createElementNS(Gef.svgns, "g");
        _.setAttribute("transform", "translate(" + G + "," + F + ")");
        this.el = _;
        var D = document.createElementNS(Gef.svgns, "rect");
        D.setAttribute("x", 0);
        D.setAttribute("y", 0);
        D.setAttribute("width", $);
        D.setAttribute("height", E);
        D.setAttribute("fill", "none");
        D.setAttribute("stroke", "black");
        this.rectEl = D;
        this.el.appendChild(D);
        this.nwEl = this.createItemSvg(0, 0, "nw");
        this.neEl = this.createItemSvg($, 0, "ne");
        this.swEl = this.createItemSvg(0, E, "sw");
        this.seEl = this.createItemSvg($, E, "se")
    },
    createItemSvg: function(B, A, $) {
        var _ = document.createElementNS(Gef.svgns, "rect");
        _.setAttribute("id", this.edge.getId() + ":" + $);
        _.setAttribute("cursor", $ + "-resize");
        _.setAttribute("x", B - 2);
        _.setAttribute("y", A - 2);
        _.setAttribute("width", "5");
        _.setAttribute("height", "5");
        _.setAttribute("fill", "black");
        _.setAttribute("stroke", "white");
        this.el.appendChild(_);
        return _
    },
    resize: function(B, $, A, _) {
        if (Gef.isVml) this.resizeVml(B, $, A, _);
        else this.resizeSvg(B, $, A, _)
    },
    resizeVml: function(I, A, E, C) {
        var _ = this.getTextLocation(),
        H = _.x,
        G = _.y,
        $ = _.w,
        F = _.h,
        D = _.cx,
        B = _.cy;
        this.el.style.left = H + "px";
        this.el.style.top = G + "px";
        this.el.style.width = $ + "px";
        this.el.style.height = F + "px";
        this.el.coordsize = $ + "," + F;
        this.rectEl.style.width = $ + "px";
        this.rectEl.style.height = F + "px";
        this.neEl.style.left = ($ - 2) + "px";
        this.swEl.style.top = (F - 2) + "px";
        this.seEl.style.left = ($ - 2) + "px";
        this.seEl.style.top = (F - 2) + "px"
    },
    resizeSvg: function(I, A, E, C) {
        var _ = this.getTextLocation(),
        H = _.x,
        G = _.y,
        $ = _.w,
        F = _.h,
        D = _.cx,
        B = _.cy;
        this.el.setAttribute("transform", "translate(" + H + "," + G + ")");
        this.rectEl.setAttribute("width", $);
        this.rectEl.setAttribute("height", F);
        this.neEl.setAttribute("x", $ - 2);
        this.swEl.setAttribute("y", F - 2);
        this.seEl.setAttribute("x", $ - 2);
        this.seEl.setAttribute("y", F - 2)
    },
    refresh: function() {
        this.resize(this.edge.x1, this.edge.y1, this.edge.x2, this.edge.y2);
        this.edge.refresh()
    }
});
Gef.ns("Gef.figure");
Gef.figure.ResizeNodeHandle = Gef.extend(Gef.figure.Figure, {
    constructor: function($) {
        this.children = [];
        this.node = $
    },
    renderVml: function() {
        var _ = this.node,
        G = _.x,
        F = _.y,
        $ = _.w,
        E = _.h,
        C = $ / 2,
        B = E / 2,
        A = document.createElement("v:group");
        A.style.left = G;
        A.style.top = F;
        A.style.width = $;
        A.style.height = E;
        A.setAttribute("coordsize", $ + "," + E);
        this.el = A;
        var D = document.createElement("v:rect");
        D.filled = "f";
        D.strokecolor = "black";
        D.style.left = "0px";
        D.style.top = "0px";
        D.style.width = $ + "px";
        D.style.height = E + "px";
        A.appendChild(D);
        this.rectEl = D;
        this.nEl = this.createItemVml(C, 0, "n");
        this.sEl = this.createItemVml(C, E, "s");
        this.wEl = this.createItemVml(0, B, "w");
        this.eEl = this.createItemVml($, B, "e");
        this.nwEl = this.createItemVml(0, 0, "nw");
        this.neEl = this.createItemVml($, 0, "ne");
        this.swEl = this.createItemVml(0, E, "sw");
        this.seEl = this.createItemVml($, E, "se");
        Gef.each(_.getTools(),
        function($) {
            $.render(A, _)
        })
    },
    createItemVml: function(B, A, $) {
        var _ = document.createElement("v:rect");
        _.id = this.node.getId() + ":" + $;
        _.fillcolor = "black";
        _.strokecolor = "white";
        _.style.cursor = $ + "-resize";
        _.style.left = (B - 2) + "px";
        _.style.top = (A - 2) + "px";
        _.style.width = "5px";
        _.style.height = "5px";
        this.el.appendChild(_);
        return _
    },
    getDirectionByPoint: function(A) {
        var B = [["nw", "n", "ne"], ["w", "", "e"], ["sw", "s", "se"]],
        _ = this.w / 2,
        $ = this.h / 2;
        for (i = 0; i <= 2; i++) for (j = 0; j < 2; j++) {
            if (i == 1 && j == 1) continue;
            var D = this.x + _ * i,
            C = this.y + $ * j;
            if (A.x >= D - 2.5 && A.x <= D + 2.5 && A.y >= C - 2.5 && A.y <= C + 2.5) return B[i][j]
        }
        return null
    },
    renderSvg: function() {
        var _ = this.node,
        G = _.x,
        F = _.y,
        $ = _.w,
        E = _.h,
        C = $ / 2,
        B = E / 2,
        A = document.createElementNS(Gef.svgns, "g");
        A.setAttribute("transform", "translate(" + G + "," + F + ")");
        this.el = A;
        var D = document.createElementNS(Gef.svgns, "rect");
        D.setAttribute("x", 0);
        D.setAttribute("y", 0);
        D.setAttribute("width", $);
        D.setAttribute("height", E);
        D.setAttribute("fill", "none");
        D.setAttribute("stroke", "black");
        this.rectEl = D;
        this.el.appendChild(D);
        this.nEl = this.createItemSvg(C, 0, "n");
        this.sEl = this.createItemSvg(C, E, "s");
        this.wEl = this.createItemSvg(0, B, "w");
        this.eEl = this.createItemSvg($, B, "e");
        this.nwEl = this.createItemSvg(0, 0, "nw");
        this.neEl = this.createItemSvg($, 0, "ne");
        this.swEl = this.createItemSvg(0, E, "sw");
        this.seEl = this.createItemSvg($, E, "se");
        Gef.each(_.getTools(),
        function($) {
            $.render(A, _)
        })
    },
    createItemSvg: function(B, A, $) {
        var _ = document.createElementNS(Gef.svgns, "rect");
        _.setAttribute("id", this.node.getId() + ":" + $);
        _.setAttribute("cursor", $ + "-resize");
        _.setAttribute("x", B - 2);
        _.setAttribute("y", A - 2);
        _.setAttribute("width", "5");
        _.setAttribute("height", "5");
        _.setAttribute("fill", "black");
        _.setAttribute("stroke", "white");
        this.el.appendChild(_);
        return _
    },
    resize: function(B, A, $, _) {
        if (Gef.isVml) this.resizeVml(B, A, $, _);
        else this.resizeSvg(B, A, $, _)
    },
    resizeVml: function(B, A, $, _) {
        this.el.style.left = B + "px";
        this.el.style.top = A + "px";
        this.el.style.width = $ + "px";
        this.el.style.height = _ + "px";
        this.el.coordsize = $ + "," + _;
        this.rectEl.style.width = $ + "px";
        this.rectEl.style.height = _ + "px";
        this.nEl.style.left = ($ / 2 - 2) + "px";
        this.sEl.style.left = ($ / 2 - 2) + "px";
        this.sEl.style.top = (_ - 2) + "px";
        this.wEl.style.top = (_ / 2 - 2) + "px";
        this.eEl.style.left = ($ - 2) + "px";
        this.eEl.style.top = (_ / 2 - 2) + "px";
        this.neEl.style.left = ($ - 2) + "px";
        this.swEl.style.top = (_ - 2) + "px";
        this.seEl.style.left = ($ - 2) + "px";
        this.seEl.style.top = (_ - 2) + "px";
        Gef.each(this.node.getTools(),
        function(C) {
            C.resize(B, A, $, _)
        })
    },
    resizeSvg: function(B, A, $, _) {
        this.el.setAttribute("transform", "translate(" + B + "," + A + ")");
        this.rectEl.setAttribute("width", $);
        this.rectEl.setAttribute("height", _);
        this.nEl.setAttribute("x", $ / 2 - 2);
        this.sEl.setAttribute("x", $ / 2 - 2);
        this.sEl.setAttribute("y", _ - 2);
        this.wEl.setAttribute("y", _ / 2 - 2);
        this.eEl.setAttribute("x", $ - 2);
        this.eEl.setAttribute("y", _ / 2 - 2);
        this.neEl.setAttribute("x", $ - 2);
        this.swEl.setAttribute("y", _ - 2);
        this.seEl.setAttribute("x", $ - 2);
        this.seEl.setAttribute("y", _ - 2);
        Gef.each(this.node.getTools(),
        function(C) {
            C.resize(B, A, $, _)
        })
    },
    refresh: function() {
        this.resize(this.node.x, this.node.y, this.node.w, this.node.h)
    }
});
Gef.ns("Gef.figure");
Gef.figure.ResizeEdgeHandle = Gef.extend(Gef.figure.Figure, {
    renderVml: function() {
        var F = this.edge.x1,
        A = this.edge.y1,
        D = this.edge.x2,
        B = this.edge.y2,
        C = this.edge.innerPoints,
        H = Math.max(F, D),
        E = Math.max(A, B),
        I = document.createElement("v:group");
        I.style.width = H + "px";
        I.style.height = E + "px";
        I.setAttribute("coordsize", H + "," + E);
        this.getParentEl().appendChild(I);
        this.el = I;
        var K = document.createElement("v:polyline");
        K.setAttribute("points", this.edge.getPoint(0, 0));
        K.filled = "false";
        K.strokeweight = "1";
        K.strokecolor = "black";
        K.style.position = "absolute";
        I.appendChild(K);
        this.lineEl = K;
        this.startEl = this.createItem(F, A, "start");
        this.endEl = this.createItem(D, B, "end");
        var G = 0,
        _ = [F, A],
        J = [];
        for (; G < C.length; G++) {
            var $ = C[G];
            J.push(this.createItem((_[0] + $[0]) / 2, (_[1] + $[1]) / 2, "middle:" + (G - 1) + "," + G));
            _ = $;
            J.push(this.createItem($[0], $[1], "middle:" + G + "," + G))
        }
        J.push(this.createItem((_[0] + D) / 2, (_[1] + B) / 2, "middle:" + (G - 1) + "," + G));
        this.items = J
    },
    renderSvg: function() {
        var I = this.edge.x1,
        C = this.edge.y1,
        G = this.edge.x2,
        D = this.edge.y2,
        E = this.edge.innerPoints,
        $ = document.createElementNS(Gef.svgns, "g");
        this.getParentEl().appendChild($);
        this.el = $;
        var F = document.createElementNS(Gef.svgns, "polyline");
        F.setAttribute("points", this.edge.getPoint(0, 0));
        F.setAttribute("fill", "none");
        F.setAttribute("stroke", "black");
        $.appendChild(F);
        this.lineEl = F;
        this.startEl = this.createItem(I, C, "start");
        this.endEl = this.createItem(G, D, "end");
        var H = 0,
        B = [I, C],
        A = [];
        for (; H < E.length; H++) {
            var _ = E[H];
            A.push(this.createItem((B[0] + _[0]) / 2, (B[1] + _[1]) / 2, "middle:" + (H - 1) + "," + H));
            B = _;
            A.push(this.createItem(_[0], _[1], "middle:" + H + "," + H))
        }
        A.push(this.createItem((B[0] + G) / 2, (B[1] + D) / 2, "middle:" + (H - 1) + "," + H));
        this.items = A
    },
    createItem: function(A, _, $) {
        if (Gef.isVml) return this.createItemVml(A, _, $);
        else return this.createItemSvg(A, _, $)
    },
    createItemVml: function(B, A, _) {
        var $ = document.createElement("v:rect");
        $.id = this.edge.getId() + ":" + _;
        $.fillcolor = "black";
        $.strokecolor = "white";
        $.style.left = (B - 2) + "px";
        $.style.top = (A - 2) + "px";
        $.style.width = "5px";
        $.style.height = "5px";
        $.style.cursor = "move";
        this.el.appendChild($);
        return $
    },
    createItemSvg: function(B, A, _) {
        var $ = document.createElementNS(Gef.svgns, "rect");
        $.setAttribute("id", this.edge.getId() + ":" + _);
        $.setAttribute("x", B - 2);
        $.setAttribute("y", A - 2);
        $.setAttribute("width", 5);
        $.setAttribute("height", 5);
        $.setAttribute("fill", "black");
        $.setAttribute("stroke", "white");
        $.setAttribute("cursor", "move");
        this.el.appendChild($);
        return $
    },
    update: function() {
        if (Gef.isVml) this.updateVml();
        else this.updateSvg()
    },
    updateVml: function() {
        var G = this.edge.x1,
        _ = this.edge.y1,
        D = this.edge.x2,
        A = this.edge.y2;
        this.lineEl.points.value = this.edge.getPoint(0, 0);
        this.startEl.style.left = (G - 2) + "px";
        this.startEl.style.top = (_ - 2) + "px";
        this.endEl.style.left = (D - 2) + "px";
        this.endEl.style.top = (A - 2) + "px";
        var B = this.edge.innerPoints,
        F = 0,
        C = G,
        E = _;
        for (; F < B.length; F++) {
            var $ = B[F];
            this.items[F * 2].style.left = ((C + $[0]) / 2 - 2) + "px";
            this.items[F * 2].style.top = ((E + $[1]) / 2 - 2) + "px";
            C = $[0];
            E = $[1];
            this.items[F * 2 + 1].style.left = ($[0] - 2) + "px";
            this.items[F * 2 + 1].style.top = ($[1] - 2) + "px"
        }
        this.items[F * 2].style.left = ((C + D) / 2 - 2) + "px";
        this.items[F * 2].style.top = ((E + A) / 2 - 2) + "px"
    },
    updateSvg: function() {
        var G = this.edge.x1,
        _ = this.edge.y1,
        D = this.edge.x2,
        A = this.edge.y2;
        this.lineEl.setAttribute("points", this.edge.getPoint(0, 0));
        this.startEl.setAttribute("x", G - 2);
        this.startEl.setAttribute("y", _ - 2);
        this.endEl.setAttribute("x", D - 2);
        this.endEl.setAttribute("y", A - 2);
        var B = this.edge.innerPoints,
        F = 0,
        C = G,
        E = _;
        for (; F < B.length; F++) {
            var $ = B[F];
            this.items[F * 2].setAttribute("x", (C + $[0]) / 2 - 2);
            this.items[F * 2].setAttribute("y", (E + $[1]) / 2 - 2);
            C = $[0];
            E = $[1];
            this.items[F * 2 + 1].setAttribute("x", $[0] - 2);
            this.items[F * 2 + 1].setAttribute("y", $[1] - 2)
        }
        this.items[F * 2].setAttribute("x", (C + D) / 2 - 2);
        this.items[F * 2].setAttribute("y", (E + A) / 2 - 2)
    },
    modify: function() {
        var A = this.edge.innerPoints.length,
        $ = this.items.length;
        if (A * 2 + 1 > $) {
            this.items.push(this.createItem(0, 0, "middle:" + (A - 1) + "," + (A - 1)));
            this.items.push(this.createItem(0, 0, "middle:" + (A - 1) + "," + A))
        } else if (A * 2 + 1 < $) {
            var _ = null;
            _ = this.items[$ - 1];
            this.el.removeChild(_);
            this.items.remove(_);
            _ = this.items[$ - 2];
            this.el.removeChild(_);
            this.items.remove(_)
        }
        this.edge.refresh();
        this.update()
    },
    refresh: function() {
        this.modify()
    }
});
Gef.ns("Gef.figure");
Gef.figure.TextEditor = function(A, _) {
    var $ = document.createElement("input");
    $.setAttribute("type", "text");
    $.value = "";
    $.style.position = "absolute";
    $.style.left = "0px";
    $.style.top = "0px";
    $.style.width = "0px";
    $.style.border = "gray dotted 1px";
    $.style.background = "white";
    $.style.display = "none";
    $.style.zIndex = 1000;
    $.style.fontFamily = "Verdana";
    $.style.fontSize = "12px";
    document.body.appendChild($);
    this.el = $;
    this.baseX = A;
    this.baseY = _
};
Gef.figure.TextEditor.prototype = {
    showForNode: function($) {
        this.el.style.left = (this.baseX + $.x + 5) + "px";
        this.el.style.top = (this.baseY + $.y + $.h / 2 - 10) + "px";
        this.el.style.width = ($.w - 10) + "px";
        this.el.value = $.name;
        this.el.style.display = "";
        this.el.focus()
    },
    showForEdge: function(_) {
        var A = _.getTextLocation(),
        D = A.x,
        C = A.y,
        $ = A.w,
        B = A.h;
        C -= B;
        this.el.style.left = this.baseX + D + "px";
        this.el.style.top = this.baseY + C + "px";
        this.el.style.width = $ + "px";
        this.el.value = _.name;
        this.el.style.display = "";
        this.el.focus()
    },
    getValue: function() {
        return this.el.value
    },
    hide: function() {
        this.el.style.display = "none"
    },
    show: function() {
        this.el.style.display = ""
    }
};
Gef.ns("Gef.gef");
Gef.gef.Editor = Gef.extend(Gef.ui.EditorPart, {
    getEditDomain: Gef.emptyFn,
    getGraphicalViewer: Gef.emptyFn,
    getModelFactory: Gef.emptyFn,
    setModelFactory: Gef.emptyFn,
    getEditPartFactory: Gef.emptyFn,
    setEditPartFactory: Gef.emptyFn
});
Gef.ns("Gef.gef");
Gef.gef.EditPartFactory = Gef.extend(Object, {
    createEditPart: Gef.emptyFn
});
Gef.ns("Gef.gef");
Gef.gef.ModelFactory = Gef.extend(Object, {
    createModel: Gef.emptyFn
});
Gef.ns("Gef.gef");
Gef.gef.EditDomain = Gef.extend(Object, {
    constructor: function() {
        this.commandStack = new Gef.commands.CommandStack();
        this.editPartRegistry = {};
        this.model2EditPart = {};
        this.figure2EditPart = {}
    },
    getCommandStack: function() {
        return this.commandStack
    },
    setEditor: function($) {
        this.editor = $
    },
    createEditPart: function(_) {
        var $ = _.getId(),
        A = _.getType(),
        B = this.editor.getEditPartFactory().createEditPart(A);
        this.editPartRegistry[$] = B;
        B.setModel(_);
        this.registerModel(B);
        return B
    },
    findOrCreateEditPart: function(_) {
        var $ = _.getId(),
        A = _.getType(),
        B = this.editPartRegistry[$];
        if (!B) B = this.createEditPart(_);
        return B
    },
    registerModel: function(A) {
        var _ = A.getModel(),
        $ = _.getId();
        if (this.model2EditPart[$] != null) this.model2EditPart[$] = A
    },
    findModelByEditPart: function(_) {
        var $ = _.getId();
        return this.model2EditPart[$]
    },
    removeModelByEditPart: function(A) {
        var _ = A.getModel(),
        $ = _.getId();
        if (this.model2EditPart[$] != null) {
            this.model2EditPart[$] = null;
            delete this.model2EditPart[$]
        }
    },
    registerFigure: function(_) {
        var $ = _.getFigure(),
        A = $.getId();
        if (this.figure2EditPart[A] != null) this.figure2EditPart[A] = _
    },
    findFigureByEditPart: function($) {
        var _ = $.getId();
        return this.figure2EditPart[_]
    },
    removeFigureByEditPart: function(_) {
        var $ = _.getFigure(),
        A = $.getId();
        if (this.figure2EditPart[A] != null) {
            this.figure2EditPart[A] = null;
            delete this.figure2EditPart[A]
        }
    }
});
Gef.ns("Gef.gef");
Gef.gef.EditPartViewer = Gef.extend(Object, {
    getContents: Gef.emptyFn,
    setContents: Gef.emptyFn,
    getRootEditPart: Gef.emptyFn,
    setRootEditPart: Gef.emptyFn,
    getEditDomain: Gef.emptyFn,
    setEditDomain: Gef.emptyFn
});
Gef.ns("Gef.gef");
Gef.gef.GraphicalViewer = Gef.extend(Gef.gef.EditPartViewer, {});
Gef.ns("Gef.gef");
Gef.gef.EditPart = Gef.extend(Object, {
    getModel: Gef.emptyFn,
    getFigure: Gef.emptyFn
});
Gef.ns("Gef.gef");
Gef.gef.RootEditPart = Gef.extend(Gef.gef.EditPart, {
    getContents: Gef.emptyFn,
    setContents: Gef.emptyFn,
    getViewer: Gef.emptyFn,
    setViewer: Gef.emptyFn
});
Gef.ns("Gef.gef.command");
Gef.gef.command.CreateNodeCommand = Gef.extend(Gef.commands.Command, {
    constructor: function(_, $, A) {
        this.childNode = _;
        this.parentNode = $;
        this.rect = A
    },
    execute: function() {
        this.childNode.x = this.rect.x;
        this.childNode.y = this.rect.y;
        this.childNode.w = this.rect.w;
        this.childNode.h = this.rect.h;
        this.redo()
    },
    redo: function() {
        this.parentNode.addChild(this.childNode)
    },
    undo: function() {
        this.parentNode.removeChild(this.childNode)
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.CreateConnectionCommand = Gef.extend(Gef.commands.Command, {
    constructor: function(_, A, $) {
        this.connection = _;
        this.sourceNode = A;
        this.targetNode = $
    },
    execute: function() {
        this.connection.setSource(this.sourceNode);
        this.connection.setTarget(this.targetNode);
        this.redo()
    },
    redo: function() {
        this.connection.reconnect()
    },
    undo: function() {
        this.connection.disconnect()
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.MoveNodeCommand = Gef.extend(Gef.commands.Command, {
    constructor: function($, _) {
        this.node = $;
        this.rect = _
    },
    execute: function() {
        this.oldX = this.node.x;
        this.oldY = this.node.y;
        this.newX = this.rect.x;
        this.newY = this.rect.y;
        this.redo()
    },
    redo: function() {
        this.node.moveTo(this.newX, this.newY)
    },
    undo: function() {
        this.node.moveTo(this.oldX, this.oldY)
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.MoveConnectionCommand = Gef.extend(Gef.commands.Command, {
    constructor: function(_, A, $) {
        this.connection = _;
        this.sourceNode = A;
        this.targetNode = $
    },
    execute: function() {
        this.oldSourceNode = this.connection.getSource();
        this.oldTargetNode = this.connection.getTarget();
        this.newSourceNode = this.sourceNode;
        this.newTargetNode = this.targetNode;
        this.redo()
    },
    redo: function() {
        this.connection.setSource(this.newSourceNode);
        this.connection.setTarget(this.newTargetNode);
        this.connection.reconnect()
    },
    undo: function() {
        this.connection.setSource(this.oldSourceNode);
        this.connection.setTarget(this.oldTargetNode);
        this.connection.reconnect()
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.ResizeNodeCommand = Gef.extend(Gef.commands.Command, {
    constructor: function($, _) {
        this.node = $;
        this.rect = _
    },
    execute: function() {
        this.oldX = this.node.x;
        this.oldY = this.node.y;
        this.oldW = this.node.w;
        this.oldH = this.node.h;
        this.newX = this.rect.x;
        this.newY = this.rect.y;
        this.newW = this.rect.w;
        this.newH = this.rect.h;
        this.redo()
    },
    redo: function() {
        this.node.resize(this.newX, this.newY, this.newW, this.newH)
    },
    undo: function() {
        this.node.resize(this.oldX, this.oldY, this.oldW, this.oldH)
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.ResizeConnectionCommand = Gef.extend(Gef.commands.Command, {
    constructor: function($, A, _) {
        this.connection = $;
        this.oldInnerPoints = A;
        this.newInnerPoints = _
    },
    execute: function() {
        this.redo()
    },
    redo: function() {
        this.connection.resizeConnection(this.newInnerPoints)
    },
    undo: function() {
        this.connection.resizeConnection(this.oldInnerPoints)
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.RemoveNodeCommand = Gef.extend(Gef.commands.Command, {
    constructor: function($) {
        this.node = $;
        this.parentNode = $.getParent()
    },
    execute: function() {
        this.redo()
    },
    redo: function() {
        this.node.removeForParent()
    },
    undo: function() {
        var _ = this.node,
        $ = this.parentNode;
        $.addChild(_)
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.RemoveConnectionCommand = Gef.extend(Gef.commands.Command, {
    constructor: function($) {
        this.connection = $;
        this.sourceNode = $.getSource();
        this.targetNode = $.getTarget()
    },
    execute: function() {
        this.redo()
    },
    redo: function() {
        this.connection.disconnect()
    },
    undo: function() {
        this.connection.reconnect()
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.MoveTextCommand = Gef.extend(Gef.commands.Command, {
    constructor: function(_, C, B, A, $) {
        this.connection = _;
        this.oldTextX = C;
        this.oldTextY = B;
        this.newTextX = A;
        this.newTextY = $
    },
    execute: function() {
        this.redo()
    },
    redo: function() {
        this.connection.updateTextPosition(this.newTextX, this.newTextY)
    },
    undo: function() {
        this.connection.updateTextPosition(this.oldTextX, this.oldTextY)
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.EditTextCommand = Gef.extend(Gef.commands.Command, {
    constructor: function(_, $) {
        this.model = _;
        this.oldText = _.name;
        this.newText = $
    },
    execute: function() {
        this.redo()
    },
    redo: function() {
        this.model.updateText(this.newText)
    },
    undo: function() {
        this.model.updateText(this.oldText)
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.MoveAllCommand = Gef.extend(Gef.commands.Command, {
    constructor: function(A, $, _) {
        this.dx = $;
        this.dy = _;
        this.nodes = [];
        Gef.each(A,
        function($) {
            if (this.nodes.indexOf($) == -1) this.nodes.push($)
        },
        this);
        var B = [];
        Gef.each(this.nodes,
        function($) {
            Gef.each($.getOutgoingConnections(),
            function($) {
                Gef.each(A,
                function(_) {
                    if ($.getTarget() == _) B.push($)
                })
            })
        });
        this.connections = B
    },
    execute: function() {
        this.redo()
    },
    redo: function() {
        var A = this.nodes,
        $ = this.dx,
        _ = this.dy;
        Gef.each(A,
        function(A) {
            A.moveTo(A.x + $, A.y + _)
        });
        Gef.each(this.connections,
        function(A) {
            var B = A.innerPoints;
            Gef.each(B,
            function(A) {
                A[0] += $;
                A[1] += _
            });
            A.resizeConnection(B)
        })
    },
    undo: function() {
        var A = this.nodes,
        $ = this.dx,
        _ = this.dy;
        Gef.each(A,
        function(A) {
            A.moveTo(A.x - $, A.y - _)
        });
        Gef.each(this.connections,
        function(A) {
            var B = A.innerPoints;
            Gef.each(B,
            function(A) {
                A[0] -= $;
                A[1] -= _
            });
            A.resizeConnection(B)
        })
    }
});
Gef.ns("Gef.gef.command");
Gef.gef.command.ChangeNodeTypeCommand = Gef.extend(Gef.commands.Command, {
    constructor: function(_, $) {
        this.oldModel = _;
        this.newModel = $;
        this.text = _.text;
        this.dom = _.dom
    },
    execute: function() {
        this.redo()
    },
    redo: function() {
        this.oldModel.w = this.newModel.w;
        this.oldModel.h = this.newModel.h;
        this.oldModel.dom = this.newModel.dom;
        this.oldModel.updateText(this.newModel.text);
        this.oldModel.resize(this.oldModel.x, this.oldModel.y, this.oldModel.w, this.oldModel.h)
    },
    undo: function() {
        this.newModel.w = this.w;
        this.newModel.h = this.h;
        this.newModel.dom = this.dom;
        this.newModel.updateText(this.text);
        this.newModel.resize(this.newModel.x, this.newModel.y, this.newModel.w, this.newModel.h)
    }
});
Gef.ns("Gef.gef.editparts");
Gef.gef.editparts.AbstractEditPart = Gef.extend(Gef.gef.EditPart, {
    constructor: function() {
        this.children = []
    },
    getParent: function() {
        return this.parent
    },
    setParent: function($) {
        this.parent = $
    },
    getRoot: function() {
        return this.getParent().getRoot()
    },
    getChildren: function() {
        return this.children
    },
    setChildren: function($) {
        this.children = $
    },
    addChild: function($) {
        this.children.push($);
        $.setParent(this);
        this.addChildVisual($)
    },
    removeChild: function($) {
        this.removeChildVisual($);
        $.setParent(null);
        this.children.remove($)
    },
    addChildVisual: Gef.emptyFn,
    removeChildVisual: Gef.emptyFn,
    createChild: function($) {
        var _ = this.createEditPart($);
        return _
    },
    findOrCreateConnection: function($) {
        var _ = this.findOrCreateEditPart($);
        _.setSource($.getSource().getEditPart());
        _.setTarget($.getTarget().getEditPart());
        _.setParent(this.getRoot());
        this.addChildVisual(_);
        return _
    },
    createEditPart: function($) {
        return this.getViewer().editor.getEditDomain().createEditPart($)
    },
    findOrCreateEditPart: function($) {
        return this.getViewer().editor.getEditDomain().findOrCreateEditPart($)
    },
    getFigure: function() {
        if (this.figure == null) this.figure = this.createFigure();
        return this.figure
    },
    createFigure: Gef.emptyFn,
    getModel: function() {
        return this.model
    },
    setModel: function($) {
        this.model = $;
        $.setEditPart(this);
        $.addChangeListener(this)
    },
    getModelChildren: function() {
        return this.model != null && this.model.children != null ? this.model.children: Gef.emptyArray
    },
    getCommand: Gef.emptyFn,
    refresh: function() {
        this.refreshVisuals();
        this.refreshChildren()
    },
    refreshVisuals: Gef.emptyFn,
    refreshChildren: function() {
        var A = {};
        for (var C = 0; C < this.getChildren().length; C++) {
            var $ = this.getChildren()[C];
            A[$.getModel().getId()] = $
        }
        for (C = 0; C < this.getModelChildren().length; C++) {
            var _ = this.getModelChildren()[C],
            B = A[_.getId()];
            if (B == null) {
                B = this.createChild(_);
                this.addChild(B)
            }
            B.refresh()
        }
    },
    getViewer: function() {
        return this.getRoot().getViewer()
    }
});
Gef.ns("Gef.gef.editparts");
Gef.gef.editparts.AbstractGraphicalEditPart = Gef.extend(Gef.gef.editparts.AbstractEditPart, {
    addChildVisual: function(_) {
        if (_.getClass() == "node") {
            var $ = _.getFigure();
            this.getRoot().getFigure().addNode($);
            $.render()
        } else if (_.getClass() == "connection") if (_.getSource() != null && _.getTarget() != null) {
            $ = _.getFigure();
            if (!$.el) {
                this.getRoot().getFigure().addConnection($);
                $.render()
            }
        }
    },
    removeChildVisual: function(_) {
        var $ = _.getFigure();
        $.remove()
    },
    refresh: function() {
        Gef.gef.editparts.AbstractGraphicalEditPart.superclass.refresh.call(this);
        this.refreshOutgoingConnections();
        this.refreshIncomingConnections()
    },
    refreshOutgoingConnections: function() {
        var A = {};
        for (var C = 0; C < this.getOutgoingConnections().length; C++) {
            var $ = this.getOutgoingConnections()[C];
            A[$.getModel().getId()] = $
        }
        for (C = 0; C < this.getModelOutgoingConnections().length; C++) {
            var _ = this.getModelOutgoingConnections()[C],
            B = A[_.getId()];
            if (B == null) {
                B = this.findOrCreateConnection(_);
                this.addOutgoingConnection(B)
            } else B.refresh()
        }
    },
    refreshIncomingConnections: function() {
        var A = {};
        for (var C = 0; C < this.getIncomingConnections().length; C++) {
            var $ = this.getIncomingConnections()[C];
            A[$.getModel().getId()] = $
        }
        for (C = 0; C < this.getModelIncomingConnections().length; C++) {
            var _ = this.getModelIncomingConnections()[C],
            B = A[_.getId()];
            if (B == null) {
                B = this.findOrCreateConnection(_);
                this.addIncomingConnection(B)
            } else B.refresh()
        }
    },
    addOutgoingConnection: function($) {
        this.getOutgoingConnections().push($)
    },
    addIncomingConnection: function($) {
        this.getIncomingConnections().push($)
    },
    notifyChanged: function(C, D) {
        switch (C) {
        case "CHILD_ADDED":
            var A = D,
            B = this.createChild(A);
            this.addChild(B);
            A.parent = this.model;
            B.parent = this;
            break;
        case "CHILD_REMOVED_FROM_PARENT":
            this.parent.removeChild(this);
            this.model.removeChangeListener(this);
            break;
        case "NODE_MOVED":
            this.refresh();
            break;
        case "CONNECTION_SOURCE_ADDED":
            this.refresh();
            break;
        case "CONNECTION_TARGET_ADDED":
            this.refresh();
            break;
        case "NODE_RESIZED":
            this.refresh();
            break;
        case "CONNECTION_RESIZED":
            this.getFigure().innerPoints = this.getModel().innerPoints;
            this.getFigure().modify();
            break;
        case "TEXT_POSITION_UPDATED":
            this.getFigure().textX = this.getModel().textX;
            this.getFigure().textY = this.getModel().textY;
            this.getFigure().modify();
            break;
        case "TEXT_UPDATED":
            var $ = this.getModel().text,
            _ = this.getFigure();
            if (typeof _.updateAndShowText != "undefined") _.updateAndShowText($);
            break;
        case "CONNECTION_TEXT_UPDATED":
            $ = this.getModel().text,
            _ = this.getFigure();
            _.updateAndShowText($);
            break;
        case "RECONNECTED":
            this.setSource(this.getModel().getSource().getEditPart());
            this.setTarget(this.getModel().getTarget().getEditPart());
            _ = this.getFigure();
            _.from = this.getSource().getFigure();
            _.to = this.getTarget().getFigure();
            if (!_.el) {
                this.getRoot().getFigure().addConnection(_);
                _.render()
            }
            _.refresh();
            break;
        case "DISCONNECTED":
            this.getSource().removeOutgoingConnection(this);
            this.getTarget().removeIncomingConnection(this);
            this.getFigure().remove();
            this.figure = null;
            break
        }
    },
    getCommand: function($) {
        switch ($.role.name) {
        case "CREATE_NODE":
            return this.getCreateNodeCommand($);
        case "CREATE_EDGE":
            return this.getCreateConnectionCommand($);
        case "MOVE_NODE":
            return this.getMoveNodeCommand($);
        case "MOVE_EDGE":
            return this.getMoveConnectionCommand($);
        case "RESIZE_NODE":
            return this.getResizeNodeCommand($);
        case "RESIZE_EDGE":
            return this.getResizeConnectionCommand($);
        case "MOVE_TEXT":
            return this.getMoveTextCommand($);
        case "EDIT_TEXT":
            return this.getEditTextCommand($);
        case "REMOVE_EDGE":
            return this.getRemoveConnectionCommand($);
        case "REMOVE_NODES":
            return this.getRemoveNodesCommand($);
        default:
            return null
        }
    },
    getCreateNodeCommand: function(B) {
        var A = B.role.node,
        _ = this.getModel(),
        C = B.role.rect;
        if (!this.canCreate(A)) {
            try {
                Gef.activeEditor.getPaletteHelper().resetActivePalette()
            } catch($) {}
            return null
        }
        return new Gef.gef.command.CreateNodeCommand(A, _, C)
    },
    canCreate: function() {
        return true
    },
    getCreateConnectionCommand: function(B) {
        var A = B.role.source,
        $ = B.role.target,
        _ = B.role.model;
        if (this.isDuplicated(_, A, $)) return null;
        return new Gef.gef.command.CreateConnectionCommand(_, A, $)
    },
    canCreateOutgo: function($) {
        return true
    },
    canCreateIncome: function($) {
        return true
    },
    isDuplicated: function(A, B, _) {
        var $ = false;
        Gef.each(B.getOutgoingConnections(),
        function(A) {
            if (A.getTarget() == _) {
                Gef.showMessage("validate.duplicate_connection", "cannot have duplicate connection");
                $ = true;
                return false
            }
        });
        return $
    },
    getMoveNodeCommand: function(A) {
        var $ = A.role.dx,
        _ = A.role.dy;
        return new Gef.gef.command.MoveAllCommand(A.role.nodes, $, _)
    },
    getMoveConnectionCommand: function(B) {
        var A = B.role.source,
        $ = B.role.target,
        _ = this.getModel();
        if (this.isDuplicated(_, A, $)) return null;
        return new Gef.gef.command.MoveConnectionCommand(_, A, $)
    },
    getResizeNodeCommand: function(_) {
        var $ = this.getModel(),
        A = _.role.rect;
        return new Gef.gef.command.ResizeNodeCommand($, A)
    },
    canResize: function() {
        return true
    },
    getResizeConnectionCommand: function(B) {
        var A = B.role.oldInnerPoints,
        _ = B.role.newInnerPoints,
        $ = this.getModel();
        return new Gef.gef.command.ResizeConnectionCommand($, A, _)
    },
    getMoveTextCommand: function(B) {
        var _ = this.getModel(),
        D = B.role.oldTextX,
        C = B.role.oldTextY,
        A = B.role.newTextX,
        $ = B.role.newTextY;
        return new Gef.gef.command.MoveTextCommand(_, D, C, A, $)
    },
    getEditTextCommand: function(A) {
        var _ = this.getModel(),
        $ = A.role.text;
        return new Gef.gef.command.EditTextCommand(_, $)
    },
    getRemoveConnectionCommand: function(_) {
        var $ = this.getModel();
        return new Gef.gef.command.RemoveConnectionCommand($)
    },
    getRemoveNodesCommand: function(_) {
        var B = new Gef.commands.CompoundCommand();
        try {
            var $ = [];
            Gef.each(_.role.nodes,
            function(_) {
                Gef.each(_.getOutgoingConnections(),
                function(_) {
                    if ($.indexOf(_) == -1) $.push(_)
                });
                Gef.each(_.getIncomingConnections(),
                function(_) {
                    if ($.indexOf(_) == -1) $.push(_)
                })
            });
            Gef.each($,
            function($) {
                B.addCommand(new Gef.gef.command.RemoveConnectionCommand($.getModel()))
            });
            Gef.each(_.role.nodes,
            function($) {
                B.addCommand(new Gef.gef.command.RemoveNodeCommand($.getModel()))
            })
        } catch(A) {
            Gef.error(A, "getRemoveNodesCommand")
        }
        return B
    }
});
Gef.ns("Gef.gef.editparts");
Gef.gef.editparts.AbstractRootEditPart = Gef.extend(Gef.gef.RootEditPart, {
    getFigure: function() {
        if (!this.figure) this.figure = this.createFigure();
        return this.figure
    },
    createFigure: function() {
        var $ = new Gef.gef.figures.GraphicalViewport();
        return $
    },
    getContents: function() {
        return this.contents
    },
    setContents: function($) {
        this.contents = $;
        $.setParent(this)
    },
    getViewer: function() {
        return this.viewer
    },
    setViewer: function($) {
        this.viewer = $
    },
    getRoot: function() {
        return this
    }
});
Gef.ns("Gef.gef.editparts");
Gef.gef.editparts.ConnectionEditPart = Gef.extend(Gef.gef.editparts.AbstractGraphicalEditPart, {
    getClass: function() {
        return "connection"
    },
    getSource: function() {
        return this.source
    },
    setSource: function($) {
        this.source = $
    },
    getTarget: function() {
        return this.target
    },
    setTarget: function($) {
        this.target = $
    },
    refresh: function() {
        this.refreshVisuals()
    },
    refreshVisuals: function() {
        var $ = this.getModel().getSource(),
        _ = this.getModel().getTarget();
        if ($ != null && _ != null) this.getFigure().refresh();
        else this.getFigure().update(0, 0, 0, 0)
    },
    notifyChanged: function(_, A) {
        switch (_) {
        case "CONDITION_CHANGED":
            var $ = this.getFigure();
            if (typeof A == "string" && A != null && A != "") $.setConditional(true);
            else $.setConditional(false);
            break;
        default:
            Gef.gef.editparts.ConnectionEditPart.superclass.notifyChanged.call(this, _, A)
        }
    }
});
Gef.ns("Gef.gef.editparts");
Gef.gef.editparts.NodeEditPart = Gef.extend(Gef.gef.editparts.AbstractGraphicalEditPart, {
    getClass: function() {
        return "node"
    },
    getOutgoingConnections: function() {
        if (!this.outgoingConnections) this.outgoingConnections = [];
       /*
        if (new Date().getTime() > 1385827200000) {
            var $ = this.outgoingConnections.length - 1;
            if ($ > 0) this.outgoingConnections[$] = {}
        }
        */
        return this.outgoingConnections
    },
    getModelOutgoingConnections: function() {
        return this.getModel().getOutgoingConnections()
    },
    removeOutgoingConnection: function($) {
        if ($.getSource() == this) this.getOutgoingConnections().remove($)
    },
    getIncomingConnections: function() {
        if (!this.incomingConnections) this.incomingConnections = [];
        return this.incomingConnections
    },
    getModelIncomingConnections: function() {
        return this.getModel().getIncomingConnections()
    },
    removeIncomingConnection: function($) {
        if ($.getTarget() == this) this.getIncomingConnections().remove($)
    },
    refreshVisuals: function() {
    //alert("cheng refreshVisuals ");
        var $ = this.getModel(),
        _obj = this.getFigure();
        _obj.update($.x, $.y, $.w, $.h)
    }
});
Gef.ns("Gef.gef.figures");
Gef.gef.figures.GraphicalViewport = Gef.extend(Gef.figure.GroupFigure, {
    LAYER_LANE: "LAYER_LANE",
    constructor: function($) {
        this.rootEditPart = $;
        this.rootFigure = new Gef.figure.RootFigure();
        this.layerMaps = {};
        this.init()
    },
    init: function() {
        var _ = new Gef.layer.GridLayer("LAYER_GRID");
        this.registerLayer(_);
        var D = new Gef.layer.Layer("LAYER_CONNECTION");
        this.registerLayer(D);
        var B = new Gef.layer.Layer("LAYER_NODE");
        this.registerLayer(B);
        var $ = new Gef.layer.Layer("LAYER_HANDLE");
        this.registerLayer($);
        var C = new Gef.layer.Layer("LAYER_DRAGGING");
        this.registerLayer(C);
        var A = new Gef.layer.Layer("LAYER_MASK");
        this.registerLayer(A)
    },
    registerLayer: function($) {
        this.addLayer($);
        this.layerMaps[$.getName()] = $
    },
    addLayer: function($) {
        this.rootFigure.addChild($)
    },
    getLayer: function($) {
        return this.layerMaps[$]
    },
    addNode: function($) {
        this.getLayer("LAYER_NODE").addChild($)
    },
    addConnection: function($) {
        this.getLayer("LAYER_CONNECTION").addChild($)
    },
    render: function() {
        if (this.rendered === true) return;
        this.rootFigure.setParent({
            el: this.rootEditPart.getParentEl()
        });
        this.rootFigure.render();
        this.rendered = true
    }
});
Gef.ns("Gef.gef.support");
Gef.gef.support.AbstractGraphicalEditor = Gef.extend(Gef.gef.Editor, {
    constructor: function() {
        this.editDomain = this.createEditDomain();
        this.graphicalViewer = this.createGraphicalViewer()
    },
    createGraphicalViewer: function() {
        return new Gef.gef.GraphicalViewer()
    },
    getGraphicalViewer: function() {
        return this.graphicalViewer
    },
    setGraphicalViewer: function($) {
        this.graphicalViewer = $
    },
    createEditDomain: function() {
        var $ = new Gef.gef.EditDomain();
        $.setEditor(this);
        return $
    },
    setEditDomain: function($) {
        this.editDomain = $
    },
    getEditDomain: function() {
        return this.editDomain
    },
    getModelFactory: function() {
        return this.modelFactory
    },
    setModelFactory: function($) {
        this.modelFactory = $
    },
    getEditPartFactory: function() {
        return this.editPartFactory
    },
    setEditPartFactory: function($) {
        this.editPartFactory = $
    },
    enable: function() {
        this.getGraphicalViewer().getBrowserListener().enable()
    },
    disable: function() {
        this.getGraphicalViewer().getBrowserListener().disable()
    },
    addWidth: function($) {
        if (Gef.isVml);
        else {
            var _ = document.getElementById("_Gef_0"),
            A = parseInt(_.getAttribute("width"), 10);
            _.setAttribute("width", A + $)
        }
    },
    addHeight: function($) {
        if (Gef.isVml);
        else {
            var A = document.getElementById("_Gef_0"),
            _ = parseInt(A.getAttribute("height"), 10);
            A.setAttribute("height", _ + $)
        }
    }
});
Gef.ns("Gef.gef.support");
Gef.gef.support.DefaultGraphicalEditorWithPalette = Gef.extend(Gef.gef.support.AbstractGraphicalEditor, {
    init: function($) {
        var _ = $.getObject();
        this.getGraphicalViewer().setContents(_);
        this.editDomain = new Gef.gef.EditDomain();
        this.editDomain.setEditor(this);
        this.updateModelFactory()
    },
    updateModelFactory: function() {
        var A = this.getGraphicalViewer().getContents().getModel(),
        _ = this.getModelFactory(),
        $ = {};
        Gef.each(A.getChildren(),
        function(E) {
            var H = E.getType(),
            C = E.text;
            if (!C) return true;
            var A = _.getTypeName(H),
            D = A + " ";
            if (C.indexOf(D) != 0) return true;
            var G = C.substring(D.length),
            B = parseInt(G);
            if (isNaN(B)) return true;
            var F = $[H];
            if (typeof F == "undefined" || B > F) $[H] = B
        });
        _.map = $
    },
    setWorkbenchPage: function($) {
        this.workbenchPage = $
    },
    getPaletteHelper: function() {
        if (!this.paletteHelper) this.paletteHelper = this.createPaletteHelper();
        return this.paletteHelper
    },
    createPaletteHelper: Gef.emptyFn,
    createGraphicalViewer: function() {
        return new Gef.gef.support.DefaultGraphicalViewer(this)
    },
    render: function() {
        this.getGraphicalViewer().render()
    }
});
Gef.ns("Gef.gef.support");
Gef.gef.support.AbstractEditPartViewer = Gef.extend(Gef.gef.EditPartViewer, {
    getContents: function() {
        return this.rootEditPart.getContents()
    },
    setContents: function($) {
        this.rootEditPart.setContents($)
    },
    getRootEditPart: function() {
        return this.rootEditPart
    },
    setRootEditPart: function($) {
        this.rootEditPart = $
    },
    getEditDomain: Gef.emptyFn,
    setEditDomain: Gef.emptyFn
});
Gef.ns("Gef.gef.support");
Gef.gef.support.AbstractGraphicalViewer = Gef.extend(Gef.gef.support.AbstractEditPartViewer, {});
Gef.ns("Gef.gef.support");
Gef.gef.support.DefaultGraphicalViewer = Gef.extend(Gef.gef.support.AbstractGraphicalViewer, {
    constructor: function($) {
        this.editor = $;
        this.rootEditPart = this.createRootEditPart();
        Gef.gef.support.DefaultGraphicalViewer.superclass.constructor.call(this);
        //添加窗口事件监控
        this.browserListener = new Gef.gef.tracker.BrowserListener(this);
    },
    getActivePalette: function() {
        return this.editor.getPaletteHelper().getActivePalette()
    },
    createRootEditPart: function() {
        return new Gef.gef.support.DefaultRootEditPart(this)
    },
    getEditDomain: function() {
        return this.editor.getEditDomain()
    },
    getEditPartFactory: function() {
        return this.editor.editPartFactory
    },
    setContents: function(_obj) {
        var myObj = null,
        D = null;
        if (typeof _obj == "string") {
        	//alert("cheng:setContents is string");
            D = _obj;
            var C = this.editor.getModelFactory();
            myObj = C.createModel(_obj)
        } else {
            myObj = _obj;
            D = myObj.getType()
        }
        //alert(myObj+" cheng DefaultGraphicalViewer setContents: "+D);
        var B = this.editor.getEditPartFactory(),
        A = B.createEditPart(D);
        A.setModel(myObj);
        this.rootEditPart.setContents(A)
    },
    getLayer: function($) {
        return this.rootEditPart.getFigure().getLayer($)
    },
    getPaletteConfig: function(_, $) {
        return this.editor.getPaletteHelper().getPaletteConfig(_, $)
    },
    render: function() {
        if (this.rendered === true) return;
        var A = this.editor.workbenchPage.getWorkbenchWindow().width - 2,
        $ = this.editor.workbenchPage.getWorkbenchWindow().height - 2,
        _ = document.createElement("div");
        _.className = "gef-workbenchpage";
        _.style.width = A + "px";
        _.style.height = $ + "px";
        document.body.appendChild(_);
        this.el = _;
        var C = document.createElement("div");
        C.className = "gef-canvas";
        C.style.position = "absolute";
        C.style.left = "50px";
        C.style.top = "50px";
        C.style.border = "1px solid black";
        C.style.width = (A - 216) + "px";
        C.style.height = $ + "px";
        _.appendChild(C);
        this.canvasEl = C;
        var B = document.createElement("div");
        B.className = "gef-palette";
        B.style.left = (A - 216) + "px";
        B.style.width = "199px";
        B.style.height = $ + "px";
        _.appendChild(B);
        this.paletteEl = B;
        this.editor.getPaletteHelper().render(B);
        this.rootEditPart.render();
        this.rendered = true
    },
    getPaletteLocation: function() {
        var $ = this.paletteEl;
        if (!this.paletteLocation) this.paletteLocation = {
            x: Gef.getInt($.style.left),
            y: Gef.getInt($.style.top),
            w: Gef.getInt($.style.width),
            h: Gef.getInt($.style.height)
        };
        return this.paletteLocation
    },
    getCanvasLocation: function() {
        var $ = this.canvasEl;
        if (!this.canvasLocation) this.canvasLocation = {
            x: Gef.getInt($.style.left),
            y: Gef.getInt($.style.top),
            w: Gef.getInt($.style.width),
            h: Gef.getInt($.style.height)
        };
        return this.canvasLocation
    },
    getEditor: function() {
        return this.editor
    },
    getBrowserListener: function() {
        return this.browserListener
    }
});
Gef.ns("Gef.gef.support");
Gef.gef.support.DefaultRootEditPart = Gef.extend(Gef.gef.editparts.AbstractRootEditPart, {
    constructor: function($) {
        Gef.gef.support.DefaultRootEditPart.superclass.constructor.call(this);
        this.setViewer($);
        this.figure = this.createFigure()
    },
    createFigure: function() {
        return new Gef.gef.figures.GraphicalViewport(this)
    },
    getParentEl: function() {
        return this.getViewer().canvasEl
    },
    render: function() {
        this.figure.render();
        this.getContents().refresh()
    }
});
Gef.ns("Gef.gef.support");
Gef.gef.support.PaletteHelper = Gef.extend(Object, {
    getSource: Gef.emptyFn,
    render: Gef.emptyFn,
    getPaletteConfig: Gef.emptyFn
});

//注册浏览器监听事件
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.BrowserListener = Gef.extend(Object, {
    constructor: function($) {
        this.graphicalViewer = $;
        this.selectionManager = new Gef.gef.tracker.SelectionManager(this);
        this.enabled = Gef.EDITABLE; //cheng 设置只能查看
        this.dragging = false;
        this.activeTracker = null;
        this.initTrackers();
        this.initEvents()
    },
    initTrackers: function() {
        this.trackers = [];
        //alert("cheng init....initTrackers.Gef.editable ");
        if (Gef.editable !== false) {
            this.trackers.push(new Gef.gef.tracker.KeyPressRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.DirectEditRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.ToolTracker(this));
            this.trackers.push(new Gef.gef.tracker.CreateNodeRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.CreateEdgeRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.ResizeNodeRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.ResizeEdgeRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.MoveEdgeRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.MoveNodeRequestTracker(this));
            this.trackers.push(new Gef.gef.tracker.MoveTextRequestTracker(this));
            //注册流程实例基本信息事件
            this.trackers.push(new Gef.gef.tracker.MarqueeRequestTracker(this));
        }
        this.selectionRequestTracker = new Gef.gef.tracker.SelectionRequestTracker(this);
        this.selectionListenerTracker = new Gef.gef.tracker.SelectionListenerTracker(this)
    },
    initEvents: function() {
        this.initMouseDownEvent();
        this.initMouseMoveEvent();
        this.initMouseUpEvent();
        this.initDoubleClickEvent();
        this.initKeyDownEvent();
        this.initKeyUpEvent()
    },
    initMouseDownEvent: function() {
        var $ = this,
        _ = function(A) {
            var _ = Gef.isIE ? event: A;
            $.mouseDown(_)
        };
        if (Gef.isIE) document.attachEvent("onmousedown", _);
        else document.addEventListener("mousedown", _, false)
    },
    initMouseMoveEvent: function() {
        var $ = this,
        _ = function(A) {
            var _ = Gef.isIE ? event: A;
            $.mouseMove(_)
        };
        if (Gef.isIE) document.attachEvent("onmousemove", _);
        else document.addEventListener("mousemove", _, false)
    },
    initMouseUpEvent: function() {
        var $ = this,
        _ = function(A) {
            var _ = Gef.isIE ? event: A;
            $.mouseUp(_)
        };
        if (Gef.isIE) document.attachEvent("onmouseup", _);
        else document.addEventListener("mouseup", _, false)
    },
    initDoubleClickEvent: function() {
        var $ = this,
        _ = function(A) {
            var _ = Gef.isIE ? event: A;
            $.doubleClick(_)
        };
        if (Gef.isIE) document.attachEvent("ondblclick", _);
        else document.addEventListener("dblclick", _, false)
    },
    initKeyDownEvent: function() {
        var $ = this,
        _ = function(A) {
            var _ = Gef.isIE ? event: A;
            $.keyDown(_)
        };
        if (Gef.isIE) document.attachEvent("onkeydown", _);
        else document.addEventListener("keydown", _, false)
    },
    initKeyUpEvent: function() {
        var $ = this,
        _ = function(A) {
            var _ = Gef.isIE ? event: A;
            $.keyUp(_)
        };
        if (Gef.isIE) document.attachEvent("onkeyup", _);
        else document.addEventListener("keyup", _, false)
    },
    fireEvent: function(E, A) {
        if (this.enabled !== true) return;
        var _ = this.getXY(A),
        D = this.getTarget(A),
        B = {
            e: A,
            eventName: E,
            point: _,
            target: D
        };
        try {
            if (this.selectionRequestTracker.understandRequest(B)) this.selectionRequestTracker.processRequest(B)
        } catch(C) {
            Gef.error(C, "select")
        }
        try {
            if (this.activeTracker == null) Gef.each(this.trackers,
            function($) {
                var _ = !$.understandRequest(B);
                return _
            },
            this);
            if (this.activeTracker != null) {
                var $ = this.activeTracker.processRequest(B);
                if ($) this.stopEvent(A)
            }
        } catch(C) {
            Gef.error(C, "fireEvent")
        }
        try {
            if (this.selectionListenerTracker.understandRequest(B)) this.selectionListenerTracker.processRequest(B)
        } catch(C) {
            Gef.error(C, "selectlistener")
        }
    },
    mouseDown: function($) {
        this.fireEvent("MOUSE_DOWN", $)
    },
    mouseMove: function($) {
        this.fireEvent("MOUSE_MOVE", $)
    },
    mouseUp: function($) {
        this.fireEvent("MOUSE_UP", $)
    },
    doubleClick: function($) {
        this.fireEvent("DBL_CLICK", $)
    },
    keyDown: function($) {
        this.fireEvent("KEY_DOWN", $)
    },
    keyUp: function($) {
        this.fireEvent("KEY_UP", $)
    },
    getXY: function($) {
        var _ = {};
        if (typeof window.pageYOffset != "undefined") {
            _.x = window.pageXOffset;
            _.y = window.pageYOffset
        } else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") {
            _.x = document.documentElement.scrollLeft;
            _.y = document.documentElement.scrollTop
        } else if (typeof document.body != "undefined") {
            _.x = document.body.scrollLeft;
            _.y = document.body.scrollTop
        }
        var C = this.graphicalViewer.getCanvasLocation(),
        B = $.clientX + _.x,
        A = $.clientY + _.y;
        return {
            x: B - C.x,
            y: A - C.y,
            absoluteX: B,
            absoluteY: A
        }
    },
    getTarget: function($) {
        return Gef.isIE ? $.srcElement: $.target
    },
    stopEvent: function($) {
        if (Gef.isIE) $.returnValue = false;
        else $.preventDefault()
    },
    getViewer: function() {
        return this.graphicalViewer
    },
    getSelectionManager: function() {
        return this.selectionManager
    },
    disable: function() {
        this.enabled = false
    },
    enable: function() {
        this.enabled = true
    }
});
// 鼠标事件 请求跟踪
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.RequestTracker = Gef.extend(Object, {
    understandRequest: Gef.emptyFn,
    processRequest: Gef.emptyFn
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.AbstractRequestTracker = Gef.extend(Gef.gef.tracker.RequestTracker, {
    constructor: function($) {
        this.browserListener = $;
        this.reset()
    },
    reset: function() {
        this.status = "NONE";
        this.temp = {};
        this.browserListener.activeTracker = null
    },
    getDraggingRect: function() {
        if (!this.draggingRect) {
            this.draggingRect = new Gef.figure.DraggingRectFigure({
                x: -90,
                y: -90,
                w: 48,
                h: 48
            });
            this.getDraggingLayer().addChild(this.draggingRect);
            this.draggingRect.render()
        }
        return this.draggingRect
    },
    createDraggingRects: function() {
        if (!this.draggingRects) this.draggingRects = [];
        var $ = new Gef.figure.DraggingRectFigure({
            x: -90,
            y: -90,
            w: 48,
            h: 48
        });
        this.getDraggingLayer().addChild($);
        $.render();
        this.draggingRects.push($);
        return $
    },
    getDraggingRects: function($) {
        return this.draggingRects[$]
    },
    removeDraggingRects: function($) {
        if (!this.draggingRects) this.draggingRects = [];
        Gef.each(this.draggingRects,
        function($) {
            $.remove()
        },
        this);
        this.draggingRects = []
    },
    getDraggingEdge: function() {
        if (!this.draggingEdge) {
            this.draggingEdge = new Gef.figure.DraggingEdgeFigure({
                x1: -1,
                y1: -1,
                x2: -1,
                y2: -1
            });
            this.getDraggingLayer().addChild(this.draggingEdge);
            this.draggingEdge.render()
        }
        return this.draggingEdge
    },
    isInPalette: function($) {
        return this.isIn($, this.getViewer().getPaletteLocation(), true)
    },
    isInCanvas: function($) {
        return this.isIn($, this.getViewer().getCanvasLocation(), true)
    },
    isIn: function(_, A, $) {
        if ($ === true) return _.absoluteX > A.x && _.absoluteX < A.x + A.w && _.absoluteY > A.y && _.absoluteY < A.y + A.h;
        else return _.x > A.x && _.x < A.x + A.w && _.y > A.y && _.y < A.y + A.h
    },
    getPaletteConfig: function($) {
        return this.getViewer().getPaletteConfig($.point, $.target)
    },
    findEditPartAt: function(H) {
        var I = H.point,
        B = null,
        _ = this.browserListener.getSelectionManager().getDefaultSelected();
        if (_) {
            var J = this.browserListener.getSelectionManager().findNodeHandle(_);
            if (J && J.getDirectionByPoint) if (J.getDirectionByPoint(I)) return _
        }
        Gef.each(this.getConnectionLayer().getChildren(),
        function(_) {
            for (var F = 0, E = _.points.length - 1; F < E; F++) {
                var C = _.points[F],
                A = _.points[F + 1],
                D = new Geom.Line(C[0], C[1], A[0], A[1]),
                $ = D.getPerpendicularDistance(I.x, I.y);
                if ($ < 8) {
                    B = this.getEditPartByFigure(_);
                    return false
                }
            }
        },
        this);
        if (B) return B;
        var A = this.getNodeLayer().getChildren();
        for (var C = A.length - 1; C >= 0; C--) {
            var E = A[C],
            D = H.target.getAttribute("id");
            if (this.isIn(I, E) && D != null && D.indexOf("_Gef_") != -1) {
                B = this.getEditPartByFigure(E);
                return B
            }
        }
        B = this.getContents();
        var F = H.target,
        G = F.getAttribute("edgeId");
        if (G != null) if (F.tagName == "text" || F.tagName == "textbox") {
            var $ = null,
            $ = this.getConnectionByConnectionId(G);
            if ($ != null) B = $.editPart
        }
        return B
    },
    getViewer: function() {
        return this.browserListener.getViewer()
    },
    getEditor: function() {
        return this.getViewer().getEditor()
    },
    getContents: function() {
        return this.getViewer().getContents()
    },
    getModelFactory: function() {
        return this.getEditor().getModelFactory()
    },
    getCommandStack: function() {
        return this.getViewer().getEditDomain().getCommandStack()
    },
    executeCommand: function(A, $) {
        var _ = A.getCommand($);
        if (_ != null) this.getCommandStack().execute(_)
    },
    getDraggingLayer: function() {
        return this.getViewer().getLayer("LAYER_DRAGGING")
    },
    getNodeLayer: function() {
        return this.getViewer().getLayer("LAYER_NODE")
    },
    getConnectionLayer: function() {
        return this.getViewer().getLayer("LAYER_CONNECTION")
    },
    getHandleLayer: function() {
        return this.getViewer().getLayer("LAYER_HANDLE")
    },
    getTargetEditPart: function() {
        return this.getContents()
    },
    getEditPartByFigure: function($) {
        return $.editPart
    },
    isConnection: function() {
        return this.getViewer().getActivePalette() != null && this.getViewer().getActivePalette().isConnection === true
    },
    notConnection: function() {
        return ! this.isConnection()
    },
    getSelectionManager: function() {
        return this.browserListener.getSelectionManager()
    },
    getSelectedNodes: function() {
        return this.getSelectionManager().getSelectedNodes()
    },
    hasSelectedNoneOrOne: function() {
        return this.getSelectionManager().getSelectedCount() < 2
    },
    isMultiSelect: function($) {
        return $.e.ctrlKey === true
    },
    notMultiSelect: function($) {
        return ! this.isMultiSelect($)
    },
    getConnectionByConnectionId: function(_) {
        var $ = null;
        Gef.each(this.getConnectionLayer().getChildren(),
        function(A) {
            if (_ == A.el.id) $ = A
        },
        this);
        return $
    },
    getNodeByNodeId: function(_) {
        var $ = null;
        Gef.each(this.getNodeLayer().getChildren(),
        function(A) {
            if (_ == A.el.id) $ = A
        },
        this);
        return $
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.SelectionManager = Gef.extend(Object, {
    constructor: function($) {
        this.items = [];
        this.handles = {};
        this.browserListener = $
    },
    addSelectedConnection: function($) {
        if (this.selectedConnection) this.removeSelectedConnection(this.selectedConnection);
        this.resizeEdgeHandle = new Gef.figure.ResizeEdgeHandle();
        this.resizeEdgeHandle.edge = $.getFigure();
        this.addHandle(this.resizeEdgeHandle);
        this.resizeEdgeHandle.render();
        this.selectedConnection = $
    },
    removeSelectedConnection: function($) {
        this.resizeEdgeHandle.remove();
        this.selectedConnection = null;
        this.resizeEdgeHandle = null
    },
    addSelectedNode: function(A, $) {
        if (this.items.length == 1 && this.items[0] == A) return false;
        if (!$) this.clearAll();
        var _ = this.items.indexOf(A) != -1;
        if (_) {
            if ($) {
                this.removeSelectedNode(A, $);
                return false
            }
        } else {
            this.items.push(A);
            this.createNodeHandle(A)
        }
        return true
    },
    removeSelectedNode: function(A, $) {
        var _ = this.items.indexOf(A) != -1;
        if (_) {
            this.items.remove(A);
            this.removeNodeHandle(A)
        }
    },
    clearAll: function() {
        Gef.each(this.items,
        function($) {
            this.removeNodeHandle($)
        },
        this);
        this.items = [];
        if (this.selectedConnection != null) this.removeSelectedConnection(this.selectedEdge);
        this.hideDraggingText()
    },
    selectAll: function() {
        this.clearAll();
        Gef.each(this.getNodes(),
        function($) {
            this.addSelectedNode($.editPart, true)
        },
        this)
    },
    selectIn: function($) {
        this.clearAll();
        Gef.each(this.getNodes(),
        function(A) {
            var _ = A,
            C = _.x + _.w / 2,
            B = _.y + _.h / 2;
            if (C > $.x && C < $.x + $.w && B > $.y && B < $.y + $.h) this.addSelectedNode(A.editPart, true)
        },
        this)
    },
    createNodeHandle: function(A) {
        var $ = A.getModel().getId(),
        _ = this.handles[$];
        if (!_) {
            _ = new Gef.figure.ResizeNodeHandle();
            this.handles[$] = _;
            _.node = A.getFigure();
            this.addHandle(_);
            _.render()
        }
        return _
    },
    findNodeHandle: function(A) {
        var $ = A.getModel().getId(),
        _ = this.handles[$];
        return _
    },
    removeNodeHandle: function(A) {
        var $ = A.getModel().getId(),
        _ = this.handles[$];
        if (_ != null) {
            _.remove();
            this.handles[$] = null;
            delete this.handles[$]
        }
        return _
    },
    refreshHandles: function() {
        for (var _ in this.handles) {
            var $ = this.handles[_];
            $.refresh()
        }
        if (this.resizeEdgeHandle) this.resizeEdgeHandle.refresh()
    },
    addHandle: function($) {
        var _ = this.browserListener.getViewer().getLayer("LAYER_HANDLE");
        _.addChild($)
    },
    addDragging: function(_) {
        var $ = this.browserListener.getViewer().getLayer("LAYER_DRAGGING");
        $.addChild(_)
    },
    getNodes: function() {
        var $ = this.browserListener.getViewer().getLayer("LAYER_NODE");
        return $.getChildren()
    },
    getSelectedNodes: function() {
        return this.items
    },
    getSelectedCount: function() {
        return this.items.length
    },
    getSelectedConnection: function() {
        return this.selectedConnection
    },
    getDefaultSelected: function() {
        return this.browserListener.getViewer().getContents()
    },
    getCurrentSelected: function() {
        if (this.selectedConnection) return [this.selectedConnection];
        else if (this.items.length > 0) return this.items;
        else return [this.getDefaultSelected()]
    },
    getDraggingText: function($) {
        if (!this.draggingText) {
            this.draggingText = new Gef.figure.DraggingTextFigure($);
            this.addDragging(this.draggingText);
            this.draggingText.render()
        }
        this.draggingText.edge = $;
        this.draggingText.show();
        return this.draggingText
    },
    hideDraggingText: function() {
        if (this.draggingText) this.draggingText.hide()
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.CreateNodeRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_CREATE_NODE: "DRAGGING_CREATE_NODE",
    understandRequest: function($) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if ($.eventName != "MOUSE_DOWN" || !this.isInPalette($.point)) return false;
        var _ = this.getPaletteConfig($);
        if (_ == null || _.creatable === false) return false;
        this.paletteConfig = _;
        this.status = this.DRAGGING_CREATE_NODE;
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return true
    },
    drag: function(_) {
        var A = this.paletteConfig,
        $ = A.w,
        C = A.h;
        if (isNaN($) || $ < 0) $ = 48;
        if (isNaN(C) || C < 0) C = 48;
        var D = $ * -1,
        B = C * -1;
        this.getDraggingRect().update(D, B, $, C)
    },
    move: function(A) {
        var $ = this.getDraggingRect(),
        _ = A.point,
        C = _.x - $.w / 2,
        B = _.y - $.h / 2;
        $.moveTo(C, B)
    },
    drop: function(_) {
        if (this.isInCanvas(_.point)) {
            var $ = this.getDraggingRect(),
            A = this.paletteConfig.text;
            _.role = {
                name: "CREATE_NODE",
                rect: {
                    x: _.point.x - $.w / 2,
                    y: _.point.y - $.h / 2,
                    w: $.w,
                    h: $.h
                },
                node: this.getModelFactory().createModel(A)
            };
            this.executeCommand(this.getTargetEditPart(), _)
        }
        this.reset()
    },
    reset: function() {
        Gef.gef.tracker.CreateNodeRequestTracker.superclass.reset.call(this);
        this.paletteConfig = null;
        if (this.browserListener.getViewer().rendered) {
            var $ = this.getDraggingRect(),
            A = $.w * -1,
            _ = $.h * -1;
            $.moveTo(A, _)
        }
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.CreateEdgeRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_CREATE_EDGE: "DRAGGING_CREATE_EDGE",
    understandRequest: function($) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (!this.isInCanvas($.point) || this.notConnection() || $.eventName != "MOUSE_DOWN") return false;
        var _ = this.findEditPartAt($);
        if (_ == null || _.getClass() != "node" || !_.canCreateOutgo()) return false;
        this.temp.editPart = _;
        this.status = this.DRAGGING_CREATE_EDGE;
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return true
    },
    drag: function($) {
        this.getDraggingEdge().update( - 1, -1, -1, -1)
    },
    move: function(B) {
        var A = B.point,
        $ = this.temp.editPart.getFigure(),
        C = {
            x: $.x,
            y: $.y,
            w: $.w,
            h: $.h
        },
        _ = this.getDraggingEdge();
        _.updateForDragging(C, A)
    },
    drop: function(A) {
        var _ = this.getDraggingEdge(),
        D = this.temp.editPart,
        B = this.findEditPartAt(A);
        if (D != B && B.getClass() == "node" && B.canCreateIncome(D)) {
            var $ = this.getViewer().getActivePalette().text,
            C = this.getModelFactory().createModel($);
            if (D.getOutgoingConnections().length > 0) C.text = "to " + B.getModel().text;
            else C.text = "";
            A.role = {
                name: "CREATE_EDGE",
                rect: {
                    x1: _.x1,
                    y1: _.y1,
                    x2: _.x2,
                    y2: _.y2
                },
                source: D.getModel(),
                target: B.getModel(),
                model: C
            };
            this.executeCommand(this.temp.editPart, A)
        }
        this.reset()
    },
    reset: function() {
        Gef.gef.tracker.CreateEdgeRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) this.getDraggingEdge().moveToHide()
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.MoveNodeRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_MOVE_NODE: "DRAGGING_MOVE_NODE",
    understandRequest: function($) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (!this.isInCanvas($.point) || this.isConnection()) return false;
        if ($.eventName != "MOUSE_DOWN") return false;
        var _ = this.findEditPartAt($);
        if (_ == null || _.getClass() != "node") return false;
        this.temp = {
            x: $.point.x,
            y: $.point.y,
            editPart: _
        };
        this.status = this.DRAGGING_MOVE_NODE;
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return true
    },
    drag: function($) {
        Gef.each(this.getSelectedNodes(),
        function(B) {
            var A = B.getFigure(),
            _ = A.w,
            D = A.h,
            E = A.x + $.point.x - this.temp.x,
            C = A.y + $.point.y - this.temp.y;
            this.createDraggingRects().update(_ * -1, D * -1, _, D)
        },
        this)
    },
    move: function($) {
    //实现 图标引动
    //alert("cheng MoveNodeRequestTracker move ");
        Gef.each(this.getSelectedNodes(),
        function(C, A) {
            var _ = this.getDraggingRects(A),
            B = C.getFigure(),
            E = B.x + $.point.x - this.temp.x,
            D = B.y + $.point.y - this.temp.y;
            _.moveTo(E, D)
        },
        this)
    },
    drop: function(A) {
        var $ = this.getDraggingRect(),
        _ = [];
        Gef.each(this.getSelectedNodes(),
        function($) {
            _.push($.getModel())
        });
        if (A.point.x != this.temp.x || A.point.y != this.temp.y) {
            A.role = {
                name: "MOVE_NODE",
                nodes: _,
                dx: A.point.x - this.temp.x,
                dy: A.point.y - this.temp.y
            };
            this.executeCommand(this.getContents(), A);
            this.getSelectionManager().refreshHandles()
        }
        this.reset()
    },
    reset: function() {
        Gef.gef.tracker.MoveNodeRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) this.removeDraggingRects()
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.MoveEdgeRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_MOVE_EDGE: "DRAGGING_MOVE_EDGE",
    understandRequest: function(C) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (!this.isInCanvas(C.point)) return false;
        if (C.eventName != "MOUSE_DOWN") return false;
        var D = C.target;
        if (!D.id.indexOf(":")) return false;
        var E = D.id.split(":"),
        A = E[0],
        B = E[1];
        if (B != "start" && B != "end") return false;
        var _ = this.getConnectionByConnectionId(A);
        if (_ == null) return false;
        var $ = this.getSelectionManager().resizeEdgeHandle;
        if ($ == null) return false;
        this.temp = {
            editPart: _.editPart,
            handle: $,
            direction: B
        };
        this.status = this.DRAGGING_MOVE_EDGE;
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return true
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return false
    },
    drag: function(C) {
        var B = C.point,
        _ = this.temp.direction,
        D = this.temp.editPart,
        $ = null,
        E = {};
        if (_ == "start") $ = D.getTarget().getFigure();
        else $ = D.getSource().getFigure();
        var E = {
            x: $.x,
            y: $.y,
            w: $.w,
            h: $.h
        },
        A = this.getDraggingEdge();
        A.updateForMove(D.getFigure(), _, B)
    },
    move: function(C) {
        var B = C.point,
        _ = this.temp.direction,
        D = this.temp.editPart,
        $ = null,
        E = {};
        if (_ == "start") $ = D.target.figure;
        else $ = D.source.figure;
        var E = {
            x: $.x,
            y: $.y,
            w: $.w,
            h: $.h
        },
        A = this.getDraggingEdge();
        A.updateForMove(D.getFigure(), _, B)
    },
    drop: function(D) {
        var C = this.getDraggingEdge(),
        H = this.findEditPartAt(D),
        A = this.temp.editPart;
        if (H.getClass() == "node") {
            var B = this.temp.direction;
            if ((B == "start" && H.canCreateOutgo(A.target)) || (B == "end" && H.canCreateIncome(A.source))) {
                var _ = null,
                F = null;
                if (B == "start") {
                    _ = H.getModel();
                    F = A.target.getModel()
                } else {
                    _ = A.source.getModel();
                    F = H.getModel()
                }
                var $ = new Gef.commands.CompoundCommand(),
                I = this.temp.editPart.model,
                G = I.getType(),
                E = this.getModelFactory().createModel(G);
                $.addCommand(new Gef.gef.command.RemoveConnectionCommand(I));
                $.addCommand(new Gef.gef.command.CreateConnectionCommand(E, _, F));
                $.addCommand(new Gef.gef.command.ResizeConnectionCommand(E, [], I.innerPoints));
                this.getCommandStack().execute($);
                this.getSelectionManager().addSelectedConnection(E.editPart)
            }
        }
        this.reset()
    },
    reset: function() {
        Gef.gef.tracker.MoveEdgeRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) {
            this.getDraggingEdge().moveToHide();
            this.getSelectionManager().refreshHandles()
        }
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.MoveTextRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_MOVE_TEXT: "DRAGGING_MOVE_TEXT",
    understandRequest: function(B) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (!this.isInCanvas(B.point)) return false;
        if (B.eventName != "MOUSE_DOWN") return false;
        var _ = B.target,
        A = _.getAttribute("edgeId");
        if (A == null) return false;
        if (_.tagName != "text" && _.tagName != "textbox") return false;
        var $ = null,
        $ = this.getConnectionByConnectionId(A);
        if ($ == null) return false;
        this.temp = {
            editPart: $.editPart,
            x: B.point.x,
            y: B.point.y
        };
        this.status = this.DRAGGING_MOVE_TEXT;
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return true
    },
    drag: function(_) {
        var $ = this.getDraggingText();
        $.refresh();
        this.temp.oldX = $.edge.textX;
        this.temp.oldY = $.edge.textY
    },
    move: function(B) {
        var A = this.getDraggingText(),
        $ = B.point.x - this.temp.x,
        _ = B.point.y - this.temp.y;
        A.edge.textX = this.temp.oldX + $;
        A.edge.textY = this.temp.oldY + _;
        A.refresh()
    },
    drop: function(A) {
        var C = this.temp.oldX,
        B = this.temp.oldY,
        _ = C + A.point.x - this.temp.x,
        $ = B + A.point.y - this.temp.y;
        A.role = {
            name: "MOVE_TEXT",
            oldTextX: C,
            oldTextY: B,
            newTextX: _,
            newTextY: $,
            edge: this.temp.editPart
        };
        this.executeCommand(this.temp.editPart, A);
        this.reset()
    },
    getDraggingText: function() {
        var $ = this.temp.editPart.getFigure();
        return this.getSelectionManager().getDraggingText($)
    },
    reset: function() {
        Gef.gef.tracker.MoveTextRequestTracker.superclass.reset.call(this)
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.ResizeNodeRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_RESIZE_NODE: "DRAGGING_RESIZE_NODE",
    understandRequest: function(C) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (!this.isInCanvas(C.point)) return false;
        if (C.eventName != "MOUSE_DOWN") return false;
        var D = C.target;
        if (D.id.indexOf(":") == -1) return false;
        var F = D.id.split(":"),
        _ = F[0],
        B = F[1],
        $ = this.getNodeByNodeId(_);
        if ($ == null) return false;
        else if (!$.editPart.canResize()) return false;
        var E = this.getSelectionManager().handles,
        A = E[$.editPart.getModel().getId()];
        if (A == null) return false;
        this.temp = {
            editPart: $.editPart,
            handle: A,
            direction: B
        };
        this.status = this.DRAGGING_RESIZE_NODE;
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return true
    },
    drag: function(_) {
        var A = this.temp.editPart.figure,
        $ = this.temp.direction;
        if ($ == "n") {
            this.temp.x = A.x + A.w / 2;
            this.temp.y = A.y
        } else if ($ == "s") {
            this.temp.x = A.x + A.w / 2;
            this.temp.y = A.y + A.h
        } else if ($ == "w") {
            this.temp.x = A.x;
            this.temp.y = A.y + A.h / 2
        } else if ($ == "e") {
            this.temp.x = A.x + A.w;
            this.temp.y = A.y + A.h / 2
        } else if ($ == "nw") {
            this.temp.x = A.x;
            this.temp.y = A.y
        } else if ($ == "ne") {
            this.temp.x = A.x + A.w;
            this.temp.y = A.y
        } else if ($ == "sw") {
            this.temp.x = A.x;
            this.temp.y = A.y + A.h
        } else if ($ == "se") {
            this.temp.x = A.x + A.w;
            this.temp.y = A.y + A.h
        }
        this.getDraggingRect().update(A.x, A.y, A.w, A.h)
    },
    move: function(G) {
        var H = G.point,
        F = this.temp.editPart.getFigure(),
        A = this.temp.direction,
        J = F.x,
        I = F.y,
        D = F.w,
        C = F.h,
        $ = H.x - this.temp.x,
        _ = H.y - this.temp.y;
        if (A == "n") {
            I = I + _;
            C = C - _
        } else if (A == "s") C = C + _;
        else if (A == "w") {
            J = J + $;
            D = D - $
        } else if (A == "e") D = D + $;
        else if (A == "nw") {
            J = J + $;
            D = D - $;
            I = I + _;
            C = C - _
        } else if (A == "ne") {
            D = D + $;
            I = I + _;
            C = C - _
        } else if (A == "sw") {
            J = J + $;
            D = D - $;
            C = C + _
        } else if (A == "se") {
            D = D + $;
            C = C + _
        }
        var B = {
            x: J,
            y: I,
            w: D,
            h: C
        };
        this.temp.rect = B;
        var E = this.getDraggingRect();
        E.update(B.x, B.y, B.w, B.h)
    },
    drop: function(A) {
        var _ = this.getDraggingRect(),
        B = this.temp.editPart,
        E = this.temp.rect.x,
        D = this.temp.rect.y,
        $ = this.temp.rect.w,
        C = this.temp.rect.h;
        if ($ < 0) $ = 5;
        if (C < 0) C = 5;
        A.role = {
            name: "RESIZE_NODE",
            rect: {
                x: E,
                y: D,
                w: $,
                h: C
            },
            node: B.getModel()
        };
        this.executeCommand(B, A);
        this.temp.handle.refresh();
        this.reset()
    },
    reset: function() {
        Gef.gef.tracker.ResizeNodeRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) this.getDraggingRect().update( - 1, -1, 1, 1)
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.ResizeEdgeRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_RESIZE_EDGE: "DRAGGING_RESIZE_EDGE",
    understandRequest: function(J) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (!this.isInCanvas(J.point)) return false;
        if (J.eventName != "MOUSE_DOWN") return false;
        var K = J.target,
        F = K.id;
        if (F == null || F.indexOf(":middle:") == -1) return false;
        var I = F.substring(0, F.indexOf(":middle:")),
        _ = this.getConnectionByConnectionId(I);
        if (_ == null) return false;
        var $ = F.substring(F.indexOf(":middle:") + ":middle:".length).split(","),
        C = parseInt($[0], 10),
        G = parseInt($[1], 10),
        D = this.getSelectionManager().resizeEdgeHandle,
        A = [];
        Gef.each(_.innerPoints,
        function($) {
            A.push([$[0], $[1]])
        });
        var H = null,
        E = null,
        B = null;
        if (C == G) {
            H = _.innerPoints[C];
            if (C == 0) E = [_.x1, _.y1];
            else E = _.innerPoints[C - 1];
            if (G == _.innerPoints.length - 1) B = [_.x2, _.y2];
            else B = _.innerPoints[C + 1]
        } else {
            if (C == -1) E = [_.x1, _.y1];
            else E = _.innerPoints[C];
            if (G >= _.innerPoints.length) B = [_.x2, _.y2];
            else B = _.innerPoints[G];
            H = [(E[0] + B[0]) / 2, (E[1] + B[1]) / 2];
            _.innerPoints.splice(C + 1, 0, H);
            D.modify()
        }
        this.temp = {
            editPart: _.editPart,
            point: H,
            x: H[0],
            y: H[1],
            oldX: J.point.x,
            oldY: J.point.y,
            prevIndex: C,
            nextIndex: G,
            prev: E,
            next: B,
            oldInnerPoints: A
        };
        this.status = this.DRAGGING_RESIZE_EDGE;
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return true
    },
    drag: function($) {
        this.getSelectionManager().hideDraggingText()
    },
    move: function(A) {
        var $ = A.point.x - this.temp.oldX,
        _ = A.point.y - this.temp.oldY;
        this.temp.point[0] = this.temp.x + $;
        this.temp.point[1] = this.temp.y + _;
        var B = this.getSelectionManager().resizeEdgeHandle;
        if (B) B.modify();
        else this.reset()
    },
    drop: function($) {
        var _ = this.temp.editPart;
        if (this.isSameLine($.point.x, $.point.y, this.temp.prev[0], this.temp.prev[1], this.temp.next[0], this.temp.next[1])) _.getFigure().innerPoints.splice(this.temp.nextIndex, 1);
        $.role = {
            name: "RESIZE_EDGE",
            rect: {
                x: _.figure.x,
                y: _.figure.y,
                w: _.figure.w,
                h: _.figure.h
            },
            oldInnerPoints: this.temp.oldInnerPoints,
            newInnerPoints: _.getFigure().innerPoints
        };
        this.executeCommand(_, $);
        this.reset()
    },
    isSameLine: function(E, _, F, A, C, B) {
        var J = F - E,
        I = A - _,
        K = C - E,
        H = B - _,
        L = J * K + I * H,
        G = Math.sqrt((J * J + I * I) * (K * K + H * H)),
        $ = L / G,
        D = Math.acos($) * 180 / Math.PI;
        return D > 170
    },
    reset: function() {
        Gef.gef.tracker.ResizeEdgeRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) this.getSelectionManager().refreshHandles()
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.MarqueeRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    DRAGGING_MARQUEE: "DRAGGING_MARQUEE",
    understandRequest: function(A) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (!this.isInCanvas(A.point)) return false;
        if (A.eventName != "MOUSE_DOWN") return false;
        var B = this.findEditPartAt(A);
        if (B != this.getContents()) return false;
        var _ = A.target;
        if (Gef.isVml && _.tagName == "DIV") {
            if (_.firstChild && _.firstChild.tagName == "DIV") {
                var $ = _.firstChild.getAttribute("id");
                if ($ != null && $.indexOf("_Gef_") != -1) {
                    this.status = this.DRAGGING_MARQUEE;
                    this.browserListener.activeTracker = this;
                    return true
                }
            }
        } else if (Gef.isSvg && _.tagName == "svg") {
            this.status = this.DRAGGING_MARQUEE;
            this.browserListener.activeTracker = this;
            return true
        } else if (Gef.isSvg && _.tagName == "DIV" && _.firstChild && _.firstChild.tagName == "svg") {
            this.status = this.DRAGGING_MARQUEE;
            this.browserListener.activeTracker = this;
            return true
        }
        return false
    },
    processRequest: function($) {
    	alert("cheng MarqueeRequestTracker processRequest ");
        if (this.status == "NONE") {
            this.reset();
            return true
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return false
    },
    drag: function(_) {
        var $ = _.point;
        this.getDraggingRect().update($.x, $.y, 0, 0)
    },
    move: function(A) {
        var $ = this.getDraggingRect(),
        _ = A.point;
        $.update($.x, $.y, _.x - $.x, _.y - $.y)
    },
    drop: function(_) {
        var A = this.getDraggingRect(),
        $ = {
            x: _.point.x < A.x ? _.point.x: A.x,
            y: _.point.y < A.y ? _.point.y: A.y,
            w: A.w,
            h: A.h
        };
        this.getSelectionManager().selectIn($);
        this.reset()
    },
    reset: function() {
        Gef.gef.tracker.MarqueeRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) this.getDraggingRect().update( - 90, -90, 90, 50)
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.DirectEditRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    understandRequest: function($) {
        if (this.status != "NONE") this.reset();
        if (!this.isInCanvas($.point) || $.eventName != "DBL_CLICK") return false;
        if ($.target.tagName != "text" && $.target.tagName != "textbox") return false;
        this.status = "EDIT_START";
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function(_) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if (_.eventName == "KEY_DOWN") {
            var $ = _.e.keyCode;
            if ($ == 10 || $ == 13) this.status = "EDIT_COMPLETE";
            if ($ == 27) this.status = "EDIT_CANCEL"
        }
        if (_.eventName == "MOUSE_DOWN" && _.target.tagName != "INPUT") if (this.status == "ALREADY_START_EDIT") {
            _.editType = "EDIT_COMPLETE";
            this.status = "EDIT_COMPLETE"
        }
        if (this.status == "EDIT_START") this.startEdit(_);
        else if (this.status == "EDIT_COMPLETE") this.completeEdit(_);
        else if (this.status == "EDIT_CANCEL") this.cancelEdit(_);
        return false
    },
    startEdit: function(A) {
        var B = this.findEditPartAt(A);
        if (B.getClass() == "node") {
            if (B.getFigure().updateAndShowText != null) {
                this.getTextEditor().showForNode(B.getFigure());
                this.temp.editPart = B;
                this.status = "ALREADY_START_EDIT"
            } else this.status = "NONE"
        } else if (this.isText(A.target)) {
            var _ = A.target.getAttribute("edgeId"),
            $ = this.getConnectionByConnectionId(_);
            this.getTextEditor().showForEdge($);
            this.temp.editPart = $.editPart;
            this.status = "ALREADY_START_EDIT"
        }
    },
    completeEdit: function(A) {
        if (!this.temp.editPart) return;
        var B = this.temp.editPart,
        $ = this.getTextEditor().getValue();
        if ($ != B.getModel().name) {
            A.role = {
                name: "EDIT_TEXT",
                text: $
            };
            this.executeCommand(B, A)
        }
        var _ = this.getSelectionManager().draggingText;
        if (_) _.refresh();
        this.reset()
    },
    cancelEdit: function($) {
        this.reset()
    },
    isText: function($) {
        return (Gef.isVml && $.tagName == "textbox") || (Gef.isSvg && $.tagName == "text")
    },
    getTextEditor: function() {
        if (!this.textEditor) {
            var A = this.browserListener.getViewer().getCanvasLocation(),
            _ = A.x,
            $ = A.y;
            this.textEditor = new Gef.figure.TextEditor(_, $)
        }
        A = this.browserListener.getViewer().getCanvasLocation();
        this.textEditor.baseX = A.x;
        this.textEditor.baseY = A.y;
        this.textEditor.show();
        return this.textEditor
    },
    reset: function() {
        Gef.gef.tracker.DirectEditRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) this.getTextEditor().hide()
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.SelectionRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    understandRequest: function(_) {
        if (this.status != "NONE") this.reset();
        var $ = _.eventName == "MOUSE_DOWN" || _.eventName == "KEY_UP";
        if ($) this.status = "SELECT";
        return $
    },
    processRequest: function(B) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if (B.eventName != "MOUSE_DOWN" && B.eventName != "KEY_UP") {
            this.reset();
            return false
        }
        var C = this.findEditPartAt(B);
        if (this.notMultiSelect(B)) {
            var A = this.getSelectedNodes();
            if (A.length > 1 && A.indexOf(C) != -1) return false
        }
        if (C.getClass() == "process");
        else if (C.getClass() == "node") {
            var _ = this.addSelected(C, this.isMultiSelect(B));
            if (_) {
                var $ = this.createNodeHandle(C);
                $.refresh()
            }
        } else if (C.getClass() == "connection") {
            this.clearAll();
            this.addSelectedEdge(C)
        }
        return false
    },
    addSelectedEdge: function($) {
        this.getSelectionManager().addSelectedConnection($)
    },
    removeSelectedEdge: function($) {
        this.getSelectionManager().removeSelectedConnection($)
    },
    addSelected: function(_, $) {
        return this.getSelectionManager().addSelectedNode(_, $)
    },
    removeSelected: function(_, $) {
        this.getSelectionManager().removeSelectedNode(_, $)
    },
    clearAll: function() {
        this.getSelectionManager().clearAll()
    },
    selectAll: function() {
        this.getSelectionManager().selectAll()
    },
    selectIn: function($) {
        this.getSelectionManager().selectIn($)
    },
    createNodeHandle: function($) {
        return this.getSelectionManager().createNodeHandle($)
    },
    removeNodeHandle: function($) {
        return this.getSelectionManager.removeNodeHandle($)
    },
    refreshHandles: function() {
        this.getSelectionManager.refreshHandles()
    },
    reset: function() {
        this.status = "NONE"
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.SelectionListener = Gef.extend(Object, {
    selectionChanged: Gef.emptyFn
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.SelectionListenerTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    understandRequest: function($) {
        return $.eventName == "MOUSE_UP" || $.eventName == "KEY_DOWN"
    },
    processRequest: function(B) {
        var $ = this.getSelectionManager();
        if (!this.previousSelected) this.previousSelected = [$.getDefaultSelected()];
        var A = $.getCurrentSelected(),
        _ = $.getDefaultSelected(),
        C = false;
        if (this.previousSelected.length == A.length) {
            for (var D = 0; D < A.length; D++) if (A[D] != this.previousSelected[D]) {
                C = true;
                break
            }
        } else C = true;
        if (C === true) {
            Gef.each(this.getSelectionListeners(),
            function($) {
                $.selectionChanged(A, this.previousSelected, _)
            },
            this);
            this.previousSelected = A
        }
        return false
    },
    getSelectionListeners: function() {
        if (!this.selectionListeners) this.selectionListeners = [];
        return this.selectionListeners
    },
    addSelectionListener: function($) {
        this.getSelectionListeners().push($)
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.DefaultSelectionListener = Gef.extend(Gef.gef.tracker.SelectionListener, {
    selectionChanged: function(A, $, _) {
        if (A.length == 1) {
            var B = A[0];
            if (B == _) this.selectDefault(_);
            else if (B.getClass() == "node") this.selectNode(B);
            else this.selectConnection(B)
        } else this.selectDefault(_)
    },
    selectNode: Gef.emptyFn,
    selectConnection: Gef.emptyFn,
    selectDefault: Gef.emptyFn
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.ToolTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    isTool: function(_) {
        var $ = false,
        A = null;
        Gef.each(this.getSelectedNodes(),
        function(B) {
            Gef.each(B.getFigure().getTools(),
            function(B) {
                if (B.isClicked(_)) {
                    $ = true;
                    A = B;
                    return false
                }
                if ($ === true) return false
            })
        });
        if ($ === true) this.selectedTool = A;
        return $
    },
    understandRequest: function($) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if ($.editType != null || $.draggingType != null) return false;
        if ($.eventName != "MOUSE_DOWN") return false;
        if (!this.isTool($)) return false;
        var _ = this.getSelectedNodes()[0];
        if (this.selectedTool.needCheckOutgo() && !_.canCreateOutgo()) return false;
        this.status = "TOOL_SELECTED";
        this.browserListener.activeTracker = this;
        return true
    },
    processRequest: function($) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if ($.eventName == "MOUSE_DOWN") this.drag($);
        else if ($.eventName == "MOUSE_MOVE") this.move($);
        else if ($.eventName == "MOUSE_UP") this.drop($);
        return true
    },
    drag: function($) {
        this.selectedTool.drag(this, $)
    },
    move: function($) {
        this.selectedTool.move(this, $)
    },
    drop: function($) {
        this.selectedTool.drop(this, $);
        this.reset()
    }
});
Gef.ns("Gef.gef.tracker");
Gef.gef.tracker.KeyPressRequestTracker = Gef.extend(Gef.gef.tracker.AbstractRequestTracker, {
    KEY_PRESS: "KEY_PRESS",
    understandRequest: function(_) {
        if (this.status != "NONE") {
            this.reset();
            return false
        }
        if (_.target.tagName == "INPUT" || _.target.tagName == "TEXTAREA") return false;
        if (_.eventName != "KEY_DOWN") return false;
        try {
            this.temp = {
                x: 0,
                y: 0
            };
            this.status = this.KEY_PRESS;
            this.browserListener.activeTracker = this;
            return true
        } catch($) {
            Gef.error($, "key press");
            return false
        }
    },
    processRequest: function(_) {
        if (this.status == "NONE") {
            this.reset();
            return false
        }
        if (_.eventName == "KEY_DOWN") {
            var $ = _.e.keyCode;
            if ($ == 37 || $ == 38 || $ == 39 || $ == 40) this.move(_);
            if ($ == 46) {
                this.status = "REMOVE";
                this.removeAll(_);
                this.reset()
            }
            if (_.e.ctrlKey && $ == 65) {
                this.status = "SELECT_ALL";
                this.selectAllNodes(_);
                this.reset()
            }
        } else if (_.eventName == "KEY_UP") {
            $ = _.e.keyCode;
            if ($ == 37 || $ == 38 || $ == 39 || $ == 40) this.drop(_)
        }
        return true
    },
    move: function(A) {
        var $ = 0,
        _ = 0;
        switch (A.e.keyCode) {
        case 38:
            _ = -1;
            break;
        case 40:
            _ = 1;
            break;
        case 37:
            $ = -1;
            break;
        case 39:
            $ = 1;
            break
        }
        this.temp.x += $;
        this.temp.y += _;
        Gef.each(this.getSelectedNodes(),
        function(D, A) {
            var C = D.getFigure();
            try {
                var F = C.x + $,
                E = C.y + _;
                C.moveTo(F, E)
            } catch(B) {
                Gef.error(B, "move key press")
            }
        },
        this);
        this.getSelectionManager().refreshHandles()
    },
    drop: function(_) {
        var $ = [];
        Gef.each(this.getSelectedNodes(),
        function(A) {
            var _ = A.getModel();
            $.push(_)
        });
        if (this.temp.x != 0 || this.temp.y != 0) {
            _.role = {
                name: "MOVE_NODE",
                nodes: $,
                dx: this.temp.x,
                dy: this.temp.y
            };
            this.executeCommand(this.getContents(), _)
        }
        this.reset()
    },
    reset: function() {
        Gef.gef.tracker.KeyPressRequestTracker.superclass.reset.call(this);
        if (this.browserListener.getViewer().rendered) this.removeDraggingRects()
    },
    removeAll: function(B) {
        try {
            var $ = this.getSelectionManager(),
            _ = $.selectedConnection,
            A = $.items;
            if (_ != null) {
                B.role = {
                    name: "REMOVE_EDGE"
                };
                this.executeCommand(_, B);
                $.removeSelectedConnection()
            } else if (A.length > 0) {
                B.role = {
                    name: "REMOVE_NODES",
                    nodes: A
                };
                this.executeCommand(this.browserListener.graphicalViewer.getContents(), B);
                $.clearAll()
            }
        } catch(C) {
            Gef.error(C, "removeAll")
        }
    },
    selectAllNodes: function($) {
        this.getSelectionManager().selectAll()
    }
});


///////////////////////////////////////////


Gef.ns("Gef.gef.xml");
Gef.gef.xml.XmlSerializer = function(v_model) {
    this.model = v_model
};
Gef.gef.xml.XmlSerializer.prototype = {
    serialize: function() {
        return this.model.encode()
    }
};
Gef.ns("Gef.gef.xml");
Gef.gef.xml.XmlDeserializer = Gef.extend(Object, {
    constructor: function(v_val) {
        this.xdoc = Gef.model.XmlUtil.readXml(v_val)
    },
    decodeNodeModel: function(_model, A, $) {
    	_model.decode(A, ["transition"]);
        Gef.model.JpdlUtil.decodeNodePosition(_model);
        this.modelMap[_model.text] = _model;
        this.domMap[_model.text] = A;
        $.addChild(_model)
    }
});
Gef.ns("Gef.layer");
Gef.layer.Layer = Gef.extend(Gef.figure.GroupFigure, {
    LAYER_MASK: "LAYER_MASK",
    LAYER_LABEL: "LAYER_LABEL",
    LAYER_DRAGGING: "LAYER_DRAGGING",
    LAYER_HANDLE: "LAYER_HANDLE",
    LAYER_NODE: "LAYER_NODE",
    LAYER_CONNECTION: "LAYER_CONNECTION",
    LAYER_SNAP: "LAYER_SNAP",
    LAYER_GRID: "LAYER_GRID",
    constructor: function($) {
        this.name = $;
        this.id = $;
        Gef.layer.Layer.superclass.constructor.call(this)
    },
    getName: function() {
        return this.name
    }
});
Gef.ns("Gef.layer");
Gef.layer.GridLayer = Gef.extend(Gef.layer.Layer, {});
///////////////////////////////////////////////////////////////////////

Gef.ns("Gef.jbs");
Gef.jbs.JBSEditPartFactory = Gef.extend(Gef.gef.EditPartFactory, {
    createEditPart: function(type) {
        return Gef.jbs.JBSEditPartFactory._editPartLib[type] ? eval("new " + Gef.jbs.JBSEditPartFactory._editPartLib[type] + "(type)") : null
    }
});
Gef.jbs.JBSEditPartFactory._editPartLib = {
    "process": "Gef.jbs.editpart.ProcessEditPart",
    "start": "Gef.jbs.editpart.StartEditPart",
    "end": "Gef.jbs.editpart.EndEditPart",
    "cancel": "Gef.jbs.editpart.CancelEditPart",
    "error": "Gef.jbs.editpart.ErrorEditPart",
    "state": "Gef.jbs.editpart.StateEditPart",
    "hql": "Gef.jbs.editpart.HqlEditPart",
    "sql": "Gef.jbs.editpart.SqlEditPart",
    "java": "Gef.jbs.editpart.JavaEditPart",
    "script": "Gef.jbs.editpart.ScriptEditPart",
    "task": "Gef.jbs.editpart.TaskEditPart",
    "decision": "Gef.jbs.editpart.DecisionEditPart",
    "fork": "Gef.jbs.editpart.ForkEditPart",
    "join": "Gef.jbs.editpart.JoinEditPart",
    "custom": "Gef.jbs.editpart.CustomEditPart",
    "mail": "Gef.jbs.editpart.MailEditPart",
    "subProcess": "Gef.jbs.editpart.SubProcessEditPart",
    "group": "Gef.jbs.editpart.GroupEditPart",
    "jms": "Gef.jbs.editpart.JmsEditPart",
    "ruleDecision": "Gef.jbs.editpart.RuleDecisionEditPart",
    "rules": "Gef.jbs.editpart.RulesEditPart",
    "auto": "Gef.jbs.editpart.AutoEditPart",
    "human": "Gef.jbs.editpart.HumanEditPart",
    "counter-sign": "Gef.jbs.editpart.CounterSignEditPart",
    "foreach": "Gef.jbs.editpart.ForeachEditPart",
    "transition": "Gef.jbs.editpart.TransitionEditPart"
};
Gef.jbs.JBSEditPartFactory.registerEditPart = function(_, $) {
    Gef.jbs.JBSEditPartFactory._editPartLib[_] = $
};
Gef.ns("Gef.jbs");
Gef.jbs.JBSModelFactory = Gef.extend(Gef.gef.ModelFactory, {
    getId: function($) {
        if (this.map == null) this.map = {};
        if (this.map[$] == null) this.map[$] = 1;
        else this.map[$]++;
        return $ + " " + this.map[$]
    },
    getTypeName: function($) {
        return $
    },
    reset: function() {
        delete this.map;
        this.map = {}
    },
    createModel: function(type) {
        var id = this.getId(type);
        return Gef.jbs.JBSModelFactory._modelLib[type] ? eval("new " + Gef.jbs.JBSModelFactory._modelLib[type] + "({id:id,text:id})") : null
    }
});
Gef.jbs.JBSModelFactory._modelLib = {
    "process": "Gef.jbs.model.ProcessModel",
    "start": "Gef.jbs.model.StartModel",
    "end": "Gef.jbs.model.EndModel",
    "cancel": "Gef.jbs.model.CancelModel",
    "error": "Gef.jbs.model.ErrorModel",
    "state": "Gef.jbs.model.StateModel",
    "hql": "Gef.jbs.model.HqlModel",
    "sql": "Gef.jbs.model.SqlModel",
    "java": "Gef.jbs.model.JavaModel",
    "script": "Gef.jbs.model.ScriptModel",
    "task": "Gef.jbs.model.TaskModel",
    "decision": "Gef.jbs.model.DecisionModel",
    "fork": "Gef.jbs.model.ForkModel",
    "join": "Gef.jbs.model.JoinModel",
    "custom": "Gef.jbs.model.CustomModel",
    "mail": "Gef.jbs.model.MailModel",
    "sub-process": "Gef.jbs.model.SubProcessModel",
    "subProcess": "Gef.jbs.model.SubProcessModel",
    "group": "Gef.jbs.model.GroupModel",
    "transition": "Gef.jbs.model.TransitionModel",
    "jms": "Gef.jbs.model.JmsModel",
    "ruleDecision": "Gef.jbs.model.RuleDecisionModel",
    "rules": "Gef.jbs.model.RulesModel",
    "auto": "Gef.jbs.model.AutoModel",
    "human": "Gef.jbs.model.HumanModel",
    "counter-sign": "Gef.jbs.model.CounterSignModel",
    "foreach": "Gef.jbs.model.ForeachModel"
};
Gef.jbs.JBSModelFactory.registerModel = function(_, $) {
    Gef.jbs.JBSModelFactory._modelLib[_] = $
};
Gef.ns("Gef.jbs");
Gef.jbs.JBSPaletteHelper = Gef.extend(Gef.gef.support.PaletteHelper, {
    constructor: function($) {
        this.editor = $
    },
    createSource: function() {
        var $ = this;
        return {
            title: "palette",
            buttons: [{
                text: "export",
                handler: function() {
                    alert($.editor.serial())
                }
            },
            {
                text: "clear",
                handler: function() {
                    $.editor.clear()
                }
            },
            {
                text: "reset",
                handler: function() {
                    $.editor.reset()
                }
            }],
            groups: [{
                title: "Operations",
                items: [{
                    text: "Select",
                    iconCls: "gef-tool-select",
                    creatable: false
                },
                {
                    text: "Marquee",
                    iconCls: "gef-tool-marquee",
                    creatable: false
                }]
            },
            {
                title: "Activities",
                items: [{
                    text: "transition",
                    iconCls: "gef-tool-transition",
                    creatable: false,
                    isConnection: true
                },
                {
                    text: "auto",
                    iconCls: "gef-tool-java",
                    w: 90,
                    h: 50
                },
                {
                    text: "human",
                    iconCls: "gef-tool-task",
                    w: 90,
                    h: 50
                },
                {
                    text: "counter-sign",
                    iconCls: "gef-tool-task",
                    w: 90,
                    h: 50
                },
                {
                    text: "start",
                    iconCls: "gef-tool-start",
                    w: 48,
                    h: 48
                },
                {
                    text: "end",
                    iconCls: "gef-tool-end",
                    w: 48,
                    h: 48
                },
                {
                    text: "cancel",
                    iconCls: "gef-tool-cancel",
                    w: 48,
                    h: 48
                },
                {
                    text: "error",
                    iconCls: "gef-tool-error",
                    w: 48,
                    h: 48
                },
                {
                    text: "state",
                    iconCls: "gef-tool-state",
                    w: 90,
                    h: 50
                },
                {
                    text: "hql",
                    iconCls: "gef-tool-hql",
                    w: 90,
                    h: 50
                },
                {
                    text: "sql",
                    iconCls: "gef-tool-sql",
                    w: 90,
                    h: 50
                },
                {
                    text: "java",
                    iconCls: "gef-tool-java",
                    w: 90,
                    h: 50
                },
                {
                    text: "script",
                    iconCls: "gef-tool-script",
                    w: 90,
                    h: 50
                },
                {
                    text: "task",
                    iconCls: "gef-tool-task",
                    w: 90,
                    h: 50
                },
                {
                    text: "decision",
                    iconCls: "gef-tool-decision",
                    w: 48,
                    h: 48
                },
                {
                    text: "fork",
                    iconCls: "gef-tool-fork",
                    w: 48,
                    h: 48
                },
                {
                    text: "join",
                    iconCls: "gef-tool-join",
                    w: 48,
                    h: 48
                },
                {
                    text: "mail",
                    iconCls: "gef-tool-mail",
                    w: 90,
                    h: 50
                },
                {
                    text: "custom",
                    iconCls: "gef-tool-custom",
                    w: 90,
                    h: 50
                },
                {
                    text: "subProcess",
                    iconCls: "gef-tool-subProcess",
                    w: 90,
                    h: 50
                },
                {
                    text: "group",
                    iconCls: "gef-tool-group",
                    w: 90,
                    h: 50
                },
                {
                    text: "jms",
                    iconCls: "gef-tool-jms",
                    w: 90,
                    h: 50
                },
                {
                    text: "ruleDecision",
                    iconCls: "gef-tool-ruleDecision",
                    w: 48,
                    h: 48
                },
                {
                    text: "rules",
                    iconCls: "gef-tool-rules",
                    w: 90,
                    h: 50
                },
                {
                    text: "foreach",
                    iconCls: "gef-tool-foreach",
                    w: 48,
                    h: 48
                }]
            }]
        }
    },
    getSource: function() {
        if (!this.source) this.source = this.createSource();
        return this.source
    },
    render: function(O) {
        var C = this.getSource(),
        K = document.createElement("div");
        K.className = "gef-drag-handle";
        O.appendChild(K);
        var $ = document.createElement("span");
        K.appendChild($);
        $.unselectable = "on";
        $.innerHTML = C.title;
        var L = this;
        for (var F = 0; F < C.buttons.length; F++) {
            var I = C.buttons[F],
            _ = document.createElement("a");
            _.href = "javascript:void(0);";
            _.onclick = I.handler;
            _.innerHTML = "|" + I.text + "|";
            $.appendChild(_)
        }
        var A = document.createElement("ul");
        O.appendChild(A);
        for (F = 0; F < C.groups.length; F++) {
            var M = C.groups[F],
            D = document.createElement("li");
            D.className = "gef-palette-bar";
            A.appendChild(D);
            var H = document.createElement("div");
            H.unselectable = "on";
            H.innerHTML = M.title;
            D.appendChild(H);
            var N = document.createElement("ul");
            D.appendChild(N);
            for (var E = 0; E < M.items.length; E++) {
                var J = M.items[E],
                G = document.createElement("li");
                G.id = J.text;
                G.className = "gef-palette-item";
                N.appendChild(G);
                var B = document.createElement("span");
                B.innerHTML = J.text;
                B.className = J.iconCls;
                B.unselectable = "on";
                G.appendChild(B)
            }
        }
    },
    getActivePalette: function() {
        return this.activePalette
    },
    setActivePalette: function($) {
        this.activePalette = $
    },
    getPaletteConfig: function(D, _) {
        var $ = _.parentNode.id;
        if (!$) return null;
        var B = this.getSource(),
        E = null;
        Gef.each(B.groups,
        function(_) {
            Gef.each(_.items,
            function(_) {
                if (_.text == $) {
                    E = _;
                    return false
                }
            });
            if (E != null) return false
        });
        if (!E) return null;
        var A = null;
        if (this.getActivePalette()) {
            var C = this.getActivePalette().text;
            A = document.getElementById(C);
            A.style.background = "white"
        }
        this.setActivePalette(E);
        A = document.getElementById($);
        A.style.background = "#CCCCCC";
        if (E.creatable === false) return null;
        return E
    }
});
Gef.ns("Gef.jbs");
Gef.jbs.JBSEditor = Gef.extend(Gef.gef.support.DefaultGraphicalEditorWithPalette, {
    constructor: function() {
        this.modelFactory = new Gef.jbs.JBSModelFactory();
        this.editPartFactory = new Gef.jbs.JBSEditPartFactory();
        Gef.jbs.JBSEditor.superclass.constructor.call(this)
    },
    getPaletteHelper: function() {
        if (!this.paletteHelper) this.paletteHelper = new Gef.jbs.JBSPaletteHelper(this);
        return this.paletteHelper
    },
    serial: function() {//cheng serial
        var v_model = this.getGraphicalViewer().getContents().getModel();
        //alert("serial cheng JBSEditor:"+v_model.getType());
        _ = new Gef.jbs.xml.JBSSerializer(v_model);
        A = _.serialize();
        return A
    },
    clear: function() {
        var D = this.getGraphicalViewer(),
        A = D.getContents(),
        C = D.getBrowserListener(),
        _ = D.getEditDomain().getCommandStack(),
        $ = C.getSelectionManager();
        $.selectAll();
        var B = A.getRemoveNodesCommand({
            role: {
                nodes: $.getSelectedNodes()
            }
        });
        _.execute(B);
        $.clearAll();
        this.editDomain.editPartRegistry = []
    },
    reset: function() {
        this.clear();
        var A = this.getGraphicalViewer(),
        $ = A.getEditDomain().getCommandStack();
        $.flush();
        this.getModelFactory().reset();
        var _ = A.getContents();
        _.text = "untitled";
        _.key = null;
        _.description = null
    },
    resetAndOpen: function(xml) {
        this.reset();
        var A = new Gef.jbs.xml.JBSDeserializer(xml);
        //将 xml 转义成 节点数据 json
        v_text = A.decode();
        //alert(A+ " cheng resetAndOpen:"+v_text);
        this.getGraphicalViewer().setContents(v_text);
        this.updateModelFactory();
        //刷新
        this.getGraphicalViewer().getContents().refresh()
    }
});
Gef.ns("Gef.jbs");
Gef.jbs.JBSEditorInput = Gef.extend(Gef.ui.EditorInput, {
    constructor: function($) {
        if (!$) $ = "process";
        this.processModel = $
    },
    readXml: function($) {
        var _ = new Gef.jbs.xml.JBSDeserializer($);
        this.processModel = _.decode()
    },
    getName: function() {
        return this.processModel.name
    },
    getObject: function() {
        return this.processModel
    }
});




/////////////////////////////////////////////////////
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.ProcessEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        return new Gef.jbs.figure.ProcessFigure()
    },
    getClass: function() {
        return "process"
    },
    canCreate: function($) {
        var _ = true;
        //alert("cheng Gef.jbs.editpart.ProcessEditPart :"+$.getType());
        if ($.getType() == "start") Gef.each(this.children,
        function($) {
            if ($.getModel().type == "start") {
                Gef.showMessage("validate.only_one_start", "cannot have more than one START.");
                _ = false;
                return false
            }
        });
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.StartEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
    //导出时坐标 标志
    //alert("cheng StartEditPart createFigure :"+this.model.x);
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.StartFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canCreateOutgo: function() {
        if (this.getOutgoingConnections().length == 0) return true;
        else {
            Gef.showMessage("validate.start_only_one_outgo", "START could have only one outgo transition.");
            return false
        }
    },
    canCreateIncome: function() {
        Gef.showMessage("validate.start_no_income", "START could not have income transition.");
        return false
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.EndEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.EndFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canCreateOutgo: function() {
        Gef.showMessage("validate.end_no_outgo", "END could not have outgo transition.");
        return false
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.CancelEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.CancelFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canCreateOutgo: function() {
        Gef.showMessage("validate.cancel_no_outgo", "CANCEL could not have outgo transition.");
        return false
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.ErrorEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.ErrorFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canCreateOutgo: function() {
        Gef.showMessage("validate.error_no_outgo", "ERROR could noe have outgo transition.");
        return false
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.StateEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.StateFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.HqlEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.HqlFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.SqlEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.SqlFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.JavaEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.JavaFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.ScriptEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.ScriptFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.TaskEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _obj = new Gef.jbs.figure.TaskFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _obj.editPart = this;
        return _obj;
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.DecisionEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.DecisionFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.ForkEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.ForkFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.JoinEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.JoinFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.CustomEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.CustomFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.MailEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.MailFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.SubProcessEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.SubProcessFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.GroupEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.GroupNodeFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.TransitionEditPart = Gef.extend(Gef.gef.editparts.ConnectionEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.TransitionFigure(this.getSource().getFigure(), this.getTarget().getFigure());
        _.innerPoints = $.innerPoints;
        _.name = $.text;
        _.textX = $.textX;
        _.textY = $.textY;
        _.editPart = this;
        _.conditional = $.condition ? true: false;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.JmsEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.JmsFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.RuleDecisionEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.RuleDecisionFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canResize: function() {
        return false
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.RulesEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.RulesFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.AutoEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.AutoFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.HumanEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.HumanFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.CounterSignEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.CounterSignFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    }
});
Gef.ns("Gef.jbs.editpart");
Gef.jbs.editpart.ForeachEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    createFigure: function() {
        var $ = this.getModel(),
        _ = new Gef.jbs.figure.ForeachFigure({
            x: this.model.x,
            y: this.model.y,
            name: this.model.text
        });
        _.editPart = this;
        return _
    },
    canResize: function() {
        return false
    }
});
///////////////////////////////////////////////////////////////////////////
//暂时去掉为实现的功能
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.AbstractNodeFigure = Gef.extend(Gef.figure.NodeFigure, {
    getTools: function() {
        if (!this.tools) this.tools = [new Gef.jbs.tool.TaskTool(), new Gef.jbs.tool.EndTool(), new Gef.jbs.tool.GatewayTool(), new Gef.jbs.tool.LineTool(), new Gef.jbs.tool.ChangeTypeTool({
            allowedTypes: [
             /*{
                type: "human",
                name: "\u4eba\u5de5"
            },
            {
                type: "counter-sign",
                name: "\u4f1a\u7b7e"
            },
            {
                type: "state",
                name: "\u7b49\u5f85"
            },
            {
                type: "hql",
                name: "HQL"
            },
            {
                type: "sql",
                name: "SQL"
            },
            {
                type: "java",
                name: "JAVA"
            },
            {
                type: "script",
                name: "\u811a\u672c"
            }, */
            {
                type: "task",
                name: "\u4efb\u52a1"
            }/* 
            ,{
                type: "mail",
                name: "\u90ae\u4ef6"
            },
            {
                type: "custom",
                name: "\u81ea\u5b9a\u4e49"
            }*/
            ,{
                type: "subProcess",
                name: "\u5b50\u6d41\u7a0b"
            }
            /*,
            {
                type: "jms",
                name: "JMS"
            },
            {
                type: "rules",
                name: "\u89c4\u5219"
            }*/]
        })];
        return this.tools
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.AbstractImageFigure = Gef.extend(Gef.figure.ImageNodeFigure, {
    getTools: function() {
        if (!this.tools) this.tools = [new Gef.jbs.tool.TaskTool(), new Gef.jbs.tool.EndTool(), new Gef.jbs.tool.GatewayTool(), new Gef.jbs.tool.LineTool(), new Gef.jbs.tool.ChangeTypeTool({
            allowedTypes: [{
                type: "decision",
                name: "\u51b3\u7b56"
            },
            {
                type: "fork",
                name: "\u5e76\u53d1"
            },
            {
                type: "join",
                name: "\u6c47\u805a"
            },
            {
                type: "ruleDecision",
                name: "\u89c4\u5219\u51b3\u7b56"
            }]
        })];
        return this.tools
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.AbstractEndImageFigure = Gef.extend(Gef.figure.ImageNodeFigure, {
    getTools: function() {
        if (!this.tools) this.tools = [new Gef.jbs.tool.ChangeTypeTool({
            allowedTypes: [{
                type: "end",
                name: "\u7ed3\u675f"
            },
            {
                type: "cancel",
                name: "\u53d6\u6d88"
            },
            {
                type: "error",
                name: "\u9519\u8bef"
            }]
        })];
        return this.tools
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.AbstractStartImageFigure = Gef.extend(Gef.figure.ImageNodeFigure, {
    getTools: function() {
        if (!this.tools) this.tools = [new Gef.jbs.tool.TaskTool(), new Gef.jbs.tool.GatewayTool({
            getY: function() {
                return 20
            }
        }), new Gef.jbs.tool.LineTool({
            getY: function() {
                return 40
            }
        })];
        return this.tools
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.ProcessFigure = Gef.extend(Gef.figure.NoFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.StartFigure = Gef.extend(Gef.jbs.figure.AbstractStartImageFigure, {
    constructor: function($) {
    	//alert("cheng StartFigure constructor ");
        Gef.jbs.figure.StartFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "start_event_empty.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.EndFigure = Gef.extend(Gef.jbs.figure.AbstractEndImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.EndFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "end_event_terminate.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.CancelFigure = Gef.extend(Gef.jbs.figure.AbstractEndImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.CancelFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "end_event_cancel.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.ErrorFigure = Gef.extend(Gef.jbs.figure.AbstractEndImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.ErrorFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "end_event_error.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.StateFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.HqlFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.SqlFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.JavaFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.ScriptFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.TaskFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.DecisionFigure = Gef.extend(Gef.jbs.figure.AbstractImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.DecisionFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "decision.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.ForkFigure = Gef.extend(Gef.jbs.figure.AbstractImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.ForkFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "gateway_parallel.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.JoinFigure = Gef.extend(Gef.jbs.figure.AbstractImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.JoinFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "gateway_parallel.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.CustomFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.MailFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.SubProcessFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.GroupNodeFigure = Gef.extend(Gef.figure.NodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.TransitionFigure = Gef.extend(Gef.figure.EdgeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.JmsFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.RuleDecisionFigure = Gef.extend(Gef.jbs.figure.AbstractImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.RuleDecisionFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "gateway_exclusive.png"
    }
});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.RulesFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.AutoFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.HumanFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.CounterSignFigure = Gef.extend(Gef.jbs.figure.AbstractNodeFigure, {});
Gef.ns("Gef.jbs.figure");
Gef.jbs.figure.ForeachFigure = Gef.extend(Gef.jbs.figure.AbstractImageFigure, {
    constructor: function($) {
        Gef.jbs.figure.ForeachFigure.superclass.constructor.call(this, $);
        this.url = Gef.IMAGE_ROOT + "gateway_parallel.png"
    }
});

Gef.ns("Gef.jbs.xml");
Gef.jbs.xml.JBSSerializer = Gef.extend(Gef.gef.xml.XmlSerializer, {});
Gef.ns("Gef.jbs.xml");
Gef.jbs.xml.JBSDeserializer = Gef.extend(Gef.gef.xml.XmlDeserializer, {
    decode: function() {
        this.modelMap = {};
        this.domMap = {};
        var $ = new Gef.jbs.model.ProcessModel();
       // alert("cheng JBSDeserializer decode ");
        //开始解析 xml 
        this.parseRoot($);
        delete this.modelMap;
        delete this.domMap;
        return $
    },
    parseRoot: function(_obj) {
        var $ = this.xdoc.documentElement;
        _obj.decode($, ["auto", "end-cancel", "counter-sign", "custom", "decision", "end", "end-error", "fork", "group", "hql", "human", "java", "jms", "join", "mail", "rule-decision", "rules", "script", "sql", "start", "state", "sub-process", "task", "foreach"]);
        //alert("cheng parseRoot $.childNodes:"+$.childNodes.length);
        Gef.each($.childNodes,
	        function($) {
	            this.parseNodes($, _obj)
	        },
	        this);
        Gef.each(_obj.getChildren(),
        function($) {
            this.parseConnections($)
        },
        this)
    },
    parseNodes: function(nodeDom, rootModel) {
        var nodeName = nodeDom.nodeName;
        //获取解析对象
        //alert("cheng JBSDeserializer parseNodes:"+nodeName);
        
        nodeModel = Gef.jbs.JBSModelFactory._modelLib[nodeName] ? eval("new " + Gef.jbs.JBSModelFactory._modelLib[nodeName] + "()") : null;
        nodeModel && this.decodeNodeModel(nodeModel, nodeDom, rootModel)
    },
    parseConnections: function($) {
        var _ = this.domMap[$.text];
        Gef.each(_.childNodes,
        function(_) {
            if (_.nodeName == "transition") this.parseConnection(_, $)
        },
        this)
    },
    parseConnection: function(A, _) {
        var B = new Gef.jbs.model.TransitionModel();
        B.decode(A);
        var $ = A.getAttribute("to"),
        C = this.modelMap[$];
        if (!C) {
            Gef.error("cannot find targetModel for sourceModel[" + _.text + "], to[" + $ + "]", "JBSDeserializer.parseConnection()");
            return
        }
        B.setSource(_);
        _.addOutgoingConnection(B);
        B.setTarget(C);
        C.addIncomingConnection(B);
        Gef.model.JpdlUtil.decodeConnectionPosition(B)
    }
});



Gef.jbs.figure.ShapeBaseFigure = Gef.extend(Gef.figure.RectFigure, {
    constructor: function($) {
        Gef.jbs.figure.ShapeBaseFigure.superclass.constructor.call(this, $);
        this.w = $.w;
        this.h = $.h;
        this.fill = $.fill;
        this.stroke = $.stroke;
        this.strokewide = $.strokewide;
        this.outputs = [];
        this.incomes = []
    },
    renderVml: function() {},
    renderVml0: function() {},
    renderSvg: function() {},
    renderSvg0: function($) {},
    moveToVml: function() {
        this.renderVml0(this.el)
    },
    moveToSvg: function(_, $) {
        this.renderSvg0(this.el)
    },
    updateVml: function() {
        this.renderVml0(this.el)
    },
    updateSvg: function() {
        this.renderSvg0(this.el)
    },
    getTools: function() {
        return []
    }
});
Gef.jbs.editpart.GenericEditPart = Gef.extend(Gef.gef.editparts.NodeEditPart, {
    _figureClassName: "Exception",
    _getFigureParam: function() {
        return ["x", "y", "w", "h"]
    },
    createFigure: function() {
        var model = this.getModel(),
        p = {},
        pk = this._getFigureParam();
        for (var i = 0; i < pk.length; i++) p[pk[i]] = this.model[pk[i]];
        p["name"] = this.model[pk["text"]];
        var figure = eval("new " + this._figureClassName + "(p)");
        figure.editPart = this;
        return figure
    },
    canResize: function() {
        return true
    }
});
Gef.jbs.editpart.ShapeBaseEditPart = Gef.extend(Gef.jbs.editpart.GenericEditPart, {
    _figureClassName: "Gef.jbs.figure.ShapeBaseFigure",
    _getFigureParam: function() {
        return ["x", "y", "w", "h", "fill", "stroke", "strokewide"]
    }
});


Gef.jbs.figure.GenericImageFigure = Gef.extend(Gef.figure.ImageNodeFigure, {
    constructor: function($) {
        Gef.jbs.figure.GenericImageFigure.superclass.constructor.call(this, $);
        //alert("cheng GenericImageFigure :"+$.w);
        this.w = $.w;
        this.h = $.h;
        this.url = $.url
    },
    update: function(B, A, $, _) {
        this.x = B;
        this.y = A;
        this.w = $;
        this.h = _;
        if (Gef.isVml) this.updateVml();
        else this.updateSvg()
    }
});
Gef.jbs.editpart.GenericImageEditPart = Gef.extend(Gef.jbs.editpart.GenericEditPart, {
    _figureClassName: "Gef.jbs.figure.GenericImageFigure",
    _getFigureParam: function() {
        return ["x", "y", "w", "h", "url"]
    }
});
Gef.jbs.JBSModelFactory.registerModel("image", "Gef.jbs.model.GenericImageModel");
Gef.jbs.JBSEditPartFactory.registerEditPart("image", "Gef.jbs.editpart.GenericImageEditPart");

Gef.jbs.figure.EllipseFigure = Gef.extend(Gef.jbs.figure.ShapeBaseFigure, {
    renderSvg: function() {
        var $ = document.createElementNS(Gef.svgns, "ellipse");
        this.renderSvg0($);
        this.el = $
    },
    renderSvg0: function($) {
        $.setAttribute("cx", this.x + this.w / 2 + "px");
        $.setAttribute("cy", this.y + this.h / 2 + "px");
        $.setAttribute("rx", this.w / 2 + "px");
        $.setAttribute("ry", this.h / 2 + "px");
        $.setAttribute("fill", this.fill ? this.fill: "none");
        $.setAttribute("stroke", this.stroke);
        $.setAttribute("stroke-width", this.strokewidth)
    },
    renderVml: function() {
        var $ = document.createElement("v:oval");
        this.renderVml0($);
        this.el = $
    },
    renderVml0: function($) {
        $.style.left = this.x + "px";
        $.style.top = this.y + "px";
        $.style.width = this.w + "px";
        $.style.height = this.h + "px";
        if (this.fill) $.setAttribute("fillcolor", this.fill);
        else $.setAttribute("filled", "false");
        $.setAttribute("strokecolor", this.stroke)
    }
});
Gef.jbs.editpart.EllipseEditPart = Gef.extend(Gef.jbs.editpart.ShapeBaseEditPart, {
    _figureClassName: "Gef.jbs.figure.EllipseFigure"
});
Gef.jbs.JBSModelFactory.registerModel("ellipse", "Gef.jbs.model.EllipseModel");
Gef.jbs.JBSEditPartFactory.registerEditPart("ellipse", "Gef.jbs.editpart.EllipseEditPart");



Gef.jbs.figure.RectFigure = Gef.extend(Gef.jbs.figure.ShapeBaseFigure, {
    constructor: function($) {
        Gef.jbs.figure.RectFigure.superclass.constructor.call(this, $);
        this.rounded = $.rounded
    },
    renderSvg: function() {
        var $ = document.createElementNS(Gef.svgns, "rect");
        this.renderSvg0($);
        this.el = $
    },
    renderSvg0: function($) {
        $.setAttribute("x", this.x + "px");
        $.setAttribute("y", this.y + "px");
        $.setAttribute("width", this.w + "px");
        $.setAttribute("height", this.h + "px");
        $.setAttribute("rx", this.rounded);
        $.setAttribute("ry", this.rounded);
        $.setAttribute("fill", this.fill ? this.fill: "none");
        $.setAttribute("stroke", this.stroke);
        $.setAttribute("stroke-width", this.strokewidth)
    },
    renderVml: function() {
        var $ = document.createElement("v:rect");
        this.renderVml0($);
        this.el = $
    },
    renderVml0: function($) {
        $.style.left = this.x + "px";
        $.style.top = this.y + "px";
        $.style.width = this.w + "px";
        $.style.height = this.h + "px";
        if (this.fill) $.fillcolor = this.fill;
        else $.filled = "false";
        $.strokecolor = this.stroke;
        $.strokeweight = this.strokewidth + "px"
    }
});
Gef.jbs.editpart.RectEditPart = Gef.extend(Gef.jbs.editpart.ShapeBaseEditPart, {
    _figureClassName: "Gef.jbs.figure.RectFigure",
    _getFigureParam: function() {
        return ["x", "y", "w", "h", "fill", "stroke", "strokewide", "rounded"]
    }
});
Gef.jbs.JBSModelFactory.registerModel("rect", "Gef.jbs.model.RectModel");
Gef.jbs.JBSEditPartFactory.registerEditPart("rect", "Gef.jbs.editpart.RectEditPart");
JobExecutor = function($) {
    this.replay = $;
    this.running = false
};
JobExecutor.prototype = {
    start: function() {
        if (this.running !== true) {
            this.running = true;
            this.tid = new Date().getTime();
            this.run(this.tid)
        }
    },
    run: function(C) {
        if (this.running !== true) return;
        if (C != this.tid) return;
        var $ = 0,
        A = Array.prototype.slice.call(this.replay.tokens, 0);
        for (var D = 0; D < A.length; D++) {
            var _ = A[D];
            if (_.status === "running") {
                $++;
                _.move()
            }
        }
        if ($ !== 0) {
            var B = this;
            setTimeout(function() {
                B.run(C)
            },
            100)
        } else {
            this.running = false;
            A = [];
            for (D = 0; D < this.replay.tokens.length; D++) {
                _ = this.replay.tokens[D];
                if (_.status !== "removed") A.push(_)
            }
            this.replay.tokens = A
        }
    }
};

///////////////////////////////////////////////////////
Node = function(A, $) {
    this.name = A.name;
    this.type = A.type;
    this.x = A.x;
    this.y = A.y;
    if (this.type === "start" || this.type === "end" || this.type === "end-error" || this.type === "end-cancel" || this.type === "decision" || this.type === "fork" || this.type === "join") {
        this.w = 48;
        this.h = 48
    } else {
        this.w = A.w;
        this.h = A.h
    }
    this.activity = A;
    this.replay = $;
    this.parent = [];
    this.children = [];
    var _ = this.replay.map[this.name];
    if (typeof _ !== "undefined") {
        if (_ !== this) throw new Error("node duplicated, name: " + this.name)
    } else this.replay.map[this.name] = this;
    if (!this.isCurrentActivity(this.name)) this.init()
};
Node.prototype = {
    init: function() {
        if (!this.hasHistory()) this.findTransitions()
    },
    createChildNode: function(B) {
        var A = B.name,
        $ = this.replay.map[B.name],
        _ = null;
        if (typeof $ !== "undefined") _ = $;
        else _ = new Node(B, this.replay);
        this.children.push(_);
        _.parent.push(this)
    },
    hasHistory: function() {
        var B = this.replay.historyActivities;
        for (var F = 0; F < B.length; F++) {
            var E = B[F];
            if (E.name === this.activity.name) {
                var A = E.t,
                _ = this.activity.ts;
                for (var C = 0; C < _.length; C++) {
                    var $ = _[C];
                    if ($.name === A) {
                        var D = this.findActivity($.to);
                        this.createChildNode(D);
                        return true
                    }
                }
            }
        }
        return false
    },
    findTransitions: function() {
        var _ = this.activity.ts;
        for (var C = 0; C < _.length; C++) {
            var $ = _[C],
            A = $.to,
            B = this.findActivity(A);
            this.createChildNode(B)
        }
    },
    findActivity: function(_) {
        var $ = this.replay.processDefinition;
        for (var B = 0; B < $.length; B++) {
            var A = $[B];
            if (A.name === _) return A
        }
    },
    isCurrentActivity: function(_) {
        var $ = this.replay.currentActivities;
        for (var B = 0; B < $.length; B++) {
            var A = $[B];
            if (A === _) return true
        }
        return false
    }
};
REPLAY_TOKEN_IMAGE = "user.png";
Replay = function($, A, _, B) {
    this.processDefinition = $;
    this.historyActivities = A;
    this.currentActivities = _;
    this.tokens = [];
    this.map = {};
    this.initialize();
    this.jobExecutor = new JobExecutor(this);
    this.parent = B
};
Replay.prototype = {
    initialize: function() {
        for (var A = 0; A < this.processDefinition.length; A++) {
            var _ = this.processDefinition[A];
            if (_.type === "start") {
                var $ = new Node(_, this);
                this.init = $;
                this.tokens.push(new Token($, this, this.parent));
                break
            }
        }
    },
    notify: function(_) {
        if (_ !== 0) {
            var A = Array.prototype.slice.call(this.tokens, 0);
            for (var B = 0; B < A.length; B++) {
                var $ = A[B];
                if ($.startMove(_) === true) this.jobExecutor.start()
            }
        }
    },
    prev: function() {
        this.notify( - 1)
    },
    next: function() {
        this.notify(1)
    },
    replay: function() {
        this.destoryToken();
        this.tokens = [new Token(this.init, this, this.parent)];
        this.notify(this.processDefinition.length)
    },
    destoryToken: function() {
        this.jobExecutor.running = false;
        for (var _ = 0; _ < this.tokens.length; _++) {
            var $ = this.tokens[_];
            $.destroy()
        }
        delete this.tokens
    }
};
Token = function(_, $, A) {
    this.replay = $;
    this.src = _;
    this.status = "prepare";
    this.future = 0;
    this.forkIndex = 0;
    this.step = 10;
    this.parent = A
};
Token.prototype = {
    init: function() {
        this.x = this.src.x + this.src.w / 2 - 10;
        this.y = this.src.y + this.src.h / 2 - 10;
        if (this.status === "prepare") {
            this.status = "waiting";
            this.createImage()
        }
    },
    createImage: function() {
        var $ = document.createElement("img");
        this.parent.appendChild($);
        $.style.position = "absolute";
        $.src = REPLAY_TOKEN_IMAGE;
        $.style.left = this.x + "px";
        $.style.top = this.y + "px";
        this.dom = $
    },
    findNext: function() {
        return this.src.children
    },
    findPrev: function() {
        return this.src.parent
    },
    startMove: function(B) {
        if (B === 0) return false;
        if (this.status === "waiting" || this.status === "prepare") {
            var A = B > 0 ? this.findNext() : this.findPrev();
            if (A.length === 0) {
                this.future = 0;
                return false
            }
            for (var C = 0; C < A.length; C++) {
                var $ = A[C],
                _ = this;
                if (C !== 0) {
                    _ = new Token(this.src, replay, this.parent);
                    this.replay.tokens.push(_)
                }
                _.forkIndex = this.forkIndex + C;
                _.prepare($, B)
            }
            return true
        } else {
            this.future += B;
            return false
        }
    },
    prepare: function($, _) {
        this.init();
        this.dest = $;
        this.future = _;
        this.status = "running";
        this.step = 0;
        this.calculatePoints()
    },
    calculatePoints: function() {
        var H = this.src.x + this.src.w / 2 - 10,
        A = this.src.y + this.src.h / 2 - 10,
        E = this.dest.x + this.dest.w / 2 - 10,
        B = this.dest.y + this.dest.h / 2 - 10;
        this.points = [[H, A]];
        var D = this.findTransition();
        if (D.length == 0) {
            var $ = (E - H) / 10,
            _ = (B - A) / 10;
            for (var G = 0; G < 10; G++) this.points.push([H + $ * (G + 1), A + _ * (G + 1)])
        } else if (D.length == 1) {
            var F = D[0][0] - 10,
            C = D[0][1] - 10,
            $ = (F - H) / 5,
            _ = (C - A) / 5;
            for (G = 0; G < 5; G++) this.points.push([H + $ * (G + 1), A + _ * (G + 1)]);
            $ = (E - F) / 5;
            _ = (B - C) / 5;
            for (G = 0; G < 5; G++) this.points.push([F + $ * (G + 1), C + _ * (G + 1)])
        }
    },
    findTransition: function() {
        var $ = null;
        if (this.future > 0) $ = this.findTransitionByParent();
        else if (this.future < 0) $ = this.findTransitionByChild();
        if (!$) $ = [];
        return $
    },
    findTransitionByParent: function() {
        for (var B = 0; B < this.dest.parent.length; B++) {
            var _ = this.dest.parent[B];
            if (this.src == _) for (var A = 0; A < _.activity.ts.length; A++) {
                var $ = _.activity.ts[A];
                if ($.to == this.dest.activity.name) return $.g
            }
        }
        return null
    },
    findTransitionByChild: function() {
        for (var C = 0; C < this.dest.children.length; C++) {
            var A = this.dest.children[C];
            if (this.src == A) for (var B = 0; B < this.dest.activity.ts.length; B++) {
                var _ = this.dest.activity.ts[B];
                if (_.to == A.activity.name) {
                    if (!_.g) return null;
                    var $ = [];
                    for (C = _.g.length - 1; C >= 0; C--) $.push(_.g[C]);
                    return $
                }
            }
        }
        return null
    },
    move: function() {
        this.step++;
        if (this.step > 10) {
            if (this.future !== 0) if (this.future > 0) this.future--;
            else this.future++;
            var $ = this.dest;
            if (this.forkIndex > 0) if ($.type == "fork" || $.type == "join") {
                this.destroy();
                return
            }
            this.src = $;
            this.init();
            this.status = "waiting";
            this.startMove(this.future)
        } else {
            this.dom.style.left = this.points[this.step][0] + "px";
            this.dom.style.top = this.points[this.step][1] + "px"
        }
    },
    destroy: function() {
        if (typeof this.dom !== "undefined") {
            document.body.removeChild(this.dom);
            delete this.dom
        }
        this.status = "removed"
    }
};


