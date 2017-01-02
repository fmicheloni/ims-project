package com.unibz;

import com.unibz.dao.entity.UserEntity;
import com.unibz.dao.service.impl.UserDetailsServiceImpl;
import com.unibz.utils.encrypt.EncryptDecryptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.util.Date;

/**
 * Created by fabriziomicheloni on 05/12/16.
 */
@SpringBootApplication
@EnableDiscoveryClient
public class AuthenticationApplication implements CommandLineRunner {

    private static Logger logger = LoggerFactory.getLogger( AuthenticationApplication.class );

    @Autowired
    private EncryptDecryptService encryptDecryptService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public static void main( String[] args ) {
        SpringApplication.run( AuthenticationApplication.class, args );
    }

    @Override public void run( final String... strings ) throws Exception {

        // insert a default user for testing purposes
        final UserEntity userEntity = new UserEntity()
                .username( "fmicheloni" )
                .accountNonExpired( true )
                .accountNonLocked( true )
                .email( "fmicheloni@gmail.com" )
                .enabled( true )
                .lastPasswordReset( new Date() )
                .password( encryptDecryptService.encryptPassword( "ciao1234" ) );

        userDetailsService.saveUser( userEntity );

        logger.debug( "New user saved [{}]", userEntity );
    }
}
