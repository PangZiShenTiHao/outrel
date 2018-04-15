package com.jy.modules.befloan.customer.lbtintoinfo.enumdef;

import org.apache.commons.lang3.StringUtils;

/**
 * @description: 进件状态枚举值
 * @author xujunqi
 * @date: 2015年1月12日 上午10:45:11
 */
public enum IntoAuditState {
	//申请阶段状态
	INTO_APP_1020("1020", "初始化"),
	INTO_APP_1025("1025", "录单补件"),
	INTO_APP_1030("1030", "录单中"),
	INTO_APP_1050("1050", "已暂存"),
	INTO_APP_1100("1100", "已保存"),
	INTO_APP_1150("1150", "质检回退"),
	INTO_APP_1200("1200", "已提交-待质检"),
	INTO_APP_1300("1300", "已提交-质检中"),
	INTO_APP_1400("1400", "拒贷"),
	INTO_APP_1500("1500", "放弃"),
	INTO_APP_1600("1600", "质检通过"),
	INTO_APP_1700("1700", "质检通过-审查中"),
	INTO_APP_1800("1800", "自动拒绝-不符合大纲标准"),
	
	//信审阶段状态
	CREDIT_AUDIT_2100("2100", "审核中-审查中"),
	CREDIT_AUDIT_2200("2200", "审核中-待分配"),
	CREDIT_AUDIT_2300("2300", "审核中-审核中"),
	CREDIT_AUDIT_2400("2400", "审核中-补件"),
	CREDIT_AUDIT_2500("2500", "审核中-调查"),
	CREDIT_AUDIT_2600("2600", "反欺诈拒绝"),
	CREDIT_AUDIT_2700("2700", "评分拒绝"),
	CREDIT_AUDIT_2800("2800", "审核中-稽核审批"),
	
	//审核结束状态
	CREDIT_AUDIT_END_3100("3100", "审核结束-同意"),
	CREDIT_AUDIT_END_3200("3200", "审核结束-有条件同意"),
	CREDIT_AUDIT_END_3300("3300", "审核结束-审核拒绝"),//(包含反欺诈阶段调查命中和直接命中) 复议阶段（维持终审意见）
	CREDIT_AUDIT_END_3350("3350", "审核结束-复议拒绝"),//(包含反欺诈阶段调查命中和直接命中) 复议阶段复议拒绝
	CREDIT_AUDIT_END_3360("3360", "审核结束-反欺诈拒绝"),//复议阶段复议拒绝
	CREDIT_AUDIT_END_3370("3370", "审核结束-评分拒绝"),//复议阶段复议拒绝
	CREDIT_AUDIT_END_3400("3400", "审核结束-超时放弃"),//暂时停用
	CREDIT_AUDIT_END_3500("3500", "审核结束-其他拒绝"),//暂时停用
	CREDIT_AUDIT_END_3600("3600", "审核结束-客户放弃"),
	CREDIT_AUDIT_END_3700("3700", "审核结束-自动通过"),//暂时停用
	CREDIT_AUDIT_END_3800("3800", "审核结束-自动拒绝"),
	CREDIT_AUDIT_END_3900("3900", "审核结束-加入黑名单"),
	CREDIT_AUDIT_END_3910("3910", "审核结束-转信审"),
	
	//线上稽核审批状态
	CREDIT_OLINE_AUDIT_END_3110("3110", "审核结束-通过"),
	CREDIT_OLINE_AUDIT_END_3310("3310", "审核结束-不通过"),
	
	//合同调配阶段
	CONTRACT_ALLOCATE_4100("4100", "调配中"),
	
	//签约阶段状态
	SIGNING_LOAN_5100("5100", "待签约"),
	SIGNING_LOAN_5200("5200", "签约中"),
	SIGNING_LOAN_5300("5300", "合同签订退回"),
	SIGNING_LOAN_5400("5400", "放款退回"),
	SIGNING_LOAN_5500("5500", "门店拒签"),
	VISIT_AUDIT_5550("5550", "回访拒绝"),
	SIGNING_LOAN_5600("5600", "客户放弃签约"),

	SIGNING_LOAN_5700("5700", "已签约");

	private String key;
	private String value;

	private IntoAuditState(String key, String value) {
		this.key = key;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * @author xujunqi
	 * @description: 根据key获取对应的value
	 * @date 2015年1月12日 上午10:41:01
	 * @return
	 */
	public static String getValueByKey(String key) {
		String value = null;

		if (StringUtils.isEmpty(key)) {
			return value;
		}

		for (IntoAuditState s : values()) {
			if (s.getKey().equals(key)) {
				value = s.getValue();
				break;
			}
		}

		return value;
	}

	/**
	 * @author xujunqi
	 * @description: 获取进件完结状态连接字符串
	 * @date 2015年6月8日 下午3:28:06
	 * @return
	 */
	public static String getEndStateStr() {
		StringBuffer auditeState = new StringBuffer();
		auditeState.append(IntoAuditState.INTO_APP_1400.getKey()).append(",");
		auditeState.append(IntoAuditState.INTO_APP_1500.getKey()).append(",");
		auditeState.append(IntoAuditState.INTO_APP_1800.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_2600.getKey()).append(",");
        auditeState.append(IntoAuditState.CREDIT_AUDIT_2700.getKey()).append(",");
        auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3360.getKey()).append(",");
        auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3370.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3300.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3350.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3400.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3500.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3600.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3800.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3900.getKey()).append(",");
		auditeState.append(IntoAuditState.SIGNING_LOAN_5500.getKey()).append(",");
		auditeState.append(IntoAuditState.SIGNING_LOAN_5600.getKey()).append(",");
		auditeState.append(IntoAuditState.SIGNING_LOAN_5700.getKey());
		
		return auditeState.toString();
	}

	/**
	 * @author xujunqi
	 * @description: 获取进件拒绝状态连接字符串
	 * @date 2015年6月8日 下午3:28:06
	 * @return
	 */
	public static String getRefuseStateStr() {
		StringBuffer auditeState = new StringBuffer();
		auditeState.append(IntoAuditState.INTO_APP_1400.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_2600.getKey()).append(",");
        auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3360.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3300.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3350.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3500.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3800.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3900.getKey()).append(",");
		auditeState.append(IntoAuditState.SIGNING_LOAN_5500.getKey()).append(",");
		auditeState.append(IntoAuditState.VISIT_AUDIT_5550.getKey());
		
		return auditeState.toString();
	}
	
	
	/**
	 * @description: 获取信审/签约进件拒绝状态连接字符串
	 * @return
	 */
	public static String getAuditRefuseStateStr() {
		StringBuffer auditeState = new StringBuffer();
		auditeState.append(IntoAuditState.CREDIT_AUDIT_2600.getKey()).append(",");
        auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3360.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3300.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3350.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3500.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3800.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3900.getKey()).append(",");
		auditeState.append(IntoAuditState.SIGNING_LOAN_5500.getKey()).append(",");
		auditeState.append(IntoAuditState.VISIT_AUDIT_5550.getKey());
		
		return auditeState.toString();
	}
	
	
	
	
	/**task#2616 异常客户进件资格申请优化-开发
	 * @description: 获取进件拒绝状态连接字符串
	 * @return
	 */
	public static String getRefuseStateStr2() {
		StringBuffer auditeState = new StringBuffer();
		auditeState.append(IntoAuditState.INTO_APP_1400.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_2600.getKey()).append(",");
        auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3360.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3300.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3350.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3500.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3800.getKey()).append(",");
		auditeState.append(IntoAuditState.CREDIT_AUDIT_END_3900.getKey()).append(",");
		auditeState.append(IntoAuditState.SIGNING_LOAN_5500.getKey()).append(",");
		auditeState.append(IntoAuditState.SIGNING_LOAN_5600.getKey()).append(",");
		auditeState.append(IntoAuditState.VISIT_AUDIT_5550.getKey());
		
		return auditeState.toString();
	}
	/**
	 * @author xujunqi
	 * @description: 获取进件可编辑状态连接字符串
	 * @date 2016年7月5日 上午10:58:07
	 * @return
	 */
	public static String getCanEditStateStr() {
		StringBuffer auditeState = new StringBuffer();
		auditeState.append(IntoAuditState.INTO_APP_1020.getKey()).append(",");
		auditeState.append(IntoAuditState.INTO_APP_1025.getKey()).append(",");
		auditeState.append(IntoAuditState.INTO_APP_1050.getKey()).append(",");
		auditeState.append(IntoAuditState.INTO_APP_1100.getKey()).append(",");
		auditeState.append(IntoAuditState.INTO_APP_1150.getKey());
		
		return auditeState.toString();
	}
}
