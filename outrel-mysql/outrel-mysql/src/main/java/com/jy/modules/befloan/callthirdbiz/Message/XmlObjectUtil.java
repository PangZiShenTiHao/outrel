package com.jy.modules.befloan.callthirdbiz.Message;

/**
 * @desc 组装xml字符串
 * @author 豆永亮
 * @date 2015-01-22
 */
public class XmlObjectUtil {
	
	/**
	 * @desc 返回发送短信消息的xml字符串
	 * @author 豆永亮
	 * @param commstat 通讯处理状态
	 * @param errorcode 业务系统响应码
	 * @param phones 手机号码,多个手机号码通过英文分号隔开
	 * @param content 发送内容
	 * @param sendTime 短信发送时间
	 * @return String 返回类型
	 * @date 2015-01-22
	 */
	public static String getSmsXML(String commstat, String errorcode, String phones, String content, String sendTime) {
		 StringBuffer sb = new StringBuffer("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
		 sb.append("<service>\n")
		 .append(getHeadObject(commstat, errorcode))
		 .append("<body>\n")
		 .append("<phones>").append(phones).append("</phones>\n")
		 .append("<content>").append(content).append("</content>\n")
		 .append("<sendtime>").append(sendTime).append("</sendtime>\n")
		 .append("</body>\n")
		 .append("</service>");
		 return sb.toString();
	 }
	
	/**
	 * @desc 返回邮件消息的xml字符串
	 * @author 豆永亮
	 * @param commstat 通讯处理状态
	 * @param errorcode 业务系统响应码
	 * @param emailSubject 邮件主题
	 * @param emailContent 邮件内容 
	 * @param singleFlag 是否单发邮件.默认为0 
	 * @param singleName 收件人姓名 
	 * @param singleEmail 收件人的email地址
	 * @param receiver 收件人列表（暂时不支持）
	 * @param attachFlag 附件标志  0为没有附件1为有附件
	 * @param name 附件文件名 
	 * @param type 附件的MIME类型 (可选)
	 * @param content 附件内容
	 * @return
	 */
	public static String getMailXML(String commstat, String errorcode,
			String emailSubject, String emailContent,
			int singleFlag,String singleName,String singleEmail,String receiver,
			String attachFlag,String name,String type,String content) {
		StringBuffer sb = new StringBuffer(
				"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
		sb.append("<service>\n")
				.append(getHeadObject(commstat, errorcode)).append("<body>\n")
				.append("<email_subject>").append(emailSubject).append("</email_subject>\n")
				.append("<email_content>").append(emailContent).append("</email_content>\n")
				.append("<single_flag>").append(singleFlag).append("</single_flag>\n")
				.append("<single_name>").append(singleName).append("</single_name>\n")
				.append("<single_email>").append(singleEmail).append("</single_email>\n")
				.append("<receiver>").append(receiver).append("</receiver>\n")
				.append("<attach_flag>").append(attachFlag).append("</attach_flag>\n");
		if("1".equals(attachFlag)){
			sb.append("<attachs>\n")
			  .append("<attach>\n")
			  .append("<name>").append(name).append("</name>")
			  .append("<content>").append(content).append("</content>")
			  .append("<type>").append(type).append("</type>")
			  .append("</attach>")
			  .append("</attachs>");			  
		}
		sb.append("</body>\n")
		  .append("</service>");
		return sb.toString();
	}
	 
	/**
	 * @desc 返回head
	 * @author 豆永亮
	 * @param commstat
	 * @param errorcode
	 * @return String
	 * @date 2015-01-22
	 */
	 private static String getHeadObject(String commstat, String errorcode) {
		 StringBuffer sb = new StringBuffer();
		 sb.append("<esbhead>\n")
		 .append("<commstat>").append(commstat).append("</commstat>\n")
		 .append("<errorcode>").append(errorcode).append("</errorcode>\n")
		 .append("<errorinfo></errorinfo>\n")
		 .append("</esbhead>");
		 return sb.toString();
	 }
}
