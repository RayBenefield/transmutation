import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

const promise = new Promise(res => res({ test: 'roar' }));

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
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('does not change a null value when extending with null', assert => transmute(null)
        .extend(null)
        .then(value => assert.deepEqual(value, null))
    );
});
