/* UTF-8
 * JBPM.biz.js
 * 使用jquery1.4
 * 封装了介于jquery和jbpm 业务逻辑之间的公共功能部分，主要是公共js效果
 * author: chengang
 * 调用示例(详细说明见各个对象及方法)：
 * JBPM.biz.getViewBizUrl('1000');
 */
(function(){
	var _biz = {
		/*
		 * 工作流预览 业务数据 对应的 历史 页面
		 * 获取对应的业务历史信息阅览url
		 * v_bizType WORKFLOW_BIZ_TYPE 对应的业务代码
		 * acitityName 当前流程实例ID中活动的节点名称
		 */
		getViewBizUrl : function(v_bizType){
			debugger;
			var v_url= contextRootPath;
			var v_viewURI = '';
			if("1001" == v_bizType){//个人额度审批
				v_viewURI = '/loanCreditAmount/prepareExecute/toViewAppInfo';
				v_url += encodeURI(v_viewURI);
			}else if("1002" == v_bizType){//贷款申请审批
				v_viewURI = '/loanApplication/prepareExecute/toViewAppInfo';
				v_url += encodeURI(v_viewURI);
			}else if("1003" == v_bizType){//个人客户开立审批
				v_viewURI = '/crmIndividualCustomer/prepareExecute/toViewAppInfo';
				v_url += encodeURI(v_viewURI);
			}else if("1004" == v_bizType){//个人客户开立审批
				v_viewURI = '/crmEnterpriseCustomer/prepareExecute/toViewAppInfo';
				v_url += encodeURI(v_viewURI);
			}else if("1006" == v_bizType){//手动放款审批
				v_viewURI = '/loanTradeInfo/prepareExecute/toViewAppInfo';
				v_url += encodeURI(v_viewURI);
			}else if("000" == v_bizType){//手动放款审批
				v_viewURI = '/dojbpm/leaveDemoInfo/prepareExecute/toViewForWorkflow';
				v_url += encodeURI(v_viewURI);
			}
			
			return v_url;
		}
	};
	
	if(typeof JBPM == "undefined") window.JBPM={};
	JBPM.biz = _biz;
})();