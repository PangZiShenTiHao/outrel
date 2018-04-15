<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>H5 FACE</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>web RTC 测试</title>
  <style>
    .booth {
      width:400px;
     
      background:#ccc;
      border: 10px solid #ddd;
      margin: 0 auto;
    }
  </style>
</head>
<body>
<form name="faceCheckForm" id="faceCheckForm" action="">

  <div class="booth">
    <video id="video" width="400" height="300"></video>
    <input type="button" id="tack" name="tack" onclick="clickFace()" value="人脸识别"></input>
    <canvas id='canvas' width='400' height='300'></canvas>
    <img id='img' src=''>
    <textarea  name="imageBase64" id="imageBase64" rows="5" cols="5"></textarea>
    <input name="faceImage" id="dtofaceImage" value=""/>
    
  </div>
 </form>
 
  <script>
    var video = document.getElementById('video'),
        canvas = document.getElementById('canvas'),
        snap = document.getElementById('tack'),
        img = document.getElementById('img'),
        imgBase64 = document.getElementById('imageBase64'),
        vendorUrl = window.URL || window.webkitURL;
        
    //媒体对象
    navigator.getMedia = navigator.getUserMedia ||
                         navagator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;
    navigator.getMedia({
        video: true, //使用摄像头对象
        audio: false  //不适用音频
    }, function(strem){
        console.log(strem);
        video.src = vendorUrl.createObjectURL(strem);
        video.play();
        video.onloadedmetadata = function (e) {
            // Do something with the video here.
        };
    }, function(error) {
        //error.code
        console.log(error);
    });
    var first = 0;
    function clickFace(){
        first ++;
        if(first > 1)  return ;
        
        //绘制canvas图形
        canvas.getContext('2d').drawImage(video, 0, 0, 400, 300);
        //把canvas图像转为img图片
        var dataURL  = canvas.toDataURL("image/png");
        img.src = dataURL;
        //imgBase64.value=dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        $("#imageBase64").val(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        $("#dtofaceImage").val(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        
        $.ajax({
            url: "<%=basePath %>api/yunface/checkFaceByAPI/v1",
            type:"POST",
            async:false,
            data:$("#faceCheckForm").serialize(),//{"imgBase64":imgBase64.value},
            dataType: "JSON",
            success: function(result){
	                var v_status = result.status;
		        	if(v_status.indexOf('ok') >-1){
		        		
		        	}
            		alert("认证结果："+result.msg);
            		first = 0;
           	}
        });
    }
    /*
    var image = document.querySelector('#image');
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext("2d");
    var scale = 1;
    image.onload = function () {
      ctx.drawImage(image,
        0, 0, image.width, image.height,
        0, 0, canvas.width, canvas.height);
      scale = canvas.width / image.width;
    }; */
    /* 
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0);
        image.src = canvas.toDataURL('image/png');
        image.onload = function() {
          detect();
        }
      }, 60);
    
    function detect() {
        if (window.FaceDetector == undefined) {
          console.error('Face Detection not supported');
          return;
        }
        var faceDetector = new FaceDetector();
        console.time('detect');
        return faceDetector.detect(image)
          .then(faces => {
            console.log(faces)
            // Draw the faces on the <canvas>.
            var ctx = canvas.getContext("2d");
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            for (var i = 0; i < faces.length; i++) {
              var item = faces[i].boundingBox;
              ctx.rect(Math.floor(item.x * scale),
                Math.floor(item.y * scale),
                Math.floor(item.width * scale),
                Math.floor(item.height * scale));
              ctx.stroke();
            }
            console.timeEnd('detect');
          })
          .catch((e) => {
            console.error("Boo, Face Detection failed: " + e);
          });
      } */
  </script>
</body>
</html>