import _ from 'lodash';

const merger = (obj, value) => {
    if (!value) return obj;
    if (!obj) return value;
    if (_.isArray(obj) && _.isArray(value)) return [...value, ...obj];
    if (_.isArray(value) && !_.isArray(obj)) return [...value, obj];
    if (!_.isPlainObject(value) || !_.isPlainObject(obj)) return value;
    return _.mergeWith(obj, value, merger);
};

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
