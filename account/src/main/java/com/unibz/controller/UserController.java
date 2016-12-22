package com.unibz.controller;

import com.google.gson.Gson;
import com.unibz.entity.User;
import com.unibz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by fabriziomicheloni on 22/12/16.
 */
@RestController
@RequestMapping( "/user" )
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping( method = RequestMethod.GET )
    public String findUser( @RequestParam( value = "username" ) String username) {
        User user = userService.findUserByUsername( username );
        Gson gson = new Gson();
        return gson.toJson( user );
    }
}
