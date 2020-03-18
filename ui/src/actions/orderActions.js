const setOrder = (orderID) => {
  return {
    type: "SET_ORDER",
    payload: {
      order: orderID
    }
  };
};

const setResponse = (response,name) => {
  return {
    type: "SET_RESPONSE",
    payload: {
      response: response,
      name:name
    }
  };
};

const resetOrderID = () => {
  return {
    type: "RESET_ORDER"
  };
};

export default {
  setOrder,
  resetOrderID,
  setResponse
};
