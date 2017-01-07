package com.unibz;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by fabriziomicheloni on 05/12/16.
 */
@SpringBootApplication
public class MailApplication implements CommandLineRunner {

    private static Logger logger = LoggerFactory.getLogger( MailApplication.class );

    public static void main( String[] args ) {
        SpringApplication.run( MailApplication.class, args );
    }

    @Override public void run( final String... strings ) throws Exception {

    }
}
