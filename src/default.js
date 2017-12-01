import configureTransmuter from './configure';
import * as operators from './operators'; // eslint-disable-line import/no-unresolved, import/extensions

const defaultTransmuter = configureTransmuter(operators);
Object.assign(defaultTransmuter, operators);

export default defaultTransmuter;
