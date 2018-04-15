package com.jy.modules.common.tld;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jy.modules.befloan.productconf.lbtproductconf.dto.LbTProductConfDTO;
import com.jy.modules.befloan.productconf.lbtproductconf.service.LbTProductConfService;
import com.jy.modules.common.util.JsonUtil;
import com.jy.platform.core.message.QueryReqBean;
 
public class ProductTag extends TagSupport {
//    @Autowired
//    @Qualifier("com.jy.modules.befloan.productconf.lbtproductconf.service.LbTProductConfService")
//    private LbTProductConfService service;

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
	private boolean syncQuery = false;


	private String defaultValue;
	private String type;
	/* (non-Javadoc)
	 * @see javax.servlet.jsp.tagext.TagSupport#doStartTag()
	 */
	public int doStartTag() throws JspException {
		// start
		Map<String, Object> searchParams = new HashMap<String, Object>();
		searchParams.put("dto", new LbTProductConfDTO());
		QueryReqBean params = new QueryReqBean();
		params.setSearchParams(searchParams);
		List<LbTProductConfDTO> list=null;
		try {
			//
			ServletContext servletContext = ContextLoader.getCurrentWebApplicationContext().getServletContext();
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
			LbTProductConfService service= (LbTProductConfService)context.getBean("com.jy.modules.befloan.productconf.lbtproductconf.service.LbTProductConfService");
			//LbTProductConfService service=(LbTProductConfService) AppContextBean.getApplicationContext().getBean("com.jy.modules.befloan.productconf.lbtproductconf.service.LbTProductConfService");
			if(syncQuery) {
				//通过接口查询核心的产品信息
				
			} else {
				list = service.searchLbTProductConf(params.getSearchParams());
			}
		} catch (Exception e1) {
			// TODO Auto-generated catch block
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
				
				for(LbTProductConfDTO l:list){
					Map<String,Object> map=new HashMap<String,Object>();
					map.put("value", l.getProductCode());
					map.put("text", l.getProductName() + ("3".equals(l.getProductState()) ? " 在售":" 停用"));
					if(l.getProductCode().toString().equals(defaultValue)){
						map.put("defaultValue", true);
					}
					lM.add(map);
				}
				select.append(JsonUtil.toJson(lM));
			//2014-11-7 17:35:33 chj 新增 type="text"
			}else if(null!=type&&type.equals("text")){
				for(LbTProductConfDTO l:list){
					if (String.valueOf(l.getProductCode()).equals(defaultValue)) {
						select.append(l.getProductName() + ("3".equals(l.getProductState()) ? " 在售":" 停用"));
					}
				}
			}else if(null!=type&&type.equals("checkbox")){
				if(list != null && list.size()>0){
					int i=0;
					for(LbTProductConfDTO l:list){
						if("3".equals(l.getProductState())||String.valueOf(l.getProductCode()).equals(defaultValue)){
							select.append("<input type='checkbox' id='"+name+i+"' name='");
							select.append(getName());
							select.append("'");
							select.append(getExtendProperty());
							if(defaultValue != null && (","+defaultValue + ",").indexOf(","+l.getId()+",") !=-1){
								select.append(" checked");
							 }
							select.append(" value='");
							select.append(l.getId());
							select.append("'>");
							select.append("<label for='"+name+i+"'>"+l.getProductName() + ("3".equals(l.getProductState()) ? " 在售":" 停用") +"</label>");
							//select.append(sysCode.get("DICNAME"));
							select.append("&nbsp;&nbsp;");
							i++;
						}
						
					}
				}
			}else{
				select.append("<select ");
				select = getAllProp(select);
				select.append(">");
				if (this.hasBlank) {
					select.append("<option value=\"");
					select.append("\"");
					select.append(">--"+this.emptyText+"--");
					select.append("</option>");
				}
				for(LbTProductConfDTO l:list){
					
					if("3".equals(l.getProductState())||String.valueOf(l.getProductCode()).equals(defaultValue)){
						select.append("<option value=\"");
						select.append(l.getProductCode());
						select.append("\"");
						if (String.valueOf(l.getProductCode()).equals(defaultValue)) {
							select.append(" selected=\"selected\"");
						}
						select.append(">");
					
						select.append(l.getProductName() + ("3".equals(l.getProductState()) ? " 在售":" 停用"));
						select.append("</option>");
					}
					
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
	
	
	
}
