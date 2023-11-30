package com.ontimize.finants.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository("GroupDao")
@ConfigurationFile(configurationFile = "dao/GroupDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class GroupDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_GR_ID = "GR_ID";
    public static final String ATTR_GR_NAME = "GR_NAME";
    public static final String ATTR_USER_ = "USER_";
    public static final String ATTR_GR_CREATION_DATE = "GR_CREATION_DATE";
    public static final String ATTR_GR_CHOOSE_MEMBERS = "GR_CHOOSE_MEMBERS";
    public static final String ATTR_MEMBER_BALANCE = "MEMBER_BALANCE";
    public static final String ATTR_PAYER = "PAYER";
    public static final String ATTR_RECIPIENT = "RECIPIENT";
    public static final String ATTR_AMOUNT = "AMOUNT";
    public static final String ATTR_SETTLING_MOVEMENTS = "SETTLING_MOVEMENTS";
    public static final String QUERY_GROUPS_BY_MEMBER = "groupsByMember";
    public static final String QUERY_GET_GROUP_MEMBERS = "getGroupMembers";
    public static final String QUERY_GROUP_MEMBERS_WITH_BALANCE = "groupMembersWithBalance";
    public static final String QUERY_GROUP_MOVEMENTS = "groupMovements";
    public static final String QUERY_AVAILABLE_USERS_FOR_GROUP = "availableUsersForGroup";
    public static final String QUERY_SETTLING_MOVEMENTS = "settlingMovements";
}
