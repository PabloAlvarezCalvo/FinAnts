package com.ontimize.finants.model.debtSetting;

import com.ontimize.finants.model.core.dao.GroupDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class GroupBalance {

    private BigDecimal totalGroupAmount = BigDecimal.ZERO;
    private BigDecimal splitAmount = BigDecimal.ZERO;
    private final ArrayList<User> groupMembers;

    private List<SettlingMovement> movementList = new ArrayList<>();

    public GroupBalance(ArrayList<User> groupMembers) {
        this.groupMembers = groupMembers;
        this.calculateTotalAmount();
        this.calculateSplitAmount();
    }

    private void calculateTotalAmount() {
        groupMembers.forEach(u -> this.totalGroupAmount = this.totalGroupAmount.add(u.getTotalMovementAmount()));
    }

    private void calculateSplitAmount(){
        if (this.totalGroupAmount.compareTo(BigDecimal.ZERO) != 0) {
            //Expenses are negative movements, the sum should be negative
            //But is also possible to add group incomes even if not yet implemented
            this.splitAmount = this.totalGroupAmount.divide(new BigDecimal(this.groupMembers.size()), RoundingMode.HALF_EVEN);
            this.splitAmount = splitAmount.setScale(2, RoundingMode.HALF_EVEN);
        }
    }

    public EntityResult settlingBalance(){
        // Calculate group balance for each group member
        // Each user balance is the sum of its movements (what they theoretically paid)
        // minus how much they should pay
        this.groupMembers.forEach(u -> u.initializeBalances(this.splitAmount));

        // First, the user list is cloned and ordered in ascending order
        // That way users who owe the most money go first
        ArrayList<User> usersCloned = (ArrayList<User>) this.groupMembers.clone();
        usersCloned.sort(Comparator.comparing(User::getUpdatedBalance));

        // Due to operations with irrational numbers, rounding is needed and might be some difference between
        // total amount and calculated total of up to 0.01, to fix this, 0.01 is added to the amount
        // the user who is owed the most should receive
        BigDecimal calculatedTotalFromSplit =  this.splitAmount.abs().multiply(new BigDecimal(this.groupMembers.size()));
        if (this.totalGroupAmount.abs().compareTo(calculatedTotalFromSplit) != 0) {
            this.groupMembers.sort(Comparator.comparing(User::getUpdatedBalance).reversed());
            BigDecimal adjustCent = this.totalGroupAmount.abs().subtract(calculatedTotalFromSplit.abs());
            BigDecimal correctedAmount = this.groupMembers.get(0).getUpdatedBalance().add(adjustCent.abs());

            this.groupMembers.get(0).setUpdatedBalance(correctedAmount);
        }

        for (int i = 0; i < usersCloned.size(); i++) {
            User payer = usersCloned.get(i);
            BigDecimal payerShouldSend = payer.getUpdatedBalance().abs();

            // We skip users with positive balance, they don't have to pay to anyone
            while (payerShouldSend.compareTo(BigDecimal.ZERO) > 0) {
                // Original user list is sorted in reversed orderd, the user who is owed the most gets paid first
                this.groupMembers.sort(Comparator.comparing(User::getUpdatedBalance).reversed());
                User userToPay = this.groupMembers.get(0);
                BigDecimal recipientShouldReceive = userToPay.getUpdatedBalance().abs();

                // The amount payer has to pay should be compared in absolute values
                // to check if they owe more or less than userToPay is owed
                if (payerShouldSend.compareTo(recipientShouldReceive) >= 0) {
                    // Payer has to pay more than the recipient will receive, it will be split
                    BigDecimal amount = recipientShouldReceive;
                    userToPay.setUpdatedBalance(userToPay.getUpdatedBalance().subtract(amount));
                    payerShouldSend = payerShouldSend.subtract(amount);
                    payer.setUpdatedBalance(payer.getUpdatedBalance().add(amount));
                    this.movementList.add(new SettlingMovement(amount, payer, userToPay)); //For readability, quantities are better in positive values

                // If payer owes more than userToPay is owed, payer will split
                // their debt in two payments to two different users
                } else if (payerShouldSend.compareTo(recipientShouldReceive) < 0) {
                    // Payer pays all their money to userToPay, since it's not enough to cover the owed quantity
                    BigDecimal amount = payerShouldSend;
                    userToPay.setUpdatedBalance(userToPay.getUpdatedBalance().subtract(amount));
                    payerShouldSend = payerShouldSend.subtract(amount);
                    payer.setUpdatedBalance(payer.getUpdatedBalance().add(amount));
                    this.movementList.add(new SettlingMovement(amount, payer, userToPay)); //For readability, quantities are better in positive values

                }
            }
        }

        //Export movements as entity result
        /* Map<String, Object> = EntityResult
         * <ATTR_PAYER, List{"user1", "user2" ... "userN"}>
         * <ATTR_RECIPIENT,  List{"user1", "user2" ... "userN"}>
         * <ATTR_AMOUNT, List{"amount1", "amount2" ... "amountN"}
         */

        EntityResult settingMovements = new EntityResultMapImpl();
        List<String> payers = new ArrayList<>();
        List<String> recipients = new ArrayList<>();
        List<BigDecimal> amounts = new ArrayList<>();

        for (SettlingMovement m : this.movementList) {
            payers.add(m.getPayer().getName());
            recipients.add(m.getReceiver().getName());
            amounts.add(m.getAmount());
        }

        settingMovements.put(GroupDao.ATTR_PAYER, payers);
        settingMovements.put(GroupDao.ATTR_RECIPIENT, recipients);
        settingMovements.put(GroupDao.ATTR_AMOUNT, amounts);

        return settingMovements;
    }

}
