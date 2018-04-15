package ${codeDTO.actionPackageName};

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.longtech.xweb.action.Action;
import com.longtech.xweb.action.ActionMessage;
import com.longtech.xweb.action.Validator;
import com.platform.util.ConstantBeanId;

import ${codeDTO.dtoPackageName}.${codeDTO.dtoClassName};
import ${iServicePackageName}.${iServiceClassName};
/**
 * 
 * @Description: 定义${codeDTO.tableComments} actoin
 * @author ${codeDTO.author}
 * @version 1.0, 
 * @date ${codeDTO.curtDate}
 */
public class ${codeDTO.actionClassName} implements Action,Validator{
	//通过前台 传过来的值可以判断调用acion中的 对应的方法
	private String operateOfAction;
	//前台页面传到后台的数据实体信息
	private ${codeDTO.dtoClassName} dto;
	//定义 访问业务逻辑层 实例
	private ${iServiceClassName} service;
	
	public void validate(ActionMessage errors) {
		try{
			HttpSession httpSession = errors.getRequest().getSession(); 
			//当前登录系统的用户id
			String userId = String.valueOf(httpSession.getAttribute("userId"));
			if (dto == null ) dto = new ${codeDTO.dtoClassName}();
			//记录操作数据的人员id
			dto.setUserIdOfOperateData(userId);
			//通过spring 获取管理起来的bean 实例
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(errors.getRequest().getSession().getServletContext());
			service = (${iServiceClassName}) context.getBean("${codeDTO.servicePackageName}.${codeDTO.serviceClassName}");
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public String execute(ActionMessage message) throws Exception {
		String url = "";
		if("add${codeDTO.formated_tab_name}AndNextOperate".equals(operateOfAction)){
			//主子表新增操作
			url = this.add${codeDTO.formated_tab_name}AndNextOperate(message);
		}else if("update${codeDTO.formated_tab_name}AndNextOperate".equals(operateOfAction)){
			//主子表修改操作
			url = this.update${codeDTO.formated_tab_name}AndNextOperate(message);
		}
		
		return url ;
	}
	
	/**
	 * 主子表新增操作
	 * 主表新增成功后，跳转到新增子表
	 * @param message
	 * @return
	 */
	private String add${codeDTO.formated_tab_name}AndNextOperate(ActionMessage message) {
		HttpServletRequest request = message.getRequest();
		//主表新增完后，下一步为新增子表的相关页面
		String url = "/${codeDTO.jspPrefix}/${codeDTO.modelName}/addSubInfoOf${codeDTO.formated_tab_name}.jsp";
		String msg = ConstantBeanId.ADD_SUCESS;
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("dto", dto);
		try {
			String mainId = service.add${codeDTO.formated_tab_name}(paramMap);
			//返回主表成功新增后的主键 id，
			request.setAttribute(ConstantBeanId.MAIN_ID, mainId);
			
			url+="?"+ConstantBeanId.MAIN_ID+"="+mainId+"&urlJspOfTab="+dto.getUrlJspOfTab();
		} catch (Exception e) {
			e.printStackTrace();
			msg = ConstantBeanId.ADD_FAILED;
			//主表新增失败后，跳转回主表新增页面
			url = "/${codeDTO.jspPrefix}/${codeDTO.modelName}/add${codeDTO.formated_tab_name}.jsp";
		}
		request.setAttribute(ConstantBeanId.MSG, msg);
		message.setMessage(msg);
		
		return url;
	}
	/**
	 * 主子表修改操作
	 * 主表修改成功后，跳转到下一步
	 * @param message
	 * @return
	 */
	private String update${codeDTO.formated_tab_name}AndNextOperate(ActionMessage message) {
		HttpServletRequest request = message.getRequest();
		//修改成功后跳转 到 下一步页面
		String url = "/${codeDTO.jspPrefix}/${codeDTO.modelName}/updateSubInfoOf${codeDTO.formated_tab_name}.jsp";
		
		String msg = ConstantBeanId.UPDATE_SUCESS;
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("dto", dto);
		
		try {
			service.update${codeDTO.formated_tab_name}(paramMap);
			//修改成功后跳转下一页时 传递主表id,及查询页面 菜单的url jsp
			url+="?"+ConstantBeanId.MAIN_ID+"="+dto.getId()+"&urlJspOfTab="+dto.getUrlJspOfTab();
		} catch (Exception e) {
			e.printStackTrace();
			msg = ConstantBeanId.UPDATE_FAILED;
			//主表修改失败后，跳转回主表修改页面
			url = "/${codeDTO.jspPrefix}/${codeDTO.modelName}/update${codeDTO.formated_tab_name}.jsp";
		}
		request.setAttribute(ConstantBeanId.MSG, msg);
		message.setMessage(msg);
		return url;
	}




	public ${codeDTO.dtoClassName} getDto() {
		return dto;
	}

	public void setDto(${codeDTO.dtoClassName} dto) {
		this.dto = dto;
	}

	public String getOperateOfAction() {
		return operateOfAction;
	}

	public void setOperateOfAction(String operateOfAction) {
		this.operateOfAction = operateOfAction;
	}



}
