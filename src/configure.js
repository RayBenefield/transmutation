import mapValues from 'lodash.mapvalues';

const createApi = ops => transducers => (value) => {
    if (value === undefined) {
        const pipeline = val => ({
            then: callback => transducers
                .reduce(
                    (prev, next) => prev.then(next),
                    Promise.resolve(val)
                )
                .then(callback),
        });
        return Object.assign(pipeline, mapValues(ops, operator =>
            (...args) => {
                transducers.push(operator(...args));
                return pipeline;
            }
        ));
    }

    const api = mapValues(ops, operator =>
        (...args) => {
            transducers.push(operator(...args));
            return api;
        }
    );
    api.then = callback => transducers
        .reduce(
            (prev, next) => prev.then(next),
            Promise.resolve(value)
        )
        .then(callback);
    return api;
};

export default ops => value => createApi(ops)([])(value);
