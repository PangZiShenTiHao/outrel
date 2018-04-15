package com.jy.modules.befloan.interfacelog.lbttransferlog.controller;

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

import com.fintech.platform.core.message.DataMsg;
import com.fintech.platform.core.message.PageParameter;
import com.fintech.platform.core.message.PageUtil;
import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.restservice.exception.AbaboonException;
import com.fintech.platform.restservice.web.base.BaseController;
import com.jy.modules.befloan.interfacelog.lbttransferlog.dto.LbTTransferLogDTO;
import com.jy.modules.befloan.interfacelog.lbttransferlog.service.LbTTransferLogService;
import com.jy.modules.common.MyBatisPageInfoExt;

/**
 * @classname: LbTTransferLogController
 * @description: 定义  调用接口日志表 控制层
 * @author:  chengang
 */
@Controller
@Scope("prototype")
@RequestMapping("/lbTTransferLog")
public class LbTTransferLogController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(LbTTransferLogController.class);

    @Autowired
    @Qualifier("com.jy.modules.befloan.interfacelog.lbttransferlog.service.LbTTransferLogService")
    private LbTTransferLogService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("befloan/intfaceloglbttransferlog/queryLbTTransferLog");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("befloan/intfaceloglbttransferlog/viewLbTTransferLog");
        }
        
        return model;
    }
    
    /**
     * @author chengang
     * @description:查询分页列表
     * @date 2015-04-11 14:20:49
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListLbTTransferLog")
    @ResponseBody
    public DataMsg queryListLbTTransferLog(HttpServletRequest request, LbTTransferLogDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
    	String startTime = this.getParameterString("time_start");
    	String endTime = this.getParameterString("time_end");
    	searchParams.put("startTime", startTime);
    	searchParams.put("endTime", endTime);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<LbTTransferLogDTO> list = service.searchLbTTransferLogByPaging(params.getSearchParams());
        
        int totalNum = MyBatisPageInfoExt.getTotalCountOfListByPage(list);
        dataMsg.setData(list);
        dataMsg.setTotalRows(totalNum);
        return dataMsg;
    }

    /**
     * @author chengang
     * @description:删除
     * @date 2015-04-11 14:20:49
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteLbTTransferLog")
    @ResponseBody
    public DataMsg deleteLbTTransferLog(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.truncateTableBySql();
			 dataMsg.setMsg("清空接口日志表成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteSysResource异常：", e);
		}
        
        return dataMsg;
    }
    /**
     * @author chengang
     * @description:通过主键查询 其明细信息
     * @date 2015-04-11 14:20:49
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	LbTTransferLogDTO dto = service.queryLbTTransferLogByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
}
