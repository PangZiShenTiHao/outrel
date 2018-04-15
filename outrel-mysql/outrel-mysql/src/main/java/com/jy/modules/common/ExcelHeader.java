package com.jy.modules.common;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
/**
 * <p>excel模板头部对象</p>	
 * @author lin
 * @2014年12月11日 上午11:29:30
 */
public class ExcelHeader{

	/**
     * 标题列信息
     */
    private List<ExcelColumns> columns = new ArrayList<ExcelColumns>();
     
    /**
     * 需要转换的列
     */
    private Map<String, Map> columnsConvertMap;
     
    /**
     * 头部所占用的行数,定义第三行是表头
     */
    private int rowCount = 3;
    
    private int totalRows;
     
    /**
     * 头部所占用的列数
     */
    private int columnCount;
 
    public int getTotalRows() {
		return totalRows;
	}

	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}

	public List<ExcelColumns> getColumns() {
        return columns;
    }
 
    public int getRowCount() {
        return rowCount;
    }
 
    public int getColumnCount() {
        return columnCount;
    }
 
    public void setColumns(List<ExcelColumns> columns) {
        this.columns = columns;
    }
 
    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
    }
 
    public void setColumnCount(int columnCount) {
        this.columnCount = columnCount;
    }
 
    public Map<String, Map> getColumnsConvertMap() {
        return columnsConvertMap;
    }
 
    public void setColumnsConvertMap(Map<String, Map> columnsConvertMap) {
        this.columnsConvertMap = columnsConvertMap;
    }
 
    @Override
    public String toString() {
        return "ExcelHead [columnCount=" + columnCount + ", columns=" + columns
                + ", columnsConvertMap=" + columnsConvertMap + ", rowCount="
                + rowCount + "]";
    }
	
}

