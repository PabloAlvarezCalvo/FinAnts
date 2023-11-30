package com.ontimize.finants.model.debtSetting;

import com.ontimize.finants.model.core.dao.MovementDao;
import com.ontimize.jee.common.dto.EntityResult;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class User {
    private String name;
    private final List<Movement> movements = new ArrayList<>();
    private BigDecimal totalMovementAmount = BigDecimal.ZERO;
    private BigDecimal originalBalance = BigDecimal.ZERO;
    private BigDecimal updatedBalance = BigDecimal.ZERO;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Movement> getMovements() {
        return movements;
    }

    public BigDecimal getUpdatedBalance() {
        return updatedBalance;
    }

    public BigDecimal getTotalMovementAmount() {
        return totalMovementAmount;
    }

    public void setTotalMovementAmount(BigDecimal totalMovementAmount) {
        this.totalMovementAmount = totalMovementAmount;
    }

    public BigDecimal getOriginalBalance() {
        return originalBalance;
    }

    public void setOriginalBalance(BigDecimal originalBalance) {
        this.originalBalance = originalBalance;
    }

    public void setUpdatedBalance(BigDecimal updatedBalance) {
        this.updatedBalance = updatedBalance;
    }

    public void initializeFromEntityResult(EntityResult entityResult) {
        try {
            int movementCount = ((List<Object>) entityResult.get(MovementDao.ATTR_MOV_AMOUNT)).size();

            for (int i = 0; i < movementCount; i++){
                String concept = (String)entityResult.getRecordValues(i).get(MovementDao.ATTR_MOV_CONCEPT);
                BigDecimal amount = (BigDecimal)entityResult.getRecordValues(i).get(MovementDao.ATTR_MOV_AMOUNT);

                Movement movement = new Movement(amount, concept);
                this.movements.add(movement);
            }

            if (!this.movements.isEmpty()) {
                BigDecimal totalMovements = BigDecimal.ZERO;

                for (Movement m : this.movements) {
                    totalMovements = totalMovements.add(m.getAmount());
                }

                this.totalMovementAmount = totalMovements;
            }

        } catch (Exception ex) {
            System.err.println(ex.getLocalizedMessage());
        }
    }

    public void initializeBalances(BigDecimal splitAmount){
        // Users receive the calculated split amount they should pay,
        // and balances are updated accordingly
        // Split amount is always a negative value (the equal amount each member should pay)
        // And then totalMovementAmount (which is also negative) is subtracted from it
        this.originalBalance = splitAmount.subtract(this.totalMovementAmount);
        this.updatedBalance = this.originalBalance;
    }
}
