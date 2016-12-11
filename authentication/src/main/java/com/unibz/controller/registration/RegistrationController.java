package com.unibz.controller.registration;

import com.unibz.authentication.dao.model.User;
import com.unibz.authentication.dao.service.UserService;
import com.unibz.controller.registration.utils.RegistrationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by fabriziomicheloni on 10/12/16.
 */
@RestController
@RequestMapping("/registration")
public class RegistrationController {

    private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> prova() {
        return ResponseEntity.status(200).body("Succesfully registered!");
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> authenticationRequest(@RequestBody String registrationBody) {
        logger.debug("Starting registration POST.");
        User user = null;
        try {
            // parse json
            user = RegistrationUtils.parseUserFromRequestBody(registrationBody);

            // validate request's params
            RegistrationUtils.validateEmail(user.getEmail());
            RegistrationUtils.validatePassword(user.getPassword());
            RegistrationUtils.validateUsername(user.getUsername());

            userDetailsService.loadUserByUsername(user.getUsername());

            return ResponseEntity.status(400).body("Username " + user.getUsername() + " already exist.");
        } catch(UsernameNotFoundException e) {
            userService.create(user);

            return ResponseEntity.status(200).body("Succesfully registered!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Malformed body.");
        }
    }
}
