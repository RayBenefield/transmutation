import _ from 'lodash';

const baseOperators = {
    extend: obj => (value) => {
        if (!value) return Promise.resolve(obj);
        if (!obj) return Promise.resolve(value);
        if (_.isArray(obj) && _.isArray(value)) return Promise.resolve([...value, ...obj]);
        if (_.isArray(value)) return Promise.resolve([...value, obj]);
        if (_.isArray(obj)) return Promise.resolve([value, ...obj]);
        if (!_.isPlainObject(value) && !_.isPlainObject(obj)) return Promise.resolve([value, obj]);
        if (_.isPlainObject(value) && !_.isPlainObject(obj)) return Promise.resolve([value, obj]);
        if (_.isPlainObject(obj) && !_.isPlainObject(value)) return Promise.resolve([value, obj]);
        return Promise.resolve(_.extend(value, obj));
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
            (prev, next) => prev.then(next).catch(next().reject),
            Promise.resolve(value)
        )
        .then(callback);
    return api;
};

export const configureTransmuter = operators => value => createApi(operators)([])(value);

export default configureTransmuter(baseOperators);
