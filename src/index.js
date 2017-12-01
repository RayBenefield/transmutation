import configure from './configure';
import transmuter from './default';
import isolator from './isolate';

export default transmuter;
export const configureTransmuter = configure;
export const transmute = transmuter;
export const isolate = isolator;
