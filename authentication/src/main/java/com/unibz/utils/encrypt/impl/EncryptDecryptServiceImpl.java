package com.unibz.utils.encrypt.impl;


import com.unibz.utils.encrypt.EncryptDecryptService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class EncryptDecryptServiceImpl implements EncryptDecryptService {
	
	@Override
	public String encryptPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(8));
	}

	@Override
	public boolean decryptPassword(String password, String encrytedPassword) {
		return BCrypt.checkpw(password, encrytedPassword);
	}
}
