package com.ontimize.finants.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository("CategoryDao.xml")
@Lazy
@ConfigurationFile(configurationFile = "dao/CategoryDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class CategoryDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_CA_ID = "CA_ID";
    public static final String ATTR_CA_NAME = "CA_NAME";
    public static final String ATTR_CA_ISEXPENSES = "CA_ISEXPENSES";
    public static final String ATTR_CA_ISINCOMES = "CA_ISINCOMES";
    public static final String QUERY_CATEGORIES_EXPENSES= "categoriesExpenses";
    public static final String QUERY_CATEGORIES_INCOMES= "categoriesIncomes";

}
