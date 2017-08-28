import _ from 'lodash';

const merger = (obj, value) => {
    if (!value) return obj;
    if (!obj) return value;
    if (_.isArray(obj) && _.isArray(value)) return [...value, ...obj];
    if (_.isArray(value) && !_.isArray(obj)) return [...value, obj];
    if (!_.isPlainObject(value) || !_.isPlainObject(obj)) return value;
    return _.mergeWith(obj, value, merger);
};

const baseOperators = {
    extend: (path, obj) => (value) => {
        const finalPath = obj ? path : null;
        const base = obj || path;
        const finalObject = _.isFunction(base) ? base(value) : base;
        return Promise.resolve(finalObject)
            .then(o => (finalPath ? _.set({}, finalPath, o) : o))
            .then(o => merger(o, value));
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
