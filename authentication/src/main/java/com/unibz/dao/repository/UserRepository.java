package com.unibz.dao.repository;

import com.unibz.dao.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String> {
	public UserEntity findUserByUsername(final String className);
}
