import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Log Operator', (it) => {
    it('logs to the given function', assert => transmute({ testing: { parameter: 'roar' } })
        .log(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
        .then()
    );

    it('logs a scoped value to the given function', assert => transmute({ testing: { parameter: 'roar' } })
        .log('testing.parameter', value => assert.deepEqual(value, 'roar'))
        .then()
    );

    it('logs a titled value to the given function', assert => transmute('roar')
        .log('my title', (title, value) => assert.ok(title === 'my title' && value === 'roar'))
        .then()
    );
});
