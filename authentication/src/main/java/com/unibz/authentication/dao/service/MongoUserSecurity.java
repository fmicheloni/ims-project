package com.unibz.authentication.dao.service;

import com.unibz.authentication.dao.model.User;
import com.unibz.authentication.dao.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by fabriziomicheloni on 08/12/16.
 */
@Service
public class MongoUserSecurity implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(MongoUserSecurity.class);


    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("Loading user.");

        User user = repository.findOne(username);

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        logger.debug("User loaded.");

        return user;
    }
}