package com.unibz;

import com.unibz.filter.AuthFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
@EnableAutoConfiguration
@Configuration
public class GatewayApplication implements CommandLineRunner {

    private static Logger logger = LoggerFactory.getLogger( GatewayApplication.class );


    public static void main( String[] args ) {
        SpringApplication.run( GatewayApplication.class, args );
    }

    @Override
    public void run( final String... strings ) throws Exception {

    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    ///////////////////////////////////////////////////////////
    //                       ZUUL FILTERS                    //
    ///////////////////////////////////////////////////////////

    @Bean
    public AuthFilter authFilter( RestTemplate restTemplate, @Value( "${authentication.uri}" ) String authenticationUri ) {
        return new AuthFilter()
                .restTemplate( restTemplate )
                .authenticationUri( authenticationUri );
    }
}
