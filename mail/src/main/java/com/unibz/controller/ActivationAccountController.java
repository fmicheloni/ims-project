package com.unibz.controller;

import com.unibz.dao.service.UserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ActivationAccountController {

    private static final Logger logger = LoggerFactory.getLogger( ActivationAccountController.class );

    @Autowired
    private UserDetailsService userDetailsService;

    @RequestMapping( value = "/activate/{username}", method = RequestMethod.GET )
    public ResponseEntity<?> validationController( @PathVariable String username ) {

        logger.debug( "Incoming request for account activation: [{}]", username );

        final int result = userDetailsService.updateUser( username );

        return ( result == 0 ) ? ResponseEntity.status( 200 ).build() : ResponseEntity.status( 400 ).build();
    }
}
