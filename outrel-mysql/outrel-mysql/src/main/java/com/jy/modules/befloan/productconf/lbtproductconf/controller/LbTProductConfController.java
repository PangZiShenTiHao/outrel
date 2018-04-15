/*package com.jy.modules.befloan.productconf.lbtproductconf.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

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
import com.jy.modules.befloan.productconf.lbtproductconf.dto.LbTProductConfDTO;
import com.jy.modules.befloan.productconf.lbtproductflowconf.service.LbTProductFlowConfService;

*//**
 * @classname: LbTProductConfController
 * @description: 定义  产品基础信息表 控制层
 * @author:  dou
 *//*
@Controller
@Scope("prototype")
@RequestMapping("/lbTProductConf")
public class LbTProductConfController extends BaseController{
	private static final Logger logger =  LoggerFactory.getLogger(LbTProductConfController.class);

	@Autowired
	@Qualifier("com.jy.modules.befloan.productconf.lbtproductconf.service.LbTProductConfService")
	private LbTProductConfService service;

	@Autowired
	@Qualifier("com.jy.modules.befloan.productconf.lbtproductflowconf.service.LbTProductFlowConfService")
	private LbTProductFlowConfService flowConfService;

	*//**
	 * 通过 Controller 请求 跳转 进入至相关 页面
	 *//*
	@RequestMapping(value = "/prepareExecute/{operate}")
	public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
		ModelAndView model = new ModelAndView();

		if("toQueryPage".equals(operate)){//跳转至 查询页面
			model.setViewName("befloan/productconf/lbtproductconf/queryLbTProductConf");
		}else if("toAdd".equals(operate)){ //跳转至 新增页面
			model.setViewName("befloan/productconf/lbtproductconf/addLbTProductConf");
		}else if("toUpdate".equals(operate)){//跳转至 修改页面
			String id = this.getParameterString("id");
			model = this.queryOneDTO(id);
			model.setViewName("befloan/productconf/lbtproductconf/updateLbTProductConf");
		}else if("toView".equals(operate)){//跳转至 查看页面
			String id = this.getParameterString("id");
			model = this.queryOneDTO(id);
			model.setViewName("befloan/productconf/lbtproductconf/viewLbTProductConf");
		} else if("toTreeMainView".equals(operate)){//跳转至 查看页面
			model.setViewName("befloan/productconf/lbtproductconf/viewTreeProduct");
		} else if("toTreeView".equals(operate)){//跳转至 查看页面
			model.setViewName("befloan/productconf/lbtproductconf/viewTreeProductConf");
		} else if("toConfigure".equals(operate)){//跳转至 查看页面
			model.setViewName("befloan/productconf/lbtproductconf/configureProductConf");
		} else if ("ProductConfIndex".equals(operate)){
			model.setViewName("befloan/productconf/lbtproductconf/productConfIndex");
		} else if("toSortNum".equals(operate)){//跳转至 产品排序配置页面
			model.setViewName("befloan/productconf/lbtproductconf/productSortNumConf");
		}

		return model;
	}

	*//**
	 * @author dou
	 * @description:查询分页列表
	 * @date 2014-11-03 15:08:56
	 * @param request
	 * @param dto
	 * @param dataMsg
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/queryListLbTProductConf")
	@ResponseBody
	public DataMsg queryListLbTProductConf(HttpServletRequest request, LbTProductConfDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {

		Map<String, Object> searchParams = new HashMap<String, Object>();
		searchParams.put("dto", dto);
		String yearRate_start = request.getParameter("yearRate_start");
		String yearRate_end = request.getParameter("yearRate_end");
		searchParams.put("yearRate_start", yearRate_start);
		searchParams.put("yearRate_end", yearRate_end);
		searchParams.put("comprehensiveRate_start", request.getParameter("comprehensiveRate_start"));
		searchParams.put("comprehensiveRate_end", request.getParameter("comprehensiveRate_end"));
		QueryReqBean params = new QueryReqBean();
		params.setSearchParams(searchParams);
		PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);

		List<LbTProductConfDTO> list = service.searchLbTProductConfByPaging(params.getSearchParams());
		if(list != null) {
			pageInfo.setTotalCount(list.size());
		}
		dataMsg.setData(list);
		dataMsg.setTotalRows(pageInfo.getTotalCount());
		return dataMsg;
	}

	*//**
	 * @author dou
	 * @description:查询分页列表
	 * @date 2014-11-03 15:08:56
	 * @param request
	 * @param dto
	 * @param dataMsg
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/getAllLbTProductConf")
	@ResponseBody
	public DataMsg getAllLbTProductConf(HttpServletRequest request, LbTProductConfDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
		Map<String, Object> searchParams = new HashMap<String, Object>();
		searchParams.put("dto", dto);
		QueryReqBean params = new QueryReqBean();
		params.setSearchParams(searchParams);
		List<LbTProductConfDTO> list = service.searchLbTProductConf(params.getSearchParams());
		dataMsg.setData(list);
		return dataMsg;
	}

	*//**
	 * @author dou
	 * @description:新增
	 * @date 2014-11-03 15:08:56
	 * @param request
	 * @param dto
	 * @param dataMsg
	 * @return
	 * @throws
	 *//*
	@RequestMapping(value = "/insertLbTProductConf")
	@ResponseBody
	public DataMsg insertLbTProductConf(HttpServletRequest request, LbTProductConfDTO dto, @ModelAttribute DataMsg dataMsg){
		try {
			dto = (LbTProductConfDTO)super.initDto(dto);

			service.insertLbTProductConf(dto);

			dataMsg = super.initDataMsg(dataMsg);
			dataMsg.setMsg("新增成功");
			dataMsg.setData(this.makeJSONData(dto.getId()));
		}catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法insertSysResource异常：", e);
		}
		return dataMsg;
	}

	*//**
	 * @author dou
	 * @description:编辑
	 * @date 2014-11-03 15:08:56
	 * @param request
	 * @param dto
	 * @param pageData
	 * @return
	 * @throws
	 *//*
	@RequestMapping(value = "/updateLbTProductConf")
	@ResponseBody
	public DataMsg updateLbTProductConf(HttpServletRequest request, LbTProductConfDTO dto, @ModelAttribute DataMsg dataMsg){
		try {
			dto = (LbTProductConfDTO)super.initDto(dto);

			service.updateLbTProductConf(dto);

			dataMsg = super.initDataMsg(dataMsg);
			dataMsg.setMsg("修改成功");
			dataMsg.setData(this.makeJSONData(dto.getId()));
		}catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法updateSysResource异常：", e);
		}
		return dataMsg;
	}

	*//**
	 * @author dou
	 * @description:删除
	 * @date 2014-11-03 15:08:56
	 * @param request
	 * @param pageData
	 * @return
	 * @throws
	 *//*
	@RequestMapping(value = "/deleteLbTProductConf")
	@ResponseBody
	public DataMsg deleteLbTProductConf(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){

		BaseDTO dto = super.initDto(null);
		String ids = (String) this.getParameter("ids");//格式: 1,2,3
		dataMsg = super.initDataMsg(dataMsg);
		try {
			service.deleteLbTProductConfByPrimaryKey(dto,ids);
			dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteSysResource异常：", e);

		}

		return dataMsg;
	}
	*//**
	 * @author dou
	 * @description:通过主键查询 其明细信息
	 * @date 2014-11-03 15:08:56
	 * @param id
	 * @return
	 *//*
	private ModelAndView queryOneDTO(String id) throws AbaboonException {
		ModelAndView model = new ModelAndView();
		try{
			LbTProductConfDTO dto = service.queryLbTProductConfByPrimaryKey(id);
			//将信息放入 model 以便于传至页面 使用
			model.addObject("dto", dto);
		}catch(Exception e){
			throw new AbaboonException("执行queryOneDTO异常：",e);
		}
		return model;
	}

	*//**
	 * @author 豆永亮
	 * @description:查询所有产品信息树
	 * @date 2014-11-07 
	 * @param request
	 * @param dto
	 * @param dataMsg
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/queryTreeProductInfo")
	@ResponseBody
	public List<Map<String, String>> queryTreeAttachTypeInfo(HttpServletRequest request, LbTProductConfDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {

		Map<String, Object> searchParams = new HashMap<String, Object>();
		searchParams.put("dto", dto);
		QueryReqBean params = new QueryReqBean();
		params.setSearchParams(searchParams);
		List<LbTProductConfDTO> list = service.searchLbTProductConf(searchParams);
		return treeData(list);
	}

	*//**Description: 转换成树节点集合
	 * Create Date: 2014年11月07日
	 * Author     : 豆永亮
	 * @param data
	 * @return
	 *//*
	private List<Map<String, String>> treeData(List<LbTProductConfDTO> data) {
		if(data!=null && data.size()>0){
			List<Map<String, String>> maps = new ArrayList<Map<String, String>>();
			for(LbTProductConfDTO product: data){
				Map<String, String>  map = new HashMap<String, String>();
				map.put("ID", product.getId().toString());
				map.put("NAME", product.getProductName());
				map.put("PID", product.getParentId().toString());
				maps.add(map);
			}
			return maps;
		}else{
			return null;
		}
	}


	*//**
	 * @param  productCode 产品编号 
	 * @description:查询实收显示客群分类
	 * @return 产品基础信息实体
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/getProductConfInfo")
	@ResponseBody
	public DataMsg getProductConfInfo(String productCode,@ModelAttribute DataMsg dataMsg) throws Exception{
		String  result = flowConfService.isShowColumn(productCode,"ext4");
		dataMsg.setMsg(result);
		return dataMsg;	
	}
	
	
	*//**
	 * @param  productCode 产品编号 
	 * @description:查询实收显示保险类型和授信依据
	 * @return 产品基础信息实体
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/isShowInsuranceInfo")
	@ResponseBody
	public DataMsg isShowInsuranceInfo(String productCode,@ModelAttribute DataMsg dataMsg) throws Exception{
		String  result = flowConfService.isShowColumn(productCode,"ext5");
		dataMsg.setMsg(result);
		return dataMsg;	
	}
	
	
	*//**
	* @description:修改产品类型排序
	* @param dataMsg
	* @return
	* @throws 
	*//* 
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/updateProductSortNum")
	@ResponseBody
	public DataMsg updateProductSortNum(@ModelAttribute DataMsg dataMsg) {
		try {
			String sortProductStr = this.getParameterString("sortProductStr");
			if (StringUtils.isNotEmpty(sortProductStr)) {
				JSONArray sortProductStrJson = JSONArray.fromObject(sortProductStr);
				List<LbTProductConfDTO> productInfoList = JSONArray.toList(sortProductStrJson, LbTProductConfDTO.class);
				//修改产品类型排序
				service.updateProductSortNum(productInfoList);
				dataMsg = super.initDataMsg(dataMsg);
				dataMsg.setMsg("保存成功");
			}
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法updateProductSortNum异常：", e);
		}
		return dataMsg;
	}
	
}
*/