package com.jy.modules.externalplatform.interfacerest.rest;

import java.util.Date;
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
import com.jy.modules.common.util.DateUtil;
import com.jy.modules.externalplatform.interfacerest.dto.RequestBodyDTO3;
import com.jy.modules.externalplatform.interfacerest.dto.ResponseBodyDTO3;
import com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceService;
import com.jy.modules.externalplatform.interfacerest.utils.ExtConstant;
@Controller
@Scope("prototype")
@RequestMapping(value = "/api/externalplatform/extFuncPointRuleHitDetail/")
public class ExtFuncPointRuleHitDetailRest extends BaseRest{
	private static Logger logger = LoggerFactory.getLogger(ExtInterfaceRest.class);
	@Autowired
	private Validator validator;
	@Qualifier("com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceService")
	@Autowired
	private ExtInterfaceService extInterfaceService;

	/**
	 * 判断功能点是否通过配置的规则
	 * @param requestBody
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/queryHitDetail/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<RequestBodyDTO3> queryHitDetail(@RequestBody RequestBodyDTO3 requestBody) throws Exception {
		logger.info("进入接口：" + requestBody.getInterfaceNo() + "{}\r\n",JSON.toJSONString(requestBody));	
		ResponseBodyDTO3 responseBody = new ResponseBodyDTO3(requestBody);
		boolean feedBack = false;
		String retCode = ExtConstant.RET_CODE_FAIL;
		String retMsg = "";
		ResponseEntity responseEntity = null;
		Map<String, Object> rstObj =new HashMap<String, Object>();
		try {
			BeanValidators.validateWithException(this.validator, requestBody,new Class[0]);
			responseBody = extInterfaceService.queryHitDetail(requestBody,responseBody);
			feedBack = responseBody.getFeedBack();
			retCode = responseBody.getRetCode();
			retMsg = responseBody.getRetMsg();
		}catch (ConstraintViolationException e) {
			retMsg = BeanValidators.extractMessage(e).toString();
		}catch (Exception e) {
			retCode = ExtConstant.RET_CODE_ERROR;
			responseBody.setRetMsg("查询异常");
		    logger.error("接口异常,交易流水号:"+rstObj.get("FRONTTRANSNO").toString());
		}finally{
			responseBody.setRetTime(DateUtil.getDateToStringInfo(new Date()));
			responseBody.setFeedBack(feedBack);
			responseBody.setRetCode(retCode);
			responseBody.setRetMsg(retMsg);
			responseEntity = initResponse(responseBody,HttpStatus.OK,retCode);
			logger.info("接口结束：" + requestBody.getInterfaceNo() + "{}\r\n",JSON.toJSONString(responseEntity, true));
		}
		return responseEntity;
	  }
	 @SuppressWarnings({ "unchecked", "rawtypes" })
	  private <T extends ResponseBodyDTO3> ResponseEntity<ResponseMsg<Object>> initResponse(ResponseBodyDTO3 responseBody, HttpStatus status, String retCode)
	  {
		ResponseMsg responseMsg = new ResponseMsg();
		responseMsg.setResponseBody(responseBody);
		if(!ExtConstant.RET_CODE_SUC.equals(retCode)){
		     responseMsg.setErrorDesc(responseBody.getRetMsg());
		}
		ResponseEntity responseEntity = new ResponseEntity(responseMsg,status);
	    return responseEntity;
	  }
}
