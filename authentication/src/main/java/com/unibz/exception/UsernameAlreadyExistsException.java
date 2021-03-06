package com.unibz.exception;

public class UsernameAlreadyExistsException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3417570006912931856L;

	public UsernameAlreadyExistsException() {
		super();
	}

	public UsernameAlreadyExistsException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public UsernameAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public UsernameAlreadyExistsException(String message) {
		super(message);
	}

	public UsernameAlreadyExistsException(Throwable cause) {
		super(cause);
	}
}
