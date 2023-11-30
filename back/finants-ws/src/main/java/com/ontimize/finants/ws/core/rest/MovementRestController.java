package com.ontimize.finants.ws.core.rest;

import com.ontimize.finants.api.core.service.IMovementService;
import com.ontimize.finants.model.core.dao.MovementDao;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/movements")

    public class MovementRestController extends ORestController<IMovementService> {
        @Autowired
        private IMovementService movementService;
        @Override
        public IMovementService getService() {
            return this.movementService;
        }
    }

