package com.jy.modules.externalplatform.drools;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class InputParam
  implements Map<String, Object>
{
  private Map<String, Object> map = new HashMap<String, Object>();

  public int size() {
    return this.map.size();
  }

  public boolean isEmpty() {
    return this.map.isEmpty();
  }

  public boolean containsKey(Object key) {
    return this.map.containsKey(key);
  }

  public boolean containsValue(Object value) {
    return this.map.containsValue(value);
  }

  public Object get(Object key) {
    return this.map.get(key);
  }

  public Object put(String key, Object value) {
    return this.map.put(key, value);
  }

  public Object remove(Object key) {
    return this.map.remove(key);
  }

  public void putAll(Map<? extends String, ? extends Object> m) {
    this.map.putAll(m);
  }

  public void clear() {
    this.map.clear();
  }

  public Set<String> keySet() {
    return this.map.keySet();
  }

  public Collection<Object> values() {
    return this.map.values();
  }

  public Set<Map.Entry<String, Object>> entrySet() {
    return this.map.entrySet();
  }

  public boolean equals(Object o) {
    return this.map.equals(o);
  }

  public int hashCode() {
    return this.map.hashCode();
  }
}
