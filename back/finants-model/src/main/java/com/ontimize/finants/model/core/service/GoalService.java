package com.ontimize.finants.model.core.service;

import com.ontimize.finants.api.core.service.IGoalService;
import com.ontimize.finants.model.core.dao.CategoryDao;
import com.ontimize.finants.model.core.dao.GoalDao;
import com.ontimize.finants.model.core.dao.MovementDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("GoalService")
public class GoalService implements IGoalService {

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Autowired
    private GoalDao goalDao;
    @Autowired
    private MovementService movementService;


    @Override
    public EntityResult goalQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.goalDao, keyMap, attrList);
    }

    @Override
    public EntityResult goalInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        Map<String, Object> attrMapFilterUser = new HashMap<>(attrMap);
        attrMapFilterUser.put(GoalDao.ATTR_USER_, daoHelper.getUser().getUsername());
        return this.daoHelper.insert(this.goalDao,attrMapFilterUser);
    }

    @Override
    public EntityResult goalUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        Map<String, Object> attrMapFilterUser = new HashMap<>(attrMap);
        attrMapFilterUser.put(GoalDao.ATTR_USER_, daoHelper.getUser().getUsername());
        return this.daoHelper.update(this.goalDao,attrMapFilterUser, keyMap);
    }

    @Override
    public EntityResult goalDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.goalDao, keyMap);
    }

    @Override
    public EntityResult goalsWithCategoryNameQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        Map<String, Object> keyMapFilterUser = new HashMap<>(keyMap);
        keyMap.put(GoalDao.ATTR_MOV_MONTH, LocalDate.now().getMonthValue());
        keyMap.put(GoalDao.ATTR_MOV_YEAR, LocalDate.now().getYear());
        keyMapFilterUser.put(GoalDao.ATTR_USER_, daoHelper.getUser().getUsername());
        return this.daoHelper.query(this.goalDao, keyMapFilterUser, attrList, GoalDao.QUERY_GOALS_WITH_CATEGORY_NAME);
    }

    @Override
    public EntityResult goalsWithCategoryNameUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.goalUpdate(attrMap, keyMap);
    }

    @Override
    public EntityResult goalsWithCategoryNameDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.goalDao, keyMap);
    }

    @Override
    public EntityResult goalsWithExpenseQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        Map<String, Object> keyMapFilterUser = new HashMap<>(keyMap);
        // Filtering by currnt user
        keyMapFilterUser.put(GoalDao.ATTR_USER_, daoHelper.getUser().getUsername());

        // Creating an attrList with required columns
        List<String> attrListGoal = new ArrayList<>();
        attrListGoal.add(GoalDao.ATTR_ID);
        attrListGoal.add(GoalDao.ATTR_GO_NAME);
        attrListGoal.add(GoalDao.ATTR_USER_);
        attrListGoal.add(GoalDao.ATTR_GO_AMOUNT);
        attrListGoal.add(GoalDao.ATTR_CA_ID);
        attrListGoal.add(CategoryDao.ATTR_CA_NAME);

        EntityResult goalsEntityResult = this.goalsWithCategoryNameQuery(keyMapFilterUser, attrListGoal);

        List<Double> expensesList = new ArrayList<>();
        List<Double> percentageList = new ArrayList<>();

        for (int i = 0; i < goalsEntityResult.calculateRecordNumber(); i++) {
            //For each goal, recover the category id and query the total amount spent by current user
            // in said category during current month, and operate to make the new columns for the table
            // with total spent and percentage spent (relative to the goal limit)

            Map<String,Object> record = goalsEntityResult.getRecordValues(i);
            Integer catId = (Integer) record.get(CategoryDao.ATTR_CA_ID); // Get category id

            // Filtering by cat id and current month/year
            Map<String, Object> keyMapFilterBalance = new HashMap<>();
            keyMapFilterBalance.put(CategoryDao.ATTR_CA_ID, catId);
            keyMapFilterBalance.put(MovementDao.ATTR_MOV_MONTH, LocalDate.now().getMonthValue());
            keyMapFilterBalance.put(MovementDao.ATTR_MOV_YEAR, LocalDate.now().getYear());
            // Quering for "TOTAL_SPENT"
            List<String> attrListBalances = new ArrayList<>();
            attrListBalances.add(GoalDao.ATTR_TOTAL_SPENT);
            EntityResult categoryTotalEntityResult = movementService.totalExpensesForCategoriesQuery(keyMapFilterBalance, attrListBalances);

            // If the recovered entity result has values, convert it to double and operate to
            // If it's null or empty, the user has no expenses in the current month for that category
            // and the values are set to 0.0
            List<BigDecimal> listCategoryTotals = (List<BigDecimal>)categoryTotalEntityResult.get(GoalDao.ATTR_TOTAL_SPENT);
            if (listCategoryTotals != null &&  !listCategoryTotals.isEmpty()) {
                double categoryTotal = listCategoryTotals.get(0).doubleValue();
                expensesList.add(categoryTotal);

                BigDecimal goalAmount = (BigDecimal) record.get(GoalDao.ATTR_GO_AMOUNT);
                percentageList.add(categoryTotal / goalAmount.doubleValue());
            } else {
                expensesList.add(0.0);
                percentageList.add(0.0);
            }

        }

        goalsEntityResult.put(GoalDao.ATTR_TOTAL_EXPENSE, expensesList);
        goalsEntityResult.put(GoalDao.ATTR_PERCENTAGE_EXPENSE,percentageList);

        return goalsEntityResult;
    }

}
