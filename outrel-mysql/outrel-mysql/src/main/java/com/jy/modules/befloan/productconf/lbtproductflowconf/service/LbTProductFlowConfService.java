package com.jy.modules.befloan.productconf.lbtproductflowconf.service;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintech.platform.core.common.BaseDTO;
import com.jy.modules.befloan.productconf.lbtproductflowconf.dao.LbTProductFlowConfDao;
import com.jy.modules.befloan.productconf.lbtproductflowconf.dto.LbTProductFlowConfDTO;

/**
 * @classname: LbTProductFlowConfService
 * @description: 定义  产品流程配置表 实现类
 * @author:  JY-IT-D001
 */
@Service("com.jy.modules.befloan.productconf.lbtproductflowconf.service.LbTProductFlowConfService")
public class LbTProductFlowConfService implements Serializable {

    private static final long serialVersionUID = 1L;
    
	@Autowired
	private LbTProductFlowConfDao dao;

	/**
     * @author JY-IT-D001
     * @description: 分页查询 产品流程配置表列表
     * @date 2014-12-23 10:19:23
     * @param searchParams 条件
     * @return
     * @throws
     */ 
	public List<LbTProductFlowConfDTO> searchLbTProductFlowConfByPaging(Map<String,Object> searchParams) throws Exception {
		List<LbTProductFlowConfDTO> dataList =  dao.searchLbTProductFlowConfByPaging(searchParams);
		return dataList;
	}
	/**
     * @author JY-IT-D001
     * @description: 按条件查询产品流程配置表列表
     * @date 2014-12-23 10:19:23
     * @param searchParams 条件
     * @return
     * @throws
     */
	public List<LbTProductFlowConfDTO> searchLbTProductFlowConf(Map<String,Object> searchParams) throws Exception {
	    List<LbTProductFlowConfDTO> dataList = dao.searchLbTProductFlowConf(searchParams);
        return dataList;
    }
	/**
     * @author JY-IT-D001
     * @description: 查询产品流程配置表对象
     * @date 2014-12-23 10:19:23
     * @param id
     * @return
     * @throws
     */ 
	public LbTProductFlowConfDTO queryLbTProductFlowConfByPrimaryKey(String id) throws Exception {
		
		LbTProductFlowConfDTO dto = dao.findLbTProductFlowConfByPrimaryKey(id);
		
		if(dto == null) dto = new LbTProductFlowConfDTO();
		
		return dto;
		
	}
	
	/**
     * @author 豆永亮
     * @description: 查询产品流程配置表对象根据产品编号
     * @date 2014-12-24
     * @param fkProConfId 产品编号
     * @return
     * @throws
     */ 
	public LbTProductFlowConfDTO queryLbTProductFlowConfByFkProConfId(String fkProConfId) throws Exception {
		
		LbTProductFlowConfDTO dto = dao.findLbTProductFlowConfByFkProConfId(fkProConfId);
		
		return dto;
		
	}

	/**
     * @title: insertLbTProductFlowConf
     * @author JY-IT-D001
     * @description: 新增 产品流程配置表对象
     * @date 2014-12-23 10:19:23
     * @param dto
     * @return
     * @throws
     */
	@SuppressWarnings("all")
	public Long insertLbTProductFlowConf(LbTProductFlowConfDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		int count = dao.insertLbTProductFlowConf(paramMap);
		
		LbTProductFlowConfDTO resultDto = (LbTProductFlowConfDTO) paramMap.get("dto");
		Long keyId = resultDto.getId();
		return keyId;
	}
	/**
     * @title: updateLbTProductFlowConf
     * @author JY-IT-D001
     * @description: 修改 产品流程配置表对象
     * @date 2014-12-23 10:19:23
     * @param paramMap
     * @return
     * @throws
     */
	public void updateLbTProductFlowConf(LbTProductFlowConfDTO dto) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", dto);
		
		dao.updateLbTProductFlowConf(paramMap);
	}
	/**
     * @title: deleteLbTProductFlowConfByPrimaryKey
     * @author JY-IT-D001
     * @description: 删除 产品流程配置表,按主键
     * @date 2014-12-23 10:19:23
     * @param paramMap
     * @throws
     */ 
	public void deleteLbTProductFlowConfByPrimaryKey(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteLbTProductFlowConfByPrimaryKey(paramMap);
	}
	
	/**
	 *  信审是否显示对应的列
	 * @param productCode 产品编号
	 * @param filedName 字段名称
	 * @return
	 */
	public String isShowColumn(String productCode,String filedName){
		String msg ="0";
		try {
			LbTProductFlowConfDTO foConfDTO =  dao.findLbTProductFlowConfByFkProConfId(productCode);
            //查询该商品是否显示客群分类列
			if(foConfDTO!=null){
				 msg = getMethodValue(foConfDTO,filedName);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;
	}
	
	/**
	 * 信审审批是否需要进行二次评分
	 * @param request
	 * @param dataMsg
	 * @return
	 */
	
	public String isSecondTimeScore(String productCode){
		try {
			LbTProductFlowConfDTO foConfDTO =  dao.findLbTProductFlowConfByFkProConfId(productCode);
            //查询该商品是否需要进行二次评分
			if(foConfDTO!=null && StringUtils.isNotEmpty(foConfDTO.getExt3())){
				return foConfDTO.getExt3();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "0";
	}
	
	/**
	 * @author xujunqi
	 * @description: 物理删除产品流程配置表指定数据
	 * @date 2015年2月10日 下午6:01:17
	 * @param baseDto
	 * @param ids
	 * @throws Exception
	 */
	public void deleteLbTProductFlowConfByID(BaseDTO baseDto,String ids) throws Exception {
		if(StringUtils.isEmpty(ids)) throw new Exception("删除失败！传入的参数主键为null");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("dto", baseDto);
		paramMap.put("ids", ids);
		dao.deleteLbTProductFlowConfByID(paramMap);
	}
	
	/**
	 * 通过反射执行某个类指定字段的getter方法相应值
	 * @param object
	 * @param filedName
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getMethodValue(Object object,String filedName) throws Exception {
		Class clazz = object.getClass();
		//将字段名称首字母大写
		char[] cs=filedName.toCharArray();
        cs[0]-=32;
        //通过反射获取相应的getter方法
        Method m1 = clazz.getDeclaredMethod("get"+String.valueOf(cs)); 
        //执行方法
        String msg = (String) m1.invoke(object); 
        if(StringUtils.isEmpty(msg)){
        	 msg = "0";
        }
		return msg;
	}
}

