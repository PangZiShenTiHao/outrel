package com.jy.modules.externalplatform.application.extinvokefilterrule.controller;

import java.util.Arrays;
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
import com.jy.modules.externalplatform.application.extinvokefilterrule.dto.ExtInvokeFilterRuleDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrule.enumdef.RuleMapEnum;
import com.jy.modules.externalplatform.application.extinvokefilterrule.service.ExtInvokeFilterRuleService;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.dto.ExtInvokeFilterRuleMapDTO;
import com.jy.modules.externalplatform.application.extinvokefilterrulemap.service.ExtInvokeFilterRuleMapService;

/**
 * @classname: ExtInvokeFilterRuleController
 * @description: 定义  外联调用挡板规则表 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extInvokeFilterRule")
public class ExtInvokeFilterRuleController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtInvokeFilterRuleController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extinvokefilterrule.service.ExtInvokeFilterRuleService")
    private ExtInvokeFilterRuleService service;
    @Autowired
    private ExtInvokeFilterRuleMapService ruleMapService;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     * @throws Exception 
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws Exception {
        ModelAndView model = new ModelAndView();
    	String sysCode = this.getParameterString("sysCode");//获取系统编码
        model.addObject("sysCode", sysCode);
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/application/extinvokefilterrule/queryExtInvokeFilterRule");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("externalplatform/application/extinvokefilterrule/addExtInvokeFilterRule");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id,model);
        	model.setViewName("externalplatform/application/extinvokefilterrule/updateExtInvokeFilterRule");
        }else if("addOrgTree".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/basicinfo/addOrgTree");
        }else if("addFuncTree".equals(operate)){
        	model.setViewName("externalplatform/application/extinvokefilterrule/addFuncTree");
        }else if("toView".equals(operate)){//跳转至 查看页面
            String id = this.getParameterString("id");
         	model = this.queryOneDTO(id,model);
         	model.setViewName("externalplatform/application/extinvokefilterrule/viewExtInvokeFilterRule");
       	}
        return model;
    }
    
    /**
     * @author dell
     * @description:查询分页列表
     * @date 2017-04-26 09:10:36
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtInvokeFilterRule")
    @ResponseBody
    public DataMsg queryListExtInvokeFilterRule(HttpServletRequest request, ExtInvokeFilterRuleDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtInvokeFilterRuleDTO> list = service.searchExtInvokeFilterRuleByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author dell
     * @description:新增
     * @date 2017-04-26 09:10:36
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtInvokeFilterRule")
    @ResponseBody
    public DataMsg insertExtInvokeFilterRule(HttpServletRequest request, ExtInvokeFilterRuleDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtInvokeFilterRuleDTO)super.initDto(dto);
        	String prodStr  = this.getParameterString("prodTabStr");
        	String orgTabStr  = this.getParameterString("orgTabStr");
        	String funcTabStr  = this.getParameterString("funcTabStr");
        	Map<String,List<String>> map = new HashMap<String,List<String>>();
        	List<String> prodList = null;
    		if(StringUtils.isNotEmpty(prodStr)) {
    			prodList = Arrays.asList(prodStr.split(","));
    			map.put(RuleMapEnum.MAP_TYPE_PROD.getKey(), prodList);//适用产品
    		}
    		List<String> orgList = null;
    		if(StringUtils.isNotEmpty(orgTabStr)) {
    			orgList = Arrays.asList(orgTabStr.split(","));
    			map.put(RuleMapEnum.MAP_TYPE_ORG.getKey(), orgList);//适用门店
    		}
    		List<String> funcList = null;
    		if(StringUtils.isNotEmpty(funcTabStr)) {
    			funcList = Arrays.asList(funcTabStr.split(","));
    			map.put(RuleMapEnum.MAP_TYPE_FUNC.getKey(), funcList);//适用功能
    		}
			service.saveOrUpdateExtInvokeFilterRule(dto, map, null);
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtInvokeFilterRule异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:编辑
     * @date 2017-04-26 09:10:36
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtInvokeFilterRule")
    @ResponseBody
    public DataMsg updateExtInvokeFilterRule(HttpServletRequest request, ExtInvokeFilterRuleDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtInvokeFilterRuleDTO)super.initDto(dto);
        	Map<String, List<String>> inputRuleMap = getInputRuleMap();
			service.saveOrUpdateExtInvokeFilterRule(dto,inputRuleMap ,RuleMapEnum.MAP_TYPE_PROD.getValue());
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtInvokeFilterRule异常：", e);
        }
        return dataMsg;
    }
    
    /**
     * @author dell
     * @description:通过主键查询 其明细信息
     * @date 2017-04-26 09:10:36
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id,ModelAndView model) throws AbaboonException {
        
        try{
        	ExtInvokeFilterRuleDTO dto = service.queryExtInvokeFilterRuleByPrimaryKey(id);
        	Map<String, Object> searchParams = new HashMap<String, Object>();
        	ExtInvokeFilterRuleMapDTO  queryRuleMapDto = new ExtInvokeFilterRuleMapDTO();
        	searchParams.put("dto", queryRuleMapDto);
        	List<ExtInvokeFilterRuleMapDTO> prodList = ruleMapService.searchExtInvokeFilterRuleMap(searchParams);
            StringBuffer prodStr = new StringBuffer();
        	if(prodList.size()>0) {
        		prodStr.append(prodList.get(0).getMapCode());
        		prodList.remove(0);
        		for(ExtInvokeFilterRuleMapDTO mapdto : prodList) {
        			prodStr.append(",").append(mapdto.getMapCode());
        		}
        	}
        	//将信息放入 model 以便于传至页面 使用
            model.addObject("prodStr", prodStr);
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
    
    
    private Map<String, List<String>> getInputRuleMap() {

		String prodStr = this.getParameterString("prodTabStr");
		
		Map<String, List<String>> map = new HashMap<String, List<String>>();
		List<String> prodList = null;
		if (StringUtils.isNotEmpty(prodStr)) {
			prodList = Arrays.asList(prodStr.split(","));
			map.put(RuleMapEnum.MAP_TYPE_PROD.getKey(), prodList);// 适用产品
		}
		return map;
	}	
    
	/**
	* @title: deleteExtInvokeFilterRule
	* @author:陈东栋
	* @description: 删除 外联调用挡板规则以及映射表,按规则ID
	* @date 2017年5月3日 上午9:41:54
	* @param request
	* @param dataMsg
	* @return
	* @throws 
	*/ 
    @RequestMapping(value = "/deleteExtInvokeFilterRule")
    @ResponseBody
    public DataMsg deleteExtInvokeFilterRule(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 //删除 外联调用挡板规则-映射表,按规则ID
			 ruleMapService.deleteExtInvokeFilterRuleMapByRuleId(ids,null);
			 //删除 外联调用挡板规则表,按主键
			 service.deleteExtInvokeFilterRuleByPrimaryKey(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtInvokeFilterRule异常：", e);

		}
        return dataMsg;
    }
	
     
}
