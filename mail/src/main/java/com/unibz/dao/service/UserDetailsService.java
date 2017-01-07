package com.unibz.dao.service;

import com.unibz.dao.entity.UserEntity;

public interface UserDetailsService {
    public void saveUser( UserEntity user );
    public int updateUser( String username );
}
