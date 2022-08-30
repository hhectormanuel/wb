import { types } from "./types";

export const createReducer = (state, action) => {
    switch (action.type) {
        case types.isSaving:
            return action.payload;

        case types.createPublication:
            return action.payload;
        
        case types.isSavingFalse:
            return action.payload;
        
    
        default:
            state;
    }
}