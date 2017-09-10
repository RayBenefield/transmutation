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

    it('allows a delayed side effect with the base value', (assert) => {
        let ran = false;
        return transmute({ parameter: 'roar' })
            .do(new Promise(res => setTimeout(() => {
                ran = true;
                res();
            }, 0)))
            .then(() => assert.equal(ran, true));
    });

    it('allows a function that returns a delayed side effect with the base value', (assert) => {
        let ran = false;
        return transmute({ parameter: 'roar' })
            .do(() => new Promise(res => setTimeout(() => {
                ran = true;
                res();
            }, 0)))
            .then(() => assert.equal(ran, true));
    });

    it('allows a function that returns a delayed side effect with a scoped value', (assert) => {
        let delayedResult = 'notChanged';
        return transmute({ parameter: 'scoped' })
            .do('parameter', parameter => new Promise(res => setTimeout(() => {
                delayedResult = parameter;
                res();
            }, 0)))
            .then(() => assert.equal(delayedResult, 'scoped'));
    });
});
