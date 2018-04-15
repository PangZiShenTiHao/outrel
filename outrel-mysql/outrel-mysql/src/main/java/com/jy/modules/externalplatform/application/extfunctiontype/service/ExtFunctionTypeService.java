package com.jy.modules.externalplatform.application.extfunctiontype.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extfunctiontype.dao.ExtFunctionTypeDao;
import com.jy.modules.externalplatform.application.extfunctiontype.dto.ExtFunctionTypeDTO;

/**
 * @classname: ExtFunctionTypeService
 * @description: 定义  外联平台功能类型表 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.application.extfunctiontype.service.ExtFunctionTypeService")
public class ExtFunctionTypeService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private ExtFunctionTypeDao dao;

	/**
     * @author dell
     * @description: 分页查询 外联平台功能类型表列表
     * @date 2017-04-06 14:24:35
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtFunctionTypeDTO> searchExtFunctionTypeByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtFunctionTypeDTO> dataList =  dao.searchExtFunctionTypeByPaging(searchParams);
		return dataList;
	}
	/**
     * @author dell
     * @description: 按条件查询外联平台功能类型表列表
     * @date 2017-04-06 14:24:35
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtFunctionTypeDTO> searchExtFunctionType(Map<String,Object> searchParams) throws Exception {
	    List<ExtFunctionTypeDTO> dataList = dao.searchExtFunctionType(searchParams);
        return dataList;
    }
	/**
     * @author dell
     * @description: 查询外联平台功能类型表对象
     * @date 2017-04-06 14:24:35
     * @param id
     * @return
     * @throws
     */ 
	public ExtFunctionTypeDTO queryExtFunctionTypeByPrimaryKey(String id) throws Exception {
		
		ExtFunctionTypeDTO dto = dao.findExtFunctionTypeByPrimaryKey(id);
		
		if(dto == null) dto = new ExtFunctionTypeDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtFunctionType
     * @author dell
     * @description: 新增 外联平台功能类型表对象
     * @date 2017-04-06 14:24:35
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtFunctionType(ExtFunctionTypeDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setCreateBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		int count = dao.insertExtFunctionType(paramMap);
		/*ExtFunctionTypeDTO resultDto = (ExtFunctionTypeDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();*/
		return Long.valueOf(count);
	}
	/**
     * @title: updateExtFunctionType
     * @author dell
     * @description: 修改 外联平台功能类型表对象
     * @date 2017-04-06 14:24:35
     * @param
     * @return
     * @throws
     */
	public void updateExtFunctionType(ExtFunctionTypeDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(dto.getOpUserId());
		paramMap.put("dto", dto);
		dao.updateExtFunctionType(paramMap);
	}
	/**
     * @title: deleteExtFunctionTypeByPrimaryKey
     * @author dell
     * @description: 删除 外联平台功能类型表,按主键
     * @date 2017-04-06 14:24:35
     * @param
     * @throws
     */ 
	public void deleteExtFunctionTypeByID(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtFunctionTypeByID(paramMap);
	}
	
	/**
	* @title: searchExtFunctionTypeBySysCode
	* @author:陈东栋
	* @description: 查询分配于系统的功能类型
	* @date 2017年4月25日 下午4:22:43
	* @param sysCode
	* @return
	* @throws 
	*/ 
	public List<ExtFunctionTypeDTO> searchExtFunctionTypeBySysCode(String sysCode,String parentId) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("sysCode", sysCode);
		paramMap.put("parentId", parentId);
		return dao.searchExtFunctionTypeBySysCode(paramMap);
	}
		
	
	/**
	* @title: findExtFunctionTypeByFuncType
	* @author:陈东栋
	* @description: 按功能类型编码查询功能类型对象
	* @date 2017年5月13日 上午11:45:46
	* @param funcTypeCode
	* @return
	* @throws 
	*/ 
	public ExtFunctionTypeDTO findExtFunctionTypeByFuncType(String funcTypeCode) {
		ExtFunctionTypeDTO  dto = dao.findExtFunctionTypeByFuncType(funcTypeCode);
		return dto;
	}
}


