import _ from 'lodash';
import extend from './extend';

export default (iterable, stream) => value => Promise.all(
    _.get(value, iterable)
        .map(iterator => stream(value, iterator)))
    .then(results => results
        .reduce((v, result) => extend(v)(result), value));
