const assert = require('assert');

// Simple test to verify CI pipeline
function runTests() {
    try {
        assert.strictEqual(1 + 1, 2, 'Basic math should work');
        console.log('All tests passed.');
        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

runTests();
