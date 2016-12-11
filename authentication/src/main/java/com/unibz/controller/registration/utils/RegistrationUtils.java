package com.unibz.controller.registration.utils;

import com.google.gson.Gson;
import com.unibz.authentication.dao.model.User;
import com.unibz.exception.InvalidRequestBodyException;

/**
 * Created by fabriziomicheloni on 10/12/16.
 */
public class RegistrationUtils {
    private static final String EMAIL_REGEX = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    public static void validateUsername(String username) throws InvalidRequestBodyException {
        if (username == null)
            throw new InvalidRequestBodyException("Username is required.");

        if (username.length() < 8)
            throw new InvalidRequestBodyException("Length of username should be at least 8.");
    }

    public static void validatePassword(String password) throws InvalidRequestBodyException {
        if (password == null)
            throw new InvalidRequestBodyException("Password is required.");

        if (password.length() < 8)
            throw new InvalidRequestBodyException("Length of password should be at least 8.");
    }

    public static void validateEmail(String email) throws InvalidRequestBodyException {
        if (email == null)
            throw new InvalidRequestBodyException("Email is required.");

        if (!email.matches(EMAIL_REGEX))
            throw new InvalidRequestBodyException("Invalid email.");
    }

    public static User parseUserFromRequestBody(String registrationBody) throws Exception{
        User user = new Gson().fromJson(registrationBody, User.class);

        return user;
    }
}
