import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

const promise = new Promise(res => res({ test: 'promise' }));

describe('Catch Operator', (it) => {
    it.skip('catches a normal promise error', assert => transmute('roar')
        .extend(() => { throw new Error('trap'); })
        .then()
        .catch(err => assert.deepEqual(err.message, 'trap'))
    );

    it.skip('catches a normal promise error, with value at the time', assert => transmute('roar')
        .extend(() => { throw new Error('trap'); })
        .then()
        .catch(err => assert.deepEqual(err.value, 'roar'))
    );

    it('catches a normal promise error, with value at the time after extending', assert => transmute({ test: 'roar' })
        .extend({ roar: 'test' })
        .extend(() => { throw new Error('trap'); })
        .then()
        .catch(err => assert.deepEqual(err.value, { test: 'roar', roar: 'test' }))
    );

    // TODO: Figure out how to handle an already rejected promise
    it.skip('catches a promise error in an extend', assert => transmute({ test: 'roar' })
        .extend(promise.then(() => { throw new Error('trap'); }))
        .then()
        .catch(err => assert.deepEqual(err.value, { test: 'roar' }))
    );

    // TODO: Figure out how to handle an already rejected promise
    it.skip('catches a promise error in an extend with a path', assert => transmute({ test: 'roar' })
        .extend('testing.stuff', promise.then(() => { throw new Error('trap'); }))
        .then()
        .catch(err => assert.deepEqual(err.value, { test: 'roar' }))
    );

    it.skip('catches a transmutation error in an extend', assert => transmute({ test: 'roar' })
        .extend(p => transmute(p)
            .extend(() => { throw new Error('trap'); })
        )
        .then()
        .catch(err => assert.deepEqual(err.value, { test: 'roar' }))
    );
});