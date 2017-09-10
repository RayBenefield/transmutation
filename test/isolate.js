import describe from 'tape-bdd';
import { isolate, transmute } from 'src'; // eslint-disable-line

describe('Isolate', (it) => {
    it('does not change a null value', assert => transmute({ parameter: 'roar' })
        .then(value => assert.deepEqual(isolate('parameter', value), 'roar'))
    );
});
