package com.ontimize.finants.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository("MemberGroupDao")
@ConfigurationFile(configurationFile = "dao/MemberGroupDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class MemberGroupDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_MG_ID = "MG_ID";
    public static final String ATTR_GR_ID = "GR_ID";
    public static final String ATTR_USER_ = "USER_";
    public static final String ATTR_IS_ADMIN = "MG_IS_ADMIN";
    public static final String DUPLICATED_MEMBER_ERROR = "DUPLICATED_MEMBER_ERROR";
    public static final String QUERY_GET_MGID_FROM_MEMBER_GROUP = "getMgIdFromMemberGroup";
}
