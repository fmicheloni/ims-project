package com.unibz.utils;

import com.netflix.zuul.context.RequestContext;
import com.unibz.exception.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by fabriziomicheloni on 17/12/16.
 */
public class FilterUtils {

    private static Logger logger = LoggerFactory.getLogger( FilterUtils.class );

    public static String extractBearerTokenFromRequest() throws UnauthorizedException {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        Cookie[] cookies = request.getCookies();

        String bearerToken = null;

        for ( Cookie c : cookies ) {
            if ( c.getName().equals( "Bearer" ) ) {
                bearerToken = c.getValue();
            }
        }

        if ( bearerToken == null ) {
            throw new UnauthorizedException( "Token not found." );
        }

        return bearerToken;
    }

    public static boolean shouldFilterAuth() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        logger.debug( "Computing should filter on [{}]", request.getRequestURI() );

        if ( request.getRequestURI().split( "/" )[ 2 ].equals( "public" ) ) {
            logger.debug( "Accessing public resource.", request.getRequestURI() );
            return false;
        }

        if ( request.getRequestURI().startsWith( "/authentication/" ) ) {
            logger.debug( "Authentication matches!", request.getRequestURI() );
            return false;
        }

        return true;
    }

    /**
     * Reports an error message given a response body and code.
     *
     * @param body
     * @param code
     */
    public static void setFailedRequest( String body, int code ) {
        RequestContext ctx = RequestContext.getCurrentContext();
        ctx.setResponseStatusCode( code );
        ctx.setResponseBody( body );
        ctx.setSendZuulResponse( false );
        throw new RuntimeException( "Code: " + code + ", " + body );
    }
}
