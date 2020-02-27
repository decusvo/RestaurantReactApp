const currentItems = (state = {items: []}, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            let found = false;
            state.items.map(function (dish) {
                if (dish.name === action.payload.name) {
                    dish.q += 1;
                    found = true;
                }
            });
            if (!found) {
                return {...state,
                    items: state.items.concat({id:action.payload.id, name:action.payload.name, q:1})};
            } else {
                return state
            }
        case "REMOVE_ITEM":
            let deleted = false;
            state.items.map(function (dish, index) {
                if (dish.name === action.payload) {
                    dish.q -= 1;
                    if (dish.q === 0) {
                        delete state.items[index];
                        deleted = true;
                    }
                }
            });
            if (deleted) {
                return {...state, items: state.items};
            } else {
                return state
            }

        default:
            return state
    }
};


export default currentItems;