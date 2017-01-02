package com.unibz;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class AccountApplicationTests {

    private static Logger logger = LoggerFactory.getLogger( AccountApplicationTests.class );

    @Test
    public void testValidation() {
        RestTemplate restTemplate = new RestTemplate(  );

        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmbW" +
                "ljaGVsb25pIiwiY3JlYXRlZCI6MTQ4MzI5OTI2NzI2" +
                "OCwiZXhwIjoxNDg1ODkxMjY3LCJ1c2VybmFtZSI6Im" +
                "ZtaWNoZWxvbmkifQ.VKzB0YIZGYtVgoSuqIycKTfZk" +
                "5otwENT1pUy59DwfKoj29Hbcf8edPPvQWhFeqxKOGe" +
                "s6aAPYl1k_MFHhGLEew";

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>( token, headers );

        final ResponseEntity<String> exchange = restTemplate.exchange(
                "http://localhost:5001/validate",
                HttpMethod.POST, entity,
                String.class );

        logger.debug( "Status code for auth is [{}]", exchange.getStatusCode().value() );
    }
}
