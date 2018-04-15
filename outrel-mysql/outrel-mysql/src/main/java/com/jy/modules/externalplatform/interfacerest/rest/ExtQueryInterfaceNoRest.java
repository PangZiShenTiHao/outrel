package com.jy.modules.externalplatform.interfacerest.rest;

import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.alibaba.fastjson.JSON;
import com.fintech.platform.core.message.ResponseMsg;
import com.fintech.platform.restservice.web.base.BaseRest;
import com.jy.modules.externalplatform.interfacerest.dto.RequestBodyDTO2;
import com.jy.modules.externalplatform.interfacerest.dto.ResponseBodyDTO2;
import com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceService;
import com.jy.modules.externalplatform.interfacerest.utils.ExtHttpStatus;
@Controller
@Scope("prototype")
@RequestMapping(value = "/api/externalplatform/queryInterfaceNoRest/")
public class ExtQueryInterfaceNoRest extends BaseRest{
	private static Logger logger = LoggerFactory.getLogger(ExtInterfaceRest.class);
	@Autowired
	private Validator validator;
	@Qualifier("com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceService")
	@Autowired
	private ExtInterfaceService extInterfaceService;

	/**
	 * 根据系统编码和功能点编码查询调用的接口
	 * @param requestBody
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/extQueryInterfaceNo/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<RequestBodyDTO2> extQueryInterfaceNo(@RequestBody RequestBodyDTO2 requestBody) throws Exception {
		logger.info("进入接口：" + requestBody.getInterfaceNo() + "{}\r\n",JSON.toJSONString(requestBody));	
		ResponseBodyDTO2 responseBody = new ResponseBodyDTO2();
		String retCode = ExtHttpStatus.RET_CODE_ERROR1;
		ResponseEntity responseEntity = null;
		Map<String, Object> rstObj =new HashMap<String, Object>();
		try {
			BeanValidators.validateWithException(this.validator, requestBody,new Class[0]);
			responseBody = extInterfaceService.queryInterfaceNo(requestBody,responseBody);
			retCode = responseBody.getRetCode();
		}catch (ConstraintViolationException e) {
			responseBody.setRetCode(retCode);
			responseBody.setRetMsg(BeanValidators.extractMessage(e).toString());
		}catch (Exception e) {
			retCode = ExtHttpStatus.RET_CODE_ERROR4;
			responseBody.setRetCode(retCode);
			responseBody.setRetMsg("查询异常");
			logger.error("接口异常,交易流水号:"+rstObj.get("FRONTTRANSNO").toString());
		}finally{
			responseEntity = initResponse(responseBody,HttpStatus.OK,retCode);
			logger.info("接口结束：" + requestBody.getInterfaceNo() + "{}\r\n",JSON.toJSONString(responseEntity, true));
		}
		return responseEntity;
	  }
	 @SuppressWarnings({ "unchecked", "rawtypes" })
	  private <T extends ResponseBodyDTO2> ResponseEntity<ResponseMsg<Object>> initResponse(ResponseBodyDTO2 responseBody, HttpStatus status, String retCode)
	  {
		ResponseMsg responseMsg = new ResponseMsg();
		responseMsg.setResponseBody(responseBody);
		if(!ExtHttpStatus.RET_CODE_SUC.equals(retCode)){
		     responseMsg.setErrorDesc(responseBody.getRetMsg());
		}
		ResponseEntity responseEntity = new ResponseEntity(responseMsg,status);
	    return responseEntity;
	  }
}
