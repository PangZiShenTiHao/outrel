package com.jy.modules.externalplatform.drools.util.entity;

import java.util.Set;

public class Rule {
  private String ruleName;
  private String when;
  private String then;
  private Set<String> modelSet;
  
  public Rule() {}
  
  public String getRuleName() { return this.ruleName; }
  
  public void setRuleName(String ruleName) {
    this.ruleName = ruleName;
  }
  
  public String getWhen() { return this.when; }
  
  public void setWhen(String when) {
    this.when = when;
  }
  
  public String getThen() { return this.then; }
  
  public void setThen(String then) {
    this.then = then;
  }
  
  public Set<String> getModelSet() { return this.modelSet; }
  
  public void setModelSet(Set<String> modelSet) {
    this.modelSet = modelSet;
  }
}