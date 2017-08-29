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

    it('executes side effect with scoped path', assert => transmute({ testing: { parameter: 'roar' } })
        .do('testing.parameter', parameter => assert.equal(parameter, 'roar'))
        .then()
    );

    it('executes side effect with scoped path and still not changing anything', assert => transmute({ testing: { parameter: 'roar' } })
        .do('testing.parameter', () => ({ returning: 'does nothing' }))
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );
});
