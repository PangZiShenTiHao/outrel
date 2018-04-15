package com.jy.modules.extbiz.in.interfaceMethod.service;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jy.modules.common.servlet.AppContextBean;
import com.jy.modules.common.util.InterfaceNoAndMethod;
import com.jy.modules.extbiz.in.interfaceMethod.dao.ExtSaveResponseMsgDao;

@Service("com.jy.modules.extbiz.in.interfaceMethod.service.ExtSaveResponseMsgService")
public class ExtSaveResponseMsgService {
	private static ObjectMapper mapper = new ObjectMapper();
	/**
	 * 接口返回数据解析落地保存映射
	 * @param interfaceId 
	 * @param productCode
	 * @param orgCode
	 * @param sysCode
	 * @param className
	 * @param paramsMap 
	 * @param result
	 * @throws Exception 
	 */
	public void saveResultMessage(Map<String, Object> map, String result)throws Exception {
		Map<String, Object> interfaceMap = fromJson(result, Map.class);
		Set<String> k = interfaceMap.keySet();
		Iterator<String> it = k.iterator();
		while (it.hasNext()) {
			String keyValue = it.next();
			String className = InterfaceNoAndMethod.getValueByKey(keyValue);
			
			JSONObject json = JSONObject.fromObject(result);
			if(null != json.get(keyValue) && !"".equals(json.getString(keyValue))){
				map.put("result", json.getString(keyValue));
				ExtSaveResponseMsgDao service = (ExtSaveResponseMsgDao) AppContextBean.getApplicationContext().getBean(className);
				service.getClass().getMethod("saveMessage", Map.class).invoke(service, map);
			}
		}
	}
	/**
	 * json转换成map
	 * @param json
	 * @param type
	 * @return
	 */
	 public static <E> E fromJson(String json, Class<E> type) {
        try {
            return mapper.readValue(json, type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
