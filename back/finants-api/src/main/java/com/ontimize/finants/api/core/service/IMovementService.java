package com.ontimize.finants.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;


import java.util.List;
import java.util.Map;

public interface IMovementService {

    public EntityResult movementQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult movementInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    public EntityResult movementUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult movementDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult totalMovementsForCurrentMonth(Map<String, Object> keyMap, List<String> attrList)throws OntimizeJEERuntimeException;
    public EntityResult totalIncomesForCurrentMonthQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult totalExpensesForCurrentMonthQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult insertExpenseInsert(Map<String, Object> attrMap)throws OntimizeJEERuntimeException;
    public EntityResult totalExpensesAmountDayQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult totalIncomesAmountDayQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult expensesForCategoriesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult incomesForCategoriesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult balanceQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult expenseBalanceQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult incomeBalanceQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult expensesForCategoriesUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult expensesForCategoriesDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult incomesForCategoriesUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult incomesForCategoriesDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult totalExpensesForCategoriesPreviousMonthQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult totalExpensesForCategoriesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
}

