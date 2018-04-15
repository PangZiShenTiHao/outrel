/*
MySQL Backup
Source Server Version: 5.5.42
Source Database: ptdev
Date: 2016/11/14 19:19:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Procedure definition for `delConsignedInfoById`
-- ----------------------------
DROP PROCEDURE IF EXISTS `delConsignedInfoById`;
DELIMITER ;;
CREATE  PROCEDURE `delConsignedInfoById`(`con_id` bigint,`cur_userId` bigint)
    COMMENT '撤销任务委托代理'
begin

	declare  v_pro_name varchar(100);
	declare  v_pro_ver	varchar(100);
	
		/*找回 未处理的待办任务 且 是解锁状态*/
	update jbpm4_consigned_task ct1 set ct1.last_upd_by=now(),ct1.remark='人工取消工作委托'
			where ct1.task_id in(
			     select task_id from (
						select ct.task_id from jbpm4_consigned_task ct 
			      where ct.validate_state='1'
			      and ct.from_user_id=(select cp.from_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			      and ct.to_user_id=(select cp.to_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			      and exists (select t.* from jbpm4_task t where t.lock_state ='0' and t.dbid_ = ct.task_id )
			      and ct.remark is null	
						) t
			)
			and ct1.last_upd_by=cur_userId
			and ct1.remark is null;	
			
			update jbpm4_task t 
			set  t.assignee_ = (select cp.from_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			where t.dbid_ in(
				select task_id from (
			      select ct.task_id from jbpm4_consigned_task ct 
			      where ct.validate_state='1'
			      and ct.from_user_id=(select cp.from_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			      and ct.to_user_id=(select cp.to_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			      and exists (select t.* from jbpm4_task t where t.lock_state ='0' and t.dbid_ = ct.task_id )
			      and ct.remark is null
						) t
			);
			
			update jbpm4_hist_task ht 
			set  ht.assignee_ = (select cp.from_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			where ht.dbid_ in(
					select task_id from (
			      select ct.task_id from jbpm4_consigned_task ct 
			      where ct.validate_state='1'
			      and ct.from_user_id=(select cp.from_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			      and ct.to_user_id=(select cp.to_user_id from jbpm4_consign_person cp where cp.id=con_id) 
			      and exists (select t.* from jbpm4_task t where t.lock_state ='0' and t.dbid_ = ct.task_id )
			      and ct.remark is null
						) t
			);
			
  	  		/*假删除 任务委托记录*/
  	   		update jbpm4_consign_person  set validate_state = '0' where id = con_id;
       
end
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `fastChangeOrg`
-- ----------------------------
DROP PROCEDURE IF EXISTS `fastChangeOrg`;
DELIMITER ;;
CREATE  PROCEDURE `fastChangeOrg`(in orgType varchar(50),in username varchar(50),in neworgId bigint(18))
    COMMENT '更新虚拟树'
begin	  	
		declare my_alter 	varchar(500) ; 
		set my_alter=concat('delete from ',orgType,'_vmrule_mapping t3 where t3.vmrule_mapping_id in(
	  select t2.id from  ',orgType,'_vmrule_mapping t2 where t2.map_type=1 and t2.org_type=',orgType,' and t2.map_value=',username,' ) and t3.org_type=',orgType);
    set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
		
 		set my_alter=concat('delete from ',orgType,'_vmdata_priv t3 where t3.vmrule_mapping_id in(
 	  select t2.id from  ',orgType,'_vmrule_mapping t2 where t2.map_type=1 and t2.org_type=',orgType,' and t2.map_key=',username,') and t3.org_type=',orgType,'');
		set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
 	 
 	 	set my_alter=concat('delete from ',orgType,'_vmdata_priv t3 where t3.user_id=',username,' and t3.org_type=',orgType,'');
		set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
 	 
 	  set my_alter=concat('delete from ',orgType,'_vmdata_priv t3 where t3.owner_id=',username,' and t3.org_type=',orgType,'');
		set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
 
 	  set my_alter=concat('delete from ',orgType,'_vmrule_mapping t2 where t2.map_type=1 and t2.org_type=',orgType,' and t2.map_value=',username,'');
		set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
 	 	
  	set my_alter=concat('delete from ',orgType,'_vmrule_mapping t2 where t2.org_type=',orgType,' and t2.map_value=',username);
		set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
 
 	  delete t1 from vmuser_vmorg_map t1 where t1.org_type=orgType and t1.user_id=username;
 		
 	  insert into vmuser_vmorg_map( user_id, org_id, org_type)
 	  values(username,neworgId,orgType);
 	  
 	  set my_alter=concat('insert into ',orgType,'_vmdata_priv(user_id, owner_id, org_type, create_time, create_by) ',
 	  'values(',',username,',',username',',orgType',',CURRENT_TIMESTAMP()',',-1');
		set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
 	  
  	  set my_alter=concat('insert into ',orgType,'_vmdata_priv(user_id, owner_id, org_type, create_time, create_by,vmrule_mapping_id)',
  	  'select t4.map_key ',username,',',orgType,',',CURRENT_TIMESTAMP(),',-1',',t4.id from ',orgType,'_vmrule_mapping t4 
 	  where 1=1 and t4.map_type=''2'' and t4.org_type=',orgType,' and t4.map_value=',neworgId,' and not exists( select t6.id from  ',
 	  orgType,'_vmdata_priv t6 where t6.user_id=t4.map_key and t6.owner_id=',username,' and t6.org_type=',orgType,')');
		set @exesql=my_alter;	
		PREPARE s1 from @exesql;
		execute  s1;
	 
	end
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `getChildList`
-- ----------------------------
DROP FUNCTION IF EXISTS `getChildList`;
DELIMITER ;;
CREATE  FUNCTION `getChildList`(rootId bigint,orgType varchar(30)) RETURNS varchar(1000) CHARSET utf8
    COMMENT '获取所有下级机构'
BEGIN 
       DECLARE pTemp VARCHAR(1000);  
       DECLARE cTemp VARCHAR(1000);  
      
       SET pTemp = '-100';  
       SET cTemp =cast(rootId as CHAR); 
      
       WHILE cTemp is not null DO  
         SET pTemp = concat(pTemp,',',cTemp);  
         SELECT group_concat(t2.org_id) INTO cTemp FROM (select * from vmtree_info t1 where t1.org_type=orgType ) t2   
         WHERE FIND_IN_SET(parent_id,cTemp)>0; 
       END WHILE; 
       RETURN pTemp;  
     END
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `updateProPng`
-- ----------------------------
DROP PROCEDURE IF EXISTS `updateProPng`;
DELIMITER ;;
CREATE  PROCEDURE `updateProPng`(in id BIGINT(20),in contents LONGBLOB)
    COMMENT '发布流程成功后更新流程图片'
begin

	declare  v_pro_name varchar(100);
	declare  v_pro_ver	varchar(100);
	/*declare  v_content	LONGBLOB;*/

	select t2.proc_name ,t2.proc_version into v_pro_name ,v_pro_ver from temporary_jbpm4_info t2 where t2.id=id;

	update temporary_jbpm4_info t1
	set  t1.pro_png=''

	where  t1.proc_name=v_pro_name
	and t1.proc_version=v_pro_ver
	and t1.pro_png is not null ;
		 
	update temporary_jbpm4_info t1 set  t1.pro_png=contents where t1.id =id;
       
end
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `updateStepLog`
-- ----------------------------
DROP PROCEDURE IF EXISTS `updateStepLog`;
DELIMITER ;;
CREATE  PROCEDURE `updateStepLog`(in taskState varchar(50),in exceptionInfo varchar(50),in starttime datetime,in endtime datetime,in keyID bigint(18))
    COMMENT '更新日志'
begin
  	update quartz_task_his h 
				set h.task_state = taskState
				,h.task_end_time = CURRENT_TIMESTAMP()
				,h.error_info = exceptionInfo
				where h.id = keyID;
				
				update quartz_task_group_instance gi 
					set gi.task_ins_state = taskState, gi.task_start_time=starttime, gi.task_end_time=endtime, gi.fail_times=(IFNULL(gi.fail_times,0)+1) 
			where  id=keyID;

commit; 
end
;;
DELIMITER ;

-- ----------------------------
--  Procedure definition for `updateVmdataPrivPart`
-- ----------------------------
DROP PROCEDURE IF EXISTS `updateVmdataPrivPart`;
DELIMITER ;;
CREATE  PROCEDURE `updateVmdataPrivPart`(in tabName varchar(50),in orgType varchar(50),in truncateType varchar(50),in userId bigint(18))
    COMMENT '更新虚拟树'
begin	  
	
	declare my_user_id 	bigint(18) DEFAULT userId;
	declare my_alter 	varchar(500) ; 
	declare my_tab 		varchar(50) DEFAULT tabName;
	declare my_org_type varchar(50) DEFAULT orgType;
	declare my_trun		varchar(50) DEFAULT truncateType;
	set my_alter=concat('alter table ',my_tab,' add partition D_',my_user_id,' values(',my_user_id,')  ');
			
	      execute  my_alter;
-- 	      exception when others then 
-- 						dbms_output.put_line(concat('创建分区异常：',my_alter));
	      
	      if 'Y' = my_trun then 
	        set my_alter=concat('alter table ',my_tab,' truncate partition D_',my_user_id,' ');
	        execute  my_alter;
	      end if;
	      
				set my_alter=CONCAT('insert into vmdata_priv_part(owner_id, user_id, data_type) ',
				'select tt1.owner_id
	           ,my_user_id  user_id
	           ,my_org_type data_type 
	           from ( select vmd1.owner_id from  ',my_org_type,'_vmdata_priv vmd1 
	                         where vmd1.owner_id is not null and vmd1.user_id=my_user_id
	               union all
	               select m.user_id owner_id from vmuser_vmorg_map m 
	                      where m.org_id in
	                      (select vmd1.org_id from  ',my_org_type,'_vmdata_priv vmd1 
	                              where vmd1.org_id is not null and vmd1.user_id=my_user_id)
	               and m.org_type=my_org_type
	                  )tt1');
	      
				execute  my_alter;
	     
	      commit;
	
	end
;;
DELIMITER ;

/*
DROP PROCEDURE IF EXISTS `importYGtoSys`;
CREATE PROCEDURE `importYGtoSys`(in tablename varchar(50))
    COMMENT '将银谷 yg_hr yg_org数据同步至系统用户组织机构表'
begin

1、核实银谷用户是否在sys
2、插入sys_user、sys_org、sys_org_user
	  	
		declare 	temp_variable	varchar(20000) ;
		declare		v_id	varchar(100);
		declare		v_pid	varchar(100);
    declare  	len	int(10) ;
		declare  	v_done					int;
		declare one_cur CURSOR for 
		select  DISTINCT parentid  from  yg_org t where LENGTH(t.b01100)>25 and LENGTH(t.parentid) <25 order by LENGTH(t.parentid);
		declare continue handler for not FOUND set v_done=1; 
    # 错误处理；
		#declare exit handler for sqlexception 
		#begin
			#rollback;
			#insert into log_info(MODULE_NAME,CREATED,PARAM_INFO) values('importYGtoSys',CURRENT_TIMESTAMP,'error');
			#commit;
		#end;
	
	  set temp_variable=concat("drop TABLE if exists ",tablename ,'_temp');
		set @tempsql = temp_variable	;
		prepare exesql from @tempsql;
		execute exesql;

		if(tablename='sys_user') then
			
        #YG 转 1   PC 转 2，
			  # 插入用户到 sys_user_temp ;
				

        # 如果 sys_user_temp 不存在 就新建表
				set temp_variable=concat('CREATE TABLE if not exists ',tablename ,'_temp',"( ID bigint(18) NOT NULL AUTO_INCREMENT COMMENT '主键', ",
				"USER_NAME varchar(50) DEFAULT NULL COMMENT '姓名', ",
				" USER_NO varchar(50) DEFAULT NULL COMMENT '编码',",
				" LOGIN_NAME varchar(50) DEFAULT NULL COMMENT '登录名',",
				"	MOBILE varchar(50) DEFAULT NULL COMMENT '手机',",
				"SEX varchar(50) DEFAULT NULL COMMENT '性别',",
				" VALIDATE_STATE varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',",
				"CARD_NO varchar(50) DEFAULT NULL COMMENT '证件号码',",
				"UUID varchar(100) DEFAULT '' COMMENT 'UUID'," ,
				" FULL_PATH varchar(500) DEFAULT '',",
				" PRIMARY KEY (ID),",
				" UNIQUE KEY IDX_SYS_USER_LOGIN_NAME (LOGIN_NAME)",
				" ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='系统用户临时表';");	
				set @tempsql = temp_variable	;
				prepare exesql from @tempsql;
				execute exesql;

    
		  #把 yg_hr中的 username长度小于25 的用户 的数据导入到sys_user_temp
			set temp_variable=concat("insert into ",tablename 

			,"_temp","(id,user_name,user_no,login_name,mobile,card_no,sex, validate_state,uuid,full_path) ",
			" select temp_use.userNo, temp_use.userName , temp_use.userNo,temp_use.logname, temp_use.molbile,temp_use.cardNo,",
			" temp_use.sex,temp_use.validate_state,temp_use.uuid, temp_use.fullpath from 	",
			"(select case when (LOWER(SUBSTR(t.username, 1 ,2))='yg')then  ", " 
			REPLACE(LOWER(t.username),'yg','1')",
			" when (LOWER(SUBSTR(t.username, 1 ,2))='pc') then"," 
			REPLACE(LOWER(t.username),'pc','2') when (LOWER(SUBSTR(t.username, 1 ,2))='ph') then REPLACE(LOWER(t.username),'ph','3') ELSE '' end userNo,",
      " t.a0101  userName, t.c0104 molbile, t.idCardNumber cardNo,
       case t.a0107 when '女' then '0'  when '男' then '1'  else '9' end sex, t.isDelete validate_state ,UPPER(t.username) logname,
			 t.uniqueId  uuid ,t.fullpath fullpath ",
			" from yg_hr t  where t.username !='' and t.username is not null  
			and t.isDelete='1' and LENGTH(t.e01a10) <38 and  t.e01a10<>'' and t.e01a10 is not null  ",
      "GROUP BY t.a0101 ) temp_use where  temp_use.userNo <> ''",
			"and  temp_use.userNo is not null ");	

			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;
		
			# 插入目标表；
			#把用户临时表的并 存 部门关系的用户导入到 sys_user 目标表中
      set temp_variable=concat("insert into sys_user(ID,USER_NAME,USER_NO,LOGIN_NAME ,MOBILE ,SEX, VALIDATE_STATE, CARD_NO, UUID,CREATE_DATE) ",
			"select  u.ID,u.USER_NAME,u.USER_NO ,u.LOGIN_NAME,u.MOBILE,u.SEX,u.VALIDATE_STATE,u.CARD_NO,u.UUID ,CURRENT_TIMESTAMP from  sys_user_temp u ",
			"INNER JOIN  sys_org_temp o ON  trim(u.FULL_PATH) = trim(o.remark)",
			" LEFT JOIN sys_user su ON u.USER_NO = su.USER_NO   where su.USER_NO is  null ");
			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;


    elseif(tablename='sys_org') then 
			# yg_org 的b01100 的值赋值给 b0110；
			#临时存放 至 b0110 以便后续update 
			set temp_variable=concat("update  yg_org set b0110 = b01100 ");
      select  count(*) into len from  yg_org where LENGTH(b01100)>30;
      if len>0 then 
			
			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;
      #把 机构编号为uuid 的数据的机构编号和父机构编号  转成2位编号
			open one_cur;
					cursor_loop: LOOP
						FETCH one_cur into v_pid;
							if v_done = 1 THEN leave cursor_loop; end if;
							call updateYGOrgRelation(v_pid);
					end loop;
			close one_cur;
      end if ;

			# 如果 sys_org_temp 不存在 就新建表
			set temp_variable=concat('CREATE TABLE if not exists ',tablename ,'_temp',"(ID bigint(18) NOT NULL AUTO_INCREMENT COMMENT '机构ID',",
			" ORG_CODE varchar(100) DEFAULT NULL COMMENT '机构编码',",
			" ORG_NAME varchar(100) DEFAULT NULL COMMENT '机构名称',",
			" FULL_NAME varchar(100) DEFAULT NULL COMMENT '机构全名',",
			"PARENT_ID varchar(100) DEFAULT NULL COMMENT '父机构ID',",
			" UUID varchar(100) DEFAULT NULL COMMENT 'UUID',",
			" remark varchar(500) DEFAULT NULL COMMENT '备注',",
			" PRIMARY KEY (ID)",
			") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='机构部门临时表';");	

			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;
		

			 #把 yg_org中的 b01100 长度小于25 的机构 的数据导入到 sys_org_temp 中， 并把 b01100 和 parentid 的机构编号用三位数字的规则转化成新的机构编号
			set temp_variable=concat("insert into ",tablename,"_temp " ,"(id, org_code, org_name ,full_name,parent_id, uuid, remark) ",
			" select  org.orgId,org.orgId,org.orgname,org.fullname,org.parentid,org.uniqueId,org.fullpath from  ",
			"(select  ",
			" case LENGTH(b01100)when  4 then  SUBSTR(b01100 , 2 , 3) ",
			" when 6 then CONCAT(SUBSTR(b01100 , 2 , 3),'',orgcalculate(SUBSTR(b01100 , 5 , 2))) ",
			" when 8 then CONCAT(SUBSTR(b01100 , 2 , 3),'',orgcalculate(SUBSTR(b01100 , 5 , 2)),orgcalculate(SUBSTR(b01100 , 7 , 2))) ",
			"when 10 then CONCAT(SUBSTR(b01100 , 2 , 3),'',orgcalculate(SUBSTR(b01100 , 5 , 2)),orgcalculate(SUBSTR(b01100 , 7 , 2)),orgcalculate(SUBSTR(b01100 , 9 , 2))) ",
			"else '' end orgId , ",
			"case LENGTH(parentid)when  4 then  SUBSTR(parentid , 2 , 3) ",
			"  when 6 then CONCAT(SUBSTR(parentid , 2 , 3),'',orgcalculate(SUBSTR(parentid , 5 , 2))) ",
			" when 8 then CONCAT(SUBSTR(parentid , 2 , 3),'',orgcalculate(SUBSTR(parentid , 5 , 2)),orgcalculate(SUBSTR(parentid , 7 , 2))) ",
			"when 10 then CONCAT(SUBSTR(parentid , 2 , 3),'',orgcalculate(SUBSTR(parentid , 5 , 2)),orgcalculate(SUBSTR(parentid , 7 , 2)),orgcalculate(SUBSTR(parentid , 9 , 2))) ",
			" else '' end parentid , ","fullname, fullpath,  uniqueId , codeitemdesc orgname from  yg_org   ",
			"where LENGTH(b0110)<25 and LENGTH(b0110)>2 and b01100 is not null and b01100 <> ''   GROUP BY b01100  ORDER BY b01100)org where org.orgId <>'' ");	
			
			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;



	   #把 yg_org中b01100 长度大于25的数据导入到 sys_org_temp 中， 并把 b01100 和 parentid 的机构编号用3位数字的规则转化成新的机构编号
			set temp_variable=concat("insert into ",tablename,"_temp " ,"(id, org_code, org_name ,full_name,parent_id, uuid, remark) ",

			 "select SUBSTR(b01100,2),SUBSTR(b01100,2),codeitemdesc, fullname,SUBSTR(parentid ,2) ,uniqueId,fullpath from  yg_org where LENGTH(b0110)>25",
				" and b01100 is not null and b01100 <> '' GROUP BY fullpath; " );	
			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;


			#把机构临时表中的机构导入到 sys_org 目标表中。
			 set temp_variable=concat("insert into sys_org (ID,ORG_CODE,ORG_NAME, ORG_TYPE, PARENT_ID,VALIDATE_STATE, UUID,remark ,CREATE_TIME) ",
				"select  o.ID,o.ORG_CODE, o.ORG_NAME,'org' ,o.PARENT_ID,'1',o.UUID,o.full_name,CURRENT_TIMESTAMP from  sys_org_temp o  LEFT JOIN sys_org so on o.ORG_CODE = so.ORG_CODE " ,
				" where so.ORG_CODE IS NULL" );
			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;

    elseif(tablename='sys_org_user') then
			## 如果 sys_org_user_temp 不存在 就新建表   
			set temp_variable=concat('CREATE TABLE if not exists ',tablename ,'_temp',"(ID bigint(18) NOT NULL AUTO_INCREMENT COMMENT '主键',",
			" ORG_ID bigint(18) DEFAULT NULL COMMENT '机构ID',",
			"	USER_ID bigint(18) DEFAULT NULL COMMENT '用户ID',",
			" PRIMARY KEY (ID)",
			" ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='员工归属机构部门临时表';");

			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;
			# sys_user_temp，sys_org_temp关联 把用户和机构关联的数据导入到 sys_org_user_temp 表中；
			set temp_variable=concat("insert into ", tablename,'_temp'," (ORG_ID,USER_ID)",
			" select o.ORG_CODE, u.USER_NO  from sys_user_temp u, sys_org_temp o where u.full_path = o.remark;"	);
			set @tempsql = temp_variable	;
			prepare exesql from @tempsql;
			execute exesql;
			
		
			#把机构 用户 关联临时表中的机构用户关联数据导入到 sys_org_user 目标表中。
			 set temp_variable=concat("insert into sys_org_user (ORG_ID,USER_ID)  ",
				"select  u.ORG_ID,u.USER_ID  from  sys_org_user_temp  u LEFT JOIN sys_org_user o ON  u.ORG_ID = o.ORG_ID AND u.USER_ID = o.USER_ID ",
				"where  o.ORG_ID is null and o.USER_ID is null ");
				set @tempsql = temp_variable	;
				prepare exesql from @tempsql;
				execute exesql;
    end if;
   
	 	  
	end;
*/

DROP FUNCTION IF EXISTS `orgcalculate`;

CREATE  FUNCTION `orgcalculate`(`name` varchar(10))
 RETURNS int(6)
BEGIN

  DECLARE retValue VARCHAR(6) ;
  if (name = '0A') then
     set retValue = "201";
  elseif (name="0B") then 
		set retValue = "202";
	elseif (name="0C") then 
		set retValue = "203";
	elseif (name="0D") then 
		set retValue = "204";
	elseif (name="0E") then 
		set retValue = "205";
	elseif (name="0F") then 
		set retValue = "206";
	elseif (name="0G") then 
		set retValue = "207";
	elseif (name="0H") then 
		set retValue = "208";
	elseif (name="0I") then 
		set retValue = "209";
	elseif (name="0J") then 
		set retValue = "210";
	elseif (name="0K") then 
		set retValue = "211";
	elseif (name="0L") then 
		set retValue = "212";
	elseif (name="0M") then 
		set retValue = "213";
	elseif (name="0N") then 
		set retValue = "214";
	elseif (name="0O") then 
		set retValue = "215";
	elseif (name="0P") then 
		set retValue = "216";
	elseif (name="0Q") then 
		set retValue = "217";
	elseif (name="0R") then 
		set retValue = "218";
	elseif (name="0S") then 
		set retValue = "219";
	elseif (name="0T") then 
		set retValue = "220";
	elseif (name="0U") then 
		set retValue = "221";
	elseif (name="0V") then 
		set retValue = "222";
	elseif (name="0W") then 
		set retValue = "223";
	elseif (name="0X") then 
		set retValue = "224";
	elseif (name="0Y") then 
		set retValue = "225";
	elseif (name="0Z") then 
		set retValue = "226";
	elseif (name="1A") then 
			set retValue = "227";
	elseif (name="1B") then 
			set retValue = "228";
	elseif (name="1C") then 
			set retValue = "229";
	elseif (name="1D") then 
			set retValue = "230";
	elseif (name="1E") then 
			set retValue = "231";
	elseif (name="1F") then 
			set retValue = "232";
	elseif (name="1G") then 
			set retValue = "233";
	elseif (name="1H") then 
			set retValue = "234";
	elseif (name="1I") then 
			set retValue = "235";
	elseif (name="1J") then 
			set retValue = "236";
	elseif (name="1K") then 
		set retValue = "237";
	elseif (name="1L") then 
		set retValue = "238";
	elseif (name="1M") then 
		set retValue = "239";
	elseif (name="1N") then 
		set retValue = "240";
	elseif (name="1O") then 
		set retValue = "241";
	elseif (name="1P") then 
		set retValue = "242";
	elseif (name="1Q") then 
		set retValue = "243";
	elseif (name="1R") then 
		set retValue = "244";
	elseif (name="1S") then 
		set retValue = "245";
	elseif (name="1T") then 
		set retValue = "246";
	elseif (name="1U") then 
			set retValue = "247";
	elseif (name="1V") then 
			set retValue = "248";
	elseif (name="1W") then 
			set retValue = "249";
	elseif (name="1X") then 
			set retValue = "250";
	elseif (name="1Y") then 
			set retValue = "251";
	elseif (name="1Z") then 
			set retValue = "252";
  else 
    set retValue = CONCAT("1","",name);
  end if;
		RETURN retValue;
END;

DROP PROCEDURE IF EXISTS `updateSysOrgRelation`;
CREATE  PROCEDURE `updateSysOrgRelation`(in in_id BIGINT(20) ,in in_level BIGINT(20))
    COMMENT '修复sys_org 相关信息'
begin

	declare  	v_id 				varchar(100);
	declare  	v_org_level	varchar(100);
	declare 	v_pids			varchar(100);
	declare  	v_done			int;
	
	declare one_cur CURSOR for 
	select t2.id, t2.ORG_LEVEL from sys_org t2 where 1=1 and t2.VALIDATE_STATE='1' and t2.PARENT_ID=in_id;
	
	declare continue handler for not FOUND set v_done=1;
	#设置递归查询层级
	#SET GLOBAL max_sp_recursion_depth=8;
/*错误处理；
	declare exit handler for sqlexception 
	begin
		rollback;
		insert into log_info(MODULE_NAME,CREATED,PARAM_INFO) values('updateSysOrgRelation',CURRENT_TIMESTAMP,concat(@@error_count,' errors'));
		commit;
	end;*/
	
/*修改第一级*/
	if in_level =1 THEN
		update sys_org t1 set t1.PARENT_ID='6' where t1.PARENT_ID ='';
		update sys_org t1 set t1.IS_LEEF='1';
		update sys_org t1 set  t1.PARENT_IDS=CONCAT('/',in_id,'/',t1.ID,'/') , t1.ORG_LEVEL=in_level ,t1.IS_LEEF ='0' where t1.PARENT_ID =in_id;
	ELSEIF in_level = 2 THEN
		select t1.PARENT_IDS into v_pids from sys_org t1 where t1.VALIDATE_STATE='1' and t1.ID=in_id;
		update sys_org t1 set  t1.PARENT_IDS=CONCAT(v_pids,t1.ID,'/') , t1.ORG_LEVEL=in_level ,t1.IS_LEEF ='0' where t1.PARENT_ID =in_id;
  ELSEIF in_level = 3 THEN
		select t1.PARENT_IDS into v_pids from sys_org t1 where t1.VALIDATE_STATE='1' and t1.ID=in_id;
		update sys_org t1 set  t1.PARENT_IDS=CONCAT(v_pids,t1.ID,'/') , t1.ORG_LEVEL=in_level ,t1.IS_LEEF ='0' where t1.PARENT_ID =in_id;
	ELSEIF in_level = 4 THEN
		select t1.PARENT_IDS into v_pids from sys_org t1 where t1.VALIDATE_STATE='1' and t1.ID=in_id;
		update sys_org t1 set  t1.PARENT_IDS=CONCAT(v_pids,t1.ID,'/') , t1.ORG_LEVEL=in_level ,t1.IS_LEEF ='0' where t1.PARENT_ID =in_id;
	ELSEIF in_level = 5 THEN
		select t1.PARENT_IDS into v_pids from sys_org t1 where t1.VALIDATE_STATE='1' and t1.ID=in_id;
		update sys_org t1 set  t1.PARENT_IDS=CONCAT(v_pids,t1.ID,'/') , t1.ORG_LEVEL=in_level ,t1.IS_LEEF ='0' where t1.PARENT_ID =in_id;
	end if;
	
	
	open one_cur;
		cursor_loop: LOOP
			FETCH one_cur into v_id,v_org_level ;

			if v_done = 1 THEN
				leave cursor_loop;
			end if;
			#SELECT CONCAT(v_id,'========');
			#update sys_org t1 set t1.IS_LEEF='0' where t1.PARENT_ID=v_id;
			call updateSysOrgRelation(v_id,2);
			
			
		end loop;

	CLOSE one_cur;
		 
end;

/*
DROP PROCEDURE IF EXISTS `updateYGOrgRelation`;
CREATE  PROCEDURE `updateYGOrgRelation`(in in_id varchar(100))
    COMMENT '修正yg_org 相关信息'
    
begin

	declare  	v_id 						varchar(100);
	declare 	v_unid		  		varchar(100);
	declare 	v_pids		  		varchar(100);
	declare  	v_done					int;
	declare  	v_num 	 				int;
	declare  	id_temp	 			varchar(100);

	declare one_cur CURSOR for 
	select  b01100, parentid,uniqueId  from  yg_org where LENGTH(b01100)>25 and  parentid = in_id ;
	
	declare continue handler for not FOUND set v_done=1;
   #设置  递归的层数
	SET @@max_sp_recursion_depth = 12; 
 
	set v_num = 10;
  
	open one_cur;
		cursor_loop: LOOP
			FETCH one_cur into v_id,v_pids,v_unid;

			if v_done = 1 THEN leave cursor_loop; end if;

			set id_temp = "";
			set v_num = v_num+1;
			set id_temp=CONCAT(v_pids,"",v_num);
		 
			update yg_org set b01100 =id_temp  where uniqueId = v_unid ;
			update yg_org set parentid =id_temp  where parentid = v_id ; 
			
			call updateYGOrgRelation(id_temp);
		
			
		end loop;

	close one_cur;
		 
end;
*/
-- ----------------------------
--  Records 
-- ----------------------------
