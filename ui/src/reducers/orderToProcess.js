const orderToProcess = (state = {}, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state,
        order: action.payload.order
      };
    case "SET_RESPONSE":
      return {
        ...state,
        response: action.payload.response,
        name: action.payload.name
      };

    case "RESET_RESPONSE":
      return {
        ...state,
        response: {},
        name: {}
      };
    case "RESET_ORDER":
      return {
        ...state,
        order: {}
      };
    default:
      return state;
  }
};

export default orderToProcess;
