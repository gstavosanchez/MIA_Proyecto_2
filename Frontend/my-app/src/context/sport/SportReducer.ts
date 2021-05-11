import { sportState, sportActionType } from "../typesUser";

export default (state: sportState, action: sportActionType) => {
  switch (action.type) {
    case "SET_ID":
      return {
        ...state,
        sportID: action.payload,
      };
    case "SET_FLAG":
      return {
        ...state,
        isUpdate: action.payload,
      };
    default:
      return state;
  }
};
