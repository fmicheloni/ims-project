package com.unibz.authentication.dao.repository;

import com.unibz.authentication.dao.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by fabriziomicheloni on 08/12/16.
 */

@Repository
public interface UserRepository extends CrudRepository<User, String> {

}