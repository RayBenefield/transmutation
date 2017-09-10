import _ from 'lodash';

export default (path, transducer) => (value) => {
    if (_.isArray(path)) {
        if (_.every(path, p => !_.has(value, p))) return transducer(value);
        return Promise.resolve(value);
    }
    if (!_.has(value, path)) return transducer(value);
    return Promise.resolve(value);
};
