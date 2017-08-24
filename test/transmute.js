import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

const promise = new Promise(res => res({ test: 'promise' }));

describe('Transmute', (it) => {
    it('does not change a null value', assert => transmute(null)
        .then(value => assert.deepEqual(value, null))
    );

    it('does not change an integer', assert => transmute(5)
        .then(value => assert.deepEqual(value, 5))
    );

    it('does not change a string', assert => transmute('roar')
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('does not change an object', assert => transmute({ test: 'roar' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('does not change an array', assert => transmute([0, 'ten'])
        .then(value => assert.deepEqual(value, [0, 'ten']))
    );

    it('handles the result of a promise', assert => transmute(promise)
        .then(value => assert.deepEqual(value, { test: 'promise' }))
    );

    it('recursively handles transmuted values', assert => transmute(transmute(promise))
        .then(value => assert.deepEqual(value, { test: 'promise' }))
    );
});