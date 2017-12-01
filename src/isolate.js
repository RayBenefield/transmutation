import { has, get, set } from 'dot-prop';
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