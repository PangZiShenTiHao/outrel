package com.jy.modules.externalplatform.application.extproviderinterfaceref.rest;

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
import com.jy.modules.externalplatform.application.extproviderinterfaceref.dto.ExtProviderInterfaceRefDTO;
import com.jy.modules.externalplatform.application.extproviderinterfaceref.service.ExtProviderInterfaceRefService;
/**
 * @classname: ExtProviderInterfaceRefRest
 * @description:定义 提供商和接口映射表 rest服务
 * @author Administrator
 * @date:2014年10月11日下午2:39:22
 */
@Controller
@RequestMapping(value = "/api/externalplatform/application/extProviderInterfaceRef")
public class ExtProviderInterfaceRefRest extends BaseRest{


	@Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extproviderinterfaceref.service.ExtProviderInterfaceRefService")
    private ExtProviderInterfaceRefService service;

	@Autowired
	private Validator validator;

	/**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<ExtProviderInterfaceRefDTO>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<ExtProviderInterfaceRefDTO> responseMsg = new ResponseMsg<ExtProviderInterfaceRefDTO>();
		ExtProviderInterfaceRefDTO entity = service.queryExtProviderInterfaceRefByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<ExtProviderInterfaceRefDTO>> responseEntity = new ResponseEntity<ResponseMsg<ExtProviderInterfaceRefDTO>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	/**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody ExtProviderInterfaceRefDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insertExtProviderInterfaceRef(obj);
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
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody ExtProviderInterfaceRefDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.updateExtProviderInterfaceRef(obj);
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
		service.deleteExtProviderInterfaceRefByID(null, ID);
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
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>();
	
		List<ExtProviderInterfaceRefDTO> list = service.searchExtProviderInterfaceRefByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtProviderInterfaceRefDTO>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>> search(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>();
		List<ExtProviderInterfaceRefDTO> list = service.searchExtProviderInterfaceRef(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtProviderInterfaceRefDTO>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInterfaceRefDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
