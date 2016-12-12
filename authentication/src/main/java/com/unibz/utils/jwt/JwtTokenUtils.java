package com.unibz.utils.jwt;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JwtTokenUtils {
	public String getUsernameFromToken(String token);
	public Boolean validateToken(String token);
	public String generateToken(UserDetails userDetails);
	public String generateToken(Map<String, Object> claims);
}
