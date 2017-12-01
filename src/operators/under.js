import set from 'lodash.set';

export default path => value => Promise.resolve(set({}, path, value));
