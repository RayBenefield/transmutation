import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Extend Operator', (it) => {
    it('extends a null value to a number', assert => transmute(null)
        .extend(5)
        .then(value => assert.equal(value, 5))
    );
});
