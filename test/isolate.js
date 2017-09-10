import describe from 'tape-bdd';
import { isolate, transmute } from 'src'; // eslint-disable-line

describe('Isolate', (it) => {
    it('accepts a path and value to isolate', assert => transmute({ parameter: 'roar' })
        .then(value => assert.deepEqual(isolate('parameter', value), 'roar'))
    );

    it('isolates a value for extending', assert => transmute({ parameter: 'roar' })
        .extend('extension', isolate('parameter'))
        .then(value => assert.deepEqual(value, {
            parameter: 'roar',
            extension: 'roar',
        }))
    );
});
