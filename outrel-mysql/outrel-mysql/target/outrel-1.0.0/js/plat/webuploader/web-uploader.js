/*
* newWebUploader.js
* author :yangjingjing
* server  默认上传地址和缩略图地址相同
* */
function webuploader(uploaderStructure, uploaderName, container){
    this.uploaderStructure = uploaderStructure;
    this.uploaderName = uploaderName;
    this.container = container;
    this.init();
}
webuploader.prototype = {
    init:function(){
        var that = this;

        this.Msg ='上传失败';
        this.filePicker = this.uploaderName+'_filePicker'; //filePicker 选择附件
        this.filePickerMore = this.uploaderName+'filePickerMore'; //filePicker2 继续上传
        this.fileUpload = this.uploaderName+'Btn'; //$upload 开始上传
        this.dndArea = this.uploaderName+'_dndArea'; //placeholder 拖拽区域
        this.$wrap =  undefined;
        this.$queue = undefined;
        this.$statusBar = undefined;
        this.$info = undefined;
        this.$progress = undefined;
        this.$upload = undefined;
        this.uploader = undefined;
        this.fileCount = 0;// 添加的文件数量
        this.fileSize = 0;// 添加的文件总大小
        this.ratio = window.devicePixelRatio || 1;// 优化retina, 在retina下这个值是2
        this.thumbnailWidth = 110 * this.ratio;// 缩略图大小-宽
        this.thumbnailHeight = 110 * this.ratio;// 缩略图大小-高
        this.state = 'pedding';// 可能有pedding, ready, uploading, confirm, done.
        this.percentages = {}; // 所有文件的进度信息，key为file id
        this.errorFun = this.uploaderStructure.errorFun;
        this.successFun = this.uploaderStructure.successFun;
        this.url = this.uploaderStructure.url;//删除调取接口地址
        var defaults = {
            pick:'#'+that.filePicker,
            fileNumLimit:300,
            dnd:'#'+that.dndArea,
            paste:'#'+that.uploaderName,
            swf:'Uploader.swf',
            disableGlobalDnd:true
        };
        this.options = $.extend(defaults, this.uploaderStructure.options);

        //是否支持base64
        this.isSupportBase64 = ( function() {
            var data = new Image();
            var support = true;
            data.onload = data.onerror = function() {
                if( this.width != 1 || this.height != 1 ) {
                    support = false;
                }
            };
            data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            return support;
        } )();
        // 检测是否已经安装flash，检测flash的版本
        this.flashVersion = ( function() {
            var version;
            try {
                version = navigator.plugins[ 'Shockwave Flash' ];
                version = version.description;
            } catch ( ex ) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                        .GetVariable('$version');
                } catch ( ex2 ) {
                    version = '0.0';
                }
            }
            version = version.match( /\d+/g );
            return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
        } )();
        //支持的transiton
        this.supportTransition = (function(){
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
            s = null;
            return r;
        })();
        this.show();
    },


    createHtml:function(){
        var that = this;
        var uploaderStrs=[];
        var str = '<div id="'+that.uploaderName+'" class="uploader-wrap">'+
            '<div class="queueList">' +
                '<div id="'+that.dndArea+'" class="placeholder">' +
                    '<div id="'+that.filePicker+'" class="filePicker">上传文件</div>' +
                    '<p>可将文件拖到这里，单次最多可选'+that.options.fileNumLimit+'个</p>' +
                '</div>' +
                '<ul class="filelist"></ul>' +
            '</div>'+
            '<div class="statusBar" style="display:none;">'+
            '<div class="progress"><span class="text">0%</span><span class="percentage"></span></div>'+
            '<div class="info"></div>'+
            '<div class="btns"><div id="'+that.filePickerMore+'" class="filePicker2"></div>';
        if(!that.options.auto){
            str+='<div class="uploadBtn" id="'+that.fileUpload+'">开始上传</div>';
        }
        str+='</div></div>';
        uploaderStrs.push(str);
        $(that.container).html(uploaderStrs.join("")); //html内容
        that.$wrap = $("#"+that.uploaderName);
        this.$upload = $("#"+that.fileUpload);
        var $wrap = that.$wrap;
        that.$queue = $wrap.find(".filelist");
        that.$placeHolder = $wrap.find(".placeholder");
        that.$statusBar = $wrap.find(".statusBar");
        that.$info = $wrap.find(".info");
        that.$progress = $wrap.find(".progress");
        that.$uploaod = $wrap.find( '.uploadBtn' );
    },
    show:function(){
        var that = this;
        that.createHtml();
        that.checkFlash();
        that.uploader = WebUploader.create(that.options); //初始化uploader
        var uploader = that.uploader;

        //添加按钮
        uploader.addButton({
            id: '#'+this.filePickerMore,
            label: '继续添加'
        });
        // 拖拽时不接受 js, txt 文件。
        uploader.on( 'dndAccept', function( items ) {
            var denied = false,
                len = items.length,
                i = 0,
            // 修改js类型
                unAllowed = 'text/plain;application/javascript ';

            for ( ; i < len; i++ ) {
                // 如果在列表里面
                if ( unAllowed.indexOf( items[ i ].type ) ) {
                    denied = true;
                    break;
                }
            }
            return !denied;
        });
        uploader.on('uploadProgress',function(file, percentage){
            var $li = $('#'+file.id),
                $percent = $li.find('.progress span');

            $percent.css( 'width', percentage * 100 + '%' );
            that.percentages[ file.id ][ 1 ] = percentage;
            that.updateTotalProgress();
        });
        uploader.on('uploadAccept',function(object,ret){
            var status = ret.status;
            that.Msg = ret.msg;
            if(status == 'fail'){
                return false
            }
        });
        uploader.on('uploadError',function(file,code){
            file.setStatus('error',that.Msg);
            //上传失败的文件从队列中删除
            //uploader.removeFile(file);
            if(that.errorFun){
                that.errorFun(file,code);
            }
        });
        uploader.on('uploadSuccess',function(file, reason){
            var $li = $("#"+file.id);
            var id = reason.id;
            //删除上传到服务器中的文件
            function delFile(id){
                jyDialog().confirm("删除将无法恢复,确认删除？", function(){
                    jyAjax(that.url+id,'',function(result){
                        uploader.removeFile(file,true);
                    });
                });

            };
            var $div = $li.find('div.delBtn');
            $div.click(function(){
                delFile(id);
            });
            if(that.successFun){
                that.successFun(file,reason);
            }
        });
        uploader.on('fileQueued',function(file){
            that.fileCount++;
            that.fileSize += file.size;

            if ( that.fileCount === 1 ) {
                that.$placeHolder.addClass( 'element-invisible' );
                that.$statusBar.show();
            }

            that.addFile( file );
            that.setState( 'ready' );
            that.updateTotalProgress();
        });

        uploader.on('fileDequeued',function(file){
            that.fileCount--;
            that.fileSize -= file.size;

            if ( !that.fileCount ) {
                that.setState( 'pedding' );
            }

            that.removeFile( file );
            that.updateTotalProgress();

        });
        uploader.on( 'all', function( type ) {
            var stats;
            switch( type ) {
                case 'uploadFinished':
                    that.setState( 'confirm' );
                    break;

                case 'startUpload':
                    that.setState( 'uploading' );
                    break;

                case 'stopUpload':
                    that.setState( 'paused' );
                    break;

            }
        });
        that.addEvent();
        that.$upload.addClass( 'state-' + that.state );
        that.updateTotalProgress();

    },
    addEvent:function(){
        var that = this;
        that.$upload.on('click', function() {
            if ( $(this).hasClass( 'disabled' ) ) {
                return false;
            }

            if ( that.state === 'ready' ) {
                that.uploader.upload();
            } else if ( that.state === 'paused' ) {
                that.uploader.upload();
            } else if ( that.state === 'uploading' ) {
                that.uploader.stop();
            }
        });

        that.$info.on( 'click', '.retry', function() {
            uploader.retry();
        });
    },
    //创建viewDom 当有文件添加进来时执行，负责view的创建
    addFile:function( file ) {
        var that = this;
        var $li = $( '<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '</li>' ),

            $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                '<span class="rotateRight">向右旋转</span>' +
                '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
            $prgress = $li.find('p.progress span'),
            $wrap = $li.find( 'p.imgWrap' ),
            $info = $('<p class="error"></p>'),

        showError = function( code ) {
            switch( code ) {
                case 'exceed_size':
                    text = '文件大小超出';
                    break;
                case 'interrupt':
                    text = '上传暂停';
                    break;
                default:
                    text = that.Msg;
                    break;
            }
            $info.text( text ).appendTo( $li );
        };
        //格式校验通过
        if ( file.getStatus() === 'invalid' ) {
            showError( file.statusText );
        } else {
            // @todo lazyload
            $wrap.text( '预览中' );
            that.uploader.makeThumb( file, function( error, src ) {
                var img;
                if ( error ) {
                    $wrap.text( '不能预览' );
                    return;
                }
                if( that.isSupportBase64 ) {
                    img = $('<img src="'+src+'">');
                    $wrap.empty().append( img );
                } else {
                    $.ajax(that.options.server, {
                        method: 'GET',
                        data: src,
                        dataType:'json'
                    }).done(function( response ) {
                        if (response.result) {
                            img = $('<img src="'+response.result+'">');
                            $wrap.empty().append( img );
                        } else {
                            $wrap.text("预览出错");
                        }
                    });
                }
            }, that.thumbnailWidth, that.thumbnailHeight );

            that.percentages[ file.id ] = [ file.size, 0 ];
            file.rotation = 0; // 旋转角度
        }
        /*
         * inited 初始状态
         * queued 已经进入队列, 等待上传
         * progress 上传中
         * complete 上传完成。
         * error 上传出错，可重试
         * interrupt 上传中断，可续传。
         * invalid 文件不合格，不能重试上传。会自动从队列中移除。
         *  cancelled 文件被移除。
         * */
        //cur  当前状态  prev 原来状态
        file.on('statuschange', function( cur, prev ) {
            if ( prev === 'progress' ) { //进行中
                $prgress.hide().width(0);
            } else if ( prev === 'queued' ) {//进入队列等待上传
                $li.off( 'mouseenter mouseleave' ); //移出$li上的事件
                $btns.remove();
            }
            // 成功
            if ( cur === 'error' || cur === 'invalid' ) {
                //file.setStatus('error',Msg);
                showError( file.statusText );
                that.percentages[ file.id ][ 1 ] = 1;
            } else if ( cur === 'interrupt' ) {
                showError( '上传中断，可继续上传' );
            } else if ( cur === 'queued' ) {
                $info.remove();
                $prgress.css('display', 'block');
                that.percentages[ file.id ][ 1 ] = 0;
            } else if ( cur === 'progress' ) {
                $info.remove();
                $prgress.css('display', 'block');
            } else if ( cur === 'complete' ) {
                $prgress.hide().width(0);
                $li.append( '<span class="success"></span>' );
                $li.append('<div class="delBtn"><a href="javascript;"></a></div>');
            }

            $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
        });

        $li.on( 'mouseenter', function() {
            $btns.stop().animate({height: 30});
        });

        $li.on( 'mouseleave', function() {
            $btns.stop().animate({height: 0});
        });

        $btns.on( 'click', 'span', function() {
            var index = $(this).index(),
                deg;

            switch ( index ) {
                case 0:
                    that.uploader.removeFile( file );

                    return;

                case 1:
                    file.rotation += 90;
                    break;

                case 2:
                    file.rotation -= 90;
                    break;
            }
            if ( that.supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                // use jquery animate to rotation
                // $({
                //     rotation: rotation
                // }).animate({
                //     rotation: file.rotation
                // }, {
                //     easing: 'linear',
                //     step: function( now ) {
                //         now = now * Math.PI / 180;

                //         var cos = Math.cos( now ),
                //             sin = Math.sin( now );

                //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                //     }
                // });
            }


        });

        $li.appendTo( that.$queue );
    },

    // 负责view的销毁
    removeFile:function( file ) {
    var that = this;
    var $li = $('#'+file.id);

    delete that.percentages[ file.id ];
    that.updateTotalProgress();
    $li.off().find('.file-panel').off().end().remove();
    },


    updateTotalProgress:function() {
        var that = this;
        var loaded = 0,
            total = 0,
            spans = that.$progress.children(),
            percent;

        $.each( that.percentages, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );

        percent = total ? loaded / total : 0;


        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        that.updateStatus();
    },
    updateStatus:function() {
        var that = this;
        var text = '', stats;
        var state = that.state;

        if ( state === 'ready' ) {
            text = '选中' + that.fileCount + '个文件，共' +
                WebUploader.formatSize( that.fileSize ) + '。';
        } else if ( state === 'confirm' ) {
            stats = that.uploader.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '文件，'+
                    stats.uploadFailNum + '文件上传失败，<a class="retry" href="#">重新上传</a>失败文件'
            }

        } else {
            stats = that.uploader.getStats();
            text = '共' + that.fileCount + '个（' +
                WebUploader.formatSize( that.fileSize )  +
                '），已上传' + stats.successNum + '个';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '个';
            }
        }

        that.$info.html( text );
    },
    setState:function( val ) {
        var that = this;
        var file, stats;

        if ( val === that.state ) {
            return;
        }

        that.$upload.removeClass( 'state-' + that.state );
        that.$upload.addClass( 'state-' + val );
        that.state = val;

        switch ( that.state ) {
            case 'pedding':
                that.$placeHolder.removeClass( 'element-invisible' );
                that.$queue.hide();
                that.$statusBar.addClass( 'element-invisible' );
                that.uploader.refresh();
                break;

            case 'ready':
                that.$placeHolder.addClass( 'element-invisible' );
                $( '#'+that.filePickerMore ).removeClass( 'element-invisible');
                that.$queue.show();
                that.$statusBar.removeClass('element-invisible');
                that.uploader.refresh();
                break;

            case 'uploading':
                $( '#'+that.filePickerMore ).addClass( 'element-invisible' );
                that.$progress.show();
                that.$upload.text( '暂停上传' );
                break;

            case 'paused':
                that.$progress.show();
                that.$upload.text( '继续上传' );
                break;

            case 'confirm':
                that.$progress.hide();
                $( '#'+that.filePickerMore ).removeClass( 'element-invisible' );
                that.$upload.text( '开始上传' );
                /*$('#filePicker2 + .uploadBtn').click(function () {
                 window.location.reload();
                 });*/
                stats = that.uploader.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    that.setState( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = that.uploader.getStats();
                if ( stats.successNum ) {
                    //document.getElementById("shareUrl").style.visibility = 'visible';
                    //createQrcode();
                } else {
                    // 没有成功的图片，重设
                    that.state = 'done';
                    //location.reload();
                }
                break;
        }

        that.updateStatus();
    },
    checkFlash:function(){
        var that = this;
        if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

            // flash 安装了但是版本过低。
            if (that.flashVersion) {
                (function(container) {
                    window['expressinstallcallback'] = function( state ) {
                        switch(state) {
                            case 'Download.Cancelled':
                                alert('您取消了更新！')
                                break;

                            case 'Download.Failed':
                                alert('安装失败')
                                break;

                            default:
                                alert('安装已成功，请刷新！');
                                break;
                        }
                        delete window['expressinstallcallback'];
                    };

                    var swf = 'expressInstall.swf';
                    // insert flash object
                    var html = '<object type="application/' +
                        'x-shockwave-flash" data="' +  swf + '" ';

                    if (WebUploader.browser.ie) {
                        html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                    }

                    html += 'width="100%" height="100%" style="outline:0">'  +
                        '<param name="movie" value="' + swf + '" />' +
                        '<param name="wmode" value="transparent" />' +
                        '<param name="allowscriptaccess" value="always" />' +
                        '</object>';

                    container.html(html);

                })(that.$wrap);

                // 压根就没有安转。
            } else {
                that.$wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
            }

            return;
        } else if (!WebUploader.Uploader.support()) {
            alert( 'Web Uploader 不支持您的浏览器！');
            return;
        }
    },
    getUploader:function(){
        return this.uploader;
    }
};
(function($) {
    $.fn.newWebUpload = function(uploaderStructure, name) {
        var tname = "tname" + (new Date()).getTime() + Math.round((Math.random() * 100));
        if (name) {
            tname += name;
        }
        return new webuploader(uploaderStructure, tname, $(this)[0]);
    };
})(jQuery);