package com.unibz.dao.service.impl;

import com.google.gson.Gson;
import com.unibz.dao.entity.UserEntity;
import com.unibz.dao.repository.UserRepository;
import com.unibz.dao.service.UserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private static Logger logger = LoggerFactory.getLogger( UserDetailsServiceImpl.class );

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private UserRepository userRepository;

    @Value( "${queue.name}" )
    private String queueName;

    @Override
    public UserDetails loadUserByUsername( String username ) throws UsernameNotFoundException {
        UserEntity user = this.userRepository.findUserByUsername( username );

        if ( user == null ) {
            throw new UsernameNotFoundException( String.format( "No user found with username '%s'.", username ) );
        } else {
            return user;
        }
    }

    @Override
    public void saveUser( UserEntity user ) {
        userRepository.save( user );
        logger.debug( new Gson().toJson( user ) );
        rabbitTemplate.convertAndSend( queueName, new Gson().toJson( user ) );
    }
}
