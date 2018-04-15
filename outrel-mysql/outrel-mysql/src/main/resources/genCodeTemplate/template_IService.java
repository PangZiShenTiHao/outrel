package ${iServicePackageName};

import java.util.List;
import java.util.Map;

import ${dtoPackageName}.${dtoClassName};

/**
 * @classname: ${mapperClassName}
 * @description: 定义  ${table_comment} 接口
 * @author:  ${author}
 */
public interface ${iServiceClassName} {
    	
    /**
     * @title: queryList${formated_tab_name}ByPage
     * @author ${author}
     * @description: 分页查询 ${table_comment}列表
     * @date ${curtDate}
     * @param paramMap
     * @return
     * @throws
     */ 
	public List<Map<String,Object>> queryList${formated_tab_name}ByPage(Map<String, Object> paramMap) throws Exception;
    
	/**
     * @title: queryList${formated_tab_name}ByObject
     * @author ${author}
     * @description: 查询${table_comment}列表
     * @date ${curtDate}
     * @param paramMap
     * @return
     * @throws
     */ 
	public List<${dtoClassName}> queryList${formated_tab_name}(Map<String, Object> paramMap) throws Exception;
	
    /**
     * @title: query${formated_tab_name}ByPrimaryKey
     * @author ${author}
     * @description: 查询${table_comment}对象
     * @date ${curtDate}
     * @param id
     * @return
     * @throws
     */ 
    public ${dtoClassName} query${formated_tab_name}ByPrimaryKey(String id) throws Exception;
	
	
	/**
     * @title: insert${formated_tab_name}
     * @author ${author}
     * @description: 新增 ${table_comment}对象
     * @date ${curtDate}
     * @param paramMap
     * @return
     * @throws
     */ 
	public int insert${formated_tab_name}(Map<String, Object> paramMap) throws Exception;
	
	/**
     * @title: update${formated_tab_name}
     * @author ${author}
     * @description: 修改 ${table_comment}对象
     * @date ${curtDate}
     * @param paramMap
     * @return
     * @throws
     */ 
	public int update${formated_tab_name}(Map<String, Object> paramMap) throws Exception;
	
    /**
     * @title: delete${formated_tab_name}ByPrimaryKey
     * @author ${author}
     * @description: 删除 ${table_comment},按主键
     * @date ${curtDate}
     * @param paramMap
     * @throws
     */ 
	public void delete${formated_tab_name}ByPrimaryKey(Map<String, Object> paramMap) throws Exception ;

}
