import get from 'lodash.get';

export default (path, sideEffect) => (value) => {
    const finalPath = sideEffect ? path : null;
    const finalSideEffect = sideEffect || path;
    const finalValue = finalPath ? get(value, finalPath) : value;
    let result = finalSideEffect;
    if (typeof finalSideEffect === 'function') result = finalSideEffect(finalValue);
    return Promise.resolve(result)
        .then(() => value);
};
