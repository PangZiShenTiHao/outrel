package com.portal.tools;


import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
public class ExcelLargetTest {
    public static void main(String[] args) throws Throwable {
    	List<String> list = new ArrayList<String>();
    	for (int i = 0; i < 500000; i++) {
			list.add("测试数据入的对象里面有AccountPeriod(并赋值到$ap)，并且存在账户信息(并把accountNo赋值到$accountNo)，并且存在现金流信息（并符合各属性的值的匹配），那么执行余额的增"+i);
		}
    	
    	
        SXSSFWorkbook wb = new SXSSFWorkbook(100); // keep 100 rows in memory, exceeding rows will be flushed to disk
        Sheet sh = wb.createSheet();
        for(int rownum = 0; rownum < list.size(); rownum++){
            Row row = sh.createRow(rownum);
            for(int cellnum = 0; cellnum < 10; cellnum++){
                Cell cell = row.createCell(cellnum);
                //String address = new CellReference(cell).formatAsString();
                cell.setCellValue(list.get(rownum));
            }

        }

       /* // Rows with rownum < 900 are flushed and not accessible
        for(int rownum = 0; rownum < 900; rownum++){
          Assert.assertNull(sh.getRow(rownum));
        }

        // ther last 100 rows are still in memory
        for(int rownum = 900; rownum < 1000; rownum++){
            Assert.assertNotNull(sh.getRow(rownum));
        }
        */
        FileOutputStream out = new FileOutputStream("D:/tmp/sxssf.xlsx");
        wb.write(out);
        out.close();

        // dispose of temporary files backing this workbook on disk
        wb.dispose();
        
    }
}