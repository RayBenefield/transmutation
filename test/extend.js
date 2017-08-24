import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

const promise = new Promise(res => res({ test: 'promise' }));

describe('Extend Operator', (it) => {
    it('extends a null value to a number', assert => transmute(null)
        .extend(5)
        .then(value => assert.deepEqual(value, 5))
    );

    it('extends a null value to a string', assert => transmute(null)
        .extend('roar')
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('extends a null value to a object', assert => transmute(null)
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('extends a null value to an array', assert => transmute(null)
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, [0, 'ten']))
    );

    it('extends a null value to a promise result', assert => transmute(null)
        .extend(promise)
        .then(value => assert.deepEqual(value, { test: 'promise' }))
    );

    it('does not change a null value when extending with null', assert => transmute(null)
        .extend(null)
        .then(value => assert.deepEqual(value, null))
    );

    it('does not change an integer when extending with null', assert => transmute(5)
        .extend(null)
        .then(value => assert.deepEqual(value, 5))
    );

    it('does not change a string when extending with null', assert => transmute('roar')
        .extend(null)
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('does not change an object when extending with null', assert => transmute({ test: 'roar' })
        .extend(null)
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('does not change an object when extending with null', assert => transmute([0, 'ten'])
        .extend(null)
        .then(value => assert.deepEqual(value, [0, 'ten']))
    );

    it('does not change a promise result when extending with null', assert => transmute(promise)
        .extend(null)
        .then(value => assert.deepEqual(value, { test: 'promise' }))
    );

    it('does not change a promise result from recursion when extending with null', assert => transmute(transmute(promise))
        .extend(null)
        .then(value => assert.deepEqual(value, { test: 'promise' }))
    );

    it('batches an integer with another integer into an array', assert => transmute(5)
        .extend(6)
        .then(value => assert.deepEqual(value, [5, 6]))
    );
});
