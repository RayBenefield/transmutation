import _ from 'lodash';
import merger from './merger';
import * as operators from './operators'; // eslint-disable-line import/no-unresolved, import/extensions

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
        _.extend(pipeline, _.mapValues(ops, operator =>
            (...args) => {
                transducers.push(operator(...args));
                return pipeline;
            }
        ));
        return pipeline;
    }

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
export const isolate = _.curry((path, value) => {
    if (!_.isArray(path)) {
        return _.get(value, path);
    }
    return path.reduce((result, currentPath) => {
        if (_.has(value, currentPath)) {
            return merger(result, _.set({}, currentPath, _.get(value, currentPath)));
        }
        return result;
    }, {});
});
