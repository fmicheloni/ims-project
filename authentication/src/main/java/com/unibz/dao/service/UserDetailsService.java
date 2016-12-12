package com.unibz.dao.service;

import com.unibz.dao.entity.UserEntity;

public interface UserDetailsService extends org.springframework.security.core.userdetails.UserDetailsService {
	public void saveUser(UserEntity user);
}
