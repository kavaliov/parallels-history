import { createReducer, ActionType } from "typesafe-actions";
import * as actions from "./actions";
import * as types from "./types";
import initialState from "./state";

type Action = ActionType<typeof actions>;

const reducer = createReducer<types.State, Action>(initialState)
  .handleAction(
    actions.setSelectedTimeline,
    (state, { payload: { selectedTimeline } }) => ({
      ...state,
      selectedTimeline
    })
  )
  .handleAction(actions.setScale, (state, { payload: { scale } }) => ({
    ...state,
    scale
  }));

export default reducer;
