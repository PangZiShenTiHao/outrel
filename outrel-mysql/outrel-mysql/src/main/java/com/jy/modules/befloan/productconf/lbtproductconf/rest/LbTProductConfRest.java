/*package com.jy.modules.befloan.productconf.lbtproductconf.rest;

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
import com.jy.modules.befloan.productconf.lbtproductconf.dto.LbTProductConfDTO;
*//**
 * @classname: LbTProductConfRest
 * @description:定义 产品基础信息表 rest服务
 * @author dou
 * @date:2014年10月11日下午2:39:22
 *//*
@Controller
@RequestMapping(value = "/api/befloan/productconf/lbTProductConf")
public class LbTProductConfRest {

	private static Logger logger = LoggerFactory.getLogger(LbTProductConfRest.class);

	@Autowired
    @Qualifier("com.jy.modules.befloan.productconf.lbtproductconf.service.LbTProductConfService")
    private LbTProductConfService service;

	@Autowired
	private Validator validator;

	*//**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<LbTProductConfDTO>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<LbTProductConfDTO> responseMsg = new ResponseMsg<LbTProductConfDTO>();
		LbTProductConfDTO entity = service.queryLbTProductConfByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<LbTProductConfDTO>> responseEntity = new ResponseEntity<ResponseMsg<LbTProductConfDTO>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	*//**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody LbTProductConfDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insertLbTProductConf(obj);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	

	*//**
	 * 修改一个业务对象
	 * @param user
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value="/update/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody LbTProductConfDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.updateLbTProductConf(obj);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	*//**
	 * 删除一个业务对象
	 * @param id
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value = "/delete/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<Void>> delete(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		service.deleteLbTProductConfByPrimaryKey(null,ID);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	*//**
	 * 按条件查询并分页
	 * @param page
	 * @return
	 *//*
	@RequestMapping(value = "/searchByPage/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<LbTProductConfDTO>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<LbTProductConfDTO>> responseMsg = new ResponseMsg<QueryRespBean<LbTProductConfDTO>>();
	
		List<LbTProductConfDTO> list = service.searchLbTProductConfByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<LbTProductConfDTO>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<LbTProductConfDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<LbTProductConfDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	*//**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 *//*
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<LbTProductConfDTO>>> search(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<LbTProductConfDTO>> responseMsg = new ResponseMsg<QueryRespBean<LbTProductConfDTO>>();
		List<LbTProductConfDTO> list = service.searchLbTProductConf(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<LbTProductConfDTO>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<LbTProductConfDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<LbTProductConfDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
*/