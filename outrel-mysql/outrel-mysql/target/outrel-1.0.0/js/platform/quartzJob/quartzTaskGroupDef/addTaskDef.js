//初始化下标
function resetTrNum(tableId) {
	 $("#"+tableId+" tr").each(function(i){
		 if(i>0){
			// alert($(this).attr('id',i));
			 $(this).attr('id',i);
			$(':input, select,button,a', this).each(function(){
				var $this = $(this), name = $this.attr('name'),id=$this.attr('id'),onclick_str=$this.attr('onclick'), val = $this.val();
				if(name!=null){
					var s = name.indexOf("[");
					var e = name.indexOf("]");
					var new_name = name.substring(s+1,e);
					$this.attr("name",name.replace(new_name,i-1));
					if(name.indexOf("dealStep")>0){
						$this.attr("value",i);
					}
				}
				if(id!=null){
					var s = id.indexOf("[");
					var e = id.indexOf("]");
					var new_id = id.substring(s+1,e);
					$this.attr("id",id.replace(new_id,i-1));
				}
				if(onclick_str!=null){
					if(onclick_str.indexOf("deltr(")>0){
						$this.attr("onclick","deltr("+i+")");
					}
				}
			});
		 }
	});
}



function addRow(){
	    var _len = $("#tab tr").length;       
	    $("#tab").append("<tr id="+_len+" align='center'>"
	                        +'<td><input name="taskList['+(_len-1)+'].dealStep" value="'+_len+'"  style="width:20%;"/></td>'
	                        +'<td><input name="taskList['+(_len-1)+'].taskName"/></td>'
	                        +'<td><input id="taskList['+(_len-1)+'].beanId" name="taskList['+(_len-1)+'].beanId"/></td>'
	                        +'<td><input name="taskList['+(_len-1)+'].preStep" id="taskList['+(_len-1)+'].preStep"/></td>'
	                        +'<td><select name="taskList['+(_len-1)+'].preStepState">'
	                        +'<option value="">无</option><option value=1>成功</option><option value=0>失败</option>'
	                        +'</select></td>'
	                        +"<td width=5%><a href=\'#\' onclick=\'deltr("+_len+")\'>删除</a></td>"
	                    +"</tr>");   
	}
   //删除<tr/>
function deltr(index){
      $("tr[id='"+index+"']").remove();//删除当前行
  resetTrNum("tab");
}

