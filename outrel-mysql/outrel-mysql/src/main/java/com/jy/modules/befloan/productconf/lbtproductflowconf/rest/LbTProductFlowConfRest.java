package com.jy.modules.befloan.productconf.lbtproductflowconf.rest;

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
import com.jy.modules.befloan.productconf.lbtproductflowconf.dto.LbTProductFlowConfDTO;
import com.jy.modules.befloan.productconf.lbtproductflowconf.service.LbTProductFlowConfService;
/**
 * @classname: LbTProductFlowConfRest
 * @description:定义 产品流程配置表 rest服务
 * @author JY-IT-D001
 * @date:2014年10月11日下午2:39:22
 */
@Controller
@RequestMapping(value = "/api/befloan/productconf/lbTProductFlowConf")
public class LbTProductFlowConfRest {

	private static Logger logger = LoggerFactory.getLogger(LbTProductFlowConfRest.class);

	@Autowired
    @Qualifier("com.jy.modules.befloan.productconf.lbtproductflowconf.service.LbTProductFlowConfService")
    private LbTProductFlowConfService service;

	@Autowired
	private Validator validator;

	/**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<LbTProductFlowConfDTO>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<LbTProductFlowConfDTO> responseMsg = new ResponseMsg<LbTProductFlowConfDTO>();
		LbTProductFlowConfDTO entity = service.queryLbTProductFlowConfByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<LbTProductFlowConfDTO>> responseEntity = new ResponseEntity<ResponseMsg<LbTProductFlowConfDTO>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	/**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody LbTProductFlowConfDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insertLbTProductFlowConf(obj);
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
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody LbTProductFlowConfDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.updateLbTProductFlowConf(obj);
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
		service.deleteLbTProductFlowConfByPrimaryKey(null,ID);
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
	public ResponseEntity<ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>> responseMsg = new ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>();
	
		List<LbTProductFlowConfDTO> list = service.searchLbTProductFlowConfByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<LbTProductFlowConfDTO>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>> search(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>> responseMsg = new ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>();
		List<LbTProductFlowConfDTO> list = service.searchLbTProductFlowConf(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<LbTProductFlowConfDTO>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<LbTProductFlowConfDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
