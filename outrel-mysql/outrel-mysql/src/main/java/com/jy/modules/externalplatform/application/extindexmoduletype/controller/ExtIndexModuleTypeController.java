package com.jy.modules.externalplatform.application.extindexmoduletype.controller;

import java.util.ArrayList;
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
import com.jy.modules.externalplatform.application.extindexmoduletype.dto.ExtIndexModuleTypeDTO;
import com.jy.modules.externalplatform.application.extindexmoduletype.service.ExtIndexModuleTypeService;

/**
 * @classname: ExtIndexModuleTypeController
 * @description: 定义  指标模型 控制层
 * @author:  dell
 */
@Controller
@Scope("prototype")
@RequestMapping("/extIndexModuleType")
public class ExtIndexModuleTypeController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtIndexModuleTypeController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extindexmoduletype.service.ExtIndexModuleTypeService")
    private ExtIndexModuleTypeService service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/application/extindexmoduletype/treeExtIndexModuleType");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	String id = this.getParameterString("pid");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extindexmoduletype/addExtIndexModuleType");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extindexmoduletype/updateExtIndexModuleType");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extindexmoduletype/viewExtIndexModuleType");
        }
        
        return model;
    }
    
    /**
     * @author dell
     * @description:查询分页列表
     * @date 2017-05-17 09:55:44
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtIndexModuleType")
    @ResponseBody
    public DataMsg queryListExtIndexModuleType(HttpServletRequest request, ExtIndexModuleTypeDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtIndexModuleTypeDTO> list = service.searchExtIndexModuleTypeByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    
	/**
	 * @description:查询指标模型类型表
	 * @param request
	 * @param dto
	 * @param dataMsg
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/queryTreeExtIndexModuleType")
	@ResponseBody
	public List<Map<String, String>> queryTreeExtIndexModuleType(HttpServletRequest request, @ModelAttribute DataMsg dataMsg) throws Exception {
		List<ExtIndexModuleTypeDTO> list = service.searchLbtAntiModuleTypeAllList();
		return treeData(list);
	}
	
	/**Description: 转换成树节点集合
	 * @param data
	 * @return
	 * @throws Exception 
	 */
	private List<Map<String, String>> treeData(List<ExtIndexModuleTypeDTO> data) throws Exception {
		List<Map<String, String>> maps = new ArrayList<Map<String, String>>();
		Map<String, String>  initMap = new HashMap<String, String>();
		initMap.put("ID", "0");
		initMap.put("NAME","指标模型");
		initMap.put("PID", "-1");
		initMap.put("CODE","ROOT");
		initMap.put("checked", "");
		initMap.put("level", "0");//初始化层级默认为0
		maps.add(initMap);
		if(data!=null && data.size()>0){
			for(ExtIndexModuleTypeDTO moduleType: data){
				Map<String, String>  map = new HashMap<String, String>();
				map.put("ID", moduleType.getId().toString());
				map.put("NAME", moduleType.getModuleTypeName());
				map.put("LEVEL", String.valueOf(moduleType.getTypeLevel()));//层级
				map.put("CODE", moduleType.getModuleTypeCode());
				String parentId = String.valueOf(moduleType.getParentId());
				ExtIndexModuleTypeDTO extIndexModuleTypeDTO = service.queryExtIndexModuleTypeByPrimaryKey(parentId);
				String pCode = extIndexModuleTypeDTO.getModuleTypeCode();
				String pName = extIndexModuleTypeDTO.getModuleTypeName();
				map.put("PID", parentId);
				map.put("PCODE",pCode);
				map.put("PNAME",pName);
				maps.add(map);
			}
		}
		return maps;
	}
	
	/**Description: 转换成树节点
	 * Modify Date: <br/>
	 * Modify By  : <br/>
	 * @param data
	 * @return
	 */
	private Map<String, String> treeNode(ExtIndexModuleTypeDTO dto){
		Map<String, String>  map = new HashMap<String, String>();
		map.put("ID", dto.getId().toString());
		map.put("NAME", dto.getModuleTypeName());
		map.put("PID", dto.getParentId().toString());
		map.put("validateState", dto.getValidateState());
		return map;
	}

    /**
     * @author dell
     * @description:新增
     * @date 2017-05-17 09:55:44
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtIndexModuleType")
    @ResponseBody
    public DataMsg insertExtIndexModuleType(HttpServletRequest request, ExtIndexModuleTypeDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtIndexModuleTypeDTO)super.initDto(dto);

            Long keyId = service.insertExtIndexModuleType(dto);
            dataMsg = super.initDataMsg(dataMsg);
            if(keyId > 0) {
				dataMsg.setMsg("新增成功");
				dataMsg.setData(treeNode(dto));
			} else {
				dataMsg.setMsg("新增失败");
			}
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtIndexModuleType异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:编辑
     * @date 2017-05-17 09:55:44
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtIndexModuleType")
    @ResponseBody
    public DataMsg updateExtIndexModuleType(HttpServletRequest request, ExtIndexModuleTypeDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (ExtIndexModuleTypeDTO)super.initDto(dto);
           
            service.updateExtIndexModuleType(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(treeNode(dto));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtIndexModuleType异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author dell
     * @description:删除
     * @date 2017-05-17 09:55:44
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtIndexModuleType")
    @ResponseBody
    public DataMsg deleteExtIndexModuleType(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtIndexModuleTypeByPrimaryKey(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtIndexModuleType异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author dell
     * @description:通过主键查询 其明细信息
     * @date 2017-05-17 09:55:44
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	ExtIndexModuleTypeDTO dto = service.queryExtIndexModuleTypeByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	logger.error("执行方法queryOneDTO异常：", e);
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
}
