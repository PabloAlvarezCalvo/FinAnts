package com.ontimize.finants.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.Map;

public interface IRegisterService {
    public EntityResult registerInsert(Map<String, Object> attrMap)throws OntimizeJEERuntimeException;
}
