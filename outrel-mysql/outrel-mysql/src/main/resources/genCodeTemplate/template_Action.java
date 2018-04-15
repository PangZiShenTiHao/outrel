package ${codeDTO.actionPackageName};

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

import ${dtoPackageName}.${dtoClassName};
import ${servicePackageName}.${serviceClassName};

/**
 * @classname: ${codeDTO.actionClassName}
 * @description: 定义  ${table_comment} 控制层
 * @author:  ${author}
 */
@Controller
@Scope("prototype")
@RequestMapping("/${transTableName}")
public class ${codeDTO.actionClassName} extends BaseController{
    private static final Logger logger =  LoggerFactory.getLogger(${codeDTO.actionClassName}.class);

    @Autowired
    @Qualifier("${servicePackageName}.${serviceClassName}")
    private ${serviceClassName} service;
    
    /**
     * 通过 Controller 请求 跳转 进入至相关 页面
     */
    @RequestMapping(value = "/prepareExecute/{operate}")
    public ModelAndView execute(@PathVariable("operate") String operate) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        
        if("toQueryPage".equals(operate)){//跳转至 查询页面
        	model.setViewName("${jspPrefix}${transTableName?lower_case}/query${formated_tab_name}");
        }else if("toAdd".equals(operate)){ //跳转至 新增页面
        	model.setViewName("${jspPrefix}${transTableName?lower_case}/add${formated_tab_name}");
        }else if("toUpdate".equals(operate)){//跳转至 修改页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("${jspPrefix}${transTableName?lower_case}/update${formated_tab_name}");
        }else if("toView".equals(operate)){//跳转至 查看页面
        	String id = this.getParameterString("id");
        	model = this.queryOneDTO(id);
        	model.setViewName("${jspPrefix}${transTableName?lower_case}/view${formated_tab_name}");
        }
        
        return model;
    }
    
    /**
     * @author ${author}
     * @description:查询分页列表
     * @date ${curtDate}
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryList${formated_tab_name}")
    @ResponseBody
    public DataMsg queryList${formated_tab_name}(HttpServletRequest request, ${dtoClassName} dto, @ModelAttribute DataMsg dataMsg) throws Exception {
        
    	Map<String, Object> searchParams = new HashMap<String, Object>();
    	searchParams.put("dto", dto);
        QueryReqBean params = new QueryReqBean();
        params.setSearchParams(searchParams);
    	PageParameter pageInfo = PageUtil.toPageParameter(dataMsg);
		params.setPageParameter(pageInfo);
		
        List<${dtoClassName}> list = service.search${formated_tab_name}ByPaging(params.getSearchParams());
        
        dataMsg.setData(list);
        dataMsg.setTotalRows(pageInfo.getTotalCount());
        return dataMsg;
    }
    

    /**
     * @author ${author}
     * @description:新增
     * @date ${curtDate}
     * @param request
     * @param dto
     * @param dataMsg
     * @return
     * @throws
     */
    @RequestMapping(value = "/insert${formated_tab_name}")
    @ResponseBody
    public DataMsg insert${formated_tab_name}(HttpServletRequest request, ${dtoClassName} dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (${dtoClassName})super.initDto(dto);

            service.insert${formated_tab_name}(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("新增成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
        	logger.error("执行方法insert${formated_tab_name}异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author ${author}
     * @description:编辑
     * @date ${curtDate}
     * @param request
     * @param dto
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/update${formated_tab_name}")
    @ResponseBody
    public DataMsg update${formated_tab_name}(HttpServletRequest request, ${dtoClassName} dto, @ModelAttribute DataMsg dataMsg){
        try {
        	dto = (${dtoClassName})super.initDto(dto);
           
            service.update${formated_tab_name}(dto);
            
            dataMsg = super.initDataMsg(dataMsg);
            dataMsg.setMsg("修改成功");
            dataMsg.setData(this.makeJSONData(dto.getId()));
        }catch (Exception e) {
        	dataMsg.failed(e.getMessage());
            logger.error("执行方法update${formated_tab_name}异常：", e);
        }
        return dataMsg;
    }

    /**
     * @author ${author}
     * @description:删除
     * @date ${curtDate}
     * @param request
     * @param pageData
     * @return
     * @throws
     */
    @RequestMapping(value = "/delete${formated_tab_name}")
    @ResponseBody
    public DataMsg delete${formated_tab_name}(HttpServletRequest request, @ModelAttribute DataMsg dataMsg){
    	
    	BaseDTO dto = super.initDto(null);
   	 	String ids = (String) this.getParameter("ids");//格式: 1,2,3
   	 	dataMsg = super.initDataMsg(dataMsg);
		try {
			 service.delete${formated_tab_name}ByPrimaryKey(dto,ids);
			 dataMsg.setMsg("删除成功");
		} catch (Exception e) {
			dataMsg.failed(e.getMessage());
			logger.error("执行方法delete${formated_tab_name}异常：", e);

		}
        
        return dataMsg;
    }
    /**
     * @author ${author}
     * @description:通过主键查询 其明细信息
     * @date ${curtDate}
     * @param id
     * @return
     */
    private ModelAndView queryOneDTO(String id) throws AbaboonException {
        ModelAndView model = new ModelAndView();
        try{
        	${dtoClassName} dto = service.query${formated_tab_name}ByPrimaryKey(id);
            //将信息放入 model 以便于传至页面 使用
            model.addObject("dto", dto);
        }catch(Exception e){
        	throw new AbaboonException("执行queryOneDTO异常：",e);
        }
        return model;
    }
}
