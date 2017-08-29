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
        // eslint-disable-next-line no-nested-ternary
        const paths = obj && _.isArray(path)
            ? path
            : _.isNull(path)
                ? null
                : [path];
        const finalPath = obj ? paths : null;
        const base = obj || path;
        const finalObject = _.isFunction(base) ? base(value) : base;
        if (finalPath) {
            return Promise.all(finalPath.map(single => Promise.resolve(finalObject)
                .then(o => _.set({}, single, o))
                .then(o => merger(o, value))
            ))
            .then(o => o.reduce(merger, {}));
        }
        return Promise.resolve(finalObject)
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

export default module.exports = configureTransmuter(baseOperators);
