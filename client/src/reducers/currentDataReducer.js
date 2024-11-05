
const initState={
    currentData:{}
}
const currentDataReducer = (state = initState, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        currentData: action || {},
      };
    default:
      return state;
  }

};
export default currentDataReducer;
