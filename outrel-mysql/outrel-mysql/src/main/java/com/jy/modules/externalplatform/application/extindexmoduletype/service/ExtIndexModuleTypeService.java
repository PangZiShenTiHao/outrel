package com.jy.modules.externalplatform.application.extindexmoduletype.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extindexmoduletype.dao.ExtIndexModuleTypeDao;
import com.jy.modules.externalplatform.application.extindexmoduletype.dto.ExtIndexModuleTypeDTO;

/**
 * @classname: ExtIndexModuleTypeService
 * @description: 定义  指标模型 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.application.extindexmoduletype.service.ExtIndexModuleTypeService")
public class ExtIndexModuleTypeService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtIndexModuleTypeDao dao;

	/**
     * @author dell
     * @description: 分页查询 指标模型列表
     * @date 2017-05-17 09:55:44
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtIndexModuleTypeDTO> searchExtIndexModuleTypeByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtIndexModuleTypeDTO> dataList =  dao.searchExtIndexModuleTypeByPaging(searchParams);
		return dataList;
	}
	/**
     * @author dell
     * @description: 按条件查询指标模型列表
     * @date 2017-05-17 09:55:44
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtIndexModuleTypeDTO> searchExtIndexModuleType(Map<String,Object> searchParams) throws Exception {
	    List<ExtIndexModuleTypeDTO> dataList = dao.searchExtIndexModuleType(searchParams);
        return dataList;
    }
	
	public List<ExtIndexModuleTypeDTO>  searchLbtAntiModuleTypeAllList(){
		  List<ExtIndexModuleTypeDTO> dataList = dao.searchExtIndexModuleTypeAllList();
	      return dataList;
	}
	
	/**
     * @author dell
     * @description: 查询指标模型对象
     * @date 2017-05-17 09:55:44
     * @param id
     * @return
     * @throws
     */ 
	public ExtIndexModuleTypeDTO queryExtIndexModuleTypeByPrimaryKey(String id) throws Exception {
		
		ExtIndexModuleTypeDTO dto = dao.findExtIndexModuleTypeByPrimaryKey(id);
		if(dto == null){
			dto = new ExtIndexModuleTypeDTO();
			dto.setModuleTypeCode("ROOT");
		} 
		return dto;
		
	}

	/**
     * @title: insertExtIndexModuleType
     * @author dell
     * @description: 新增 指标模型对象
     * @date 2017-05-17 09:55:44
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtIndexModuleType(ExtIndexModuleTypeDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setCreateBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		int count = dao.insertExtIndexModuleType(paramMap);
		ExtIndexModuleTypeDTO resultDto = (ExtIndexModuleTypeDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtIndexModuleType
     * @author dell
     * @description: 修改 指标模型对象
     * @date 2017-05-17 09:55:44
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtIndexModuleType(ExtIndexModuleTypeDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		dao.updateExtIndexModuleType(paramMap);
	}
	/**
     * @title: deleteExtIndexModuleTypeByPrimaryKey
     * @author dell
     * @description: 删除 指标模型,按主键
     * @date 2017-05-17 09:55:44
     * @param paramMap
     * @throws
     */ 
	public void deleteExtIndexModuleTypeByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtIndexModuleTypeByPrimaryKey(paramMap);
	}
	
	 /**
	  * 下拉框：查询对象指标模型类型列表
	  * @param parentId
	  * @return
	 */
	 public List<ExtIndexModuleTypeDTO> searchExtIndexModuleTypeByCondition(String parentId) {
		  Map<String, Object> searchParams = new HashMap<String, Object>();
		  searchParams.put("parentId", parentId);
		  List<ExtIndexModuleTypeDTO> dataList = dao.searchExtIndexModuleTypeByCondition(searchParams);
	      return dataList;
	 }
	 
	 
	 /**
	 * 下拉框：通过模块类型唯一编码查询指标模型类型
	 * @param moduleTypeCode
	 * @return
	 */
	public ExtIndexModuleTypeDTO searchExtIndexModuleTypeByCode(String moduleTypeCode){
		 Map<String, Object> searchParams = new HashMap<String, Object>();
		 searchParams.put("moduleTypeCode", moduleTypeCode);
		 return dao.searchExtIndexModuleTypeByCode(searchParams);
	 }

}

