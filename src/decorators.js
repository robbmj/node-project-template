/**
 * The param decorator will throw an exception if
 * the decorated function is called with incorrect
 * type arguments.
 *
 * @example
 * class DecoratorTest {
 *     @param('string', ['number', 'undefined'])
 *     @returns('string')
 *     decoratorTest(name, age) {
 *         age = age || '31, I think';
 *         return `${name} is ${age}`;
 *     }
 * }
 *
 * @param {...Array<String>|String} types - type arguments
 * @returns {Decorator}
 */
export function param(...types) {
    return function (target, key, descriptor) {
        return {
            value: function paramWrapper() {
                console.log('I am the "param" decorator');

                const args = Array.from(arguments);

                types.forEach((values, i) => {

                    const type = typeof args[i];

                    if (!Array.isArray(values)) {
                        values = [values];
                    }

                    if (!values.includes(type)) {
                        throw new TypeError(`${key} - ${type} is not one of ${values.join(', ')}`);
                    }
                });

                return descriptor.value.apply(this, arguments);
            }
        };
    };
}

/**
 * The returns decorator will throw an exception if
 * the decorated function returns the incorrect type.
 *
 * @example
 * class DecoratorTest {
 *     @param('string', ['number', 'undefined'])
 *     @returns('string')
 *     decoratorTest(name, age) {
 *         age = age || '31, I think';
 *         return `${name} is ${age}`;
 *     }
 * }
 *
 * @param {String} type - type argument
 * @returns {Decorator}
 */
export function returns(type) {
    return function (target, key, descriptor) {
        return {
            value: function paramWrapper() {
                console.log('I am the "returns" decorator');

                const ret = descriptor.value.apply(this, arguments),
                    retType = typeof ret;

                if (retType !== type) {
                    throw new TypeError(`${key} - Returned ${retType} expected ${type}`);
                }
                return ret;
            }
        };
    };
}
