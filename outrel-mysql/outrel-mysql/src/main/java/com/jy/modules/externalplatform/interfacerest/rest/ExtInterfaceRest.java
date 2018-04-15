package com.jy.modules.externalplatform.interfacerest.rest;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import com.jy.modules.externalplatform.interfacerest.dto.ExtInterfaceLogDTO;
import com.jy.modules.externalplatform.interfacerest.dto.RequestBodyDTO;
import com.jy.modules.externalplatform.interfacerest.dto.ResponseBodyDTO;
import com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceLogService;
import com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceService;
import com.jy.modules.externalplatform.interfacerest.utils.ExtHttpStatus;
import com.jy.modules.externalplatform.interfacerest.utils.JsonUtil;

@Controller
@Scope("prototype")
@RequestMapping(value = "/api/externalplatform/interfaceRest/")
public class ExtInterfaceRest  extends BaseRest{
	private static Logger logger = LoggerFactory.getLogger(ExtInterfaceRest.class);
	private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	@Autowired
	private Validator validator;
	
	@Qualifier("com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceService")
	@Autowired
	private ExtInterfaceService extInterfaceService;
	
	@Qualifier("com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceLogService")    
	@Autowired
	private ExtInterfaceLogService extInterfaceLogService;
	
	/**
	 * 调用接口
	 * @param requestBody
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/extInterface/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<RequestBodyDTO> extInterface(@RequestBody RequestBodyDTO requestBody) throws Exception {
		logger.info("进入接口：" + requestBody.getInterfaceNo() + "{}\r\n",JSON.toJSONString(requestBody));	
		Date date=new Date();
		ResponseBodyDTO responseBody = new ResponseBodyDTO();
		String retCode = ExtHttpStatus.RET_CODE_ERROR1;
		ResponseEntity responseEntity = null;
		try {
			BeanValidators.validateWithException(this.validator, requestBody,new Class[0]);
			responseBody = extInterfaceService.searchInterfaceMsg(requestBody,responseBody);
			retCode = responseBody.getRetCode();
		}catch (ConstraintViolationException e) {
			responseBody.setRetCode(retCode);
			responseBody.setRetMsg(BeanValidators.extractMessage(e).toString());
		}catch (Exception e) {
		    e.printStackTrace();
			retCode = ExtHttpStatus.RET_CODE_ERROR4;
			responseBody.setRetCode(retCode);
			responseBody.setRetMsg("查询异常" + e.getMessage());
			logger.error("接口结束：" + requestBody.getInterfaceNo() + "{}\r\n",JSON.toJSONString(responseEntity, true));
		}finally{
			ExtInterfaceLogDTO interfaceLogDto=new ExtInterfaceLogDTO();
			interfaceLogDto.setParentId("0");
			interfaceLogDto.setReqOrgCode(requestBody.getOrg());//机构编码
			interfaceLogDto.setReqProCode(requestBody.getProd());//产品编码
			interfaceLogDto.setReqFuncCode(requestBody.getFuncPointType());//功能点编码
			interfaceLogDto.setReqCardId(requestBody.getCustCardId());//证件号
			interfaceLogDto.setInterfaceNo(requestBody.getInterfaceNo());//接口编码
			interfaceLogDto.setBusinessCode(requestBody.getBusiCode());//业务编码
			interfaceLogDto.setReqTransNo(requestBody.getFrontTransNo());//交易流水号
			interfaceLogDto.setReqTime(Timestamp.valueOf(format.format(date)));
			interfaceLogDto.setRetCode(retCode);
			interfaceLogDto.setRetMsg(responseBody.getRetMsg());
			interfaceLogDto.setReqBody(JSON.toJSONString(requestBody));
			interfaceLogDto.setRetBody(JsonUtil.toJson(responseBody));
			interfaceLogDto.setRetTime(Timestamp.valueOf(format.format(new Date())));
			extInterfaceLogService.insertExtInterfaceLog(interfaceLogDto);
			responseEntity = initResponse(responseBody,HttpStatus.OK,retCode);
			logger.info("接口结束：{}\r\n",JSON.toJSONString(responseEntity, true));
		}
		return responseEntity;
	  }
	 @SuppressWarnings({ "unchecked", "rawtypes" })
	  private <T extends ResponseBodyDTO> ResponseEntity<ResponseMsg<Object>> initResponse(T responseBody, HttpStatus status, String retCode)
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
