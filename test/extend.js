import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Extend Operator', (it) => {
    it('does nothing when extending an object with an identical object', assert => transmute({ test: 'roar' })
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('extend an object with additional key/values when extended with a different object', assert => transmute({ test: 'roar' })
        .extend({ roar: 'test' })
        .then(value => assert.deepEqual(value, { test: 'roar', roar: 'test' }))
    );

    it('does nothing when extending an object with an object with the same key', assert => transmute({ test: 'roar' })
        .extend({ test: 'no' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('adds new children to a key that already exists', assert => transmute({ test: { deep: 'roar' } })
        .extend({ test: { extension: 'works' } })
        .then(value => assert.deepEqual(value, { test: { deep: 'roar', extension: 'works' } }))
    );

    it('adds new child based on path', assert => transmute({ test: 'roar' })
        .extend('extension', 'works')
        .then(value => assert.deepEqual(value, { test: 'roar', extension: 'works' }))
    );

    /* Non object to object extensions */

    it('stays null extending a null with a null', assert => transmute(null)
        .extend(null)
        .then(value => assert.deepEqual(value, null))
    );

    it('keeps the integer the same when extending an integer with a null', assert => transmute(5)
        .extend(null)
        .then(value => assert.deepEqual(value, 5))
    );

    it('keeps the string the same when extending a string with a null', assert => transmute('roar')
        .extend(null)
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('keeps the array the same when extending an array with a null', assert => transmute([0, 'ten'])
        .extend(null)
        .then(value => assert.deepEqual(value, [0, 'ten']))
    );

    it('keeps the object the same when extending an object with a null', assert => transmute({ test: 'roar' })
        .extend(null)
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('changes a null to an integer when extending a null with an integer', assert => transmute(null)
        .extend(5)
        .then(value => assert.deepEqual(value, 5))
    );

    it('batches an integer with another integer into an array when extending an integer with another integer', assert => transmute(4)
        .extend(5)
        .then(value => assert.deepEqual(value, [4, 5]))
    );

    it('batches an integer with a string into an array when extending a string with an integer', assert => transmute('roar')
        .extend(5)
        .then(value => assert.deepEqual(value, ['roar', 5]))
    );

    it('batches an integer with the rest of an array when extending an array with an integer', assert => transmute([0, 'ten'])
        .extend(5)
        .then(value => assert.deepEqual(value, [0, 'ten', 5]))
    );

    it('batches an integer with a object into an array when extending an object with an integer', assert => transmute({ test: 'roar' })
        .extend(5)
        .then(value => assert.deepEqual(value, [{ test: 'roar' }, 5]))
    );

    it('changes a null to a string when extending a null with a string', assert => transmute(null)
        .extend('roar')
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('batches a string with an integer into an array when extending an integer with a string', assert => transmute(5)
        .extend('roar')
        .then(value => assert.deepEqual(value, [5, 'roar']))
    );

    it('batches a string with another string into an array when extending a string with another string', assert => transmute('roar')
        .extend('roar')
        .then(value => assert.deepEqual(value, ['roar', 'roar']))
    );

    it('batches a string with the rest of an array when extending an array with a string', assert => transmute([0, 'ten'])
        .extend('roar')
        .then(value => assert.deepEqual(value, [0, 'ten', 'roar']))
    );

    it('batches a string with an object into an array when extending an object with a string', assert => transmute({ test: 'roar' })
        .extend('roar')
        .then(value => assert.deepEqual(value, [{ test: 'roar' }, 'roar']))
    );

    it('changes a null to an array when extending a null with an array', assert => transmute(null)
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, [0, 'ten']))
    );

    it('prepends the integer to an array when extending an integer with an array', assert => transmute(5)
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, [5, 0, 'ten']))
    );

    it('prepends the string to an array when extending a string with an array', assert => transmute('roar')
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, ['roar', 0, 'ten']))
    );

    it('prepends the array with another array when extending an array with another array', assert => transmute([0, 'ten'])
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, [0, 'ten', 0, 'ten']))
    );

    it('prepends the object to an array when extending an object with an array', assert => transmute({ test: 'roar' })
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, [{ test: 'roar' }, 0, 'ten']))
    );

    it('changes a null to an object when extending a null with an object', assert => transmute(null)
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('batches an object with an integer into an array when extending an integer with an object', assert => transmute(5)
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, [5, { test: 'roar' }]))
    );

    it('batches an object with an integer into an array when extending a string with an object', assert => transmute('roar')
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, ['roar', { test: 'roar' }]))
    );

    it('appends an object to an array when extending an array with an object', assert => transmute([0, 'ten'])
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, [0, 'ten', { test: 'roar' }]))
    );
});
