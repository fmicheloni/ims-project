package com.unibz;

import com.unibz.entity.User;
import com.unibz.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.SimpleDateFormat;

@SpringBootApplication
public class AccountApplication implements CommandLineRunner {
	public static void main(String[] args) {
		SpringApplication.run(AccountApplication.class, args);
	}

    private static Logger logger = LoggerFactory.getLogger( AccountApplication.class );

    @Autowired
    private UserService userService;

    @Override public void run( final String... strings ) throws Exception {
        // inserting a user for testing purpose only
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");

        User user = new User()
                .username( "fmicheloni" )
                .city( "Trento" )
                .dateOfBirth( sdf.parse("1994/02/01") )
                .country( "Italy" );

        User user1 = userService.saveUser( user );

        logger.debug( "User saved succesfully: [{}]", user1.toString() );
    }
}
