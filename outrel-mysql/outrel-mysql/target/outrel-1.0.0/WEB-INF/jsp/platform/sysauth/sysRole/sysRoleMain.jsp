<html>
<head>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript.jsp"%>
<title></title>

<style type="text/css">
.leftPanel {
	position: absolute;
	left: 2px;
	top: 10px;
	bottom: 2px;
	width: 610px;
	border: 1px solid #CCC9C9;
	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	background: #FAFAFA;
}

.leftPanel .innerPanel {
	position: absolute;
	left: 0px;
	top: 10px;
	bottom: 0px;
	right: 0px;
	overflow: auto;
}

.contentPanel {
	position: absolute;
	left: 620px;
	top: 10px;
	bottom: 2px;
	right: 2px;
	border: 1px solid #CCC9C9;
	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	background: #FAFAFA;
}

.leftPanel .titleSwap,.contentPanel .titleSwap {
	display: block;
	margin: -10px 0px 0px 20px;
	text-align: left;
}

.leftPanel .innerTitle,.contentPanel .innerTitle {
	background: #FAFAFA;
	padding: 0px 5px;
}

.leftPanel .contentSwap,.contentPanel .contentSwap {
	margin: 5px;
}

.ztree li span.button.add {
	margin-left: 2px;
	margin-right: -1px;
	background-position: -144px 0;
	vertical-align: top;
}

.ztree li span.button.all {
	margin-left: 2px;
	margin-right: -1px;
	background-position: -1026px 0;
	vertical-align: top;
}

.ztree li span.button.all a {
	margin-top: 6px;
	color: #FF0000;
}
</style>
<script type="text/javascript">
	$(function() {
		/* $("#leftPanel").load("${basePath}sysRole/prepareExecute/toQueryPage",function(){
		//querySysRoleUser.jsp 
		 $("#contentPanela").load("${basePath}sysRoleUser/prepareExecute/toQueryPage?id=1",function(){});
				});  */
	});
</script>
</head>
<body>
	<div class="leftPanel">
		<div class="titleSwap">
			<label class="innerTitle">角色管理</label>
		</div>
		<div class="contentSwap">
			<div class="innerPanel" id="innerPanel">
				<div class="ztree" id="RoleList">
					<iframe src='${basePath}sysRole/prepareExecute/toQueryPage'
						id='left' frameborder="no" border="0" marginwidth="0"
						marginheight="0" scrolling="yes" allowtransparency="yes" width='100%'
						onload="var fdh=(this.Document?this.Document.body.scrollHeight:this.contentDocument.body.offsetHeight);this.height=(fdh>900?fdh:900)"></iframe>
				</div>
			</div>
		</div>
	</div>
	<div class="contentPanel">
		<div class="titleSwap">
			<label class="innerTitle">角色用户</label>
		</div>
		<div class="contentSwap" id="contentSwap">
			<iframe src='${basePath}sysRoleUser/prepareExecute/toQueryPage?id=0'
						id='right' frameborder="no" border="0" marginwidth="0"
						marginheight="0" scrolling="yes" allowtransparency="yes" width='99%'
						onload="var fdh=(this.Document?this.Document.body.scrollHeight:this.contentDocument.body.offsetHeight);this.height=(fdh>900?fdh:900)"></iframe>
		</div>
	</div>
</body>
</html>