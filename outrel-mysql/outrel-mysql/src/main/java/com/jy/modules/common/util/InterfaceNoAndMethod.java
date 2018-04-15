package com.jy.modules.common.util;

import org.apache.commons.lang3.StringUtils;

public enum InterfaceNoAndMethod {
	NFCS_0001("NFCS_0001","com.jy.modules.befloan.nfcs.service.LbTPersonalReportService2"),//上海资信查询      
	ZSIC01_8003("ZSIC01_8003","com.jy.modules.befloan.lbtzsidentitycheckrst.service.LbtZsIdentityCheckRstService2"),//中胜身份校验   
	ZSIC02_8008("ZSIC02_8008","com.jy.modules.befloan.lbtbankcardcheck.service.LbtBankCardCheckService2"),//中胜银行卡校验    
	YSZX01_8010("YSZX01_8010","com.jy.modules.befloan.yszx.extyszxoperate.service.ExtYszxOperateService2"),//元素征信 
	QHZXCREDOO_8007("QHZXCREDOO_8007","com.jy.modules.extbiz.in.qhzx.extqhzxcredoo.service.ExtQhzxCredooService2"),//前海征信好信度
	QHZXBK01_8005("QHZXBK01_8005","com.jy.modules.extbiz.in.qhzx.extqhzxblackresult.service.ExtQhzxBlackResultService2"),//前海征信黑名单查询
	TDB01_8001("TDB01_8001","com.jy.modules.befloan.tdfraudmetrix.service.TdfraudmetrixService2"),//同盾黑名单查询
	HFW01_7001_01("HFW01_7001_01","com.jy.modules.befloan.lawxp.service.LbtLawxpPersonalInfoService2"),//汇法个人查询
	HFW01_7001_02("HFW01_7001_02","com.jy.modules.befloan.lawxp.service.LbtLawCompanyService2"),//汇法企业查询
	SJT_0001("SJT_0001","com.jy.modules.extbiz.in.sjt.message.QueryCreditInfoService2"),//数据堂个人消费查询
	CREDIT_0001("100CREDIT_0001","com.jy.modules.befloan.brreport.service.LbTBrReportService2"),//百融征信查询
	SHZXPRC_9002("SHZXPRC_9002","com.jy.modules.extbiz.in.shzx.extshpersonalreport.service.ExtShPersonalReportService2"),//算话征信人行信用报告
	SHZX_0001("SHZX_0001","com.jy.modules.extbiz.in.shzx.message.QueryQrecordReportService2"),//算话征信查询记录
	SH_QUERY_FRAUD("SH_QUERY_FRAUD","com.jy.modules.extbiz.in.shzx.message.QueryFrandReportService2"),//算话征信反欺诈查询
	SHZX_0002("SHZX_0002","com.jy.modules.extbiz.in.shzx.message.QueryCreditQueryReportService2"),//算话征信贷款信息查询
	JXL01_8004("JXL01_8004","com.jy.modules.befloan.junxinli.extjxloperate.service.ExtJxlOperateService2"),//聚信立信息采集
	PYZX03_8008("PYZX03_8008","com.jy.modules.extbiz.in.pycredit.inf.PyzxCommonHandProcessor2"),//鹏元征信个人风险查询
	PYZX06_8008("PYZX06_8008","com.jy.modules.extbiz.in.pycredit.inf.PyzxCommonHandProcessor3"),//鹏元征信手机核查
	PYZX04_8008("PYZX04_8008","com.jy.modules.extbiz.in.pycredit.inf.PyzxCommonHandProcessor4"),//鹏元征信查询卡核查接口
	PYZX07_8008("PYZX07_8008","com.jy.modules.extbiz.in.pycredit.inf.PyzxCommonHandProcessor5"),//鹏元征信电话反查
	SHUMEI01_8009("SHUMEI01_8009","com.jy.modules.extbiz.in.sm.extsmmultiloan.service.ExtSmMultiloanProcesser"),//数美平台借贷服务接口
    SHUMEI02_8009("SHUMEI02_8009","com.jy.modules.extbiz.in.sm.extsmoverdue.service.ExtSmOverdueProcesser"),//数美逾期黑名单服务接口
    SHUMEI03_8009("SHUMEI03_8009","com.jy.modules.extbiz.in.sm.extsmmalagentphone.service.ExtSmMalagentPhoneProcesser"),//数美金融中介识别服务接口
    SHUMEI04_8009("SHUMEI04_8009","com.jy.modules.extbiz.in.sm.extsmlabelsinfo.service.ExtSmLabelsInfoProcesser"),//数美手机号码标签服务接口
    SHUMEI05_8009("SHUMEI05_8009","com.jy.modules.extbiz.in.sm.extsmpoiinfo.service.ExtSmPoiInfoProcesser"),//数美黄页服务接口
	HADAO01_9041("HADAO01_9041","com.jy.modules.externalplatform.interfacerepository.yszx.extyszxhdinfo.service.ExtHdCreditInfoWLProcesser"),//华道信贷
	HADAO02_9041("HADAO02_9041","com.jy.modules.externalplatform.interfacerepository.yszx.extyszxhdinfo.service.ExtHdPhoneBckLisInfoWLProcesser");//华道手机黑名单

    
	private String key;
	private String value;

	private InterfaceNoAndMethod(String key, String value) {
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
	* @title: getValueByKey
	* @author:相立鹏
	* @description: 根据key获取对应的value
	* @date 2017年5月25日 下午2:17:37
	* @param key
	* @return
	* @throws 
	*/ 
	public static String getValueByKey(String key) {
		String value = null;

		if (StringUtils.isEmpty(key)) {
			return value;
		}

		for (InterfaceNoAndMethod s : values()) {
			if (s.getKey().equals(key)) {
				value = s.getValue();
				break;
			}
		}
		return value;
	}
}
