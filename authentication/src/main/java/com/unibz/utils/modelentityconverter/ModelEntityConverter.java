package com.unibz.utils.modelentityconverter;

import com.unibz.exception.InvalidClassTypeException;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

@Service
public class ModelEntityConverter<T1, T2> {

	/**
	 * Given an input consisting of an object and a target class, the initial
	 * object is converted in the target one and all the fields' values are
	 * injected. This method is designed to convert Entity objects (created from
	 * daos' queries) in the mirror model.
	 * 
	 * @param initialClass
	 * @param targetClassType
	 * @return
	 * @throws InvalidClassTypeException
	 */
	public T2 entityModelConvert(T1 initialClass, Class<T2> targetClassType) throws InvalidClassTypeException {
		T2 convertedClass = null;

		try {
			convertedClass = (T2) targetClassType.newInstance();

			List<Method> getters = getMethodStartingWith(initialClass, "get");
			List<Method> setters = getMethodStartingWith(convertedClass, "set");

			if (getters.size() != setters.size())
				throw new InvalidClassTypeException(
						"The number of getters and setters of the Model and the Entity does not match.");

			for (int i = 0; i < getters.size(); i++) {
				try {
					setters.get(i).invoke(convertedClass,
							getters.get(i).invoke(initialClass, (Object[]) getters.get(i).getParameterTypes()));
				} catch (IllegalArgumentException | InvocationTargetException e) {
					throw new InvalidClassTypeException("Type mismatch between getters and setters.");
				}
			}
		} catch (InstantiationException | IllegalAccessException e) {
			throw new InvalidClassTypeException("Model/Entity of the given class cannot be instantiated.");
		}

		return convertedClass;
	}

	/**
	 * Auxiliary method for T1 entityModelConvert(T1 initialClass, Class<T1>
	 * targetClassType). Given a class and a string, it return a list of all the
	 * methods starting with the given string in the given class.
	 * 
	 * @param myClass
	 * @param startsWith
	 * @return
	 */
	private List<Method> getMethodStartingWith(Object myClass, String startsWith) {
		Comparator<Method> byName = (Method m1, Method m2) -> m1.getName().compareTo(m2.getName());

		Method[] rawMethods = myClass.getClass().getDeclaredMethods();
		List<Method> listOfGetters = new LinkedList<>();

		for (int i = 0; i < rawMethods.length; i++) {
			String methodName = rawMethods[i].getName();
			if (methodName.startsWith(startsWith)) {
				listOfGetters.add(rawMethods[i]);
			}
		}
		listOfGetters.sort(byName);

		return listOfGetters;
	}
}
