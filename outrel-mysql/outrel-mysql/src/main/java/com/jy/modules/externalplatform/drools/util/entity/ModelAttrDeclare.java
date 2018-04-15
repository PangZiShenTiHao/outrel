 package com.jy.modules.externalplatform.drools.util.entity;
 
 public class ModelAttrDeclare {
   private String fullModelName;
   private String modelName;
   private String attrName;
   
   public ModelAttrDeclare() {}
   
   public String getModelName() { return this.modelName; }
   
   public void setModelName(String modelName) {
     this.modelName = modelName;
   }
   
   public String getAttrName() { return this.attrName; }
   
   public void setAttrName(String attrName) {
     this.attrName = attrName;
   }
   
   public String getFullModelName() { return this.fullModelName; }
   
   public void setFullModelName(String fullModelName) {
     this.fullModelName = fullModelName;
   }
 }
