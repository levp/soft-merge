'use strict';

module.exports = softMerge;

/**
 * Performs a 'soft merge' by copying properties from sourceObject unto targetObject recursively.
 * This function differs from traditional merge behavior in that it will merge arrays, if both targetObject and
 * sourceObject hold an array for a given property.
 * @param targetObject {object} The object unto which properties will be copied.
 * @param sourceObject {object} The object from which properties will be read.
 */
function softMerge(targetObject, sourceObject) {
	const keyList = Object.keys(sourceObject);

	for (var i = 0; i < keyList.length; i++) {
		var key = keyList[i];
		var value = sourceObject[key];

		if (!targetObject.hasOwnProperty(key)) {
			// target object doesn't have such a key at all,
			// so just copy the value from the source object
			targetObject[key] = value;
			continue;
		}

		if (isPrimitive(value)) {
			// the source object value is primitive, which
			// means there's no point of any further actions
			// besides simply overriding the target object value
			targetObject[key] = value;
			continue;
		}

		var originalValue = targetObject[key];
		if (isPrimitive(originalValue)) {
			// the target object value is primitive, so just
			// override it with the source value
			targetObject[key] = value;
			continue;
		}

		// if this point has been reached then both 'originalValue'
		// and 'value' are objects, requiring a recursive merger
		softMerge(originalValue, value);
	}
}

/**
 *  Returns true if the specified value is one of the following:
 *  1. undefined
 *  2. null
 *  3. primitive number
 *  4. primitive boolean
 *  5. primitive string
 *
 *  otherwise returns false.
 */
function isPrimitive(value) {
	if (!value) {
		// catches undefined and null
		return true;
		// this also catches a few other values, but all of
		// them would be caught anyway in the next check
		// (except document.all, but that's just silly)
	}
	var type = typeof value;
	return type === 'number' || type === 'boolean' || type === 'string';
}