import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Transmute', (it) => {
    it('does not change a null value', assert => transmute(null)
        .then(value => assert.equal(value, null))
    );

    it('does not change an integer', assert => transmute(5)
        .then(value => assert.equal(value, 5))
    );

    it('does not change a string', assert => transmute('roar')
        .then(value => assert.equal(value, 'roar'))
    );

    it('does not change an object', assert => transmute({ test: 'roar' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('handles the result of a promise', (assert) => {
        const promise = new Promise(res => res({ test: 'roar' }));
        transmute(promise)
            .then(value => assert.deepEqual(value, { test: 'roar' }));
    });
});
