import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Log Operator', (it) => {
    it('logs to the given function', assert => transmute({ testing: { parameter: 'roar' } })
        .log(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
        .then()
    );
});
