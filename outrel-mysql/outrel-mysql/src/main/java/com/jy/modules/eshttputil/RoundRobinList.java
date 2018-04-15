package com.jy.modules.eshttputil;

import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;


public class RoundRobinList {
    private Iterator<String> iterator;

    private final Collection<String> elements;

    public RoundRobinList(String hostNames) {
        this.elements = Arrays.asList(hostNames.split(","));
        iterator = this.elements.iterator();
    }

    public synchronized String get() {
        if (iterator.hasNext()) {
            return iterator.next();
        }
        else {
            iterator = elements.iterator();
            return iterator.next();
        }
    }

    public int size() {
        return elements.size();
    }
}
