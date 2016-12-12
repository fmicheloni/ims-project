package com.unibz.exception;

public class InvalidRequestBodyException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6673711346189197635L;

	public InvalidRequestBodyException() {
		super();
	}

	public InvalidRequestBodyException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public InvalidRequestBodyException(String message, Throwable cause) {
		super(message, cause);
	}

	public InvalidRequestBodyException(String message) {
		super(message);
	}

	public InvalidRequestBodyException(Throwable cause) {
		super(cause);
	}
}
