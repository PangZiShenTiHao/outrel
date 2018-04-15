package com.jy.modules.externalplatform.interfacerest.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.interfacerest.dao.ExtInterfaceLogDao;
import com.jy.modules.externalplatform.interfacerest.dto.ExtInterfaceLogDTO;

/**
 * @classname: ExtInterfaceLogService
 * @description: 定义  调用接口日志表 实现类
 * @author:  Administrator
 */
@Service("com.jy.modules.externalplatform.interfacerest.service.ExtInterfaceLogService")
public class ExtInterfaceLogService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtInterfaceLogDao dao;

	/**
     * @author Administrator
     * @description: 分页查询 调用接口日志表列表
     * @date 2017-05-17 17:59:40
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtInterfaceLogDTO> searchExtInterfaceLogByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtInterfaceLogDTO> dataList =  dao.searchExtInterfaceLogByPaging(searchParams);
		return dataList;
	}
	/**
     * @author Administrator
     * @description: 按条件查询调用接口日志表列表
     * @date 2017-05-17 17:59:40
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtInterfaceLogDTO> searchExtInterfaceLog(Map<String,Object> searchParams) throws Exception {
	    List<ExtInterfaceLogDTO> dataList = dao.searchExtInterfaceLog(searchParams);
        return dataList;
    }
	/**
     * @author Administrator
     * @description: 查询调用接口日志表对象
     * @date 2017-05-17 17:59:40
     * @param id
     * @return
     * @throws
     */ 
	public ExtInterfaceLogDTO queryExtInterfaceLogByPrimaryKey(String id) throws Exception {
		
		ExtInterfaceLogDTO dto = dao.findExtInterfaceLogByPrimaryKey(id);
		
		if(dto == null) dto = new ExtInterfaceLogDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtInterfaceLog
     * @author Administrator
     * @description: 新增 调用接口日志表对象
     * @date 2017-05-17 17:59:40
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtInterfaceLog(ExtInterfaceLogDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insertExtInterfaceLog(paramMap);
		
		ExtInterfaceLogDTO resultDto = (ExtInterfaceLogDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtInterfaceLog
     * @author Administrator
     * @description: 修改 调用接口日志表对象
     * @date 2017-05-17 17:59:40
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtInterfaceLog(ExtInterfaceLogDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		dao.updateExtInterfaceLog(paramMap);
	}
	/**
     * @title: deleteExtInterfaceLogByPrimaryKey
     * @author Administrator
     * @description: 删除 调用接口日志表,按主键
     * @date 2017-05-17 17:59:40
     * @param paramMap
     * @throws
     */ 
	public void deleteExtInterfaceLogByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtInterfaceLogByPrimaryKey(paramMap);
	}
	/**
     * @title: queryExtInterfaceLogNum
     * @author Administrator
     * @description: 查询接口使用次数
     * @date 2017-05-17 17:59:40
     * @param paramMap
     * @throws
     */ 
	public List<ExtInterfaceLogDTO> queryExtInterfaceLogNum(Map<String, Object> searchParams) throws Exception {
		List<ExtInterfaceLogDTO> dataList =  dao.queryExtInterfaceLogNum(searchParams);
		return dataList;
	}
	/**
     * @title: queryExtInterfaceLogStatus
     * @author Administrator
     * @description: 查询接口使用次数(另一个维度)
     * @date 2017-05-17 17:59:40
     * @param paramMap
     * @throws
     */ 
	public List<ExtInterfaceLogDTO> queryExtInterfaceLogStatus(Map<String, Object> searchParams) throws Exception {
		List<ExtInterfaceLogDTO> dataList =  dao.queryExtInterfaceLogStatus(searchParams);
		return dataList;
	}

}

