const increment = (item) => {
    return {
        type: "INCREMENT",
        payload: item
    }
};

const decrement = (item) => {
    return {
        type: "DECREMENT",
        payload: item
    }
};

export default {
    increment, decrement
}