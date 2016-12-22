package com.unibz.service;

import com.unibz.entity.User;
import com.unibz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by fabriziomicheloni on 22/12/16.
 */

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findUserByUsername( String username ) {
        return userRepository.findByUsername( username );
    }

    public User saveUser( User user ) {
        return userRepository.save( user );
    }
}
