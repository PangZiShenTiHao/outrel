package com.jy.modules.externalplatform.application.exttransferlog.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.externalplatform.application.exttransferlog.dto.ExtTransferLogDTO;
/**
 * @classname: ExtTransferLogDao
 * @description: 定义  EXT_TRANSFER_LOG 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dell
 */
@MyBatisRepository
public interface ExtTransferLogDao {
    
    /**
     * @author dell
     * @description: 分页查询EXT_TRANSFER_LOG
     * @date 2016-02-23 15:22:21
     * @param searchParams
     * @return
     */
    public List<ExtTransferLogDTO> searchExtTransferLogByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author dell
     * @description:查询对象EXT_TRANSFER_LOG
     * @date 2016-02-23 15:22:21
     * @param searchParams
     * @return
     */
    public List<ExtTransferLogDTO> searchExtTransferLog(Map<String,Object> searchParams);

    /**
     * @author dell
     * @description:查询对象EXT_TRANSFER_LOG
     * @date 2016-02-23 15:22:21
     * @param id
     * @return
     */
    public ExtTransferLogDTO findExtTransferLogByPrimaryKey(String id);
    
    /**
     * @author dell
     * @description: 新增对象EXT_TRANSFER_LOG
     * @date 2016-02-23 15:22:21
     * @param paramMap
     * @return
     */
    public int insertExtTransferLog(Map<String, Object> paramMap);
    
    /**
     * @author dell
     * @description: 更新对象EXT_TRANSFER_LOG
     * @date 2016-02-23 15:22:21
     * @param paramMap
     */
    public void updateExtTransferLog(Map<String, Object> paramMap);
     
    /**
     * @author dell
     * @description: 按主键删除EXT_TRANSFER_LOG
     * @date 2016-02-23 15:22:21
     * @param ids
     * @return
     */ 
    public void deleteExtTransferLogByPrimaryKey(Map<String, Object> paramMap);
    /**
     * 按进件编号删除EXT_TRANSFER_LOG
     * @param intoId
     */
    public void deleteExtTransferLogByIntoId(Map<String, Object> paramMap) ;
}
