package com.jy.modules.reportbefloan.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import org.apache.commons.lang3.StringUtils;

import com.fintech.platform.core.common.JYLoggerUtil;
import com.jy.modules.reportbefloan.dao.IntoAppTimeDao;

/**
 * 查询  多线程处理执行类 补充 工作件 excel 导出的字段信息
 * @author chengang
 *
 */
public class MultMakeupIntoExtInfoCommand implements Runnable{
	private IntoApprovalTimeService biz;
	private Map<String, Object> temp;
	private CountDownLatch countDown=null;
	private String auditeState;
	private String isReaudit;
	private IntoAppTimeDao dao;
	public MultMakeupIntoExtInfoCommand(Map<String, Object> temp,String auditeState,String isReaudit,IntoApprovalTimeService biz,IntoAppTimeDao dao,CountDownLatch countDown){
		this.temp =temp;
		this.biz = biz;
		this.countDown=countDown;
		this.auditeState = auditeState;
		this.dao = dao;
		this.isReaudit = isReaudit;
	}
	public void run() {
		try {
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("tranName", "");
			param.put("intoId", temp.get("ID").toString());
			Map<String,Object> ext1Map = dao.queryIntoInfoExt1(param);
			if(ext1Map == null){
				//说明该进件刚进入信审专员初审 其没有进行相关业务操作
				ext1Map = new HashMap<String,Object>();
			}else{
				this.makeupMethod(ext1Map,param);
			}
			
		} catch (Exception e) {
			JYLoggerUtil.error(this.getClass(), "====MultMakeupIntoExtInfoCommand=====error:", e);
		}

		//计数器 减一
		countDown.countDown();
	}
	private void makeupMethod(Map<String, Object> ext1Map, Map<String, Object> param){
		//开始统计
		temp.put("CUST_CLASSIFY", ext1Map.get("CUST_CLASSIFY"));//产品客群分类
		temp.put("AUDIT_CONCLUSION", ext1Map.get("AUDIT_CONCLUSION"));//审批结论
		
		//新增  信审流程审批结论 信审流程审批额度(元) 信审流程审批期限 只取信审 1000 
		biz.makeupCreditInfo(temp, param);
		//新增  复议流程审批结论 复议流程审批额度(元) 复议流程审批期限 只取复议 1001 
		biz.makeupReconsiderInfo(temp, param);
		//新增  复议终审开始时间 复议终审结束时间 复议终审耗时 复议专员ID  复议专员开始时间 复议专员结束时间  
		biz.makeupReconsiderFlowInfo(temp, param);
		//补充资料
		biz.makeupBuChongZiLiao(temp,param);
		//初审用时5
		biz.makeupChuShen(temp,param);
		//补充调查用时 2
		biz.makeupBuChongExamen(temp,param);
		//终审用时
		biz.makeupLastAudit(temp,param);
		//办理初审人员  办理终审人员 办理信审室 办理复议终审人员
		biz.makeupIntoAuditPersonOrgInfo(temp,param);
		//补充 反欺诈信心
		biz.makeupAntifraudInfo(temp, param);
		// 稽核信息
		biz.makeupOnlineInfo(temp, param);
		if(Integer.parseInt(auditeState) >3000){//有审批结论的
			
			String one =(String) ext1Map.get("ONE_REFUSE_REASON");
			String two =(String) ext1Map.get("TWO_REFUSE_REASON");
			if(StringUtils.isNotEmpty(one)){//非同意
				
				if("1".equals(isReaudit)){//复议则是
					temp.put("REC_ONE_REFUSE_REASON", one);//一级拒贷原因
					temp.put("REC_TWO_REFUSE_REASON", two);//二级拒贷原因
				}else{
					temp.put("CRE_ONE_REFUSE_REASON", one);//一级拒贷原因
					temp.put("CRE_TWO_REFUSE_REASON", two);//二级拒贷原因
				}
			}else{
				
				temp.put("AGREE_CODE", ext1Map.get("AGREE_CODE"));//同意代码
			}
			//调整使用 lb_t_into_info.autdit_end_time
			/*Map<String,Object> proMap = dao.queryIntoProInfo(param);
			if(proMap!= null){
				String auditEndTime = (String) proMap.get("END_TIME");
				temp.put("AUTDIT_END_TIME",auditEndTime);//审批结束时间
			}*/
		}else if(Integer.parseInt(auditeState) >2000){
			//审核中的状态
			Map<String,Object> proExt1 = dao.queryIntoProInfoExt1(param);
			if(proExt1 != null){
				temp.put("CUR_ACT_NAME", proExt1.get("CUR_ACT_NAME"));//当前环节
				temp.put("CUR_USER_ID", proExt1.get("CUR_USER_ID"));//当前办理人
			}
		}
	}
}
