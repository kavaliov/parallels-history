import { createAction } from "typesafe-actions";

export const setSelectedTimeline = createAction("APP/SET_SELECTED_TIMELINE")<{
  selectedTimeline: string;
}>();

export const setScale = createAction("APP/SET_SCALE")<{
  scale: number;
}>();
