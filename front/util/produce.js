/**
 * immer 라이브러리 IE11 크로스브라우징
 */

import { enableES5, produce } from 'immer';

const Produce = (...args) => {
    enableES5();
    return produce(...args);
};

export default Produce;