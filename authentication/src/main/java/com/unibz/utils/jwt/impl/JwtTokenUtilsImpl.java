package com.unibz.utils.jwt.impl;

import com.unibz.utils.jwt.JwtTokenUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtilsImpl implements JwtTokenUtils {

    @Value( "${jwt.token.secret}" )
    private String secret;

    @Value( "${jwt.token.expiration}" )
    private Long expiration;

    @Override
    public String getUsernameFromToken( String token ) {
        String username;
        try {
            final Claims claims = this.getClaimsFromToken( token );
            username = claims.getSubject();
        } catch ( Exception e ) {
            username = null;
        }
        return username;
    }

    private Date getExpirationDateFromToken( String token ) {
        Date expiration;
        try {
            final Claims claims = this.getClaimsFromToken( token );
            expiration = claims.getExpiration();
        } catch ( Exception e ) {
            expiration = null;
        }
        return expiration;
    }

    private Claims getClaimsFromToken( String token ) {
        Claims claims;
        try {
            claims = Jwts.parser().setSigningKey( this.secret ).parseClaimsJws( token ).getBody();
        } catch ( Exception e ) {
            claims = null;
        }
        return claims;
    }

    private Date generateCurrentDate() {
        return new Date( System.currentTimeMillis() );
    }

    private Date generateExpirationDate() {
        return new Date( System.currentTimeMillis() + this.expiration * 1000 );
    }

    private Boolean isTokenExpired( String token ) {
        final Date expiration = this.getExpirationDateFromToken( token );
        return expiration.before( this.generateCurrentDate() );
    }

    @Override
    public String generateToken( UserDetails userDetails ) {
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put( "sub", userDetails.getUsername() );
        claims.put( "created", this.generateCurrentDate() );
        claims.put( "username", userDetails.getUsername() );
        return this.generateToken( claims );
    }

    @Override
    public String generateToken( Map<String, Object> claims ) {
        return Jwts.builder().setClaims( claims ).setExpiration( this.generateExpirationDate() )
                .signWith( SignatureAlgorithm.HS512, this.secret ).compact();
    }

    @Override
    public Boolean validateToken( String token ) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey( secret )
                    .parseClaimsJws( token ).getBody();

            return claims.getSubject() != null && !( this.isTokenExpired( token ) );
        } catch ( Exception e ) {
            return false;
        }
    }
}
