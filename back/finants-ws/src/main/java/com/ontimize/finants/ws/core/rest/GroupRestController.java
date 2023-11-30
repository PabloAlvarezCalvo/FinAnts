package com.ontimize.finants.ws.core.rest;

import com.ontimize.finants.api.core.service.IGroupService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/groups")
public class GroupRestController extends ORestController<IGroupService> {

    @Autowired
    private IGroupService groupService;

    @Override
    public IGroupService getService() {
        return this.groupService;
    }
}
