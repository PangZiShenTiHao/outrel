package com.jy.modules.externalplatform.drools.util;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.drools.KnowledgeBase;
import org.drools.KnowledgeBaseConfiguration;
import org.drools.KnowledgeBaseFactory;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderError;
import org.drools.builder.KnowledgeBuilderErrors;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.definition.KnowledgePackage;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;


public class DroolsUtil {

	public static HashMap<String, Object> doDrools(String drlPath,List insertObjects, HashMap globalServices) {
		KnowledgeBuilder kb = KnowledgeBuilderFactory.newKnowledgeBuilder();
		System.setProperty("drools.dateformat", "yyyy-MM-dd");
		kb.add(ResourceFactory.newClassPathResource(drlPath), ResourceType.DRL);
		Iterator<KnowledgeBuilderError> iter;
		if (kb.hasErrors()) {
			KnowledgeBuilderErrors kbErrors = kb.getErrors();
			for (iter = kbErrors.iterator(); iter.hasNext();) {
				System.out.println(iter.next());
			}
		}

		Collection<KnowledgePackage> kpackage = kb.getKnowledgePackages();

		KnowledgeBaseConfiguration kbconf = KnowledgeBaseFactory
				.newKnowledgeBaseConfiguration();
		kbconf.setProperty("org.drools.sequential", "true");
		KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase(kbconf);
		kbase.addKnowledgePackages(kpackage);

		StatefulKnowledgeSession kSession = kbase.newStatefulKnowledgeSession();
		if ((insertObjects != null) && (insertObjects.size() > 0)) {
			for (int i = 0; i < insertObjects.size(); i++) {
				kSession.insert(insertObjects.get(i));
			}
		}

		if ((globalServices != null) && (!globalServices.isEmpty())) {
			Iterator<String> serviceNames = globalServices.keySet().iterator();
			while (serviceNames.hasNext()) {
				String serviceName = (String) serviceNames.next();
				kSession.setGlobal(serviceName, globalServices.get(serviceName));
			}
		}

		HashMap<String, Object> results = new HashMap();
		kSession.setGlobal("results", results);

		kSession.fireAllRules();
		kSession.dispose();
		return results;
	}

	public static String isErrorInfo(String filePath) {
		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory
				.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource(filePath),
				ResourceType.DRL);

		String result = null;

		if (kbuilder.hasErrors()) {
			Iterator<KnowledgeBuilderError> it = kbuilder.getErrors()
					.iterator();
			while (it.hasNext()) {
				if (result == null) {
					result = ((KnowledgeBuilderError) it.next()).toString();
				} else
					result = result + "\r\n"
							+ ((KnowledgeBuilderError) it.next()).toString();
			}
		}
		return result;
	}
}
