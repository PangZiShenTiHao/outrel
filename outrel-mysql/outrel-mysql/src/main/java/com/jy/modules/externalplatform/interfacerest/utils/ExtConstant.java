package com.jy.modules.externalplatform.interfacerest.utils;

public class ExtConstant {

	//汇法网个人信息类型配置
	public static final String  LAW_PERSON_EXE="执行信息"; //执行信息
	public static final String  LAW_PERSON_CASE="案例信息"; //案例信息
	public static final String  LAW_PERSON_DISHONESTY="失信信息"; //失信信息
	public static final String  LAW_PERSON_TAX="税务信息"; //税务信息
	public static final String  LAW_PERSON_CQ="催欠公告"; //催欠公告
	public static final String  LAW_PERSON_NETLOAN="网贷逾期"; //网贷逾期
	
	//汇法网企业信息类型配置
	public static final String  LAW_COMPANY_EXE="执行信息"; //执行信息
	public static final String  LAW_COMPANY_CASE="案例信息"; //案例信息
	public static final String  LAW_COMPANY_DISHONESTY="失信信息"; //失信信息
	public static final String  LAW_COMPANY_TAX="税务信息"; //税务信息
	public static final String  LAW_COMPANY_CQ="催欠公告"; //催欠公告
	public static final String  LAW_COMPANY_NETLOAN="网贷逾期"; //网贷逾期
	public static final String  LAW_COMPANY_OPENCOURT="开庭公告"; //开庭公告
	public static final String  LAW_COMPANY_OTHER="其他司法公告"; //其他司法公告
	public static final String  LAW_TRIAL_PROCEDURE="审判流程"; //审判流程
	//鹏远征信
	public static final String PY_INVOKE_TYPE_YES = "1";
	public static final String PY_CARD_TYPE_CATEGORY = "0";//含借记卡和信用卡
	public static final String PY_CARD_TYPE_DEBIT_CARD = "1";//借记卡
	public static final String PY_CARD_TYPE_CREDIT_CARD = "2";//信用卡
	public static final String PY_AREA_EXPENSE_DOMESTIC = "1";//内地消费
	public static final String PY_AREA_EXPENSE_INTERN = "2";//港澳台及境外消费
	public static final String PY_PHONE_TYPE_MOBILE = "M";	
	public static final String PY_PHONE_TYPE_TEL = "T";
	public static final String PY_PHONE_TYPE_COMPANY = "C";
	public static final String PY_QUERY_TYPE_ID_13600 = "13600";
	public static final String PY_QUERY_TYPE_ID_21603 = "21603";	
	public static final String PY_BANK_CARD_THREE = "1";	
	public static final String PY_BANK_CARD_FOUR = "2";
	//前海征信
	public static final String QHZX_RET_CODE_SUCESS = "E000000";//交易成功	
	public static final String QHZX_RET_CODE_FALSE = "E000996";//没有查询到数据
	//数据堂个人消费
	public static final String SJT_SUCCESS_CODE = "0000";//交易成功
	public static final String SJT_FALSE_CODE = "ERR004";//未查询到数据
	public static final String SJT_MORE_CODE = "ERR006";//查询次数超限
	//数据堂违章信息
	public static final String SJT_WZ_SUCCESS_CODE = "0000";//交易成功
	public static final String SJT_WZ_TRUE_CODE = "true";//是否有数据
	//算话征信人行接口编
	public static final String SHZX_INTERFACE_NO = "SHZXPRC_9002";
    //算话共享报告查询接口编码
    public static final String SHGX_INTERFACE_NO = "SH_QUERY_SHARE_SH";
	
	public static final String RET_CODE_SUC = "200";// 200：查询成功
	public static final String RET_CODE_FAIL = "201";//201：查询失败
	public static final String RET_CODE_ERROR = "500";//500:查询异常
}
