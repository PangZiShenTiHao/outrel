/*package com.jy.modules.befloan.callthirdbiz;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fintech.platform.api.sysconfig.SysConfigAPI;
import com.fintech.platform.core.common.JYLoggerUtil;
import com.fintech.platform.core.message.HeaderBean;
import com.fintech.platform.core.message.ResponseMsg;
import com.fintech.platform.restclient.http.RestClient;
import com.jy.modules.befloan.interfacelog.lbttransferlog.dto.LbTTransferLogDTO;
import com.jy.modules.befloan.interfacelog.lbttransferlog.service.LbTTransferLogService;

*//**
 * 调用核心系统接口实现类
 * @author 豆永亮
 *
 *//*
@Service("com.jy.modules.befloan.callthirdbiz.EsbCallService")
public class EsbCallService implements Serializable {

	private static final long serialVersionUID = 1L;
//	private static ResourceBundle bundle = ResourceBundle.getBundle("esb_url");
	private static SimpleDateFormat dateForm = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static String jyptAppId = "jypt"; // rest服务appId
	private static String SYS_ID = "CRDTB"; //贷前系统id
	
	//注入系统参数实现类
	@Autowired
    private SysConfigAPI sysConfigAPI;
	
	//注入接口日志表 实现类
	@Autowired
	@Qualifier("com.jy.modules.befloan.interfacelog.lbttransferlog.service.LbTTransferLogService")
	private LbTTransferLogService transferLogService;
	
	*//**
	 * 
	 * 通过地址key获取value值
	 * @author 豆永亮
	 * @param key
	 * @return
	 *//*
	public static String getUrl(String key) {
		String value = "";
		if(key != null && !"".equals(key.trim())) {
//			value = bundle.getString(key.trim());
		}
		return value;
	}
	
	 *//** 
	  * 
     * 将一个 JavaBean 对象转化为一个  Map 
     * @author 豆永亮
     * @param bean 要转化的JavaBean 对象 
     * @return 转化出来的  Map 对象 
     * @throws IntrospectionException 如果分析类属性失败 
     * @throws IllegalAccessException 如果实例化 JavaBean 失败 
     * @throws InvocationTargetException 如果调用属性的 setter 方法失败 
     *//* 
	public static Map<String, Object> convertBean(Object bean) 
            throws IntrospectionException, IllegalAccessException, InvocationTargetException { 
        Class<? extends Object> type = bean.getClass(); 
        Map<String, Object> returnMap = new HashMap<String, Object>(); 
        BeanInfo beanInfo = Introspector.getBeanInfo(type); 

        PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors(); 
        for (int i = 0; i< propertyDescriptors.length; i++) { 
            PropertyDescriptor descriptor = propertyDescriptors[i]; 
            String propertyName = descriptor.getName(); 
            if (!propertyName.equals("class")) { 
                Method readMethod = descriptor.getReadMethod(); 
                Object result = readMethod.invoke(bean, new Object[0]); 
                if (result != null) { 
                    returnMap.put(propertyName, result); 
                } else { 
                    returnMap.put(propertyName, ""); 
                } 
            } 
        } 
        return returnMap; 
    }
	
	*//**
	 * 客户查询接口
	 *//*
	public Object queryCustomerByCrCode(Map<String, String> params) {
//		String url = getUrl("querycust_url");
		String url = sysConfigAPI.getValue("querycust_url");
		return get(url, params, CodeConstant.CUSTOMER_QUERY_CODE, CodeConstant.CUSTOMER_QUERY_BUSINESSCODE);
	}
	
	*//**
	 * 客户验证查询接口
	 *//*
	public Object validateCustomer(Map<String, String> params) {
//		String url = getUrl("validatecust_url");
		String url = sysConfigAPI.getValue("validatecust_url");
		return get(url, params, CodeConstant.CUSTOMER_VALIDATE_CODE, CodeConstant.CUSTOMER_VALIDATE_BUSINESSCODE);
	}
	
	*//**
	 * 客户新增或修改接口
	 * @return
	 *//*
	public Object createOrupdateCustomer(Map<String, Object> searchParams) {
//		String url = getUrl("createOrupdatecust_url");
		String url = sysConfigAPI.getValue("createOrupdatecust_url");
		return post(url, searchParams, CodeConstant.CUSTOMER_CREATEORUPDATE_CODE, CodeConstant.CUSTOMER_CREATEORUPDATE_BUSINESSCODE);
	}
	
	*//**
	 * 黑名单查询接口
	 * @param params
	 * @return
	 *//*
	public Object getBlackQueryResult(Map<String, String> params) {
//		String url = getUrl("blackquery_url");
		String url = sysConfigAPI.getValue("blackquery_url");
		return get(url, params, CodeConstant.BLACK_QUERY_CODE, CodeConstant.BLACK_QUERY_BUSINESSCODE);
	}
	
	*//**
	 * 黑名单验证查询接口
	 * @param List<Map<String, Object>> list
	 * @return
	 *//*
	public Object getBlackValidateResult(List<Map<String, Object>> list) throws Exception {
//		String url = getUrl("blackvalidate_url");
		String url = sysConfigAPI.getValue("blackvalidate_url");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("blackBean", list);
		return post(url, params, CodeConstant.BLACK_VALIDATE_CODE, CodeConstant.BLACK_VALIDATE_BUSINESSCODE);
	}
	
//	private Object post(String url, String params, Map<String ,Object> searchParams, Class<Object> clzz) {
//		HttpHeaders headers = new HttpHeaders();
//		// 设置ContentType标明数据是JSON数据,否则报415(Unsupported Media Type)
//		// 此处必须和REST接口的RequestMapping的ContentType对应
//		headers.setContentType(MediaType.APPLICATION_JSON);
//		HttpEntity<Object> requestEntity = new HttpEntity<Object>(params,headers);
//		RestTemplate rt = new RestTemplate();
//		ResponseEntity<Object> responseEntity = null;
//		if(searchParams == null) {
//			responseEntity = rt.exchange(url, HttpMethod.POST, requestEntity, clzz);
//		} else {
//			responseEntity = rt.exchange(url, HttpMethod.POST, requestEntity, clzz,searchParams);
//		}
//		return responseEntity.getBody();
//	}
	
	*//**
	 * 
	 * post请求方式 客户、黑名单、产品、合同
	 * @author 豆永亮
	 * @param url 接口地址
	 * @param obj 参数对象
	 * 
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * 
	 * @return
	 *//*
	public Object post(String url, Map<String, Object> params, String interfaceNo, String businessCode) {
		Object result = null;
		ResponseMsg<Object> responseMsg = null;
		StringBuilder sb = new StringBuilder();
		String transNo = "";
		String retCode = "";
		String errorDesc = "";
		Date date = new Date();
		LbTTransferLogDTO transferLogDTO = new LbTTransferLogDTO();
		try {
//			url = sysConfigAPI.getValue("esb_url") + url;
			String dateStr = dateForm.format(date);
			transNo = businessCode + UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
			HeaderBean headerBean = new HeaderBean();
			headerBean.setoMsgNo(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setChannelSerno(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setComsSysID(SYS_ID);
			headerBean.setComsSysDate(dateStr.split(" ")[0]);
			headerBean.setComsSysTime(dateStr.split(" ")[1]);
			params.put("headerBean", headerBean);
			responseMsg = RestClient.doPost(jyptAppId, url, params,new TypeReference<ResponseMsg<Object>>() {});
			result = responseMsg.getResponseBody();
			retCode = responseMsg.getRetCode();
			errorDesc = responseMsg.getErrorDesc();
		} catch(Exception e) {
			//插入请求失败信息
			JYLoggerUtil.error(this.getClass(), "=========post====error:",e);
			retCode = "400";
			errorDesc = "请求接口异常:"+e.getMessage();
		}finally{
			try {
				transferLogDTO.setInterfaceNo(interfaceNo);
				transferLogDTO.setBusinessCode(businessCode);
				transferLogDTO.setReqTransNo(transNo);
				transferLogDTO.setReqTime(Timestamp.valueOf(format.format(date)));
				transferLogDTO.setRetCode(retCode);
				transferLogDTO.setRetMsg(errorDesc);
				transferLogDTO.setRetTime(Timestamp.valueOf(format.format(new Date())));
				transferLogDTO.setReqBody(sb.append(jyptAppId).append(":").append(url).append(",请求参数：").append(JSONObject.fromObject(params).toString()).toString());
				if(responseMsg != null)
					transferLogDTO.setRetBody(responseMsg.toString());
				transferLogService.insertLbTTransferLog(transferLogDTO);
			} catch (Exception ex) {
				JYLoggerUtil.error(this.getClass(), "====post==insertLbTTransferLog====error:",ex);
			}
		}
		return result;
	}
	

	*//**
	 * 
	 * post请求方式 客户、黑名单、产品、合同
	 * @author 豆永亮
	 * @param key 接口地址 key
	 * @param obj 参数对象
	 * 
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * 
	 * @return
	 *//*
	public Object postByKey(String key, Map<String, Object> params, String interfaceNo, String businessCode) {
//		String url = getUrl(key);
		String url = sysConfigAPI.getValue(key);
		return post(url, params, interfaceNo, businessCode);
	}
	
	*//**
	 * get请求方式 客户、黑名单、产品、合同
	 * @author 豆永亮
	 * @param url 接口地址
	 * @param params 参数对象
	 * 
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * @return
	 *//*
	public Object get(String url, Map<String, String> params, String interfaceNo, String businessCode) {
		Object result = null;
		ResponseMsg<Object> responseMsg = null;
		StringBuilder sb = new StringBuilder();
		String transNo = "";
		String retCode = "";
		String errorDesc = "";
		
		Date date = new Date();
		LbTTransferLogDTO transferLogDTO = new LbTTransferLogDTO();
		try {
//			url = sysConfigAPI.getValue("esb_url") + url;
			String dateStr = dateForm.format(date);
			transNo = businessCode + UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
			params.put("headerBean.oMsgNo", SYS_ID + dateStr.split(" ")[0] + transNo);
			params.put("headerBean.channelSerno", SYS_ID + dateStr.split(" ")[0] + transNo);
			params.put("headerBean.comsSysID", "CRDTB");
			params.put("headerBean.comsSysDate", SYS_ID + dateStr.split(" ")[0]);
			params.put("headerBean.comsSysTime", SYS_ID + dateStr.split(" ")[1]);
			if(params != null && !params.isEmpty()) {
				url += "?";
				Set<Entry<String, String>> set = params.entrySet();
				List<Entry<String, String>> list = new ArrayList<Entry<String, String>>();
				list.addAll(set);
				for(int i = 0; i < list.size(); i++) {
					Entry<String, String> en = list.get(i);
					if(i == list.size() - 1) {
						url += en.getKey()+"="+StringUtils.trimToEmpty(en.getValue());
					} else {
						url += en.getKey()+"="+StringUtils.trimToEmpty(en.getValue())+"&";
					}
				}
			}
			responseMsg = RestClient.doGet(jyptAppId, url,new TypeReference<ResponseMsg<Object>>() {});
			result = responseMsg.getResponseBody();
			retCode = responseMsg.getRetCode();
			errorDesc = responseMsg.getErrorDesc();
		} catch(Exception e) {
			JYLoggerUtil.error(this.getClass(), "=========get====error:",e);
			retCode = "400";
			errorDesc = "请求接口异常:"+(e.getMessage() == null ? "" : e.getMessage());
		}finally{
			try {
				transferLogDTO.setInterfaceNo(interfaceNo);
				transferLogDTO.setBusinessCode(businessCode);
				transferLogDTO.setReqTransNo(transNo);
				transferLogDTO.setReqTime(Timestamp.valueOf(format.format(date)));
				transferLogDTO.setRetCode(retCode);
				transferLogDTO.setRetMsg(errorDesc);
				transferLogDTO.setRetTime(Timestamp.valueOf(format.format(new Date())));
				transferLogDTO.setReqBody(sb.append(jyptAppId).append(":").append(url).toString());
				if(responseMsg != null)
					transferLogDTO.setRetBody(responseMsg.toString());
				transferLogService.insertLbTTransferLog(transferLogDTO);
			} catch (Exception ex) {
				JYLoggerUtil.error(this.getClass(), "====get==insertLbTTransferLog====error:",ex);
			}
		}
		return result;
	}
	
	*//**
	 * get请求方式客户、黑名单、产品、合同
	 * @author 豆永亮
	 * @param key 接口地址key
	 * @param params 参数对象
	 * 
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * @return
	 *//*
	public Object getByKey(String key, Map<String, String> params, String interfaceNo, String businessCode) {
//		String url = getUrl(key);
		String url = sysConfigAPI.getValue(key);
		return get(url, params, interfaceNo, businessCode);
	}
	
	*//**
	 * 
	 * post方式请求核心接口
	 * @author 豆永亮
	 * @param key 接口地址key
	 * @param obj 参数对象
	 * 
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * 
	 * @return
	 *//*
	public Object postCoreByKey(String key, Map<String, Object> params, String interfaceNo, String businessCode) {
//		String url = getUrl(key);
		String url = sysConfigAPI.getValue(key);
		return this.postCore(url, params, interfaceNo, businessCode);
	}
	
	*//**
	 * 
	 * post方式请求核心接口
	 * @author 豆永亮
	 * @param url 接口地址
	 * @param obj 参数对象
	 * 
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * 
	 * @return
	 *//*
	@SuppressWarnings("unchecked")
	public Object postCore(String url, Map<String, Object> params, String interfaceNo, String businessCode) {
		Object result = null;
		ResponseMsg<Object> responseMsg = null;
		StringBuilder sb = new StringBuilder();
		String transNo = "";
		String retCode = "";
		String errorDesc = "";
		Date date = new Date();
		LbTTransferLogDTO transferLogDTO = new LbTTransferLogDTO();
		try {
//			url = sysConfigAPI.getValue("esb_core_url") + url;
			String dateStr = dateForm.format(date);
			transNo = businessCode + UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
			params.put("sysSource", "1");
			params.put("frontTransNo", transNo);
			params.put("frontTransTime", format.format(date));
			params.put("interfaceNo", interfaceNo);
			params.put("busiCode", businessCode);
			HeaderBean headerBean = new HeaderBean();
			headerBean.setoMsgNo(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setChannelSerno(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setComsSysID(SYS_ID);
			headerBean.setComsSysDate(dateStr.split(" ")[0]);
			headerBean.setComsSysTime(dateStr.split(" ")[1]);
			params.put("headerBean", headerBean);
			
			responseMsg = RestClient.doPost(jyptAppId, url, params,new TypeReference<ResponseMsg<Object>>() {});
			result = responseMsg.getResponseBody();
			
			retCode = responseMsg.getRetCode();
			errorDesc = responseMsg.getErrorDesc();
			if("200".equals(retCode)) {
				Map<String, Object> map = (Map<String, Object>)result;
				transferLogDTO.setRetTransNo(map.get("coreTransNo") == null ? "" : map.get("coreTransNo").toString());
				transferLogDTO.setRetTime(Timestamp.valueOf(map.get("retTime") == null ? format.format(new Date()) : map.get("retTime").toString()));
				//errorDesc = map.get("retMsg") == null ? "" : map.get("retMsg").toString();
				errorDesc = errorDesc + map.get("retCode");
			}
		} catch(Exception e) {
			//插入请求失败信息
			JYLoggerUtil.error(this.getClass(), "=============调用第三方接口异常==================error:", e);
			transferLogDTO.setRetTime(Timestamp.valueOf(format.format(date)));
			retCode = "400";
			errorDesc = "接口请求异常："+e.getMessage();
		}finally{
			try {
				transferLogDTO.setInterfaceNo(interfaceNo);
				transferLogDTO.setBusinessCode(businessCode);
				transferLogDTO.setReqTransNo(transNo);
				transferLogDTO.setReqTime(Timestamp.valueOf(format.format(date)));
				transferLogDTO.setRetCode(retCode);
				transferLogDTO.setRetMsg(errorDesc);
				transferLogDTO.setReqBody(sb.append(jyptAppId).append(":").append(url).append(",请求参数：").append(JSONObject.fromObject(params).toString()).toString());
				if(responseMsg != null)
					transferLogDTO.setRetBody(responseMsg.toString());
				transferLogService.insertLbTTransferLog(transferLogDTO);
			} catch (Exception ex) {
				JYLoggerUtil.error(this.getClass(), "====postCore==insertLbTTransferLog====error:",ex);
			}
		}
		
		return result;
	}
	
	*//**
	 * 
	 * post方式请求贷后与核心交互的接口
	 * @author 豆永亮
	 * @param url 接口地址
	 * @param obj 参数对象
	 * 
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * 
	 * @return
	 *//*
	@SuppressWarnings("unchecked")
	public Object postAftCore(String url, Map<String, Object> params, String interfaceNo, String businessCode) {
		Object result = null;
		ResponseMsg<Object> responseMsg = null;
		StringBuilder sb = new StringBuilder();
		String transNo = "";
		String retCode = "";
		String errorDesc = "";
		Date date = new Date();
		LbTTransferLogDTO transferLogDTO = new LbTTransferLogDTO();
		try {
			String dateStr = dateForm.format(date);
			transNo = businessCode + UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
			params.put("sysSource", "2");
			params.put("frontTransNo", transNo);
			params.put("frontTransTime", format.format(date));
			params.put("interfaceNo", interfaceNo);
			params.put("busiCode", businessCode);
			HeaderBean headerBean = new HeaderBean();
			headerBean.setoMsgNo(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setChannelSerno(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setComsSysID(SYS_ID);
			headerBean.setComsSysDate(dateStr.split(" ")[0]);
			headerBean.setComsSysTime(dateStr.split(" ")[1]);
			params.put("headerBean", headerBean);
			
			responseMsg = RestClient.doPost(jyptAppId, url, params,new TypeReference<ResponseMsg<Object>>() {});
			result = responseMsg.getResponseBody();
			
			retCode = responseMsg.getRetCode();
			errorDesc = responseMsg.getErrorDesc();
			if("200".equals(retCode)) {
				Map<String, Object> map = (Map<String, Object>)result;
				transferLogDTO.setRetTransNo(map.get("coreTransNo") == null ? "" : map.get("coreTransNo").toString());
				transferLogDTO.setRetTime(Timestamp.valueOf(map.get("retTime") == null ? format.format(new Date()) : map.get("retTime").toString()));
				errorDesc = errorDesc + map.get("retCode");
			}
		} catch(Exception e) {
			//插入请求失败信息
			JYLoggerUtil.error(this.getClass(), "=============调用第三方接口异常==================error:", e);
			transferLogDTO.setRetTime(Timestamp.valueOf(format.format(date)));
			retCode = "400";
			errorDesc = "接口请求异常："+e.getMessage();
		}finally{
			try {
				transferLogDTO.setInterfaceNo(interfaceNo);
				transferLogDTO.setBusinessCode(businessCode);
				transferLogDTO.setReqTransNo(transNo);
				transferLogDTO.setReqTime(Timestamp.valueOf(format.format(date)));
				transferLogDTO.setRetCode(retCode);
				transferLogDTO.setRetMsg(errorDesc);
				transferLogDTO.setReqBody(sb.append(jyptAppId).append(":").append(url).append(",请求参数：").append(JSONObject.fromObject(params).toString()).toString());
				if(responseMsg != null) 
					transferLogDTO.setRetBody(responseMsg.toString());
				transferLogService.insertLbTTransferLog(transferLogDTO);
			} catch (Exception ex) {
				JYLoggerUtil.error(this.getClass(), "====postCore==insertLbTTransferLog====error:",ex);
			}
		}
		
		return result;
	}
	
	
	*//**
	 * 
	 * post方式请求押品接口
	 * @author DELL
	 * @param url 接口地址
	 * @param obj 参数对象
	 * @param interfaceNo 接口编码
	 * @param businessCode 业务编码
	 * 
	 * @return
	 *//*
	@SuppressWarnings("unchecked")
	public Object postGuar(String url, Map<String, Object> params, String interfaceNo, String businessCode) {
		Object result = null;
		ResponseMsg<Object> responseMsg = null;
		StringBuilder sb = new StringBuilder();
		String transNo = "";
		String retCode = "";
		String errorDesc = "";
		Date date = new Date();
		LbTTransferLogDTO transferLogDTO = new LbTTransferLogDTO();
		try {
			String dateStr = dateForm.format(date);
			transNo = businessCode + UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
			params.put("sysSource", "2");
			params.put("frontTransNo", transNo);
			params.put("frontTransTime", format.format(date));
			params.put("interfaceNo", interfaceNo);
			params.put("busiCode", businessCode);
			HeaderBean headerBean = new HeaderBean();
			headerBean.setoMsgNo(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setChannelSerno(SYS_ID + dateStr.split(" ")[0] + transNo);
			headerBean.setComsSysID(SYS_ID);
			headerBean.setComsSysDate(dateStr.split(" ")[0]);
			headerBean.setComsSysTime(dateStr.split(" ")[1]);
			params.put("headerBean", headerBean);
			
			responseMsg = RestClient.doPost(jyptAppId, url, params,new TypeReference<ResponseMsg<Object>>() {});
			result = responseMsg.getResponseBody();
			
			retCode = responseMsg.getRetCode();
			errorDesc = responseMsg.getErrorDesc();
			if("200".equals(retCode)) {
				Map<String, Object> map = (Map<String, Object>)result;
				transferLogDTO.setRetTransNo(map.get("coreTransNo") == null ? "" : map.get("coreTransNo").toString());
				transferLogDTO.setRetTime(Timestamp.valueOf(map.get("retTime") == null ? format.format(new Date()) : map.get("retTime").toString()));
			}
		} catch(Exception e) {
			//插入请求失败信息
			JYLoggerUtil.error(this.getClass(), "=============调用第三方接口异常==================error:", e);
			transferLogDTO.setRetTime(Timestamp.valueOf(format.format(date)));
			retCode = "400";
			errorDesc = "接口请求异常："+e.getMessage();
		}finally{
			try {
				transferLogDTO.setInterfaceNo(interfaceNo);
				transferLogDTO.setBusinessCode(businessCode);
				transferLogDTO.setReqTransNo(transNo);
				transferLogDTO.setReqTime(Timestamp.valueOf(format.format(date)));
				transferLogDTO.setRetCode(retCode);
				transferLogDTO.setRetMsg(errorDesc);
				transferLogDTO.setReqBody(sb.append(jyptAppId).append(":").append(url).append(",请求参数：").append(JSONObject.fromObject(params).toString()).toString());
				if(responseMsg != null) 
					transferLogDTO.setRetBody(responseMsg.toString());
				transferLogService.insertLbTTransferLog(transferLogDTO);
			} catch (Exception ex) {
				JYLoggerUtil.error(this.getClass(), "====postGuar==insertLbTTransferLog====error:",ex);
			}
		}
		
		return result;
	}
}
*/