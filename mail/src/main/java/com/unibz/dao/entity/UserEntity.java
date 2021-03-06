package com.unibz.dao.entity;

import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

public class UserEntity implements UserDetails {
    private static final long serialVersionUID = 1L;

    @Id
    private String username;
    private String password;
    private String email;
    private Date lastPasswordReset;
//    private transient Collection<? extends GrantedAuthority> authorities;
    private Boolean accountNonExpired = true;
    private Boolean accountNonLocked = true;
    private Boolean credentialsNonExpired = true;
    private Boolean enabled = true;

    public UserEntity() {
    }

    public UserEntity( String username, String password ) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername( String username ) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword( String password ) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail( String email ) {
        this.email = email;
    }

    public Date getLastPasswordReset() {
        return this.lastPasswordReset;
    }

    public void setLastPasswordReset( Date lastPasswordReset ) {
        this.lastPasswordReset = lastPasswordReset;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

//    public void setAuthorities( Collection<? extends GrantedAuthority> authorities ) {
//        this.authorities = authorities;
//    }

    public Boolean getAccountNonExpired() {
        return this.accountNonExpired;
    }

    public void setAccountNonExpired( Boolean accountNonExpired ) {
        this.accountNonExpired = accountNonExpired;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.getAccountNonExpired();
    }

    public Boolean getAccountNonLocked() {
        return this.accountNonLocked;
    }

    public void setAccountNonLocked( Boolean accountNonLocked ) {
        this.accountNonLocked = accountNonLocked;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.getAccountNonLocked();
    }

    public Boolean getCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    public void setCredentialsNonExpired( Boolean credentialsNonExpired ) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.getCredentialsNonExpired();
    }

    public Boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled( Boolean enabled ) {
        this.enabled = enabled;
    }

    @Override
    public boolean isEnabled() {
        return this.getEnabled();
    }


    public UserEntity username( String username ) {
        this.username = username;
        return this;
    }

    public UserEntity password( String password ) {
        this.password = password;
        return this;
    }

    public UserEntity email( String email ) {
        this.email = email;
        return this;
    }

    public UserEntity lastPasswordReset( Date lastPasswordReset ) {
        this.lastPasswordReset = lastPasswordReset;
        return this;
    }

//    public UserEntity authorities( Collection<? extends GrantedAuthority> authorities ) {
//        this.authorities = authorities;
//        return this;
//    }

    public UserEntity accountNonExpired( Boolean accountNonExpired ) {
        this.accountNonExpired = accountNonExpired;
        return this;
    }

    public UserEntity accountNonLocked( Boolean accountNonLocked ) {
        this.accountNonLocked = accountNonLocked;
        return this;
    }

    public UserEntity credentialsNonExpired( Boolean credentialsNonExpired ) {
        this.credentialsNonExpired = credentialsNonExpired;
        return this;
    }

    public UserEntity enabled( Boolean enabled ) {
        this.enabled = enabled;
        return this;
    }

    @Override public String toString() {
        return "UserEntity{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", lastPasswordReset=" + lastPasswordReset +
//                ", authorities=" + authorities +
                ", accountNonExpired=" + accountNonExpired +
                ", accountNonLocked=" + accountNonLocked +
                ", credentialsNonExpired=" + credentialsNonExpired +
                ", enabled=" + enabled +
                '}';
    }
}
