package com.jy.modules.externalplatform.application.extfunctioninterfaceref.rest;

import java.util.List;

import javax.validation.Validator;

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
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.dto.ExtFunctionInterfaceRefDTO;
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.service.ExtFunctionInterfaceRefService;
/**
 * @classname: ExtFunctionInterfaceRefRest
 * @description:定义 功能接口映射表 rest服务
 * @author dell
 * @date:2014年10月11日下午2:39:22
 */
@Controller
@RequestMapping(value = "/api/externalplatform/application/extFunctionInterfaceRef")
public class ExtFunctionInterfaceRefRest extends BaseRest{

	@Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extfunctioninterfaceref.service.ExtFunctionInterfaceRefService")
    private ExtFunctionInterfaceRefService service;

	@Autowired
	private Validator validator;

	/**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<ExtFunctionInterfaceRefDTO>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<ExtFunctionInterfaceRefDTO> responseMsg = new ResponseMsg<ExtFunctionInterfaceRefDTO>();
		ExtFunctionInterfaceRefDTO entity = service.queryExtFunctionInterfaceRefByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<ExtFunctionInterfaceRefDTO>> responseEntity = new ResponseEntity<ResponseMsg<ExtFunctionInterfaceRefDTO>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	/**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody ExtFunctionInterfaceRefDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insertExtFunctionInterfaceRef(obj);
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
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody ExtFunctionInterfaceRefDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.updateExtFunctionInterfaceRef(obj);
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
		service.deleteExtFunctionInterfaceRefByPrimaryKey(null,ID);
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
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>();
	
		List<ExtFunctionInterfaceRefDTO> list = service.searchExtFunctionInterfaceRefByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtFunctionInterfaceRefDTO>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>> search(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>();
		List<ExtFunctionInterfaceRefDTO> list = service.searchExtFunctionInterfaceRef(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtFunctionInterfaceRefDTO>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtFunctionInterfaceRefDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
