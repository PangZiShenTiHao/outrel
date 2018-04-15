package com.jy.modules.antifraud.base;

import java.lang.reflect.Field;

/**
 * 定义 反欺诈校验  参数 变量key 
 * 多个相同参数如：APP_USER_ID_1,APP_USER_ID_2
 * @author JY-IT-D001
 *
 */
public class AntiFraudConstant {
 	/**证件号码*/
 	public static String CARD_TYPE="cardType";
	
 	/**证件号码*/
 	public static String CARD_ID="cardId";

 	/**客户名称*/
 	public static String CUST_NAME="custName";

 	/**性别*/
 	public static String SEX="sex";
 	
 	/**出生日期*/
 	public static String BIRTHDAY="birthday";
 	

 	/**移动电话*/
 	public static String MOBILE_PHONE="mobilephone";

 	/**住宅电话*/
 	public static String TELPHONE="telphone";
 	
 	/**住宅电话*/
 	public static String TELPHONE_AREA_CODE="telphoneAreaCode";
 	
 	/**电子邮件*/
 	public static String EMAIL="email";

 	/**户籍详细地址*/
 	public static String HOMETOWN_ADDR="hometownAddr";
 	/**户籍详细地址*/
 	public static String HOMETOWN_ADDR_ALL="hometownAddrAll";
 	/**户籍详细地址前缀编码*/
 	public static String HOMETOWN_ADDR_CODE="hometownAddrCode";
 	
 	

 	/**现住址*/
 	public static String CURRENT_ADDR="currentAddr";
 	/**现住址*/
 	public static String CURRENT_ADDR_ALL="currentAddrAll";
	/**现住址编码*/
 	public static String CURRENT_ADDR_CODE="currentAddrCode";
 	
 	

 	/**月供*/
 	public static String H_MON_PAYMENT="hMonPayment";

 	/**共同居住者*/
 	public static String HOME_PARTNER="homePartner";

 	/**共同居住者其他说明*/
 	public static String OTHER_REMARK="otherRemark";

 	 
 	/**个人年收入*/
 	public static String AFTER_TAX_MONTHLY_INCOME="afterTaxMonthlyIncome";

 	/**支出金额(元)*/
 	public static String PAY_AMOUNT="payAmount";

 	/**每月家庭支出*/
 	public static String FAM_MON_PAY="famMonPay";

 	/**信用卡最高额度*/
 	public static String MAX_CREDIT_AMOUNT="maxCreditAmount";
 	
 	/**进件日期*/
 	public static String INTO_DATE="intoDate";
 	
	/**学历*/
 	public static String EDUCATION="education";
 	
	/**婚姻状况*/
 	public static String MARITALSTATUS="maritalstatus";
 	
 	/**进件ID*/
 	public static String INTO_ID="intoId";
 	
 	/**客户ID*/
 	public static String CUST_ID="custId";
 	
 	/**客户进件关系ID*/
 	public static String INTO_CUST_REF_ID="fkIntoCustRefId";
 	
 	
 	
 	/**联系人姓名*/
 	public static String LINK_NAME="linkName";
 	
	/**联系人电话*/
 	public static String LINK_PHONE="linkPhone";
 	
 	/**联系人区号*/
 	public static String LINK_PHONE_AREA_CODE="linkPhoneAreaCode";
 	
 	/**联系人电话*/
 	public static String LINK_PHONE_ALL="linkPhoneAll";
 	
 	
 	
 	/**家庭联系电话*/
 	public static String FAMILY_LINK_PHONE="familyLinkPhone";
 	
 	/**家庭联系电话*/
 	public static String FAMILY_LINK_PHONE_ALL="familyLinkPhoneAll";
 	
 	
	/**单位（公司）联系电话*/
 	public static String COMPANY_LINK_PHONE="companyLinkPhone";
 	
	/**单位（公司）联系电话*/
 	public static String COMPANY_LINK_PHONE_ALL="companyLinkPhoneAll";
 	
 	
 	
 	
	/**紧急联系电话*/
 	public static String URGENT_LINK_PHONE="urgentLinkPhone";
 	
 	/**紧急联系电话*/
 	public static String URGENT_LINK_PHONE_ALL="urgentLinkPhoneAll";
 	

	
	/**单位（公司）地址*/
	public static String COMPANY_ADDRESS="companyAddress";
	/**单位（公司）地址*/
	public static String COMPANY_ADDRESS_ALL="companyAddressAll";
	/**单位（公司）地址前缀*/
	public static String COMPANY_ADDRESS_CODE="companyAddressCode";
	
	
	
	
	/**单位（公司）电话*/
	public static String J_PHONE="jPhone";
	public static String J_PHONE_AREA_CODE="jPhoneAreaCode";
	
	
	/**单位（公司）名称*/
	public static String COMPANY_NAME="companyName";
	
	
	
	
	
	
	/**进入该单位时间*/
	public static String JENTERT="jEnterT";
	
	/**所在部门*/
	public static String JDEPT="jDept";
	
	/**担任职务*/
	public static String JPOSITION="jPosition";
	
	
	
	
	/**以下为联系人地址信息全部**/
	
 	/**家庭联系人家庭地址*/
 	public static String FAMILY_CONTACT_HOME_ADDR="linkPersonHomeAddr";
 	/**家庭联系人家庭地址*/
 	public static String FAMILY_CONTACT_HOME_ADDR_ALL="linkPersonHomeAddrAll";
 	/**家庭联系人家庭地址*/
 	public static String FAMILY_CONTACT_HOME_ADDR_CODE="linkPersonHomeAddrCode";
 	
 	
 	/**家庭联系人工作地址*/
 	public static String FAMILY_CONTACT_JOB_ADDR="linkPersonJobAddr";
 	/**家庭联系人工作地址*/
 	public static String FAMILY_CONTACT_JOB_ADDR_ALL="linkPersonJobAddrAll";
	/**家庭联系人工作地址*/
 	public static String FAMILY_CONTACT_JOB_ADDR_CODE="linkPersonJobAddrCode";
 	
 	
 	
	/**单位（公司）联系人家庭地址*/
 	public static String COMPANY_CONTACT_HOME_ADDR="companyLinkAddr";
 	/**单位（公司）联系人家庭地址*/
 	public static String COMPANY_CONTACT_HOME_ADDR_ALL="companyLinkAddrAll";
 	/**单位（公司）联系人家庭地址*/
 	public static String COMPANY_CONTACT_HOME_ADDR_CODE="companyLinkAddrCode";
 	
 	
 	
	/**单位（公司）联系人工作地址*/
 	public static String COMPANY_CONTACT_JOB_ADDR="companyLinkAddr";
 	/**单位（公司）联系人工作地址*/
 	public static String COMPANY_CONTACT_JOB_ADDR_ALL="companyLinkAddrAll";
 	/**单位（公司）联系人工作地址*/
 	public static String COMPANY_CONTACT_JOB_ADDR_CODE="companyLinkAddrCode";
 	
 	
 	
 	
	/**紧急联系人家庭地址*/
 	public static String URGENT_CONTACT_HOME_ADDR="urgentLinkAddr";
 	/**紧急联系人家庭地址*/
 	public static String URGENT_CONTACT_HOME_ADDR_ALL="urgentLinkAddrAll";
 	/**紧急联系人家庭地址*/
 	public static String URGENT_CONTACT_HOME_ADDR_CODE="urgentLinkAddrCode";
 	
	/**紧急联系人*/
	public static String URGENT_CONTACT_PERSON = "2";
	/**家庭联系人*/
	public static String FAMILY_CONTACT_PERSON = "3";
	/**工作联系人*/
	public static String WORK_CONTACT_PERSON = "4";
	
	/**申请人人*/
	public static String APPLY_PERSON = "10";
 	
 	
	
	/**紧急联系人工作地址*/
 	public static String URGENT_CONTACT_JOB_ADDR="urgentLinkAddr";
 	/**紧急联系人工作地址*/
 	public static String URGENT_CONTACT_JOB_ADDR_ALL="urgentLinkAddrAll";
 	/**紧急联系人工作地址*/
 	public static String URGENT_CONTACT_JOB_ADDR_CODE="urgentLinkAddrCode";
 	
 	
 	
 	
 	public static String getColumnByKey(String fieldName){
 		Class ownerClass = AntiFraudConstant.class;
 	    Field field;
 	    Object property=null;
		try {
			field = ownerClass.getField(fieldName);
			property = field.get(ownerClass);
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 	    return (String) property;
 	}
 	
}




	