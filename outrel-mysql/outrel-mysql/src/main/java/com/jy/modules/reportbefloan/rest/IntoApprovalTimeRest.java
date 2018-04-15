package com.jy.modules.reportbefloan.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.web.MediaTypes;

import com.fintech.platform.core.message.ResponseMsg;
import com.fintech.platform.restservice.web.base.BaseRest;
import com.jy.modules.reportbefloan.service.IntoApprovalTimeService;
/**
 * 定义进件审批时效分布式调用 REST服务
 * @author chengang
 *
 */
@Controller
@RequestMapping(value = "/api/befloan/intoAppTimeRPT")
public class IntoApprovalTimeRest  extends BaseRest{
	private static Logger logger = LoggerFactory.getLogger(IntoApprovalTimeRest.class);

	@Autowired
    @Qualifier("com.jy.modules.reportbefloan.service.IntoApprovalTimeService")
    private IntoApprovalTimeService service;

	/**
	 * 分布式调用
	 * @param batchMinId
	 * @param batchMaxId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/dictCalReprot/v1/{batchMinId}/{batchMaxId}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<Void>> searchV1(@PathVariable("batchMinId")String batchMinId,@PathVariable("batchMaxId")String batchMaxId) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		logger.info("=====searchV1===batchMinId："+batchMinId+",batchMaxId:"+batchMaxId);
		service.obtainIntoInfoReport(batchMinId, batchMaxId);
		
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 分布式 分页调用
	 * @param batchMinId
	 * @param batchMaxId
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/dictCalReprot/v2/{curPage}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<Void>> searchV2(@PathVariable("curPage")int curPage) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		logger.info("=====searchV2===curPage："+curPage);
		service.obtainIntoInfoReport(curPage);
		
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}*/
}
