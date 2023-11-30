package com.ontimize.finants.model.core.service;

import com.ontimize.finants.api.core.service.IGroupService;
import com.ontimize.finants.model.core.dao.GroupDao;
import com.ontimize.finants.model.core.dao.MemberGroupDao;
import com.ontimize.finants.model.core.dao.MovementDao;
import com.ontimize.finants.model.debtSetting.GroupBalance;
import com.ontimize.finants.model.debtSetting.User;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("GroupService")
public class GroupService implements IGroupService {

    @Autowired
    private GroupDao groupDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    private final MemberGroupService memberGroupService;
    private final MovementService movementService;
    private final UserService userService;

    @Autowired
    public GroupService(MemberGroupService memberGroupService, MovementService movementService, UserService userService) {
        this.memberGroupService = memberGroupService;
        this.movementService = movementService;
        this.userService = userService;
    }

    @Override
    public EntityResult groupQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.groupDao, keyMap, attrList);
    }

    @Override
    public EntityResult groupInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        Object localDate = attrMap.get(GroupDao.ATTR_GR_CREATION_DATE);
        if( localDate == null){
            attrMap.put(GroupDao.ATTR_GR_CREATION_DATE, LocalDate.now());
        }
        EntityResult result = this.daoHelper.insert(this.groupDao, attrMap);

        //Adding current user as the group's creator/admin
        addOwnerToGroup(result);

        return result;
    }

    @Override
    public EntityResult groupUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.groupDao, attrMap, keyMap);
    }

    @Override
    public EntityResult groupDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.groupDao, keyMap);
    }

    @Override
    public EntityResult getGroupMembersQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.groupDao, keyMap, attrList, GroupDao.QUERY_GET_GROUP_MEMBERS);
    }

    @Override
    public EntityResult groupsByMemberQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        keyMap.put(GroupDao.ATTR_USER_, this.daoHelper.getUser().getUsername());
        return this.daoHelper.query(this.groupDao, keyMap, attrList, GroupDao.QUERY_GROUPS_BY_MEMBER);
    }

    @Override
    public EntityResult groupsByMemberDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.groupDelete(keyMap);
    }

    @Override
    public EntityResult getAvailableMembersQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return userService.availableUsersForGroupQuery(keyMap, attrList);
    }

    @Override
    public EntityResult getGroupMovements(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        List<String> attrList = new ArrayList<>();
        attrList.add(MovementDao.ATTR_ID);
        attrList.add(MovementDao.ATTR_GR_ID);
        attrList.add(MovementDao.ATTR_MOV_AMOUNT);
        attrList.add(MovementDao.ATTR_MOV_CONCEPT);

        return this.groupMovementsQuery(keyMap, attrList);
    }

    @Override
    public EntityResult groupMembersWithBalanceQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {

        //Recover all group's movements
        EntityResult movements = this.getGroupMovements(keyMap);
        List<BigDecimal> movementsAmount = (List<BigDecimal>) movements.get(MovementDao.ATTR_MOV_AMOUNT);
        //Calculate group total expenses
        BigDecimal totalExpenses = this.calcBalance(movementsAmount);

        //Get group users
        List<String> attrGroupMembers = new ArrayList<>();
        attrGroupMembers.add(GroupDao.ATTR_USER_);
        attrGroupMembers.add(MemberGroupDao.ATTR_MG_ID);
        EntityResult groupMembers = this.getGroupMembersQuery(keyMap, attrGroupMembers);
        List<Object> members = (List<Object>)groupMembers.get(GroupDao.ATTR_USER_);
        List<Object> mgIds = (List<Object>)groupMembers.get(MemberGroupDao.ATTR_MG_ID);

        BigDecimal memberCount = new BigDecimal(members.size());

        //Group expenses are evenly distributed
        BigDecimal memberSplitBalance = totalExpenses.divide(memberCount, RoundingMode.HALF_EVEN);

        //Recomposing an entityresult with all users and balances
        EntityResult memberBalance = new EntityResultMapImpl();
        memberBalance.put(GroupDao.ATTR_USER_, members);
        memberBalance.put(MemberGroupDao.ATTR_MG_ID, mgIds);

        List<BigDecimal> userBalancesList = new ArrayList<>();
        for (String s : (List<String>)memberBalance.get(GroupDao.ATTR_USER_)){
            BigDecimal userExpenseToSubstract = this.getUserTotalExpense(keyMap, s);
            userBalancesList.add(memberSplitBalance.subtract(userExpenseToSubstract));
        }
        memberBalance.put(GroupDao.ATTR_MEMBER_BALANCE, userBalancesList);

        return memberBalance;
    }

    @Override
    public EntityResult groupMembersWithBalanceDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        EntityResult userMovements = getMovementsFromMgId(keyMap);

        //If the user has any movements, unlink them first
        if (!userMovements.isEmpty()) {
            Integer movementCount = ((List<BigDecimal>) userMovements.get(MovementDao.ATTR_MOV_AMOUNT)).size();

            for (int i = 0; i < movementCount; i++) {
                Map<String, Object> movId = new HashMap<>();
                movId.put(MovementDao.ATTR_ID, userMovements.getRecordValues(i).get(MovementDao.ATTR_ID));
                this.groupMovementsDelete(movId);
            }
        }
        //Then, delete the user
        return this.memberGroupService.memberGroupDelete(keyMap);
    }

    @Override
    public EntityResult groupMovementsQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.groupDao, keyMap, attrList, GroupDao.QUERY_GROUP_MOVEMENTS);
    }

    @Override
    public EntityResult groupMovementsDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        Map<String, Object> fieldToUpdate = new HashMap<>();
        fieldToUpdate.put(MovementDao.ATTR_GR_ID, null);
        return movementService.movementUpdate(fieldToUpdate, keyMap);
    }

    @Override
    public EntityResult getGroupMovementsByUser(Map<String, Object> keyMap, String user){
        keyMap.put(GroupDao.ATTR_USER_, user);
        return getGroupMovements(keyMap);
    }

    @Override
    public EntityResult availableUsersForGroupQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.userService.availableUsersForGroupQuery(keyMap, attrList);
    }

    @Override
    public EntityResult settlingMovementsQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        //EntityResult groupMovements = getGroupMovements(keyMap);
        List<String> membersAttrList = new ArrayList<>();
        membersAttrList.add(GroupDao.ATTR_USER_);
        EntityResult erGroupMembers = getGroupMembersQuery(keyMap, membersAttrList);

        ArrayList<User> members = new ArrayList<>();
        for (String userName : (List<String>)erGroupMembers.get(GroupDao.ATTR_USER_) ){
            User m = new User(userName);
            m.initializeFromEntityResult(getGroupMovementsByUser(keyMap, m.getName()));
            members.add(m);
        }

        GroupBalance groupBalance = new GroupBalance(members);

        return groupBalance.settlingBalance();
    }

    private EntityResult getMovementsFromMgId(Map<String, Object> keyMap){
        EntityResult eUser = this.memberGroupService.getMemberByMgId(keyMap);
        List<String> user = (List<String>)eUser.get(GroupDao.ATTR_USER_);
        List<Integer> group = (List<Integer>)eUser.get(GroupDao.ATTR_GR_ID);

        Map<String, Object> keyMapMovs = new HashMap<>();
        keyMapMovs.put(GroupDao.ATTR_GR_ID, group.get(0));

        return getGroupMovementsByUser(keyMapMovs, user.get(0));
    }

    private void addOwnerToGroup(EntityResult result) {
        Integer groupId = (Integer)result.get(GroupDao.ATTR_GR_ID);
        Map<String, Object> attrMapMembers = new HashMap<>();
        attrMapMembers.put(MemberGroupDao.ATTR_GR_ID, groupId);
        attrMapMembers.put(MemberGroupDao.ATTR_USER_, this.daoHelper.getUser().getUsername());
        attrMapMembers.put(MemberGroupDao.ATTR_IS_ADMIN, true);
        this.memberGroupService.memberGroupInsert(attrMapMembers);
    }

    public BigDecimal getUserTotalExpense(Map<String, Object> keyMap, String user){
        EntityResult userMovements = getGroupMovementsByUser(keyMap, user);
        return calcBalance((List<BigDecimal>)userMovements.get(MovementDao.ATTR_MOV_AMOUNT));
    }

    @NotNull
    private BigDecimal calcBalance(List<BigDecimal> listMovAmount)  {
        if(listMovAmount == null || listMovAmount.isEmpty()){
            return BigDecimal.ZERO;
        } else {
            BigDecimal aux = listMovAmount.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
            return aux;
        }
    }

}
