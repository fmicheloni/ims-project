package com.unibz.model;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8754065711647644568L;
	
	private String role;
	
	public Role(String role) {
		this.role = role;
	}
	
	@Override
	public String getAuthority() {
		return this.role;
	}

}
