function Ueditor(ueStructure, ueName, container) {
    this.ueStructure = ueStructure;
    this.ueName = ueName;
    this.container = container || $("body");
    this.init();
}
Ueditor.prototype = {
    constructor: Ueditor,
    init: function () {
        var that = this;
        that.defaultUploadURL = that.ueStructure.defaultUploadURL || "";
        that.uploadImageURL = that.ueStructure.uploadImageURL || that.defaultUploadURL;
        that.catchImageURL = that.ueStructure.catchImageURL || that.defaultUploadURL;
        that.uploadScrawlURL = that.ueStructure.uploadScrawlURL || that.defaultUploadURL;
        that.uploadVideoURL = that.ueStructure.uploadVideoURL || that.defaultUploadURL;
        that.uploadFileURL = that.ueStructure.uploadFileURL || that.defaultUploadURL;
        that.width = that.ueStructure.width || "800px";
        that.height = that.ueStructure.height || "450px";
        that.isInitData = that.ueStructure.isInitData || false;
        that.readonly = that.ueStructure.readonly || false;
        that.ueconfig = {
            toolbars: that.ueStructure.toolbars || [],
            enableContextMenu: that.ueStructure.enableContextMenu || false,
            autoHeightEnabled: that.ueStructure.autoHeightEnabled || false,
            elementPathEnabled: that.ueStructure.elementPathEnabled || false,
            readonly: that.ueStructure.readonly || false,
            wordCount: that.ueStructure.wordCount || false
        }

        that.create();
    },
    create: function () {
        var that = this;
        $('<script id="' + that.ueName + '" type="text/plain" style="width:' + that.width + ';height:' + that.height + ';border: #c6eded solid 1px;"/>').appendTo(that.container);

        that.ue = UE.getEditor(that.ueName, that.ueconfig);
        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function (action) {
            var actionURL;
            switch (action) {
                //执行上传图片或截图的action名称
                case "uploadimage":
                    actionURL = that.uploadImageURL;
                    break;
                case "catchimage":
                    actionURL = that.catchImageURL;
                    actionURL = "";
                    break;
                //执行上传涂鸦的action名称
                case "uploadscrawl":
                    actionURL = that.uploadScrawlURL;
                    break;
                //执行上传视频的action名称
                case "uploadVideoURL":
                    actionURL = that.uploadVideoURL;
                    break;
                case "uploadfile":
                    actionURL = that.uploadFileURL;
                    break;
                default:
                    actionURL = this._bkGetActionUrl.call(this, action);
            }

            return actionURL;
        }

        if (that.isInitData) {
            that.ue.ready(function () {

            });
        }
    },
    //获得ueditor对象
    getUE: function () {
        var that = this;
        return that.ue;
    },
    //获得内容值
    value: function (val) {
        var that = this;
        if (val) {
            that.ue.setContent(val);
        } else {
            return that.ue.getContent();
        }
    }
}
;
(function ($) {
    $.fn.newUeditor = function (tabStructure) {
        var tname = "uname" + (new Date()).getTime() + "ueditor";
        return new Ueditor(tabStructure, tname, $(this)[0]);
    };
})(jQuery);

