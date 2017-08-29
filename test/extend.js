import describe from 'tape-bdd';
import transmute from 'src'; // eslint-disable-line

const promise = new Promise(res => res({ test: 'promise' }));
const promiseArray = new Promise(res => res(['promise']));

describe.only('Extend Operator', (it) => {
    it('extends with the result of a function instead of a primitive or promise', assert => transmute({ parameter: 'roar' })
        .extend(({ parameter }) => ({ [parameter]: 'result' }))
        .then(value => assert.deepEqual(value, { parameter: 'roar', roar: 'result' }))
    );

    it('extends a path with the result of a function instead of a primitive or promise', assert => transmute({ parameter: 'roar' })
        .extend('testing.stuff', ({ parameter }) => ({ [parameter]: 'result' }))
        .then(value => assert.deepEqual(value, { parameter: 'roar', testing: { stuff: { roar: 'result' } } }))
    );

    it('extends a path with the promised result of a function instead of a primitive or promise', assert => transmute({ parameter: 'roar' })
        .extend('testing.stuff', ({ parameter }) =>
            new Promise(res => res({ [parameter]: 'result' }))
        )
        .then(value => assert.deepEqual(value, { parameter: 'roar', testing: { stuff: { roar: 'result' } } }))
    );

    it('extends a path with the transmuted result of a function instead of a primitive or promise', assert => transmute({ parameter: 'roar' })
        .extend('testing.stuff', ({ parameter }) =>
            transmute({ [parameter]: 'result' })
        )
        .then(value => assert.deepEqual(value, { parameter: 'roar', testing: { stuff: { roar: 'result' } } }))
    );

    it('extends an array of paths with the transmuted result of a function instead of a primitive or promise', assert => transmute({ parameter: 'roar' })
        .extend(['testing.stuff', 'second.place'], ({ parameter }) =>
            transmute({ [parameter]: 'result' })
        )
        .then(value => assert.deepEqual(value, { parameter: 'roar', testing: { stuff: { roar: 'result' } }, second: { place: { roar: 'result' } } }))
    );

    it('extends an array of paths with a result while sharing a portion of the path', assert => transmute({ parameter: 'roar' })
        .extend(['testing.stuff', 'testing.place'], ({ parameter }) =>
            transmute({ [parameter]: 'result' })
        )
        .then(value => assert.deepEqual(value, {
            parameter: 'roar',
            testing: {
                stuff: { roar: 'result' },
                place: { roar: 'result' },
            },
        }))
    );

    it('extends an array of paths without triggering merge problems', assert => transmute({ parameter: 'roar' })
        .extend(['parameter', 'testing.place'], ({ parameter }) =>
            transmute({ [parameter]: 'result' })
        )
        .then(value => assert.deepEqual(value, {
            parameter: 'roar',
            testing: {
                place: { roar: 'result' },
            },
        }))
    );

    it('does not add any additional pathing when extending with a null path', assert => transmute({ parameter: 'roar' })
        .extend(null, ({ parameter }) =>
            transmute({ [parameter]: 'result' })
        )
        .then(value => assert.deepEqual(value, { parameter: 'roar', roar: 'result' }))
    );

    /* Object merging */

    it('does nothing when extending an object with an identical object', assert => transmute({ test: 'roar' })
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('extend an object with additional key/values when extended with a different object', assert => transmute({ test: 'roar' })
        .extend({ roar: 'test' })
        .then(value => assert.deepEqual(value, { test: 'roar', roar: 'test' }))
    );

    it('does nothing when extending an object with an object with the same key', assert => transmute({ test: 'roar' })
        .extend({ test: 'no' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('adds new children to a key that already exists', assert => transmute({ test: { deep: 'roar' } })
        .extend({ test: { extension: 'works' } })
        .then(value => assert.deepEqual(value, { test: { deep: 'roar', extension: 'works' } }))
    );

    it('adds new child based on path', assert => transmute({ test: 'roar' })
        .extend('extension', 'works')
        .then(value => assert.deepEqual(value, { test: 'roar', extension: 'works' }))
    );

    it('does nothing when changing a direct value on path that exists', assert => transmute({ test: 'roar' })
        .extend('test', 'works')
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('extends a new path perfectly fine with a string', assert => transmute({ test: 'roar' })
        .extend('jam.test.stuff', 'works')
        .then(value => assert.deepEqual(value, { test: 'roar', jam: { test: { stuff: 'works' } } }))
    );

    it('extends a new path perfectly fine with a promise result', assert => transmute({ test: 'roar' })
        .extend('jam.test.stuff', promise)
        .then(value => assert.deepEqual(value, { test: 'roar', jam: { test: { stuff: { test: 'promise' } } } }))
    );

    it('extends an existing path with a promise result', assert => transmute({ test: ['roar'] })
        .extend('test', promiseArray)
        .then(value => assert.deepEqual(value, { test: ['roar', 'promise'] }))
    );

    /* Non object to object extensions */

    it('stays null extending a null with a null', assert => transmute(null)
        .extend(null)
        .then(value => assert.deepEqual(value, null))
    );

    it('keeps the integer the same when extending an integer with a null', assert => transmute(5)
        .extend(null)
        .then(value => assert.deepEqual(value, 5))
    );

    it('keeps the string the same when extending a string with a null', assert => transmute('roar')
        .extend(null)
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('keeps the array the same when extending an array with a null', assert => transmute([0, 'ten'])
        .extend(null)
        .then(value => assert.deepEqual(value, [0, 'ten']))
    );

    it('keeps the object the same when extending an object with a null', assert => transmute({ test: 'roar' })
        .extend(null)
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('changes a null to an integer when extending a null with an integer', assert => transmute(null)
        .extend(5)
        .then(value => assert.deepEqual(value, 5))
    );

    it('keeps the original integer if trying to extend with another integer', assert => transmute(4)
        .extend(5)
        .then(value => assert.deepEqual(value, 4))
    );

    it('keeps the original string if trying to extend with an integer', assert => transmute('roar')
        .extend(5)
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('batches an integer with the rest of an array when extending an array with an integer', assert => transmute([0, 'ten'])
        .extend(5)
        .then(value => assert.deepEqual(value, [0, 'ten', 5]))
    );

    it('keeps the original object if trying to extend with an integer', assert => transmute({ test: 'roar' })
        .extend(5)
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('changes a null to a string when extending a null with a string', assert => transmute(null)
        .extend('roar')
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('keeps the original integer when extending with a string', assert => transmute(5)
        .extend('roar')
        .then(value => assert.deepEqual(value, 5))
    );

    it('keeps the original string when extending with another string', assert => transmute('roar')
        .extend('no')
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('batches a string with the rest of an array when extending an array with a string', assert => transmute([0, 'ten'])
        .extend('roar')
        .then(value => assert.deepEqual(value, [0, 'ten', 'roar']))
    );

    it('keeps the original object when extending with a string', assert => transmute({ test: 'roar' })
        .extend('roar')
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('changes a null to an array when extending a null with an array', assert => transmute(null)
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, [0, 'ten']))
    );

    it('keeps the original integer when extending with an array', assert => transmute(5)
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, 5))
    );

    it('keeps the original string when extending with an array', assert => transmute('roar')
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('prepends the array with another array when extending an array with another array', assert => transmute([0, 'ten'])
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, [0, 'ten', 0, 'ten']))
    );

    it('keeps the original object when extending with an array', assert => transmute({ test: 'roar' })
        .extend([0, 'ten'])
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('changes a null to an object when extending a null with an object', assert => transmute(null)
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, { test: 'roar' }))
    );

    it('keeps the original integer when extending with an object', assert => transmute(5)
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, 5))
    );

    it('keeps the original string when extending with an object', assert => transmute('roar')
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, 'roar'))
    );

    it('appends an object to an array when extending an array with an object', assert => transmute([0, 'ten'])
        .extend({ test: 'roar' })
        .then(value => assert.deepEqual(value, [0, 'ten', { test: 'roar' }]))
    );
});
