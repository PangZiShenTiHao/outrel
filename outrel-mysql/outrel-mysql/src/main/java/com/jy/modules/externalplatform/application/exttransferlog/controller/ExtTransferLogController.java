package com.jy.modules.externalplatform.application.exttransferlog.controller;

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
import com.jy.modules.externalplatform.application.exttransferlog.dto.ExtTransferLogDTO;
import com.jy.modules.externalplatform.application.exttransferlog.service.ExtTransferLogService;

/**
 * @classname: ExtTransferLogController
 * @description: 定义  EXT_TRANSFER_LOG 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extTransferLog")
public class ExtTransferLogController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtTransferLogController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.exttransferlog.service.ExtTransferLogService")
    private ExtTransferLogService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("platform/exttransferlog/queryExtTransferLog");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("platform/exttransferlog/addExtTransferLog");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("platform/exttransferlog/updateExtTransferLog");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("platform/exttransferlog/viewExtTransferLog");
        }
        
        return model;
    }
    
    /**
     * @author dell
     * @description:查询分页列表
     * @date 2016-02-23 15:22:21
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtTransferLog")
    @ResponseBody
    public DataMsg queryListExtTransferLog(HttpServletRequest request, ExtTransferLogDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtTransferLogDTO> list = service.searchExtTransferLogByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author dell
     * @description:新增
     * @date 2016-02-23 15:22:21
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtTransferLog")
    @ResponseBody
    public DataMsg insertExtTransferLog(HttpServletRequest request, ExtTransferLogDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtTransferLogDTO)super.initDto(dto);

            service.insertExtTransferLog(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtTransferLog异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:编辑
     * @date 2016-02-23 15:22:21
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtTransferLog")
    @ResponseBody
    public DataMsg updateExtTransferLog(HttpServletRequest request, ExtTransferLogDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtTransferLogDTO)super.initDto(dto);
           
            service.updateExtTransferLog(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtTransferLog异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:删除
     * @date 2016-02-23 15:22:21
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtTransferLog")
    @ResponseBody
    public DataMsg deleteExtTransferLog(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtTransferLogByPrimaryKey(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtTransferLog异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author dell
     * @description:通过主键查询 其明细信息
     * @date 2016-02-23 15:22:21
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	ExtTransferLogDTO dto = service.queryExtTransferLogByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
}
