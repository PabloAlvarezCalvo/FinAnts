package com.ontimize.finants.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository("GoalDao")
@ConfigurationFile(configurationFile = "dao/GoalDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class GoalDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "GO_ID";
    public static final String ATTR_USER_ = "USER_";
    public static final String ATTR_GO_NAME = "GO_NAME";
    public static final String ATTR_CA_ID = "CA_ID";
    public static final String ATTR_GO_AMOUNT = "GO_AMOUNT";
    public static final String ATTR_MOV_MONTH = "MOV_MONTH";
    public static final String ATTR_MOV_YEAR = "MOV_YEAR";
    public static final String ATTR_TOTAL_EXPENSE = "TOTAL_EXPENSE";
    public static final String ATTR_TOTAL_SPENT = "TOTAL_SPENT";
    public static final String ATTR_PERCENTAGE_EXPENSE = "PERCENTAGE_EXPENSE";
    public static final String QUERY_GOALS_WITH_CATEGORY_NAME = "goalsWithCategoryName";
}
