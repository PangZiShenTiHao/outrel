package com.jy.modules.externalplatform.interfacerest.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fintech.platform.core.message.DataMsg;
import com.fintech.platform.core.message.PageParameter;
import com.fintech.platform.core.message.PageUtil;
import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.restservice.exception.AbaboonException;
import com.fintech.platform.restservice.web.base.BaseController;
import com.jy.modules.externalplatform.interfacerest.dto.ExtInterfaceLogDTO;
import com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceLogService;
import com.jy.modules.externalplatform.interfacerest.utils.InterfaceEnum;

/**
 * @classname: ExtInterfaceLogController
 * @description: 定义  调用接口日志表 控制层
 * @author:  Administrator
 */
@Controller
@Scope("prototype")
@RequestMapping("/extInterfaceLog")
public class ExtInterfaceLogController extends BaseController{

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceLogService")
    private ExtInterfaceLogService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 交易查询页面
        	model.setViewName("externalplatform/record/queryExtInterfaceLog");
        }else if("toQuerySunPage".equals(operate)){//跳转至 小接口查询页面
        	model.setViewName("externalplatform/record/querySunExtInterfaceLog");
        }else if("toQueryStatus".equals(operate)){//跳转至 接口质量分析页面
        	model.addObject("successStatus", InterfaceEnum.SUCCESS_STATUS.getValue());
        	model.addObject("failStatus", InterfaceEnum.FAIL_STATUS.getValue());
        	model.addObject("errorStatus", InterfaceEnum.ERROR_STATUS.getValue());
        	model.addObject("successRelStatus", InterfaceEnum.SUCCESS_REL_STATUS.getValue());
        	model.setViewName("externalplatform/record/queryExtInterfaceLogStatus");
        }else if("toQueryNum".equals(operate)){//跳转至 接口访问统计页面
        	model.addObject("successCode", InterfaceEnum.SUCCESS_CODE.getValue());
        	model.addObject("failCode", InterfaceEnum.FAIL_CODE.getValue());
        	model.addObject("successRelCode", InterfaceEnum.SUCCESS_REL_CODE.getValue());
        	model.setViewName("externalplatform/record/queryExtInterfaceNumLog");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/record/viewExtInterfaceLog");
        }
        
        return model;
    }
    
    /**
     * @author Administrator
     * @description:查询分页列表
     * @date 2017-05-25 11:08:58
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtInterfaceLog")
    @ResponseBody
    public DataMsg queryListExtInterfaceLog(Date reqTime_start,Date reqTime_end,HttpServletRequest request, ExtInterfaceLogDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
    	
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	if(null!=reqTime_start){
    		dto.setReqStartTime(new java.sql.Timestamp(reqTime_start.getTime()));
    	}
    	if(null!=reqTime_end){
    		dto.setReqEndTime(new java.sql.Timestamp(reqTime_end.getTime()));
    	}
    	if(StringUtils.isNotEmpty(dto.getReqOrgCode())){
    		dto.setReqOrgCode(dto.getReqOrgCode().replace("LOAN", ""));
    	}
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtInterfaceLogDTO> list = service.searchExtInterfaceLogByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    /**
     * @author Administrator
     * @description:通过主键查询 其明细信息
     * @date 2017-05-25 11:08:58
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	ExtInterfaceLogDTO dto = service.queryExtInterfaceLogByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
    /**
     * @author Administrator
     * @description:当日接口访问情况统计
     * @date 2017-05-25 11:08:58
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryExtInterfaceLogNum")
    @ResponseBody
    public DataMsg queryExtInterfaceLogNum(Date reqTime_start,Date reqTime_end,HttpServletRequest request, ExtInterfaceLogDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
    	
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	if(null!=reqTime_start){
    		dto.setReqStartTime(new java.sql.Timestamp(reqTime_start.getTime()));
    	}
    	if(null!=reqTime_end){
    		dto.setReqEndTime(new java.sql.Timestamp(reqTime_end.getTime()));
    	}
    	if(StringUtils.isNotEmpty(dto.getReqOrgCode())){
    		dto.setReqOrgCode(dto.getReqOrgCode().replace("LOAN", ""));
    	}
    	searchParams.put("dto", dto);
		
        List<ExtInterfaceLogDTO> list = service.queryExtInterfaceLogNum(searchParams);
        
        dataMsg.setData(list);
        if(CollectionUtils.isNotEmpty(list)){
   			dataMsg.setData(list);
   		}
        return dataMsg;
    }
    
    /**
     * @author Administrator
     * @description:当日接口质量分析
     * @date 2017-05-25 11:08:58
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryExtInterfaceLogStatus")
    @ResponseBody
    public DataMsg queryExtInterfaceLogStatus(Date reqTime_start,Date reqTime_end,HttpServletRequest request, ExtInterfaceLogDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
    	
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	if(null!=reqTime_start){
    		dto.setReqStartTime(new java.sql.Timestamp(reqTime_start.getTime()));
    	}
    	if(null!=reqTime_end){
    		dto.setReqEndTime(new java.sql.Timestamp(reqTime_end.getTime()));
    	}
    	if(StringUtils.isNotEmpty(dto.getReqOrgCode())){
    		dto.setReqOrgCode(dto.getReqOrgCode().replace("LOAN", ""));
    	}
    	searchParams.put("dto", dto);
		
        List<ExtInterfaceLogDTO> list = service.queryExtInterfaceLogStatus(searchParams);
        
        dataMsg.setData(list);
        if(CollectionUtils.isNotEmpty(list)){
   			dataMsg.setData(list);
   		}
        return dataMsg;
    }
}
