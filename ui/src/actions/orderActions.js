const setOrder = (orderID, customerID) => {
  return {
    type: "SET_ORDER",
    payload: {
      order: orderID,
      customer: customerID
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
};
