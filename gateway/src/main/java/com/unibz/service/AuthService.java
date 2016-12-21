package com.unibz.service;

import org.springframework.web.client.RestTemplate;

/**
 * Created by fabriziomicheloni on 17/12/16.
 */
public class AuthService {

    private RestTemplate restTemplate;

    public boolean validateToken() {
        return true;
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
}
