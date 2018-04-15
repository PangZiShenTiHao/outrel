package com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.rest;

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
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dto.LbtIntoFilterRuleMapDTO;
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.service.LbtIntoFilterRuleMapService;
/**
 * @classname: LbtIntoFilterRuleMapRest
 * @description:定义 进件筛选规则-映射表 rest服务
 * @author JY-IT-D001
 * @date:2014年10月11日下午2:39:22
 */
@Controller
@RequestMapping(value = "/api/befloan/intofilterrule/lbtIntoFilterRuleMap")
public class LbtIntoFilterRuleMapRest extends BaseRest{

	private static Logger logger = LoggerFactory.getLogger(LbtIntoFilterRuleMapRest.class);

	@Autowired
    @Qualifier("com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.service.LbtIntoFilterRuleMapService")
    private LbtIntoFilterRuleMapService service;

	@Autowired
	private Validator validator;

	/**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<LbtIntoFilterRuleMapDTO>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<LbtIntoFilterRuleMapDTO> responseMsg = new ResponseMsg<LbtIntoFilterRuleMapDTO>();
		LbtIntoFilterRuleMapDTO entity = service.queryLbtIntoFilterRuleMapByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<LbtIntoFilterRuleMapDTO>> responseEntity = new ResponseEntity<ResponseMsg<LbtIntoFilterRuleMapDTO>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	/**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody LbtIntoFilterRuleMapDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insertLbtIntoFilterRuleMap(obj);
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
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody LbtIntoFilterRuleMapDTO obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.updateLbtIntoFilterRuleMap(obj);
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
		service.deleteLbtIntoFilterRuleMapByPrimaryKey(null,ID);
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
	public ResponseEntity<ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>> responseMsg = new ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>();
	
		List<LbtIntoFilterRuleMapDTO> list = service.searchLbtIntoFilterRuleMapByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<LbtIntoFilterRuleMapDTO>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>> search(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>> responseMsg = new ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>();
		List<LbtIntoFilterRuleMapDTO> list = service.searchLbtIntoFilterRuleMap(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<LbtIntoFilterRuleMapDTO>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<LbtIntoFilterRuleMapDTO>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
