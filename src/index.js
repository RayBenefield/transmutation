import _ from 'lodash';

const extensionFunc = (obj, value) => {
    if (!value) {
        return obj;
    }
    if (!obj) {
        return value;
    }
    if (_.isArray(obj) && _.isArray(value)) {
        return [...value, ...obj];
    }
    if (_.isArray(value) && !_.isArray(obj)) {
        return [...value, obj];
    }
    if (!_.isPlainObject(value) || !_.isPlainObject(obj)) {
        return value;
    }
    return _.mergeWith(obj, value, extensionFunc);
};

const baseOperators = {
    extend: (path, obj) => {
        if (!obj) {
            return (value) => {
                let result = path;
                if (_.isFunction(result)) result = result(value);
                return Promise.resolve(result)
                    .then(o => extensionFunc(o, value));
            };
        }
        return (value) => {
            let result = obj;
            if (_.isFunction(result)) result = result(value);
            return Promise.resolve(result)
                .then(o => _.set({}, path, o))
                .then(o => extensionFunc(o, value));
        };
    },
};

const createApi = operators => transducers => (value) => {
    const api = _.mapValues(operators, operator =>
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

export const configureTransmuter = operators => value => createApi(operators)([])(value);

export default configureTransmuter(baseOperators);
