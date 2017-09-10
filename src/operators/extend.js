import _ from 'lodash';
import merger from '../merger';

export default (path, obj) => (value) => {
    // eslint-disable-next-line no-nested-ternary
    const paths = obj && _.isArray(path)
        ? path
        : _.isNull(path)
            ? null
            : [path];
    const finalPath = obj ? paths : null;
    const base = obj || path;
    let finalObject = null;
    try {
        finalObject = _.isFunction(base) ? base(value) : base;
    } catch (e) {
        e.value = value;
        throw e;
    }
    if (finalPath) {
        return Promise.all(finalPath.map(single => Promise.resolve(finalObject)
            .then(o => _.set({}, single, o))
            .then(o => merger(o, value))
        ))
        .then(o => o.reduce(merger, {}))
        .catch((e) => {
            e.value = value;
            throw e;
        });
    }
    return Promise.resolve(finalObject)
        .then(o => merger(o, value))
        .catch((e) => {
            e.value = value;
            throw e;
        });
};
