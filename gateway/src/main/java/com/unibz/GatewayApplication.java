package com.unibz;

import com.unibz.utils.FilterUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
public class GatewayApplication implements CommandLineRunner {

    private static Logger logger = LoggerFactory.getLogger( GatewayApplication.class );


    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    /**
     * Loads the file authpath.properties and adds all the properties to a static set of properties.
     * Such properties are used in the AuthFilter to check the authorization policy of every request.
     * @param strings
     * @throws Exception
     */
    @Override public void run( final String... strings ) throws Exception {
        File file = new File( "classpath:authpath.properties" );
        logger.info( " ------------ File exists: [{}] ------------", file.exists() );

        Properties prop = new Properties();
        try {
            prop.load( new FileInputStream( "authpath.properties" ) );
            FilterUtils.authPaths = prop.entrySet();

            for ( Object o : prop.keySet() ) {
                logger.info( "New auth path found: [{}]", o );
            }
        } catch ( IOException e ) {
            logger.error( "IOException while loading authpath.properties", e );
        }
    }
}
