import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import site from './site';
import guestbook from './guestbook';
import simsimi from './simsimi';
import game from './game';
import email from './email';

const rootReducer = (state, action) => {
    switch (action.type){
        case HYDRATE: 
            console.log('HYDRATE', action);
            return action.payload;

        default: {
            const combineReducer = combineReducers({
                user,
                site,
                guestbook,
                simsimi,
                game,
                email,
            });

            return combineReducer(state, action);
        }
    }
};

export default rootReducer;