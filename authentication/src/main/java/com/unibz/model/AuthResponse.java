package com.unibz.model;

public class AuthResponse {

	private String token;

	public AuthResponse(){}
	
	public AuthResponse(String token) {
		this.setToken(token);
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}