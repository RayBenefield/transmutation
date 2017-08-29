import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Switch Operator', (it) => {
    it('selects the value that matches the scoped check', assert => transmute({ testing: { parameter: 'roar' } })
        .switch('testing.parameter', {
            roar: transmute.extend({ switchTest: 'pass' }),
        })
        .then(value => assert.deepEqual(value, {
            switchTest: 'pass',
            testing: {
                parameter: 'roar',
            },
        }))
    );
});
