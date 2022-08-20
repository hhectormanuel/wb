import { types } from "./types"

export const authReducer = (state, action) => {
    switch (action.type) {
        case types.login:
            return action.payload;
    
        case types.check:
            return action.payload;

        case types.logout: 
            return action.payload;

        default:
            return state;
    }
}