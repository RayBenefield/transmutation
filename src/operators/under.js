import { set } from 'dot-prop';

export default path => value => Promise.resolve(set({}, path, value));
