package com.jy.modules.befloan.callthirdbiz.Message;

import java.nio.charset.CodingErrorAction;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.ConnectionConfig;
import org.apache.http.config.MessageConstraints;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.config.SocketConfig;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;

/**
 * @desc 发送消息工具类
 * @author 豆永亮
 * @date 2015-01-22
 * 
 */
@Component("com.jy.modules.befloan.callthirdbiz.Message.MessageUtil")
public class MessageUtil {
	private static final int REQUEST_TIMEOUT = 30 * 1000; // 设置请求超时10秒钟
    private static final int TIMEOUT         = 60 * 1000; // 连接超时时间
    private static final int SO_TIMEOUT      = 60 * 1000; // 数据传输超时
    private static final int MAX_TOTAL      = 200; // 最大链接数
    private static final int DEFAULT_MAX_PERROUTE = 50; // 默认路由最大链接数
    private static final String CHARSET      = "UTF-8";
    
    private static PoolingHttpClientConnectionManager connManager = null;
    private static CloseableHttpClient httpClient = null;

	static {
		try {
			// SSLContext
			SSLContextBuilder sslContextbuilder = new SSLContextBuilder();
			sslContextbuilder.useTLS();
			SSLContext sslContext = sslContextbuilder.loadTrustMaterial(null,
					new TrustStrategy() {
						// 信任所有
						public boolean isTrusted(X509Certificate[] chain,
								String authType) throws CertificateException {
							return true;
						}
					}).build();

			Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder
					.<ConnectionSocketFactory> create()
					.register("http", PlainConnectionSocketFactory.INSTANCE)
					.register(
							"https",
							new SSLConnectionSocketFactory(
									sslContext,
									SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER)).build();
			
			// Create ConnectionManager
			connManager = new PoolingHttpClientConnectionManager(
					socketFactoryRegistry);

			// Create socket configuration
			SocketConfig socketConfig = SocketConfig.custom()
					.setTcpNoDelay(true).build();
			connManager.setDefaultSocketConfig(socketConfig);

			// Create message constraints
			MessageConstraints messageConstraints = MessageConstraints.custom()
					.setMaxHeaderCount(200).setMaxLineLength(2000).build();

			// Create connection configuration
			ConnectionConfig connectionConfig = ConnectionConfig.custom()
					.setMalformedInputAction(CodingErrorAction.IGNORE)
					.setUnmappableInputAction(CodingErrorAction.IGNORE)
					.setCharset(Consts.UTF_8)
					.setMessageConstraints(messageConstraints).build();

			connManager.setDefaultConnectionConfig(connectionConfig);
			connManager.setMaxTotal(MAX_TOTAL);
			connManager.setDefaultMaxPerRoute(DEFAULT_MAX_PERROUTE);

			// Create httpClient
			httpClient = HttpClients.custom().disableRedirectHandling()
					.setConnectionManager(connManager).build();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
    
    /**
     * @desc 发送短信消息
     * @author 豆永亮
     * @param url 地址
	 * @param phones 手机号码,多个手机号码通过英文分号隔开
	 * @param content 发送内容
	 * @param sendTime 短信发送时间
     * @return String 返回类型
     * @date 2015-01-22
     */
	public static String sendSms(String url, String phones, String content, String sendTime) {
		String xmlString = XmlObjectUtil.getSmsXML("0", "0000", phones,
				content, sendTime);
		return doPost(url, xmlString);
	}
	
	/**
	 * @desc 发送邮件消息
	 * @author 豆永亮
	 * @param url 地址
	 * @param emailSubject 主题
	 * @param emailContent 邮件内容
	 * @param singleFlag 是否单发邮件 1：单独给某个email地址发信 0：使用收件人列表地址群发邮件
	 * @param singleName 收件人姓名 
	 * @param singleEmail 收件人的email地址
	 * @param receiver 收件人列表（暂时不支持）
	 * @param attachFlag 附件标志  0为没有附件1为有附件
	 * @param name 附件文件名 
	 * @param type 附件的MIME类型 (可选)
	 * @param content 附件内容
	 * @return
	 */
	public static String sendMail(String url,String emailSubject,String emailContent,
			int singleFlag,String singleName,String singleEmail,String receiver,
			String attachFlag,String name,String type,String content){
		String xmlString = XmlObjectUtil.getMailXML("0", "0000", 
				emailSubject, emailContent, singleFlag, singleName, 
				singleEmail, receiver, attachFlag, name, type, content);
		return doPost(url, xmlString);
	}
    
    /**
     * @desc post请求方式
     * @author 豆永亮
     * @param url
     * @param jsonXMLString
     * @return String
     * @date 2015-01-22
     */
	private static String doPost(String url, String xmlString) {
		HttpPost httpPost = new HttpPost(url);
		httpPost.setHeader("Content-type", "text/xml; charset=utf-8");

		RequestConfig requestConfig = RequestConfig.custom()
				.setSocketTimeout(SO_TIMEOUT).setConnectTimeout(TIMEOUT)
				.setConnectionRequestTimeout(REQUEST_TIMEOUT)
				.setExpectContinueEnabled(false).build();

		httpPost.setConfig(requestConfig);// RequestConfig.DEFAULT

		String responseContent = ""; // 响应内容
		try {
			httpPost.setEntity(new StringEntity(xmlString, CHARSET));
			// 执行post请求
			HttpResponse httpResponse = httpClient.execute(httpPost);
			// 获取HTTP响应的状态码
			int statusCode = httpResponse.getStatusLine().getStatusCode();
			if (statusCode == HttpStatus.SC_OK) {
				// 获取响应消息实体
				HttpEntity entityRep = httpResponse.getEntity();
				if (entityRep != null) {
					responseContent = EntityUtils.toString(entityRep, CHARSET);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			httpPost.releaseConnection();
		}
		return responseContent;
	}
}
