package com.jy.modules.befloan.interfacelog.lbttransferlog.dao;

import java.util.List;
import java.util.Map;

import com.fintech.platform.core.mybatis.MyBatisRepository;
import com.jy.modules.befloan.interfacelog.lbttransferlog.dto.LbTTransferLogDTO;
/**
 * @classname: LbTTransferLogDao
 * @description: 定义  调用接口日志表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  dou
 */
@MyBatisRepository
public interface LbTTransferLogDao {
    
    /**
     * @author dou
     * @description: 分页查询调用接口日志表
     * @date 2015-01-05 15:09:42
     * @param searchParams
     * @return
     */
    public List<LbTTransferLogDTO> searchLbTTransferLogByPage(Map<String, Object> searchParams) ;
    
    /**
     * @author dou
     * @description:查询对象调用接口日志表
     * @date 2015-01-05 15:09:42
     * @param searchParams
     * @return
     */
    public List<LbTTransferLogDTO> searchLbTTransferLog(Map<String,Object> searchParams);

    /**
     * @author dou
     * @description:查询对象调用接口日志表
     * @date 2015-01-05 15:09:42
     * @param id
     * @return
     */
    public LbTTransferLogDTO findLbTTransferLogByPrimaryKey(String id);
    
    /**
     * @author dou
     * @description: 新增对象调用接口日志表
     * @date 2015-01-05 15:09:42
     * @param paramMap
     * @return
     */
    public int insertLbTTransferLog(Map<String, Object> paramMap);
    
    /**
     * @author dou
     * @description: 更新对象调用接口日志表
     * @date 2015-01-05 15:09:42
     * @param paramMap
     */
    public void updateLbTTransferLog(Map<String, Object> paramMap);
     
    /**
     * @author dou
     * @description: 按主键删除调用接口日志表
     * @date 2015-01-05 15:09:42
     * @param ids
     * @return
     */ 
    public void truncateTableBySql();
    
    
}
