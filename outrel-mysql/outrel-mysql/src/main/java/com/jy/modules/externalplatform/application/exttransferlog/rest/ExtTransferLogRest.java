package com.jy.modules.externalplatform.application.exttransferlog.rest;

import java.util.List;

import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.core.message.QueryRespBean;
import com.fintech.platform.core.message.ResponseMsg;
import com.fintech.platform.restservice.web.base.BaseRest;
import com.jy.modules.externalplatform.application.exttransferlog.dto.ExtTransferLogDTO;
import com.jy.modules.externalplatform.application.exttransferlog.service.ExtTransferLogService;
/**
 * @classname: ExtTransferLogRest
 * @description:定义 EXT_TRANSFER_LOG rest服务
 * @author dell
 * @date:2014年10月11日下午2:39:22
 */
@Controller
@RequestMapping(value = "/api/platform/extTransferLog")
public class ExtTransferLogRest extends BaseRest{

	private static Logger logger = LoggerFactory.getLogger(ExtTransferLogRest.class);

	@Autowired
    @Qualifier("com.jy.modules.externalplatform.application.exttransferlog.service.ExtTransferLogService")
    private ExtTransferLogService service;

	@Autowired
	private Validator validator;

	/**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<ExtTransferLogDTO>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<ExtTransferLogDTO> responseMsg = new ResponseMsg<ExtTransferLogDTO>();
		ExtTransferLogDTO entity = service.queryExtTransferLogByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<ExtTransferLogDTO>> responseEntity = new ResponseEntity<ResponseMsg<ExtTransferLogDTO>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	/**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody ExtTransferLogDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insertExtTransferLog(obj);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	

	/**
	 * 修改一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/update/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody ExtTransferLogDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.updateExtTransferLog(obj);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	/**
	 * 删除一个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/delete/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<Void>> delete(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		service.deleteExtTransferLogByPrimaryKey(null,ID);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	/**
	 * 按条件查询并分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/searchByPage/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtTransferLogDTO>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtTransferLogDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtTransferLogDTO>>();
	
		List<ExtTransferLogDTO> list = service.searchExtTransferLogByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtTransferLogDTO>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<ExtTransferLogDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtTransferLogDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtTransferLogDTO>>> search(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtTransferLogDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtTransferLogDTO>>();
		List<ExtTransferLogDTO> list = service.searchExtTransferLog(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtTransferLogDTO>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<ExtTransferLogDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtTransferLogDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
