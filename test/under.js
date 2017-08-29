import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Under Operator', (it) => {
    it('puts the current value under the given path', assert => transmute('roar')
        .under('testing.parameter')
        .then(value => assert.deepEqual(value, { testing: { parameter: 'roar' } }))
    );
});
