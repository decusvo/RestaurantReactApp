const currentItems = (state = {}, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {...state, item: {name: action.payload, q: 1}};
        case "REMOVE_ITEM":
            const pos1 = state.indexOf(action.payload);
            if (pos1 > -1) {
                state[pos1-1] -= 1;
                if (state[pos1-1] < 0) {
                    state[pos1-1] += 1;
                }
            }
            return state;
        default:
            return state
    }
};

export default currentItems;