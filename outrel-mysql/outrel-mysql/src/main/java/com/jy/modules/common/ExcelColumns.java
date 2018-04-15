package com.jy.modules.common;



/**
 * <p>列信息</p>	
 * @author lin
 * @2014年12月10日 下午8:20:26
 */
public class ExcelColumns {
	 /**
     * 索引
     */
    private int index;
     
    /**
     * 字段名称 与DTO属性对应
     */
    private String fieldName;
     
    /**
     * 字段显示名称
     */
    private String fieldDispName;
    
    /**
     * 字段是否导入
     */
    private boolean isImport;
     
    public boolean isImport() {
		return isImport;
	}

	public void setImport(boolean isImport) {
		this.isImport = isImport;
	}

	/**
     * 字段类型
     */
    private int type;
     
    public ExcelColumns() {
         
    }
    
    public ExcelColumns(int index, String fieldName) {
        super();
        this.index = index;
        this.fieldName = fieldName;
    }
     
    public ExcelColumns(int index, String fieldName, String fieldDispName,boolean isImport) {
        super();
        this.index = index;
        this.fieldName = fieldName;
        this.fieldDispName = fieldDispName;
        this.isImport = isImport;
    }
     
    public ExcelColumns(int index, String fieldName, String fieldDispName, int type) {
        super();
        this.index = index;
        this.fieldName = fieldName;
        this.fieldDispName = fieldDispName;
        this.type = type;
    }
 
    public int getIndex() {
        return index;
    }
 
    public String getFieldName() {
        return fieldName;
    }
 
    public void setIndex(int index) {
        this.index = index;
    }
 
    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
 
    public String getFieldDispName() {
        return fieldDispName;
    }
 
    public void setFieldDispName(String fieldDispName) {
        this.fieldDispName = fieldDispName;
    }
 
    public int getType() {
        return type;
    }
 
    public void setType(int type) {
        this.type = type;
    }
 
    @Override
    public String toString() {
        return "ExcelColumn [fieldDispName=" + fieldDispName + ", fieldName="
                + fieldName + ", index=" + index + ", type=" + type + "]";
    }
}
