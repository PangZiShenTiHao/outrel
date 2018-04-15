package com.jy.modules.externalplatform.interfacerest.utils;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.jdom2.Document;

import com.fasterxml.jackson.databind.ObjectMapper;


public final class JsonUtil { 
	 private static ObjectMapper mapper = new ObjectMapper();
	 /***
		 * 去除各种特殊字符
		 * 款系统中是否存在xml格式解析的特殊字符，如 “&”、“<”、“>”、“|”、“？”、“\n"、“\r”等xml解析过程中不能解析的特殊字符 
		 * @param argName
		 * @return
		 */
		public static String delSpecialCharacter (String argName){
			if(StringUtils.isNotEmpty(argName)){
				return argName.replaceAll("\\&","").replaceAll("\\<", "(").replaceAll("\\>", ")").replaceAll("\\?","").replaceAll("？", "").replaceAll("\\|","").replaceAll("\\s*", "");
			}else {
				return "";
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
	 /**
     * JSON(数组)字符串<STRONG>转换</STRONG>成XML字符串
     * 
     * @param jsonString
     * @return
     */
    public static String json2xml(String jsonString) {
        XMLSerializer xmlSerializer = new XMLSerializer();
        return xmlSerializer.write(JSONSerializer.toJSON(jsonString));
        // return xmlSerializer.write(JSONArray.fromObject(jsonString));//这种方式只支持JSON数组
    }
    /**
     * 将xml字符串<STRONG>转换</STRONG>为JSON字符串
     * 
     * @param xmlString
     *            xml字符串
     * @return JSON<STRONG>对象</STRONG>
     */
    public static String xml2json(String xmlString) {
        XMLSerializer xmlSerializer = new XMLSerializer();
        JSON json = xmlSerializer.read(xmlString);
        return json.toString(1);
    }

    /**
     * 将xmlDocument<STRONG>转换</STRONG>为JSON<STRONG>对象</STRONG>
     * 
     * @param xmlDocument
     *            XML Document
     * @return JSON<STRONG>对象</STRONG>
     */
    public static String xml2json(Document xmlDocument) {
        return xml2json(xmlDocument.toString());
    }
	/** 
	 * 把对象封装为JSON格式 
	 * 
	 * @param o 
	 *            对象 
	 * @return JSON格式 
	 */ 
	public static String toJson(final Object o) { 
		if (o == null) { 
			return "null"; 
		} else if (o instanceof String) { 
			return string2Json((String) o); 
		} else if (o instanceof Boolean) { 
			return boolean2Json((Boolean) o); 
		} else if (o instanceof Number) { 
			return number2Json((Number) o); 
		} else if (o instanceof Map) { 
			return map2Json((Map<String, Object>) o); 
		} else if (o instanceof Collection) { 
			return collection2Json((Collection) o); 
		} else if (o instanceof Object[]) { 
			return array2Json((Object[]) o); 
		} else if (o instanceof int[]){ 
			return intArray2Json((int[]) o); 
		} else if (o instanceof boolean[]){ 
			return booleanArray2Json((boolean[]) o); 
		} else if (o instanceof long[]){ 
			return longArray2Json((long[]) o); 
		} else if (o instanceof float[]){ 
			return floatArray2Json((float[]) o); 
		} else if (o instanceof double[]){ 
			return doubleArray2Json((double[]) o); 
		} else if (o instanceof short[]){ 
			return shortArray2Json((short[]) o); 
		} else if (o instanceof byte[]){ 
			return byteArray2Json((byte[]) o); 
		} else if (o instanceof Object){ 
			return object2Json(o); 
		} 
		throw new RuntimeException("不支持的类型: " + o.getClass().getName());
	} 

	/** 
	 * 将 String 对象编码为 JSON格式，只需处理好特殊字符 
	 * 
	 * @param s 
	 *            String 对象 
	 * @return JSON格式 
	 */ 
	static String string2Json(final String s) { 
		final StringBuilder sb = new StringBuilder(s.length() + 20); 
		sb.append('\"'); 
		for (int i = 0; i < s.length(); i++) { 
			final char c = s.charAt(i); 
			switch (c) { 
			case '\"': 
				sb.append("\\\""); 
				break; 
			case '\\': 
				sb.append("\\\\"); 
				break; 
			case '/': 
				sb.append("\\/"); 
				break; 
			case '\b': 
				sb.append("\\b"); 
				break; 
			case '\f': 
				sb.append("\\f"); 
				break; 
			case '\n': 
				sb.append("\\n"); 
				break; 
			case '\r': 
				sb.append("\\r"); 
				break; 
			case '\t': 
				sb.append("\\t"); 
				break; 
			default: 
				sb.append(c); 
			} 
		} 
		sb.append('\"'); 
		return sb.toString(); 
	} 

	/** 
	 * 将 Number 表示为 JSON格式 
	 * 
	 * @param number 
	 *            Number 
	 * @return JSON格式 
	 */ 
	static String number2Json(final Number number) { 
		return number.toString(); 
	} 

	/** 
	 * 将 Boolean 表示为 JSON格式 
	 * 
	 * @param bool 
	 *            Boolean 
	 * @return JSON格式 
	 */ 
	static String boolean2Json(final Boolean bool) { 
		return bool.toString(); 
	} 

	/** 
	 * 将 Collection 编码为 JSON 格式 (List,Set) 
	 * 
	 * @param c 
	 * @return 
	 */ 
	static String collection2Json(final Collection<Object> c){ 
		final Object[] arrObj = c.toArray(); 
		return toJson(arrObj); 
	} 

	/** 
	 * 将 Map<String, Object> 编码为 JSON 格式 
	 * 
	 * @param map 
	 * @return 
	 */ 
	public static String map2Json(final Map<String, Object> map) { 
		if (map.isEmpty()) { 
			return "{}"; 
		} 
		final StringBuilder sb = new StringBuilder(map.size() << 4); //4次方
		sb.append('{'); 
		final Set<String> keys = map.keySet(); 
		for (final String key : keys) { 
			final Object value = map.get(key); 
			sb.append('\"'); 
			sb.append(key); //不能包含特殊字符 
			sb.append('\"'); 
			sb.append(':'); 
			sb.append(toJson(value)); //循环引用的对象会引发无限递归 
			sb.append(','); 
		} 
		// 将最后的 ',' 变为 '}': 
		sb.setCharAt(sb.length() - 1, '}'); 
		return sb.toString(); 
	} 

	/** 
	 * 将数组编码为 JSON 格式 
	 * 
	 * @param array 
	 *            数组 
	 * @return JSON 格式 
	 */ 
	static String array2Json(final Object[] array) { 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); //4次方
		sb.append('['); 
		for (final Object o : array) { 
			sb.append(toJson(o)); 
			sb.append(','); 
		} 
		// 将最后添加的 ',' 变为 ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	static String intArray2Json(final int[] array){ 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); 
		sb.append('['); 
		for (final int o : array) { 
			sb.append(Integer.toString(o)); 
			sb.append(','); 
		} 
		// set last ',' to ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	static String longArray2Json(final long[] array) { 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); 
		sb.append('['); 
		for (final long o : array) { 
			sb.append(Long.toString(o)); 
			sb.append(','); 
		} 
		// set last ',' to ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	static String booleanArray2Json(final boolean[] array){ 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); 
		sb.append('['); 
		for (final boolean o : array) { 
			sb.append(Boolean.toString(o)); 
			sb.append(','); 
		} 
		// set last ',' to ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	static String floatArray2Json(final float[] array) { 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); 
		sb.append('['); 
		for (final float o : array) { 
			sb.append(Float.toString(o)); 
			sb.append(','); 
		} 
		// set last ',' to ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	static String doubleArray2Json(final double[] array) { 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); 
		sb.append('['); 
		for (final double o : array) { 
			sb.append(Double.toString(o)); 
			sb.append(','); 
		} 
		// set last ',' to ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	static String shortArray2Json(final short[] array) { 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); 
		sb.append('['); 
		for (final short o : array) 	{ 
			sb.append(Short.toString(o)); 
			sb.append(','); 
		} 
		// set last ',' to ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	static String byteArray2Json(final byte[] array) { 
		if (array.length == 0) { 
			return "[]"; 
		} 
		final StringBuilder sb = new StringBuilder(array.length << 4); 
		sb.append('['); 
		for (final byte o : array) { 
			sb.append(Byte.toString(o)); 
			sb.append(','); 
		} 
		// set last ',' to ']': 
		sb.setCharAt(sb.length() - 1, ']'); 
		return sb.toString(); 
	} 

	public static String object2Json(final Object bean){ 
		//数据检查 
		if (bean == null) { 
			return "{}"; 
		} 
		final Method[] methods = bean.getClass().getMethods(); //方法数组 
		final StringBuilder sb = new StringBuilder(methods.length << 4); //4次方
		sb.append('{'); 

		for (final Method method : methods) { 
			try { 
				final String name = method.getName(); 
				String key = ""; 
				if (name.startsWith("get")) { 
					key = name.substring(3); 
					//防死循环 
					final String[] arrs = 
						{ "Class" }; 
					boolean bl = false; 
					for (final String s : arrs) { 
						if (s.equals(key)) { 
							bl = true; 
							continue; 
						} 
					} 
					if (bl) { 
						continue; //防死循环 
					} 
				} else if (name.startsWith("is")) { 
					key = name.substring(2); 
				} 
				if (key.length() > 0 && Character.isUpperCase(key.charAt(0)) && method.getParameterTypes().length == 0){ 
					if (key.length() == 1) { 
						key = key.toLowerCase(); 
					} else if (!Character.isUpperCase(key.charAt(1))){ 
						key = key.substring(0, 1).toLowerCase() + key.substring(1);
					} 
					final Object elementObj = method.invoke(bean);
					sb.append('\"'); 
					sb.append(key); //不能包含特殊字符 
					sb.append('\"'); 
					sb.append(':'); 
					sb.append(toJson(elementObj)); //循环引用的对象会引发无限递归
					sb.append(','); 
				} 
			} 
			catch (final Exception e){ 
				//e.getMessage(); 
				throw new RuntimeException("在将bean封装成JSON格式时异常：" + e.getMessage(), e);
			} 
		} 
		if (sb.length() == 1) { 
			return bean.toString(); 
		}else { 
			sb.setCharAt(sb.length() - 1, '}'); 
			return sb.toString(); 
		} 
	} 

	private JsonUtil() 
	{ 
	} 
	
	/**
	 * 将xml字符串转换为JSON对象
	 * @param xmlFile xml字符串
	 * @return JSON对象
	 */
	public static JSON getJSONFromXml(String xmlString) {
		XMLSerializer xmlSerializer = new XMLSerializer();
		xmlSerializer.setTypeHintsEnabled(false);
		JSON json = xmlSerializer.read(xmlString);
		return json;
	}
	
	/**
	* @title: convertMap
	* @author:陈东栋
	* @description: JSON格式化（将一个将key字符串转成驼峰命名）
	* @date 2017年5月5日 上午11:20:12
	* @param inputMap
	* @return
	* @throws 
	*/ 
	@SuppressWarnings("unchecked")
	public static JSONObject convertJson(JSONObject inputObject) {
		JSONObject  resultObject = new JSONObject();
		for (Iterator<String> iter = inputObject.keySet().iterator(); iter.hasNext();) {
			String key = iter.next();
			Object value = inputObject.get(key);
			resultObject.put(stringToCamelCase(key), value);
		}
		return resultObject;
	}
	
	
	/**
	* @title: stringToCamelCase
	* @author:陈东栋
	* @description: 将一个将字符串转成驼峰命名的方法
	* @date 2017年5月5日 上午11:14:58
	* @param inputStr
	* @return
	* @throws 
	*/ 
    private static String  stringToCamelCase(String inputStr) {
   	    String outPutStr = null;
		if (StringUtils.isNotEmpty(inputStr) && inputStr.indexOf("_") != -1) {
			outPutStr = WordUtils.capitalizeFully(inputStr, new char[] { '_' });
			outPutStr = StringUtils.uncapitalize(outPutStr);
			outPutStr = StringUtils.remove(outPutStr, '_');
		}else{
			outPutStr = StringUtils.uncapitalize(inputStr);
		}
		return outPutStr;
	}   
} 






