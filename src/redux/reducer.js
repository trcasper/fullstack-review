
const initialState = {
    user: {}
}

const UPDATE_USER = 'UPDATE_USER';

export function updateUser(userObj) {
    return {
        type: UPDATE_USER,
        payload: userObj //actual data to change the state
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_USER:
            return {...state, user: payload}
        default:
            return state;
    }
    //finds the case based on the type / 'switch' fires once it finds a match
}
//assigns state to default parameter so that it can be changed
//'action' allows the input of the type/payload