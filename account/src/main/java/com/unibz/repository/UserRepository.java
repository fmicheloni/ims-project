package com.unibz.repository;

import com.unibz.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by fabriziomicheloni on 22/12/16.
 */
public interface UserRepository extends CrudRepository<User, String> {
    public User findByUsername( String username);

    @Modifying
    @Query("update User user set user.picture = :picture where user.username = :username")
    public int updateProfilePicture( @Param("picture") String picture, @Param("username") String username );
}
