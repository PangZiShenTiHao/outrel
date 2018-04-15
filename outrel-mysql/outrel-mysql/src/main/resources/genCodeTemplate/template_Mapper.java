package ${mapperPackageName};

import java.util.List;
import java.util.Map;

import ${dtoPackageName}.${dtoClassName};

import com.fintech.platform.core.mybatis.MyBatisRepository;
/**
 * @classname: ${mapperClassName}
 * @description: 定义  ${table_comment} 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  ${author}
 */
@MyBatisRepository
public interface ${mapperClassName} {
    
    /**
     * @author ${author}
     * @description: 分页查询${table_comment}
     * @date ${curtDate}
     * @param searchParams
     * @return
     */
    public List<${dtoClassName}> search${formated_tab_name}ByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author ${author}
     * @description:查询对象${table_comment}
     * @date ${curtDate}
     * @param searchParams
     * @return
     */
    public List<${dtoClassName}> search${formated_tab_name}(Map<String,Object> searchParams);

    /**
     * @author ${author}
     * @description:查询对象${table_comment}
     * @date ${curtDate}
     * @param id
     * @return
     */
    public ${dtoClassName} find${formated_tab_name}ByPrimaryKey(String id);
    
    /**
     * @author ${author}
     * @description: 新增对象${table_comment}
     * @date ${curtDate}
     * @param paramMap
     * @return
     */
    public int insert${formated_tab_name}(Map<String, Object> paramMap);
    
    /**
     * @author ${author}
     * @description: 更新对象${table_comment}
     * @date ${curtDate}
     * @param paramMap
     */
    public void update${formated_tab_name}(Map<String, Object> paramMap);
     
    /**
     * @author ${author}
     * @description: 按主键删除${table_comment}
     * @date ${curtDate}
     * @param ids
     * @return
     */ 
    public void delete${formated_tab_name}ByPrimaryKey(Map<String, Object> paramMap);
    
    
}
