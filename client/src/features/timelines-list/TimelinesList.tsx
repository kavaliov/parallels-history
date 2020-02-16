import React, { useCallback, useContext, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useHttp } from "hooks";
import { AppContext, appTypes } from "duck";
import { CreateTimeline, Timeline } from "./components";
import styles from "./TimelinesList.module.css";

const TimelinesList: React.FC = () => {
  const [timelines, setTimelines] = useState([]);
  const { token } = useContext(AppContext);
  const { request, loading } = useHttp();

  const getTimelines = useCallback(async () => {
    try {
      const timelines = await request("/api/timeline", "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setTimelines(timelines);
    } catch (e) {}
  }, [request, token]);

  useEffect(() => {
    getTimelines();
  }, [getTimelines]);

  if (loading) return <div className={styles.wrapper}>Loading ...</div>;

  return (
    <div className={styles.wrapper}>
      <CreateTimeline setTimelines={setTimelines} timelines={timelines} />
      <h1>LIST OF TIMELINES</h1>
      <div className={styles.list}>
        <PerfectScrollbar>
          {timelines.map((timeline: appTypes.Timeline) => (
            <Timeline
              key={timeline._id}
              setTimelines={setTimelines}
              timelines={timelines}
              timeline={timeline}
            />
          ))}

          {!timelines.length && (
            <div className={styles.empty}>List is empty</div>
          )}
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default TimelinesList;
