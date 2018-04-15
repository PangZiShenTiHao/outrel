

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
					if(name.indexOf("sequence")>0){
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

