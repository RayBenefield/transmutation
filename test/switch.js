import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Switch Operator', (it) => {
    it('selects the value that matches the scoped check', assert => transmute({ testing: { parameter: 'roar' } })
        .switch('testing.parameter', {
            roar: transmute.extend({ switchTest: 'pass' }),
            blah: transmute.extend({ switchTest: 'fail' }),
        })
        .then(value => assert.deepEqual(value, {
            switchTest: 'pass',
            testing: {
                parameter: 'roar',
            },
        }))
    );

    it('makes no modifications if no values match any branch', assert => transmute({ testing: { parameter: 'roar' } })
        .switch('nonexistant.parameter', {
            roar: transmute.extend({ switchTest: 'pass' }),
        })
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );
});
