import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Extend Each Operator', (it) => {
    it('iterates over array value', assert => transmute({ fields: [
        'roar',
        'test',
    ]})
        .extendEach('fields', (snowball, field) =>
            transmute({ [field]: true }))
        .then(value => assert.deepEqual(value, {
            fields: ['roar', 'test'],
            roar: true,
            test: true,
        }))
    );
});
