export default (value) => {
    const transducers = [];
    const api = {
        extend: (obj) => {
            transducers.push(() => Promise.resolve(obj));
            return api;
        },
    };

    api.then = callback => transducers
        .reduce(
            (prev, next) => prev.then(next).catch(next().reject),
            Promise.resolve(value)
        )
        .then(callback);
    return api;
};
