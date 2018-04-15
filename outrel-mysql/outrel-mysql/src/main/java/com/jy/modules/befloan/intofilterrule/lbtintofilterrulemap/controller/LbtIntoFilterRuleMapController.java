package com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.controller;

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
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.dto.LbtIntoFilterRuleMapDTO;
import com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.service.LbtIntoFilterRuleMapService;

/**
 * @classname: LbtIntoFilterRuleMapController
 * @description: 定义  进件筛选规则-映射表 控制层
 * @author:  JY-IT-D001
 */
@Controller
@Scope("prototype")
@RequestMapping("/lbtIntoFilterRuleMap")
public class LbtIntoFilterRuleMapController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(LbtIntoFilterRuleMapController.class);

    @Autowired
    @Qualifier("com.jy.modules.befloan.intofilterrule.lbtintofilterrulemap.service.LbtIntoFilterRuleMapService")
    private LbtIntoFilterRuleMapService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("befloan/intofilterrule/lbtintofilterrulemap/queryLbtIntoFilterRuleMap");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("befloan/intofilterrule/lbtintofilterrulemap/addLbtIntoFilterRuleMap");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("befloan/intofilterrule/lbtintofilterrulemap/updateLbtIntoFilterRuleMap");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("befloan/intofilterrule/lbtintofilterrulemap/viewLbtIntoFilterRuleMap");
        }
        
        return model;
    }
    
    /**
     * @author JY-IT-D001
     * @description:查询分页列表
     * @date 2016-01-07 11:21:19
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListLbtIntoFilterRuleMap")
    @ResponseBody
    public DataMsg queryListLbtIntoFilterRuleMap(HttpServletRequest request, LbtIntoFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<LbtIntoFilterRuleMapDTO> list = service.searchLbtIntoFilterRuleMapByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author JY-IT-D001
     * @description:新增
     * @date 2016-01-07 11:21:19
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertLbtIntoFilterRuleMap")
    @ResponseBody
    public DataMsg insertLbtIntoFilterRuleMap(HttpServletRequest request, LbtIntoFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (LbtIntoFilterRuleMapDTO)super.initDto(dto);

            service.insertLbtIntoFilterRuleMap(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertLbtIntoFilterRuleMap异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author JY-IT-D001
     * @description:编辑
     * @date 2016-01-07 11:21:19
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateLbtIntoFilterRuleMap")
    @ResponseBody
    public DataMsg updateLbtIntoFilterRuleMap(HttpServletRequest request, LbtIntoFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (LbtIntoFilterRuleMapDTO)super.initDto(dto);
           
            service.updateLbtIntoFilterRuleMap(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateLbtIntoFilterRuleMap异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author JY-IT-D001
     * @description:删除
     * @date 2016-01-07 11:21:19
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteLbtIntoFilterRuleMap")
    @ResponseBody
    public DataMsg deleteLbtIntoFilterRuleMap(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteLbtIntoFilterRuleMapByPrimaryKey(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteLbtIntoFilterRuleMap异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author JY-IT-D001
     * @description:通过主键查询 其明细信息
     * @date 2016-01-07 11:21:19
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	LbtIntoFilterRuleMapDTO dto = service.queryLbtIntoFilterRuleMapByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
    
    @RequestMapping(value = "/queryOrgListByRuleId")
    @ResponseBody
    public DataMsg queryOrgListByRuleId(HttpServletRequest request, LbtIntoFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        List<LbtIntoFilterRuleMapDTO> list = service.queryOrgListByRuleId(dto.getRuleId());
        
        dataMsg.setData(list);
        return dataMsg;
    }
    
    @RequestMapping(value = "/queryJobAddrListByRuleId")
    @ResponseBody
    public DataMsg queryJobAddrListByRuleId(HttpServletRequest request, LbtIntoFilterRuleMapDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        List<LbtIntoFilterRuleMapDTO> list = service.queryJobAddrListByRuleId(dto.getRuleId());
        
        dataMsg.setData(list);
        return dataMsg;
    }
}
