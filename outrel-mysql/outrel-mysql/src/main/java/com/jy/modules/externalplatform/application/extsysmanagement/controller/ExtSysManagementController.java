package com.jy.modules.externalplatform.application.extsysmanagement.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
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
import com.jy.modules.externalplatform.application.extsysmanagement.dto.ExtSysManagementDTO;
import com.jy.modules.externalplatform.application.extsysmanagement.service.ExtSysManagementService;

/**
 * @classname: ExtSysManagementController
 * @description: 定义  外联平台系统管理表 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extSysManagement")
public class ExtSysManagementController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtSysManagementController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extsysmanagement.service.ExtSysManagementService")
    private ExtSysManagementService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/application/extsysmanagement/queryExtSysManagement");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("externalplatform/application/extsysmanagement/addExtSysManagement");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extsysmanagement/updateExtSysManagement");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extsysmanagement/viewExtSysManagement");
        } else if ("extSysManageIndex".equals(operate)){
			model.setViewName("externalplatform/application/extsysmanagement/extSysManagementIndex");
		}
        
        return model;
    }
    
    /**
     * @author dell
     * @description:查询分页列表
     * @date 2017-04-06 13:10:18
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtSysManagement")
    @ResponseBody
    public DataMsg queryListExtSysManagement(HttpServletRequest request, ExtSysManagementDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtSysManagementDTO> list = service.searchExtSysManagementByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

	@RequestMapping(value = "/queryTreeExtSysManagement")
	@ResponseBody
	public List<Map<String, String>> queryTreeExtSysManagement(HttpServletRequest request, ExtSysManagementDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
		Map<String, Object> searchParams = new HashMap<String, Object>();
		searchParams.put("dto", dto);
		List<ExtSysManagementDTO> list = service.searchExtSysManagement(searchParams);
		return treeData(list);
	}
	
	/**Description: 转换成树节点集合
	 * Create Date: 2014年11月07日
	 * Author     : 豆永亮
	 * @param data
	 * @return
	 */
	private List<Map<String, String>> treeData(List<ExtSysManagementDTO> data) {
		List<Map<String, String>> maps = new ArrayList<Map<String, String>>();
		if(data!=null && data.size()>0){
			for(ExtSysManagementDTO dto: data){
				Map<String, String>  map = new HashMap<String, String>();
				map.put("ID", dto.getSysCode());
				map.put("NAME",dto.getSysName() );
				map.put("PID", "0");
				maps.add(map);
			}
			return maps;
		}else{
			Map<String, String>  map = new HashMap<String, String>();
			map.put("ID", "0");
			map.put("NAME","0");
			map.put("PID", "0");
			maps.add(map);
			return maps;
		}
	}

    
    
    

    /**
     * @author dell
     * @description:新增
     * @date 2017-04-06 13:10:18
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtSysManagement")
    @ResponseBody
    public DataMsg insertExtSysManagement(HttpServletRequest request, ExtSysManagementDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtSysManagementDTO)super.initDto(dto);

            service.insertExtSysManagement(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtSysManagement异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:编辑
     * @date 2017-04-06 13:10:18
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtSysManagement")
    @ResponseBody
    public DataMsg updateExtSysManagement(HttpServletRequest request, ExtSysManagementDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtSysManagementDTO)super.initDto(dto);
           
            service.updateExtSysManagement(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtSysManagement异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:删除
     * @date 2017-04-06 13:10:18
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtSysManagement")
    @ResponseBody
    public DataMsg deleteExtSysManagement(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtSysManagementByID(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtSysManagement异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author dell
     * @description:通过主键查询 其明细信息
     * @date 2017-04-06 13:10:18
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	ExtSysManagementDTO dto = service.queryExtSysManagementByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
    /**
	 * 系统编号唯一校验
	 * 
	 * @param request
	 * @param dataMsg
	 * @return
	 */
	@RequestMapping(value = "/checkUnique")
	@ResponseBody
	public DataMsg checkUnique(HttpServletRequest request,ExtSysManagementDTO dto,@ModelAttribute DataMsg dataMsg) {
		try {
			Map<String, Object> searchParams = new HashMap<String, Object>();
			searchParams.put("dto", dto);
			List<ExtSysManagementDTO> resultList = service.searchExtSysManagement(searchParams);
			if (CollectionUtils.isNotEmpty(resultList)) {
				dataMsg.failed("数据唯一校验失败！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			dataMsg.failed(e.getMessage());
		}
		return dataMsg;
	}
    /**
   	 * 下拉框：查询系统类型
   	 * @param dataMsg
   	 * @param moduleTypeCode
   	 * @return
   	 * @throws Exception
   	 */
   	@RequestMapping(value = "/queryExtSysManagementList")
   	@ResponseBody
   	public DataMsg queryExtSysManagementList(@ModelAttribute DataMsg dataMsg) throws Exception{
   		List<ExtSysManagementDTO> list=new ArrayList<ExtSysManagementDTO>();
   		list = service.searchExtValidSysManagement();
   		dataMsg.setData(list);
   		return dataMsg;
   	} 
}
