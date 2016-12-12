package com.unibz.dao.service.impl;

import com.unibz.dao.repository.UserRepository;
import com.unibz.dao.entity.UserEntity;
import com.unibz.dao.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    UserEntity user = this.userRepository.findUserByUsername(username);

	    if (user == null) {
	      throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
	    } else {
	    	return user;
	    }
	}
	
	@Override
	public void saveUser(UserEntity user) {
		userRepository.save(user);
	}
}
