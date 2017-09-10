import _ from 'lodash';
import * as operators from './operators'; // eslint-disable-line import/no-unresolved, import/extensions

const createApi = ops => transducers => (value) => {
    const api = _.mapValues(ops, operator =>
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

export const configureTransmuter = ops => value => createApi(ops)([])(value);

const defaultTransmuter = configureTransmuter(operators);
_.extend(defaultTransmuter, operators);

export default defaultTransmuter;
export const transmute = defaultTransmuter;
export const isolate = _.curry((path, value) => _.get(value, path));
