package com.jy.modules.common.tld;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.jy.modules.befloan.customer.lbtintoinfo.enumdef.MoveDataObj;
import com.jy.modules.common.util.JsonUtil;


public class MoveDataTag extends TagSupport {

	/**
	 * 
	 */
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

	@Override
	public int doStartTag() throws JspException {
		MoveDataObj[] states = MoveDataObj.values();
		StringBuffer select = new StringBuffer();
		if(states.length > 0) {
			if("json".equals(type)) {
				List<Object> lM=new ArrayList<Object>();
				if (this.hasBlank) {
					Map<String,Object> map=new HashMap<String,Object>();
					map.put("value", "");
					map.put("text", "--"+this.emptyText+"--");
					lM.add(map);
				}
				
				for(MoveDataObj s:states){
					Map<String,Object> map=new HashMap<String,Object>();
					map.put("value", s.getKey());
					map.put("text", s.getValue());
					if(s.getKey().equals(defaultValue)){
						map.put("defaultValue", true);
					}
					lM.add(map);
				}
				select.append(JsonUtil.toJson(lM));
			} else if("text".equals(type)) {
				for(MoveDataObj s:states){
					if(s.getKey().equals(defaultValue)){
						select.append(s.getValue());
					}
				}
			} else {
				select.append("<select ");
				select = getAllProp(select);
				select.append(">");
				select.append("<option value=\"");
				select.append("\"");
				select.append(">--请选择--");
				select.append("</option>");
				for(MoveDataObj s:states){
					select.append("<option value=\"");
					select.append(s.getKey());
					select.append("\"");
					if (s.getKey().equals(defaultValue)) {
						select.append(" selected=\"selected\"");
					}
					select.append(">");
					select.append(s.getValue());
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
		return super.doStartTag();
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOnchange() {
		return onchange;
	}

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

	public String getEmptyText() {
		return emptyText;
	}

	public void setEmptyText(String emptyText) {
		this.emptyText = emptyText;
	}

}
