package com.ontimize.finants.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IMemberGroupService {
    public EntityResult memberGroupQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult memberGroupInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    public EntityResult memberGroupUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult memberGroupDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult getMemberByMgId(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
