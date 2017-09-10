import _ from 'lodash';

export default (path, branches) => (value) => {
    const test = _.get(value, path);
    if (_.has(branches, test)) return branches[test](value);
    return Promise.resolve(value);
};
