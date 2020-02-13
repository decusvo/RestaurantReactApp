const counter = (state = [], action) => {
    switch (action.type) {
        case "INCREMENT":
            const pos = state.indexOf(action.payload);
            if (pos > -1) {
                state[pos-1] += 1
            } else {
                state = state.concat(1, action.payload);
            }
            console.log(state)
            return state;
        case "DECREMENT":
            const pos1 = state.indexOf(action.payload);
            if (pos1 > -1) {
                state[pos1-1] -= 1;
                if (state[pos1-1] < 0) {
                    state[pos1-1] += 1;
                }
            }
            console.log(state)
            return state;
        default:
            return state;
    }
};

export default counter