package com.unibz.repository;

import com.unibz.entity.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by fabriziomicheloni on 22/12/16.
 */
public interface UserRepository extends CrudRepository<User, String> {
    public User findByUsername( String username);
}
