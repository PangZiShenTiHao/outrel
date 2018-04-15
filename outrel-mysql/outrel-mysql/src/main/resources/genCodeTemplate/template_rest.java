package ${codeDTO.restPackageName};

import java.util.List;

import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.fintech.platform.core.message.QueryReqBean;
import com.fintech.platform.core.message.QueryRespBean;
import com.fintech.platform.core.message.ResponseMsg;
import com.fintech.platform.restservice.web.base.BaseRest;

import ${dtoPackageName}.${dtoClassName};
import ${servicePackageName}.${serviceClassName};
/**
 * @classname: ${codeDTO.restClassName}
 * @description:定义 ${table_comment} rest服务
 * @author ${author}
 * @date:2014年10月11日下午2:39:22
 */
@Controller
@Scope("prototype")
@RequestMapping(value = "/api/${jspPrefix?replace("jsp","")}${transTableName}")
public class ${codeDTO.restClassName} extends BaseRest{

	private static Logger logger = LoggerFactory.getLogger(${codeDTO.restClassName}.class);

	@Autowired
    @Qualifier("${servicePackageName}.${serviceClassName}")
    private ${serviceClassName} service;

	@Autowired
	private Validator validator;

	/**
	 * 取得单个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/get/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<${dtoClassName}>> get(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<${dtoClassName}> responseMsg = new ResponseMsg<${dtoClassName}>();
		${dtoClassName} entity = service.query${formated_tab_name}ByPrimaryKey(ID);
		responseMsg.setResponseBody(entity);
		ResponseEntity<ResponseMsg<${dtoClassName}>> responseEntity = new ResponseEntity<ResponseMsg<${dtoClassName}>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	

	/**
	 * 插入一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/create/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> create(@RequestBody ${dtoClassName} obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.insert${formated_tab_name}(obj);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	

	/**
	 * 修改一个业务对象
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/update/v1",method=RequestMethod.POST)
	public ResponseEntity<ResponseMsg<Void>> update(@RequestBody ${dtoClassName} obj) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		BeanValidators.validateWithException(validator, obj);
		service.update${formated_tab_name}(obj);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	/**
	 * 删除一个业务对象
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/delete/v1/{ID}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public ResponseEntity<ResponseMsg<Void>> delete(@PathVariable("ID") String ID) throws Exception{
		ResponseMsg<Void> responseMsg = new ResponseMsg<Void>();
		service.delete${formated_tab_name}ByPrimaryKey(null,ID);
		ResponseEntity<ResponseMsg<Void>> responseEntity=new ResponseEntity<ResponseMsg<Void>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	
	/**
	 * 按条件查询并分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/searchByPage/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<${dtoClassName}>>> searchByPage(@RequestBody QueryReqBean params) throws Exception{
		
		ResponseMsg<QueryRespBean<${dtoClassName}>> responseMsg = new ResponseMsg<QueryRespBean<${dtoClassName}>>();
	
		List<${dtoClassName}> list = service.search${formated_tab_name}ByPaging(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<${dtoClassName}>(params.getPageParameter(),list));
		ResponseEntity<ResponseMsg<QueryRespBean<${dtoClassName}>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<${dtoClassName}>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}
	/**
	 * 按条件查询不分页
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/search/v1", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	@ResponseBody
	public ResponseEntity<ResponseMsg<QueryRespBean<${dtoClassName}>>> search(@RequestBody QueryReqBean params) throws Exception{
		ResponseMsg<QueryRespBean<${dtoClassName}>> responseMsg = new ResponseMsg<QueryRespBean<${dtoClassName}>>();
		List<${dtoClassName}> list = service.search${formated_tab_name}(params.getSearchParams());
		responseMsg.setResponseBody(new QueryRespBean<${dtoClassName}>(params.getPageParameter(),list));
		
		ResponseEntity<ResponseMsg<QueryRespBean<${dtoClassName}>>> responseEntity=new ResponseEntity<ResponseMsg<QueryRespBean<${dtoClassName}>>>(responseMsg, HttpStatus.OK);
		return responseEntity;
	}


}
