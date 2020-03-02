import React, { useContext } from "react";
import { AppContext, appTypes } from "duck";
import { Link } from "react-router-dom";
import { useHttp } from "hooks";
import { Button } from "components";
import styles from "./Timeline.module.css";

interface TimelineProps {
  timeline: appTypes.Timeline;
  timelines: any[];
  setTimelines: any;
}

const Timeline: React.FC<TimelineProps> = ({
  timeline,
  timelines,
  setTimelines
}) => {
  const { token } = useContext(AppContext);
  const { request, loading } = useHttp();

  const deleteHandler = async () => {
    const id = timeline._id;

    try {
      await request(
        "/api/timeline",
        "DELETE",
        { id },
        { Authorization: `Bearer ${token}` }
      );

      setTimelines(timelines.filter(timeline => timeline._id !== id));
    } catch (e) {}
  };

  return (
    <div className={styles.wrapper}>
      {timeline.title}
      <div className={styles.viewCount} />
      <div className={styles.deleteContainer}>
        <Link to={`/timeline/${timeline._id}`}>
          <Button loading={loading}>VIEW PERIODS</Button>
        </Link>
        <Button
          loading={loading}
          variant="secondary"
          onClick={deleteHandler}
          className={styles.deleteButton}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default Timeline;
