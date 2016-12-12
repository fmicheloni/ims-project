package com.unibz.utils.encrypt;

public interface EncryptPassword {
	public String encryptPassword(String password);
	public boolean decryptPassword(String password, String encrytedPassword);
}
