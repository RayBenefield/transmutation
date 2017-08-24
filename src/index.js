import _ from 'lodash';

const baseOperators = {
    extend: obj => (value) => {
        if (!value) return Promise.resolve(obj);
        if (!obj) return Promise.resolve(value);
        if (_.isNumber(obj)) return Promise.resolve([value, obj]);
        return Promise.resolve(obj);
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
