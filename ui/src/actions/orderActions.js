const setOrderID = (orderID) => {
    return {
        type: "SET_ORDER",
        payload: orderID
    }
};

const resetOrderID = () => {
    return {
        type: "RESET_ORDER"
    }
};


export default {
    setOrderID, resetOrderID
}
