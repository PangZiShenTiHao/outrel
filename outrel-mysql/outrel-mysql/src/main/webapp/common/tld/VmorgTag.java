package com.jy.modules.common.tld;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jy.modules.common.util.JsonUtil;
import com.jy.modules.reportbefloan.dao.IntoAppTimeDao;
import com.jy.platform.api.org.SessionAPI;
import com.jy.platform.api.org.UserInfo;
import com.jy.platform.core.common.JYLoggerUtil;
/**
 * 自定义 通过虚拟树 loan_vmdata_priv 获取机构信息 
 * @author chengang
 *
 */
public class VmorgTag extends TagSupport {
	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private String onchange;
	private String className;
	private String extendProperty;
	private boolean hasBlank = true;
	private String emptyText = "请选择";
	private String defaultValue;
	private String type;
	private String userId="";

	public int doStartTag() throws JspException {
		Map<String, Object> searchParams = new HashMap<String, Object>();
		List<Map<String, String>> list=null;
		UserInfo u = null;
		try {
			ServletContext servletContext = ContextLoader.getCurrentWebApplicationContext().getServletContext();
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
			IntoAppTimeDao dao= (IntoAppTimeDao)context.getBean(IntoAppTimeDao.class);
			if(StringUtils.isEmpty(userId)|| "".equals(userId)){
				SessionAPI sessionAPI = (SessionAPI) context.getBean("sessionAPI");
				UserInfo userInfo = sessionAPI.getCurrentUserInfo();
				if(userInfo != null){
					userId = userInfo.getUserId().toString();
				}else{
					userId = "-1";
				}
			}
			JYLoggerUtil.info(this.getClass(), "==curUserId="+userId);
			searchParams.put("curUserId", userId);
			list = dao.queryVmdataPriv(searchParams);
			
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		StringBuffer select = new StringBuffer();
		if(null!=list){
			if(null!=type&&type.equals("json")){
				List<Object> lM=new ArrayList<Object>();
				if (this.hasBlank) {
					Map<String,Object> map=new HashMap<String,Object>();
					map.put("value", "");
					map.put("text", "--"+this.emptyText+"--");
					lM.add(map);
				}
				
				for(Map<String,String> temp:list){
					Map<String,Object> map=new HashMap<String,Object>();
					map.put("value", temp.get("ORG_ID"));
					map.put("text", temp.get("ORG_NAME"));
					if(temp.get("ORG_ID").equals(defaultValue)){
						map.put("defaultValue", true);
					}
					lM.add(map);
				}
				select.append(JsonUtil.toJson(lM));
			//2014-11-7 17:35:33 chj 新增 type="text"
			}else if(null!=type&&type.equals("text")){
				for(Map<String,String> temp:list){
					if (String.valueOf(temp.get("ORG_ID")).equals(defaultValue)) {
						select.append(temp.get("ORG_NAME"));
					}
				}
			}else{
				select.append("<select ");
				select = getAllProp(select);
				select.append(">");
				select.append("<option value=\"");
				select.append("\"");
				select.append(">--请选择--");
				select.append("</option>");
				for(Map<String,String> temp:list){
					select.append("<option value=\"");
					select.append(temp.get("ORG_ID"));
					select.append("\"");
					if (String.valueOf(temp.get("ORG_NAME")).equals(defaultValue)) {
						select.append(" selected=\"selected\"");
					}
					select.append(">");
					select.append(temp.get("ORG_NAME"));
					select.append("</option>");
				}
				select.append("</select>");
			}
		}
		try {
			pageContext.getOut().write(select.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	/**
	 * 设置标签的属性
	 * 
	 * @param StringBuffer
	 *            results 传入标签属性StringBuffer
	 * @return StringBuffer 返回加入标签属性后的StringBuffer
	 */
	private StringBuffer getAllProp(StringBuffer results) throws JspException {
		prepareAttribute(results, "id", getId());
		prepareAttribute(results, "name", getName());
		prepareAttribute(results, "onchange", getOnchange());
		prepareAttribute(results, "className",getClassName());
		results.append(" "+getExtendProperty());
		return results;
	}
	
	/**
	 * Prepares an attribute if the value is not null, appending it to the the
	 * given StringBuffer.
	 * 
	 * @param handlers
	 *            The StringBuffer that output will be appended to.
	 */
	protected void prepareAttribute(StringBuffer handlers, String name,
			Object value) {
		if (value != null) {
			handlers.append(" ");
			handlers.append(name);
			handlers.append("=\"");
			handlers.append(value);
			handlers.append("\"");
		}
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	 
	/**
	 * @return the onchange
	 */
	public String getOnchange() {
		return onchange;
	}

	/**
	 * @param onchange the onchange to set
	 */
	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}


	 

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

 

	public String getExtendProperty() {
		return extendProperty;
	}

	public void setExtendProperty(String extendProperty) {
		this.extendProperty = extendProperty;
	}

 
	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

    
    public boolean isHasBlank() {
        return hasBlank;
    }

    
    public void setHasBlank(boolean hasBlank) {
        this.hasBlank = hasBlank;
    }
	
    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
