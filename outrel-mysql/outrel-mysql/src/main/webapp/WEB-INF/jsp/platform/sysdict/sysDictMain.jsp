<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript.jsp"%>
<title>查询系统用户表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

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
	left: 520px;
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
.resizable {
	
	overflow:auto;
	height:100%
	
}
</style>

<!-- 相关js方法 -->
<script type="text/javascript">
	function initPanel() {
		$("#RoleList").load("${basePath}sysPrvRole/prepareExecute/toQueryPage",
				function() {
				});
	}
</script>

</head>
<body style="background-color:#FFFFFF">

	<div class="leftPanel">
		<div class="titleSwap">
			<label class="innerTitle">数据字典</label>
		</div>
		<div class="contentSwap">
			<div class="innerPanel" id="innerPanel">
				<div class="ztree" id="RoleList">
					<iframe src='${basePath}sysDict/prepareExecute/toQueryPage'
						id='left' frameborder="no" border="0" marginwidth="0"
						marginheight="0" scrolling="no" allowtransparency="yes" width='100%'
						onload="var fdh=(this.Document?this.Document.body.scrollHeight:this.contentDocument.body.offsetHeight);this.height=(fdh>1350?fdh:1350)"></iframe>
				</div>
			</div>
		</div>
	</div>
	<div class="contentPanel">
		<div class="titleSwap">
			<label class="innerTitle">数据字典详细</label>
		</div>
		<div class="contentSwap" id="contentSwap">
			<iframe src='${basePath}sysDictDetail/prepareExecute/toQueryList?dictId=-1'
						id='right' frameborder="no" border="0" marginwidth="0"
						marginheight="0" scrolling="no" allowtransparency="yes" width='99%'
						onload="var fdh=(this.Document?this.Document.body.scrollHeight:this.contentDocument.body.offsetHeight);this.height=(fdh>1000?fdh:1000)"></iframe>
		</div>
	</div>
</body>
</html>
