package com.unibz.controller.registration;


import com.unibz.controller.registration.utils.RegistrationUtils;
import com.unibz.dao.entity.UserEntity;
import com.unibz.dao.service.UserDetailsService;
import com.unibz.exception.InvalidClassTypeException;
import com.unibz.exception.UsernameAlreadyExistsException;
import com.unibz.model.Role;
import com.unibz.model.User;
import com.unibz.utils.modelentityconverter.ModelEntityConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping( "/registration" )
public class RegistrationController {

    @Autowired
    private ModelEntityConverter<User, UserEntity> modelEntityConverter;

    @Autowired
    private UserDetailsService userDetailsService;

    private BCryptPasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger( RegistrationController.class );

    @RequestMapping( method = RequestMethod.POST )
    public ResponseEntity<?> authenticationRequest( @RequestBody String registrationBody ) {
        logger.debug( "Starting registration POST." );

        User user = null;

        try {
            // parse json
            user = RegistrationUtils.parseUserFromRequestBody( registrationBody );

            // validate request's params
            RegistrationUtils.validateEmail( user.getEmail() );
            RegistrationUtils.validatePassword( user.getPassword() );
            RegistrationUtils.validateUsername( user.getUsername() );

            userDetailsService.loadUserByUsername( user.getUsername() );

            throw new UsernameAlreadyExistsException( "Username already exists." );
        } catch ( UsernameNotFoundException e ) {
            List<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
            auth.add( new Role( "USER" ) );

            passwordEncoder = new BCryptPasswordEncoder();

            user
                    .accountNonExpired( true )
                    .accountNonLocked( true )
                    .credentialsNonExpired( true )
                    .authorities( auth )
                    .enabled( false )
                    .lastPasswordReset( new Date() )
                    .password( passwordEncoder.encode( user.getPassword() ) );

            UserEntity userEntity = null;
            try {
                userEntity = ( UserEntity ) modelEntityConverter.entityModelConvert( user, UserEntity.class );
            } catch ( InvalidClassTypeException e1 ) {
                logger.error( "Invalid cast to UserEntity.", e1 );
            }

            userDetailsService.saveUser( userEntity );
        } catch ( UsernameAlreadyExistsException e ) {

            return ResponseEntity.status( 405 ).body( e.getMessage() );

        } catch ( Exception e ) {

            return ResponseEntity.status( 400 ).body( "Malformed body." );

        }
        return ResponseEntity.status( 200 ).body( "Succesfully registered!" );
    }
}
