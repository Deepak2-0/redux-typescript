import axios from "axios";
import { Dispatch } from "redux"; //for dispatch type for gving type for typescript
import { Action } from "../actions";
import { ActionTypes } from "../action-types";

export const searchRespositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.SEARCH_REPOSITORIES,
    });
    try {
      const res = await axios.get("https://registry.npmjs.org/-/v1/search", {
        params: {
          text: term,
        },
      });

      const names = res.data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({
        type: ActionTypes.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.SEARCH_REPOSITORIES_FAILURE,
        payload: err.message,
      });
    }
  };
};
