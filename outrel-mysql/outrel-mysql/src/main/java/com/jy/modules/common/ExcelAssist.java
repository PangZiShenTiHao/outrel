package com.jy.modules.common;


import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jodd.bean.BeanUtil;
import jodd.datetime.JDateTime;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>
 * excel操作辅助类
 * </p>
 * 
 * @author lin
 * @2014年12月11日 上午11:53:08
 */
public class ExcelAssist {
	
	private static Logger logger = LoggerFactory.getLogger(ExcelAssist.class);
	

	private ExcelAssist() {
	}

	private static ExcelAssist instance = null;

	public static synchronized ExcelAssist getInstance() {

		if (instance == null) {
			instance = new ExcelAssist();
		}
		return instance;
	}

	/**
	 * 将EXCEL流转成List
	 * 
	 * @param fis
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public List<List> excelFileConvertToList(InputStream fis,int rowCounts,int totalRows,int headCols)throws Exception {

		Workbook wb = WorkbookFactory.create(fis);
		Sheet sheet = wb.getSheetAt(0);
		List<List> rows = new ArrayList<List>();
		int index = 0;
		for (Row row : sheet) {
			index++;
			if (index <= rowCounts) continue;//跳过标题，时间，等表头行
			//if (index > totalRows) break;
			List<Object> cells = new ArrayList<Object>();
			
			for (int i=0;i<headCols;i++) {
				Cell cell = row.getCell(i);
				Object obj = null;
				//CellReference cellRef = new CellReference(row.getRowNum(),cell.getColumnIndex());
				if(null==cell){ 
					cells.add(cell);
					continue;
				}
				switch (cell.getCellType()) {
				case Cell.CELL_TYPE_STRING:
					obj = cell.getRichStringCellValue().getString().trim();
					break;
				case Cell.CELL_TYPE_NUMERIC:
					if (DateUtil.isCellDateFormatted(cell)) {
						obj = new JDateTime(cell.getDateCellValue());
					} else {
						obj = cell.getNumericCellValue();
					}
					break;
				case Cell.CELL_TYPE_BOOLEAN:
					obj = cell.getBooleanCellValue();
					break;
				case Cell.CELL_TYPE_FORMULA:
					obj = cell.getNumericCellValue();
					break;
				default:
					obj = null;
				}
				cells.add(obj);
			}
			rows.add(cells);
		}
		return rows;
	}
	
	
    /**
     * 将报表结构转换成Map
     * @param excelColumns
     * @return void
     */
	public Map<Integer, String> convertExcelHeadToMap(List<ExcelColumns> excelColumns) {
        Map<Integer, String> excelHeadMap = new HashMap<Integer, String>();
        for (ExcelColumns excelColumn : excelColumns) {
        	final boolean isImport = excelColumn.getFieldName() != null 
        							&& !"".equals(excelColumn.getFieldName())
        							&& !"serialVersionUID".equalsIgnoreCase(excelColumn.getFieldName())
        							&& excelColumn.isImport();
            if(isImport) {
            	excelHeadMap.put(excelColumn.getIndex(), excelColumn.getFieldName());
            }
        }
        return excelHeadMap;
    }
	
	
	
	/**
     * 根据Excel生成数据对象
     * @param excelHeadMap 表头信息
     * @param excelHeadConvertMap 需要特殊转换的单元
     * @param rows
     * @param cls 
     */
    @SuppressWarnings("rawtypes")
	public List buildDataObject(Map<Integer, String> excelHeadMap, Map<String, Map> excelHeadConvertMap, List<List> rows, Class cls) throws Exception{
        List contents = new ArrayList();
        for (List list : rows) {
            // 当前行的数据放入map中,生成<fieldName, value>的形式
            Map<String, Object> rowMap = rowListToMap(excelHeadMap, excelHeadConvertMap, list);
            Object obj = null;
            try {
                obj = cls.newInstance();
            } catch (InstantiationException ex) {
                throw new InstantiationException("dto is not instantiation");
            } catch (IllegalAccessException ex) {
                throw new IllegalAccessException("param dtoName is error");
            }
           BeanUtil.populateBean(obj, rowMap);
           contents.add(obj);
        }
        return contents;
    }

    
    /**
     * 将行转行成map,生成<fieldName, value>的形式
     * @param excelHeadMap 表头信息
     * @param excelHeadConvertMap excelHeadConvertMap
     * @param list
     * @return
     * @return Map<String,Object>
     */
    private Map<String, Object> rowListToMap(Map<Integer, String> excelHeadMap, Map<String, Map> excelHeadConvertMap, List list) {
        Map<String, Object> rowMap = new HashMap<String, Object>();
        for(int i = 0; i < list.size(); i++) {
            String fieldName =  excelHeadMap.get(i);
            // 存在所定义的列
            if(fieldName != null) {
                Object value = list.get(i);
                if(excelHeadConvertMap != null && excelHeadConvertMap.get(fieldName) != null) {
                   if (excelHeadConvertMap.get(fieldName).get(value)!=null) {
                	   value = excelHeadConvertMap.get(fieldName).get(value);
                   }
                }
                if(value !=null){
                	rowMap.put(fieldName, value);
                	logger.info(fieldName + ":" + value);
                }
            }
        }
        return rowMap;
    }
    
}

