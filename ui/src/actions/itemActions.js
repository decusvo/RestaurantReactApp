const addItem = (itemId, itemName, price) => {
    return {
        type: "ADD_ITEM",
        payload: {id:itemId, name:itemName},
        price: parseFloat(price.substr(1))
    }
};

const removeItem = (item, price) => {
    return {
        type: "REMOVE_ITEM",
        payload: item,
        price: parseFloat(price.substr(1))
    }
};

const resetItems = () => {
    return {
        type: "RESET_ITEMS"
    }
};

export default {
    addItem, removeItem, resetItems
}