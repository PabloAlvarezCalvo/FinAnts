package com.ontimize.finants.ws.core.rest;

import com.ontimize.finants.api.core.service.IRegisterService;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequestMapping("/app/public")
public class RegisterController extends ORestController<IRegisterService> {
    @Autowired
    private IRegisterService registerServ;

    @Override
    public IRegisterService getService() {
        return this.registerServ;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@RequestBody Map<String, Object> registrationData) {
        try {
            Map<String, Object> data = (Map<String, Object>) registrationData.get("data");
            EntityResult result = registerServ.registerInsert(data);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (OntimizeJEERuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

}
