package com.portal.tools;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fintech.modules.platform.sysconfig.dto.SysConfigDTO;
import com.fintech.platform.core.message.HeaderBean;
import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.core.message.ResponseMsg;
import com.fintech.platform.restclient.http.RestClient;
/**
 * @description:RestClient 测试
 * @author
 * @date: 2016年7月11日 下午5:03:45
 */
public class RestTest {

	public static void main(String[] args) {
		String jyptURL = null;
		String jyptAppId = "ptpt";
		
		
		Map<String, Object> searchParams = new HashMap<String, Object>();
		
		QueryReqBean params = new QueryReqBean();
		params.setSearchParams(searchParams);
		List list = new ArrayList<Map>();
		Map temp1 = new HashMap<String,Object>();
		temp1.put("loopCode", "004");
		temp1.put("bussCode", "12312312312");
		list.add(temp1);
		searchParams.put("queyDataList", list);
		searchParams.put("interfaceNo","5000");
		HeaderBean headerBean = new HeaderBean();
		searchParams.put("headerBean", headerBean);
		
		String url = "http://192.168.64.21:8080/RestApplication/rest/bussiness";
		//ResponseMsg<Object> body = RestClient.doPost(jyptAppId, url,searchParams, new TypeReference<ResponseMsg<Object>>(){});
		
		
		url = "http://127.0.0.1:8080/rm"
				+ "/api/platform/sysconfig/SysConfigRest/get/v1/201";
		ResponseMsg<SysConfigDTO> responseMsg = RestClient.doGet(jyptAppId,
				url, new TypeReference<ResponseMsg<SysConfigDTO>>() {
				});
		SysConfigDTO dto = responseMsg.getResponseBody();
		
		System.out.println("=========="+JSONObject.toJSONString(dto));
		/*ResponseMsg<QueryRespBean<SysConfigDTO>> responseMsg = RestClient
				.doPost(jyptAppId,
						url,
						params,
						new TypeReference<ResponseMsg<QueryRespBean<SysConfigDTO>>>() {
						});
		Object body = responseMsg.getResponseBody();*/

	}

}
