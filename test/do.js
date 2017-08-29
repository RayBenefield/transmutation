import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Do Operator', (it) => {
    it('allows a side effect with the base value', assert => transmute({ parameter: 'roar' })
        .do(({ parameter }) => assert.equal(parameter, 'roar'))
        .then()
    );

    it('allows a side effect without changing anything', assert => transmute({ parameter: 'roar' })
        .do(() => ({ returning: 'does nothing' }))
        .then(value => assert.deepEqual(value, { parameter: 'roar' }))
    );
});