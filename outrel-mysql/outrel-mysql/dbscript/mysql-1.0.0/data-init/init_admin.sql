CREATE DEFINER=`root`@`localhost` PROCEDURE `init_sys_info`()
    COMMENT '初始化资源菜单角色用户组织机构'
begin
  
	declare userid 			bigint(18);  
	declare roleid 			bigint(18);
	declare roleuserid 	bigint(18);  
	declare orgid 			bigint(18);
	declare orguserid 	bigint(18);
	declare rroot 			bigint(18);
	declare rchild 			bigint(18);
	declare sroot 			bigint(18);
	declare troot 			bigint(18);
	declare mroot 			bigint(18);
	declare smroot 			bigint(18);
	declare tmroot 			bigint(18);
	
	set userid =0;  
  select auto_increment into userid FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_USER';
  
/*用户*/
INSERT INTO SYS_USER (ID, USER_NAME, USER_NO, LOGIN_NAME, PASSWORD, SALT, MOBILE, EMAIL, USER_IMAGE, SEX, BIRTHDAY, NATIONALITY, EDUCATION, JOB, HOME_ADDRESS, HOME_ZIPCODE, HOME_TEL, OFFICE_TEL, OFFICE_ADDRESS, ORDER_BY, VALIDATE_STATE, IS_LOCKED, VERSION) VALUES (1, '管理员', 'admin', 'admin', 'admin', '11', '13355254654', '1402944568@qq.com', '1', '1', '1958-12-01', '4', '高中', 'staff', 'uxyi', '100000', '0102', '0101', 'uxyio ', '1', '1', '0', '1414141722071');

select auto_increment into roleid FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_ROLE';

INSERT INTO SYS_ROLE (ID, ROLE_NAME, ROLE_CODE, ROLE_TYPE, APP_ID, VALIDATE_STATE, VERSION) VALUES (roleid, '管理员', 'admin', '0', null, '1', null);
/*OWQ3ZGQxZTQ2MjAyYjA5ZWNlNDg1OWJiYzhlNDhkZGU=
--111111aB*/

select auto_increment into roleuserid FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_ROLE_USER';

INSERT INTO SYS_ROLE_USER (ID, ROLE_ID, TARGET_ID, APP_ID, TARGET_TYPE, VALIDATE_STATE, VERSION) VALUES (roleuserid, roleid, 1, null, 'user', '1', null);

set orgid =6;

INSERT INTO SYS_ORG (ID, ORG_CODE, ORG_NAME, ORG_TYPE, PARENT_ID, PARENT_IDS, ORDER_BY, VALIDATE_STATE, IS_VIRTUAL, VERSION, APP_FLAG) VALUES (orgid, orgid, '捷越联合', 'org', '0', '', '1', '1', '1', '1416485544100', null);

 
select auto_increment into orguserid FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_ORG_USER';
 
INSERT INTO SYS_ORG_USER (ID, ORG_ID, USER_ID, POSITION_ID, IS_MAIN_ORG, VALIDATE_STATE, VERSION) VALUES (orguserid, orgid, 1, '1', '1', '1', '1');


 
select auto_increment into rroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rroot, '资源根节点', 'root', '', null, '0', null, null, '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';

INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '系统管理', 'module', '', null, rroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (mroot, '101', '系统管理', null, null, '0', '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set sroot =rchild;
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';

INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '菜单管理', 'url', '/sysMenu/prepareExecute/toTreePage', null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-01', '菜单管理', '333', null, mroot, '1', '1', '1', null, rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set troot =rchild;

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '菜单', 'button', null, 'ggg', troot, null, null, '1', '1');


select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';

INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '机构管理', 'module', null, null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-02', '机构管理', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set troot =rchild;

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '组织管理', 'url', '/sysOrg/prepareExecute/toTreePage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-02-01', '组织管理', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '用户管理', 'url', '/sysUser/prepareExecute/toManagePage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-02-02', '用户管理', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '岗位管理', 'url', '/sysPosition/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-02-03', '岗位管理', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '同步管理', 'url', '/synClient/prepareExecute/toSynManage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-02-03', '同步管理', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');


select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '操作权限', 'module', null, null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-06', '操作权限', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');
set troot =rchild;
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '角色组管理', 'url', '/sysRoleGroup/prepareExecute/toQueryPage', '1', troot, null, null, '1', '2');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-06-04', '角色组管理', '1', null, smroot, '4', '1', '1', null, rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '角色管理', 'url', '/sysRole/prepareExecute/toQueryMain', null, troot, null, null, '1', '2');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-06-01', '角色管理', null, null, smroot, '1', '1', '1', '1414740546193', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '资源管理', 'url', '/sysResource/prepareExecute/toTreePage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-06-02', '资源管理', null, null, smroot, '1', '1', '1', '1414980491644', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '角色资源授权管理', 'url', '/sysResource/prepareExecute/toRoleResource', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-06-03', '角色资源授权管理', null, null, smroot, '1', '1', '1', '1414980593081', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '流程管理', 'module', null, null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-08', '流程管理', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set troot =rchild;
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '设计流程', 'url', '/component/jbpm/temporaryJbpm4Info/queryTemporaryJbpm4Info.jsp', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-08-01', '设计流程', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '部署流程', 'url', '/component/jbpm/procDef.jsp', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-08-02', '部署流程', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '监控流程', 'url', '/component/jbpm/myProcessMonitor.jsp', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-08-03', '监控流程', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '定时任务', 'module', null, null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-09', '定时任务', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set troot =rchild;
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '任务查询', 'url', '/quartz/toQuartzList', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-09-01', '任务查询', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '任务分组', 'url', '/quartzTaskGroupDef/prepareExecute/toQueryGroupPage', null, troot, null, null, '1', '2');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-09-02', '任务分组', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '任务分组实例', 'url', '/quartzTaskGroupInstance/prepareExecute/toQueryGroupPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-09-03', '任务分组实例', null, null, smroot, '1', '1', '223', '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '实例日志', 'url', '/quartzTaskHis/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-09-04', '实例日志', null, null, smroot, '1', '1', '223', '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '业务权限管理', 'module', null, null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-10', '业务权限管理', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set troot =rchild;
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '业务权限注册', 'url', '/vmauthRegisterInfo/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-10-01', '业务权限注册', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '虚拟树管理', 'url', '/vmtreeInfo/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-10-02', '虚拟树管理', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '映射管理', 'url', '/vmruleMapping/prepareExecute/toQueryPage?orgtype=LC', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-10-03', '映射管理', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '业务用户配置', 'url', '/vmuserVmorgMap/prepareExecute/toManagePage?orgType=LC', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-10-04', '业务用户配置', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '数据权限查询', 'url', '/vmdataPriv/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-10-05', '数据权限查询', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '参数配置', 'url', '/sysConfig/prepareExecute/toQueryPage', null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-03', '参数配置', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '数据字典', 'url', '/sysDict/prepareExecute/toQueryMain', null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-04', '数据字典', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '日志审计', 'module', '/sysBizLog/prepareExecute/toQueryPage', null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-05', '日志审计', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '模板管理', 'url', '/sysTemplate/prepareExecute/toQueryPage', null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-11', '模板管理', null, null, mroot, '1', '1', '1', '1414586542697', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '消息管理', 'url', '/sysMessage/prepareExecute/toQueryPage', 'messagemanager', sroot, null, null, '1', '2');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-12', '消息管理', '12', null, mroot, '12', '1', '12', null, rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '我的消息', 'url', '/sysMessagecenter/prepareExecute/toQueryPage', 'sysmessage_center', sroot, null, null, '1', '2');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-13', '我的消息', '13', null, mroot, '13', '1', '13', '1416314721344', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '日志统计', 'url', '/sysLog/prepareExecute/toQueryLogPage', null, sroot, null, null, '1', '2');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-14', '日志统计', '13', null, mroot, '13', '1', '14', '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '安全策略', 'module', null, null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-15', '安全策略', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

  set troot =rchild;
/*
--select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
--INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '策略配置', 'url', '/sysStragy/prepareExecute/toUpdate', null, troot, null, null, '1', '1');
--INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-15-01', '策略配置', null, null, smroot, '1', '1', null, '1', rchild);
--INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');
*/

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '用户解锁', 'url', '/sysStragy/prepareExecute/toUnlock', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-15-02', '用户解锁', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');


select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '规则管理', 'module', null, null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-17', '规则管理', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set troot =rchild;
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '业务模型管理', 'url', '/sysRuleModel/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-17-01', '业务模型管理', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '规则配置', 'url', '/sysRuleList/prepareExecute/toManagePage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-17-02', '规则配置', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');


select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '开发工具', 'module', null, null, rroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-16', '开发工具', null, null, '0', '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

set troot =rchild;
select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '测试模块', 'url', '/testTable1/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-16-01', '测试模块', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '代码生成', 'url', '/generate/parpareQuery', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-16-02', '代码生成', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');

select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '请假流程审批', 'url', '/dojbpm/leaveDemoInfo/prepareExecute/toQueryPage', null, troot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_menu'), '101-16-03', '请假流程审批', null, null, smroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');


select auto_increment into rchild FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_RESOURCE';
select auto_increment into mroot FROM information_schema.`TABLES` WHERE  TABLE_NAME='SYS_MENU';
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES (rchild, '系统版本管理', 'url', '/sysVersion/prepareExecute/toQueryPage', null, sroot, null, null, '1', '1');
INSERT INTO SYS_MENU (ID, MENU_CODE, MENU_NAME, MENU_ICON, MENU_URL, PARENT_ID, ORDER_BY, VALIDATE_STATE, APP_ID, VERSION, RESOURCE_ID) VALUES (smroot, '101-18', '系统版本管理', null, null, mroot, '1', '1', null, '1', rchild);
INSERT INTO SYS_ACL (ID, ROLE_ID, RESOURE_ID, ACCESSIBILITY, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_acl'), roleid, rchild, '1', '1', '1', '1');




  
  
/*角色添加修改删除权限控制*/
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_resource'), '显示', 'button', null, 'platform/sysauth/sysRole/querySysRole:add', (select id from sys_resource a where a.resoure_name='角色管理'), null, null, '1', '2');
INSERT INTO SYS_RESOURCE (ID, RESOURE_NAME, RESOURE_TYPE, RESOURE_URL, PERMISSION, PARENT_ID, PARENT_IDS, APP_ID, VALIDATE_STATE, VERSION) VALUES ((SELECT auto_increment FROM information_schema.`TABLES` WHERE  TABLE_NAME='sys_resource'), '不显示', 'button', null, 'platform/sysauth/sysRole/querySysRole:next', (select id from sys_resource a where a.resoure_name='角色管理'), null, null, '1', '2');


commit; 
end