export interface State {
  selectedTimeline: string;
  scale: number;
}

export interface Context {
  state: State;
  dispatch: React.Dispatch<any>;
  token: string;
}

export interface Period {
  _id: string;
  title: string;
  from: number;
  to: number;
  description: string;
}

export interface PeriodWithPosition extends Period {
  top: number;
  left: number;
  duration: number;
}

export interface Timeline {
  _id: string;
  title: string;
  views: number;
}
