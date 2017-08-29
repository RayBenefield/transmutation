import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Do Operator', (it) => {
    it('allows a side effect without changing anything', assert => transmute({ parameter: 'roar' })
        .do(({ parameter }) => ({ returning: `does nothing even with ${parameter}` }))
        .then(value => assert.deepEqual(value, { parameter: 'roar' }))
    );
});
