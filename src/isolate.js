import has from 'lodash.has';
import get from 'lodash.get';
import set from 'lodash.set';
import merger from './merger';

export default (...args) => {
    const fn = path => (value) => {
        if (!Array.isArray(path)) {
            return get(value, path);
        }
        return path.reduce((result, currentPath) => {
            if (has(value, currentPath)) {
                return merger(result, set({}, currentPath, get(value, currentPath)));
            }
            return result;
        }, {});
    };
    if (args.length === 1) return fn(args[0]);
    return fn(args[0])(args[1]);
};
