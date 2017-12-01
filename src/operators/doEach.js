import get from 'lodash.get';
import doStuff from './do';

export default (iterable, stream) => value => Promise.all(
    get(value, iterable)
        .map(iterator => stream(value, iterator)))
    .then(results => results
        .reduce((v, result) => doStuff(v)(result), value));
