package com.ontimize.finants.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IGoalService {
    public EntityResult goalQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult goalInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    public EntityResult goalUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult goalDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult goalsWithCategoryNameQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult goalsWithCategoryNameUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult goalsWithCategoryNameDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult goalsWithExpenseQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
}
