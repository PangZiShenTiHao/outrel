
//���� ���Ķ���
function createCore(_) {
    var $ = {
        svgns: "http://www.w3.org/2000/svg",
        linkns: "http://www.w3.org/1999/xlink",
        vmlns: "urn:schemas-microsoft-com:vml",
        officens: "urn:schemas-microsoft-com:office:office",
        emptyFn: function() {},
        emptyArray: [],
        emptyMap: {},
        devMode: true,
        installVml: function() {
            if ($.isVml) {
                document.attachEvent("onreadystatechange",
                function() {
                    var _ = document;
                    if (_.readyState == "complete") {
                        if (!_.namespaces["v"]) _.namespaces.add("v", $.vmlns);
                        if (!_.namespaces["o"]) _.namespaces.add("o", $.officens)
                    }
                });
                var _ = document.createStyleSheet();
                _.cssText = "v\\:*{behavior:url(#default#VML)}" + "o\\:*{behavior:url(#default#VML)}"
            }
        },
        seed: 0,
        id: function() {
            if (!_) return "_INNER_" + this.seed++;
            else return "_" + _ + "_" + this.seed++
        },
        onReady: function($) {
            window.onload = function() {
                $()
            }
        },
        error: function(A, B) {
            if ($.devMode !== true) return;
            if ($.isVml) {
                var C = (B ? B: "") + "\n";
                for (var _ in A) C += _ + ":" + A[_] + "\n";
                $.debug(C)
            }
        },
        debug: function() {
            if (!$.debugDiv) {
                var A = document.createElement("div");
                A.style.position = "absolute";
                A.style.left = "50px";
                A.style.top = "50px";
                document.body.appendChild(A);
                var B = document.createElement("textarea");
                B.rows = 10;
                B.rols = 40;
                A.appendChild(B);
                var C = document.createElement("button");
                C.innerHTML = "close";
                C.onclick = function() {
                    A.style.display = "none"
                };
                A.appendChild(C);
                $.debugDiv = A;
                $.debugTextArea = B
            }
            var _ = "";
            for (var D = 0; D < arguments.length; D++) _ += "," + arguments[D];
            $.debugTextArea.value += "\n" + _;
            $.debugDiv.style.display = ""
        },
        getInt: function($) {
            $ += "";
            $ = $.replace(/px/, "");
            var _ = parseInt($, 10);
            return isNaN(_) ? 0 : _
        },
        extend: function() {
            var A = function($) {
                for (var _ in $) this[_] = $[_]
            },
            _ = Object.prototype.constructor;
            return function(F, E, D) {
                if (typeof E == "object") {
                    D = E;
                    E = F;
                    F = D.constructor != _ ? D.constructor: function() {
                        E.apply(this, arguments)
                    }
                }
                var B = function() {},
                C,
                G = E.prototype;
                B.prototype = G;
                C = F.prototype = new B();
                C.constructor = F;
                F.superclass = G;
                if (G.constructor == _) G.constructor = E;
                C.override = A;
                $.override(F, D);
                return F
            }
        } (),
        override: function(C, _) {
            if (_) {
                var A = C.prototype;
                for (var B in _) A[B] = _[B];
                if ($.isIE && _.toString != C.toString) A.toString = _.toString
            }
        },
        ns: function() {
            for (var E = 0; E < arguments.length; E++) {
                var _ = arguments[E],
                A = _.split("."),
                C = window[A[0]] = window[A[0]] || {},
                $ = A.slice(1);
                for (var D = 0; D < $.length; D++) {
                    var B = $[D];
                    C = C[B] = C[B] || {}
                }
            }
            return C
        },
        apply: function(C, A, _) {
            if (_) $.apply(C, _);
            if (C && A && typeof A == "object") for (var B in A) C[B] = A[B];
            return C
        },
        applyIf: function(A, $) {
            if (A && $) for (var _ in $) if (typeof A[_] == "undefined") A[_] = $[_];
            return A
        },
        join: function(v_obj) {
            var new_obj = "";
            for (var k = 0; k < v_obj.length; k++) new_obj += v_obj[k];
            return new_obj
        },
        getTextSize: function(A) {
            if (!$.textDiv) {
                $.textDiv = document.createElement("div");
                $.textDiv.style.position = "absolute";
                $.textDiv.style.fontFamily = "Verdana";
                $.textDiv.style.fontSize = "12px";
                $.textDiv.style.left = "-1000px";
                $.textDiv.style.top = "-1000px";
                document.body.appendChild($.textDiv)
            }
            var B = $.textDiv;
            B.innerHTML = A;
            //alert("cheng 148 :"+A);
            var v_obj = {
                w: Math.max(B.offsetWidth, B.clientWidth),
                h: Math.max(B.offsetHeight, B.clientHeight)
            };
            return v_obj
        },
        notBlank: function($) {
            if (typeof $ == "undefined") return false;
            else if (typeof $ == "string" && $.trim().length == 0) return false;
            return true
        },
        safe: function($) {
            if ($) return $.trim();
            else return ""
        },
        get: function($) {
            return document.getElementById($)
        },
        value: function(_, B) {
            var A = $.get(_);
            if (typeof B != "undefined") A.value = $.safe(B);
            return $.safe(A.value)
        },
        each: function(C, A, $) {
            if (typeof C.length == "undefined" || typeof C == "string") C = [C];
            for (var B = 0, k = C.length; B < k; B++) if (A.call($ || C[B], C[B], B, C) === false) return B
        },
        showMessage: function(_, $) {
            alert($)
        },
        isEmpty: function($) {
            if (typeof $ == "undefined") return true;
            if ($ == null) return true;
            if (typeof $.length != "undefined" && $.length == 0) return true;
            return false
        },
        notEmpty: function($) {
            return ! this.isEmpty($)
        }
    };
    
    //���� js �հ�
    (function() {
        var F = navigator.userAgent.toLowerCase(),
        E = F.indexOf("opera") > -1,
        B = (/webkit|khtml/).test(F),
        H = !E && F.indexOf("msie") > -1,
        _ = !E && F.indexOf("msie 7") > -1,
        A = !E && F.indexOf("msie 8") > -1,
        D = !B && F.indexOf("gecko") > -1,
        C = H || _ || A,
        G = !C;
        $.isSafari = B;
        $.isIE = H;
        $.isIE7 = _;
        $.isGecko = D;
        $.isVml = C;
        $.isSvg = G;
        if (C) $.installVml();
        $.applyIf(Array.prototype, {
            indexOf: function($) {
                for (var A = 0, _ = this.length; A < _; A++) if (this[A] === $) return A;
                return - 1
            },
            remove: function(_) {
                var $ = this.indexOf(_);
                if ($ != -1) this.splice($, 1);
                return this
            }
        });
        String.prototype.trim = function() {
            var $ = /^\s+|\s+$/g;
            return function() {
                return this.replace($, "")
            }
        } ()
    })();
    return $
}