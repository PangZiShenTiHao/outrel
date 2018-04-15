package com.jy.modules.externalplatform.application.extinterfaceinfo.controller;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import oracle.sql.BLOB;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
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
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fintech.platform.core.common.BaseDTO;
import com.fintech.platform.core.message.DataMsg;
import com.fintech.platform.core.message.PageParameter;
import com.fintech.platform.core.message.PageUtil;
import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.restservice.exception.AbaboonException;
import com.fintech.platform.restservice.web.base.BaseController;
import com.jy.modules.externalplatform.application.extinterfaceinfo.dto.ExtInterfaceInfoDTO;
import com.jy.modules.externalplatform.application.extinterfaceinfo.service.ExtInterfaceInfoService;
import com.jy.modules.externalplatform.application.extinterfaceparamsref.service.ExtInterfaceParamsRefService;
import com.jy.modules.externalplatform.interfacerest.utils.InterfaceEnum;

/**
 * @classname: ExtInterfaceInfoController
 * @description: 定义  接口配置表 控制层
 * @author:  Administrator
 */
@Controller
@Scope("prototype")
@RequestMapping("/extInterfaceInfo")
public class ExtInterfaceInfoController extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(ExtInterfaceInfoController.class);

    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extinterfaceinfo.service.ExtInterfaceInfoService")
    private ExtInterfaceInfoService service;
    @Autowired
    @Qualifier("com.jy.modules.externalplatform.application.extinterfaceparamsref.service.ExtInterfaceParamsRefService")
    private ExtInterfaceParamsRefService extInterfaceParamsRefService;
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("externalplatform/application/extinterfaceinfo/queryExtInterfaceInfo");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("externalplatform/application/extinterfaceinfo/addExtInterfaceInfo");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extinterfaceinfo/updateExtInterfaceInfo");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extinterfaceinfo/viewExtInterfaceInfo");
        }else if("toViewContent".equals(operate)){
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("externalplatform/application/extinterfaceinfo/viewExtTemplateContent");
        }
        return model;
    }
    
    /**
     * @author Administrator
     * @description:查询分页列表
     * @date 2017-05-11 14:04:25
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryListExtInterfaceInfo")
    @ResponseBody
    public DataMsg queryListExtInterfaceInfo(HttpServletRequest request, ExtInterfaceInfoDTO dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<ExtInterfaceInfoDTO> list = service.searchExtInterfaceInfoByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author Administrator
     * @description:新增
     * @date 2017-05-11 14:04:25
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insertExtInterfaceInfo")
    @ResponseBody
    public DataMsg insertExtInterfaceInfo(HttpServletRequest request, ExtInterfaceInfoDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	Object templateContent = dto.getTemplateContent();
        	InputStream  fileIn = null;
            CommonsMultipartFile commonsMultipartFile=null;
        	if(dto.getTemplateContent()!=null && templateContent instanceof CommonsMultipartFile){//判断是否有文件根据Spring上传组件实现文件内容读取
        		commonsMultipartFile = (CommonsMultipartFile)dto.getTemplateContent();
        		fileIn = commonsMultipartFile.getInputStream();
        	}
        	dto = (ExtInterfaceInfoDTO)super.initDto(dto);

            service.insertExtInterfaceInfo(dto,fileIn,commonsMultipartFile);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insertExtInterfaceInfo异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:编辑
     * @date 2017-05-11 14:04:25
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/updateExtInterfaceInfo")
    @ResponseBody
    public DataMsg updateExtInterfaceInfo(HttpServletRequest request, ExtInterfaceInfoDTO dto, @ModelAttribute DataMsg dataMsg){
        try {
        	Object templateContent = dto.getTemplateContent();
        	InputStream  fileIn = null;
        	if(dto.getTemplateContent()!=null && templateContent instanceof CommonsMultipartFile){
        		CommonsMultipartFile commonsMultipartFile = (CommonsMultipartFile)dto.getTemplateContent();
        		fileIn = commonsMultipartFile.getInputStream();
        	}
        	dto = (ExtInterfaceInfoDTO)super.initDto(dto);
            service.updateExtInterfaceInfo(dto,fileIn);
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法updateExtInterfaceInfo异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author Administrator
     * @description:删除
     * @date 2017-05-11 14:04:25
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/deleteExtInterfaceInfo")
    @ResponseBody
    public DataMsg deleteExtInterfaceInfo(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	String interfaceNo = (String) this.getParameter("interfaceNo");
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.deleteExtInterfaceInfoByID(dto,ids);
			 extInterfaceParamsRefService.deleteExtInterfaceParamsRefByInterfaceNo(interfaceNo);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法deleteExtInterfaceInfo异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author Administrator
     * @description:通过主键查询 其明细信息
     * @date 2017-05-11 14:04:25
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        InputStream  ins  =null;
        try{
        	ExtInterfaceInfoDTO dto = service.queryExtInterfaceInfoByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
            model.addObject("templateContent",dto.getTemplateContent());
            Object object = dto.getTemplateContent();
            String interfaceParamsType = dto.getInterfaceParamsType();   
            
            if(object!=null && object instanceof Blob){
            	BLOB content = (BLOB)object;  
            	ins = content.getBinaryStream();
            	int i = -1;
            	while ((i= ins.read()) != -1) {
            		baos.write(i);
            	}
            	String contentStr = baos.toString();
            	if(InterfaceEnum.XML.getKey().equals(interfaceParamsType)){
            		contentStr = StringUtils.replace(contentStr, System.getProperty("line.separator"), "");//处理页面换行问题
            	}else if(InterfaceEnum.JSON.getKey().equals(interfaceParamsType)){
            		contentStr = StringUtils.replace(contentStr, System.getProperty("line.separator"), "<br/>");//处理页面换行问题
            	}
            	model.addObject("templateContent",contentStr);
            }
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
	public DataMsg checkUnique(HttpServletRequest request,ExtInterfaceInfoDTO dto,@ModelAttribute DataMsg dataMsg) {
		try {
			Map<String, Object> searchParams = new HashMap<String, Object>();
			searchParams.put("dto", dto);
			List<ExtInterfaceInfoDTO> resultList = service.searchExtInterfaceInfo(searchParams);
			if (CollectionUtils.isNotEmpty(resultList)) {
				dataMsg.failed("数据唯一校验失败！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			dataMsg.failed(e.getMessage());
		}
		return dataMsg;
	}
}
