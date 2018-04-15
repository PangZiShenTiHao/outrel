package com.jy.modules.befloan.customer.lbtintoinfo.enumdef;

import java.util.ArrayList;
import java.util.List;

public class CreditAuditRole {
	
	public static String CREDIT_AUDIT_ONE_SXFXXS = "首席风险执行官（信审）";
	public static String CREDIT_AUDIT_ONE_JL = "信审一室经理";
	public static String CREDIT_AUDIT_ONE_ZG = "信审一室主管";
	public static String CREDIT_AUDIT_ONE_ZY = "信审一室专员";

	public static String CREDIT_AUDIT_TWO_SXFXFY = "首席风险执行官（复议）";
	public static String CREDIT_AUDIT_TWO_JL = "信审二室经理";
	public static String CREDIT_AUDIT_TWO_ZG = "信审二室主管";
	public static String CREDIT_AUDIT_TWO_ZY = "信审二室专员";

	public static String CREDIT_AUDIT_XW_SXFXFY = "首席风险执行官（复议）";
	public static String CREDIT_AUDIT_XW_JL = "小微审核室经理";
	public static String CREDIT_AUDIT_XW_ZG = "小微审核室主管";
	public static String CREDIT_AUDIT_XW_ZY = "小微审核室专员";

	public static String CREDIT_AUDIT_SH_ONE = "信审一室";
	public static String CREDIT_AUDIT_SH_TWO = "信审二室";
	public static String CREDIT_AUDIT_SH_THREE = "小微审核室";

	public static String CREDIT_AUDIT_ONE_XSSJZX = "信审三级终审";
	/**
	 * @title 信审一室下面的角色
	 * @return
	 */
	public static List<String> getCreditAuditOne() {
		List<String> listOne = new ArrayList<String>();
		listOne.add(CREDIT_AUDIT_ONE_JL);
		listOne.add(CREDIT_AUDIT_ONE_ZG);
		listOne.add(CREDIT_AUDIT_ONE_ZY);
		return listOne;
	}

	/**
	 * @title 信审二室下面的角色
	 * @return
	 */
	public static List<String> getCreditAuditTwo() {
		List<String> listTwo = new ArrayList<String>();
		listTwo.add(CREDIT_AUDIT_TWO_JL);
		listTwo.add(CREDIT_AUDIT_TWO_ZG);
		listTwo.add(CREDIT_AUDIT_TWO_ZY);
		return listTwo;
	}

	/**
	 * @title 小微审核室下面的角色
	 * @return
	 */
	public static List<String> getCreditAuditXwei() {
		List<String> listXwei = new ArrayList<String>();
		listXwei.add(CREDIT_AUDIT_XW_JL);
		listXwei.add(CREDIT_AUDIT_XW_ZG);
		listXwei.add(CREDIT_AUDIT_XW_ZY);
		return listXwei;
	}

	/**
	 * @title 首席风险执行官
	 * @return
	 */
	public static List<String> getCreditAuditSxifen() {
		List<String> listSxifen = new ArrayList<String>();
		listSxifen.add(CREDIT_AUDIT_ONE_SXFXXS);
		return listSxifen;
	}

}
