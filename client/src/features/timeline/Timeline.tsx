import React, { useContext, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppContext, appTypes } from "duck";
import { useHttp } from "hooks";
import { Details, Period } from "./components";
import styles from "./Tineline.module.css";

const Timeline: React.FC = () => {
  const [timeline, setTimeline] = useState({
    _id: "",
    title: "",
    views: 0,
    periods: []
  });
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const { request, loading } = useHttp();

  const getTimeline = useCallback(async () => {
    try {
      const result = await request(`/api/timeline/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });

      setTimeline(result);
    } catch (e) {}
  }, [id, request, token]);

  useEffect(() => {
    getTimeline();
  }, [getTimeline]);

  if (loading) return <div className={styles.wrapper}>Loading ...</div>;

  return (
    <div className={styles.wrapper}>
      {!loading && timeline && <Details timeline={timeline} />}
      <PerfectScrollbar>
        <div className={styles.list}>
          {timeline.periods.map((period: appTypes.Period) => (
            <Period key={period._id} period={period} />
          ))}
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default Timeline;
