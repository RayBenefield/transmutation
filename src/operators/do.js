import _ from 'lodash';

export default (path, sideEffect) => (value) => {
    const finalPath = sideEffect ? path : null;
    const finalSideEffect = sideEffect || path;
    const finalValue = finalPath ? _.get(value, finalPath) : value;
    let result = finalSideEffect;
    if (_.isFunction(finalSideEffect)) result = finalSideEffect(finalValue);
    return Promise.resolve(result)
        .then(() => value);
};
