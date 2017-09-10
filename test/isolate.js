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

    it('isolates an array of paths from a value for extending', assert => transmute({
        parameter: 'roar',
        second: 'test',
    })
        .extend('body', isolate(['parameter', 'second']))
        .then(value => assert.deepEqual(value, {
            parameter: 'roar',
            second: 'test',
            body: {
                parameter: 'roar',
                second: 'test',
            },
        }))
    );
});
