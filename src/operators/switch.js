import _ from 'lodash';

export default (path, branches) => (value) => {
    const test = _.get(value, path);
    if (_.has(branches, test)) return branches[test](value);
    // eslint-disable-next-line dot-notation
    if (_.has(branches, '_default')) return branches['_default'](value);
    return Promise.resolve(value);
};
