import _ from 'lodash';

export default path => value => Promise.resolve(_.set({}, path, value));
