import _ from 'lodash';

// eslint-disable-next-line no-console
export default (title, path, logger = console.log) => (value) => {
    if (!title) {
        logger(value);
        return Promise.resolve(value);
    }
    if (_.isFunction(title)) {
        title(value);
        return Promise.resolve(value);
    }
    if (title && !path) {
        if (_.has(value, title)) {
            logger(_.get(value, title));
            return Promise.resolve(value);
        }
        logger(title, value);
        return Promise.resolve(value);
    }
    if (title && _.isFunction(path)) {
        if (_.has(value, title)) {
            path(_.get(value, title));
            return Promise.resolve(value);
        }
        path(title, value);
        return Promise.resolve(value);
    }
    if (title && path) {
        if (_.has(value, path)) {
            logger(title, _.get(value, path));
            return Promise.resolve(value);
        }
        logger(title, value);
        return Promise.resolve(value);
    }
    return Promise.resolve(value);
};
