import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe.only('Trap Operator', (it) => {
    it('catches a normal promise error', assert => transmute('roar')
        .extend(() => { throw new Error('trap'); })
        .then()
        .catch(err => assert.deepEqual(err.message, 'trap'))
    );

    it('catches a normal promise error, with value at the time', assert => transmute('roar')
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
});
