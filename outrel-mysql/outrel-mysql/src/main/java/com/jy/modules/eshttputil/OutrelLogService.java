package com.jy.modules.eshttputil;

import org.springframework.stereotype.Service;

@Service("com.jy.modules.eshttputil.OutrelLogService")
public interface OutrelLogService {
    
    public boolean saveOutrelLog(OutrelLog log);
    
}
