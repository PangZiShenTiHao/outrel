package ${providerPackageName};

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.longtech.xweb.model.CollectionListData;
import com.longtech.xweb.model.ListData;
import com.longtech.xweb.model.ListDataProvider;
import com.platform.common.util.LoggerUtil;
import com.platform.ibatis.dto.PageBean;
import ${dtoPackageName}.${dtoClassName};
import ${iServicePackageName}.${iServiceClassName};
import com.platform.util.ConstantBeanId;
/**
 * @Description: 定义${table_comment}provider
 * @author ${author}
 * @version 1.0, 
 * @date ${curtDate}
 *
 */
public class ${providerClassName} implements ListDataProvider{
	//获取 业务逻辑层 对象
	private ${iServiceClassName} service;
	
	//通过前台 传过来的值可以判断调用provider中的 对应的方法
	private String operateOfProvider;
	
	private ${dtoClassName}	dto;
	
	public ListData doFetch(int index, int count) {
		//通过spring获取业务层实例
		ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(dto.getHttpRequest().getSession().getServletContext());
		service = (${iServiceClassName}) context.getBean("${servicePackageName}.${serviceClassName}");
		
		//计算某个方法耗时时间 方法开始前
		LoggerUtil.logCurrentTime(operateOfProvider,true,getClass());
		
		
		CollectionListData listData = null;
		if("queryByPage".equals(operateOfProvider)){
			listData = (CollectionListData) query${formated_tab_name}ByPage(index, count);
		}else if("queryOneDTOById".equals(operateOfProvider)){
			listData = (CollectionListData) queryOneDTOById(index, count);
		}
		
		//计算某个方法耗时时间 方法执行完后
		LoggerUtil.logCurrentTime(operateOfProvider,false,getClass());
		
		return listData;
	}
	/**
	 * 通过 id 查询 一个实体。
	 * 用来修改
	 * @param index
	 * @param count
	 * @return
	 */
	@SuppressWarnings("all")
	private CollectionListData queryOneDTOById(int index, int count) {
		List list = null;
		try {
			Map paramMap = new HashMap();
			paramMap.put("dto", dto);
			//RoleDTO rleDTO = roleService.queryOneRole(paramMap);
			list = service.queryListOf${formated_tab_name}(paramMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new CollectionListData(list);
	}
	/**
	 * 使用分页查询 ${table_comment}列表
	 * 
	 * @param index
	 * @param count
	 * @return
	 */
	@SuppressWarnings("all")
	private ListData query${formated_tab_name}ByPage(int index, int count){

		List list = null;
		int totalCount = 0;
		try {
			
			//创建数据库分页对象
			PageBean page = new PageBean(index,count);
			Map paramMap = new HashMap();
			paramMap.put("pager", page);
			paramMap.put("dto", dto);
			
			list = service.queryListOf${formated_tab_name}ByPage(paramMap);
			
			if(list !=null && list.size()>0){
				Map temp = (Map) list.get(0);
				totalCount = Integer.parseInt(String.valueOf((BigDecimal)temp.get("TOTALRECORDNUM")));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new CollectionListData(list,index,totalCount);
	}

	public String getOperateOfProvider() {
		return operateOfProvider;
	}

	public void setOperateOfProvider(String operateOfProvider) {
		this.operateOfProvider = operateOfProvider;
	}

	public ${dtoClassName} getDto() {
		return dto;
	}

	public void setDto(${dtoClassName} dto) {
		this.dto = dto;
	}

	

}
