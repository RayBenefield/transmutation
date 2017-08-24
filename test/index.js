import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Base', (it) => {
    it('returns hello world', (assert) => {
        assert.deepEqual(transmute(), {
            hello: 'world',
        });
    });
});
