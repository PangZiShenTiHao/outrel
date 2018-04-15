package ${servicePackageName};
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;

import ${dtoPackageName}.${dtoClassName};
import ${mapperPackageName}.${mapperClassName};

/**
 * @classname: ${serviceClassName}
 * @description: 定义  ${table_comment} 实现类
 * @author:  ${author}
 */
@Service("${servicePackageName}.${serviceClassName}")
public class ${serviceClassName} implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ${mapperClassName} dao;

	/**
     * @author ${author}
     * @description: 分页查询 ${table_comment}列表
     * @date ${curtDate}
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<${dtoClassName}> search${formated_tab_name}ByPaging(Map<String,Object> searchParams) throws Exception {
		List<${dtoClassName}> dataList =  dao.search${formated_tab_name}ByPaging(searchParams);
		return dataList;
	}
	/**
     * @author ${author}
     * @description: 按条件查询${table_comment}列表
     * @date ${curtDate}
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<${dtoClassName}> search${formated_tab_name}(Map<String,Object> searchParams) throws Exception {
	    List<${dtoClassName}> dataList = dao.search${formated_tab_name}(searchParams);
        return dataList;
    }
	/**
     * @author ${author}
     * @description: 查询${table_comment}对象
     * @date ${curtDate}
     * @param id
     * @return
     * @throws
     */ 
	public ${dtoClassName} query${formated_tab_name}ByPrimaryKey(String id) throws Exception {
		
		${dtoClassName} dto = dao.find${formated_tab_name}ByPrimaryKey(id);
		
		if(dto == null) dto = new ${dtoClassName}();
		
		return dto;
		
	}

	/**
     * @title: insert${formated_tab_name}
     * @author ${author}
     * @description: 新增 ${table_comment}对象
     * @date ${curtDate}
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insert${formated_tab_name}(${dtoClassName} dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insert${formated_tab_name}(paramMap);
		
		${dtoClassName} resultDto = (${dtoClassName}) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: update${formated_tab_name}
     * @author ${author}
     * @description: 修改 ${table_comment}对象
     * @date ${curtDate}
     * @param paramMap
     * @return
     * @throws
     */
	public void update${formated_tab_name}(${dtoClassName} dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		dao.update${formated_tab_name}(paramMap);
	}
	/**
     * @title: delete${formated_tab_name}ByPrimaryKey
     * @author ${author}
     * @description: 删除 ${table_comment},按主键
     * @date ${curtDate}
     * @param paramMap
     * @throws
     */ 
	public void delete${formated_tab_name}ByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.delete${formated_tab_name}ByPrimaryKey(paramMap);
	}

}

