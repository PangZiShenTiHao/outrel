package com.jy.modules.befloan.callthirdbiz;

/**
 * @desc 接口编码和业务编码常量类
 * @author 豆永亮
 * @date 2014-12-22
 *
 */
public class CodeConstant {
	/** 调用核心接口交易成功编码 */
	public static final String CORE_TRADE_SUCCESS_CODE = "0000";
	
	/** 调用核心接口日终状态编码 */
	public static final String CORE_TRADE_DAY_END_PROCESSING_CODE = "9999";
	
	/** 核心主数据:系统来源编码 */
	public static final String CORE_MAIN_DATA_SYSTEM_SOURCE_CODE = "S001";
	
	/** 调用根据合同编号查询贷款明细接口返回贷款状态码 
	 *  0-正常 1-逾期 2-正常结清 3-撤销 4-提前结清 5-展期结清
	 */
	public static final String[] LOAN_STATUS = {"0", "1", "2", "3", "4", "5"};
	
	/** 客户查询接口编码 */
	public static final String CUSTOMER_QUERY_CODE = "2001";
	/** 客户验证查询接口编码 */
	public static final String CUSTOMER_VALIDATE_CODE = "2002";
	/** 客户新增或修改接口编码 */
	public static final String CUSTOMER_CREATEORUPDATE_CODE = "2003";
	
	/** 黑名单转入/转出接口编码 */
	public static final String BLACK_INANDOUT_CODE = "3001";
	/** 黑名单查询接口编码 */
	public static final String BLACK_QUERY_CODE = "3002";
	/** 黑名单验证查询接口编码 */
	public static final String BLACK_VALIDATE_CODE = "3003";
	
	/** 还款计划查询接口编码 */
	public static final String REPAYMENT_PLAN_CODE = "5003";
	/** 多个合同文件生成接口编码 */
	public static final String CONTRACT_GENERATE_CODE = "5004";
	
	/** 单个合同文件生成接口编码 */ // 后期改造 贷后 结清单
	public static final String CONTRACT_SINGLE_GENERATE_CODE = "5005";
	
	/** 有效产品查询接口交易编码 6001 */
	public static final String PROD_BR_CODE = "6001";
	
	/** 产品明细查询接口交易编码 6002 */
	public static final String PROD_PROPERTY_CODE = "6002";
	

	/** 合同调配登记接口编码 */
	public static final String CONTRACT_ALLOCATE_CODE = "1001";
	/** 合同调配结果查询接口编码 */
	public static final String CONTRACT_ALLOCATE_RESULT_CODE = "1002";
	/** 合同审核通过结果登记接口编码 */
	public static final String CONTRACT_AUDIT_PASS_CODE = "1003";
	/** 合同审核不通过登记接口编码 */
	public static final String CONTRACT_AUDIT_NOPASS_CODE = "1004";
	/** 合同签订退回登记接口编码 */
	public static final String CONTRACT_SIGN_BACK_CODE = "1007";
	/** 放款结果查询接口编码 */
	public static final String LOAN_RESULT_CODE = "1006";
	/** 放款信息变更登记接口编码 */
	public static final String LOAN_INFO_UPDATE_CODE = "1005";
	
	/** 根据合同编号查询贷款明细接口编码 */
	public static final String QUERY_LOANINFO_BYCONTRACT_CODE = "1008";
	
	/** 客户查询业务编码 */
	public static final String CUSTOMER_QUERY_BUSINESSCODE = "LBC01";
	/** 客户验证查询业务编码 */
	public static final String CUSTOMER_VALIDATE_BUSINESSCODE = "LBC02";
	/** 客户新增或修改业务编码 */
	public static final String CUSTOMER_CREATEORUPDATE_BUSINESSCODE = "LBC03";
	
	/** 黑名单转入/转出业务编码 */
	public static final String BLACK_INANDOUT_BUSINESSCODE = "LBB01";
	/** 黑名单查询业务编码 */
	public static final String BLACK_QUERY_BUSINESSCODE = "LBB02";
	/** 黑名单验证查询业务编码 */
	public static final String BLACK_VALIDATE_BUSINESSCODE = "LBB03";
	
	/** 还款计划查询接口业务编码 */
	public static final String REPAYMENT_PLAN_BUSINESSCODE = "LBH03";
	/** 多个合同文件生成接口业务编码 */
	public static final String CONTRACT_GENERATE_BUSINESSCODE = "LBH04";
	
	/** 单个合同文件生成接口业务编码 */
	public static final String CONTRACT_SINGLE_GENERATE_BUSINESSCODE = "LBH05";
		
	/** 有效产品查询接口业务编码 LBP01*/
	public static final String PROD_INTER_CODE = "LBP01";
	
	/** 产品明细查询接口业务编码 LBP02*/
	public static final String PROD_PROPERTY_BUSINESSCODE = "LBP02";
	
	
	/** 合同调配登记业务编码 */
	public static final String CONTRACT_ALLOCATE_BUSINESSCODE = "LFB01";
	/** 合同调配结果查询业务编码 */
	public static final String CONTRACT_ALLOCATE_RESULT_BUSINESSCODE = "LFB02";
	/** 合同审核通过结果登记业务编码 */
	public static final String CONTRACT_AUDIT_PASS_BUSINESSCODE = "LFB03";
	/** 合同审核不通过登记业务编码 */
	public static final String CONTRACT_AUDIT_NOPASS_BUSINESSCODE = "LFB04";
	/** 合同签订退回登记业务编码 */
	public static final String CONTRACT_SIGN_BACK_BUSINESSCODE = "LFB07";
	/** 放款结果查询业务编码 */
	public static final String LOAN_RESULT_BUSINESSCODE = "LFB06";
	/** 放款信息变更登记业务编码 */
	public static final String LOAN_INFO_UPDATE_BUSINESSCODE = "LFB05";
	
	/** 根据合同编号查询贷款明细编码 */
	public static final String QUERY_LOANIFO_BYCONTRACTNO_BUSINESSCODE = "LFB08";
	
	/** 核心还款计划查询接口编码 */
	public static final String REPAYMENT_PLAN_CORE_CODE = "2025";
	/** 核心还款计划查询业务编码*/
	public static final String REPAYMENT_PLAN_CORE_BUSINESSCODE = "LBB18";
	/** 核心还款明细查询接口编码 */
	public static final String REPAYMENT_INFO_CORE_CODE = "2021";
	/** 核心还款明细查询业务编码*/
	public static final String REPAYMENT_INFO_CORE_BUSINESSCODE = "LBB14";
	
	/** 汇法网个人、企业精确查询接口编码 */
	public static final String HUI_FAWANG_CODE = "7001";
	/** 汇法网个人、企业精确查询接口业务编码*/
	public static final String HUI_FAWANG_CODE_BUSINESSCODE = "HFW01";
	
	/** 同盾黑名单查询接口编码 */
	public static final String TD_BLACK_CODE = "8001";
	/** 同盾黑名单查询接口业务编码*/
	public static final String TD_BLACK_BUSINESSCODE = "TDB01";
	
	/** 鹏元征信查询接口编码 */
	public static final String PY_QUERY_CODE = "8002";
	/** 鹏元征信查询接口业务编码*/
	public static final String PY_QUERY_BUSINESSCODE = "PYQ01";
	
	
	/** 好易联四要素接口编码 */
	public static final String HYL_QUERY_CODE = "5002";
	/** 好易联四要素接口业务编码*/
	public static final String HYL_QUERY_BUSINESSCODE = "WMB56";
	
	/** 鹏元征信查询个人信息接口编码 */
	public static final String PYZX_QUERY_PERSON_CODE = "8008";
	/** 鹏元征信查询个人信息接口业务编码*/
	public static final String PYZX_QUERY_PERSON_BUSINESSCODE = "PYZX02";
	
	/** 鹏元征信查询个人风险接口业务编码*/
	public static final String PYZX_QUERY_PERSON_RISK_CODE = "PYZX03";
	
	/** 鹏元征信查询卡核查接口业务编码*/
	public static final String PYZX_QUERY_PERSON_CARD_CODE = "PYZX04";
	
	/** 鹏元征信查询车辆核查接口业务编码*/
	public static final String PYZX_QUERY_PERSON_CAR_CODE = "PYZX05";
	
	/** 鹏元征信手机核查接口业务编码*/
	public static final String PYZX_QUERY_PERSON_MOBILE_CODE = "PYZX06";
	
	/** 鹏元征信电话反查接口业务编码*/
	public static final String PYZX_QUERY_PERSON_TELPHONE_CODE = "PYZX07";
	
	/** 鹏元征信银行卡三要素查询*/
	public static final String PYZX_BANK_CARD_THREE_CODE = "PYZX08";
	
	/** 鹏元征信银行卡四要素查询*/
	public static final String PYZX_BANK_CARD_FOUR_CODE = "PYZX09";

    /** 鹏元征信学历信息核查接口业务编码*/
    public static final String PYZX_QUERY_EDUCATION_CODE = "PYZX10";
	
	/** 前海征信黑名单查询接口编码 */
	public static final String QHZX_BLACK_QUERY_CODE = "8005";
	/** 前海征信黑名单查询接口业务编码*/
	public static final String QHZX_BLACK_QUERY_BUSINESSCODE = "qhzxbk01";
	
	/** 前海征信黑名单报送接口编码 */
	public static final String QHZX_BLACK_SUBMIT_CODE = "8006";
	/** 前海征信黑名单报送接口业务编码*/
	public static final String QHZX_BLACK_SUBMIT_BUSINESSCODE = "qhzxbk02";
	
	/** 查询聚信立信息接口编码 */
	public static final String JXL_QUERY_CODE = "8004";
	/** 查询聚信立信息接口业务编码*/
	public static final String JXL_QUERY_BUSINESSCODE = "JXL01";
	
	/** 查询元素征信信息接口编码 */
	public static final String YSZX_QUERY_CODE = "8010";
	/** 查询元素征信信息接口业务编码*/
	public static final String YSZX_QUERY_BUSINESSCODE = "YSZX01";
	
	/** 合同捞回接口编码 */
	public static final String GET_BACK_CODE = "1009";
	/** 合同捞回接口业务编码 */
	public static final String GET_BACK_CODE_BUSINESSCODE = "LFB09";
	/** 发送附件至合作商系统接口编码 */
	public static final String ATTACTHINTO_PARTNER_CODE = "9001";
	/** 发送附件至合作商系统接口业务编码 */
	public static final String ATTACTH_INTO_PARTNER_BUSINESSCODE = "HZS11";
	
	/** 展期入账通知接口编码 */
	public static final String ROLL_LOAN_IN_CODE = "2030";
	/** 展期入账通知业务编码*/
	public static final String ROLL_LOAN_IN_BUSINESSCODE = "LBB30";
	
	/**
	 * 车贷产品
	 */
	/** 押品查询接口编码 */
	public static final String YP_QUERY_PRICE_CODE = "2001";
	/** 权证信息查询接口编码 */
	public static final String YP_QUERY_CERTIFICATE_CODE = "2002";
	/** 权证信息查询业务编码 */
	public static final String YP_QUERY_CERTIFICATE_BUSICODE = "LBB02";
	/** 押品查询我司确认价值接口编码 */
	public static final String YP_QUERY_NUCLEAR_PRICE_CODE = "2008";
	/** 押品查询 信贷-估值综合信息接口编码*/
	public static final String YP_QUERY_NUCLEAR_PRICELIST_CODE = "2010";
	/** 押品_查询我司保险信息接口编码 */
	public static final String YP_QUERY_INSURANCE_CODE = "2003";
	/**押品查询我司确认价值业务编码*/
	public static final String YP_QUERY_NUCLEAR_PRICE_BUSINESSCODE = "LBB08";
	/**押品查询 信贷-估值综合信息接口编码*/
	public static final String YP_QUERY_NUCLEAR_PRICELIST_BUSINESSCODE = "LBB10";
	/** 押品查询业务编码 */
	public static final String YP_QUERY_BUSINESSCODE = "LBB01";
	/**押品_查询我司保险信息业务编码*/
	public static final String YP_QUERY_INSURANCE_BUSINESSCODE = "LBB03";
	
	/** 中胜银行卡一致性校验接口编码 */
	public static final String ZS_BANKCARDCHECK_CODE = "8008";
	/** 中胜银行卡一致性校验接口业务编码*/
	public static final String ZS_BANKCARDCHECK_BUSINESSCODE = "ZSIC02";
	
	/** 查询好信度信息接口编码 */
	public static final String CREDOO_QUERY_CODE = "8007";
	/** 查询好信度信息接口业务编码*/
	public static final String CREDOO_QUERY_BUSINESSCODE = "qhzxcredoo01";	
	
	/** 查询前海风险度提示信息接口编码 */
	public static final String RISKDOO_QUERY_CODE = "8015";
	/**查询前海风险度提示信息接口业务编码*/
	public static final String RISKDOO_QUERY_BUSINESSCODE = "qhzxriskdoo";	
	
	
	/**算话征信接口编码**/
	public static String SH_INTERFACE_CODE="9002";//接口编码
	/**算话征信业务编码**/
	public static String SH_BUSINESS_CODE="SHZXPRC";
	
	/** 根据合同编号查询逾期统计信息接口编码 */
	public static String HISTORY_OVERDUERECORD_CODE="2045";//接口编码
	/** 根据合同编号查询逾期统计信息接口编码 */
	public static String HISTORY_OVERDUERECORD_BUSINESS_CODE="LBB46";
	
	/** 录音录像查询接口编码 */
	public static String AUDIO_RESULT_CODE= "5000";
	/** 录音录像查询业务编码 */
	public static String AUDIO_RESULT_BUSINESS_CODE= "SVM01";
	
	/** 录音录像保存数据接口编码 */
	public static String AUDIO_SAVE_CODE= "5001";
	/** 录音录像保存数据业务编码 */
	public static String AUDIO_SAVE_BUSINESS_CODE= "SVM02";
	/** 发送邮件接口编码 */
	public static String SEND_EMAIL_CODE = "6000";
	/** 发送邮件接口业务编码 */
	public static String SEND_EMAIL_BUSINESS_CODE = "loanEmail";
	
	/** 客户开户接口编码 */
	public static final String OPEN_ACCOUNT_CODE = "2053";
	
	/** 客户开户业务编码 */
	public static final String OPEN_ACCOUNT_BUSINESSCODE = "LBB54";
	
	/** 合同主档登记接口编码 */
	public static final String CONTRACT_MASTER_CODE = "2054";
	
	/** 合同主档登记业务编码 */
	public static final String CONTRACT_MASTER_BUSINESSCODE = "LBO01";
	
	/** 放款自动委托提现接口编码*/
	public static final String CREDIT_AUTO_ENTRUSTED_WITHDRAWAL_CODE = "2067";
		
	/** 放款自动委托提现业务编码*/
	public static final String CREDIT_AUTO_ENTRUSTED_WITHDRAWAL_BUSINESSCODE = "LBB67";
	
	/** 合作机构-电子账户查询接口编码*/
	public static final String ELEKTRONISCHES_KONTO_CODE = "2068";
	
	/** 合作机构-电子账户查询开关*/
	public static final String IS_ELEKTRONISCHES_KONTO= "yes";
	
	/** 合作机构-电子账户查询业务编码*/
	public static final String ELEKTRONISCHES_KONTO_BUSINESSCODE = "LOB01";
	
	/** 主数据签章接口编码 */
	public static String MASTER_SEAL_CODE = "8012";
	/** 主数据签章接口业务编码 */
	public static String MASTER_SEAL_BUSINESS_CODE = "ZSJDZQZ";
	
	/** 主数据查询接口协议接口编码 */
	public static String MASTER_LOAN_AGREEMENT_CODE = "8013";
	/** 主数据查询接口协议接口业务编码 */
	public static String MASTER_LOAN_AGREEMENT_BUSINESS_CODE = "ZSJJKXY";
	

	/** 附件回传通知接口编码 */
	public static String ATTACH_RETURN_CODE = "8011";
	/** 附件回传通知接口业务编码 */
	public static String ATTACH_RETURN_BUSINESS_CODE = "FJHCTZ";

	/** 算话反欺诈接口编码 */
	public static String SH_QUERY_FRAUD_CODE = "SH";
	/** 算话反欺诈业务编码 */
	public static String SH_QUERY_FRAUD_BUSINESS_CODE = "SH_QUERY_FRAUD";
	
	/** 算话共享报告查询接口编码 */
	public static String SH_QUERY_SHARE_CODE = "SH";
	/** 算话共享报告查询接口业务编码 */
	public static String SH_QUERY_SHARE_BUSINESS_CODE = "SH_QUERY_SHARE";
	
	/** 算话查询记录查询接口编码 */
	public static String SH_QUERY_QRECODE_CODE = "SH";
	/** 算话查询记录查询接口业务编码 */
	public static String SH_QUERY_QRECODE_BUSINESS_CODE = "SH_QUERY_QRECORD";
	
	/** 主数据签章接口编码 */
	public static String MASTER_FILESEAL_CODE = "8014";
	/** 主数据签章接口业务编码 */
	public static String MASTER_FILESEAL_BUSINESS_CODE = "ZSJWJDZQZ";
	
	/** 查询致诚阿福信息接口编码 */
	public static final String ZC_QUERY_CODE = "8001";
	/** 查询致诚阿福信息接口业务编码*/
	public static final String ZC_QUERY_BUSINESSCODE = "ZCAF01";
	/** 查询电子协会反欺诈黑名单接口编码 */
    public static final String CECA_QUERY_CODE = "8015";
    /** 查询电子协会反欺诈黑名单接口业务编码*/
    public static final String CECA_QUERY_BUSINESSCODE = "CECA";
    
    /** 查询致诚阿福反欺诈信息接口编码 */
    public static final String ZC_QUERY_RISK_CODE = "8002";
    /** 查询致诚阿福反欺诈信息接口业务编码*/
    public static final String ZC_QUERY_RISK_BUSINESSCODE = "ZCAF02";

    /** 查询91征信接口编码 */
    public static final String JIUYI_QUERY_CODE = "8017";

    /** 查询91征信接口业务编码 */
    public static final String JIUYI_QUERY_BUSINESSCODE = "JIUYI01";

    /** 查询凭安催收接口编码 */
    public static final String PA_QUERY_CODE = "8016";

    /** 查询凭安催收接口业务编码 */
    public static final String PA_QUERY_BUSINESSCODE = "PA01";
    
    /** 查询百度金融风险查询接口编码 */
    public static final String BAIDU_QUERY_CODE = "8018";

    /** 查询百度金融风险查询接口业务编码 */
    public static final String BAIDU_QUERY_BUSINESSCODE = "BAIDU01";
    
    /** 查询百度金融LBS地址校验接口编码 */
    public static final String BAIDU_LBS_CODE = "8019";

    /** 查询百度金融LBS地址校验接口业务编码 */
    public static final String BAIDU_LBS_BUSINESSCODE = "BAIDU02";
    
    /** 查询魔盒社保公积金城市列表查询接口编码 */
    public static final String MH_CITY_CODE = "10431";

    /** 查询魔盒社保公积金城市列表查询接口业务编码 */
    public static final String MH_CITY_BUSINESSCODE = "CSB431";
    
    /** 查询魔盒社保公积金登录要素查询接口编码 */
    public static final String MH_FIELD_CODE = "10432";

    /** 查询魔盒社保公积金登录要素查询接口业务编码 */
    public static final String MH_FIELD_BUSINESSCODE = "CSB432";
    
    /** 查询魔盒社保公积金创建任务查询接口编码 */
    public static final String MH_CREATE_CODE = "10433";

    /** 查询魔盒社保公积金创建任务查询接口业务编码 */
    public static final String MH_CREATE_BUSINESSCODE = "CSB433";

    /** 查询魔盒社保公积金结果查询接口编码 */
    public static final String MH_RESULT_CODE = "10434";

    /** 查询魔盒社保公积金结果查询接口业务编码 */
    public static final String MH_RESULT_BUSINESSCODE = "CSB434";
    
    /** 查询坚果网银支持银行列表接口编码 */
    public static final String JG_BANK_CODE = "10421";

    /** 查询坚果网银支持银行列表接口业务编码 */
    public static final String JG_BANK_BUSINESSCODE = "CSB421";
    
    /** 查询坚果网银登录要素查询接口编码 */
    public static final String JG_LOGIN_CODE = "10422";

    /** 查询坚果网银登录要素接口业务编码 */
    public static final String JG_LOGIN_BUSINESSCODE = "CSB422";
    
    /** 查询坚果网银创建任务接口编码 */
    public static final String JG_CREATE_CODE = "10423";

    /** 查询坚果网银创建任务接口业务编码 */
    public static final String JG_CREATE_BUSINESSCODE = "CSB423";
    
    /** 查询坚果网银查询银行卡信息接口编码 */
    public static final String JG_CARD_CODE = "10424";

    /** 查询坚果网银查询银行卡信息接口业务编码 */
    public static final String JG_CARD_BUSINESSCODE = "CSB424";
    
    /** 查询坚果网银查询账单信息接口编码 */
    public static final String JG_BILL_CODE = "10425";

    /** 查询坚果网银查询账单信息接口业务编码 */
    public static final String JG_BILL_BUSINESSCODE = "CSB425";
    

    
    /** 新颜征信 身份探针接口编码 */
    public static final String XYZX_QUERY_IDENTITY_PROBE_CODE = "10501";
    /** 新颜征信 身份探针接口业务编码*/
    public static final String XYZX_QUERY_IDENTITY_PROBE_BUSINESSCODE = "XYZX01";
    

    /** 新颜征信 征信雷达报告接口编码 */
    public static final String XYZX_QUERY_CREDIT_RADAR_CODE = "10502";
    /** 新颜征信 征信雷达报告接口业务编码*/
    public static final String XYZX_QUERY_CREDIT_RADAR_BUSINESSCODE = "XYZX02";
    
}
