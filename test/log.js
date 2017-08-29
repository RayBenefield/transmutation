import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Log Operator', (it) => {
    it.skip('actually logs value with console log', assert => transmute({ testing: { parameter: 'roar' } })
        .log()
        .then(() => assert.ok(true))
    );

    it.skip('actually logs scoped value with console log', assert => transmute({ testing: { parameter: 'roar' } })
        .log('testing.parameter')
        .then(() => assert.ok(true))
    );

    it.skip('actually logs titled value with console log', assert => transmute({ testing: { parameter: 'roar' } })
        .log('my title')
        .then(() => assert.ok(true))
    );

    it.skip('actually logs a titled and scoped value with console log', assert => transmute({ testing: { parameter: 'roar' } })
        .log('my title', 'testing.parameter')
        .then(() => assert.ok(true))
    );

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

    it('logs a scoped and titled value to the given function', assert => transmute({ testing: { parameter: 'roar' } })
        .log('my title', 'testing.parameter', (title, value) => assert.ok(title === 'my title' && value === 'roar'))
        .then()
    );
});
