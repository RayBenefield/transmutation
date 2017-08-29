import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('If Operator', (it) => {
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

    it('does not extend if path does not exist', assert => transmute({ testing: { parameter: 'roar' } })
        .if('ifTest.parameter',
            transmute.extend({ ifTest: 'fail' })
        )
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );
});
