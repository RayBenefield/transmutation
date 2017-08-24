export default value => ({
    then: callback => Promise.resolve(value)
        .then(callback),
});
