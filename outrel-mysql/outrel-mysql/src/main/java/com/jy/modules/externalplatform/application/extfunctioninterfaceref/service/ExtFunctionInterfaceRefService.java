package com.jy.modules.externalplatform.application.extfunctioninterfaceref.service;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.api.org.SessionAPI;
import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.dao.ExtFunctionInterfaceRefDao;
import com.jy.modules.externalplatform.application.extfunctioninterfaceref.dto.ExtFunctionInterfaceRefDTO;

/**
 * @classname: ExtFunctionInterfaceRefService
 * @description: 定义  功能接口映射表 实现类
 * @author:  dell
 */
@Service("com.jy.modules.externalplatform.application.extfunctioninterfaceref.service.ExtFunctionInterfaceRefService")
public class ExtFunctionInterfaceRefService implements Serializable {

    private static final long serialVersionUID = 1L;
    
    
    @Autowired
	private SessionAPI sessionAPI;
    
	@Autowired
	private ExtFunctionInterfaceRefDao dao;

	/**
     * @author dell
     * @description: 分页查询 功能接口映射表列表
     * @date 2017-05-12 16:39:43
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<ExtFunctionInterfaceRefDTO> searchExtFunctionInterfaceRefByPaging(Map<String,Object> searchParams) throws Exception {
		List<ExtFunctionInterfaceRefDTO> dataList =  dao.searchExtFunctionInterfaceRefByPaging(searchParams);
		return dataList;
	}
	/**
     * @author dell
     * @description: 按条件查询功能接口映射表列表
     * @date 2017-05-12 16:39:43
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<ExtFunctionInterfaceRefDTO> searchExtFunctionInterfaceRef(Map<String,Object> searchParams) throws Exception {
	    List<ExtFunctionInterfaceRefDTO> dataList = dao.searchExtFunctionInterfaceRef(searchParams);
        return dataList;
    }
	
	
	/**
	* @title: searchExtFunctionInterfaceRef
	* @author:陈东栋
	* @description: 按"功能点编码+接口编码+配置类型"查询功能接口映射表列表
	* @date 2017年5月22日 下午5:58:39
	* @param funcTypeCode
	* @param interfaceNo
	* @param confType
	* @return
	* @throws Exception
	* @throws 
	*/ 
	public List<ExtFunctionInterfaceRefDTO> searchExtFunctionInterfaceRef(String funcTypeCode,String interfaceNo,String confType) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		ExtFunctionInterfaceRefDTO dto = new ExtFunctionInterfaceRefDTO();
		if(StringUtils.isNotEmpty(funcTypeCode) ){
			dto.setFuncTypeCode(funcTypeCode);
		}
		if(StringUtils.isNotEmpty(funcTypeCode) ){
			dto.setInterfaceNo(interfaceNo);
		}
		if(StringUtils.isNotEmpty(confType) ){
			dto.setConfType(confType);
		}
		paramMap.put("dto", dto);
		List<ExtFunctionInterfaceRefDTO> dataList = dao.searchExtFunctionInterfaceRef(paramMap);
        return dataList;
    }
	
	/**
     * @author dell
     * @description: 查询功能接口映射表对象
     * @date 2017-05-12 16:39:43
     * @param id
     * @return
     * @throws
     */ 
	public ExtFunctionInterfaceRefDTO queryExtFunctionInterfaceRefByPrimaryKey(String id) throws Exception {
		
		ExtFunctionInterfaceRefDTO dto = dao.findExtFunctionInterfaceRefByPrimaryKey(id);
		
		if(dto == null) dto = new ExtFunctionInterfaceRefDTO();
		
		return dto;
		
	}

	/**
     * @title: insertExtFunctionInterfaceRef
     * @author dell
     * @description: 新增 功能接口映射表对象
     * @date 2017-05-12 16:39:43
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertExtFunctionInterfaceRef(ExtFunctionInterfaceRefDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		int count = dao.insertExtFunctionInterfaceRef(paramMap);
		ExtFunctionInterfaceRefDTO resultDto = (ExtFunctionInterfaceRefDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateExtFunctionInterfaceRef
     * @author dell
     * @description: 修改 功能接口映射表对象
     * @date 2017-05-12 16:39:43
     * @param paramMap
     * @return
     * @throws
     */
	public void updateExtFunctionInterfaceRef(ExtFunctionInterfaceRefDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		dto.setModifyBy(String.valueOf(dto.getOpUserId()));
		paramMap.put("dto", dto);
		dao.updateExtFunctionInterfaceRef(paramMap);
	}
	/**
     * @title: deleteExtFunctionInterfaceRefByPrimaryKey
     * @author dell
     * @description: 删除 功能接口映射表,按主键
     * @date 2017-05-12 16:39:43
     * @param paramMap
     * @throws
     */ 
	public void deleteExtFunctionInterfaceRefByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteExtFunctionInterfaceRefByPrimaryKey(paramMap);
	}
	
	/**
	* @title: batchInsertExtFuncInterfaceRef
	* @author:陈东栋
	* @description: 批量添加 功能接口映射表
	* @date 2017年5月13日 下午5:43:48
	* @param funcTypePoint 功能点编号
	* @param confType 配置类型 （1-接口分配规则集  2-调用点分配规则集）
	* @param interfaceNoList 接口编号列表
	* @throws 
	*/ 
	public void batchInsertExtFuncInterfaceRef(String funcTypePoint,String confType,List<ExtFunctionInterfaceRefDTO> interfaceInfoList) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		String createBy = String.valueOf(sessionAPI.getCurrentUserInfo().getUserId());
		paramMap.put("interfaceInfoList", interfaceInfoList);
		paramMap.put("funcTypeCode", funcTypePoint);
		paramMap.put("confType", confType);
		paramMap.put("createBy",createBy);
		dao.batchInsertExtFuncInterfaceRef(paramMap);
	}
	
	/**
	* @title: deleteExtFuncInterfaceRefByFuncCode
	* @author:陈东栋
	* @description: 通过功能点类型删除功能接口映射
	* @date 2017年5月13日 下午7:47:28
	* @param funcTypePoint
	* @throws 
	*/ 
	public void deleteExtFuncInterfaceRefByFuncCode(String funcTypePoint, String confType) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("funcTypeCode", funcTypePoint);
		paramMap.put("confType", confType);
		dao.deleteExtFuncInterfaceRefByFuncCode(paramMap);
	}
}

