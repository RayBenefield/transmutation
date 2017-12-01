import mergeWith from 'lodash.mergewith';

const merger = (obj, value) => {
    if (!value) return obj;
    if (!obj) return value;
    if (Array.isArray(obj) && Array.isArray(value)) return [...value, ...obj];
    if (Array.isArray(value) && !Array.isArray(obj)) return [...value, obj];
    if (value.constructor !== Object || obj.constructor !== Object) return value;
    return mergeWith(obj, value, merger);
};

export default merger;
