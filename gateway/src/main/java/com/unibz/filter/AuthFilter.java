package com.unibz.filter;

import com.netflix.zuul.ZuulFilter;
import com.unibz.exception.UnauthorizedException;
import com.unibz.utils.FilterUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

/**
 * Created by fabriziomicheloni on 17/12/16.
 */
public class AuthFilter extends ZuulFilter {

    private static Logger logger = LoggerFactory.getLogger( AuthFilter.class );

    @Autowired
    private RestTemplate restTemplate;

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
        return true;
    }

    @Override
    public Object run() {
        try {
            logger.debug( FilterUtils.extractHeaderFromRequest( "" ) );
        } catch ( UnauthorizedException e ) {
            // block request
            logger.debug( "Validation token is not valid." );
        }
        return null;
    }
}
