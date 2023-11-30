package com.ontimize.finants.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ICategoryService {
    public EntityResult categoryQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult categoryInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    public EntityResult categoryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult categoryDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult categoriesExpensesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult categoriesIncomesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
}
