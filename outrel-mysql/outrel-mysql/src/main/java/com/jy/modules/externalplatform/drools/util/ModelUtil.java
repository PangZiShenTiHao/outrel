package com.jy.modules.externalplatform.drools.util;

import com.jy.modules.externalplatform.drools.util.entity.ModelAttrDeclare;

public class ModelUtil {
	public ModelUtil() {
	}
	public static String converterToGetMethod(String modelAttr) {
		ModelAttrDeclare model = converterModelAndAttr(modelAttr);
		if (model != null) {
			String modelName = model.getModelName();
			String attrName = model.getAttrName();
			StringBuffer sb = new StringBuffer("");
			sb.append(modelName.substring(0, 1).toLowerCase());
			sb.append(modelName.substring(1));
			sb.append(".get");
			sb.append(attrName.substring(0, 1).toUpperCase());
			sb.append(attrName.substring(1));
			sb.append("()");
			return sb.toString();
		}
		return null;
	}

	public static String converterToModelAttr(String modelAttr) {
		ModelAttrDeclare model = converterModelAndAttr(modelAttr);
		if (model != null) {
			String modelName = model.getModelName();
			String attrName = model.getAttrName();
			StringBuffer sb = new StringBuffer("");

			sb.append(modelName.substring(0, 1).toLowerCase());
			sb.append(modelName.substring(1));
			sb.append(".");
			sb.append(attrName);
			return sb.toString();
		}
		return null;
	}

	public static ModelAttrDeclare converterModelAndAttr(String modelAttr) {
		ModelAttrDeclare model = null;
		if ((modelAttr != null) && (modelAttr.length() > 0)) {
			String[] array = modelAttr.split("\\.");
			if (array.length > 1) {
				model = new ModelAttrDeclare();
				model.setModelName(array[(array.length - 2)]);
				model.setAttrName(array[(array.length - 1)]);
				model.setFullModelName(modelAttr.substring(0,modelAttr.lastIndexOf(".")));
			}
		}
		return model;
	}
}
