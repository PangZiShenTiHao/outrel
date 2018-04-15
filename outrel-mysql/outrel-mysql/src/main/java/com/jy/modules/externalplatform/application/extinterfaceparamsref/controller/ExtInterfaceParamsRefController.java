package com.jy.modules.externalplatform.application.extinterfaceparamsref.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import com.jy.modules.externalplatform.application.extinterfaceparamsref.dto.ExtInterfaceParamsRefDTO;
import com.jy.modules.externalplatform.application.extinterfaceparamsref.service.ExtInterfaceParamsRefService;

/**
 * @classname: ExtInterfaceParamsRefController
 * @description: 定义  接口参数映射表 控制层
 * @author:  Administrator
 */
@Controller
@Scope("prototype")
@RequestMapping("/extInterfaceParamsRef")
public class ExtInterfaceParamsRefController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtInterfaceParamsRefController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extinterfaceparamsref.service.ExtInterfaceParamsRefService")
    private ExtInterfaceParamsRefService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        String interfaceNo = this.getParameterString("interfaceNo");
		if (interfaceNo != null && interfaceNo.length() > 0){
			model.addObject("interfaceNo", interfaceNo);
		}
		String parentParams = this.getParameterString("parentParams");
		if (parentParams != null && parentParams.length() > 0){
			model.addObject("parentParams", parentParams);
		}
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/application/extinterfaceparamsref/queryExtInterfaceParamsRef");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("externalplatform/application/extinterfaceparamsref/addExtInterfaceParamsRef");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id,model);
        	model.setViewName("externalplatform/application/extinterfaceparamsref/updateExtInterfaceParamsRef");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id,model);
        	model.setViewName("externalplatform/application/extinterfaceparamsref/viewExtInterfaceParamsRef");
        }else if("interfaceParamsMain".equals(operate)){ //跳转至 主页面
        	model.setViewName("externalplatform/application/extinterfaceparamsref/interfaceParamsMain");
        }
        
        return model;
    }
    
    /**
     * @author Administrator
     * @description:查询分页列表
     * @date 2017-05-16 15:10:22
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtInterfaceParamsRef")
    @ResponseBody
    public DataMsg queryListExtInterfaceParamsRef(HttpServletRequest request, ExtInterfaceParamsRefDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	String interfaceNo = this.getParameterString("interfaceNo");
		if (interfaceNo != null && interfaceNo.length() > 0){
			dto.setInterfaceNo(interfaceNo);
		}
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtInterfaceParamsRefDTO> list = service.searchExtInterfaceParamsRefByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author Administrator
     * @description:新增
     * @date 2017-05-16 15:10:22
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtInterfaceParamsRef")
    @ResponseBody
    public DataMsg insertExtInterfaceParamsRef(HttpServletRequest request, ExtInterfaceParamsRefDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtInterfaceParamsRefDTO)super.initDto(dto);

            service.insertExtInterfaceParamsRef(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtInterfaceParamsRef异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:编辑
     * @date 2017-05-16 15:10:22
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtInterfaceParamsRef")
    @ResponseBody
    public DataMsg updateExtInterfaceParamsRef(HttpServletRequest request, ExtInterfaceParamsRefDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtInterfaceParamsRefDTO)super.initDto(dto);
           
            service.updateExtInterfaceParamsRef(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtInterfaceParamsRef异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:删除
     * @date 2017-05-16 15:10:22
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtInterfaceParamsRef")
    @ResponseBody
    public DataMsg deleteExtInterfaceParamsRef(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtInterfaceParamsRefByID(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtInterfaceParamsRef异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author Administrator
     * @description:通过主键查询 其明细信息
     * @date 2017-05-16 15:10:22
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id,ModelAndView model) throws AbaboonException {
        try{
        	ExtInterfaceParamsRefDTO dto = service.queryExtInterfaceParamsRefByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
}
