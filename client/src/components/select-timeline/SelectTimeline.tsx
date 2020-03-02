import React, { useState, useCallback, useEffect } from "react";
import { AppContext, appTypes, appActions } from "duck";
import { useHttp } from "hooks";
import { Button, ImportExport, Done } from "../index";
import styles from "./SelectTimeline.module.css";

const SelectTimeline: React.FC = () => {
  const { request } = useHttp();
  const { state, token, dispatch } = React.useContext<appTypes.Context>(
    AppContext
  );
  const [opened, setOpened] = useState(false);
  const [timelines, setTimelines] = useState<appTypes.Timeline[]>([]);
  const [sharedTimelines, setSharedTimelines] = useState([]);

  const getTimelines = useCallback(async () => {
    try {
      const timelines = await request("/api/timeline", "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setTimelines(timelines.timelines);
    } catch (e) {}
  }, [request, token]);

  const getSharedTimelines = useCallback(async () => {
    try {
      const data = await request("/api/timeline/shared", "GET");

      setSharedTimelines(data);

      if (!state.selectedTimeline)
        dispatch(
          appActions.setSelectedTimeline({ selectedTimeline: data[0]._id })
        );
    } catch (e) {}
  }, [request, dispatch, state.selectedTimeline]);

  const openHandler = () => {
    setOpened(true);
    if (token) getTimelines().catch();
    getSharedTimelines().catch();
  };

  const setTimelineHandler = (timelineId: string) => {
    dispatch(appActions.setSelectedTimeline({ selectedTimeline: timelineId }));
  };

  useEffect(() => {
    getSharedTimelines().catch();
  }, [getSharedTimelines]);

  return (
    <>
      <Button
        className={styles.button}
        variant="secondary"
        onClick={openHandler}
      >
        <ImportExport className={styles.icon} />
      </Button>

      {opened && (
        <div className={styles.wrapper} onClick={() => setOpened(false)}>
          <div className={styles.list} onClick={e => e.stopPropagation()}>
            <div className={styles.container}>
              <h2>Shared timelines</h2>
              {sharedTimelines.map((timeline: appTypes.Timeline) => (
                <Button
                  key={timeline._id}
                  className={styles.timeline}
                  onClick={() => setTimelineHandler(timeline._id)}
                >
                  {state.selectedTimeline === timeline._id && <Done />}
                  {timeline.title}
                </Button>
              ))}
            </div>
            {!!timelines.length && (
              <div className={styles.container}>
                <h2>Personal timelines</h2>
                {timelines.map((timeline: appTypes.Timeline) => (
                  <Button
                    key={timeline._id}
                    className={styles.timeline}
                    onClick={() => setTimelineHandler(timeline._id)}
                  >
                    {state.selectedTimeline === timeline._id && <Done />}
                    {timeline.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectTimeline;
