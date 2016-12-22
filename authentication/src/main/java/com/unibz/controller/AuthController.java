package com.unibz.controller;

import com.google.gson.Gson;
import com.unibz.model.AuthRequest;
import com.unibz.model.AuthResponse;
import com.unibz.utils.jwt.JwtTokenUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "/auth" )
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger( AuthController.class );

    @Value( "${jwt.token.header}" )
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtils tokenUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    @RequestMapping( method = RequestMethod.POST )
    public ResponseEntity<?> authenticationRequest( @RequestBody String requestBody )
            throws AuthenticationException {
        logger.debug( "New request for authentication." );

        // Perform the authentication
        AuthRequest authenticationRequest = null;

        try {
            logger.debug( "Authentication started." );

            authenticationRequest = new Gson().fromJson( requestBody, AuthRequest.class );

            Authentication authentication = this.authenticationManager
                    .authenticate( new UsernamePasswordAuthenticationToken( authenticationRequest.getUsername(),
                            authenticationRequest.getPassword() ) );
            SecurityContextHolder.getContext().setAuthentication( authentication );

            // Reload password post-authentication so we can generate token
            UserDetails userDetails = this.userDetailsService.loadUserByUsername( authenticationRequest.getUsername() );
            String token = this.tokenUtils.generateToken( userDetails );

            logger.debug( "Token created and new user authenticated: [{}]", authenticationRequest.getUsername() );

            return ResponseEntity.ok( new AuthResponse( token ) );
        } catch ( BadCredentialsException e ) {
            logger.debug( "Invalid credentials during authentication: [{}]", authenticationRequest.getUsername() );

            return ResponseEntity.status( 400 ).build();
        } catch ( Exception e ) {
            logger.debug( "Invalid request: {}", e.getMessage() );

            return ResponseEntity.status( 401 ).build();
        }
    }
}
