package com.ontimize.finants.model.core.service;

import com.ontimize.finants.api.core.service.ICategoryService;
import com.ontimize.finants.model.core.dao.CategoryDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("CategoryService")
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult categoryQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.categoryDao, keyMap, attrList);
    }

    @Override
    public EntityResult categoryInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.categoryDao, attrMap);
    }

    @Override
    public EntityResult categoryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.categoryDao, attrMap, keyMap);
    }

    @Override
    public EntityResult categoryDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.categoryDao, keyMap);
    }

    @Override
    public EntityResult categoriesExpensesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.categoryDao, keyMap, attrList,CategoryDao.QUERY_CATEGORIES_EXPENSES);
    }

    @Override
    public EntityResult categoriesIncomesQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.categoryDao, keyMap, attrList,CategoryDao.QUERY_CATEGORIES_INCOMES);
    }
}
