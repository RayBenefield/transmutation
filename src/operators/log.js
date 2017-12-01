import has from 'lodash.has';
import get from 'lodash.get';

// eslint-disable-next-line no-console
export default (title, path, logger = console.log) => (value) => {
    if (!title) {
        logger(value);
        return Promise.resolve(value);
    }
    if (typeof title === 'function') {
        title(value);
        return Promise.resolve(value);
    }
    if (title && !path) {
        if (has(value, title)) {
            logger(get(value, title));
            return Promise.resolve(value);
        }
        logger(title, value);
        return Promise.resolve(value);
    }
    if (title && typeof path === 'function') {
        if (has(value, title)) {
            path(get(value, title));
            return Promise.resolve(value);
        }
        path(title, value);
        return Promise.resolve(value);
    }
    if (title && path) {
        if (has(value, path)) {
            logger(title, get(value, path));
            return Promise.resolve(value);
        }
        logger(title, value);
        return Promise.resolve(value);
    }
    return Promise.resolve(value);
};
