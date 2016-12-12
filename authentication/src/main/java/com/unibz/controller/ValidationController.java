package com.unibz.controller;

import com.unibz.utils.jwt.JwtTokenUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/validate")
public class ValidationController {
	
	@Autowired
	private JwtTokenUtils jwtTokenUtils;
	
	private static final Logger logger = LoggerFactory.getLogger(ValidationController.class);

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> validationController(@RequestBody String requestBody) {
		
		logger.debug("Incoming request for validation: [{}]", requestBody);
		
		boolean validationResult = jwtTokenUtils.validateToken(requestBody);
		
		return (validationResult) ? ResponseEntity.status(200).build() : ResponseEntity.status(401).build();
	}
}
