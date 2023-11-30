package com.ontimize.finants.model.core.service;

import com.ontimize.finants.api.core.service.IMemberGroupService;
import com.ontimize.finants.model.core.dao.MemberGroupDao;
import com.ontimize.finants.model.core.dao.UserDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Lazy
@Service("MemberGroupService")
public class MemberGroupService implements IMemberGroupService {

    @Autowired
    private MemberGroupDao memberGroupDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult memberGroupQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.memberGroupDao, keyMap, attrList);
    }

    @Override
    public EntityResult memberGroupInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        try {
            return this.daoHelper.insert(this.memberGroupDao, attrMap);
        } catch (DuplicateKeyException ex) {
            EntityResult res = new EntityResultMapImpl();
            res.setCode(EntityResult.OPERATION_WRONG);
            res.setMessage(MemberGroupDao.DUPLICATED_MEMBER_ERROR);
            return res;
        }
    }

    @Override
    public EntityResult memberGroupUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.memberGroupDao, attrMap, keyMap);
    }

    @Override
    public EntityResult memberGroupDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.memberGroupDao, keyMap);
    }

    @Override
    public EntityResult getMemberByMgId(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        List<String> attrList = new ArrayList<>();
        attrList.add(MemberGroupDao.ATTR_USER_);
        attrList.add(MemberGroupDao.ATTR_GR_ID);
        return this.memberGroupQuery(keyMap, attrList);
    }
}
