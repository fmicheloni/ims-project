package com.unibz.filter;

import com.netflix.zuul.ZuulFilter;
import com.unibz.exception.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static com.unibz.utils.FilterUtils.*;

/**
 * Created by fabriziomicheloni on 17/12/16.
 */
public class AuthFilter extends ZuulFilter {

    private static Logger logger = LoggerFactory.getLogger( AuthFilter.class );

    private RestTemplate restTemplate;

    private String authenticationUri;

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 5;
    }

    @Override
    public boolean shouldFilter() {
        return shouldFilterAuth();
    }

    @Override
    public Object run() {
        logger.debug( "Filtering request for authentication." );

        try {
            String token = extractBearerTokenFromRequest();

            final boolean resultAuthentication = this.checkAuthenticatedRequest( token );

            logger.debug( "Result of authentication is [{}]", resultAuthentication );

            if ( resultAuthentication ) {
                logger.debug( "Request is authorized." );
            } else {
                logger.debug( "New unauthorized request." );
                setFailedRequest( "Unauthorized request.", 401 );
            }
        } catch ( UnauthorizedException e ) {
            // block request
            logger.debug( "Validation token is not valid." );
            setFailedRequest( "Missing authentication token.", 401 );
        }

        return null;
    }

    public AuthFilter restTemplate( RestTemplate restTemplate ) {
        this.restTemplate = restTemplate;
        return this;
    }

    public AuthFilter authenticationUri( String authenticationUri ) {
        this.authenticationUri = authenticationUri;
        return this;
    }


    private boolean checkAuthenticatedRequest( String token ) {
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<String>( token, headers );

            final ResponseEntity<String> exchange = this.restTemplate.exchange( this.authenticationUri, HttpMethod.POST, entity, String.class );

            logger.debug( "Status code for auth is [{}]", exchange.getStatusCode().value() );

            return exchange.getStatusCode().value() == 200;
        } catch ( Exception e ) {
            logger.debug( "Failed call for authentication.", e );
            return false;
        }
    }
}
