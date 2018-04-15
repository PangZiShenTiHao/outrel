package com.jy.modules.externalplatform.application.extsysmanagement.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extsysmanagement.dao.ExtSysManagementDao;
import com.jy.modules.externalplatform.application.extsysmanagement.dto.ExtSysManagementDTO;

/**
 * @classname: ExtSysManagementService
 * @description: 定义  外联平台系统管理表 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.application.extsysmanagement.service.ExtSysManagementService")
public class ExtSysManagementService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtSysManagementDao dao;

	/**
     * @author dell
     * @description: 分页查询 外联平台系统管理表列表
     * @date 2017-04-06 13:10:18
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtSysManagementDTO> searchExtSysManagementByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtSysManagementDTO> dataList =  dao.searchExtSysManagementByPaging(searchParams);
		return dataList;
	}
	/**
     * @author dell
     * @description: 按条件查询外联平台系统管理表列表
     * @date 2017-04-06 13:10:18
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtSysManagementDTO> searchExtSysManagement(Map<String,Object> searchParams) throws Exception {
	    List<ExtSysManagementDTO> dataList = dao.searchExtSysManagement(searchParams);
        return dataList;
    }
	
	/**
     * @author dell
     * @description: 查询处于有效状态的外联平台系统管理表列表
     * @date 2017-04-06 13:10:18
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtSysManagementDTO> searchExtValidSysManagement() throws Exception {


		List<ExtSysManagementDTO> dataList = dao.searchExtValidSysManagement();
        return dataList;
    }
	
	/**
     * @author dell
     * @description: 查询外联平台系统管理表对象
     * @date 2017-04-06 13:10:18
     * @param id
     * @return
     * @throws
     */ 
	public ExtSysManagementDTO queryExtSysManagementByPrimaryKey(String id) throws Exception {
		
		ExtSysManagementDTO dto = dao.findExtSysManagementByPrimaryKey(id);
		
		if(dto == null) dto = new ExtSysManagementDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtSysManagement
     * @author dell
     * @description: 新增 外联平台系统管理表对象
     * @date 2017-04-06 13:10:18
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtSysManagement(ExtSysManagementDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setCreateBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		int count = dao.insertExtSysManagement(paramMap);
		ExtSysManagementDTO resultDto = (ExtSysManagementDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtSysManagement
     * @author dell
     * @description: 修改 外联平台系统管理表对象
     * @date 2017-04-06 13:10:18
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtSysManagement(ExtSysManagementDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		dao.updateExtSysManagement(paramMap);
	}
	/**
     * @title: deleteExtSysManagementByPrimaryKey
     * @author dell
     * @description: 删除 外联平台系统管理表,按主键
     * @date 2017-04-06 13:10:18
     * @param paramMap
     * @throws
     */ 
	public void deleteExtSysManagementByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtSysManagementByPrimaryKey(paramMap);
	}
	/**
     * @title: deleteExtSysManagementByID
     * @author dell
     * @description: 真删除 外联平台系统管理表,按主键
     * @date 2017-04-06 13:10:18
     * @param paramMap
     * @throws
     */ 
	public void deleteExtSysManagementByID(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtSysManagementByID(paramMap);
	}

}

