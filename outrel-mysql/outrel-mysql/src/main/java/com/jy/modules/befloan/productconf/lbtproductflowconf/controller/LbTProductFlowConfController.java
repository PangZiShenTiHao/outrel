package com.jy.modules.befloan.productconf.lbtproductflowconf.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fintech.platform.core.common.BaseDTO;
import com.fintech.platform.core.message.DataMsg;
import com.fintech.platform.core.message.PageParameter;
import com.fintech.platform.core.message.PageUtil;
import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.restservice.exception.AbaboonException;
import com.fintech.platform.restservice.web.base.BaseController;
import com.jy.modules.befloan.productconf.lbtproductflowconf.dto.LbTProductFlowConfDTO;
import com.jy.modules.befloan.productconf.lbtproductflowconf.service.LbTProductFlowConfService;

/**
 * @classname: LbTProductFlowConfController
 * @description: 定义  产品流程配置表 控制层
 * @author:  JY-IT-D001
 */
@Controller
@Scope("prototype")
@RequestMapping("/lbTProductFlowConf")
public class LbTProductFlowConfController extends BaseController{
	private static final Logger logger =  LoggerFactory.getLogger(LbTProductFlowConfController.class);

	@Autowired
	@Qualifier("com.jy.modules.befloan.productconf.lbtproductflowconf.service.LbTProductFlowConfService")
	private LbTProductFlowConfService service;

	/**
	 * 通过 Controller 请求 跳转 进入至相关 页面
	 */
	@RequestMapping(value = "/prepareExecute/{operate}")
	public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
		ModelAndView model = new ModelAndView();
		String prodId = this.getParameterString("prodId");
		model.addObject("prodId", prodId);
		if("toQueryPage".equals(operate)){//跳转至 查询页面
			model.setViewName("befloan/productconf/lbtproductflowconf/queryLbTProductFlowConf");
		}else if("toAdd".equals(operate)){ //跳转至 新增页面
			model.setViewName("befloan/productconf/lbtproductflowconf/addLbTProductFlowConf");
		}else if("toUpdate".equals(operate)){//跳转至 修改页面
			String id = this.getParameterString("id");
			model = this.queryOneDTO(id);
			model.setViewName("befloan/productconf/lbtproductflowconf/updateLbTProductFlowConf");
		}else if("toView".equals(operate)){//跳转至 查看页面
			String id = this.getParameterString("id");
			model = this.queryOneDTO(id);
			model.setViewName("befloan/productconf/lbtproductflowconf/viewLbTProductFlowConf");
		}

		return model;
	}

	/**
	 * @author JY-IT-D001
	 * @description:查询分页列表
	 * @date 2014-12-23 10:19:23
	 * @param request
	 * @param dto
	 * @param dataMsg
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/queryListLbTProductFlowConf")
	@ResponseBody
	public DataMsg queryListLbTProductFlowConf(HttpServletRequest request, LbTProductFlowConfDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {

		Map<String, Object> searchParams = new HashMap<String, Object>();
		searchParams.put("dto", dto);
		QueryReqBean params = new QueryReqBean();
		params.setSearchParams(searchParams);
		PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);

		List<LbTProductFlowConfDTO> list = service.searchLbTProductFlowConfByPaging(params.getSearchParams());

		dataMsg.setData(list);
		dataMsg.setTotalRows(pageInfo.getTotalCount());
		return dataMsg;
	}


	/**
	 * @author JY-IT-D001
	 * @description:新增
	 * @date 2014-12-23 10:19:23
	 * @param request
	 * @param dto
	 * @param dataMsg
	 * @return
	 * @throws
	 */
	@RequestMapping(value = "/insertLbTProductFlowConf")
	@ResponseBody
	public DataMsg insertLbTProductFlowConf(HttpServletRequest request, LbTProductFlowConfDTO dto, @ModelAttribute DataMsg dataMsg){
		try {
			LbTProductFlowConfDTO prodFlowTemp = service.queryLbTProductFlowConfByFkProConfId(dto.getFkProConfId());
			if(prodFlowTemp == null) {
				dto = (LbTProductFlowConfDTO)super.initDto(dto);
				
				service.insertLbTProductFlowConf(dto);
				
				dataMsg = super.initDataMsg(dataMsg);
				dataMsg.setMsg("新增成功");
				dataMsg.setData(this.makeJSONData(dto.getId()));
			} else {
				dataMsg.setMsg("该产品已经进行配置,请勿重复操作");
				dataMsg.setStatus("validateFailed");
			}
		}catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法insertSysResource异常：", e);
		}
		return dataMsg;
	}

	/**
	 * @author JY-IT-D001
	 * @description:编辑
	 * @date 2014-12-23 10:19:23
	 * @param request
	 * @param dto
	 * @param pageData
	 * @return
	 * @throws
	 */
	@RequestMapping(value = "/updateLbTProductFlowConf")
	@ResponseBody
	public DataMsg updateLbTProductFlowConf(HttpServletRequest request, LbTProductFlowConfDTO dto, @ModelAttribute DataMsg dataMsg){
		try {
			dto = (LbTProductFlowConfDTO)super.initDto(dto);

			service.updateLbTProductFlowConf(dto);

			dataMsg = super.initDataMsg(dataMsg);
			dataMsg.setMsg("修改成功");
			dataMsg.setData(this.makeJSONData(dto.getId()));
		}catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法updateSysResource异常：", e);
		}
		return dataMsg;
	}

	/**
	 * @author JY-IT-D001
	 * @description:删除
	 * @date 2014-12-23 10:19:23
	 * @param request
	 * @param pageData
	 * @return
	 * @throws
	 */
	@RequestMapping(value = "/deleteLbTProductFlowConf")
	@ResponseBody
	public DataMsg deleteLbTProductFlowConf(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){

		BaseDTO dto = super.initDto(null);
		String ids = (String) this.getParameter("ids");//格式: 1,2,3
		dataMsg = super.initDataMsg(dataMsg);
		try {
			service.deleteLbTProductFlowConfByID(dto,ids);
			dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteSysResource异常：", e);

		}

		return dataMsg;
	}
	/**
	 * @author JY-IT-D001
	 * @description:通过主键查询 其明细信息
	 * @date 2014-12-23 10:19:23
	 * @param id
	 * @return
	 */
	private ModelAndView queryOneDTO(String id) throws AbaboonException {
		ModelAndView model = new ModelAndView();
		try{
			LbTProductFlowConfDTO dto = service.queryLbTProductFlowConfByPrimaryKey(id);
			//将信息放入 model 以便于传至页面 使用
			model.addObject("dto", dto);
		}catch(Exception e){
			throw new AbaboonException("执行queryOneDTO异常：",e);
		}
		return model;
	}


	/**
	 * 验证产品流程（如果流程实例一致则可以再审核的时候选择其他的产品）
	 * @param request
	 * @param dataMsg
	 * @return
	 */
	@RequestMapping(value = "/checkProductProcess")
	@ResponseBody
	public DataMsg checkProductProcess(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){

		String fromId = (String) this.getParameter("fromProdId");//原产品id
		String toProdId = (String) this.getParameter("toProdId");//选择后产品id
		try {
			LbTProductFlowConfDTO fromProd =  service.queryLbTProductFlowConfByFkProConfId(fromId);
			LbTProductFlowConfDTO toProd =  service.queryLbTProductFlowConfByFkProConfId(toProdId);
			//如果流程实例一致可进行切换
			if(fromProd!=null && toProd!=null){
				if(fromProd.getCreditAuditFlowCode().equals(toProd.getCreditAuditFlowCode())){
					dataMsg.setMsg("ok");
				}else{
					dataMsg.setMsg("no");
				}
			}else {
				throw new AbaboonException("所选产品没有在产品流程配置表配置！");
			}
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法checkProductProcess异常：", e);
		}
		return dataMsg;
	}
	
	
	/**
	 * 检验产品是否需要进行二次评分
	 * @param request
	 * @param dataMsg
	 * @return
	 */
	@RequestMapping(value = "/checkIsSecond")
	@ResponseBody
	public DataMsg checkIsSecond(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){

		String prodId = (String) this.getParameter("productCode");//原产品id
		try {
			LbTProductFlowConfDTO productFlowConfDTO = service.queryLbTProductFlowConfByFkProConfId(prodId);
			if(productFlowConfDTO!=null && StringUtils.isNotEmpty(productFlowConfDTO.getExt3())){
				if("1".equals(productFlowConfDTO.getExt3())){
					dataMsg.setMsg("ok");
				}else{
					dataMsg.setMsg("no");
				}
			}
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法checkIsSecond异常：", e);
		}
		return dataMsg;
	}
	
	/**
	 * 检查签约金额期限
	 * @param request
	 * @param dataMsg
	 * @return
	 */
	@RequestMapping(value = "/checkMoneyPeriod")
	@ResponseBody
	public DataMsg checkMoneyPeriod(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){

		String product = (String) this.getParameter("product");//原产品id
		String type = this.getParameterString("type");
		String status = this.getParameterString("status");
		String result = "";
		try {
			LbTProductFlowConfDTO productFlowConfDTO = service.queryLbTProductFlowConfByFkProConfId(product);
			if("1".equals(type)){//金额调整
				if(productFlowConfDTO!=null && StringUtils.isNotEmpty(productFlowConfDTO.getAdjustLargeMoney()) && "1".equals(status)){
					if("0".equals(productFlowConfDTO.getAdjustLargeMoney())){
						result = "no";
					}else{
						result = "yes";
					}
				}
				if(productFlowConfDTO!=null && StringUtils.isNotEmpty(productFlowConfDTO.getAdjustLittleMoney()) && "2".equals(status)){
					if("0".equals(productFlowConfDTO.getAdjustLittleMoney())){
						result = "no";
					}else{
						result = "yes";
					}
				}
				
			}else{//期限调整
				if(productFlowConfDTO!=null && StringUtils.isNotEmpty(productFlowConfDTO.getAdjustLargePeroid()) && "1".equals(status)){
					if("0".equals(productFlowConfDTO.getAdjustLargePeroid())){
						result = "no";
					}else{
						result = "yes";
					}
				}
				if(productFlowConfDTO!=null && StringUtils.isNotEmpty(productFlowConfDTO.getAdjustLittlePeroid()) && "2".equals(status)){
					if("0".equals(productFlowConfDTO.getAdjustLittlePeroid())){
						result = "no";
					}else{
						result = "yes";
					}
				}
				
			}
			dataMsg.setData(result);
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法checkIsSecond异常：", e);
		}
		return dataMsg;
	}
}
