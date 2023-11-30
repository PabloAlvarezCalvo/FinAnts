package com.ontimize.finants.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository("MovementDao")
@ConfigurationFile(configurationFile = "dao/MovementDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class MovementDao extends OntimizeJdbcDaoSupport  {
        public static final String ATTR_ID = "MOV_ID";
        public static final String ATTR_MOV_CONCEPT = "MOV_CONCEPT";
        public static final String ATTR_MOV_AMOUNT = "MOV_AMOUNT";
        public static final String ATTR_MOV_DATE = "MOV_DATE";
        public static final String ATTR_CA_ID = "CA_ID";
        public static final String ATTR_USER_ = "USER_";
        public static final String ATTR_GR_ID = "GR_ID";
        public static final String ATTR_MOV_MONTH = "MOV_MONTH";
        public static final String ATTR_MOV_YEAR = "MOV_YEAR";
        public static final String ATTR_BALANCE = "balance";
        public static final String QUERY_EXPENSE_BALANCE = "expenseBalance";
        public static final String QUERY_INCOME_BALANCE = "incomeBalance";
        public static final String QUERY_SUM_AMOUNT_FOR_MONTH = "totalMovementsForCurrentMonth";
        public static final String QUERY_SUM_INCOMES_AMOUNT_FOR_MONTH ="totalIncomesForCurrentMonth";
        public static final String QUERY_SUM_EXPENSES_AMOUNT_FOR_MONTH ="totalExpensesForCurrentMonth";
        public static final String QUERY_TOTAL_EXPENSES_AMOUNT_DAY = "totalExpensesAmountDay";
        public static final String QUERY_TOTAL_INCOMES_AMOUNT_DAY = "totalIncomesAmountDay";
        public static final String QUERY_EXPENSES_FOR_CATEGORIES = "expensesForCategories";
        public static final String QUERY_INCOMES_FOR_CATEGORIES = "incomesForCategories";
        public static final String QUERY_TOTAL_EXPENSES_FOR_CATEGORIES = "totalExpensesForCategories";


}
