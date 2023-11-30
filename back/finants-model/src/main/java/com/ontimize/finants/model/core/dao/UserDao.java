package com.ontimize.finants.model.core.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Lazy
@Repository(value = "UserDao")
@ConfigurationFile(
	configurationFile = "dao/UserDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")



public class UserDao extends OntimizeJdbcDaoSupport {


	private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	@Autowired
	public UserDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
	}
	public static final String USR_EMAIL    = "user_email";
	public static final String USR_PASSWORD = "user_password";

	public static final String ID            = "user_id";
	public static final String EMAIL         = "user_email";
	public static final String PASSWORD      = "user_password";
	public static final String NAME          = "user_name";
	public static final String SURNAME       = "user_surname";
	public static final String SCHEMA        = "db_schema";
	public static final String CREATION_DATE = "user_creation_date";
	public static final String DOWN_DATE     = "user_down_date";
	public static final String USER_         = "user_";
	public static final String QUERY_AVAILABLE_USERS = "availableUsersForGroup";

}
