package com.unibz.exception;

/**
 * Created by fabriziomicheloni on 08/12/16.
 */
public class InvalidClassTypeException extends Exception{

	/**
	 * Random serial version UID
	 */
	private static final long serialVersionUID = -1850281721538291606L;

	public InvalidClassTypeException() {
		super();
	}

	public InvalidClassTypeException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public InvalidClassTypeException(String message, Throwable cause) {
		super(message, cause);
	}

	public InvalidClassTypeException(String message) {
		super(message);
	}

	public InvalidClassTypeException(Throwable cause) {
		super(cause);
	}
	
}
