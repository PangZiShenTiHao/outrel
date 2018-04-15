/*
Navicat MySQL Data Transfer

Source Server         : tttt
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : text

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2016-10-25 15:07:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for log_info
-- ----------------------------
DROP TABLE IF EXISTS `log_info`;
CREATE TABLE `log_info` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `USER_ID` varchar(50) DEFAULT NULL COMMENT '用户ID',
  `MODULE_NAME` varchar(100) DEFAULT NULL COMMENT '模块名称',
  `CONTROLLER_NAME` varchar(100) DEFAULT NULL COMMENT 'Controller名称',
  `METHOD_NAME` varchar(100) DEFAULT NULL COMMENT '方法名称',
  `PARAM_INFO` varchar(1000) DEFAULT NULL COMMENT '参数信息',
  `CREATED` date DEFAULT NULL COMMENT '生成日期',
  `URI` varchar(200) DEFAULT NULL COMMENT '请求地址',
  `log_type` varchar(1) DEFAULT NULL COMMENT '日志类型0：访问日志，1：系统日志',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log_info
-- ----------------------------

-- ----------------------------
-- Table structure for sys_acl
-- ----------------------------
DROP TABLE IF EXISTS `sys_acl`;
CREATE TABLE `sys_acl` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ROLE_ID` BIGINT(18) DEFAULT NULL COMMENT '角色ID',
  `RESOURE_ID` BIGINT(18) DEFAULT NULL COMMENT '资源ID',
  `ACCESSIBILITY` int(1) DEFAULT NULL COMMENT '1可访问，0拒绝访问',
  `APP_ID` BIGINT(18) DEFAULT NULL COMMENT '应用ID，备用',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作权限控制表';

-- ----------------------------
-- Records of sys_acl
-- ----------------------------

-- ----------------------------
-- Table structure for sys_area
-- ----------------------------
DROP TABLE IF EXISTS `sys_area`;
CREATE TABLE `sys_area` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `AREA_CODE` varchar(50) DEFAULT NULL COMMENT '区域编码',
  `AREA_NAME` varchar(100) DEFAULT NULL COMMENT '区域名称',
  `PARENT_ID` BIGINT(18) DEFAULT NULL COMMENT '父节点ID',
  `VALIDATE_STATE` varchar(1) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='行政区域';

-- ----------------------------
-- Records of sys_area
-- ----------------------------

-- ----------------------------
-- Table structure for sys_asyn_job
-- ----------------------------
DROP TABLE IF EXISTS `sys_asyn_job`;
CREATE TABLE `sys_asyn_job` (
  `id` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `bean_id` varchar(100) DEFAULT NULL COMMENT '业务实体beanId',
  `biz_key_id` varchar(100) DEFAULT NULL COMMENT '业务表主键ID',
  `job_state` varchar(2) DEFAULT NULL COMMENT '任务状态（1：待调用，0：已完成）',
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '任务调用开始时间',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '任务调用结束时间',
  `error_remark` varchar(4000) DEFAULT NULL COMMENT '任务异常描述',
  `VALID` int(2) DEFAULT NULL COMMENT '数据有效性(1：有效，0：无效)',
  `job_run` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '任务是否正在执行中 1：执行中，0:执行完成 或 未执行',
  `run_cun` varchar(200) DEFAULT NULL COMMENT '重复执行次数',
  `create_time` varchar(2) DEFAULT NULL COMMENT '数据新增时间',
  `remark` varchar(2) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='异步接口任务表';

-- ----------------------------
-- Records of sys_asyn_job
-- ----------------------------

-- ----------------------------
-- Table structure for sys_biz_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_biz_log`;
CREATE TABLE `sys_biz_log` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `CLIENT_IP` varchar(50) DEFAULT NULL COMMENT '客户端IP',
  `USER_ID` BIGINT(18) DEFAULT NULL COMMENT '操作人ID',
  `USER_NAME` varchar(2) DEFAULT NULL COMMENT '操作人姓名',
  `LOG_CONTENT` varchar(50) DEFAULT NULL COMMENT '日志内容',
  `LOG_TIME` date DEFAULT NULL COMMENT '插入时间',
  `LOG_TYPE` varchar(4000) DEFAULT NULL COMMENT '日志类型',
  `LOG_MODULE` varchar(50) DEFAULT NULL COMMENT '所属模块',
  `LOG_OPERATE` varchar(50) DEFAULT NULL COMMENT '操作类型',
  `VALIDATE_STATE` varchar(50) DEFAULT NULL COMMENT '有效性，1有效，0无效，默认1',
  `IS_ARCHIVE` varchar(2) DEFAULT NULL COMMENT '是否归档，1已归档，0未归档',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='业务日志表';

-- ----------------------------
-- Records of sys_biz_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_chanage_detail
-- ----------------------------
DROP TABLE IF EXISTS `sys_chanage_detail`;
CREATE TABLE `sys_chanage_detail` (
  `id` BIGINT(18) NOT NULL AUTO_INCREMENT,
  `biz_table_name` int(50) DEFAULT NULL COMMENT '信息变更表名称',
  `biz_table_colum` varchar(50) DEFAULT NULL COMMENT '表字段名称',
  `change_item_name` varchar(100) DEFAULT NULL COMMENT '变更信息描述',
  `old_value` varchar(200) DEFAULT NULL COMMENT '原值',
  `new_value` varchar(200) DEFAULT NULL COMMENT '新值',
  `old_showvalue` varchar(200) DEFAULT NULL COMMENT '原值描述',
  `new_showvalue` varchar(200) DEFAULT NULL COMMENT '新值描述',
  `fk_biz_id` BIGINT(18) DEFAULT NULL COMMENT '表主键ID',
  `bat_no` BIGINT(18) DEFAULT NULL COMMENT '批次号/流程实例ID',
  `state` varchar(100) DEFAULT NULL COMMENT '变更是否生效（1：生效,0:未生效）',
  `create_by` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建人',
  `owner_id` varchar(2) DEFAULT NULL COMMENT '业务所属人',
  `org_id` varchar(200) DEFAULT NULL COMMENT '业务所属机构',
  `create_time` BIGINT(18) DEFAULT NULL COMMENT '创建时间',
  `VALID` BIGINT(18) DEFAULT NULL COMMENT '数据有效性',
  `remark` BIGINT(18) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='变更信息明细表';

-- ----------------------------
-- Records of sys_chanage_detail
-- ----------------------------

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `CONFIG_NAME` varchar(100) DEFAULT NULL COMMENT '配置名称',
  `CONFIG_CODE` varchar(100) DEFAULT NULL COMMENT '配置CODE',
  `config_value` varchar(500) DEFAULT NULL,
  `CONFIG_TYPE` varchar(100) DEFAULT NULL COMMENT '类型，0系统级（不可删除），1项目级',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统配置表';

-- ----------------------------
-- Records of sys_config
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `DICT_CODE` varchar(50) DEFAULT NULL COMMENT '数据字典code',
  `DICT_NAME` varchar(50) DEFAULT NULL COMMENT '数据字典名称',
  `DICT_TYPE` varchar(50) DEFAULT NULL COMMENT '数据字典类型，0系统级（不可删除），1项目级',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据字典';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict_detail
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_detail`;
CREATE TABLE `sys_dict_detail` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `DICT_ID` BIGINT(18) DEFAULT NULL COMMENT '主键字典主键',
  `DICT_DETAIL_NAME` varchar(100) DEFAULT NULL COMMENT '数据名称',
  `DICT_DETAIL_VALUE` varchar(100) DEFAULT NULL COMMENT '数据值',
  `ORDER_BY` varchar(50) DEFAULT NULL COMMENT '排序',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据字典明细表';

-- ----------------------------
-- Records of sys_dict_detail
-- ----------------------------

-- ----------------------------
-- Table structure for sys_industry
-- ----------------------------
DROP TABLE IF EXISTS `sys_industry`;
CREATE TABLE `sys_industry` (
  `id` BIGINT(18) NOT NULL AUTO_INCREMENT,
  `industry_name` varchar(500) DEFAULT NULL COMMENT '行业名称/职位名称',
  `industry_type` varchar(10) DEFAULT NULL COMMENT 'industry:行业;position:职位',
  `parent_code` varchar(50) DEFAULT NULL COMMENT '职位所属的行(只对应职位数据有效)',
  `validate_state` varchar(1) DEFAULT NULL,
  `industry_code` varchar(50) DEFAULT NULL COMMENT '行业、职位编码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_industry
-- ----------------------------

-- ----------------------------
-- Table structure for sys_leave_info
-- ----------------------------
DROP TABLE IF EXISTS `sys_leave_info`;
CREATE TABLE `sys_leave_info` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `LEAVE_USER_ID` varchar(20) DEFAULT NULL COMMENT '请假人ID',
  `USER_LEVEL` varchar(200) DEFAULT NULL COMMENT '员工职级',
  `USER_NAME` varchar(50) DEFAULT NULL COMMENT '员工姓名',
  `ORG_NAME` varchar(200) DEFAULT NULL COMMENT '业务所属机构',
  `REASON` varchar(500) DEFAULT NULL COMMENT '事由',
  `EMAIL` varchar(100) DEFAULT NULL COMMENT '电子邮箱',
  `STATUS` varchar(4) DEFAULT NULL COMMENT '状态（1：正常   2：请假中）',
  `START_TIME` date DEFAULT NULL COMMENT '请假开始时间',
  `END_TIME` date DEFAULT NULL COMMENT '请假结束时间',
  `LEAVE_TYPE` varchar(2) DEFAULT NULL COMMENT '请假类型（1：代理请假，2：本人请假）',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '数据有效性（1：有效、0：无效）',
  `OWNER_ID` BIGINT(16) DEFAULT NULL COMMENT '业务归属人',
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `MODIFY_TIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `CREATE_BY` BIGINT(16) DEFAULT NULL COMMENT '创建人',
  `REMARK` varchar(500) DEFAULT NULL COMMENT '备注',
  `MODIFY_BY` BIGINT(16) DEFAULT NULL COMMENT '修改人',
  `ORG_ID` BIGINT(18) DEFAULT NULL COMMENT '业务所属机构',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='员工请假表';

-- ----------------------------
-- Records of sys_leave_info
-- ----------------------------

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `MENU_CODE` varchar(50) DEFAULT NULL COMMENT '菜单编码',
  `MENU_NAME` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `MENU_ICON` varchar(100) DEFAULT NULL COMMENT '菜单图标',
  `MENU_URL` varchar(100) DEFAULT NULL COMMENT '菜单URL',
  `PARENT_ID` varchar(50) DEFAULT NULL COMMENT '父菜单ID',
  `ORDER_BY` varchar(50) DEFAULT NULL COMMENT '排序',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `APP_ID` BIGINT(18) DEFAULT NULL COMMENT '系统ID，备用',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  `RESOURCE_ID` int(22) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单管理表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_message
-- ----------------------------
DROP TABLE IF EXISTS `sys_message`;
CREATE TABLE `sys_message` (
  `MSG_ID` int(20) NOT NULL AUTO_INCREMENT COMMENT '唯一标识，主键',
  `TITLE` varchar(100) DEFAULT NULL COMMENT '消息标题',
  `BODY` varchar(1000) DEFAULT NULL COMMENT '消息体',
  `URL` varchar(300) DEFAULT NULL COMMENT '消息链接，可为空',
  `CREATE_DATE` date DEFAULT NULL COMMENT '消息创建日期',
  `START_DATE` date DEFAULT NULL COMMENT '消息生效日期',
  `END_DATE` date DEFAULT NULL COMMENT '消息失效日期',
  `STATUS` char(1) DEFAULT NULL COMMENT '信息状态 0：初始；1：生效；2：失效；3：删除；default：0',
  `PUBLISHER` varchar(10) DEFAULT NULL COMMENT '消息发布者ID',
  `TYPE` char(1) DEFAULT NULL COMMENT '信息的类型 0：全局消息；1：专有消息',
  `CHARSET` varchar(10) DEFAULT NULL COMMENT '信息体的编码集',
  `URGENT_FLAG` char(1) DEFAULT NULL COMMENT '紧急标识 0:普通；1：紧急；2：特急 default:0',
  `SYS_FLAG` varchar(6) DEFAULT NULL COMMENT '标识归属于哪个系统；可取值范围：7/1/2/4/5/6/3，取值规则：type为0时该字段为111；001标识贷前；010标识贷后；100标识财富；以此类推101标识贷前和财富',
  PRIMARY KEY (`MSG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_message
-- ----------------------------

-- ----------------------------
-- Table structure for sys_message_his
-- ----------------------------
DROP TABLE IF EXISTS `sys_message_his`;
CREATE TABLE `sys_message_his` (
  `MSG_ID` int(20) NOT NULL AUTO_INCREMENT COMMENT '唯一标识，主键',
  `TITLE` varchar(100) DEFAULT NULL COMMENT '消息标题',
  `BODY` varchar(1000) DEFAULT NULL COMMENT '消息体',
  `URL` varchar(300) DEFAULT NULL COMMENT '消息链接，可为空',
  `CREATE_DATE` date DEFAULT NULL COMMENT '消息创建日期',
  `START_DATE` date DEFAULT NULL COMMENT '消息生效日期',
  `END_DATE` date DEFAULT NULL COMMENT '消息失效日期',
  `STATUS` char(1) DEFAULT NULL COMMENT '信息状态 0：初始；1：生效；2：失效；3：删除；default：0',
  `PUBLISHER` varchar(10) DEFAULT NULL COMMENT '消息发布者ID',
  `TYPE` char(1) DEFAULT NULL COMMENT '信息的类型 0：全局消息；1：专有消息',
  `CHARSET` varchar(10) DEFAULT NULL COMMENT '信息体的编码集',
  `URGENT_FLAG` char(1) DEFAULT NULL COMMENT '紧急标识 0:普通；1：紧急；2：特急 default:0',
  `SYS_FLAG` varchar(6) DEFAULT NULL COMMENT '标识归属于哪个系统；可取值范围：7/1/2/4/5/6/3，取值规则：type为0时该字段为111；001标识贷前；010标识贷后；100标识财富；以此类推101标识贷前和财富',
  PRIMARY KEY (`MSG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_message_his
-- ----------------------------

-- ----------------------------
-- Table structure for sys_org
-- ----------------------------
DROP TABLE IF EXISTS `sys_org`;
CREATE TABLE `sys_org` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '机构ID',
  `ORG_CODE` varchar(100) DEFAULT NULL COMMENT '机构编码',
  `ORG_NAME` varchar(100) DEFAULT NULL COMMENT '机构名称',
  `ORG_TYPE` varchar(10) DEFAULT NULL COMMENT '机构类型：org组织，dept部门',
  `PARENT_ID` varchar(100) DEFAULT NULL COMMENT '父机构ID',
  `PARENT_IDS` varchar(1000) DEFAULT NULL COMMENT '父机构ID串，以/分割',
  `ORDER_BY` varchar(50) DEFAULT NULL COMMENT '排序',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `IS_VIRTUAL` varchar(1) DEFAULT NULL COMMENT '是否是虚拟组织，1是，0否，默认0',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  `APP_FLAG` varchar(10) DEFAULT NULL COMMENT '应用标志',
  `IS_LEEF` varchar(1) DEFAULT NULL COMMENT '是否叶子节点',
  `AREA_CODES` varchar(50) DEFAULT NULL COMMENT '区域编码',
  `AREA_ADRESS` varchar(50) DEFAULT NULL COMMENT '区域名称',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='机构部门表';

-- ----------------------------
-- Records of sys_org
-- ----------------------------

-- ----------------------------
-- Table structure for sys_org_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_org_user`;
CREATE TABLE `sys_org_user` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ORG_ID` BIGINT(18) DEFAULT NULL COMMENT '机构ID',
  `USER_ID` BIGINT(18) DEFAULT NULL COMMENT '用户ID',
  `POSITION_ID` BIGINT(18) DEFAULT NULL COMMENT '岗位ID',
  `IS_MAIN_ORG` varchar(1) DEFAULT NULL COMMENT '是否主部门，1是（主部门），0否（兼职部门），默认1',
  `VALIDATE_STATE` varchar(1) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_org_user
-- ----------------------------

-- ----------------------------
-- Table structure for sys_position
-- ----------------------------
DROP TABLE IF EXISTS `sys_position`;
CREATE TABLE `sys_position` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `POSITION_NAME` varchar(18) DEFAULT NULL COMMENT '岗位名称',
  `POSITION_CODE` varchar(50) DEFAULT NULL COMMENT '岗位编码',
  `ORDER_BY` varchar(50) DEFAULT NULL COMMENT '排序',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='岗位定义表';

-- ----------------------------
-- Records of sys_position
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_auth_result
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_auth_result`;
CREATE TABLE `sys_prv_auth_result` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `USER_ID_FROM` BIGINT(18) DEFAULT NULL COMMENT '授权用户ID',
  `USER_ID_TO` BIGINT(18) DEFAULT NULL COMMENT '被授权用户ID',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性',
  `insert_from` varchar(18) DEFAULT NULL COMMENT '数据来源是哪个表。S是用户共享表，O是组织机构表，R是角色表。多个来源以'',''分开',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据权限授权结果表';

-- ----------------------------
-- Records of sys_prv_auth_result
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_biz_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_biz_user`;
CREATE TABLE `sys_prv_biz_user` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `USER_ID` BIGINT(18) DEFAULT NULL COMMENT '用户ID',
  `ORG_ID` BIGINT(18) DEFAULT NULL COMMENT '机构ID',
  `BIZ_ID` BIGINT(18) DEFAULT NULL COMMENT '业务ID',
  `TABLE_NAME` varchar(50) DEFAULT NULL COMMENT '业务表名',
  `ACTION_STATE` varchar(2) DEFAULT NULL COMMENT '操作状态，插入I，删除D',
  `SYN_STATE` varchar(2) DEFAULT NULL COMMENT '同步状态，未同步0，已同步1',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效状态，1有效，0无效，默认1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限注册表';

-- ----------------------------
-- Records of sys_prv_biz_user
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_org_auth
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_org_auth`;
CREATE TABLE `sys_prv_org_auth` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `USER_ID` BIGINT(18) DEFAULT NULL COMMENT '用户ID',
  `ORG_ID` BIGINT(18) DEFAULT NULL COMMENT '组织ID',
  `ACTION_STATE` varchar(2) DEFAULT NULL COMMENT '操作状态，插入I，删除D',
  `SYN_STATE` varchar(2) DEFAULT NULL COMMENT '同步状态，未同步0，已同步1',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效状态，1有效，0无效，默认1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组织授权表';

-- ----------------------------
-- Records of sys_prv_org_auth
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_role`;
CREATE TABLE `sys_prv_role` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ROLE_CODE` varchar(50) DEFAULT NULL COMMENT '角色CODE',
  `ROLE_NAME` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据权限角色定义';

-- ----------------------------
-- Records of sys_prv_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_role_auth
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_role_auth`;
CREATE TABLE `sys_prv_role_auth` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `USER_ID` BIGINT(18) DEFAULT NULL COMMENT '用户ID',
  `ROLE_ID` BIGINT(18) DEFAULT NULL COMMENT '角色ID',
  `ACTION_STATE` varchar(2) DEFAULT NULL COMMENT '操作状态，插入I，删除D',
  `SYN_STATE` varchar(2) DEFAULT NULL COMMENT '同步状态，未同步0，已同步1',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效状态，1有效，0无效，默认1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据权限角色授权表';

-- ----------------------------
-- Records of sys_prv_role_auth
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_role_resource`;
CREATE TABLE `sys_prv_role_resource` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ROLE_ID` BIGINT(18) DEFAULT NULL COMMENT '角色Id',
  `RESOURCE_ID` BIGINT(18) DEFAULT NULL COMMENT '资源ID',
  `RESOURCE_TYPE` varchar(10) DEFAULT NULL COMMENT '资源类型，机构org，用户user',
  `ACTION_STATE` varchar(2) DEFAULT NULL COMMENT '操作状态，插入I，删除D',
  `SYN_STATE` varchar(2) DEFAULT NULL COMMENT '同步状态，未同步0，已同步1',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效状态，1有效，0无效，默认1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据角色资源表';

-- ----------------------------
-- Records of sys_prv_role_resource
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_table_def
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_table_def`;
CREATE TABLE `sys_prv_table_def` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `TABLE_NAME` varchar(50) DEFAULT NULL COMMENT '表名称',
  `TABLE_DESC` varchar(500) DEFAULT NULL COMMENT '描述',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性，1有效，0无效，默认1',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UNI_SYS_DATA_PRV_TABLE` (`TABLE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据权限表定义';

-- ----------------------------
-- Records of sys_prv_table_def
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prv_user_share
-- ----------------------------
DROP TABLE IF EXISTS `sys_prv_user_share`;
CREATE TABLE `sys_prv_user_share` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `FROM_USER_ID` BIGINT(18) DEFAULT NULL COMMENT '共享用户ID',
  `TO_USER_ID` BIGINT(18) DEFAULT NULL COMMENT '被共享用户ID',
  `ACTION_STATE` varchar(2) DEFAULT NULL COMMENT '操作状态，插入I，删除D',
  `SYN_STATE` varchar(2) DEFAULT NULL COMMENT '同步状态，未同步0，已同步1',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效状态，1有效，0无效，默认1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据共享表';

-- ----------------------------
-- Records of sys_prv_user_share
-- ----------------------------

-- ----------------------------
-- Table structure for sys_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_resource`;
CREATE TABLE `sys_resource` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `RESOURE_NAME` varchar(200) DEFAULT NULL COMMENT '名称',
  `RESOURE_TYPE` varchar(50) DEFAULT NULL COMMENT '类型，url或button',
  `RESOURE_URL` varchar(200) DEFAULT NULL COMMENT 'URL地址',
  `PERMISSION` varchar(200) DEFAULT NULL COMMENT '权限标识',
  `PARENT_ID` varchar(50) DEFAULT NULL COMMENT '父ID',
  `PARENT_IDS` varchar(200) DEFAULT NULL COMMENT '父ID串，以/分割',
  `APP_ID` BIGINT(18) DEFAULT NULL COMMENT '应用ID，备用字段',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of sys_resource
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ROLE_NAME` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `ROLE_CODE` varchar(50) DEFAULT NULL COMMENT '角色编码',
  `ROLE_TYPE` varchar(1) DEFAULT NULL COMMENT '角色类型：0系统角色（不能删除），1项目自定义角色',
  `APP_ID` BIGINT(18) DEFAULT NULL COMMENT '系统ID，备用',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_group
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_group`;
CREATE TABLE `sys_role_group` (
  `id` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_group_name` varchar(100) DEFAULT NULL,
  `role_group_code` varchar(50) DEFAULT NULL COMMENT '角色组编码',
  `role_group_type` varchar(1) DEFAULT NULL COMMENT '角色组类型：备用，默认1',
  `app_id` BIGINT(18) DEFAULT NULL COMMENT '系统ID，备用',
  `validate_state` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `version` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色组';

-- ----------------------------
-- Records of sys_role_group
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_group_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_group_role`;
CREATE TABLE `sys_role_group_role` (
  `id` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` BIGINT(18) DEFAULT NULL COMMENT '角色ID',
  `role_group_id` BIGINT(18) DEFAULT NULL COMMENT '角色组ID',
  `app_id` BIGINT(18) DEFAULT NULL COMMENT '系统ID，备用',
  `validate_state` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `version` BIGINT(18) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色组角色中间表';

-- ----------------------------
-- Records of sys_role_group_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_user`;
CREATE TABLE `sys_role_user` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ROLE_ID` BIGINT(18) DEFAULT NULL COMMENT '角色ID',
  `TARGET_ID` BIGINT(18) DEFAULT NULL COMMENT '用户ID或者机构ID',
  `APP_ID` BIGINT(18) DEFAULT NULL COMMENT '系统ID，备用',
  `TARGET_TYPE` varchar(50) DEFAULT NULL COMMENT 'user用户类型,org机构类型',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色用户表';

-- ----------------------------
-- Records of sys_role_user
-- ----------------------------

-- ----------------------------
-- Table structure for sys_sms_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_sms_log`;
CREATE TABLE `sys_sms_log` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `TELEPHONE` varchar(20) DEFAULT NULL COMMENT '手机号',
  `MSG` varchar(200) DEFAULT NULL COMMENT '短信内容',
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `TYPE` varchar(3) DEFAULT NULL COMMENT '类型',
  `RET_CODE` varchar(10) DEFAULT NULL COMMENT '调用接口返回码',
  `RET_DESC` varchar(100) DEFAULT NULL COMMENT '调用发送返回信息',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='短信记录表';

-- ----------------------------
-- Records of sys_sms_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_template
-- ----------------------------
DROP TABLE IF EXISTS `sys_template`;
CREATE TABLE `sys_template` (
  `id` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '机构ID',
  `app_id` varchar(50) DEFAULT NULL COMMENT '系统ID',
  `template_no` varchar(50) DEFAULT NULL COMMENT '模板编码',
  `template_name` varchar(100) DEFAULT NULL COMMENT '模板名称',
  `template_type` varchar(2) DEFAULT NULL COMMENT '模板类型 1  短信 2邮件 9 其他',
  `template_content` blob COMMENT '模板内容',
  `validate_state` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `version` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模板';

-- ----------------------------
-- Records of sys_template
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `USER_NAME` varchar(50) DEFAULT NULL COMMENT '姓名',
  `USER_NO` varchar(50) DEFAULT NULL COMMENT '编码',
  `LOGIN_NAME` varchar(50) DEFAULT NULL COMMENT '登录名',
  `PASSWORD` varchar(50) DEFAULT NULL COMMENT '登录密码',
  `SALT` varchar(50) DEFAULT NULL COMMENT '盐值',
  `MOBILE` varchar(50) DEFAULT NULL COMMENT '手机',
  `EMAIL` varchar(50) DEFAULT NULL COMMENT '邮件',
  `USER_IMAGE` varchar(100) DEFAULT NULL COMMENT '用户头像',
  `SEX` varchar(50) DEFAULT NULL COMMENT '性别',
  `BIRTHDAY` varchar(50) DEFAULT NULL COMMENT '出生日期',
  `NATIONALITY` varchar(50) DEFAULT NULL COMMENT '民族',
  `EDUCATION` varchar(50) DEFAULT NULL COMMENT '学历',
  `JOB` varchar(100) DEFAULT NULL COMMENT '职务',
  `HOME_ADDRESS` varchar(100) DEFAULT NULL COMMENT '家庭住址',
  `HOME_ZIPCODE` varchar(50) DEFAULT NULL COMMENT '家庭邮编',
  `HOME_TEL` varchar(50) DEFAULT NULL COMMENT '家庭电话',
  `OFFICE_TEL` varchar(50) DEFAULT NULL COMMENT '办公电话',
  `OFFICE_ADDRESS` varchar(100) DEFAULT NULL COMMENT '办公地址',
  `ORDER_BY` varchar(50) DEFAULT NULL COMMENT '排序',
  `VALIDATE_STATE` varchar(2) DEFAULT NULL COMMENT '有效性状态，1有效，0无效，默认1',
  `IS_LOCKED` varchar(2) DEFAULT NULL COMMENT '是否锁定，1锁定，0未锁，默认0',
  `VERSION` BIGINT(16) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IDX_SYS_USER_LOGIN_NAME` (`LOGIN_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user_msg_relation
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_msg_relation`;
CREATE TABLE `sys_user_msg_relation` (
  `REL_ID` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `REL_STATUS` char(1) DEFAULT NULL COMMENT '信息状态：0：有效1：用户删除；default0',
  `USER_ID` varchar(10) DEFAULT NULL COMMENT '归属者ID',
  `READ_FLAG` char(1) DEFAULT NULL COMMENT '用户读取状态：0:未读；1：已读 default:0',
  `MSG_ID` int(20) DEFAULT NULL COMMENT '消息ID',
  PRIMARY KEY (`REL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_msg_relation
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user_msg_relation_his
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_msg_relation_his`;
CREATE TABLE `sys_user_msg_relation_his` (
  `REL_ID` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `REL_STATUS` char(1) DEFAULT NULL COMMENT '信息状态：0：有效1：用户删除；default0',
  `USER_ID` varchar(10) DEFAULT NULL COMMENT '归属者ID',
  `READ_FLAG` char(1) DEFAULT NULL COMMENT '用户读取状态：0:未读；1：已读 default:0',
  `MSG_ID` int(20) DEFAULT NULL COMMENT '消息ID',
  PRIMARY KEY (`REL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_msg_relation_his
-- ----------------------------

-- ----------------------------
-- Table structure for sys_version
-- ----------------------------
DROP TABLE IF EXISTS `sys_version`;
CREATE TABLE `sys_version` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `VERSION_NUM` varchar(50) DEFAULT NULL COMMENT '版本号',
  `VERSION_NAME` varchar(200) DEFAULT NULL COMMENT '版本名称',
  `VERSION_CONTENT` varchar(4000) DEFAULT NULL COMMENT '版本内容',
  `VERSION_TIME` varchar(50) DEFAULT NULL COMMENT '上线时间',
  `SYSTEM_STATE` varchar(50) DEFAULT NULL COMMENT '系统标志位',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统版本号表';

-- ----------------------------
-- Records of sys_version
-- ----------------------------

-- ----------------------------
-- Table structure for vmauth_register_info
-- ----------------------------
DROP TABLE IF EXISTS `vmauth_register_info`;
CREATE TABLE `vmauth_register_info` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `vmtree_code` varchar(50) DEFAULT NULL COMMENT '虚拟树代码',
  `vmtree_name` varchar(100) DEFAULT NULL COMMENT '虚拟树名称',
  `map_tab_name` varchar(100) DEFAULT NULL COMMENT '映射表名',
  `data_tab_name` varchar(100) DEFAULT NULL COMMENT '数据权限表名',
  `map_init_sql` varchar(4000) DEFAULT NULL COMMENT '映射表创建SQL',
  `data_init_sql` varchar(4000) DEFAULT NULL COMMENT '数据权限表创建SQL',
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `CREATE_BY` BIGINT(18) DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vmauth_register_info
-- ----------------------------

-- ----------------------------
-- Table structure for vmtree_info
-- ----------------------------
DROP TABLE IF EXISTS `vmtree_info`;
CREATE TABLE `vmtree_info` (
  `ORG_ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '序列或HR的OrgID',
  `Org_Name` varchar(200) DEFAULT NULL COMMENT '机构名称',
  `Org_Type` varchar(50) DEFAULT NULL COMMENT '虚拟树代码',
  `Parent_ID` BIGINT(18) DEFAULT NULL COMMENT '父节点ORG_ID',
  `Source_Type` varchar(10) DEFAULT NULL COMMENT '数据来源（XN/HR）',
  `End_Flag` varchar(2) DEFAULT NULL COMMENT '是否叶子节点（1：是，0：否）',
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `CREATE_BY` BIGINT(18) DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`ORG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='虚拟树表';

-- ----------------------------
-- Records of vmtree_info
-- ----------------------------

-- ----------------------------
-- Table structure for vmuser_vmorg_map
-- ----------------------------
DROP TABLE IF EXISTS `vmuser_vmorg_map`;
CREATE TABLE `vmuser_vmorg_map` (
  `ID` BIGINT(18) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `User_Id` BIGINT(18) DEFAULT NULL COMMENT '用户ID',
  `Org_Id` BIGINT(18) DEFAULT NULL COMMENT '虚拟树的Org_ID',
  `Org_Type` varchar(50) DEFAULT NULL COMMENT '虚拟树代码',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='员工虚拟组织关系表';

-- ----------------------------
-- Records of vmuser_vmorg_map
-- ----------------------------

-- ----------------------------
-- View structure for sys_data_prv
-- ----------------------------
DROP VIEW IF EXISTS `sys_data_prv`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost`  VIEW `sys_data_prv` AS select  t1.table_name,t1.biz_id,t1.user_id as create_user_id,t2.user_id_from as auth_user_id from SYS_PRV_BIZ_USER t1, SYS_PRV_AUTH_RESULT  t2 where t2.user_id_to=t1.user_id ;
