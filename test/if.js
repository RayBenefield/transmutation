import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('If Operators', (it) => {
    it('extends if path exists', assert => transmute({ testing: { parameter: 'roar' } })
        .if('testing.parameter',
            transmute.extend({ ifTest: 'pass' })
        )
        .then(value => assert.deepEqual(value, {
            ifTest: 'pass',
            testing: {
                parameter: 'roar',
            },
        }))
    );

    it('extends if multiple paths exists', assert => transmute({
        testing: { parameter: 'roar' },
        second: { path: 'stuff' },
    })
        .if(['testing.parameter', 'second.path'],
            transmute.extend({ ifTest: 'pass' })
        )
        .then(value => assert.deepEqual(value, {
            ifTest: 'pass',
            testing: { parameter: 'roar' },
            second: { path: 'stuff' },
        }))
    );

    it('does not extend if path does not exist', assert => transmute({ testing: { parameter: 'roar' } })
        .if('ifTest.parameter',
            transmute.extend({ ifTest: 'fail' })
        )
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );

    it('does not extend if one of multiple paths is missing', assert => transmute({ testing: { parameter: 'roar' } })
        .if(['testing.parameter', 'second.path'],
            transmute.extend({ ifTest: 'fail' })
        )
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );

    it('extends if path does not exists', assert => transmute({ testing: { parameter: 'roar' } })
        .ifNo('ifTest.parameter',
            transmute.extend({ ifTest: 'pass' })
        )
        .then(value => assert.deepEqual(value, {
            ifTest: 'pass',
            testing: {
                parameter: 'roar',
            },
        }))
    );

    it('extends all paths do not exist', assert => transmute({
        testing: { parameter: 'roar' },
        second: { path: 'stuff' },
    })
        .ifNo(['not.existing', 'no.existence'],
            transmute.extend({ ifTest: 'pass' })
        )
        .then(value => assert.deepEqual(value, {
            ifTest: 'pass',
            testing: { parameter: 'roar' },
            second: { path: 'stuff' },
        }))
    );

    it('does not extend if path exists', assert => transmute({ testing: { parameter: 'roar' } })
        .ifNo('testing.parameter',
            transmute.extend({ ifTest: 'fail' })
        )
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );

    it('does not extend if any path exists', assert => transmute({ testing: { parameter: 'roar' } })
        .ifNo(['testing.parameter', 'no.existence'], transmute.extend({ ifTest: 'pass' }))
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );
});