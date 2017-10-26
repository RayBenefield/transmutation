import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

describe('Do Each Operator', (it) => {
    it('iterates over array value', assert => {
        const values = [];
        return transmute({ fields: [ 'roar', 'test' ]})
            .doEach('fields', (snowball, field) =>
                transmute({})
                    .do(() => new Promise(res => setTimeout(() => {
                        values.push(field);
                        res();
                    }, 0))))
            .then(() => assert.deepEqual(values, ['roar', 'test']));
    });
});
