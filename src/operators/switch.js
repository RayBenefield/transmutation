import { has, get } from 'dot-prop';

export default (path, branches) => (value) => {
    const test = get(value, path);
    if (has(branches, test)) return branches[test](value);
    // eslint-disable-next-line dot-notation
    if (has(branches, '_default')) return branches['_default'](value);
    return Promise.resolve(value);
};
