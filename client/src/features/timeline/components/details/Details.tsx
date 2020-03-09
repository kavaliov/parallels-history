import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext, appTypes } from "duck";
import { useHttp } from "hooks";
import { Button, ForwardIcon } from "components";
import styles from "./Details.module.css";

interface DetailsProps {
  timeline: appTypes.Timeline;
}

const Details: React.FC<DetailsProps> = ({ timeline }) => {
  const { token } = useContext(AppContext);
  const { request, loading } = useHttp();
  const history = useHistory();
  const [shared, setShared] = useState(timeline.shared);

  const backHandler = () => {
    history.goBack();
  };

  const sharedHandler = useCallback(async () => {
    try {
      const result = await request(
        `/api/timeline/shared`,
        "PUT",
        { id: timeline._id, shared: !shared },
        {
          Authorization: `Bearer ${token}`
        }
      );
      if (result) setShared(!shared);
    } catch (e) {}
  }, [request, token, shared, timeline._id]);


  const newPeriodHandler = () => history.push(`/period/create/${timeline._id}`);

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={backHandler}
        variant="secondary"
        className={styles.backButton}
      >
        <ForwardIcon className={styles.backIcon} />
      </Button>
      <h1 className={styles.title}>{timeline.title}</h1>
      <Button
        className={styles.share}
        loading={loading}
        onClick={sharedHandler}
      >
        {shared ? "Unshare" : "Share"}
      </Button>
      <Button onClick={newPeriodHandler} className={styles.addNewPeriod}>
        Add New Period
      </Button>
    </div>
  );
};

export default Details;
