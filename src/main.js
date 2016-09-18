'use strct';

import { generatorTest, decoratorTest, asyncTest } from './demo';

/**
 * The main method for this demo application
 */
(function main() {
    asyncTest();
    generatorTest();
    decoratorTest();
}());
