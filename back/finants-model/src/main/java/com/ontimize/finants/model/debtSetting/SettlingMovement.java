package com.ontimize.finants.model.debtSetting;

import java.math.BigDecimal;

public class SettlingMovement extends Movement{
    private User payer;
    private User receiver;

    public SettlingMovement(BigDecimal amount, User payer, User receiver) {
        super(amount);
        this.payer = payer;
        this.receiver = receiver;
    }

    public User getPayer() {
        return payer;
    }

    public void setPayer(User payer) {
        this.payer = payer;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

}
