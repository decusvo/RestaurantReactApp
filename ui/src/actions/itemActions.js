const addItem = (item) => {
    return {
        type: "ADD_ITEM",
        payload: item
    }
};

const removeItem = (item) => {
    return {
        type: "REMOVE_ITEM",
        payload: item
    }
};

export default {
    addItem, removeItem
}