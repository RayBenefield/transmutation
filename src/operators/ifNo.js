import { has } from 'dot-prop';

export default (path, transducer) => (value) => {
    if (Array.isArray(path)) {
        if (Array.every(path, p => !has(value, p))) return transducer(value);
        return Promise.resolve(value);
    }
    if (!has(value, path)) return transducer(value);
    return Promise.resolve(value);
};
