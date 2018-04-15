package com.jy.modules.common.util;

import java.util.Iterator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.WordUtils;
import org.apache.commons.lang3.StringUtils;


/**
* @description: 处理JSON对象工具类
*/ 
public class JsonTool {
  
	/**
	* @title: isJSONObjectNotEmpty
	* @author:陈东栋
	* @description: 判断JSON对象是否为空   ture-不为空   false-为空
	* @date 2017年7月18日 下午1:27:18
	* @param jsonObject
	* @return
	* @throws 
	*/ 
	public static boolean isJSONObjectNotEmpty(JSONObject jsonObject) {
		boolean flag = true;
		if (null == jsonObject || jsonObject.isNullObject() || jsonObject.size() == 0) {
			flag = false;
		}
		return flag;
	}
	

	/**
	* @title: isJSONObjectNotEmpty
	* @author:陈东栋
	* @description: 判断JSON对象是否为空   ture-不为空   false-为空
	* @date 2017年7月18日 下午1:27:18
	* @param jsonObject
	* @return
	* @throws 
	*/ 
	public static boolean isJSONArrayNotEmpty(JSONArray jsonArray) {
		boolean flag = true;
		if (null == jsonArray || jsonArray.isEmpty() || jsonArray.size() == 0) {
			flag = false;
		}
		return flag;
	}
	
	
	/**
	* @title: convertName
	* @author:陈东栋
	* @description: 将数据表字段变为对应实体类属性（格式变为驼峰状）
	* @date 2017年7月27日 上午9:50:59
	* @param columnName  数据表字段名  
	* @param isColumn   
	* @return
	* @throws 
	*/ 
	public static String convertName(String columnName, boolean isColumn) {
		String name = WordUtils.capitalizeFully(columnName, new char[] { '_' });
		if (isColumn)
			name = StringUtils.uncapitalize(name);
		return StringUtils.remove(name, '_');
	}
	
	/**
	* @title: camelCaseJSONKey
	* @author:陈东栋
	* @description: 将JSONObject中的key变为驼峰命名
	* @param jsonObj
	* @return
	* @throws 
	*/ 
	@SuppressWarnings("unchecked")
	public static JSONObject  camelCaseJSONKey(JSONObject jsonObj){
		JSONObject retJsonObj = new JSONObject();
		for(Iterator<String> iter = jsonObj.keySet().iterator();iter.hasNext();){
			String key = iter.next();
			Object value = jsonObj.get(key);
			retJsonObj.put(convertName(key, true), value);
		}
	   return retJsonObj;
   }
	
	/**
	* @title: camelCaseJSONArrayKey
	* @author:陈东栋
	* @description: 将JSONObject中的key变为驼峰命名
	* @param jsonObj
	* @return
	* @throws 
	*/ 
	@SuppressWarnings("rawtypes")
	public static JSONArray  camelCaseJSONArrayKey(JSONArray jsonArr){
		JSONArray  retJsonArr = new JSONArray();
		for (Iterator iterator = jsonArr.iterator(); iterator.hasNext();) {
			JSONObject jsonObject = (JSONObject) iterator.next();
			retJsonArr.add(camelCaseJSONKey(jsonObject));
		}
	   return retJsonArr;
   }
	
	/**
	* @title: transferJSONArrayToString
	* @author:陈东栋
	* @description: 将JSON数组转为字符串（去掉方括号）
	* @date 2017年9月14日 上午11:44:32
	* @param jsonObject
	* @param appPoint
	* @return
	* @throws 
	*/ 
	public static String transferJSONArrayToString(JSONObject jsonObject, String appPoint) {
		String result = "";
		JSONArray jsonArr = jsonObject.getJSONArray(appPoint);
		if (isJSONArrayNotEmpty(jsonArr)) {
			String jsonStr = jsonArr.toString();
			result = jsonStr.substring(1, jsonStr.length() - 1);
		}
		return result;
	}
}
