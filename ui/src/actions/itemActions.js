const addItem = (itemId, itemName) => {
    return {
        type: "ADD_ITEM",
        payload: {id:itemId, name:itemName}
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