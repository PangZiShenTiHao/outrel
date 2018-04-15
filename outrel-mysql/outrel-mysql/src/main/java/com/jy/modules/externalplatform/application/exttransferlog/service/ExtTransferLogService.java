package com.jy.modules.externalplatform.application.exttransferlog.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.exttransferlog.dao.ExtTransferLogDao;
import com.jy.modules.externalplatform.application.exttransferlog.dto.ExtTransferLogDTO;

/**
 * @classname: ExtTransferLogService
 * @description: 定义  EXT_TRANSFER_LOG 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.application.exttransferlog.service.ExtTransferLogService")
public class ExtTransferLogService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtTransferLogDao dao;

	/**
     * @author dell
     * @description: 分页查询 EXT_TRANSFER_LOG列表
     * @date 2016-02-23 15:22:21
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtTransferLogDTO> searchExtTransferLogByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtTransferLogDTO> dataList =  dao.searchExtTransferLogByPaging(searchParams);
		return dataList;
	}
	/**
     * @author dell
     * @description: 按条件查询EXT_TRANSFER_LOG列表
     * @date 2016-02-23 15:22:21
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtTransferLogDTO> searchExtTransferLog(Map<String,Object> searchParams) throws Exception {
	    List<ExtTransferLogDTO> dataList = dao.searchExtTransferLog(searchParams);
        return dataList;
    }
	/**
     * @author dell
     * @description: 查询EXT_TRANSFER_LOG对象
     * @date 2016-02-23 15:22:21
     * @param id
     * @return
     * @throws
     */ 
	public ExtTransferLogDTO queryExtTransferLogByPrimaryKey(String id) throws Exception {
		
		ExtTransferLogDTO dto = dao.findExtTransferLogByPrimaryKey(id);
		
		if(dto == null) dto = new ExtTransferLogDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtTransferLog
     * @author dell
     * @description: 新增 EXT_TRANSFER_LOG对象
     * @date 2016-02-23 15:22:21
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtTransferLog(ExtTransferLogDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insertExtTransferLog(paramMap);
		
		ExtTransferLogDTO resultDto = (ExtTransferLogDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtTransferLog
     * @author dell
     * @description: 修改 EXT_TRANSFER_LOG对象
     * @date 2016-02-23 15:22:21
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtTransferLog(ExtTransferLogDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		dao.updateExtTransferLog(paramMap);
	}
	/**
     * @title: deleteExtTransferLogByPrimaryKey
     * @author dell
     * @description: 删除 EXT_TRANSFER_LOG,按主键
     * @date 2016-02-23 15:22:21
     * @param paramMap
     * @throws
     */ 
	public void deleteExtTransferLogByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtTransferLogByPrimaryKey(paramMap);
	}
	/**
	 * 根据进件编号和交易类型删除日志
	 * @param intoId
	 * @param tradeType
	 * @throws Exception
	 */
	public void  deleteExtTransferLogByIntoId(String intoId,String tradeType) throws Exception{
		if(StringUtils.isEmpty(intoId)) throw new Exception("删除失败！传入的进件编号为null");
		Map<String,Object> paramap = new HashMap<String,Object>() ;
		paramap.put("intoId", intoId);
		paramap.put("tradeType", tradeType);
		dao.deleteExtTransferLogByIntoId(paramap);
	}
}

