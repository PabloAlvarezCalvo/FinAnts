package com.ontimize.finants.ws.core.rest;

import com.ontimize.finants.api.core.service.IGroupService;
import com.ontimize.finants.api.core.service.IMemberGroupService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/memberGroups")
public class MemberGroupRestController extends ORestController<IMemberGroupService> {
    @Autowired
    private IMemberGroupService memberGroupService;

    @Override
    public IMemberGroupService getService() {
        return this.memberGroupService;
    }
}
