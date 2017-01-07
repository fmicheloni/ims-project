package com.unibz.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

public class User implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7040594268378587330L;
	
	private String username;
	private String password;
	private String email;
	private Date lastPasswordReset;
	private Collection<? extends GrantedAuthority> authorities;
	private Boolean accountNonExpired = true;
	private Boolean accountNonLocked = true;
	private Boolean credentialsNonExpired = true;
	private Boolean enabled = false;

    public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getLastPasswordReset() {
		return this.lastPasswordReset;
	}

	public void setLastPasswordReset(Date lastPasswordReset) {
		this.lastPasswordReset = lastPasswordReset;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public Boolean getAccountNonExpired() {
		return this.accountNonExpired;
	}

	public void setAccountNonExpired(Boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.getAccountNonExpired();
	}

	public Boolean getAccountNonLocked() {
		return this.accountNonLocked;
	}

	public void setAccountNonLocked(Boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.getAccountNonLocked();
	}

	public Boolean getCredentialsNonExpired() {
		return this.credentialsNonExpired;
	}

	public void setCredentialsNonExpired(Boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.getCredentialsNonExpired();
	}

	public Boolean getEnabled() {
		return this.enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public boolean isEnabled() {
		return this.getEnabled();
	}

	public User username(String username) {
		this.username = username;
		return this;
	}

	public User password(String password) {
		this.password = password;
		return this;
	}

	public User email(String email) {
		this.email = email;
		return this;
	}

	public User lastPasswordReset(Date lastPasswordReset) {
		this.lastPasswordReset = lastPasswordReset;
		return this;
	}

	public User authorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
		return this;
	}

	public User accountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
		return this;
	}

	public User accountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
		return this;
	}

	public User credentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
		return this;
	}

	public User enabled(boolean enabled) {
		this.enabled = enabled;
		return this;
	}

	@Override
	public String toString() {
		return "[username=" + username + ", password=" + password + ", email=" + email
				+ ", lastPasswordReset=" + lastPasswordReset + ", authorities=" + authorities
				+ ", accountNonExpired=" + accountNonExpired + ", accountNonLocked=" + accountNonLocked
				+ ", credentialsNonExpired=" + credentialsNonExpired + ", enabled=" + enabled + "]";
	}
}
