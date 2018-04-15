<#if rules??>
<#list rules as rule>
  package ${rule.ruleName}<#-- package 设置规则编码 -->
  import com.jy.modules.externalplatform.drools.InputParam; <#-- import 导入实体类 -->
  import com.jy.modules.externalplatform.drools.util.entity.DroolsResultDTO;
  global DroolsResultDTO droolsResultDTO
  rule "${rule.ruleName}"
    <#-- date-effective作用是用来控制规则只有在到达后才会触发，在规则运行时，引擎会自动拿当前操作系统的时候与 date-effective 设置的时间值进行比对， 只有当  系统时间>=date-effective 设置的时间值时，规则才会触发执行，否则执行将不执行。 -->
    <#-- date-expires 的作用是用来设置规则的有效期，引擎在执行规则的时候，会检查规则有没有 date-expires 属性，如果有的话，那么会将这个属性的值与当前系统时间进行比对,只有 系统时间<date-expires 设置的时间值，那么规则就执行，否则就不执行 -->
         date-effective "${dateV}" <#--生效日期-->
         date-expires  "${dateE}" <#--失效日期-->       
  when
      m: InputParam ${rule.when};
  then
      droolsResultDTO.setRetStatus(true);
  end
</#list>
</#if>