
Gef.ns("Gef.model");
Gef.model.Model = Gef.extend(Object, {
    constructor: function($) {
        this.listeners = [];
        $ = $ ? $: {};
        Gef.apply(this, $);
        this.createDom()
    },
    createDom: function() {
        this.dom = new Gef.model.Dom(this.getTagName())
    },
    getTagName: function() {
        return this.type
    },
    addChangeListener: function($) {
        this.listeners.push($)
    },
    removeChangeListener: function($) {
        this.listeners.remove($)
    },
    notify: function($, _) {
        for (var A = 0; A < this.listeners.length; A++) this.listeners[A].notifyChanged($, _)
    },
    getId: function() {
        if (this.id == null) this.id = Gef.id();
        return this.id
    },
    getType: function() {
        if (this.type == null) this.type = "node";
        return this.type
    },
    getEditPart: function() {
        return this.editPart
    },
    setEditPart: function($) {
        this.editPart = $
    }
});
Gef.ns("Gef.model");
Gef.model.ModelChangeListener = Gef.extend(Object, {
    notifyChanged: Gef.emptyFn
});

//定义基本的 节点模型
Gef.ns("Gef.model");
Gef.model.NodeModel = Gef.extend(Gef.model.Model, {
    CHILD_ADDED: "CHILD_ADDED",
    NODE_MOVED: "NODE_MOVED",
    NODE_RESIZED: "NODE_RESIZED",
    TEXT_UPDATED: "TEXT_UPDATED",
    CONNECTION_SOURCE_ADDED: "CONNECTION_SOURCE_ADDED",
    CONNECTION_TARGET_ADDED: "CONNECTION_TARGET_ADDED",
    CHILD_REMOVED_FROM_PARENT: "CHILD_REMOVED_FROM_PARENT",
    constructor: function($) {
        this.text = "untitled";
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.children = [];
        this.outgoingConnections = [];
        this.incomingConnections = [];
        Gef.model.NodeModel.superclass.constructor.call(this, $)
    },
    getText: function() {
        return this.text
    },
    setParent: function($) {
        this.parent = $
    },
    getParent: function() {
        return this.parent
    },
    setChildren: function($) {
        this.children = $
    },
    getChildren: function() {
        return this.children
    },
    addChild: function($) {
        this.children.push($);
        $.setParent(this);
        this.notify(this.CHILD_ADDED, $)
    },
    removeChild: function($) {
        this.children.remove($);
        $.setParent(null);
        $.notify("CHILD_REMOVED_FROM_PARENT", $)
    },
    getOutgoingConnections: function() {
        return this.outgoingConnections
    },
    getIncomingConnections: function() {
        return this.incomingConnections
    },
    addOutgoingConnection: function($) {
        if ($.getSource() == this && this.outgoingConnections.indexOf($) == -1) {
            this.outgoingConnections.push($);
            this.notify(this.CONNECTION_SOURCE_ADDED)
        }
    },
    addIncomingConnection: function($) {
        if ($.getTarget() == this && this.incomingConnections.indexOf($) == -1) {
            this.incomingConnections.push($);
            this.notify(this.CONNECTION_TARGET_ADDED)
        }
    },
    removeOutgoingConnection: function($) {
        if ($.getSource() == this && this.outgoingConnections.indexOf($) != -1) this.outgoingConnections.remove($)
    },
    removeIncomingConnection: function($) {
        if ($.getTarget() == this && this.incomingConnections.indexOf($) != -1) this.incomingConnections.remove($)
    },
    moveTo: function(_, $) {
        this.x = _;
        this.y = $;
        this.notify(this.NODE_MOVED)
    },
    resize: function(B, A, $, _) {
        this.x = B;
        this.y = A;
        this.w = $;
        this.h = _;
        this.notify(this.NODE_RESIZED)
    },
    updateText: function($) {
        this.text = $;
        this.notify(this.TEXT_UPDATED)
    },
    removeForParent: function() {
        if (!this.parent) return;
        this.parent.removeChild(this);
        this.notify(this.CHILD_REMOVED_FROM_PARENT)
    }
});
Gef.ns("Gef.model");
Gef.model.ConnectionModel = Gef.extend(Gef.model.Model, {
    RECONNECTED: "RECONNECTED",
    DISCONNECTED: "DISCONNECTED",
    CONNECTION_RESIZED: "CONNECTION_RESIZED",
    CONNECTION_TEXT_UPDATED: "CONNECTION_TEXT_UPDATED",
    TEXT_POSITION_UPDATED: "TEXT_POSITION_UPDATED",
    SOURCE_CHANGED: "SOURCE_CHANGED",
    TARGET_CHANGED: "TARGET_CHANGED",
    constructor: function($) {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.text = "untitled";
        this.textX = 0;
        this.textY = 0;
        this.innerPoints = [];
        Gef.model.ConnectionModel.superclass.constructor.call(this, $)
    },
    getText: function() {
        return this.text
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
    reconnect: function() {
        this.notify(this.RECONNECTED);
        this.source.addOutgoingConnection(this);
        this.target.addIncomingConnection(this)
    },
    disconnect: function() {
        this.notify(this.DISCONNECTED);
        this.source.removeOutgoingConnection(this);
        this.target.removeIncomingConnection(this)
    },
    resizeConnection: function($) {
        this.innerPoints = $;
        this.notify(this.CONNECTION_RESIZED)
    },
    updateText: function($) {
        this.text = $;
        this.notify(this.CONNECTION_TEXT_UPDATED)
    },
    updateTextPosition: function(_, $) {
        this.textX = _;
        this.textY = $;
        this.notify(this.TEXT_POSITION_UPDATED)
    },
    changeSource: function($) {
        var _ = this.source;
        this.source = $;
        $.addOutgoingConnection(this);
        _.removeOutgoingConnection(this);
        this.notify(this.SOURCE_CHANGED, {
            newSource: $,
            oldSource: _
        })
    },
    changeTarget: function(_) {
        var $ = this.target;
        this.target = _;
        _.addIncomingConnection(this);
        $.removeIncomingConnection(this);
        this.notify(this.TARGET_CHANGED, {
            newTarget: _,
            oldTarget: $
        })
    }
});

//定义dom 
Gef.ns("Gef.model");
Gef.model.Dom = Gef.extend(Object, {
    constructor: function($) {
        if (typeof $ != "string" || Gef.isEmpty($)) {
            alert("Dom must specify a exist tagName");
            return
        }
        this.tagName = $;
        this.value = null;
        this.parent = null;
        this.step = "";
        this.attributes = {};
        this.elements = []
    },
    setAttribute: function(_att, _val) {
    //如果该属性有值则添加值，没有则移除该属性
        if (Gef.notEmpty(_val)) this.attributes[_att] = _val;
        else this.removeAttribute(_att)
    },
    removeAttribute: function(_att) {
        delete this.attributes[_att]
    },
    hasAttribute: function(_att) {
        var _val = this.attributes[_att];
        return Gef.notEmpty(_val)
    },
    getAttribute: function(_att) {
        if (this.hasAttribute(_att)) return this.attributes[_att];
        else return ""
    },
    addElement: function(_att) {
        _att.updateStep(this.step);
        this.elements.push(_att)
    },
    removeElement: function(_att) {
        this.elements.remove(_att)
    },
    getElementContent: function(_) {
        var $ = this.getElementByTagName(_);
        if ($) return $.value;
        else return ""
    },
    setElementContent: function(_, A) {
        var $ = this.getElementByTagName(_);
        if ($) {
            if (Gef.notEmpty(A)) $.value = A;
            else this.elements.remove($)
        } else if (Gef.notEmpty(A)) {
            $ = new Gef.model.Dom(_);
            $.value = A;
            this.addElement($)
        }
    },
    getElementAttribute: function(_, A) {
        var $ = this.getElementByTagName(_);
        if ($ && $.hasAttribute(A)) return $.getAttribute(A);
        else return ""
    },
    setElementAttribute: function(_, B, A) {
        var $ = this.getElementByTagName(_);
        if ($) $.setAttribute(B, A);
        else {
            $ = new Gef.model.Dom(_);
            $.setAttribute(B, A);
            this.addElement($)
        }
    },
    getElementByTagName: function(_) {
        for (var A = 0; A < this.elements.length; A++) {
            var $ = this.elements[A];
            if ($.tagName == _) return $
        }
        return null
    },
    getElementsByTagName: function(_) {
        var A = [];
        for (var B = 0; B < this.elements.length; B++) {
            var $ = this.elements[B];
            if ($.tagName == _) A.push($)
        }
        return A
    },
    getProperty: function($, A) {
        var _ = "",
        B = this.getElementsByTagName("property");
        Gef.each(B,
        function(B) {
            if (B.getAttribute("name") == $) {
                Gef.each(B.elements,
                function($) {
                    if (A == "boolean") _ = ($.tagName === "true");
                    else if (A == $.tagName) _ = $.getAttribute("value");
                    return false
                });
                return false
            }
        });
        return _
    },
    setProperty: function(B, C, D) {
        if (Gef.isEmpty(C)) return;
        var F = false,
        _ = null,
        E = this.getElementsByTagName("property");
        Gef.each(E,
        function($) {
            if ($.getAttribute("name") == B) {
                _ = $;
                return false
            }
        });
        if (_ == null) {
            _ = new Gef.model.Dom("property");
            _.setAttribute("name", B);
            this.addElement(_)
        }
        if (D == "boolean") {
            for (var G = _.elements.length - 1; G >= 0; G--) {
                var $ = _.elements[G];
                _.elements.remove($)
            }
            var A = (C == true) ? "true": "false";
            _.addElement(new Gef.model.Dom(A))
        } else _.setElementAttribute(D, "value", C)
    },
    removeProperty: function($) {
        var _ = this.getElementsByTagName("property");
        Gef.each(_,
        function(_) {
            if (_.getAttribute("name") == $) {
                this.elements.remove(_);
                return false
            }
        },
        this)
    },
    updateStep: function($) {
        for (var _ = 0; _ < $.length + 2; _++) this.step += " "
    },
    encode: function(C, A) {
    	//将 json数据 （节点）转换成 xml
        if (Gef.notEmpty(this.value) && (Gef.notEmpty(C) || Gef.notEmpty(this.elements))) {
            alert("can not set insert xml into TextNode");
            return
        }
        if (Gef.isEmpty(C)) C = "";
        var E = A ? A: "";
        A = E + this.step;
        //alert("cheng encode:"+this.tagName);
        var Darry = [A, "<", this.tagName];
        for (var F in this.attributes) {
            var B = this.attributes[F];
            Darry.push(" ", F, "='", this.encodeText(B), "'")
        }
        if (Gef.isEmpty(this.elements) && Gef.isEmpty(C) && Gef.isEmpty(this.value)){
         Darry.push("/>");
        }else if (Gef.notEmpty(this.value)){
         Darry.push(">", this.encodeText(this.value), "</", this.tagName, ">");
        }else {
            Darry.push(">\n");
            for (var G = 0; G < this.elements.length; G++) {
                var _ = this.elements[G],
                $ = _.encode("", E);
                Darry.push($)
            }
            Darry.push(C);
            Darry.push(A, "</", this.tagName, ">")
        }
        Darry.push("\n");
        return Darry.join("")
    },
    encodeText: function($) {
        if (typeof $ != "") $ += "";
        return $.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;")
    },
    // 将 xml 文件格式 转换成 json
    decode: function($obj, C) {
        C = C ? C: [];
        if (typeof $obj == "string") {
            var A = Gef.model.XmlUtil.readXml(xml);
            $obj = A.documentElement
        }
        
        this.tagName = $obj.nodeName;
        for (var F = 0; F < $obj.attributes.length; F++) {
            var D = $obj.attributes[F];
            if("process" == $obj.nodeName){
            	//alert("cheng $obj.nodeName:"+D.name+":"+D.nodeValue);
            }
            this.setAttribute(D.name, D.nodeValue)
        }
        if ($obj.childNodes.length == 1 && $obj.childNodes[0].nodeType == 3){
         this.value = $obj.childNodes[0].nodeValue;
        }else {
            var E = Gef.model.XmlUtil.elements($obj);
            for (F = 0; F < E.length; F++) {
                var _val = E[F];
                if (C.indexOf(_val.tagName) != -1) continue;
                var B = new Gef.model.Dom("node");
                B.decode(_val);
                this.addElement(B)
            }
        }
    }
});
Gef.ns("Gef.model");
Gef.model.XmlUtil = {
    readXml: function(_val) {
        var $ = null;
        if (typeof(DOMParser) == "undefined") {
            $ = new ActiveXObject("Microsoft.XMLDOM");
            $.async = "false";
            $.loadXML(_val)
        } else {
            var A = new DOMParser();
            $ = A.parseFromString(_val, "application/xml");
            A = null
        }
        //alert("cheng Gef.model.XmlUtil :readXml :"+_val+":end");
        if ($.documentElement == null){
         alert("import error");
        }else if ($.documentElement.tagName == "parsererror"){
         alert("import error: " + $.documentElement.firstChild.textContent);
        }else{
         return $
        }
    },
    elements: function($) {
        var myArrayList = [];
        for (var B = 0; B < $.childNodes.length; B++) {
            var _val = $.childNodes[B];
            if (_val.nodeType != 3 && _val.nodeType != 8) myArrayList.push(_val)
        }
        return myArrayList
    },
    decode: function(_val) {
        var $ = new Gef.model.Dom("node");
        $.decode(_val);
        return $
    }
};


Gef.ns("Gef.model");
Gef.model.JpdlUtil = {
	//解析节点的坐标位置 大小
    decodeNodePosition: function(_) {
        var $ = _.dom.getAttribute("g"),
        A = $.split(",");
        //alert("cheng A[2]:"+parseInt(A[2], 10));
        _.x = parseInt(A[0], 10);
        _.y = parseInt(A[1], 10);
        _.w = parseInt(A[2], 10);
        _.h = parseInt(A[3], 10)
    },
    decodeConnectionPosition: function(D) {
        var $ = D.dom.getAttribute("g");
        if (!$) return;
        var C = $,
        A = $.split(":");
        if ($.indexOf(":") != -1) {
            C = A[1];
            if (A[0].length > 0) {
                var E = A[0].split(";"),
                B = [];
                Gef.each(E,
                function($) {
                    var _ = $.split(",");
                    B.push([parseInt(_[0], 10), parseInt(_[1], 10)])
                });
                D.innerPoints = B
            }
        } else C = $;
        var _ = C.split(",");
        D.textX = parseInt(_[0], 10);
        D.textY = parseInt(_[1], 10);
        this.decodeTextPosition(D)
    },
    decodeTextPosition: function(J) {
        var P = J.getSource(),
        K = new Geom.Rect(parseInt(P.x, 10), parseInt(P.y, 10), parseInt(P.w, 10), parseInt(P.h, 10)),
        N = J.getTarget(),
        I = new Geom.Rect(parseInt(N.x, 10), parseInt(N.y, 10), parseInt(N.w, 10), parseInt(N.h, 10)),
        $ = new Geom.Line(parseInt(K.x, 10) + parseInt(K.w, 10) / 2, parseInt(K.y, 10) + parseInt(K.h, 10) / 2, parseInt(I.x, 10) + parseInt(I.w, 10) / 2, parseInt(I.y, 10) + parseInt(I.h, 10) / 2),
        E = K.getCrossPoint($),
        C = I.getCrossPoint($);
        if ((!E) || (!C)) return;
        var L = (E.x + C.x) / 2,
        B = (E.y + C.y) / 2;
        if (J.innerPoints.length > 0) {
            var A = J.innerPoints[0],
            _ = J.innerPoints[J.innerPoints.length - 1],
            O = [];
            O.push([E.x, E.y]);
            Gef.each(J.innerPoints,
            function($) {
                O.push([$[0], $[1]])
            });
            O.push([C.x, C.y]);
            var G = O.length,
            F = 0,
            D = 0;
            if ((G % 2) == 0) {
                var H = O[G / 2 - 1],
                M = O[G / 2];
                F = (H[0] + M[0]) / 2;
                D = (H[1] + M[1]) / 2
            } else {
                F = O[(G - 1) / 2][0];
                D = O[(G - 1) / 2][1]
            }
            var R = parseInt(J.textX + L - F, 10),
            Q = parseInt(J.textY + B - D, 10);
            J.textX -= L - F;
            J.textY -= B - D
        }
    },
    encodeNodePosition: function($) {
        $.dom.setAttribute("g", $.x + "," + $.y + "," + $.w + "," + $.h)
    },
    encodeConnectionPosition: function(_) {
        var $ = [];
        Gef.each(_.innerPoints,
        function(B, A) {
            $.push(parseInt(B[0], 10), ",", parseInt(B[1], 10));
            if (A != _.innerPoints.length - 1) $.push(";")
        });
        $.push(this.encodeTextPosition(_));
        return $.join("")
    },
    encodeTextPosition: function(J) {
    //var P = J.getSource();
    //alert(P.y+" cheng  encodeTextPosition :"+P.x);
        var P = J.getSource(),
        K = new Geom.Rect(parseInt(P.x, 10), parseInt(P.y, 10), parseInt(P.w, 10), parseInt(P.h, 10)),
        N = J.getTarget(),
        I = new Geom.Rect(parseInt(N.x, 10), parseInt(N.y, 10), parseInt(N.w, 10), parseInt(N.h, 10)),
        $ = new Geom.Line(parseInt(K.x, 10) + parseInt(K.w, 10) / 2, parseInt(K.y, 10) + parseInt(K.h, 10) / 2, parseInt(I.x, 10) + parseInt(I.w, 10) / 2, parseInt(I.y, 10) + parseInt(I.h, 10) / 2),
        E = K.getCrossPoint($),
        C = I.getCrossPoint($);
        if ((!E) || (!C)) return;
        var L = (E.x + C.x) / 2,
        B = (E.y + C.y) / 2;
        if (J.innerPoints.length > 0) {
            var A = J.innerPoints[0],
            _ = J.innerPoints[J.innerPoints.length - 1],
            O = [];
            O.push([E.x, E.y]);
            Gef.each(J.innerPoints,
            function($) {
                O.push([$[0], $[1]])
            });
            O.push([C.x, C.y]);
            var G = O.length,
            F = 0,
            D = 0;
            if ((G % 2) == 0) {
                var H = O[G / 2 - 1],
                M = O[G / 2];
                F = (H[0] + M[0]) / 2;
                D = (H[1] + M[1]) / 2
            } else {
                F = O[(G - 1) / 2][0];
                D = O[(G - 1) / 2][1]
            }
            var R = parseInt(J.textX + L - F, 10),
            Q = parseInt(J.textY + B - D, 10);
            return ":" + R + "," + Q
        } else if (J.textX != 0 && J.textY != 0) return parseInt(J.textX, 10) + "," + parseInt(J.textY, 10);
        else return ""
    }
};


///////////////////////////////////////////////////////////////

//流程信息
Gef.ns("Gef.jbs.model");
Gef.jbs.model.ProcessModel = Gef.extend(Gef.model.NodeModel, {
    type: "process",
    encode: function($) {
        var _ = "";
        Gef.each(this.children,
        function($) {
            _ += $.encode("", "  ")
        });
        this.dom.tagName = "process";
        this.dom.removeAttribute("version");
        this.dom.setAttribute("version",this.procVerName);
        this.dom.setAttribute("name", this.procDefName);
        this.dom.setAttribute("key", this.procDefCode);
        //alert("cheng model.js encode 导出xml");
        this.dom.setAttribute("xmlns", "http://jbpm.org/4.4/jpdl");
        return this.dom.encode(_);
    },
    decode: function($, _obj) {
        this.dom.decode($, _obj);
        //alert("cheng model.js decode xml解析" + this.dom.getAttribute("name"));
        this.procDefName= this.dom.getAttribute("name");
        this.procCatName = Gef.PROCESS_BIZ_FILE;
        this.procVerName= this.dom.getAttribute("version");//Gef.PROCESS_VERSION;
        this.procDefCode=this.dom.getAttribute("key");
        
        //this.text = Gef.PROCESS_NAME;
        this.text = this.dom.getAttribute("name");
        //this.dom.removeAttribute("version");
        //this.dom.setAttribute("name", Gef.PROCESS_NAME);
        //this.dom.setAttribute("key", Gef.PROCESS_KEY)
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.StartModel = Gef.extend(Gef.model.NodeModel, {
    type: "start",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
    	//alert(this.w+" cheng  StartModel :"+this.h);
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.EndModel = Gef.extend(Gef.model.NodeModel, {
    type: "end",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.CancelModel = Gef.extend(Gef.model.NodeModel, {
    type: "cancel",
    getTagName: function() {
        return "error-cancel"
    },
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.ErrorModel = Gef.extend(Gef.model.NodeModel, {
    type: "error",
    getTagName: function() {
        return "error-error"
    },
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.StateModel = Gef.extend(Gef.model.NodeModel, {
    type: "state",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.HqlModel = Gef.extend(Gef.model.NodeModel, {
    type: "hql",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.SqlModel = Gef.extend(Gef.model.NodeModel, {
    type: "sql",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.JavaModel = Gef.extend(Gef.model.NodeModel, {
    type: "java",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.ScriptModel = Gef.extend(Gef.model.NodeModel, {
    type: "script",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});

Gef.ns("Gef.jbs.model");
Gef.jbs.model.TaskModel = Gef.extend(Gef.model.NodeModel, {
    type: "task",
    encode: function(_val, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_val) {
            A += _val.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        //alert("cheng TaskModel encode" );
        //this.dom.setAttribute("class", "chengjavaClass");
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.DecisionModel = Gef.extend(Gef.model.NodeModel, {
    type: "decision",
    isValid: function() {
        var C = this.dom.getAttribute("expr");
        if (typeof C != "undefined" && C != null && C != "") return true;
        var E = this.dom.getElementAttribute("handler", "class");
        if (typeof E != "undefined" && E != null && E != "") return true;
        var A = 0;
        Gef.each(this.getOutgoingConnections(),
        function($) {
            if (Gef.notEmpty($.dom.getElementAttribute("condition", "expr"))) A++
        });
        var B = this.getOutgoingConnections().length,
        _ = false;
        if (A == 0) Ext.Msg.alert("\u63d0\u793a", "[" + this.text + "]\u9700\u8981\u4e3a\u8fde\u7ebf\u914d\u7f6e\u6761\u4ef6");
        else if (B - A > 1) Ext.Msg.alert("\u63d0\u793a", "[" + this.text + "]\u540e\u53ea\u80fd\u6709\u4e00\u6761\u65e0\u6761\u4ef6\u5916\u5411\u8fde\u7ebf");
        else {
            if (B - A == 1) {
                var D = 0;
                Gef.each(this.getOutgoingConnections(),
                function(_, $) {
                    if (Gef.isEmpty(_.condition)) {
                        D = $;
                        return false
                    }
                });
                var $ = this.getOutgoingConnections().splice(D, 1);
                this.getOutgoingConnections().push($[0])
            }
            _ = true
        }
        return _
    },
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.ForkModel = Gef.extend(Gef.model.NodeModel, {
    type: "fork",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.JoinModel = Gef.extend(Gef.model.NodeModel, {
    type: "join",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    },
    isValid: function() {
        var $ = this.dom.getAttribute("multiplicity");
        if (typeof $ != "undefined" && $ != "" && $ < 1) {
            Ext.Msg.alert("\u4fe1\u606f", "[" + this.text + "]\u6c47\u805a\u6570\u76ee\u5fc5\u987b\u5927\u4e8e\u96f6");
            return false
        }
        return true
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.CustomModel = Gef.extend(Gef.model.NodeModel, {
    type: "custom",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.MailModel = Gef.extend(Gef.model.NodeModel, {
    type: "mail",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.SubProcessModel = Gef.extend(Gef.model.NodeModel, {
    type: "subProcess",
    getTagName: function() {
        return "sub-process"
    },
    encode: function(_, $) {
        var A = "";
        //alert("cheng:SubProcessModel encode");
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name");
        //alert("cheng:SubProcessModel decode :"+this.text);
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.GroupModel = Gef.extend(Gef.model.NodeModel, {
    type: "group",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.TransitionModel = Gef.extend(Gef.model.ConnectionModel, {
    type: "transition",
    encode: function(_, $) {
        this.dom.setAttribute("name", this.text);
        this.dom.setAttribute("g", Gef.model.JpdlUtil.encodeConnectionPosition(this));
        this.dom.setAttribute("to", this.target.text);
        return this.dom.encode("", $)
    },
    decode: function($, A) {
        this.dom.decode($, A);
        this.text = this.dom.getAttribute("name");
        var _ = this.dom.getElementAttribute("condition", "expr")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.JmsModel = Gef.extend(Gef.model.NodeModel, {
    type: "jms",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.RuleDecisionModel = Gef.extend(Gef.model.NodeModel, {
    type: "ruleDecision",
    getTagName: function() {
        return "rule-decision"
    },
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.RulesModel = Gef.extend(Gef.model.NodeModel, {
    type: "rules",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.AutoModel = Gef.extend(Gef.model.NodeModel, {
    type: "auto",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.HumanModel = Gef.extend(Gef.model.NodeModel, {
    type: "human",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.CounterSignModel = Gef.extend(Gef.model.NodeModel, {
    type: "counter-sign",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});
Gef.ns("Gef.jbs.model");
Gef.jbs.model.ForeachModel = Gef.extend(Gef.model.NodeModel, {
    type: "foreach",
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name")
    }
});

///////////////////////////////////////////////////////////


Gef.jbs.model.ShapeBaseModel = Gef.extend(Gef.model.NodeModel, {
    fill: "",
    stroke: "black",
    strokewide: 1,
    isValid: function() {
        return true
    },
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name");
        this.fill = this.dom.getAttribute("fill") || "";
        this.stroke = this.dom.getAttribute("stroke") || "black";
        this.strokewide = this.dom.getAttribute("strokewide") || 1
    }
});



//////////////////////////////////////////////////////

Gef.jbs.model.GenericImageModel = Gef.extend(Gef.model.NodeModel, {
    type: "image",
    isValid: function() {
        return true
    },
    encode: function(_, $) {
        var A = "";
        Gef.each(this.outgoingConnections,
        function(_) {
            A += _.encode("", $ + "  ")
        });
        Gef.model.JpdlUtil.encodeNodePosition(this);
        this.dom.setAttribute("name", this.text);
        this.dom.setAttribute("url", this.text);
        return this.dom.encode(A, $)
    },
    decode: function($, _) {
        this.dom.decode($, _);
        this.text = this.dom.getAttribute("name");
        this.url = this.dom.getAttribute("url") || this.url
    }
});

//////////////////////////////////////////////////////////////


Gef.jbs.model.EllipseModel = Gef.extend(Gef.jbs.model.ShapeBaseModel, {
    type: "ellipse"
});

Gef.jbs.model.RectModel = Gef.extend(Gef.jbs.model.ShapeBaseModel, {
    type: "rect",
    rounded: 0,
    encode: function(_, $) {
        this.dom.setAttribute("rounded", this.rounded);
        return Gef.jbs.model.RectModel.superclass.encode.call(this, _, $)
    },
    decode: function($, _) {
        Gef.jbs.model.RectModel.superclass.decode.call(this, $, _);
        this.rounded = this.dom.getAttribute("rounded") || 0
    }
});
