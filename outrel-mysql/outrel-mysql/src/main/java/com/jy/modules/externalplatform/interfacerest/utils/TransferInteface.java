package com.jy.modules.externalplatform.interfacerest.utils;

import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.fintech.platform.api.sysconfig.SysConfigAPI;
import com.jy.modules.externalplatform.interfacerest.dto.ExtInterfaceLogDTO;

/**
 *  
 * @desc 调用esb
 * @date 2015-05-13
 * 
 */
@Component("com.jy.modules.externalplatform.interfacerest.utils.TransferInteface")
public class TransferInteface{
  	
    /**
     * post方式 json
     * @param url
     * @param params
     * @return
     * @throws Exception
     */
    public static String executeHttpPost(String url, String json, ExtInterfaceLogDTO extInterfaceLogDTO) { 
    	String result = "";
    	try{
            HttpClient client = HttpClients.createDefault(); 
            HttpPost httpPost = new HttpPost(url);  
            httpPost.setHeader("Content-type", "application/json; charset=utf-8");
            WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();    
            ServletContext servletContext = webApplicationContext.getServletContext();
            ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
            SysConfigAPI sysConf = (SysConfigAPI) context.getBean("sysConfigAPI");
            int REQUEST_TIMEOUT =0;
            int TIMEOUT =0;
            int SO_TIMEOUT =0;
            if(null!=sysConf.getValue("REQUEST_TIMEOUT")){//请求超时时间
                REQUEST_TIMEOUT = Integer.valueOf(sysConf.getValue("REQUEST_TIMEOUT"));
            }
            if(null!=sysConf.getValue("TIMEOUT")){// 连接超时时间
                TIMEOUT = Integer.valueOf(sysConf.getValue("TIMEOUT"));
            }
            if(null!=sysConf.getValue("SO_TIMEOUT")){// 数据传输超时
                SO_TIMEOUT = Integer.valueOf(sysConf.getValue("SO_TIMEOUT"));
            }
    		RequestConfig requestConfig = RequestConfig.custom()
    				.setSocketTimeout(SO_TIMEOUT).setConnectTimeout(TIMEOUT)
    				.setConnectionRequestTimeout(REQUEST_TIMEOUT)
    				.setExpectContinueEnabled(false).build();

    		httpPost.setConfig(requestConfig);
    		httpPost.setEntity(new StringEntity(json, "utf-8"));  
            HttpResponse response = client.execute(httpPost);  
            HttpEntity entity = response.getEntity();
            result = EntityUtils.toString(entity, "utf-8");

    	} catch(Exception e) {
    	    result = e.getMessage();
			e.printStackTrace();
    	}
        return result;
    }
    
    /**
     * get方式 请求 json
     * @param url
     * @param params
     * @return
     * @throws Exception
     */
    public static String executeHttpGet(String url, Map<String, Object> params, ExtInterfaceLogDTO extInterfaceLogDTO) {
    	String result = "";
    	try {
	    	HttpClient client = HttpClients.createDefault();
	    	HttpGet httpGet = new HttpGet(url);
	    	httpGet.setHeader("Content-type", "application/json; charset=utf-8");
	    	WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();    
            ServletContext servletContext = webApplicationContext.getServletContext();
            ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
            SysConfigAPI sysConf = (SysConfigAPI) context.getBean("sysConfigAPI");
            int REQUEST_TIMEOUT =0;
            int TIMEOUT =0;
            int SO_TIMEOUT =0;
            if(null!=sysConf.getValue("REQUEST_TIMEOUT")){
                REQUEST_TIMEOUT = Integer.valueOf(sysConf.getValue("REQUEST_TIMEOUT"));
            }
            if(null!=sysConf.getValue("TIMEOUT")){
                TIMEOUT = Integer.valueOf(sysConf.getValue("TIMEOUT"));
            }
            if(null!=sysConf.getValue("SO_TIMEOUT")){
                SO_TIMEOUT = Integer.valueOf(sysConf.getValue("SO_TIMEOUT"));
            }
	    	RequestConfig requestConfig = RequestConfig.custom()
					.setSocketTimeout(SO_TIMEOUT).setConnectTimeout(TIMEOUT)
					.setConnectionRequestTimeout(REQUEST_TIMEOUT)
					.setExpectContinueEnabled(false).build();
	    	httpGet.setConfig(requestConfig);
	    	HttpResponse response = client.execute(httpGet);  
	        HttpEntity entity = response.getEntity();
	        result = EntityUtils.toString(entity, "utf-8");
    	} catch(Exception e) {
            result = e.getMessage();
			e.printStackTrace();
    	}
    	return result;
    }   
    
    /**
     * post方式 请求 esb XML格式
     * @author 豆永亮
     * @param url
     * @param params
     * @return
     * @throws Exception
     */
    public static String executeHttpPostEsbByXml(String url, String xml, ExtInterfaceLogDTO extInterfaceLogDTO) {
    	String result = null;
    	try {
    		HttpClient client = HttpClients.createDefault(); 
            HttpPost httpPost = new HttpPost(url);  
            httpPost.setHeader("Content-type", "text/xml; charset=utf-8");
            WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();    
            ServletContext servletContext = webApplicationContext.getServletContext();
            ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
            SysConfigAPI sysConf = (SysConfigAPI) context.getBean("sysConfigAPI");
            int REQUEST_TIMEOUT =0;
            int TIMEOUT =0;
            int SO_TIMEOUT =0;
            if(null!=sysConf.getValue("REQUEST_TIMEOUT")){
                REQUEST_TIMEOUT = Integer.valueOf(sysConf.getValue("REQUEST_TIMEOUT"));
            }
            if(null!=sysConf.getValue("TIMEOUT")){
                TIMEOUT = Integer.valueOf(sysConf.getValue("TIMEOUT"));
            }
            if(null!=sysConf.getValue("SO_TIMEOUT")){
                SO_TIMEOUT = Integer.valueOf(sysConf.getValue("SO_TIMEOUT"));
            }
    		RequestConfig requestConfig = RequestConfig.custom()
    				.setSocketTimeout(SO_TIMEOUT).setConnectTimeout(TIMEOUT)
    				.setConnectionRequestTimeout(REQUEST_TIMEOUT)
    				.setExpectContinueEnabled(false).build();

    		httpPost.setConfig(requestConfig);
    		httpPost.setEntity(new StringEntity(xml, "utf-8"));  
            HttpResponse response = client.execute(httpPost);  
            HttpEntity entity = response.getEntity();
            result = EntityUtils.toString(entity, "utf-8"); 
    	} catch(Exception e) {
            result = e.getMessage();
			e.printStackTrace();
    	}
    	return result;
    }
    
}
