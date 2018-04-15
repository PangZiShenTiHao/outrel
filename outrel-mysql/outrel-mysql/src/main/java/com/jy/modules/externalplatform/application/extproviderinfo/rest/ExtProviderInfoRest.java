package com.jy.modules.externalplatform.application.extproviderinfo.rest;

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
import com.jy.modules.externalplatform.application.extproviderinfo.dto.ExtProviderInfoDTO;
import com.jy.modules.externalplatform.application.extproviderinfo.service.ExtProviderInfoService;
/**
 * @classname: ExtProviderInfoRest
 * @description:定义 提供商配置表 rest服务
 * @author Administrator
 * @date:2014年10月11日下午2:39:22
 */
@Controller
@RequestMapping(value = "/api/externalplatform/application/extProviderInfo")
public class ExtProviderInfoRest extends BaseRest{


	@Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extproviderinfo.service.ExtProviderInfoService")
    private ExtProviderInfoService service;

	@Autowired
	private Validator validator;

	/**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<ExtProviderInfoDTO>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<ExtProviderInfoDTO> responseMsg = new ResponseMsg<ExtProviderInfoDTO>();
		ExtProviderInfoDTO entity = service.queryExtProviderInfoByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<ExtProviderInfoDTO>> responseEntity = new ResponseEntity<ResponseMsg<ExtProviderInfoDTO>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	/**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody ExtProviderInfoDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insertExtProviderInfo(obj);
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
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody ExtProviderInfoDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.updateExtProviderInfo(obj);
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
		service.deleteExtProviderInfoById(null,ID);
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
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtProviderInfoDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>();
	
		List<ExtProviderInfoDTO> list = service.searchExtProviderInfoByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtProviderInfoDTO>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>> search(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<ExtProviderInfoDTO>> responseMsg = new ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>();
		List<ExtProviderInfoDTO> list = service.searchExtProviderInfo(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<ExtProviderInfoDTO>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<ExtProviderInfoDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
