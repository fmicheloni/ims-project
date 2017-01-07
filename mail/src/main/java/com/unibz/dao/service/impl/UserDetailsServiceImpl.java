package com.unibz.dao.service.impl;

import com.unibz.dao.entity.UserEntity;
import com.unibz.dao.repository.UserRepository;
import com.unibz.dao.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveUser( UserEntity user ) {
        userRepository.save( user );
    }


    @Override
    @Transactional
    public int updateUser( final String username ) {
        final UserEntity userByUsername = userRepository.findUserByUsername( username );

        if ( userByUsername.isEnabled() ) {
            return 1;
        }

        userByUsername.enabled( true );

        try {
            userRepository.save( userByUsername );
            return 0;
        } catch ( Exception e ) {
            return 1;
        }
    }
}
