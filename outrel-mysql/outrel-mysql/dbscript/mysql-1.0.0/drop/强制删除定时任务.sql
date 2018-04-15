---通过 trigger_name 删除 quartz 的定时任务
--一个定时任务删除  三条数据
declare 

v_tri_name varchar2(100);
v_job_name varchar2(100);
begin 
v_tri_name :='task_name2_e97837d2-088d-4ccf-b2bb-dcceff37454f';---trigger_name

select t.job_name into v_job_name from qrtz_triggers t where t.trigger_name = v_tri_name;

--删除正在执行的 
delete from QRTZ_FIRED_TRIGGERS f where f.trigger_name= v_tri_name;
--删除 简单trigger
delete from QRTZ_SIMPLE_TRIGGERS st where st.trigger_name =v_tri_name;

delete from qrtz_cron_triggers ct where ct.trigger_name= v_tri_name;

delete from qrtz_triggers t where t.trigger_name= v_tri_name;


delete from qrtz_job_details j where j.job_name= v_job_name;


end;