package com.unibz.utils;

import com.netflix.zuul.context.RequestContext;
import com.unibz.exception.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Set;

/**
 * Created by fabriziomicheloni on 17/12/16.
 */
public class FilterUtils {

    private static Logger logger = LoggerFactory.getLogger( FilterUtils.class );


    public static Set<Map.Entry<Object, Object>> authPaths;

    static {

    }

    public static String extractHeaderFromRequest( String headerName ) throws UnauthorizedException {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        String bearerToken = request.getHeader( headerName );

        if ( bearerToken == null ) {
            throw new UnauthorizedException( "Token not found." );
        }

        return bearerToken;
    }

    public static void validateToken() {

    }
}
